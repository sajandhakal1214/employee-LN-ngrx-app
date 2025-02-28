import { createReducer, on } from "@ngrx/store";
import { Employee } from "src/models/employee.model";
import * as EmployeeActions from '../actions/employee.actions';

import { EmployeeState, initialState } from "../selector/employees.selector";
import { Action } from "rxjs/internal/scheduler/Action";


export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.loadEmployees, (state) => state),
    on(EmployeeActions.loadEmployeesSuccess, (state: any, { employees }) => {
        return { ...state, employees: employees, errorMessage: "" }
    }),
    on(EmployeeActions.loadEmployeesError, (state: any, { errorMessage }) => {
        return { ...state, errorMessage: errorMessage, employees: [] }
    }),

    //UPDATE
    on(EmployeeActions.updateEmployeeSuccess, (state, action): EmployeeState => {
        const updateEmployees = state.employees.map(
            item => action.employee.id === item.id ? action.employee : item);
        return {
            ...state,
            employees: updateEmployees,
            currentEmployeeId: action.employee.id,
            error: ''
        };
    }),
    on(EmployeeActions.updateEmployeeFailure, (state, action): EmployeeState => {
        return {
            ...state,
            error: action.error
        };
    }),

    //ADD 
    on(EmployeeActions.createEmployee, (state, { employee }) => ({ ...state, employees: [...state.employees, employee] })),

    on(EmployeeActions.createEmployeeSuccess, (state, action): EmployeeState => {
        return {
            ...state,
            employees: [...state.employees, action.employee],
            currentEmployeeId: action.employee.id,
            error: ''
        };
    }),
    on(EmployeeActions.createEmployeeFailure,(state,action): EmployeeState=>{
        return{
            ...state,
            error:action.error
        };
    }),

    //DELETE
    on(EmployeeActions.deleteEmployeeSuccess, (state, action): EmployeeState => {
        return {
            ...state,
            employees: state.employees.filter(employee => employee.id !== action.id),
            currentEmployeeId: null,
            error: ''
        };
    }),
    on(EmployeeActions.deleteEmployeeFailure, (state, action): EmployeeState => {
        return {
            ...state,
            error: action.error
        };
    }),

    on(EmployeeActions.setCurrentEmployee, (state, { currentEmployeeId }) => ({
        ...state,
        currentEmployeeId: currentEmployeeId
    })),

    on(EmployeeActions.clearCurrentEmployee, (state): EmployeeState => {
        return {
            ...state, currentEmployeeId: null
        };
    }),

    on(EmployeeActions.initializeCurrentEmployee, (state): EmployeeState => {
        return {
            ...state,
            currentEmployeeId: 0
        };
    }),


    on(EmployeeActions.saveIdToStorage, (state, { id }) => ({ ...state, id })),
    //on(EmployeeActions.loadIdFromStorage, (state) => ({ ...state, id: state.currentEmployeeId }))





);