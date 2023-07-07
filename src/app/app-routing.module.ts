import { PokemonChoiceComponent } from './pokemon-choice/pokemon-choice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { MenuComponent } from './menu/menu.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { TrainerCardComponent } from './trainer-card/trainer-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'pokemon/:pokedexId', component: PokemonDetailsComponent },
  { path: 'key-logger', component: KeyLoggerComponent },
  { path: 'choice', component: PokemonChoiceComponent},
  { path: 'trainer', component: TrainerCardComponent },
  // Add any other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
