import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private _hero: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(): void {
    this._activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this._hero.getHeroById(id) ),
      // delay(5000)
    )
    .subscribe({
      next: ( hero ) => {
        if(!hero){ this._router.navigate(['/heroes/list']); return; }

        this.hero = hero;
        console.log(this.hero);
      }
    });
  }

  public goBack(): void {
    this._router.navigateByUrl('heroes/list');
  }

}
