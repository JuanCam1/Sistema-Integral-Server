import { words } from "capitalize";

export const capitalizeText = (text: string) => {
  return words(text.toLowerCase());
};
