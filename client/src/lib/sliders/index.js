import config from "../config/"


function getDrumsInitValue(key, data) {
  return data.find((item) => item.key === key).init;
}

export function getDrums() {
  return {
    reverb: getDrumsInitValue("reverb", config.sliders),
    delay: getDrumsInitValue("delay", config.sliders),
    flanger: getDrumsInitValue("flanger", config.sliders),

    
  };
};
