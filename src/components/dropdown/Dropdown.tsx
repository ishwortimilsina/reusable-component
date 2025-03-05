import { FC, useEffect, useRef, useState } from "react";
import classes from './Dropdown.module.css';
import { DropdownItem, DropdownItemComp } from "./DropdownItem";

interface DropdownProps {
  items: DropdownItem[];
  selectedItems: DropdownItem[];
  setSelectedItems: (_items: DropdownItem[]) => void;
}

const isItemSelected = (selectedItems: DropdownItem[], item: DropdownItem) => {
  return !!selectedItems.find(si => si.id === item.id);
};

export const Dropdown: FC<DropdownProps> = ({
  items,
  selectedItems,
  setSelectedItems
}) => {
  const allSelectedItemLabels = selectedItems.map(item => item.label).join(', ');

  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [menuBase, setMenuBase] = useState('');
  const [displayItems, setDisplayItems] = useState(items);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target as any)) {
          setOpen(false);
        }
      }
    }
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);
  
  const handleSelectionChange = (item: DropdownItem) => {
    if (isItemSelected(selectedItems, item)) {
      const newSelectedItems = selectedItems.filter(si => si.id !== item.id);
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([
        ...selectedItems,
        item
      ]);
    }
  };

  return (
    <div className={classes.dropdown} ref={menuRef}>
      <button onClick={() => setOpen(!open)}>
        {allSelectedItemLabels || 'Select a city'}
      </button>
      {open ? <div className={classes.dropdownMenu}>
        <ul className={classes.dropdownMenuList}>
          {items.map(item => <DropdownItemComp
            key={item.id}
            item={item}
            isSelected={isItemSelected(selectedItems, item)}
            setSelected={() => handleSelectionChange(item)}
          />)}
        </ul>
      </div> : null}
    </div>
  )
};