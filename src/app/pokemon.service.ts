/*
* Ce service permet de récupérer la liste des pokémons
* Il est injecté dans les composants qui en ont besoin
*/
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = "https://api-pokemon-fr.vercel.app/api/v1/pokemon/"
  constructor(private http: HttpClient) { }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonDetailsById(pokemonId: number): Observable<any> {
    const url = this.baseUrl+pokemonId;
    return this.http.get(url);
  }

  getPokemonList(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      map((pokemonData: any) => {
        localStorage.setItem('pokemon', JSON.stringify(pokemonData));
        console.log(pokemonData);
        return {
          ...pokemonData,
          name: pokemonData.name,
          id: pokemonData.pokedexId,
          imageUrl: pokemonData.sprites.regular?pokemonData.sprites.regular:pokemonData.sprites.shiny,
        };
      })
    );
  }
}
