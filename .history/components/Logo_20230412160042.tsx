"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col items-center">
      {logo.logo && (
        <Link href="/" className="flex items-center gap-2">
          <div className="h-12 w-12 items-center mb-4">
            <Image
              src={urlFor(logo.logo.asset).url()}
              alt={logo.title}
              width={100}
              height={100}
            />
          </div>
          {logo.title && (
            <div className="text-center">
              <div className="md:text-6xl text-2xl md:font-light transform rotate-90 inline-block">
                {logo.title.split("").map((char, index) => (
                  <span key={index} className="inline-block">
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Link>
      )}
      {!logo.logo && logo.title && (
        <div className="md:text-6xl text-2xl md:font-light text-center transform rotate-180 inline-block">
          {logo.title.split("").map((char, index) => (
            <span key={index} className="inline-block">
              {char}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
