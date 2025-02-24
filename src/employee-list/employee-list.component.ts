import { Component, OnInit } from '@angular/core';
import { select,  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee.model';

// import * as fromRoot from '../Store/selector/employees.selector';
import {getEmployees, getError, State} from '../Store/selector/employees.selector';
import * as EmployeeActions from '../Store/actions/employee.actions';

import { state } from '@angular/animations';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
displayedColumns: any;
 
  constructor(private store: Store<State>){ }
 
  employees$ : Observable<Employee[]> | undefined;
  errorMessage$: Observable<string> | undefined;


  ngOnInit(): void {
      this.store.dispatch(EmployeeActions.loadEmployees());
      this.employees$ = this.store.select(getEmployees);

      this.errorMessage$ = this.store.select(getError);
  }

  deleteEmployee(id: number): void {
    this.store.dispatch(EmployeeActions.deleteEmployee({id}));
  }

  updateEmployee(employee:Employee):void{
    console.log('Update clicked!');
    this.store.dispatch(EmployeeActions.updateEmployee({employee}));
  }
}
