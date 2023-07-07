/*
* Ce service permet de récupérer la liste des pokémons
* Il est injecté dans les composants qui en ont besoin
*/
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, of, tap } from 'rxjs';
import { Pokemon } from '../model/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private chosenPokemons: Pokemon[] = [];

  baseUrl = "https://api-pokemon-fr.vercel.app/api/v1/pokemon"
  pokemonSubject: Subject<Pokemon[]> = new Subject<Pokemon[]>();
  constructor(private http: HttpClient) { }

/**getteur Objet de type Pokemon [] dispo dans toute l' app s'appelle comme un observable avec un subscribe */
  getPokemonSubject(): Observable<Pokemon[]> {
    this.pokemonSubject.next(JSON.parse(localStorage.getItem('pokemon') || '{}'));
    return this.pokemonSubject.asObservable();
  }

/**setteur pour set le subject de type pokemon par exemple a la 1ere connexion ou au rafraichissement */
  setPokemonSubject(pokemonSubject: Pokemon[]) {
    this.pokemonSubject.next(pokemonSubject);
  }
  /**Vide le local storage */
  resetListInStorage(){
    localStorage.removeItem('pokemon');
  }


  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonDetail(pokedexId: number): Observable<Pokemon> {
    console.log('getPokemonDetail from service');
    console.log(pokedexId);
    return this.http.get<Pokemon>(`${this.baseUrl}/${pokedexId}`);
  }


  getPokemonList(): Observable<Pokemon[]> {
      return this.http.get<Pokemon[]>(this.baseUrl);
  }

  addChosenPokemon(pokemon: Pokemon) {
    this.chosenPokemons.push(pokemon);

  }

  getChosenPokemons(): Pokemon[] {
    return this.chosenPokemons;
  }

}
