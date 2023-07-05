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

  trainerForm!: FormGroup;
  chosenPokemons: Pokemon[] = [];

  constructor(private formBuilder: FormBuilder, private pokemonService: PokemonService, private trainerService: TrainerService) {
    this.trainerForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      age: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.trainerService.currentData.subscribe(data => this.trainerData = data);
    this.chosenPokemons = this.pokemonService.getChosenPokemons();
  }

  onSubmit() {
    this.trainerService.changeData(this.trainerForm.value);
    this.trainerForm.reset();
  }
}

