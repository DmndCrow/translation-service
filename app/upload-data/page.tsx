"use client";

import React, { useEffect, useState } from "react";
import { Language } from "@/lib/models";
import { useSidebarContext } from "@/lib/contexts/sidebarContext";

const UploadData = () => {
  const { fetchKeys: refreshSidebarContent } = useSidebarContext();

  const [jsonValue, setJsonValue] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    const response = await fetch("/api/database/language").then((a) =>
      a.json()
    );

    setLanguages(response);
  };

  const updateJsonValue = (value: string) => {
    try {
      const json = JSON.parse(value);
      setJsonValue(JSON.stringify(json, null, 2));
    } catch (e) {
      setJsonValue(JSON.stringify(e, null, 2));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const json = JSON.parse(jsonValue);

    await fetch(`/api/locales/${selectedLanguage}/ns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: json }),
    });

    await refreshSidebarContent();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-96 mx-auto my-10 p-6 bg-white rounded shadow"
    >
      <div className="mb-4">
        <label
          htmlFor="languages"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Язык
        </label>
        <select
          id="languages"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {languages.map((language: Language, index) => {
            return (
              <option key={index} value={language.key}>
                {language.key}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-6">
        <React.Fragment>
          <label
            htmlFor="translationValue"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {"JSON-значение"}
          </label>
          <textarea
            id="translationValue"
            cols={80}
            rows={10}
            value={jsonValue}
            onChange={(e) => updateJsonValue(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </React.Fragment>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {"Обновить данные"}
        </button>
      </div>
    </form>
  );
};

export default UploadData;
