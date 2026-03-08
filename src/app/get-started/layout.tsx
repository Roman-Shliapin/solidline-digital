import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Tell us about your business and get a website tailored to your needs. Quick form, no commitment.",
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
