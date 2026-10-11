import { Meta, type MetaProps } from "@once-ui-system/core";
import type { Metadata } from "next";

export function generatePageMetadata(options: MetaProps): Metadata {
  const metadata = Meta.generate(options);
  const canonical =
    options.canonical ?? new URL(options.path ?? "/", options.baseURL).toString();

  return {
    ...metadata,
    alternates: { canonical },
  };
}
