import React from "react";

export type TypographyVariant =
  | "heading-l-regular-20"
  | "body-l-medium-20"
  | "body-l-regular-20"
  | "body-m-medium-16"
  | "body-m-regular-16"
  | "label-s-regular-12"
  | "label-s-semibold-12";

export type TextTag = "span";
export type TitleTag = "h3";

export type TypographyProps<T = TextTag | TitleTag> = {
  Tag?: T;
  variant?: TypographyVariant;
  className?: string;
  children?: React.ReactNode;
};