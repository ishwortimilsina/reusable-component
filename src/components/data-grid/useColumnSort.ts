import { useEffect, useState } from "react";
import { Column } from "./gridData";

interface UseColumnSortProps<T> {
  data: T[];
  sortCol?: Column;
  sortDir?: 'asc' | 'desc' | '';
}

export const useColumnSort = <T>({ data, sortCol, sortDir }: UseColumnSortProps<T>) => {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    if (!sortCol) {
      setSortedData(data);
    } else if (!sortDir) {
      setSortedData(data);
    } else {
      const negative = sortDir === 'asc' ? -1 : 1;
      const positive = sortDir === 'asc' ? 1 : -1;

      const newSortedData = data.toSorted((a: any, b: any) => {
        if (a[sortCol.field] > b[sortCol.field]) {
          return positive;
        }
        return negative;
      });

      setSortedData(newSortedData);
    }
  }, [sortDir, sortCol, data]);

  return {
    sortedData,
    sortDir
  };
};
