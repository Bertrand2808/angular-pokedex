import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pokemon: any;
  @Output() pokemonSelected: EventEmitter<any> = new EventEmitter();

  searchPokemon() {
  }
}
