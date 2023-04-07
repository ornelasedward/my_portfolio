"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

interface Logo {
  _id: string;
  logo: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  title: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function Logo() {
  const [logo, setLogo] = useState<Logo | null>(null);

  useEffect(() => {
    async function fetchLogo() {
      const query = `*[_type == "logo"][0] {
        _id,
        logo {
          asset {
            _ref,
            _type
          },
          alt
        },
        title
      }`;
      const result = await client.fetch<Logo | null>(query);
      setLogo(result);
    }
    fetchLogo();
  }, []);

  if (!logo) {
    return null;
  }

  return (
    <div>
      <a href="/">
        <div className="h-16 w-16 border-2">
          <Image
            src={urlFor(logo.logo.asset).url()}
            alt={logo.title}
            width={100}
            height={100}
          />
        </div>
        <div>{logo.title}</div>
      </a>
    </div>
  );
}
