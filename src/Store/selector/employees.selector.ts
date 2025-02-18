import { createSelector } from "@ngrx/store";
import { Employee } from "src/models/employee.model";


export interface FeatureState{
    allEmployees:Employee[];
    errorMessage:String;
}

export interface AppState{
    employees: FeatureState;
}

export const selectFeature =(state: AppState) =>{
    return state.employees
}

export const selectError =(state:AppState)=>{
    return state.employees
}

export const selectFeatureEmployee = createSelector(selectFeature,
    (state:FeatureState)=> state.allEmployees
);


export const selectFeatureError = createSelector(
    selectFeature,
    (state: FeatureState)=>state.errorMessage
);