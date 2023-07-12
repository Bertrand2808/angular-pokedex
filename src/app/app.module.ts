import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { PokemonChoiceComponent } from './pokemon-choice/pokemon-choice.component';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TrainerCardComponent } from './trainer-card/trainer-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TronqTextPipe } from './tronq-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    MenuComponent,
    PokemonDetailsComponent,
    KeyLoggerComponent,
    SearchPokemonComponent,
    PokemonChoiceComponent,
    PokemonDialogComponent,
    TrainerCardComponent,
    NavBarComponent,
    TronqTextPipe
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
