import { useState, useEffect, useMemo } from 'react';

interface UseSearchProps<T> {
  items: T[];
  searchFields: (keyof T)[];
}

export function useSearch<T>({ items, searchFields }: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return String(value).toLowerCase().includes(searchLower);
      })
    );

    setFilteredItems(filtered);
  }, [items, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}