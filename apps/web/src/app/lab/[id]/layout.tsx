// This layout exists to ensure server-side rendering of the metadata that's created on the fly.
// Solution comes from: https://stackoverflow.com/a/79182354/9206264
// The fetching of data to pass to the page is based off this:
// https://medium.com/@kishorjena/solving-server-to-client-data-flow-in-next-js-handling-index-and-non-index-pages-62d9194537cc
import { getScenario } from "@/db/scenarios";
import { ENV } from "@/lib/environment";
import { Metadata } from "next";

type Parameters = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Parameters;
}): Promise<Metadata | undefined> {
  const id = Number(await params);

  if (!id) {
    return {
      title: "Clearance lab",
      description: "Practice flight plans",
    };
  }

  const scenario = await getScenario(id);

  if (!scenario) {
    return;
  }

  const title = `${scenario.plan_aid} | Clearance Lab`;
  const description = `Practice flight plan for ${scenario.plan_aid}.`;
  const basePath = `/lab/${id.toString()}`;
  const url = new URL(basePath, ENV.APP_BASE_URL);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary",
      images: [
        {
          url: new URL("/logo.svg", ENV.APP_BASE_URL),
          alt: "Clearance Lab logo, a beaker half filled with blue liquid.",
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
