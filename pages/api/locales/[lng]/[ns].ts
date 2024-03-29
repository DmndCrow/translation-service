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

const createTranslationValue = async (
  languageId: number,
  key: string,
  value: string
) => {
  const translationKey = await prisma.translationKey.upsert({
    where: {
      key: key,
    },
    update: {},
    create: {
      key: key,
    },
  });

  await prisma.translationValue.upsert({
    where: {
      languageId_translationKeyId: {
        translationKeyId: translationKey.id,
        languageId: languageId,
      },
    },
    update: { value: value },
    create: {
      value: value,
      languageId: languageId,
      translationKeyId: translationKey.id,
    },
  });
};

const insertTranslationValues = async (
  languageId: number,
  data: { [key: string]: string }
) => {
  await Promise.all(
    Object.keys(data).map(async (key) => {
      await createTranslationValue(languageId, key, data[key]);
    })
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lng } = req.query;

  const language = await getLanguageByKey(lng as string);
  if (!language) return res.status(404).json({ message: "Not found" });

  if (req.method === "GET") {
    const translationValues = await getTranslationValues(language.id);

    const data = { ...translationValues };
    return res.json(data);
  }

  if (req.method === "POST") {
    const { data } = req.body;

    await insertTranslationValues(language.id, data);

    return res.status(200).json({ message: "success" });
  }

  return res.status(200).json({ message: "success" });
}
