"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";

interface Logo {
  _id: string;
  name: string;
  role: string;
  twitter: string;
  url: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function Logo() {
  const [logo, setLogo] = useState<Logo[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      const query = `*[_type == "logo"] | order(order asc) {
        _id,
        name,
        role,
        twitter,
        url,
        image {
          asset {
            _ref,
            _type
          },
          alt
        }
      }`;
      const result = await client.fetch<Logo[]>(query);
      setLogo(result);
    }
    fetchLogo();
  }, []);

  return (
    <div>
      <Link
        href="/"
        className="bg-black bg-clip-text text-transparent md:text-6xl text-4xl font-normal flex gap-2"
      >
        <div className="h-16 w-16 border-2">
          {logo.logo.asset.metadata?.dimensions && (
            <Image
              src={logo.logo.asset.url}
              alt={logo.title}
              width={logo.logo.asset.metadata.dimensions.width}
              height={logo.logo.asset.metadata.dimensions.height}
            />
          )}
        </div>
        <div>{logo.title}</div>
      </Link>
    </div>
  );
}
