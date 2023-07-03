# Angular

## Introduction : TypeScript

A noter que tout fichier typescript est un fichier javascript valide, mais l'inverse n'est pas vrai.

```typescript
npm install -g typescript // installer typescript.
tsc                       // voir que typescript est correctement installé.
```

On utilise `-g` pour installer typescript globalement.

* Lors de la déclaration des variables, il ne faut pas utiliser le mot clé 'any' (qui permet à une variable de pouvoir changer de type).

### Déclaration de fonctions

Lors de la déclaration de fonctions, en Typescript, on peut (doit) définir un type de retour.

```typescript
function startBattle(pka: Pokemon, pkb: Pokemon, pbc?: Pokemon): number {
  return 0;
}
```

### Typage

Une bonne pratique est de définir le type de retour de la fonction, même en void.

```typescript
function addPokemons(pokemon: {type: string, name: string, number: string}): void {

}

interface Poke {
  //... liste des attributs
}
```

L'avantage de Typescript est qu'il retourne avant même la compilation les erreurs dans le code.

Les choses à retenir avant d'aller plus loin :

- TS est un superset de Javascript, tous les programmes JS sont des programmes TS valides.
- TS est un langage fortement typé, il faut donc définir les types des variables.
- TS ajoute un système de détection du code qui entrainera des exceptions à l'exécution. En revance, ne vous attendez pas à ce que toutes les exceptions soient détectées par le TSC (compilateur). Il est tout à fait possible d'être valide pour le type checker de tsc de déclencher des erreurs de runtime.
- Tsc vous permet de configurer son comportement avec un fichier tsconfig.json
- Dans des nouveaux projets, utiliser : noImplicitAny et strictNullChecks a `true` pour éviter les erreurs de runtime.
- On convertit le Typescript en Javascript avec la commande `tsc` (qui génère un fichier .js).

## Angular

* Installer angular

```bash
npm install -g @angular/cli
```

* Créer un nouveau projet :

```bash
ng new NomProjet --prefix px
```

### Components

Dans le component .ts, le @Component sert de décorateur de la classe du composant. Il permet de définir les métadonnées du composant. Il est obligatoire de définir le selector et le template. Ils sont préfixés pour éviter les confusions avec des balises HTML natives.

```typescript
@Component({
  selector: 'app-pokedex', // <app-pokedex></app-pokedex>
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
```

### Modules

Le module sert à déclarer les components.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, // Permet l'app d'être en Single Page
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

<br>

### Créer un nouveau component

Pour créer un nouveau composant, on utilise la commande `ng generate component component-name` ou `ng g c component-name`.

Pour notre exemple :

```bash
ng g c card
```

Par défaut le component créé 4 fichiers : .ts, .html, .css et .spec.ts (qui va servir à tester le composant).

En utilisant cette commande, le composant est automatiquement ajouté au module, dans app.module.ts.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    HomeComponent,
    CardComponent // ajouté automatiquement
  ],
...
```

##### Utilisation du component

Pour ajouter notre nouveau component dans le template (app.component.html), on utilise le selector défini dans le component.

```html
<app-card></app-card>
```

##### Ajouter des données au component

On va ajouter un bouton qui affiche des pokemons lorsqu'on clique dessus. Dans app.component.html :

```typescript
<button (click)="displayPokemon()">Afficher des pokemons</button>
```

Une fois la fonction écrite sur notre html, il faut la déclarer dans app.component.ts :

```typescript
pokemons: Array<any> = [];
...
displayPokemon(): void {
    this.pokemons = [
      {name: 'Bulbasaur', number: 1, type: 'Grass'},
      {name: 'Ivysaur', number: 2, type: 'Grass'},
      ...,
    ];
  }
}
```

Mais ça ne suffit pas !
Il faut ensuite ajouter une ligne pour les affichers :

```typescript
<p *ngFor="let pokemon of pokemons">{{pokemon.name}}</p>
```

!! Une bonne pratique est d'organiser ses composants de manière à ce que un composant effectue une tâche. Par exemple un composant qui prépare les données, et un autre qui les affichera. !!

## Variables

Création d'une variable locale dans le template avec `#` :

