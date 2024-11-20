import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "The Blogger",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased px-10`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
