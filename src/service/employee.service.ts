import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  addEmployee(employee:Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`$this.apiUrl)/${employee.id}`, employee);
  }

  deleteEmployee(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
