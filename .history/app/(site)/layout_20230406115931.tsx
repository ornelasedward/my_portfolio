import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
import Logo from "@/components/Logo";

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
      <body className="py-4 px-4">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="bg-black bg-clip-text text-transparent text-6xl font-bold"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-5 text-sm text-gray-600">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className="hover:underline"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </header>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
