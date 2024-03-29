// pages/api/locales/[lng]/[ns].ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getLanguageByKey } from "../../database/language";

interface Translations {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const getTranslationValues = async (languageId: number) => {
  const values = await prisma.translationValue.findMany({
    where: { languageId: languageId },
    include: { translationKey: true },
  });

  return values.reduce(
    (orig, cur) => ({ ...orig, [cur.translationKey.key]: cur.value }),
    {}
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lng, ns } = req.query;

  const language = await getLanguageByKey(lng as string);
  if (!language) return res.status(404).json({ message: "Not found" });

  const translationValues = await getTranslationValues(language.id);

  const data = { ...translationValues };
  return res.json(data);
}
