import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../classes/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

  getEmployeeData(): Observable<Employee> {
    return this.httpClient.get<Employee>('assets/Employees.json');
}
}
