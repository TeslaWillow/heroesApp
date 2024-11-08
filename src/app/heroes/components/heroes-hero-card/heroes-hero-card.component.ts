import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './heroes-hero-card.component.html',
  styles: [
  ]
})
export class HeroesHeroCardComponent implements OnInit {
  @Input()
  public hero!: Hero;

  public get characters(): string[] {
    return this.hero.characters
      .split(',')
      .slice(0,3)
      .map((h) => h.trim());
  }

  ngOnInit(): void {
    if(!this.hero){ throw new Error('Hero is needed.'); }
  }

}
