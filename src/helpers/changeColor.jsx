import tinycolor from "tinycolor2";

export const adjustColor = (color, count) => {
  return tinycolor(color).lighten(count).toString();
};

export const revertColor = (color, amount) => {
  return tinycolor(color).lighten(amount).toString();
};
