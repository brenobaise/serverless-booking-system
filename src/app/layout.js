// app/layout.tsx
import "./styles/global.css";
import ClientLayout from "./ClientLayout";
import { getBackgroundColoursFromDB } from "@/lib/fetchColours";

export default async function RootLayout({ children }) {
  const config = await getBackgroundColoursFromDB();
  const mainBg = config?.background_colors?.["mainAPP-background"] || "#ffffff";

  return (
    <html lang="en">
      <body style={{ backgroundColor: mainBg }} className="flex flex-col min-h-screen">
        <ClientLayout mainBg={mainBg}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
