const { IS_ADD_LANGUAGE_ENABLED } = process.env;

const constants = {
  IS_ADD_LANGUAGE_ENABLED: IS_ADD_LANGUAGE_ENABLED === "true",
};

export default constants;
