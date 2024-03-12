import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type QueryProps = {
  id: string;
};

export type TranslationValue = {
  languageId: number;
  value: string;
};

export type PostBodyProps = {
  values: TranslationValue[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as QueryProps;

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  const getTranslationValues = async (keyId: number) => {
    return await prisma.translationValue.findMany({
      where: { translationKeyId: keyId },
    });
  };

  const createTranslationValue = async (
    keyId: number,
    languageId: number,
    value: string
  ) => {
    return await prisma.translationValue.upsert({
      where: {
        languageId_translationKeyId: {
          translationKeyId: keyId,
          languageId: languageId,
        },
      },
      update: { value: value },
      create: { translationKeyId: keyId, languageId: languageId, value: value },
    });
  };

  if (req.method === "POST") {
    const { values } = JSON.parse(req.body) as PostBodyProps;

    const promises = values.map((value: TranslationValue) => {
      return createTranslationValue(+id, value.languageId, value.value);
    });

    const response = await Promise.all(promises);

    return res.status(200).json(response);
  } else {
    const response = await getTranslationValues(+id);

    return res.status(200).json(response);
  }
}
