import { createReducer, on } from "@ngrx/store";
import { Employee } from "src/models/employee.model";
import * as EmployeeActions from  '../actions/employee.actions';

import { initialState } from "../selector/employees.selector";


export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.loadEmployees,(state)=>state),
    on(EmployeeActions.loadEmployeesSuccess,(state:any,{allEmployees})=>
        {
            return {...state,allEmployees:allEmployees,errorMessage:""}
        }),
    on(EmployeeActions.loadEmployeesError,(state:any,{errorMessage})=>{
        return {...state, errorMessage:errorMessage,allEmployees:[]}
    }),

    on(EmployeeActions.updateEmployeeSuccess,(state,{employee})=> ({
        ...state,
        employees: state.allEmployees.map(e => e.id === employee.id ? employee : e)
    })),

    on(EmployeeActions.addEmployee,(state,{employee})=>({...state, employees:[...state.allEmployees, employee]})),
   
    on(EmployeeActions.deleteEmployeeSuccess,(state,{id})=>({
        ...state,
        employees: state.allEmployees.filter(e => e.id !== id)
    }))    
);