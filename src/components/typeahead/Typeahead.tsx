import { CSSProperties, ReactNode, useState } from "react";
import classes from './Typeahead.module.css';
import { debounce } from "../../utils/rateLimit";

interface TypeaheadProps<T = unknown> {
  getResults: (_query: string) => Promise<T[]>;
  renderItem?: (_datum: T) => ReactNode;
  maxItems: number;
  className?: string;
  style?: CSSProperties;
}

export const Typeahead = <T,>({ getResults, maxItems, renderItem }: TypeaheadProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [query, setQuery] = useState('');

  const debouncedFetchItems = debounce(async (q: string) => {
    const results = await getResults(q);
    setItems(results.slice(0, maxItems));
  })

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    debouncedFetchItems(target.value);
  };

  return (
    <div className={classes.typeAhead}>
      <input
        type="search"
        onChange={handleChange}
        value={query}
        className={classes.typeaheadInput}
      />
      {items.length ? (
        <div className={classes.typeaheadResults}>
          {items.map((item, index) => renderItem
            ? renderItem(item)
            : <div key={index}>{JSON.stringify(item)}</div>
          )}
        </div>
       ) : null}
    </div>
  );
};
