"use client";

import TranslationForm from "@/components/translation";
import { useRouter } from "next/router";
import React from "react";

const TranslationFormId = () => {
  const router = useRouter();

  if (router.query.id === undefined) {
    return null;
  }

  return <TranslationForm selectedKey={parseInt(router.query.id as string)} />;
};

export default TranslationFormId;
