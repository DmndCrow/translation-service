"use client";

import { TranslationKey } from "@/lib/models";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [keys, setKeys] = useState<TranslationKey[]>([]);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    const response = await fetch("/api/database/key").then((a) => a.json());

    setKeys(response);
  };

  const isCompleted = (key: TranslationKey) => {
    const values = key.values?.filter((x) => +x.languageId !== 1);

    return values?.length === 2 && values.every((x) => x.value !== "");
  };

  const redirect = (link: string) => {
    window.location.href = link;
  };

  return (
    <aside>
      <div className="bg-gray-800 w-64 h-full absolute">
        <ul className="p-4 text-white">
          {keys.map((key, index) => {
            const link = `/translation/${key.id}`;

            return (
              <li key={index}>
                <div
                  onClick={() => redirect(link)}
                  className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200 ease-in-out"
                >
                  <input
                    checked={isCompleted(key)}
                    onChange={(e) => {}}
                    id="disabled-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  &nbsp;
                  <label
                    htmlFor="disabled-checkbox"
                    className="cursor-pointer text-white-700 text-sm font-bold mb-2"
                  >
                    {key.key}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
