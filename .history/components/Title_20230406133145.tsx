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
      <h1 className="md:text-8xl text-7xl font-light">
        {title.firstsentence}{" "}
      </h1>
      <br /> <br />
      <div className="border-b-2 border-black py-10" />
      <h1 className="md:text-8xl text-7xl font-light">
        {title.secondsentence}{" "}
      </h1>
      <br /> <br />
      <h1 className="md:text-9xl text-7xl font-light">{title.thirdsentence}</h1>
    </div>
  );
}
