import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { SearchComponent } from './search/search.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { KeyLoggerComponent } from './key-logger/key-logger.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'card', component: CardComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'search', component: SearchComponent },
  { path: 'pokemon/:pokedexId', component: PokemonDetailsComponent },
  { path: 'key-logger', component: KeyLoggerComponent },
  // Add any other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
