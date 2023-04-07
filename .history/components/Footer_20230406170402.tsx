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
    <footer className="border-t-2 border-black mt-20">
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
        <div className="mt-8 flex gap-4">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Mathayus Global, Inc. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-gray-500">administrative</p>
        </div>
        <p className="text-center justify-center text-xs mt-20 text-gray-300">
          designed and developed by{" "}
          <a href="https://mired.io/" className="font-bold">
            Mired
          </a>
        </p>
      </div>
    </footer>
  );
}