```html
<!-- création d'une zone de recherche -->
<p #inputData >this is a search input</p>
<input (click)="inputData.focus()" type="text">
```

### Directives

#### NgFor

#### NgStyle

Cette directive nous permet d'agir sur le style d'un élément :

```html
<p [ngStyle]="{color: color}">Bulbizarre</p>
```

#### NgClass

Cette directive permet d'ajouter et d'enlever dynamiquement une classe sur un élément :

```html
<div [class.someClass]="isStyleWithSomeClass()">Ng Class !</div>
```

### Resume

On peut utiliser tout un tad de symbole afin d'interagir avec le template :

- `{{}}` : permet d'**afficher une variable** : Interpolation
- `[]` : permet de **passer une variable au template** : Property Binding
- `()` : permet d'**écouter un événement** : Event Binding
- `*` : permet d'**ajouter une directive** : Structural Directive
- `#` : permet de **créer une variable locale** : Template Reference Variable
- `.` : permet d'**accéder à une propriété d'un objet** : Property Access
- `ngFor` : permet de **faire une boucle**.
- `ngStyle` : permet de **modifier le style d'un élément**.
- `ngClass` : permet d'**ajouter une classe à un élément**.
- `ngIf` : permet d'**afficher un élément si une condition est vraie**.

### Input

Pour passer des données à un component, on utilise le `@Input()`. Il faut dans un premier temps, dans le component qui va recevoir les données, importer Input depuis @angular/core :

```typescript
import { Component, Input } from '@angular/core';
```

Puis, on ajoute le décorateur `@Input()` devant la variable qui va recevoir les données :

```typescript
export class CardComponent {
  @Input() item: any;

  constructor() {
    console.log(this.item);
  }
}
```

Angular nous permet de nous greffer a des moments cles du cycle de vie du composant :

- `ngOnChanges` : se declenche a chaque fois qu'une valeur d'entree change :
- Cette méthode est appelée à chaque fois qu'une valeur d'entrée change. Elle prend en paramètre un objet de type SimpleChanges qui contient les changements de valeur. Elle est appelée avant ngOnInit() et à chaque fois que les données d'entrée changent.

```typescript
ngOnChanges(changes: SimpleChanges) {
  console.log(changes);
}
```

- `ngOnInit` : se declenche une fois que le composant est initialise :
- Cette méthode est appelée une fois que le composant est initialisé. Elle est appelée après le constructeur et ngOnChanges().

```typescript
ngOnInit() {
  console.log(this.item);
}
```

- `ngDoCheck` : se declenche a chaque fois que le composant est verifie pour un changement :
  Cette méthode est appelée à chaque fois que le composant est vérifié pour un changement. Elle est appelée après ngOnChanges() et ngOnInit().

```typescript
ngDoCheck() {
  console.log('DoCheck');
}
```

- `ngAfterContentInit` : se declenche une fois que le contenu du composant est initialise
- `ngAfterContentChecked` : se declenche a chaque fois que le contenu du composant est verifie pour un changement
- `ngAfterViewInit` : se declenche une fois que la vue du composant est initialisee
- `ngAfterViewChecked` : se declenche a chaque fois que la vue du composant est verifiee pour un changement
- `ngOnDestroy` : se declenche une fois que le composant est detruit

Ensuite, dans le component qui va envoyer les données, on ajoute la variable dans le template :

```html
<app-card [item]="pokemon"></app-card>
```

### Output

