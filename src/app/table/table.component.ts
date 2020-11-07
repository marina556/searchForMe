import { Component, OnInit } from '@angular/core';
import { EmployeeData } from '../core/classes/employee-data';
import { EmployeeService } from '../core/services/employee.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';

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
  employeeShow = 10;
  export = faDownload;
  faFolderPlus = faPlus;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeData().subscribe(data => {
      this.employeesLen = data.data?.employees.length;
      this.employeeData = data.data?.employees;
      this.returnedArray = this.employeeData?.slice(0, this.employeeShow);
      this.pages = 500 / this.employeeShow;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    // const startItem = (event.page - 1) * this.employeeShow;
    const startItem = (event.page - 1) * event.itemsPerPage;
    // const endItem = event.page * this.employeeShow;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.employeeData?.slice(startItem, endItem);
    console.log(event.itemsPerPage);
    console.log(event.page);
    console.log(this.employeeShow);
    this.currentPage = event.page;
  }


  // tslint:disable-next-line:no-any
  selectChangeHandler(event: any): void {
    this.employeeShow = event.target.value;
    this.returnedArray = this.employeeData?.slice(0, this.employeeShow);
    this.pages = 500 / this.employeeShow;
  }
}
