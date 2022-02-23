import { Injectable } from '@angular/core';
import { BusquedaInt } from '../interfaces/busqueda-int';
import { HttpClient } from '@angular/common/http';

type SaveInCache = <T>(
  cache: Record<string, T>,
  query: string
) => (value: T) => T;

const saveInCache: SaveInCache = (cache, query) => (value) => {
  if (value) {
    cache[query] = value;
  }
  return value;
};

type Buscar = (query: string) => Promise<BusquedaInt>;

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  cachedValues: Record<string, BusquedaInt> = {};

  constructor(private http: HttpClient) {
    this.http = http;
  }

  buscar: Buscar = (query) => {
    let value = this.cachedValues[query];
    if (value) {
      return Promise.resolve(value);
    } else {
      return (
        this.http
          .get('https://api.github.com/search/commits?q=' + query)
          .toPromise()
          // @ts-expect-error type "BusquedaInt" is not assignable to "Object"
          .then(saveInCache(this.cachedValues, query))
      );
    }
  };
}
