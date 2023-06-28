import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  getPokemonList(url: string): Observable<any> {
    return this.http.get(url);
  }
}
