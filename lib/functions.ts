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
