import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../classes/employee';
import { FormGroup } from '@angular/forms';
import { EmployeeData } from '../classes/employee-data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeData?: EmployeeData[];
  filterBySalary?: EmployeeData[];

  constructor(private httpClient: HttpClient) {
  }

  getEmployeeData(): Observable<Employee> {
    return this.httpClient.get<Employee>('assets/Employees.json');
  }

  handleSubmit(filterForm: FormGroup): void {
    if (filterForm.value.searchBy === 'name') {
      console.log(filterForm.value.searchBy);
    } else if (filterForm.value.searchBy === 'salary') {
      if (filterForm.value.searchRange === 'Between') {
        // @ts-ignore
        this.filterBySalary = this.employeeData.filter((user) => {
          // @ts-ignore
          if (filterForm.value.minRange !== null && filterForm.value.maxRange !== null) {
            // @ts-ignore
            return user.firstContractingSalary < filterForm.value.maxRange && user.firstContractingSalary > filterForm.value.minRange;
          }
        });
      } else if (filterForm.value.searchRange === 'before') {
        // @ts-ignore
        this.filterBySalary = this.employeeData.filter((user) => {
          // @ts-ignore
          if (filterForm.value.minRange === 0 && filterForm.value.maxRange > 0) {
            // @ts-ignore
            return user.firstContractingSalary < filterForm.value.maxRange && user.firstContractingSalary > 0;
          }
        });
      } else {
        // @ts-ignore
        this.filterBySalary = this.employeeData.filter((user) => {
          // @ts-ignore
          return filterForm.value.minRange > 0 && filterForm.value.maxRange === 0;
        });
      }
      {

      }


      console.log('this.filterBySalary', this.filterBySalary);
      console.log(filterForm.value.searchBy);
    }
    console.log(filterForm.value);
  }
}
