"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";
import Image from "next/image";

interface Logo {
  logo: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
        dimensions?: {
          aspectRatio: number;
          height: number;
          width: number;
        };
      };
    };
    alt?: string;
  };
  title: string;
}

export default function Logo() {
  const [logo, setLogo] = useState<Logo | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "logo"][0]{
            logo { asset->{url, metadata} },
            title,
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
        <Image
          src={logo.logo.asset.url}
          alt={logo.logo.alt}
          width={logo.logo.asset.metadata.dimensions.width}
          height={logo.logo.asset.metadata.dimensions.height}
        />
        {logo.title}
      </Link>
    </div>
  );
}
