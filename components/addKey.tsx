"use client";

import { useState } from "react";

const AddKey = () => {
  const [key, setKey] = useState<string>("");

  const addKey = async () => {
    await fetch("/api/database/key", {
      method: "POST",
      body: JSON.stringify({ key }),
    }).then((a) => {
      return a.json();
    });

    setKey("");
  };

  return (
    <div className="flex">
      <input
        id="translationValue"
        type="text"
        value={key}
        placeholder="welcome"
        onChange={(e) => setKey(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={() => addKey()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={key.length === 0}
      >
        Add Key
      </button>
    </div>
  );
};

export default AddKey;
