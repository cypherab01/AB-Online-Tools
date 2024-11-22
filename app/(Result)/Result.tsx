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

  const downloadText = () => {
    if (data) {
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filenameParts = data.trim().split(/\s+/).slice(0, 2);
      const formattedFilename =
        filenameParts
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Text_data";
      a.download = `${formattedFilename}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const clearText = () => {
    setData("");
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
        value={data}
      ></textarea>
      <div className="flex items-center justify-start gap-4">
        <button
          onClick={downloadText}
          className={`mt-4 ${
            !data ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500"
          } text-white p-2 rounded-md`}
          disabled={!data}
        >
          Download Text
        </button>
        <button
          onClick={clearText}
          className="mt-4 bg-red-500 text-white p-2 rounded-md"
        >
          Clear Text
        </button>
      </div>
    </>
  );
};

export default ResultUI;
