import { ReactNode, useState } from 'react';
import classes from './DataGrid.module.css';
import { usePages } from './usePages';
import { useSearch } from './useSearch';
import { useColumnSort } from './useColumnSort';
import { Column } from './gridData';

type SortDir = 'asc' | 'desc' | '';

const selectSortDir = (currSort?: SortDir): SortDir => {
  switch (currSort) {
    case 'asc':
      return 'desc';
    case 'desc':
      return '';
    case '':
      return 'asc';
    default:
      return '';
  }
};

interface DataGridProps<T extends { id: string | number; [key: string]: any }> {
  data: T[],
  columns: Column[],
  getValue?: (datum: T, key: string | number) => string | number;
  rowsNum?: number;
  gridTitle?: ReactNode;
}

export const DataGrid = <T extends { id: string | number; [key: string]: any }>({
  data,
  columns,
  getValue,
  rowsNum = 10,
  gridTitle
}: DataGridProps<T>) => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [sort, setSort] = useState<{ sortCol?: Column; sortDir?: 'asc' | 'desc' | '' }>({});

  const { items, searchQuery, handleQueryChange } = useSearch({ data });

  const { sortedData } = useColumnSort({ data: items, sortCol: sort.sortCol, sortDir: sort.sortDir });

  const { pageItems, numOfPages } = usePages({
    data: sortedData,
    rowsPerPage: rowsNum,
    currentPageNum
  });

  if (!columns.length) {
    throw "Column definitions not provided";
  }

  const handleSortChange = (colIdx: number) => {
    if (columns[colIdx].sortable) {
      const newSortDir = selectSortDir(sort.sortDir);
      setSort({ sortCol: columns[colIdx], sortDir: newSortDir });
    }
  };

  return (
    <div className={classes.datagridContainer}>
      {gridTitle ?? (
        <div className={classes.gridTitle}>
          <h3>Data Grid</h3>
          <input
            type="search"
            onChange={handleQueryChange}
            value={searchQuery}
          />
        </div>
      )}
      <table className={classes.datagridTable}>
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th key={head.field} className={classes.datagridTh} onClick={() => handleSortChange(idx)}>
                {head.label}
                <small><i>{sort.sortCol?.field === head.field && sort.sortDir ? ` (${sort.sortDir})` : ''}</i></small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageItems.length ? (
            pageItems.map((item) => (
              <tr key={item.id} className={classes.datagridTr}>
                {columns.map((col) => (
                  <td key={col.field} className={classes.datagridTd}>
                    {getValue ? getValue(item, col.field) : item[col.field] as any}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={classes.dataGridNoData}>
              <td colSpan={columns.length}>No data available</td>
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
