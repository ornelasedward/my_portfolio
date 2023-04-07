"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";

interface Footer {
  name: string;
  url: string;
}

export default function Footer() {
  const [footers, setFooters] = useState<Footer[]>([]);

  useEffect(() => {
    client
      .fetch<Footer[]>(
        `*[_type == "footer"]{
        name,
        url
      }`
      )
      .then((data) => setFooters(data))
      .catch(console.error);
  }, []);

  return (
    <footer className="mt-10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex justify-center space-x-6">
          {footers.map((footer) => (
            <a href={footer.url} key={footer.name}>
              <h1 className=" md:text-4xl border-transparent border-2 hover:border-black p-4 rounded-xl">
                {footer.name}
              </h1>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
