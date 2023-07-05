import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pokemon } from '../model/pokemon.models';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css']
})
export class PokemonDialogComponent {
  constructor(public dialogRef: MatDialogRef<PokemonDialogComponent>,private pokemonService: PokemonService,private router: Router, @Inject(MAT_DIALOG_DATA) public data: {pokemon: Pokemon}) {}

  selectPokemon(pokemon: Pokemon) {
    this.pokemonService.addChosenPokemon(pokemon);
    this.router.navigate(['/trainer']);
    this.dialogRef.close();
  }
}
