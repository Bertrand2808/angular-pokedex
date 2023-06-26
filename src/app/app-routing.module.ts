import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'home', component: HomeComponent },
  // Add any other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
