import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

   constructor(
    private _router: Router) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  goToDocumentation(): void {
    this._router.navigate(['docs']);
  }

}
