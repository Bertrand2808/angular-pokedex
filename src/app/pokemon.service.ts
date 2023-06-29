/*
* Ce service permet de récupérer la liste des pokémons
* Il est injecté dans les composants qui en ont besoin
*/
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Pokemon } from './model/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = "https://api-pokemon-fr.vercel.app/api/v1/pokemon"
  pokemonSubject: Subject<Pokemon[]> = new Subject<Pokemon[]>();
  constructor(private http: HttpClient) { }

  getPokemonSubject(): Observable<Pokemon[]> {
    this.pokemonSubject.next(JSON.parse(localStorage.getItem('pokemon') || '{}'));
    return this.pokemonSubject.asObservable();
  }

  setPokemonSubject(pokemonSubject: Pokemon[]) {
    this.pokemonSubject.next(pokemonSubject);
  }
  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonDetailsById(pokemonId: number): Observable<any> {
    const url = this.baseUrl+pokemonId;
    return this.http.get(url);
  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.baseUrl);
  }
}
