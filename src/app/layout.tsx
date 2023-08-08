import "@/styles/globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Nathans Music Blog",
  description: "Nathans Music Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = (
    <header className="z-50 fixed top-0 items-center border-b border-zinc-600  bg-black flex justify-between h-[3rem] w-full px-4 text-2xl text-neutral-100">
      <Link href="/" className="font-bold text-lg sm:text-[1.5rem]">
        Nathan&apos;s <span>Music</span> Blog
      </Link>
      <Link href="/" className="invisible sm:visible text-xl">
        {/* ʕ•ᴥ•ʔ */}
        (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
      </Link>
    </header>
  );

  return (
    <>
      <html>
        <body className="min-h-screen items-center justify-center bg-zinc-950 no-scrollbar">
          {header}
          <Sidebar />
          {children}
        </body>
      </html>
      <Analytics />
    </>
  );
}
