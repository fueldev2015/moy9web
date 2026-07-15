import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
};

const container = {
  padding: "40px 32px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "500",
  color: "#111111",
  marginBottom: "24px",
};

const label = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
  color: "#666666",
  marginTop: "20px",
  marginBottom: "4px",
};

const value = {
  fontSize: "16px",
  color: "#111111",
  lineHeight: "1.5",
};

const Email = ({ name, email, company, phone, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New inquiry from {name || "your website"}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New project inquiry</Heading>
        <Text style={label}>Name</Text>
        <Text style={value}>{name || "—"}</Text>

        <Text style={label}>Email</Text>
        <Text style={value}>{email || "—"}</Text>

        <Text style={label}>Company</Text>
        <Text style={value}>{company || "—"}</Text>

        <Text style={label}>Phone</Text>
        <Text style={value}>{phone || "—"}</Text>

        <Text style={label}>Message</Text>
        <Text style={value}>{message || "—"}</Text>

        <Hr style={{ marginTop: "32px" }} />
        <Text style={{ fontSize: "12px", color: "#999999" }}>
          Sent from the Moy9Web contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "New project inquiry — Moy9Web",
  displayName: "Contact inquiry",
  previewData: {
    name: "Omar",
    email: "visitor@example.com",
    company: "Acme Co",
    phone: "+1 555 123 4567",
    message: "We are looking to redesign our digital presence.",
  },
} satisfies TemplateEntry;
