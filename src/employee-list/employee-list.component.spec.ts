import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployeeListComponent } from "./employee-list.component";
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getCurrentEmployeeId, State } from 'src/Store/selector/employees.selector';

import { deleteEmployee, loadEmployees } from 'src/Store/actions/employee.actions';
import { Employee } from "src/models/employee.model";

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  let store: MockStore;

  const initialState = {
    myFeature: {
      data: { id: 1, firstName: 'Peter', lastName: 'Gonzalez',department: 'CEO',email: 'Peter@gmail.com',country: 'Mexico'}
    }
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      providers: [
        provideMockStore({ initialState, selectors: [{ selector: getCurrentEmployeeId, value: [] }] })
      ]

    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()

  });

  it('should dispatch loadData action on init', ()=>{
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadEmployees());
  });

  it('should dispatch Delete action if confirmed', ()=>{
      spyOn(store,'dispatch');
      //spyOn(window,'confirm').and.returnValue(true);
      const empToDelete: Employee = { id: 1, firstName: 'Peter', lastName: 'Gonzalez',department: 'CEO',email: 'Peter@gmail.com',country: 'Mexico', } ;
      component.deleteEmployee(empToDelete );
      expect(store.dispatch).toHaveBeenCalledWith(deleteEmployee(empToDelete));
  });

});
