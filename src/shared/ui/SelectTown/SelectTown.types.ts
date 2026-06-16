import { ISelectBaseProps } from "../SelectBase/SelectBase.types";

export interface ISelectTownProps  
  extends Omit<ISelectBaseProps, 'children' | 'icon' | 'rotateIcon'> {
    options: string[];
    onSelect: (value: string) => void;
}