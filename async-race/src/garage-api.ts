import { Car, CreateCarRequest } from "./models/models";
const API_ENDPOINT = 'http://localhost:3000';

export async function getCarsInGarage() {
  const result = await fetch(`${API_ENDPOINT}/garage`);
  const data = await result.json() as Car[];
  return data;
}

export async function createCar(car: CreateCarRequest): Promise<Car> {
  const result = await fetch('http://localhost:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json() as Car;
  return data;
}
