export interface Card {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface Cart {
  itemIds: number[];
}

export type SortFunction = (a: Card, b: Card) => number;

export interface Filter {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  amountMin?: number;
  amountMax?: number;
  yearMin?: number;
  yearMax?: number;
  search?: string;
}

export interface Query {
  filter: Filter;
  sorting?: string;
}
