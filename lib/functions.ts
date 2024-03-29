import { NestedObject, TranslationKey } from "./models";

export const buildNestedObject = (keys: TranslationKey[]): NestedObject => {
  const result: NestedObject = {};
  keys.forEach((item) => {
    const parts: string[] = item.key.split(".");
    let current: any = result;

    parts.forEach((part: string, index) => {
      if (!current[part]) {
        current[part] = {};
      }
      if (index === parts.length - 1) {
        current[part] = {
          ...item,
          __isLeaf: true,
        };
      }
      current = current[part] as NestedObject;
    });
  });
  return result;
};

export const generateEnums = (keys: string[]): any => {
  const enumGroups: Record<string, Record<string, string>> = {};

  keys.forEach((key) => {
    if (key.includes(".")) {
      const [prefix, ...rest] = key.split(".");
      const enumKey: string = rest.join("__");
      if (!enumGroups[prefix]) {
        enumGroups[prefix] = {};
      }
      enumGroups[prefix][enumKey] = key;
    }
  });

  return enumGroups;
};

export const prettifyEnum = (response: string) => {
  const formatted = response.replace(/\\n/g, "\n").replace(/\\"/g, '"');
  return `{\n${formatted}\n}`;
};