Pour envoyer des données d'un component à un autre, on utilise le `@Output()`. Il faut dans un premier temps, dans le component qui va envoyer les données, importer Output et EventEmitter depuis @angular/core :

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
```

Puis, on ajoute le décorateur `@Output()` devant la variable qui va envoyer les données :

```typescript
export class CardComponent {
  @Output() item: EventEmitter<any> = new EventEmitter();
  addNewItem(value: string) { // On crée une fonction qui va envoyer les données
    this.newItemEvent.emit(value); // On émet l'événement
  }
}
```

Ensuite, dans le component qui va recevoir les données, on ajoute la variable dans le template :

```html
<app-card (newItemEvent)="addItem($event)"></app-card>
```

### Pipes

Les pipes permettent de modifier l'affichage d'une variable. Il existe plusieurs pipes :

- `uppercase` : transforme le texte en majuscule
- `lowercase` : transforme le texte en minuscule
- `titlecase` : transforme le texte en majuscule au début de chaque mot
- `slice` : permet de découper une chaîne de caractères
- `json` : permet d'afficher un objet au format JSON
- `date` : permet de formater une date
- `currency` : permet de formater un nombre en monnaie
- `percent` : permet de formater un nombre en pourcentage
- `async` : permet de gérer les données asynchrones

Ils fonctionnent comme des fonctions en prenant les valeurs de nos expressions en input et en affichant la sortie directement au niveau du template.

Pour utiliser un pipe, on utilise le symbole `|` :

```html
<p>{{pokemon.name | uppercase}}</p>
```

On combine donc l'interpolation et le pipe, et on peut les chainer :

```html
<p>{{pokemon.name | uppercase | slice:0:3}}</p>
```

Exemple d'utilisation :

Avec `ng generate pipe nom`, on crée un pipe nom :

```typescript
export class NomPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.toUpperCase();
  }
}
```

Cette fonction prend en paramètre une valeur et retourne une valeur transformée. On peut également lui passer des paramètres :

```typescript
export class NomPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.toUpperCase() + ' ' + args[0];
  }
}
```

Et on l'utilise dans le template :

```html
<p>{{pokemon.name | nom:'test'}}</p>
```

## Mécanisme de dépendances

Nous allons nous intéresser aux mécanismes de gestion des dépendances d'Angular et comment l'injection de dépendances permets de déclarer et d'utiliser ces fameuses dépendances de façon globale et optimisée. Le but est de commencer à mettre en place le pattern `SoC` (Separation of Concerns) qui permet de séparer les responsabilités de notre application, en utilisant des `services`.

### Injection des dépendances

Il s'agit d'un design pattern couramment utilisé dans des applications utilisant des langages comme C# ou Java.
Au fur et à mesure que nos applications grandissent, des parties de notre code bont avoir besoin d'utiliser de façon interne des instances particulières, plus communément appelées `dépendances`. Ces dépendances peuvent être des `services, des composants, des modules`, etc.
Fournir ces dépendances consiste à utiliser le mécanisme d'`injection de dépendances` d'Angular pour fournir à une classe les instances dont elle a besoin pour fonctionner.
Ce dernier est responsable de l'`instanciation` des dépendances et de le `configuration` de la dépendance à la classe qui en a besoin.
Le client n'a aucune information sur ces mécanismes et n'a pas besoin de les gérer. Il n'a qu'à déclarer les dépendances dont il a besoin et le mécanisme d'injection de dépendances se charge du reste.

#### Création d'un service

Pour créer un service, on utilise la commande suivante :

```bash
ng generate service services/pokemon
```

Cela va créer un fichier `pokemon.service.ts`.
Pour injecter un service dans un composant, on utilise le décorateur `@Injectable()` dans le service :

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }
}
```

Puis, on importe le service dans le composant :

```typescript
import { PokemonService } from '../services/pokemon.service';
```

Et on l'injecte dans le constructeur :

```typescript
constructor(private pokemonService: PokemonService) { }
```

L'injection du service se fait donc par l'intermédiare du constructeur. On peut également injecter un service dans un autre service, on récupère une instance `singletone` directement utilisable au sein de notre classe (avec this). L'injecteur d'Angular va se charger de créer une instance de notre service et de l'injecter dans le constructeur de notre composant avec toutes les dépendances dont il a besoin. Il vérifiera à chaque fois si une dépendance donné n'a pas déjà été instanciée et si c'est le cas, il l'injectera directement.

##### Utilisation d'un service

Pour utiliser un service, on peut créer une fonction dans le service :

```typescript
getPokemon() {
  return this.http.get('https://pokeapi.co/api/v2/pokemon');
}
```

Puis, on l'appelle dans le composant :

```typescript
ngOnInit() {
  this.pokemonService.getPokemon().subscribe((data: any) => {
    this.pokemons = data.results;
  });
}
```

