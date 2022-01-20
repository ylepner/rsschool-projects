export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CreateCarRequest {
  name: string;
  color: string;
}

export interface CarResponse {
  cars: Car[];
  count: number;
}
