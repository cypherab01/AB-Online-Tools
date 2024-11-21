"use client";

import { useState, useEffect } from "react";

const ResultUI = () => {
  const [data, setData] = useState("");
  const [counts, setCounts] = useState({ wordCount: 0, characterCount: 0 });

  useEffect(() => {
    const wordCount = handleWordCount();
    const characterCount = handleCharacterCount();
    setCounts({ wordCount, characterCount });
  }, [data]);

  const handleWordCount = () => {
    if (data === null) return 0;
    return data
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleCharacterCount = () => {
    return data.length;
  };

  // Ensure the initial render matches the client-side state
  const initialCounts = {
    wordCount: handleWordCount(),
    characterCount: handleCharacterCount(),
  };

  return (
    <>
      <div className="py-4 text-3xl">{`${
        counts.wordCount || initialCounts.wordCount
      } words and ${
        counts.characterCount || initialCounts.characterCount
      } characters.`}</div>
      <textarea
        name="text_data"
        id="textData"
        onChange={(e) => setData(e.target.value)}
        rows={10}
        className="border-2 outline-2 border-sky-300 w-full p-2 rounded-md focus:outline-sky-500"
      ></textarea>
    </>
  );
};

export default ResultUI;
