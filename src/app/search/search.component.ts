import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { Pokemon } from '../model/pokemon.models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy{

  protected globalList: Pokemon[] = [];
  public formCtrl: FormControl = new FormControl();
  public formFilterCtrl: FormControl = new FormControl();
  public filteredPokemon: ReplaySubject<Pokemon[]> = new ReplaySubject<Pokemon[]>(1);
  @ViewChild('singleSelect') singleSelect!: MatSelect;
  protected _onDestroy = new Subject<void>();
  formGroup!: FormGroup;
  pokemonSelected!: Pokemon
  pokemonList: Pokemon[] = [];
  searchText = '';
  constructor(private http: HttpClient, private pokemonService: PokemonService, private fB: FormBuilder) {
    this.formGroup = this.fB.group({
      search: ['']
    });
  }

  ngOnInit() {
    this.getPokemonList();
    this.formCtrl.setValue(this.globalList[10]);
    this.filteredPokemon.next(this.globalList.slice());
    this.formFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPokemon();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredPokemon
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Pokemon, b: Pokemon) => a && b && a.pokedexId === b.pokedexId;
      });
  }

  protected filterPokemon() {
    if (!this.globalList) {
      return;
    }
    let search = this.formFilterCtrl.value;
    if (!search) {
      this.filteredPokemon.next(this.globalList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredPokemon.next(
      this.globalList.filter(pokemon => pokemon.name.fr.toLowerCase().indexOf(search) > -1)
    );
  }

  selectPokemon(pokemon: Pokemon) {
    this.pokemonSelected = pokemon;
    this.searchText = '';
  }

  searchPokemon() {
    this.searchText = this.formGroup.controls['search'].value;
    console.log(this.searchText);
    console.log(this.globalList.length);
    if (this.searchText !== '') {
      console.log(this.globalList.length);
      this.pokemonList= this.globalList.filter((f) => {return f.name.fr === this.searchText}).map(m => m);
      console.log(this.pokemonList);
    }
  }

  getPokemonList() {
    console.log('get PokemonList');
    this.pokemonService.getPokemonSubject().subscribe({next: (pokemons: Pokemon[])=> {
      this.globalList = pokemons;
      console.log('global list : ', this.globalList.length);
    },});
  }

}
