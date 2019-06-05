import config from "../config/"

function getDrumsInitValue(key, data) {
  return data.find((item) => item.key === key).init;
}

export function getDrums() {
  return {
    hh: getDrumsInitValue("hh", config.sliders),
    clap: getDrumsInitValue("clap", config.sliders),
    bass: getDrumsInitValue("bass", config.sliders),

    
  };
};
