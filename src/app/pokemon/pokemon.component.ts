import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    this.http.get(apiUrl).subscribe((data: any) => {
      this.pokemonList = data.results;
    });
  }
}
