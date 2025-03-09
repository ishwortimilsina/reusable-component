import { CSSProperties, FocusEvent, ReactNode, useEffect, useRef, useState } from "react";
import classes from './Typeahead.module.css';
import { debounce } from "../../utils/rateLimit";

interface TypeaheadProps<T = unknown> {
  getResults: (_query: string) => Promise<T[]>;
  renderItem?: (_datum: T) => ReactNode;
  onFocus?: (_e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (_e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  maxItems: number;
  className?: string;
  style?: CSSProperties;
}

export const Typeahead = <T,>({
  getResults,
  maxItems,
  renderItem,
  onChange,
  onFocus,
  onBlur
}: TypeaheadProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const debouncedFetchItems = debounce(async (q: string) => {
    const results = await getResults(q);
    if (results.length) {
      setItems(results.slice(0, maxItems));
      setOpen(true);
    } else {
      setItems([]);
      setOpen(false);
    }
  }, 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedFetchItems(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (resultRef.current) {
        if (!resultRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  }, []);

  return (
    <div className={classes.typeAhead}>
      <input
        type="search"
        onChange={handleChange}
        value={query}
        className={classes.typeaheadInput}
        onFocus={onFocus ? onFocus : undefined}
        onBlur={onBlur ? onBlur : undefined}
      />
      {items.length && open ? (
        <div className={classes.typeaheadResults} ref={resultRef}>
          {items.map((item, index) => renderItem
            ? renderItem(item)
            : <div key={index}>{JSON.stringify(item)}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};
