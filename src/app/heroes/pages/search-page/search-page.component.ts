import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero: Hero | undefined;

  constructor(
    private _heroes: HeroesService,
  ){}

  public get emptyResponse(): boolean  {
    return (
      this.heroes.length == 0   &&
      !!this.searchInput?.value &&
      (this.searchInput.value.length > 0)
    );
  }

  public searchHero(): void {
    const value: string = this.searchInput.value || '';

    this._heroes.getSuggestions( value ).subscribe({
      next:  ( heroes ) => {
        this.heroes = heroes;
      },
      error: ( error )  => {},
    });
  }

  public onSelectedOption(e: MatAutocompleteSelectedEvent): void {
    const value = e.option.value;
    if( !value ){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = value;
    this.searchInput.setValue( hero.superhero );

    this._heroes.getHeroById( hero.id );

    this.selectedHero = hero;
  }
}
