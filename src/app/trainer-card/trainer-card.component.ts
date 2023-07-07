import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../model/pokemon.models';
import { PokemonService } from '../services/pokemon.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.css']
})
export class TrainerCardComponent implements OnInit {
  trainerData!: { pseudo: string; age: number; };
  trainer!: { name: string; age: number; image: string; pokemons: Pokemon[]; };
  trainerObject: { id: string; url: string;}[] = [];
  trainerForm!: FormGroup;
  chosenPokemons: Pokemon[] = [];
  randomPokemons: Pokemon[] = [];
  pokemonArrayService: Pokemon[] = [];
  isSubmited = false;

  constructor(
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService,
    private trainerService: TrainerService,
  ) {
    this.trainerObject =  [ {id: "1", url: '../../assets/boy.png'}, {id: "2", url: '../../assets/girl.png'}];
    this.trainerForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      pokemons: [[]],
    });

    this.pokemonArrayService = this.pokemonService.getChosenPokemons();

    this.trainer = {
      name: '',
      age: 0,
      image: '',
      pokemons: []
    };

    const storedTrainer = this.trainerService.getTrainer();
    if (storedTrainer) {
      this.isSubmited = true;
      this.trainerForm.setValue(storedTrainer);
      this.trainer = storedTrainer;
    }
  }

  ngOnInit() {
    const trainerFromStorage = this.trainerService.getTrainer();
    if (trainerFromStorage && trainerFromStorage.pokemons) {
      this.chosenPokemons = trainerFromStorage.pokemons;
    }
    this.loadPokemonChoices();
  }

  onSubmit() {
    console.log(this.trainerForm.value);
    if (this.trainerForm.valid) {
      this.isSubmited = true;
      this.trainerService.setTrainer(this.trainerForm.value);
    }
  }

  loadPokemonChoices() {
    this.pokemonService.getPokemonList().subscribe((pokemons: Pokemon[]) => {
      for(let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * pokemons.length);
        this.randomPokemons.push(pokemons[randomIndex]);
        pokemons.splice(randomIndex, 1);
        console.log(this.randomPokemons);
      }
    });
  }

  getChoosePokemon() {

  }
}
