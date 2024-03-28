import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getKeys = async () => {
  return await prisma.translationKey.findMany({
    orderBy: { key: "asc" },
    include: {
      values: true,
    },
  });
};

const createKeyByKey = async (key: string) => {
  return await prisma.translationKey.upsert({
    where: { key: key },
    update: {},
    create: { key: key },
  });
};

const createKeyById = async (id: number, key: string) => {
  return await prisma.translationKey.upsert({
    where: { id: id },
    update: { key: key },
    create: { key: key },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, key } = JSON.parse(req.body);
    let response = null;

    if (id) {
      response = await createKeyById(id, key);
    } else {
      response = await createKeyByKey(key);
    }

    return res.status(200).json(response);
  } else {
    const response = await getKeys();

    return res.status(200).json(response);
  }
}
