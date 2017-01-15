import { DocumentationComponent } from './documentation.component';
import { ConnectionResolver } from './route.resolver';

export const DOCUMENTATIION_ROUTE = [
  { path: 'docs', component: DocumentationComponent, resolve: {
      connection: ConnectionResolver
    }
  }
];
