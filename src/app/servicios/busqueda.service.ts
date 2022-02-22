import { Injectable } from '@angular/core';
import { BusquedaInt } from '../interfaces/busqueda-int';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, SubscribableOrPromise } from 'rxjs';

const saveInCache =
  <T>(cache: Record<string, T>, query: string) =>
  (value: T) => {
    if (value) {
      cache[query] = value;
    }
    return value;
  };

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  cachedValues: Record<string, BusquedaInt> = {};

  constructor(private http: HttpClient) {
    this.http = http;
  }

  buscar = (query: string): Promise<BusquedaInt> => {
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
