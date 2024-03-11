"use client";

import { Language, TranslationKey } from "@/lib/models";
import React, { useEffect, useState } from "react";

interface Translations {
  [id: number]: string;
}

type ParentProps = {
  selectedKey?: TranslationKey;
  languages: Language[];
};

type Props = ParentProps;

const TranslationForm = ({ selectedKey, languages }: Props) => {
  const [translationKey, setTranslationKey] = useState("");
  const [translationValue, setTranslationValue] = useState<Translations>({});
  useEffect(() => {
    const initial: Translations = languages.reduce(
      (orig, lang) => ({ ...orig, [lang.id]: "" }),
      {}
    );
    setTranslationValue({ ...initial });
  }, [languages]);

  if (!selectedKey) {
    return null;
  }

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslationKey(event.target.value);
  };

  const handleValueChange = (langId: number, value: string) => {
    const current = translationValue[langId];

    setTranslationValue({ ...translationValue, [langId]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the submission, for example, sending the data to a backend service
    console.log(`Key: ${translationKey}`);
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
        {languages.map((language: Language) => {
          return (
            <React.Fragment key={language.id}>
              <label
                htmlFor="translationValue"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {language.key.toUpperCase()}
              </label>
              <input
                id="translationValue"
                type="text"
                value={translationValue[language.id]}
                onChange={(e) => handleValueChange(language.id, e.target.value)}
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
