import { deleteEmployee } from './employee.actions';

describe('Employee Actions', () => {
  it('should create a deleteEmployee action with the correct payload', () => {
    const id = 123;
    const action = deleteEmployee({ id });

    expect(action.type).toBe('[Employee] Delete Employee');
    expect(action.id).toBe(id);
  });
});