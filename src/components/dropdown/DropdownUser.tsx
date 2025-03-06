import { FC, useState } from 'react';
import { Dropdown } from './Dropdown'
import { DropdownItem } from './DropdownItem';

const dropdownItems: DropdownItem[] = [
  {
    id: 'random_id_1',
    label: 'New York',
    value: 'new york'
  },
  {
    id: 'random_id_2',
    label: 'Los Angeles',
    value: 'los angeles'
  },
  {
    id: 'random_id_3',
    label: 'Chicago',
    value: 'chicago'
  },
  {
    id: 'random_id_4',
    label: 'Dallas',
    value: 'dallas'
  }
];

export const DropdownUser: FC = () => {
  const [selectedDropdownItems, setSelectedDropdownItems] = useState<DropdownItem[]>([]);
  return (
    <Dropdown
      items={dropdownItems}
      selectedItems={selectedDropdownItems}
      setSelectedItems={setSelectedDropdownItems}
    />
  )
};
