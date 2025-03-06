import { employeeReducer } from './employee.reducer';
import { deleteEmployeeSuccess } from '../actions/employee.actions';
import { initialState } from '../selector/employees.selector';

xdescribe('Employee Reducer', () => {
  it('should remove the employee when deleteEmployeeSuccess is dispatched', () => {
    const state = {
      ...initialState,
      employees: [
        { id: 123, firstName: 'John', lastName: 'Doe', email:'john@gmail.com', country:'France', department:'abc' },
        { id: 456, firstName: 'Jane', lastName: 'Doe', email:'jane@gmail.com', country:'France', department:'ddd'  }
      ]
    };
    const action = deleteEmployeeSuccess({ id: 123 });
    const result = employeeReducer(state, action);

    expect(result.employees).toEqual([
      { id: 456, firstName: 'Jane', lastName: 'Doe', email:'jane@gmail.com', country:'France', department:'ppp'  }
    ]);
  });
});
