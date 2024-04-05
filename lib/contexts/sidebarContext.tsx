"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { buildNestedObject } from "../functions";
import { NestedObject } from "../models";

type SidebarContextType = {
  fetchKeys: () => void;
  nestedKeys: NestedObject;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarContextProvider = ({ children }: PropsWithChildren) => {
  const [nestedKeys, setNestedKeys] = useState({});

  const fetchKeys = async () => {
    const response = await fetch("/api/database/key").then((a) => a.json());

    const nestedKeys = buildNestedObject(response);

    setNestedKeys(nestedKeys);
  };

  return (
    <SidebarContext.Provider
      value={{
        nestedKeys,
        fetchKeys,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }

  return context;
};
