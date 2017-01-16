import { Component, NgZone, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

declare var Prism: any;


@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',

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
