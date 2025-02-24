import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employee } from "src/models/employee.model";
import * as AppState from '../state/app.state';

export interface State extends AppState.State{
    allEmployees:EmployeeState
}

export interface EmployeeState {
    currentEmployeeId:number | null;
    allEmployees: Employee[];   
    error: string ;
}

export const initialState: EmployeeState = {
    currentEmployeeId: null,
    allEmployees: [],
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
    state => state.allEmployees
  );
  
  export const getError = createSelector(
    getEmployeeFeatureState,
    state => state.error
  );
  
  export const getCurrentEmployee = createSelector(
    getEmployeeFeatureState,
    getCurrentEmployeeId,
    (state, currentEmployeeId) => {
      if (currentEmployeeId === 0) {
        return {
            id: 0,
            firstName:'',
            lastname: '',
            department: '',
            email: '',
            country: '',         
        };
      } else {
        return currentEmployeeId ? state.allEmployees.find(p => p.id === currentEmployeeId) : null;
      }
    }
  );
 

// export const selectFeature =(state: AppState) =>{
//     return state.employees
// }

// export const selectError =(state:AppState)=>{
//     return state.employees
// }

// export const selectFeatureEmployee = createSelector(selectFeature,
//     (state:FeatureState)=> state.allEmployees
// );


// export const selectFeatureError = createSelector(
//     selectFeature,
//     (state: FeatureState)=>state.errorMessage
// );