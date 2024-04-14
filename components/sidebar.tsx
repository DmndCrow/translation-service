/* eslint-disable react/no-children-prop */
"use client";

import { NestedObject } from "@/lib/models";
import { useEffect, useState } from "react";
import SidebarItem from "./sidebarItem";
import { useSidebarContext } from "@/lib/contexts/sidebarContext";

const Sidebar = () => {
  const { nestedKeys, fetchKeys } = useSidebarContext();
  const [isDefaultOpen, setIsDefaultOpen] = useState(true);

  useEffect(() => {
    if (Object.keys(nestedKeys).length === 0) {
      fetchKeys();
    }
  }, [nestedKeys, fetchKeys]);

  return (
    <aside>
      <div className="bg-gray-800 w-64 h-full absolute overflow-auto">
        <button
          onClick={() => setIsDefaultOpen(!isDefaultOpen)}
          className="text-gray-50 border-white border-2 p-1 bg-gray-800 text-left"
        >
          {isDefaultOpen ? "Свернуть" : "Раскрыть"}
        </button>

        {Object.entries(nestedKeys).map(([key, value], i) => (
          <div key={i} className="p-1 text-white">
            <SidebarItem
              isDefaultOpen={isDefaultOpen}
              label={key}
              children={value as NestedObject}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
