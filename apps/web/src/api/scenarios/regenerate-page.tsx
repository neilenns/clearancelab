"use server";

import { ENV } from "@/lib/environment";
import { revalidatePath } from "next/cache";
import { fetchScenariosSummary } from "./fetch-scenarios";

export const clearAudioCache = async (id: string) => {
  if (!ENV.CLOUDFLARE_RUNTIME_API_TOKEN || !ENV.CLOUDFLARE_ZONE_ID) {
    console.warn(
      "CLOUDFLARE_RUNTIME_API_TOKEN or CLOUDFLARE_ZONE_ID not set, skipping audio file cache purge.",
    );
    return;
  }

  const apiUrl = `https://api.cloudflare.com/client/v4/zones/${ENV.CLOUDFLARE_ZONE_ID}/purge_cache`;
  const files = [new URL(`${id}.mp3`, ENV.AUDIO_BASE_URL).toString()];

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.CLOUDFLARE_RUNTIME_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        `Failed to purge cache: ${JSON.stringify(result.errors)}`,
      );
    }

    console.log(`Purged cache for audio file ${files[0].toString()}`);
  } catch (error) {
    console.error("Failed to clear Cloudflare cache", error);
    throw new Error("Failed to clear Cloudflare cache");
  }
};

export const regenerateScenario = async (id: string) => {
  try {
    revalidatePath(`/lab/${id}`);
    await clearAudioCache(id);
  } catch (error) {
    console.error(`Failed to regenerate ${id}`, error);
    throw new Error("Failed to regenerate page");
  }
};

export const regeneratePages = async () => {
  try {
    const scenarios = await fetchScenariosSummary({ includeDrafts: true });

    if (scenarios.success) {
      for (const scenario of scenarios.data) {
        revalidatePath(`/lab/${scenario._id}`);
      }
    } else {
      console.error("Failed to fetch scenarios for regeneration");
    }

    revalidatePath("/lab");
    revalidatePath("/admin/scenarios");
    revalidatePath("/admin/statistics");
  } catch (error) {
    console.log("Failed to regenerate pages", error);
    throw new Error("Failed to regenerate pages");
  }
};
