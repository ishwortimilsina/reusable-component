import { DataGrid } from "./DataGrid";
import { data, headers } from "./gridData";

export const DataGridUser = () => {
  return (
    <DataGrid
      columns={headers}
      data={data}
    />
  );
};
