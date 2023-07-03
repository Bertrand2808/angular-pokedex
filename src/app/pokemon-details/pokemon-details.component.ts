import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  paramsSubscription: Subscription;

  pokemon: Pokemon | null = null;
  finalId!: number;
  globalList: Pokemon[] = [];
  pokemonId!: number;
  preEvolutionPokemon: Pokemon | null = null;
  nextEvolutionPokemon: Pokemon | null = null;
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
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.paramsSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.pokemonId = this.route.snapshot.params['pokedexId'];
      console.log(this.pokemonId);
      this.pokemonService.getPokemonDetail(this.pokemonId).subscribe(pokemon => {
        console.log('getPokemonDetail from component with id : ' + this.pokemonId);
        this.pokemon = pokemon;
        console.log(this.pokemon);
      });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}

