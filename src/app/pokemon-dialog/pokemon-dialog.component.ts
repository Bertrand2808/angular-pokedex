import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pokemon } from '../model/pokemon.models';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TrainerService } from '../services/trainer.service';


@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css']
})
export class PokemonDialogComponent {
  trainer!: { pseudo: string; age: number; image: string; pokemons: Pokemon[]; };

  constructor(
    public dialogRef: MatDialogRef<PokemonDialogComponent>,
    private pokemonService: PokemonService,
    private router: Router,
    private trainerService: TrainerService,
    @Inject(MAT_DIALOG_DATA) public data: {pokemon: Pokemon}
    ) {}

  selectPokemon(pokemon: Pokemon) {
    const trainerFromStorage = this.trainerService.getTrainer();
    if (trainerFromStorage) {
      this.trainer = trainerFromStorage;  // Initialisez votre trainer avec les données du local storage
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
      this.dialogRef.close();
      this.router.navigate(['/trainer']);
    } else {
      // Si il n'y a pas de trainer dans le local storage, naviguez vers la page du trainer
      // ou créez un nouveau trainer, selon les besoins de votre application
      this.router.navigate(['/trainer']);
    }
  }
}
