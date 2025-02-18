import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee.model';

import * as fromRoot from '../Store/selector/employees.selector';
import * as EmployeeActions from '../Store/actions/employee.actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
displayedColumns: any;
 
  constructor( private store: Store<fromRoot.AppState>){ }
 
  employees$: Observable<Employee[]> = this.store.pipe(select(fromRoot.selectFeatureEmployee))
  errorMessage$: Observable<String> = this.store.pipe(select(fromRoot.selectFeatureError))
 

  ngOnInit(): void {
      this.store.dispatch(EmployeeActions.loadEmployees());
    //this.store.dispatch({type: '[Employee] Load Employees'});

    // console.log("hey there!:"+this.employees)
  }

  deleteEmployee(id: number): void {
    this.store.dispatch(EmployeeActions.deleteEmployee({id}));
  }

  updateEmployee(employee:Employee):void{
    console.log('Update clicked!');
    this.store.dispatch(EmployeeActions.updateEmployee({employee}));
  }
}
