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
    <div>
      <h1 className="md:text-9xl text-7xl font-light">
        {title.firstsentence} <br /> <br />
        <div className="border-b " />
        {title.secondsentence} <br /> <br />
        {title.thirdsentence}
      </h1>
    </div>
  );
}
