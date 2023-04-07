"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";

interface Title {
  firstSentence: string;
  secondSentence: string;
  thirdSentence: string;
}

export default function Title() {
  const [title, setTitle] = useState<Title | null>(null);

  useEffect(() => {
    client
      .fetch<Title>(
        `*[_type == "title"][0]{
            firstSentence,
            secondSentence,
            thirdSentence
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
        {title.firstSentence} <br />
        {title.secondSentence} <br />
        {title.thirdSentence}
      </h1>
    </div>
  );
}
