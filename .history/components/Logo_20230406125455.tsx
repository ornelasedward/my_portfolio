"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";
import Image from "next/image";

interface Logo {
  logo: {
    asset: {
      metadata?: {
        dimensions?: {
          aspectRatio: number;
          height: number;
          width: number;
        };
      };
      url: string;
    };
  };
  title: string;
}

export default function Logo() {
  const [logo, setLogo] = useState<Logo | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "logo"][0]{
          logo { asset->{url, metadata-> { dimensions->{aspectRatio, height, width} }} },
          title
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
        className="bg-black bg-clip-text text-transparent md:text-6xl text-4xl font-normal flex gap-2"
      >
        <div className="h-16 w-16 border-2">
          {logo.logo.asset.metadata?.dimensions && (
            <img
              src={logo.logo.asset.url}
              alt={logo.title}
              width={100}
              height={100}
            />
          )}
        </div>
        <div>{logo.title}</div>
      </Link>
    </div>
  );
}
