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

  return (
    <aside>
      <div className="bg-gray-800 w-64 h-full absolute">
        <ul className="p-4 text-white">
          {keys.map((key, index) => {
            const link = `/translation/${key.id}`;

            return (
              <li key={index}>
                <a href={link}>{key.key}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
