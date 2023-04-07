"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";

interface Logo {
  logo: string;
}

export default function Logo() {
  const [logo, setLogo] = useState<Logo | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "logo"][0]{
            logo,
          }`
      )
      .then((data) => setLogo(data))
      .catch(console.error);
  }, []);

  if (!logo) {
    return null;
  }
  return (
    <div>
      <Link
        href="/"
        className="bg-black bg-clip-text text-transparent md:text-6xl text-4xl font-normal"
      >
        {logo.logo}
      </Link>
    </div>
  );
}
