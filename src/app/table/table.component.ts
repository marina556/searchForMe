import { Component, OnInit } from '@angular/core';
import { EmployeeData } from '../core/classes/employee-data';
import { EmployeeService } from '../core/services/employee.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  employeeData?: EmployeeData[];
  currentPage = 1;
  employees?: number;
  // contentArray = new Array(90).fill('');
  returnedArray?: EmployeeData[];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeData().subscribe(data => {
      this.employees = data.data?.employees.length;
      console.log(data.data?.employees);
      this.employeeData = data.data?.employees;
      // @ts-ignore
      console.log(this.employeeData[0].department.name_FL);
      console.log(this.employees);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.employeeData?.slice(startItem, endItem);
  }
}
