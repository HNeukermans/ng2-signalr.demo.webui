import { Component, NgZone, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from './route.transition';

declare var Prism: any;


@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class HomeComponent implements AfterViewChecked   {

   constructor(
    private _router: Router) {

  }

  ngAfterViewChecked():any {
    return Prism.highlightAll();
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  goToDocumentation(): void {
    this._router.navigate(['docs']);
  }

}
