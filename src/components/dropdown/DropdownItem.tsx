import { FC } from "react";
import classes from './DropdownItem.module.css';

export interface DropdownItem {
  id: string;
  label: string;
  value: string;
}

interface DropdownItemProps {
  item: DropdownItem;
  isSelected?: boolean;
  setSelected: () => void;
}

export const DropdownItemComp: FC<DropdownItemProps> = ({
  item,
  isSelected,
  setSelected
}) => {
  return (
    <li className={classes['dropdown-item']} onClick={setSelected}>
      <input type="checkbox" checked={isSelected} onChange={setSelected} />
      {item.label}
    </li>
  )
};
