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
  values?: TranslationValue[];
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

export type NestedObject = {
  [key: string]: NestedObject | (TranslationKey & { __isLeaf: boolean });
};

export type SidebarItemProps = {
  label: string;
  children?: NestedObject;
};

export type SidebarProps = {
  nestedKeys: NestedObject;
};
