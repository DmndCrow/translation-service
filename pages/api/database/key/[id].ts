import { QueryProps } from "@/lib/models";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as QueryProps;

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  const getTranslationKey = async (keyId: number) => {
    return await prisma.translationKey.findFirst({
      where: { id: keyId },
    });
  };

  if (req.method === "GET") {
    const response = await getTranslationKey(+id);

    return res.status(200).json(response);
  }
}
