import config from "../config/"


function getColorInitValue(key, data) {
  return data.find((item) => item.key === key).init;
}

export function getColors() {
  return {
    red: getColorInitValue("red", config.sliders),
    green: getColorInitValue("green", config.sliders),
    blue: getColorInitValue("blue", config.sliders),

    
  };
};
