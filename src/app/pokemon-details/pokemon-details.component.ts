import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../model/pokemon.models';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null = null;
  finalId!: number;
  globalList: Pokemon[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getPokemonList();
    const pokemonId = this.route.snapshot.paramMap.get('id');
    this.finalId = Number(pokemonId);
    if (pokemonId) {
      this.getPokemonDetails(this.finalId);
    }
  }
  getPokemonDetails(finalId: number) {
    throw new Error('Method not implemented.');
  }

  getPokemonList() {
    console.log('get PokemonList');
    this.pokemonService.getPokemonSubject().subscribe({next: (pokemons: Pokemon[])=> {
      this.globalList = pokemons;
      console.log('global list : ', this.globalList.length);
    },});
  }
}
