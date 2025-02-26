import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from 'src/employee-form/employee-form.component';
import { EmployeeListComponent } from 'src/employee-list/employee-list.component';

const routes: Routes = [
  { path: 'list', component: EmployeeListComponent },
  { path: 'form/:id', component: EmployeeFormComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
