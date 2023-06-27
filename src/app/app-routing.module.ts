import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'card', component: CardComponent },
  // Add any other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
