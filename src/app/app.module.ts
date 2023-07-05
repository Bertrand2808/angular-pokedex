import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { HeaderComponent } from './header/header.component';
import { PokemonChoiceComponent } from './pokemon-choice/pokemon-choice.component';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TrainerCardComponent } from './trainer-card/trainer-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    HomeComponent,
    PokemonDetailsComponent,
    KeyLoggerComponent,
    SearchPokemonComponent,
    HeaderComponent,
    PokemonChoiceComponent,
    PokemonDialogComponent,
    TrainerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
