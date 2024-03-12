"use client";

import { useState } from "react";

const AddLanguage = () => {
  const [key, setKey] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const addLanguage = async () => {
    await fetch("/api/database/language", {
      method: "POST",
      body: JSON.stringify({ key, language }),
    }).then((a) => {
      return a.json();
    });

    setKey("");
    setLanguage("");
  };

  return (
    <div className="flex">
      <input
        id="translationValue"
        type="text"
        value={key}
        placeholder="en"
        onChange={(e) => setKey(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        id="translationValue"
        type="text"
        value={language}
        placeholder="English"
        onChange={(e) => setLanguage(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={() => addLanguage()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={key.length === 0 || language.length === 0}
      >
        Add Language
      </button>
    </div>
  );
};

export default AddLanguage;
