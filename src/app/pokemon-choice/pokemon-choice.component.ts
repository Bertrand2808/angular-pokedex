import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../model/pokemon.models';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pokemon-choice',
  templateUrl: './pokemon-choice.component.html',
  styleUrls: ['./pokemon-choice.component.css']
})
export class PokemonChoiceComponent implements OnInit {
    randomPokemons: Pokemon[] = [];
    showStarterImage = true;
    showDialog = false;
    showPokemon = false;
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
    constructor(private pokemonService: PokemonService, public dialog: MatDialog,private router: Router) { }

    ngOnInit(): void {
      this.loadPokemonChoices();
      setTimeout(() => {
        this.showDialog = true;
      }, 3000); // attendre 3 secondes pour afficher la boîte de dialogue
  }

  openDialog(pokemon: Pokemon) {
    console.log(pokemon);
    const dialogRef = this.dialog.open(PokemonDialogComponent, {
        data: {pokemon: pokemon},

    });
  }
  hideDialogAndShowPokemon() {
    this.showDialog = false;
    this.showPokemon = true;
  }

  loadPokemonChoices() {
    this.pokemonService.getPokemonList().subscribe((pokemons: Pokemon[]) => {
      for(let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * pokemons.length);
        this.randomPokemons.push(pokemons[randomIndex]);
        pokemons.splice(randomIndex, 1);
      }
    });
  }



}
