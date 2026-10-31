import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata = {
  title: "RoktoLagbe — Community Blood Donation Network in Bangladesh",
  description:
    "Find verified voluntary blood donors, post emergency blood requests, and check real-time blood bank inventory across Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}