import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export const getLanguageByKey = async (key: string) => {
  return await prisma.language.findFirst({
    where: { key: key },
  });
}

const getLanguages = async () => {
  return await prisma.language.findMany();
};

const createLanguage = async (key: string, language: string) => {
  return await prisma.language.upsert({
    where: { key: key },
    update: { name: language },
    create: { key: key, name: language },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { key, language } = JSON.parse(req.body);

    const response = await createLanguage(key, language);

    return res.status(200).json(response);
  } else {
    const response = await getLanguages();

    return res.status(200).json(response);
  }
}
