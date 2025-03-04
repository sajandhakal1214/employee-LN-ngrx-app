import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee.model';

// import * as fromRoot from '../Store/selector/employees.selector';
import { getEmployees, getError, State } from '../Store/selector/employees.selector';
import * as EmployeeActions from '../Store/actions/employee.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: any;

  constructor(private store: Store<State>, private router: Router) { }

  employees$: Observable<Employee[]> | undefined;
  errorMessage$: Observable<string> | undefined;
  pageTitle = 'Employee Listing';



  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
    this.employees$ = this.store.select(getEmployees);

    this.errorMessage$ = this.store.select(getError);

  }

  deleteEmployee(employee: Employee): void {
    if (employee && employee.id) {
      if (confirm(`Are you sure you want to delete employee: ${employee.firstName + ' ' + employee.lastName}?`)) {
        this.store.dispatch(EmployeeActions.deleteEmployee({ id: employee.id }));
        this.reloadPage();
      }
    }
    else {
      // No need to delete, it was never saved
      this.store.dispatch(EmployeeActions.clearCurrentEmployee());
    }
  }

  reloadPage():void{
    window.location.reload();
  }

  updateEmployee(employee: Employee): void {
    this.store.dispatch(EmployeeActions.setCurrentEmployee({ currentEmployeeId: employee.id }));

    this.router.navigate(['/form', employee.id]);

  }

  createEmployee(): void {
    console.log('Update clicked!');
    // this.store.dispatch(EmployeeActions.updateEmployee({ employee }));
  }

  newEmployee(): void {
    //this.store.dispatch(EmployeeActions.initializeCurrentEmployee());
    this.store.dispatch(EmployeeActions.initializeCurrentEmployee());
    this.router.navigate(['/form', 0]);

  }

}
