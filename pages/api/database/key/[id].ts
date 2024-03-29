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

  const deleteTranslationKey = async (keyId: number) => {
    return await prisma.translationKey.delete({
      where: { id: keyId },
    });
  };

  if (req.method === "GET") {
    const response = await getTranslationKey(+id);

    return res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    await deleteTranslationKey(+id);

    return res.status(200).json({ message: "Translation key deleted" });
  }
}
