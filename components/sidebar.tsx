/* eslint-disable react/no-children-prop */
"use client";

import { NestedObject } from "@/lib/models";
import { useEffect } from "react";
import SidebarItem from "./sidebarItem";
import { useSidebarContext } from "@/lib/contexts/sidebarContext";

const Sidebar = () => {
  const { nestedKeys, fetchKeys } = useSidebarContext();

  useEffect(() => {
    if (Object.keys(nestedKeys).length === 0) {
      fetchKeys();
    }
  }, [nestedKeys, fetchKeys]);

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
