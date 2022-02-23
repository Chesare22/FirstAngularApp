import { Injectable } from '@angular/core';
import { BusquedaInt } from '../interfaces/busqueda-int';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

type SaveInCache = <T>(
  cache: Record<string, T>,
  key: string
) => (value: T) => T;

const saveInCache: SaveInCache = (cache, key) => (value) => {
  if (value) {
    cache[key] = value;
  }
  return value;
};

const cacheRequest = <P>(request: (arg: string) => Promise<P>) => {
  const cachedValues: Record<string, P> = {};

  return (argument: string) => {
    const value = cachedValues[argument];

    return value
      ? Promise.resolve(value)
      : request(argument).then(saveInCache(cachedValues, argument));
  };
};

const setupSearch = (http: HttpClient) => {
  const search = (query: string) =>
    lastValueFrom(
      http.get<BusquedaInt>('https://api.github.com/search/commits?q=' + query)
    );

  return search;
};

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  private _buscar = setupSearch(this.http);

  buscar = cacheRequest(this._buscar);
}