## Introduction à RxJS

Ici nous allons traiter de la gestion des opérations asynchrones, il s'agit  de tâches rencontrées fréquemment pour les développeurs. RxJS est une librairie JavaScript qui permet de gérer les opérations asynchrones. Elle est basée sur le pattern `Observable` qui permet de gérer les flux de données asynchrones. Les fonctionnalités intrinsèques (core) d'Angular dépendent relativement peu de RxJS. En revanche, les packages comme le router ou le client HTTP d'Angular utilisent RxJS pour gérer les opérations asynchrones.

### Promises

Les `promises` sont des objets qui représentent une valeur qui peut être disponible maintenant, dans le futur ou jamais. Elles sont utilisées pour gérer les opérations asynchrones. Elles sont similaires aux `callbacks` mais elles ont l'avantage d'être plus simples à utiliser et de permettre de gérer les erreurs de façon plus efficace. Elles sont disponibles nativement dans JavaScript depuis la version ES6.

#### Création d'une promise

Pour créer une promise, on utilise le constructeur `Promise` :

```typescript
private onDoingSomething() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000); // on appelle la fonction resolve au bout de 2 secondes
  });
}

onDoingSomething().then(() => {
  // Do something
});
```

A noter que les promesses ne peuvent pas être annulées, elles sont exécutées jusqu'à leur terme. Ce sont des opérations "one-shot", elles ne renvoient qu'une seule valeur.

### Observables

Un observable est un objet qui maintient une liste de dépendants, appelés `observers`, et notifie ces derniers lorsqu'un changement intervient sur l'observable. Il s'agit d'un pattern de programmation qui permet de gérer les flux de données asynchrones. Il est utilisé pour gérer les opérations asynchrones. Il est disponible dans RxJS.

Les `observers` ont besoin de s'`abonner` à un oberservable afin d'être notifié et de réagir à des changements d'états.
On appelle ce procédé le `pattern observer`, il permet de mettre en place des opéaration concurrentes et de la logique très avancée.

Exemple :

```typescript
export class AppComponent {
  title = 'my-app';
  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  constructor() {
    this.title$.subscribe(this.setTitle);
  }

  private setTitle = () => {
    const timestamp = new Date().getMilliseconds();
    this.title = `Learning Angular (${timestamp})`;
  }

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  }

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }

}
```
On a créé une propriété `title$` de type `Observable`. Ici, l'observable `title$` est créé dans le constructeur de la classe `AppComponent`.

Il prend en paramètre une fonction `observer` qui est appelée à chaque fois que quelqu'un utilisera l'observable. Cette fonction prend en paramètre une fonction `next` qui permet de notifier l'observable. Ici, on appelle la fonction `next` toutes les 2 secondes. On peut également notifier l'observable avec la fonction `complete` qui permet de notifier la fin de l'observable.

C'est une fonction callback avec comme paramètre une fonction `resolve` qui permet de notifier la fin de l'observable. Ici, on appelle la fonction `observer.next()` toutes les 2 secondes.

`this.title$.subscribe(this.setTitle)` permet de s'abonner à l'observable. A chaque fois que l'observable est notifié, la fonction setTitle est appelée.

Cette fonction va mettre à jour la propriété `title` de la classe `AppComponent` avec un timestamp pour simuler un changement de valeur.

Un observable n'émettra aucun élément tant qu'un `observer|subscriber` ne s'y sera pas abonné.

Un observable est équipé pour retourner un flux de données. Il peut retourner plusieurs valeurs, contrairement aux promesses qui ne peuvent retourner qu'une seule valeur.

C'est le subscriber qui va être notifié de ce qui va être passé en paramètre de l' `observable`.

Tout cela fait partie de la programmation réactive, c'est-à-dire que l'on va réagir à des événements qui vont se produire.

Exercice :

Faire un key logger qui va afficher dans la console les touches qui sont pressées.

```typescript
export class KeyLoggerComponent {
  title = 'key-logger'
  title$ = new Observable(observer => {
      setInterval(() => {
        observer.next();
      }, 2000);
    }
  );

  keyLogger = fromEvent(document, 'keypress');
  constructor() {
    this.title$.subscribe(this.logKey);
  }

  private logKey = () => {
    this.keyLogger.subscribe((event: any) => console.log(event.key));
  }
}
```

