export interface Book {
    id: string;
    title: string;
    author: string;
    category: number;
    copies: number;
}
export interface User {
  id?: number;   // optional because new users may not have an id yet
  name: string;
  email: string;
  role: string;
}