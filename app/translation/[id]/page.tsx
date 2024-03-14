"use client";

import TranslationForm from "@/components/translation";
import { useParams } from "next/navigation";
import React from "react";

const TranslationFormId = () => {
  const params = useParams();

  // check if params has id and its not string[] and its number
  if (!params?.id || Array.isArray(params.id) || isNaN(parseInt(params.id))) {
    return null;
  }

  return <TranslationForm selectedKey={+params.id} />;
};

export default TranslationFormId;
