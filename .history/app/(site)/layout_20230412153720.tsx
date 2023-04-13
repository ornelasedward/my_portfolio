import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Luis Website",
  description: "Created by Mired Web Services",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await getPages();

  return (
    <html lang="en">
      <body className="md:py-10 py-4 px-4 max-w-[1400px] mx-auto">
        <header className="flex items-center justify-between">
          <div className="grid grid-cols-1 items-center justify-center md:gap-5 gap-2 md:text-4xl text-gray-900">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className="border-2 rounded-xl md:p-3 p-2 border-transparent hover:border-gray-900 col-span-1 text-center"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </header>
        <main className="pt-20 md:pt-32 overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
