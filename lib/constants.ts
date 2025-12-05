const { IS_ADD_LANGUAGE_ENABLED, NEXT_PUBLIC_BASE_PATH } = process.env;

const constants = {
  IS_ADD_LANGUAGE_ENABLED: IS_ADD_LANGUAGE_ENABLED === "true",
  BASE_PATH: NEXT_PUBLIC_BASE_PATH || "",
};

export default constants;
