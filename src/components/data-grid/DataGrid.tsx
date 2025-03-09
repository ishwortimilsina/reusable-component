import { ReactNode, useState } from 'react';
import React from 'react';
import classes from './DataGrid.module.css';
import { usePages } from './usePages';

const debounce = <T extends (...args: any) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    setTimeout(() => fn(...args), delay);
  };
};

interface DataGridProps<T extends { id: string | number; [key: string]: any }> {
  data: T[],
  headers: { key: string, label: string }[]
  getValue?: (datum: T, key: string | number) => string | number;
  rowsNum?: number;
  gridTitle?: ReactNode;
}

export const DataGrid = <T extends { id: string | number; [key: string]: any }>({
  data,
  headers,
  getValue,
  rowsNum = 10,
  gridTitle
}: DataGridProps<T>) => {
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(data);

  const { pageItems, numOfPages } = usePages({
    data: items,
    rowsPerPage: rowsNum,
    currentPageNum
  });

  if (!headers.length) {
    throw "Headers must be present and have at least one item";
  }

  const handleSearchQueryChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
    debounce((val) => {
      if (val) {
        const newItems = items.filter(it => it.Name.toLowerCase().includes(val.toLowerCase()));
        setItems(newItems);
      } else {
        setItems(data);
      }
    }, 200)(target.value);
  };

  return (
    <div className={classes.datagridContainer}>
      {gridTitle ?? (
        <div className={classes.gridTitle}>
          <h3>Data Grid</h3>
          <input
            type="search"
            onChange={handleSearchQueryChange}
            value={searchQuery}
          />
        </div>
      )}
      <table className={classes.datagridTable}>
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={head.key} className={classes.datagridTh}>
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageItems.length ? (
            pageItems.map((item) => (
              <tr key={item.id} className={classes.datagridTr}>
                {headers.map((header) => (
                  <td key={header.key} className={classes.datagridTd}>
                    {getValue ? getValue(item, header.key) : item[header.key] as any}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={classes.dataGridNoData}>
              <td colSpan={headers.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={classes.datagridFooter}>
        <div>
          Rows Per page: {rowsNum}
        </div>
        <div className={classes.pageDetails}>
          <span>Page {currentPageNum} of {numOfPages}</span>
          <div className={classes.pageControls}>
            <button
              disabled={currentPageNum < 2}
              onClick={() => setCurrentPageNum(currentPageNum - 1)}
            >prev</button>
            <button
              disabled={currentPageNum >= numOfPages}
              onClick={() => setCurrentPageNum(currentPageNum + 1)}
            >next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
