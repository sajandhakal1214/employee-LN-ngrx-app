import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // Save data to localStorage
  save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

    // Load data from localStorage
  load<T>(key: string): T|null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Remove data from localStorage
  remove(key: string): void {
    localStorage.removeItem(key);
  }
  constructor() { }
}