- Ici, on a créé un observable `title$` qui va notifier tous les 2 secondes.
- A chaque fois que l'observable `title$` est notifié, la fonction `logKey` est appelée.
- L'observable `keyLogger` va écouter les événements de type `keypress` sur le document.
- Le constructeur de la classe `KeyLoggerComponent` va s'abonner à l'observable `title$` et appeler la fonction `logKey`.
- La fonction `logKey` va s'abonner à l'observable `keyLogger` qui va écouter les événements de type `keypress` sur le document.
- A chaque fois qu'une touche est pressée, la fonction `logKey` est appelée et affiche dans la console la touche pressée.

### Communiquer avec des services qui utilisent http

Le but :
- envoyer/recevoir des données avec le protocole http
- découvrir le client http d'Angular
- mettre en place un backend
- gérer les opérations CRUD avec Angular, RxJS et le client http d'Angular

Exemple :

```typescript
const url = 'https://jsonplaceholder.typicode.com/posts';
fetch(url)
  .then(response => {
    return response.ok ? response.json() : Promise.reject(response.status);
  })
  .then(resultat => {
    console.log(resultat);
  } else {
    console.log(`Erreur ${resultat}`);
  })
```

Ici on a créé une constante `url` qui contient l'URL de l'API `jsonplaceholder` qui permet de récupérer des données. On utilise la méthode `fetch` qui permet de faire une requête http pour récupérer les données de l'API. On utilise la méthode `then` qui permet de récupérer le résultat de la requête http. On utilise la méthode `json` qui permet de récupérer les données au format JSON.

`response.json()` renvoie une promise, on peut donc utiliser la méthode `then` pour récupérer les données.
On peut donc chaîner les méthodes `then` pour récupérer les données, et donc les promesses.

Les `observables` sont des méthodes plus flexibles pour gérer les requêtes http.

Exemple :

```typescript
const url = 'https://jsonplaceholder.typicode.com/posts';
const request$ = new Observable(subsciber => {
  fetch(url)
    .then(response => {
      return response.ok ? response.json() : Promise.reject(response.status);
    })
    .then(resultat => {
      subscriber.next(resultat);
      subscriber.complete();
    })
    .catch(error => {
      subscriber.error(error);
    });
});

request$.subscribe(httpResponse) => {
    console.log(httpResponse)
  });
```


Ici on a :
- créé une constante `url` qui contient l'URL de l'API `jsonplaceholder` qui permet de récupérer des données.
- créé un observable `request$` qui va faire une requête http pour récupérer les données de l'API.
- créé un `subscriber` qui va être notifié à chaque fois que l'observable `request$` est notifié.
- créé une fonction `fetch` qui permet de faire une requête http pour récupérer les données de l'API.
- utilisé la méthode `then` qui permet de récupérer le résultat de la requête http.
- utilisé la méthode `json` qui permet de récupérer les données au format JSON.
- utilisé la méthode `next` qui permet d'émettre les données de réponse de la requête http.
- utilisé la méthode `subscribe` qui permet de s'abonner à l'observable.

## Les routeurs

Le but :
- étudier le projet fourni
- mettre en place un routage simple
- à l'aide de la documentation officielle, déterminer quelles fonctionnalités de router sont utilisées dans le projet fourni

## Formulaires

Le framework Angular propose deux approches pour les formulaires : `template-driven` et `reactive`. Aucune des deux approches n'est meilleure que l'autre, elles sont complémentaires.
La grande différence réside dans la façon dont sont gérées les données du formulaire :
- `template-driven` : les données sont gérées par le template, facile à mettre en place mais sont difficiles à tester, leur fonctionnement depend est basé sur les mécanismes de détéction des changements d'Angular.
- `reactive forms` : les données sont gérées par le code, plus difficile à mettre en place mais plus facile à tester, leur fonctionnement est basé sur les observables de RxJS. Ils sont mis en place au niveau du composant. Ils permettent de gérer les données au travers d'un `form-model`.

