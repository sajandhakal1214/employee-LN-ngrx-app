import { createReducer, on } from "@ngrx/store";
import { Employee } from "src/models/employee.model";
import * as EmployeeActions from  '../actions/employee.actions';

import { initialState } from "../selector/employees.selector";


export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.loadEmployees,(state)=>state),
    on(EmployeeActions.loadEmployeesSuccess,(state:any,{employees})=>
        {
            return {...state,employees:employees,errorMessage:""}
        }),
    on(EmployeeActions.loadEmployeesError,(state:any,{errorMessage})=>{
        return {...state, errorMessage:errorMessage,employees:[]}
    }),

    on(EmployeeActions.updateEmployeeSuccess,(state,{employee})=> ({
        ...state,
        employees: state.employees.map(e => e.id === employee.id ? employee : e)
    })),

    on(EmployeeActions.addEmployee,(state,{employee})=>({...state, employees:[...state.employees, employee]})),
   
    on(EmployeeActions.deleteEmployeeSuccess,(state,{id})=>({
        ...state,
        employees: state.employees.filter(e => e.id !== id)
    })),
    
    on(EmployeeActions.setCurrentEmployee,(state,{currentEmployeeId})=>({
        ...state,
        currentEmployeeId: currentEmployeeId
    })) 






);