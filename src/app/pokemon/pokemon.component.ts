import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon.models';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonList: any[] = [];
  globalList: Pokemon[] = [];

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  ngOnInit() {

  }

  getPokemonList() {
    console.log('get PokemonList');
    this.pokemonService.getPokemonSubject().subscribe({next: (pokemons: Pokemon[])=> {
      this.globalList = pokemons;
      console.log(this.globalList.length);
    },});
  }
}
