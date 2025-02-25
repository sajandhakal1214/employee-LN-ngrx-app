import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employee } from "src/models/employee.model";
import * as AppState from '../state/app.state';

export interface State extends AppState.State{
    employees:EmployeeState
}

export interface EmployeeState {
    currentEmployeeId:number | null;
    employees: Employee[];   
    error: string ;
}

export const initialState: EmployeeState = {
    currentEmployeeId: null,
    employees: [],
    error: ''

};

// Selector functions
const getEmployeeFeatureState = createFeatureSelector<EmployeeState>('employees');

export const getCurrentEmployeeId = createSelector(
    getEmployeeFeatureState,
    state => state.currentEmployeeId
  );

  export const getEmployees = createSelector(
    getEmployeeFeatureState,
    state => state.employees
  );
  
  export const getError = createSelector(
    getEmployeeFeatureState,
    state => state.error
  );
  
  export const getCurrentEmployee = createSelector(
    getEmployeeFeatureState,
    getCurrentEmployeeId,
    (state, currentEmployeeId) => {
        debugger;
      if (currentEmployeeId === 0) {
        return {
            id: 0,
            firstname:'',
            lastname: '',
            department: '',
            email: '',
            country: '',         
        };
      } else {
        return currentEmployeeId ? state.employees.find(e => e.id === currentEmployeeId) : null;
      }
    }
  );
 
