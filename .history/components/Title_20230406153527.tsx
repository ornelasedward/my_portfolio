"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";

interface Title {
  firstsentence: string;
  secondsentence: string;
  thirdsentence: string;
}

export default function Title() {
  const [title, setTitle] = useState<Title | null>(null);

  useEffect(() => {
    client
      .fetch<Title>(
        `*[_type == "title"][0]{
            firstsentence,
            secondsentence,
            thirdsentence
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
      <h1 className="md:text-8xl text-6xl font-light">
        {title.firstsentence}{" "}
      </h1>
      <br /> <br />
      <div className="border-t-2 border-black pb-10 mt-20" />
      <h1 className="md:text-8xl text-6xl font-light">
        {title.secondsentence}{" "}
      </h1>
      <br /> <br />
      <h1 className="md:text-8xl text-6xl font-light">{title.thirdsentence}</h1>
    </div>
  );
}
