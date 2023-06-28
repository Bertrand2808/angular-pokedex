import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { map } from 'rxjs/operators';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  abilities: string[];
  types : string[];
  // Ajoutez d'autres propriétés de détails du Pokémon ici
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.getPokemonDetails(pokemonId);
    }
  }

  getPokemonDetails(pokemonId: string) {
    this.pokemonService.getPokemonDetailsById(pokemonId).subscribe((pokemonData: any) => {
      this.pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        imageUrl: pokemonData.sprites.front_default,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map((ability: any) => ability.ability.
        name),
        types: pokemonData.types.map((type: any) => type.type.name)
        // Ajoutez d'autres propriétés de détails du Pokémon ici
      };
    });
  }
}
