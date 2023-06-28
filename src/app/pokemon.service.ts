/*
* Ce service permet de récupérer la liste des pokémons
* Il est injecté dans les composants qui en ont besoin
*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonDetailsById(pokemonId: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return this.http.get(url);
  }

  getPokemonList(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((pokemonData: any) => {
        return {
          ...pokemonData,
          name: pokemonData.name,
        };
      })
    );
  }
}
