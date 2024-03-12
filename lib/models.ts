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
  key: string;
  language: string;
  value: string;
  createdAt: Date;
};
