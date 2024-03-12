// pages/api/locales/[lng]/[ns].ts
import { NextApiRequest, NextApiResponse } from "next";

interface Translations {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const translations: Translations = {
  en: {
    translation: {
      welcome: "EN Welcome {{email}} to my website!",
      description: "This is a demo website to show how to use React i18n.",
      confirm: "Test confirm",
      close: "Test close",
      login: "Login",
      save_changes: "Save changes",
    },
  },
  kz: {
    translation: {
      welcome: "KZ Welcome {{email}} to my website!",
      description: "This is a demo website to show how to use React i18n.",
      confirm: "Test confirm kz",
      close: "Test close kz",
      login: "Логин",
      save_changes: "Сактау",
    },
  },
  ru: {
    translation: {
      welcome: "RU Welcome {{email}} to my website!",
      description: "This is a demo website to show how to use React i18n.",
      confirm: "Test confirm ru",
      close: "Test close ru",
      login: "Логин",
      save_changes: "Сохранить изменения",
    },
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lng, ns } = req.query;

  // Check if the requested language and namespace exist
  if (
    !translations[lng as string] ||
    !translations[lng as string][ns as string]
  ) {
    return res.status(404).json({ message: "Not found" });
  }

  const data = translations[lng as string][ns as string];
  return res.json(data);
}
