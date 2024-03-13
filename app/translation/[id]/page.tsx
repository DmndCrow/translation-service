"use client";

import TranslationForm from "@/components/translation";
import { useParams } from 'next/navigation'
import React from "react";

const TranslationFormId = () => {
  const params = useParams();

  console.log(params);

  return <TranslationForm selectedKey={1} />;
};

export default TranslationFormId;
