"use client";

import { Language, TranslationValue } from "@/lib/models";
import { PostBodyProps } from "@/pages/api/database/translationKey/[id]";
import React, { useEffect, useState } from "react";

type NewKey = {
  id?: number;
  key: string;
};

interface Translations {
  [id: number]: string;
}

type ParentProps = {
  selectedKey?: number;
};

type Props = ParentProps;

const TranslationForm = ({ selectedKey }: Props) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translationKey, setTranslationKey] = useState("");
  const [translationValue, setTranslationValue] = useState<Translations>({});

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedKey) {
      const fetchKey = async () => {
        const response = await fetch(`/api/database/key/${selectedKey}`).then(
          (a) => a.json()
        );

        setTranslationKey(response.key);
      };

      const fetchTranslations = async () => {
        const response: TranslationValue[] = await fetch(
          `/api/database/translationKey/${selectedKey}`
        ).then((a) => a.json());

        const initial: Translations = response.reduce(
          (orig, lang) => ({ ...orig, [lang.languageId]: lang.value }),
          {}
        );
        setTranslationValue({ ...initial });
      };

      fetchKey();
      fetchTranslations();
    }
  }, [selectedKey]);

  useEffect(() => {
    if (
      languages.length > 0 &&
      Object.keys(translationValue).length < languages.length
    ) {
      const initial: Translations = languages.reduce(
        (orig, lang) => ({ ...orig, [lang.id]: "" }),
        {}
      );
      setTranslationValue({ ...initial, ...translationValue });
    }
  }, [languages, translationValue]);

  const fetchLanguages = async () => {
    const response = await fetch("/api/database/language").then((a) =>
      a.json()
    );

    setLanguages(response);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslationKey(event.target.value);
  };

  const handleValueChange = (langId: number, value: string) => {
    setTranslationValue({ ...translationValue, [langId]: value });
  };

  const getKey = async () => {
    const params: NewKey = { key: translationKey };

    if (selectedKey) {
      params.id = selectedKey;
    }

    const response = await fetch("/api/database/key", {
      method: "POST",
      body: JSON.stringify(params),
    }).then((a) => a.json());

    setTranslationKey(response.key);

    return response;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const translationKeyResponse = await getKey();

    const props: PostBodyProps = {
      values: Object.keys(translationValue).map((langId) => ({
        languageId: +langId,
        value: translationValue[+langId],
      })),
    };

    const id = translationKeyResponse.id;
    await fetch(`/api/database/translationKey/${id}`, {
      method: "POST",
      body: JSON.stringify(props),
    }).then((a) => a.json());

    window.location.reload();
  };

  const deleteKey = () => {
    fetch(`/api/database/key/${selectedKey}`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/";
    });
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
          Ключ
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
              <textarea
                id="translationValue"
                cols={80}
                rows={3}
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
          {selectedKey ? "Обновить перевод" : "Добавить перевод"}
        </button>

        {selectedKey && (
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => deleteKey()}
          >
            {"Удалить ключ"}
          </button>
        )}
      </div>
    </form>
  );
};

export default TranslationForm;
