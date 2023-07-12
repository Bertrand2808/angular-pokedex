import { TrainerService } from './../services/trainer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  paramsSubscription: Subscription;
  trainerData!: { pseudo: string; age: number; };
  trainer!: { pseudo: string; age: number; image: string; pokemons: Pokemon[]; };
  pokemon: Pokemon | null = null;
  finalId!: number;
  globalList: Pokemon[] = [];
  pokemonId!: number;
  preEvolutionPokemon: Pokemon | null = null;
  nextEvolutionPokemon: Pokemon | null = null;
  pokemonArrayService: Pokemon[] = [];

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
    private router: Router,
    private pokemonService: PokemonService,
    private trainerService: TrainerService
  ) {
    this.paramsSubscription = new Subscription();
  }
  /**
   *  Start the cycle of life of the component with ngOnInit()
   *  and get the pokemon id from the route
   *
   * @memberof PokemonDetailsComponent
   */
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
  /**
   *  Unsubscribe to the paramsSubscription when the component is destroyed
   *
   * @memberof PokemonDetailsComponent
   */
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
  /**
   *  Method to add the pokemon to the trainer's team
   * and navigate to the trainer page
   * if the trainer is not in the local storage, navigate to the trainer page
   * if the trainer already has 6 pokemon, alert the user
   * if the pokemon is already in the team, alert the user
   * if the pokemon is not in the team, add it to the team
   *
   * @param {Pokemon} pokemon
   * @return {*}
   * @memberof PokemonDetailsComponent
   */
  selectPokemon(pokemon: Pokemon) {
    const trainerFromStorage = this.trainerService.getTrainer();
    if (trainerFromStorage) {
      this.trainer = trainerFromStorage;  // Init trainer with the trainer from the local storage
      if (this.trainer.pokemons && this.trainer.pokemons.some(p => p.pokedexId === pokemon.pokedexId)) {
        window.alert('Ce Pokémon est déjà dans votre équipe!');
        return;
      }
      if (this.trainer.pokemons && this.trainer.pokemons.length >= 6) {
        window.alert('Vous avez déjà 6 Pokémon dans votre équipe!');
        return;
      }
      this.pokemonService.addChosenPokemon(pokemon);
      this.trainer.pokemons = this.trainer.pokemons ?? [];
      this.trainer.pokemons.push(pokemon);
      this.trainerService.setTrainer(this.trainer);
      this.router.navigate(['/trainer']);
    } else {
      // if the trainer is not in the local storage, navigate to the trainer page
      this.router.navigate(['/trainer']);
    }
  }


}
