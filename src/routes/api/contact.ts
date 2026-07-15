import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { EmailAPIError } from "@lovable.dev/email-js";
import { sendTemplateEmail } from "@/lib/email-templates/send-email";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const parsed = inquirySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.issues },
            { status: 400 },
          );
        }

        const data = parsed.data;

        try {
          const result = await sendTemplateEmail(
            "contact-inquiry",
            "omar@moy9web.com",
            {
              templateData: {
                name: data.name,
                email: data.email,
                company: data.company,
                phone: data.phone,
                message: data.message,
              },
              idempotencyKey: `contact-${data.email}-${Date.now().toString().slice(0, -3)}`,
              replyTo: data.email,
            },
          );

          if (!result.sent) {
            return Response.json(
              { error: "This email address is currently suppressed and cannot receive messages." },
              { status: 422 },
            );
          }

          return Response.json({ ok: true });
        } catch (error) {
          if (error instanceof EmailAPIError && (error.status === 403 || error.code === "no_matching_sender" || error.code === "domain_not_verified")) {
            console.error("Contact form send failed: sender domain not verified");
            return Response.json(
              { error: "Email sending is not yet configured for this domain. Please verify moy9web.com in your email settings." },
              { status: 503 },
            );
          }
          const message = error instanceof Error ? error.message : "Email delivery failed";
          console.error("Contact form send failed:", message);
          return Response.json({ error: "Unable to send inquiry right now. Please try again." }, { status: 500 });
        }
      },
    },
  },
});
