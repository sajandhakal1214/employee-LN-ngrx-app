import { createReducer, on } from "@ngrx/store";
import { Employee } from "src/models/employee.model";
import * as EmployeeActions from  '../actions/employee.actions';
import { initialEmployeeState } from "../states/employee.store";


export interface EmployeeState {
    employees: Employee[];
}

// export const initialEmployeeState: EmployeeState = {
//     employees: []
// };

export const employeeReducer = createReducer(
    initialEmployeeState,
    on(EmployeeActions.loadEmployees,(state)=>state),
    on(EmployeeActions.loadEmployeesSuccess,(state:any,{allEmployees})=>
        {
            return {...state,allEmployees:allEmployees,errorMessage:""}
        }),
    on(EmployeeActions.loadEmployeesError,(state:any,{errorMessage})=>{
        return {...state, errorMessage:errorMessage,allEmployees:[]}
    }),

    on(EmployeeActions.addEmployee,(state,{employee})=>({...state, employees:[...state.allEmployees, employee]})),
    on(EmployeeActions.updateEmployee,(state,{employee})=> ({
        ...state,
        //employees: state.employees.map(emp=>emp.id===employee.id? employee:emp)
    })),
    on(EmployeeActions.deleteEmployee,(state,{id})=>({
        ...state,
        //employees: state.employees.filter(emp=>emp.id !== id)
    }))    
);