export interface Todo {
  id: number;
  title: string;
  description: string;
}

export interface Todos {
  [key: number]: Todo;
}
