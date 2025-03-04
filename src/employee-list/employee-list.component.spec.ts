import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as store from '@ngrx/store';
import { getCurrentEmployeeId, State } from 'src/Store/selector/employees.selector';
import { employeeReducer } from 'src/Store/reducers/employee.reducer';
import { deleteEmployee } from 'src/Store/actions/employee.actions';
import { Employee } from 'src/models/employee.model';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  //let mockEmployeeService: Store<State>;
  let store = jasmine.createSpyObj('Store',['dispatch']);

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports:[store.StoreModule.forRoot({})],
      providers:[
        {provide: store.Store, useValue:store}
      ]
    });

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
  })

  it('should dispatch deleteEmployee action when delete is called', () => {
    const employeeData: Employee ={
      id: 123, // example id
      firstName: 'John',
      lastName: 'Doe',
      department: 'Engineering',
      country: 'France',
      email:'john@gmail.com'
    }
   
    const employee = getCurrentEmployeeId(employeeData);
    
    component.deleteEmployee(employeeData);

    expect(store.dispatch).toHaveBeenCalledWith(deleteEmployee( employeeData));
  });

});

