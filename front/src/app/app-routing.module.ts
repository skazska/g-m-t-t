import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhoneListComponent} from "./phone-list/phone-list.component";
import {PhoneRecordComponent} from "./phone-record/phone-record.component";

const routes: Routes = [
  { path: 'add', component: PhoneRecordComponent },
  { path: 'edit/:name', component: PhoneRecordComponent },
  { path: 'list', component: PhoneListComponent, data: {isList: true} },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
