/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { Router } from "@angular/router";
import { NavigationEnd, NavigationStart } from "@angular/router";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <main>
      <div [ngBusy]="busy"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  busy: Promise<boolean> = null;
  constructor(
    public appState: AppState,
    private _router:Router) {

  }

  ngOnInit() {

    let resolveFn = null;
    //console.log('Initial App State', this.appState.state);
    this._router.events.filter(e => e instanceof NavigationStart).subscribe(() => {
      // resolve has been call here! "is-busy"
      console.log('NavigationStart');
      this.busy = new Promise((resolve) => {
        resolveFn = resolve;
       })

    });

    this._router.events.filter(e => e instanceof NavigationEnd).subscribe(() => {
        // resolve finished here!  end of "is-busy" start of "leave" animation
      console.log('NavigationEnd');
      if (resolveFn != null) {
        resolveFn(true);
        resolveFn = null;
      }
    });
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
