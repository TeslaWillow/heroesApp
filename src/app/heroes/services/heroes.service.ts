import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl: string = enviroments.baseUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  public getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this._baseUrl}/heroes`);
  }

  public getHeroById( id: string ): Observable<Hero|undefined> {
    return this._http.get<Hero>(`${this._baseUrl}/heroes/${id}`)
    .pipe(
      catchError( (err) => of(undefined) )
    );
  }

  public getSuggestions( query: string ): Observable<Hero[]> {
    const url = `${this._baseUrl}/heroes?q=${query}`;
    return this._http.get<Hero[]>(url);
  }

}
