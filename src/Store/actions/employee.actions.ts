import { createAction, props } from "@ngrx/store";
import { Employee } from "src/models/employee.model";

export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction('[Employee] Load Employees SUCCESS', props<{ allEmployees: Employee[] }>());

export const loadEmployeesError = createAction('[Employee] Load Employees ERROR', props<{ errorMessage:String }>());

export const addEmployee = createAction('[Employee] Add Employee', props<{employee:Employee}>());

export const updateEmployee = createAction('[Employee] Update Employee', props<{employee:Employee}>()) ;
export const deleteEmployee = createAction('[Employee] Delete Employee', props<{id:number}>());
