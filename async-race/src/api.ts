import {
  Car, CarResponse, CreateCarRequest, RideParams, Winner,
} from './models/models';

const API_ENDPOINT = 'http://localhost:3000';

export async function getCarsInGarage(req: { page: number, limit: number }): Promise<CarResponse> {
  const result = await fetch(`${API_ENDPOINT}/garage?_page=${req.page}&_limit=${req.limit}`);
  const data = await result.json() as Car[];
  return { cars: data, count: Number(result.headers.get('x-total-count')) };
}

export async function createCar(car: CreateCarRequest): Promise<Car> {
  const result = await fetch(`${API_ENDPOINT}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json() as Car;
  return data;
}

export async function removeCar(carId: number): Promise<void> {
  await fetch(`${API_ENDPOINT}/garage/${carId}`, {
    method: 'DELETE',
  });
}

export async function updateCar(car: Car): Promise<Car> {
  const result = await fetch(`${API_ENDPOINT}/garage/${car.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const data = await result.json() as Car;
  return data;
}

async function startStopEngine(carId: number, status: 'started' | 'stopped'): Promise<RideParams> {
  const result = await fetch(`${API_ENDPOINT}/engine?id=${carId}&status=${status}`, {
    method: 'PATCH',
  });
  const data = await result.json() as RideParams;
  return data;
}

export async function startDrive(carId: number) {
  const result = await fetch(`${API_ENDPOINT}/engine?id=${carId}&status=drive`, {
    method: 'PATCH',
  });
  if (result.ok) {
    return true;
  }
  return false;
}

export function startEngine(carId: number) {
  return startStopEngine(carId, 'started');
}

export async function getWinners(req: { page: number, limit?: number, sort?: 'id' | 'wins' | 'time', order: 'ASC' | 'DESC' }) {
  const result = await fetch(`${API_ENDPOINT}/winners`);
  const data = await result.json() as Winner[];
  return { winners: data, count: Number(result.headers.get('x-total-count')) };
}

async function getWinner(carId: number) {
  const result = await fetch(`${API_ENDPOINT}/winners/${carId}`);
  if (!result.ok) {
    return null;
  }
  const data = await result.json() as Winner;
  return data;
}

async function createWinner(winner: Winner): Promise<Winner> {
  const result = await fetch(`${API_ENDPOINT}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
  const data = await result.json() as Winner;
  return data;
}

async function updateWinner(winner: Winner) {
  const result = await fetch(`${API_ENDPOINT}/winners/${winner.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
  const data = await result.json() as Winner;
  return { wins: data.wins, time: data.time };
}

export async function updateWins(carId: number, time: number) {
  const winner = await getWinner(carId);
  if (winner) {
    winner.wins += 1;
    await updateWinner(winner);
  } else {
    await createWinner({ id: carId, wins: 1, time });
  }
}
