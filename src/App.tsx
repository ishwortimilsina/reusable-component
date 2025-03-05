import { useState } from 'react';
import './App.css'
import { Dropdown } from './components/dropdown/Dropdown'
import { DropdownItem } from './components/dropdown/DropdownItem';

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

function App() {
  const [selectedDropdownItems, setSelectedDropdownItems] = useState<DropdownItem[]>([]);
  return (
    <>
      <Dropdown
        items={dropdownItems}
        selectedItems={selectedDropdownItems}
        setSelectedItems={setSelectedDropdownItems}
      />
    </>
  )
}

export default App
