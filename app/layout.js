import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/main-header";
import HamMenu from "@/components/ham-menu";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export const metadata = {
  title: "Kanban Task Manager",
  description:
    "Manage tasks and projects effortlessly with a simple, intuitive Kanban board. Stay organized and boost your productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex ${jakarta.variable} bg-light-gray`}>
        <HamMenu />
        <div className="flex-1">
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
