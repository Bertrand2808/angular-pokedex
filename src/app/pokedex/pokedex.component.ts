import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.models';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  isLoading= false; // var for loading spinner
  pokemonList: Pokemon[] = []; // var for pokemon list
  selectedPokemon: Pokemon | null = null; // var for selected pokemon
  globalList: Pokemon[] = []; // var for global pokemon list
  pokemonId!: number; // var for pokemon id
  // var for pokemon type colors
  pokemonTypeColors: { [key: string]: string } = {
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Vol': '#A890F0',
    'Eau': '#6890F0',
    'Insecte': '#A8B820',
    'Normal': '#A8A878',
    'Électrik': '#F8D030',
    'Fée': '#EE99AC',
    'Combat': '#C03028',
    'Psy': '#F85888',
    'Sol': '#E0C068',
    'Acier': '#B8B8D0',
    'Roche': '#B8A038',
    'Glace': '#98D8D8',
    'Dragon': '#7038F8',
    'Ténèbres': '#705848',
    'Spectre': '#705898',
  };

  constructor(
    private pokemonService: PokemonService
    ) {
    this.getPokemons(); // call getPokemons method
   }
  /**
   *  Retrieves the list of pokemons from the server or local storage.
   *  If the list is not already stored in the local storage, it fetches the *  *  list from the server and stores it in the local storage for future use.
   *  If the list is already stored in the local storage, it retrieves the list *  from the local storage.
   *
   * @memberof PokedexComponent
   */
  getPokemons(){
      if(this.isLoading){return}
      this.isLoading = true;
      this.pokemonService.getPokemonList().subscribe({
        next:async(pokemons:Pokemon[]) => {
          if(localStorage.getItem('pokemons')===null || localStorage.getItem('pokemons') === undefined ){
            localStorage.setItem('pokemons', JSON.stringify(await pokemons));
            this.pokemonService.setPokemonSubject(await pokemons);
            console.log(this.isLoading)
            this.isLoading = false;
          }else{
            this.globalList = JSON.parse(localStorage.getItem('pokemons')!);
            this.isLoading = false;
          }
      }});
  }

  /**methode a utiliser sur les autres pages pour recuperer la liste de pokemon */
  getPokemonSubject(){
    this.pokemonService.getPokemonSubject().subscribe({next:(pokemons:Pokemon[]) =>{
      this.globalList = pokemons;

    }})
  }

  /**
   * Methode de suppression du local storage
   */
  refreshList() {
    this.pokemonService.resetListInStorage();
    this.getPokemons();


  }
}
