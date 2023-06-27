import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pokemon: any;
  @Input() pokemonList: Pokemon[] = [];
  @Output() pokemonSelected: EventEmitter<any> = new EventEmitter();
  searchText: string = '';
  filteredPokemonList: any[] = [];

  selectPokemon(pokemon: any) {
    this.pokemonSelected.emit(pokemon);
  }

  searchPokemon() {
    if (this.searchText.trim() === '') {
      this.filteredPokemonList = [];
    } else {
      this.filteredPokemonList = this.pokemonList.filter((poke: any) =>
        poke.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
