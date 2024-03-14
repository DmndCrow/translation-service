/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `TranslationKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TranslationKey_key_key" ON "TranslationKey"("key");
