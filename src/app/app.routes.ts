import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { HOMEROUTES } from './home/route';
import { DOCUMENTATIION_ROUTE  } from './documentation/route';

export const ROUTES: Routes = [
  ...HOMEROUTES,
  ...DOCUMENTATIION_ROUTE,
  { path: 'detail', loadChildren: './+detail/index#DetailModule'},
  { path: '**',    component: NoContentComponent },
];
