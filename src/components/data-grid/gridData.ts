export interface Column {
  id: string | number;
  field: string;
  label: string;
  sortable: boolean;
}

export const headers: Column[] = [
  { id: "id", field: "id", label: "id", sortable: false },
  { id: "name", field: "name", label: "name", sortable: true },
  { id: "age", field: "age", label: "age", sortable: true },
  { id: "country", field: "country", label: "country", sortable: true },
  { id: "occupation", field: "occupation", label: "occupation", sortable: true }
];

export const data = [
  { id: 1, name: "John Doe", age: 28, country: "USA", occupation: "Engineer" },
  { id: 2, name: "Jane Smith", age: 34, country: "Canada", occupation: "Designer" },
  { id: 3, name: "Alice Johnson", age: 25, country: "UK", occupation: "Developer" },
  { id: 4, name: "Bob Brown", age: 42, country: "Australia", occupation: "Manager" },
  { id: 5, name: "Charlie Davis", age: 29, country: "USA", occupation: "Product Owner" },
  { id: 6, name: "John Doe", age: 32, country: "UK", occupation: "Designer" },
  { id: 7, name: "Jane Smith", age: 28, country: "Germany", occupation: "Product Owner" },
  { id: 8, name: "Alice Johnson", age: 28, country: "Canada", occupation: "Manager" },
  { id: 9, name: "Bob Brown", age: 23, country: "Australia", occupation: "Developer" },
  { id: 10, name: "Charlie Davis", age: 44, country: "Canada", occupation: "Designer" },
  { id: 11, name: "Michael Williams", age: 39, country: "USA", occupation: "Designer" },
  { id: 12, name: "David Miller", age: 39, country: "Australia", occupation: "Manager" },
  { id: 13, name: "Sarah Wilson", age: 35, country: "USA", occupation: "Engineer" },
  { id: 14, name: "James Moore", age: 39, country: "Canada", occupation: "Designer" },
  { id: 15, name: "Patricia Taylor", age: 22, country: "UK", occupation: "Manager" },
  { id: 16, name: "Linda Anderson", age: 28, country: "Australia", occupation: "Developer" },
  { id: 17, name: "Mark Thomas", age: 25, country: "Canada", occupation: "Product Owner" },
  { id: 18, name: "Steven Jackson", age: 40, country: "USA", occupation: "Developer" },
  { id: 19, name: "Mary White", age: 29, country: "Germany", occupation: "Manager" },
  { id: 20, name: "William Harris", age: 22, country: "Germany", occupation: "Product Owner" },
  { id: 21, name: "Elizabeth Clark", age: 28, country: "Canada", occupation: "Manager" },
  { id: 22, name: "Richard Lewis", age: 26, country: "Canada", occupation: "Manager" },
  { id: 23, name: "Susan Walker", age: 43, country: "UK", occupation: "Manager" },
  { id: 24, name: "Joseph Allen", age: 22, country: "Canada", occupation: "Developer" },
  { id: 25, name: "Karen Young", age: 26, country: "UK", occupation: "Designer" },
  { id: 26, name: "Thomas King", age: 48, country: "Germany", occupation: "Engineer" },
  { id: 27, name: "Nancy Scott", age: 22, country: "USA", occupation: "Manager" },
  { id: 28, name: "Matthew Green", age: 48, country: "USA", occupation: "Engineer" },
  { id: 29, name: "Dorothy Adams", age: 34, country: "Canada", occupation: "Designer" },
  { id: 30, name: "Kevin Baker", age: 48, country: "USA", occupation: "Manager" }
];
