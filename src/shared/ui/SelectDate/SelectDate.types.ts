import { ISelectBaseProps } from "../SelectBase/SelectBase.types";

export interface ISelectDateProps
  extends Omit<ISelectBaseProps, "children" | "icon" | "rotateIcon" | "value"> {
  value?: Date;
  onSelect?: (date: Date | undefined) => void;
}