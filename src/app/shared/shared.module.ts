import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

const SHARED_COMPONENT = [
  Error404PageComponent
];

@NgModule({
  declarations: [SHARED_COMPONENT],
  imports: [],
  exports: [SHARED_COMPONENT],
})
export class SharedModule { }
