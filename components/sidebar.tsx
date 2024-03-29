/* eslint-disable react/no-children-prop */
"use client";

import { NestedObject, TranslationKey } from "@/lib/models";
import { useEffect, useState } from "react";
import SidebarItem from "./sidebarItem";
import { buildNestedObject } from "@/lib/functions";

const Sidebar = () => {
  const [nestedKeys, setNestedKeys] = useState({});

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    const response = await fetch("/api/database/key").then((a) => a.json());

    const nestedKeys = buildNestedObject(response);

    setNestedKeys(nestedKeys);
  };

  return (
    <aside>
      <div className="bg-gray-800 w-64 h-full absolute">
        {Object.entries(nestedKeys).map(([key, value], i) => (
          <div key={i} className="p-1 text-white">
            <SidebarItem label={key} children={value as NestedObject} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
