import HomeNavbar from "@/components/Navbar/HomeNavbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Networkly Social Media App",
  description: "Networkly is very good application for social media",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <HomeNavbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
