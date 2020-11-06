import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../core/services/employee.service';
import { EmployeeData } from '../core/interfaces/employee-data';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeData?: EmployeeData[];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeData().subscribe(data => {
      console.log(data);
      this.employeeData = data.data;
      console.log(this.employeeData);

    });
  }

}
