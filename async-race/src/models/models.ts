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

export interface RideParams {
  velocity: number;
  distance: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