En hmtl :

  ```html
  <form action="" method="post">
    <div>
      <input type="text" id="name" name="name" />
    </div>
    <div>
      <input
      type="password"
      id="password"
      name="password"
      placeholder="Mot de passe"
      />
    </div>
    <button type="submit">Login</button>
  </form>
  ```

En Angular, ngModel permet de lier les données du formulaire au modèle de données du composant.

```html
<div *ngIf="product$ | async as product">
  <h2>Product Details</h2>
  <h3>{{product.name}}</h3>
  <span>{{product.price | currency:'EUR'}}</span>
  <form (ngSubmit)="changePrice(product, price!)">
    <input placeholder="New price" name="price" [(ngModel)]="price" />
    <button type="submit">Change</button>
  </form>
  <p>
    <button *ngIf="authService.isLoggedIn" (click)="buy(product)">Buy Now</button>
    <button class="delete" (click)="remove(product)">Delete</button>
  </p>
</div>
```

Ici, on a :
- créé un formulaire avec la directive `ngSubmit` qui permet d'appeler la fonction `changePrice` du composant.
- créé un input avec la directive `ngModel` qui permet de lier les données du formulaire au modèle de données du composant.

Les formulaires template-driven sont utiles pour les petits formulaires, ils sont faciles à mettre en place et à utiliser.

### Les formulaires réactifs

Les classes clés de ces types de formulaires sont :
- `FormControl` : représente un champ de formulaire tel qu'un `<input>`, il permet de gérer la valeur du champ, son état de validité et son état de modification.
- `FormGroup` : représente un groupe de champs de formulaire tel qu'un `<form>`, il permet de gérer la valeur du groupe, son état de validité et son état de modification.
- `FormArray` : représente un tableau de champs de formulaire, il permet de gérer la valeur du tableau, son état de validité et son état de modification. Il peut être modifié à l'exécution (ajout et suppression dynamique de FormControl possible).

Ces classes se trouvent dans le module `@angular/forms`. Elles héritent toutes de la classe `AbstractControl` qui permet de gérer la valeur, l'état de validité et l'état de modification.

Exemple :

on a d'un côté le fichier ts :

  ```typescript
  import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { priceRangeValidator } from '../price-range.directive';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  @Output() added = new EventEmitter<Product>();
  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, priceRangeValidator()]
    })
  });
  showPriceRangeHint = false;
  get name() { return this.productForm.controls.name }
  get price() { return this.productForm.controls.price }

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.price.valueChanges.subscribe(price => {
      if (price) {
        this.showPriceRangeHint = price > 1 && price < 10000;
      }
    });
  }

  createProduct() {
    this.productsService.addProduct(this.name.value, Number(this.price.value)).subscribe(product => {
      this.productForm.reset();
      this.added.emit(product);
    });
  }

}
  ```

  et le html correspondant :

    ```html
    <form [formGroup]="productForm" (ngSubmit)="createProduct()">
  <div>
    <label for="name">Name</label>
    <input id="name" formControlName="name" required />
    <span *ngIf="name.touched && name.invalid">
      The name is not valid
    </span>
  </div>
  <div>
    <label for="price">Price</label>
    <input id="price" formControlName="price" required />
    <span *ngIf="price.touched && price.hasError('required')">
      The price is required
    </span>
    <span *ngIf="price.touched && price.hasError('outOfRange')">
      The price is out of range
    </span>
    <span *ngIf="showPriceRangeHint">
      Price should be between 1 and 10000
    </span>
  </div>
  <div>
    <button type="submit" [disabled]="!productForm.valid">Create</button>
  </div>
</form>
    ```

On a donc ici :
- créé un formulaire avec la directive `formGroup` qui permet de lier les données du formulaire au modèle de données du  qui permet d'appeler la fonction `createProduct()` du composant lorsque le formulaire est soumis.
- créé un input avec la directive `formControlName` qui permet de lier les données du formulaire au modèle de données du composant qui permet de gérer la valeur du champ, son état de validité et son état de modification.

