import HomeNavbar from "@/components/Navbar/HomeNavbar";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Networkly Social Media App",
  description: "Networkly is very good application social media",
};
export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeNavbar />
        {children}
      </body>
    </html>
  );
}
