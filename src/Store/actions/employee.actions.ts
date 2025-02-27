import { createAction, props } from "@ngrx/store";
import { Employee } from "src/models/employee.model";


export const setCurrentEmployee = createAction('[Employee] Set Current Employee', props<{ currentEmployeeId: number }>());
export const clearCurrentEmployee = createAction('[Employee] Clear Current Employee');
export const initializeCurrentEmployee = createAction('[Employee] Initialize Current Employee');

export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction('[Employee] Load Employees SUCCESS', props<{ employees: Employee[] }>());
export const loadEmployeesError = createAction('[Employee] Load Employees ERROR', props<{ errorMessage: string }>());

export const createEmployee = createAction('[Employee] Add Employee', props<{ employee: Employee }>());
export const createEmployeeSuccess = createAction('[Employee] Add Employee Success', props<{ employee: Employee }>());
export const createEmployeeFailure = createAction('[Employee] Add Employee Failure', props<{ error: string }>());

export const updateEmployee = createAction('[Employee] Update Employee', props<{ employee: Employee }>());
export const updateEmployeeSuccess = createAction('[Employee] Update Employee Success', props<{ employee: Employee }>());
export const updateEmployeeFailure = createAction('[Employee] Update Employee Failure', props<{ error: string }>());

export const deleteEmployee = createAction('[Employee] Delete Employee', props<{ id: number }>());
export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ id: number }>());
export const deleteEmployeeFailure = createAction('[Employee] Delete Employee Failure', props<{ error: string }>());

export const saveIdToStorage  = createAction('[Employee] Save ID To Storage', props<{ id: string }>());
export const loadIdFromStorage = createAction('[Employee] Load ID From Storage');