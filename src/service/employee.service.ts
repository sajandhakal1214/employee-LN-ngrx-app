import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Employee } from 'src/models/employee.model';
// import { deleteEmployee } from 'src/Store/actions/employee.actions';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:4000/employees'

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // createEmployee(employee:Employee): Observable<Employee>{
  //   return this.http.post<Employee>(this.apiUrl, employee);
  // }

  createEmployee(employee:Employee): Observable<Employee>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Employee Id must be null for the Web API to assign an Id
    const newEmployee = { ...employee, id: null };
    return this.http.post<Employee>(this.apiUrl, newEmployee, { headers })
      .pipe(
        tap(data => console.log('createEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // updateEmployee(employee: Employee): Observable<Employee> {
  //   return this.http.put<Employee>(`$this.apiUrl)/${employee.id}`, employee);
  // }

  updateEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee, { headers })
      .pipe(
        tap(() => console.log('updateEmployee: ' + employee.id)),
        // Return the employee on an update
        map(() => employee),
        catchError(this.handleError)
      );
  }

  deleteEmployee(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Employee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteEmployee: ' + id)),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
