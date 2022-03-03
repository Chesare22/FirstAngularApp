import { Injectable } from '@angular/core';
import { BusquedaInt } from '../interfaces/busqueda-int';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { cacheRequest } from '../shared/functions/cache';

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
  readonly buscar: (query: string) => Promise<BusquedaInt>;

  constructor(http: HttpClient) {
    const search = setupSearch(http);
    this.buscar = cacheRequest(search);
  }
}
