import type { ReactElement } from "react";

export interface TemplateEntry<Props extends Record<string, unknown> = Record<string, unknown>> {
  component: (props: Props) => ReactElement;
  subject: string;
  displayName?: string;
  previewData?: Props;
  to?: string;
}

export type TemplateRegistry = Record<string, TemplateEntry>;
