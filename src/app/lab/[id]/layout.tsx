// This layout exists to ensure server-side rendering of the metadata that's created on the fly.
// Solution comes from: https://stackoverflow.com/a/79182354/9206264
// The fetching of data to pass to the page is based off this:
// https://medium.com/@kishorjena/solving-server-to-client-data-flow-in-next-js-handling-index-and-non-index-pages-62d9194537cc
import { apiFetch } from "@/lib/api";
import { ScenarioData } from "@/models/scenario";
import { Metadata } from "next";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const { id } = await params;
  const scenario = await apiFetch<ScenarioData>(`/scenarios/${id}`);

  if (!scenario) {
    return;
  }

  const title = `${scenario.plan.aid} | Clearance Lab`;
  const description = `Practice flight plan for ${scenario.plan.aid}.`;
  const url = `https://clearancelab.badcasserole.com/lab/${id}`;

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
          url: `https://clearancelab.badcasserole.com/logo.svg`,
          alt: "Clearance Lab logo, a beaker half filled with blue liquid.",
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
