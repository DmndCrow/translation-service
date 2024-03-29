// pages/api/locales/model.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getLanguageByKey } from "../database/language";
import { generateEnums, prettifyEnum } from "@/lib/functions";
import { TranslationKey } from "@/lib/models";

const getKeys = async () => {
  return await prisma.translationKey.findMany({
    orderBy: { key: "asc" },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const language = await getLanguageByKey("en");
  if (!language) return res.status(404).json({ message: "EN not found" });

  if (req.method === "GET") {
    const keys = await getKeys();

    const nested = generateEnums(keys.map((x: TranslationKey) => x.key));

    return res.status(200).json(nested);
  }

  return res.status(200).json({ message: "success" });
}
