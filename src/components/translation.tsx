"use client";

import React, { useState } from "react";

const languages = ["en", "ru", "kz"];
const init: Translations = languages.reduce(
  (orig, lang) => ({ ...orig, [lang]: "" }),
  {}
);

interface Translations {
  [key: string]: string;
}

const TranslationForm: React.FC = () => {
  const [language, setLanguage] = useState("");
  const [translationKey, setTranslationKey] = useState("");
  const [translationValue, setTranslationValue] = useState<Translations>({
    ...init,
  });

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslationKey(event.target.value);
  };

  const handleValueChange = (lang: string, value: string) => {
    setTranslationValue({ ...translationValue, [lang]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the submission, for example, sending the data to a backend service
    console.log(`Language: ${language}, Key: ${translationKey}`);
    console.log(translationValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-96 mx-auto my-10 p-6 bg-white rounded shadow"
    >
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
        {languages.map((lang: string, index) => {
          return (
            <React.Fragment key={index}>
              <label
                htmlFor="translationValue"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {lang.toUpperCase()}
              </label>
              <input
                id="translationValue"
                type="text"
                value={translationValue[lang]}
                onChange={(e) => handleValueChange(lang, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </React.Fragment>
          );
        })}
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
