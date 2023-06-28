import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  pokemon: any = { number: '' , name: '', imageUrl: '' };


  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemonList(url: string) {
    this.pokemonService.getPokemonList(url).subscribe((data: any) => {
      const results: any[] = data.results;
      results.forEach((pokemon: any) => {
        const pokemonId: number = +pokemon.url.split('/')[6];
        this.pokemonService.getPokemonList(pokemon.url).subscribe((pokemonData: any) => {
          this.pokemonList.push({
            id: pokemonId,
            name: pokemonData.name,
            imageUrl: pokemonData.sprites.front_default
          });
          this.pokemonList.sort((a, b) => a.id - b.id);
        });
      });
      if (data.next) {
        this.getPokemonList(data.next);
      }
    });
  }

  onPokemonSelected(pokemon: Pokemon) {
    console.log('Pokémon sélectionné :', pokemon);
  }
}
