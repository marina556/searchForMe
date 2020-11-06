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
  employeesLen?: number;
  returnedArray?: EmployeeData[] | undefined;
  pages?: number;
  currentPage = 1;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeData().subscribe(data => {
      this.employeesLen = data.data?.employees.length;
      this.employeeData = data.data?.employees;
      this.returnedArray = this.employeeData?.slice(0, 10);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.employeeData?.slice(startItem, endItem);
    console.log(event.page);
    this.currentPage = event.page;
  }

  numPages(event: number): void {
    this.pages = event;
  }
}