La class `FormGroup` expose à une propriété `controls` qui est un objet dont les clés sont les noms des champs du formulaire et les valeurs sont des instances de `FormControl`. Cela nous permet de créer des getter pour accéder aux champs du formulaire. On a juste à mettre le nom du champ dans la propriété `formControlName` de l'input et à utiliser le getter dans le template.

```typescript
  get name() { return this.productForm.controls.name }
  get price() { return this.productForm.controls.price }
```

`ProductForm`aura aussi une propriété `value` qui contiendra les valeurs des champs du formulaire.

```typescript
  createProduct() {
    this.productsService.addProduct(this.name.value, Number(this.price.value)).subscribe(product => {
      this.productForm.reset();
      this.added.emit(product);
    });
  }
```

Les status de formControl qui permettent de savoir si le champ est valide ou non sont :
-- `ng-untouched` : le champ n'a pas été touché, l'utilisateur n'a pas interagi avec le control.
-- `ng-touched` : le champ a été touché, l'utilisateur a interagi avec le control.
-- `ng-pristine` : le champ n'a pas été modifié, la valeur initiale est toujours présente.
-- `ng-dirty` : le champ a été modifié, la valeur initiale n'est plus présente. L'utilisateur a fournir une nouvelle valeur au formulaire.
-- `ng-valid` : le champ est valide.
-- `ng-invalid` : le champ est invalide.

Pour ajouter un style en fonction du status d'un champ, on peut utiliser les classes css suivantes :

```css
input.ng-touched {
  border-color: 3px solid lightblue;
}
input.ng-dirty.ng-invalid {
  border-color: 3px solid red;
}
```
Pour que le contrôle soit valide on peut ajouter un attribut `required` à l'input. On peut aussi ajouter un attribut `min` et `max` pour définir une valeur minimale et maximale.
Cette technique de validation vaut pour les deux types de formulaires.

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceRangeValidator(): ValidatorFn {
  return (control: AbstractControl<number>): ValidationErrors | null => {
    const inRange = control.value > 1 && control.value < 10000;
    return inRange ? null : { outOfRange: true };
  };
}
```

Ici on a créé une fonction qui retourne une fonction qui prend en paramètre un `AbstractControl` et retourne un objet `ValidationErrors` ou `null`. On peut donc utiliser cette fonction pour créer un validateur personnalisé. On peut ensuite utiliser ce validateur dans le tableau des validateurs du `FormControl`.

A noter qu'il existe des méthodes de `AbstractControl` qui permettent de manipuler les données de formulaires :
- `setValue()` : permet de définir la valeur du champ : remplace toutes les valeurs des controls du form :

```typescript
this.productForm.setValue({
  name: 'test',
  price: 10
});
```
Set value est utile prend en paramètre un objet qui contient toutes les valeurs des controls du form.

- `patchValue()` : permet de mettre à jours les valeurs de controls specifiques du form :

```typescript
this.productForm.patchValue({
  name: 'test'
});
```
- `reset()` : permet de réinitialiser la valeur du champ à sa valeur initiale.

A noter que la métholde valueChanges de `FormControl` permet d'écouter les changements de valeur du champ.

```typescript
this.price.valueChanges.subscribe(price => {
  if (price) {
    this.showPriceRangeHint = price > 1 && price < 10000;
  }
});
```
Ici, on écoute les changements de valeur du champ price et on affiche un message si la valeur est en dehors de la plage autorisée.



# Consignes pour le rendu final

- Création d'un pokedex
- Refactoriser son application en module
- Utiliser les fonctionnalités :
  - illustrer par un commentaire le binding de propriété Angular
  - illustrer par un commentaire la création de variable template Angular
  - utiliser les méthodes du cycle de vie d'un composant Angular
  - utiliser des services Angular et la dépendance par injection
  - utiliser des directives structurelles Angular
  - Manipuler des données avec les pipes (au moins un pipe personnalisé)
- Récupération des données depuis une API, persistance des données dans le local storage et utilisation des services pour manipuler les données
- Bonus : utiliser les fonctionnalités de backend apportées par Firebase
- utiliser les observables pour manipuler les données
- Collecter des données avec un formulaire : reactive forms ou template driven forms
- Bonus : installer et utiliser une bibliothèque comme Angular Material

