"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";

interface Title2 {
  title2: string;
}

export default function Title() {
  const [title2, setTitle2] = useState<Title2 | null>(null);

  useEffect(() => {
    client
      .fetch<Title2>(
        `*[_type == "title"][0]{
            title2,
          }`
      )
      .then((data) => setTitle(data))
      .catch(console.error);
  }, []);

  if (!title) {
    return null;
  }

  return (
    <div className="">
      <h1 className="md:text-8xl text-6xl font-light">{title2.title}</h1>
      <br /> <br />
    </div>
  );
}
