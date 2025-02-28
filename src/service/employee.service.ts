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

  

  // deleteEmployee(id:number): Observable<void>{
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

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
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
