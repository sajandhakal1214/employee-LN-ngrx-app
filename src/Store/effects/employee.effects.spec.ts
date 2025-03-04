import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { catchError, Observable, of } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeEffects } from './employee.effects';
import { deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFailure } from '../actions/employee.actions';
import { cold } from 'jasmine-marbles';

describe('EmployeeEffects', () => {
  let actions$: Observable<any>;
  let effects: EmployeeEffects;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    employeeService = jasmine.createSpyObj('EmployeeService', ['deleteEmployee']);

    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions$),
        { provide: EmployeeService, useValue: employeeService }
      ]
    });

    effects = TestBed.inject(EmployeeEffects);
  });

  it('should dispatch deleteEmployeeSuccess when deleteEmployee is successful', () => {
    const id = 123;
    const action = deleteEmployee({ id });
    const outcome = deleteEmployeeSuccess({ id });

    employeeService.deleteEmployee.and.returnValue(of({})); // Simulate API success

    actions$ = of(action);
    const expected = cold('-a', { a: outcome });

    expect(effects.deleleEmployee$).toBeObservable(expected);
  });

  it('should dispatch deleteEmployeeFailure when deleteEmployee fails', () => {
    const id = 123;
    const error = 'Delete failed';
    const action = deleteEmployee({ id });
    const outcome = deleteEmployeeFailure({ error });

    employeeService.deleteEmployee.and.returnValue(of({}).pipe(catchError(() => of(error)))); // Simulate API failure

    actions$ = of(action);
    const expected = cold('-a', { a: outcome });

    expect(effects.deleleEmployee$).toBeObservable(expected);
  });
});


