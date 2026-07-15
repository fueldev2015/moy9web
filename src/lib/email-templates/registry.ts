import type { ReactElement } from "react";
import { template as contactInquiry } from "./contact-inquiry";

export interface TemplateEntry<Props extends Record<string, unknown> = Record<string, unknown>> {
  component: (props: Props) => ReactElement;
  subject: string;
  displayName?: string;
  previewData?: Props;
  to?: string;
}

export type TemplateRegistry = {
  "contact-inquiry": typeof contactInquiry;
};

export const TEMPLATES: { [K in keyof TemplateRegistry]: TemplateRegistry[K] } = {
  "contact-inquiry": contactInquiry,
};
