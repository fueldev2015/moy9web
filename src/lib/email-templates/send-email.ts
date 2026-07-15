import { render } from "@react-email/render";
import { sendLovableEmail, EmailAPIError } from "@lovable.dev/email-js";
import { TEMPLATES, type TemplateRegistry } from "./registry";

const API_BASE_URL = "https://api.lovable.dev";
const SENDER_DOMAIN = process.env.EMAIL_SENDER_DOMAIN || "moy9web.com";
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || "Moy9Web <omar@moy9web.com>";

interface SendTemplateEmailOptions<Payload extends Record<string, unknown>> {
  templateData: Payload;
  idempotencyKey: string;
  replyTo?: string;
}

interface SendResult {
  sent: true;
  messageId?: string;
}

interface SuppressedResult {
  sent: false;
  reason: "recipient_suppressed";
}

export type SendTemplateEmailResult = SendResult | SuppressedResult;

export async function sendTemplateEmail<TemplateName extends keyof TemplateRegistry>(
  templateName: TemplateName,
  to: string,
  options: SendTemplateEmailOptions<
    TemplateRegistry[TemplateName] extends { component: (props: infer P) => unknown }
      ? P extends Record<string, unknown>
        ? P
        : Record<string, unknown>
      : Record<string, unknown>
  >,
): Promise<SendTemplateEmailResult> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing LOVABLE_API_KEY");
  }

  const entry = TEMPLATES[templateName];
  if (!entry) {
    throw new Error(`Unknown email template: ${String(templateName)}`);
  }

  const { templateData, idempotencyKey, replyTo } = options;

  const Component = entry.component;
  const element = Component(templateData as never);

  const html = await render(element, { pretty: false });
  const text = await render(element, { plainText: true });

  try {
    const response = await sendLovableEmail(
      {
        to,
        from: FROM_ADDRESS,
        sender_domain: SENDER_DOMAIN,
        subject: entry.subject,
        html,
        text,
        purpose: "transactional",
        idempotency_key: idempotencyKey,
        reply_to: replyTo,
      },
      { apiKey, apiBaseUrl: API_BASE_URL },
    );

    if (!response.success) {
      throw new Error(`Email API responded without success: ${response.status || "unknown"}`);
    }

    return { sent: true, messageId: response.message_id };
  } catch (error) {
    if (error instanceof EmailAPIError && error.code === "recipient_suppressed") {
      return { sent: false, reason: "recipient_suppressed" };
    }
    throw error;
  }
}
