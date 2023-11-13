import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailsComponent } from './match-details/components/match-details/match-details.component';

const routes: Routes = [
  {
    path: '',
    component: MatchDetailsComponent
  },
  {
    path: 'match',
    component: MatchDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
