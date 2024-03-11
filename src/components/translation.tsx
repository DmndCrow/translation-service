"use client";

import React, { useState } from "react";

const TranslationForm: React.FC = () => {
  const [language, setLanguage] = useState("");
  const [translationKey, setTranslationKey] = useState("");
  const [translationValue, setTranslationValue] = useState("");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslationKey(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslationValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the submission, for example, sending the data to a backend service
    console.log(
      `Language: ${language}, Key: ${translationKey}, Value: ${translationValue}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-96 mx-auto my-10 p-6 bg-white rounded shadow"
    >
      <div className="mb-4">
        <label
          htmlFor="language"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Language
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Select language</option>
          {/* You would populate this with your available languages */}
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="translationKey"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Translation Key
        </label>
        <input
          id="translationKey"
          type="text"
          value={translationKey}
          onChange={handleKeyChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="translationValue"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Translation Value
        </label>
        <input
          id="translationValue"
          type="text"
          value={translationValue}
          onChange={handleValueChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save Translation
        </button>
      </div>
    </form>
  );
};

export default TranslationForm;
