import { useEffect, useState } from "react";

interface UsePagesProps<T> {
  data: T[];
  rowsPerPage: number;
  currentPageNum?: number;
}

interface UsePagesReturn<T> {
  numOfPages: number;
  pages: T[][];
  pageItems: T[];
}

function paginate<T>(items: T[], itemsPerPage: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => 
    items.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
  );
}

export const usePages = <T,>({
  data,
  rowsPerPage = 10,
  currentPageNum = 1
}: UsePagesProps<T>): UsePagesReturn<T> => {
  const [pages, setPages] = useState<T[][]>([]);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    const numPages = Math.ceil(data.length/rowsPerPage);

    setNumOfPages(numPages);

    setPages(paginate(data, rowsPerPage));
  }, [data, rowsPerPage]);

  return {
    numOfPages,
    pages,
    pageItems: pages[currentPageNum - 1] || []
  };
};
