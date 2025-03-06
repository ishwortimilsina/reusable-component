import { FC } from "react";
import { Typeahead } from "./Typeahead";
import { filterUsersByNameWithDelay } from "./items";

interface TypeaheadItem {
  id: string;
  name: string;
  avatar?: string; // url
  age: number;
}

export const TypeaheadUser: FC = () => {
  const getResults = async (query: string): Promise<TypeaheadItem[]> => {
    try {
      const items = await filterUsersByNameWithDelay(query);
      return items;
    } catch {
      return [];
    }
  };

  return <Typeahead
    getResults={getResults}
    maxItems={6}
    renderItem={(item: TypeaheadItem) => (
      <div>{item.name}</div>
    )}
  />
};
