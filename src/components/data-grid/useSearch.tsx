import { useState } from 'react';
import React from 'react';
import { debounce } from '../../utils/rateLimit';

interface DataGridProps<T> {
  data: T[];
}

interface UseSearchReturn<T> {
  items: T[];
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

export const useSearch = <T,>({ data }: DataGridProps<T>): UseSearchReturn<T> => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(data);

  const handleSearchQueryChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
    debounce((val) => {
      if (val) {
        const newItems = items.filter(it => JSON.stringify(it).toLowerCase().includes(val.toLowerCase()));
        setItems(newItems);
      } else {
        setItems(data);
      }
    }, 200)(target.value);
  };

  return {
    searchQuery,
    handleQueryChange: handleSearchQueryChange,
    items
  };
};
