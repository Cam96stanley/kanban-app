import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      <body className={`m-6 ${jakarta.variable}`}>{children}</body>
    </html>
  );
}
