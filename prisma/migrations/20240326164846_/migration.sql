-- CreateTable
CREATE TABLE "TranslationKey" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TranslationKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranslationValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "translationKeyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TranslationValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TranslationKey_key_key" ON "TranslationKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Language_key_key" ON "Language"("key");

-- CreateIndex
CREATE INDEX "TranslationValue_languageId_idx" ON "TranslationValue"("languageId");

-- CreateIndex
CREATE INDEX "TranslationValue_translationKeyId_idx" ON "TranslationValue"("translationKeyId");

-- CreateIndex
CREATE INDEX "TranslationValue_languageId_translationKeyId_idx" ON "TranslationValue"("languageId", "translationKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "TranslationValue_languageId_translationKeyId_key" ON "TranslationValue"("languageId", "translationKeyId");

-- AddForeignKey
ALTER TABLE "TranslationValue" ADD CONSTRAINT "TranslationValue_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranslationValue" ADD CONSTRAINT "TranslationValue_translationKeyId_fkey" FOREIGN KEY ("translationKeyId") REFERENCES "TranslationKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
