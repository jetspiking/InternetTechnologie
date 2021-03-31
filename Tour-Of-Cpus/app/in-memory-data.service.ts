import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cpu } from './cpu';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cpus = [
      { id: 11, name: 'Apple M1' },
      { id: 12, name: 'AMD A8 5550M' },
      { id: 13, name: 'AMD Athlon 200GE' },
      { id: 14, name: 'Intel Core I7 4790' },
      { id: 15, name: 'Intel Core 2 DUO' },
      { id: 16, name: 'AMD A10 4600M' },
      { id: 17, name: 'AMD Ryzen 3700X' },
      { id: 18, name: 'Apple G5 (PowerPC)' },
      { id: 19, name: 'AMD Ryzen Threadripper 3990X' },
      { id: 20, name: 'Atmega 328P' }
    ];
    return {cpus};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(cpus: Cpu[]): number {
    return cpus.length > 0 ? Math.max(...cpus.map(cpu => cpu.id)) + 1 : 11;
  }
}