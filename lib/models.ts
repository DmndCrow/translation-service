export type Language = {
  id: number;
  key: string;
  name: string;
  createdAt: Date;
};

export type TranslationKey = {
  id: number;
  key: string;
  createdAt: Date;
};

export type TranslationValue = {
  id: number;
  translationKeyId: string;
  languageId: string;
  value: string;
  createdAt: Date;
};

export type QueryProps = {
  id: string;
};
