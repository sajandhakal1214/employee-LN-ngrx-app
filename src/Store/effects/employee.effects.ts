import { Injectable } from '@angular/core';
import { EmployeeService } from 'src/service/employee.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as EmployeeActions from '../actions/employee.actions';



@Injectable()
export class EmployeeEffects{
    constructor(private actions$: Actions, private employeeService: EmployeeService){}

    //loadEmployees
    loadEmployees$ = createEffect(()=>
    this.actions$.pipe(
        ofType(EmployeeActions.loadEmployees),
        mergeMap(()=>this.employeeService.getEmployees()
        .pipe(
            map(employees=>({type:'[Employee] Load Employees SUCCESS', allEmployees: employees})),
            catchError(()=>of({type:'[Employee] Load Employees ERROR', errorMessage: 'No Employees Found'}))
            //catchError(error =>of(EmployeeActions.loadEmployeesError({errorMessage})))
        )
    )
    ))

    //addEmployee
    addEmployee$ = createEffect(()=>
        this.actions$.pipe(
            ofType(EmployeeActions.addEmployee),
            mergeMap(action=>this.employeeService.addEmployee(action.employee).pipe(
                map(employee=> EmployeeActions.loadEmployees() ),
                catchError(() => of({ type: '[Employee] Add Employee FAILURE' }))
            ))
        )
    );

    //updateEmployee
    updateEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.updateEmployee),
            mergeMap(action => this.employeeService.updateEmployee(action.employee)
                .pipe(
                map(employee=> EmployeeActions.updateEmployeeSuccess({employee})),
                 catchError(()=> of({type:'[Employee] Update Employee FAILURE'}))
                //catchError(()=> of(EmployeeActions.updateEmployeeFailure({error})))
            ))
        )
    );

    //deleteemployee
    deleleEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.deleteEmployee),
            mergeMap(action=>this.employeeService.deleteEmployee(action.id).pipe(
                map(()=> EmployeeActions.deleteEmployee({id: action.id})),
                catchError(()=>of({ type:'[Employee] Delete Employee FAILURE '}))
            ))
        )
    );

}