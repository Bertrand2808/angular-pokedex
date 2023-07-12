/*
* Service to get the list of pokemon from the server
* and to get the detail of a pokemon from the server
*
* It also set and get the list of pokemon in local storage
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pokemon } from '../model/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private chosenPokemons: Pokemon[] = [];

  baseUrl = "https://api-pokemon-fr.vercel.app/api/v1/pokemon"
  pokemonSubject: Subject<Pokemon[]> = new Subject<Pokemon[]>(); // Subject of pokemons list type
  constructor(private http: HttpClient) { }

  /*
  * getter Object Subject of pokemon type to get the list of pokemon from local storage as an Observable
  */
  getPokemonSubject(): Observable<Pokemon[]> {
    this.pokemonSubject.next(JSON.parse(localStorage.getItem('pokemon') || '{}'));
    return this.pokemonSubject.asObservable();
  }

  /*
  * setter Object Subject of pokemon type to set the list of pokemon in local storage
  */
  setPokemonSubject(pokemonSubject: Pokemon[]) {
    this.pokemonSubject.next(pokemonSubject);
  }

  /*
  * Method to reset the list of pokemon in local storage
  */
  resetListInStorage(){
    localStorage.removeItem('pokemon');
  }

  /*
  * Method to get the detail of a pokemon from the server as an Observable
  */
  getPokemonDetail(pokedexId: number): Observable<Pokemon> {
    console.log('getPokemonDetail from service');
    console.log(pokedexId);
    return this.http.get<Pokemon>(`${this.baseUrl}/${pokedexId}`);
  }

  /*
  * Method to get the list of pokemon from the server as an Observable
  */
  getPokemonList(): Observable<Pokemon[]> {
      return this.http.get<Pokemon[]>(this.baseUrl);
  }

  /*
  * Method to add a pokemon to the list of chosen pokemons
  */
  addChosenPokemon(pokemon: Pokemon) {
    this.chosenPokemons.push(pokemon);

  }

  /*
  * Method to get a pokemon to the list of chosen pokemons
  */
  getChosenPokemons(): Pokemon[] {
    return this.chosenPokemons;
  }

  /*
  * Method to reset the list of chosen pokemons
  */
  deleteChosenPokemons() {
    console.log('delete chosen pokemons');
    this.chosenPokemons = [];
  }
}
