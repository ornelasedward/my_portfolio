"use client";
import { useState, useEffect } from "react";
import { client } from "../lib/sanity.client";

interface Title {
  firstsentence: string;
  secondsentence: string;
  thirdsentence: string;
}

export default function Description() {
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
      <p className="mt-10 text-2xl text-gray-600">{description.descriptipn}</p>
    </div>
  );
}
