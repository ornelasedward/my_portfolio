"use client";
import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { useEffect } from "react";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug);

  useEffect(() => {
    const d = document;
    const w = "https://tally.so/widgets/embed.js";
    const v = () => {
      if (typeof Tally !== "undefined") {
        Tally.loadEmbeds();
      } else {
        d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
          e.src = e.dataset.tallySrc;
        });
      }
    };
    if (typeof Tally !== "undefined") {
      v();
    } else if (d.querySelector(`script[src="${w}"]`) == null) {
      const s = d.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      d.body.appendChild(s);
    }
  }, []);

  return (
    <div>
      <h1 className="bg-gray-900 bg-clip-text text-transparent text-9xl font-extralight">
        {page.title}
      </h1>
      <div className="text-4xl text-gray-700 mt-10">
        <PortableText value={page.content} />
      </div>
      <iframe
        data-tally-src="https://tally.so/embed/3jZYQ9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="200"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="Contact Form"
      ></iframe>
    </div>
  );
}
