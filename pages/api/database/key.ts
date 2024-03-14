import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getKeys = async () => {
  return await prisma.translationKey.findMany({
    orderBy: { key: "asc" },
  });
};

const createKey = async (key: string) => {
  return await prisma.translationKey.upsert({
    where: { key: key },
    update: {},
    create: { key: key },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { key } = JSON.parse(req.body);

    const response = await createKey(key);

    return res.status(200).json(response);
  } else {
    const response = await getKeys();

    return res.status(200).json(response);
  }
}
