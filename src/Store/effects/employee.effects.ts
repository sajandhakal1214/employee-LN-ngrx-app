import { Injectable } from '@angular/core';
import { EmployeeService } from 'src/service/employee.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import * as EmployeeActions from '../actions/employee.actions';
import { StorageService } from 'src/service/storage.service';



@Injectable()
export class EmployeeEffects {
    constructor(private actions$: Actions, private employeeService: EmployeeService, private storageService: StorageService) { }

    //loadEmployees
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.loadEmployees),
            mergeMap(() => this.employeeService.getEmployees()
                .pipe(
                    map(employees => ({ type: '[Employee] Load Employees SUCCESS', employees: employees })),
                    catchError(() => of({ type: '[Employee] Load Employees ERROR', errorMessage: 'No Employees Found' }))
                    //catchError(error =>of(EmployeeActions.loadEmployeesError({errorMessage})))
                )
            )
        ))

    //createEmployee
    createEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.createEmployee),
            concatMap(action => this.employeeService.createEmployee(action.employee)
            .pipe(
                map(employee => EmployeeActions.createEmployeeSuccess({employee})),
                catchError(error => of(EmployeeActions.createEmployeeFailure({ error })))
            ))
        )
    );

    //updateEmployee
    updateEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.updateEmployee),
            mergeMap(action => this.employeeService.updateEmployee(action.employee)
                .pipe(
                    map(employee => EmployeeActions.updateEmployeeSuccess({ employee })),
                    catchError(error => of(EmployeeActions.updateEmployeeFailure({ error })))
                ))
        )
    );

    //deleteemployee
    deleleEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.deleteEmployee),
            mergeMap(action => this.employeeService.deleteEmployee(action.id).pipe(
                map(() => EmployeeActions.deleteEmployee({ id: action.id })),
                catchError(() => of({ type: '[Employee] Delete Employee FAILURE ' }))
            ))
        )
    );

    loadId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.loadIdFromStorage),
            mergeMap(() => {
                const id = this.storageService.load<string>('id');
                if (id) {
                    return [EmployeeActions.saveIdToStorage({ id })];
                }
                return [];
            })
        )
    );

}