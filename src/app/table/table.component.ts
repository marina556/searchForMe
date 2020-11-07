import { Component, OnInit } from '@angular/core';
import { EmployeeData } from '../core/classes/employee-data';
import { EmployeeService } from '../core/services/employee.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { faAngleDown, faAngleUp, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  employeeData?: EmployeeData[];
  employeesLen?: number;
  public returnedArray?: EmployeeData[] | undefined;
  pages?: number;
  currentPage = 1;
  employeeShow = 10;
  export = faDownload;
  faFolderPlus = faPlus;
  faArrowDown = faAngleDown;
  faAngleUp = faAngleUp;
  sortDown = true;
  names: string[] | undefined;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeData().subscribe(data => {
      this.employeesLen = data.data?.employees.length;
      this.employeeData = data.data?.employees;
      this.returnedArray = this.employeeData?.slice(0, this.employeeShow);
      this.pages = 500 / this.employeeShow;
      this.employeeService.employeeData = this.employeeData;
      console.log(this.employeeData);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
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

  sortByName(): void {
    this.sortDown = !this.sortDown;
    if (this.sortDown) {
      // @ts-ignore
      this.employeeData.sort((u1, u2) => {
        // @ts-ignore
        if (u1.fullName_FL > u2.fullName_FL) {
          return 1;
        }
        // @ts-ignore
        if (u1.fullName_FL < u2.fullName_FL) {
          return -1;
        }
        return 0;
      });
    } else {
      // @ts-ignore
      this.employeeData.sort((u1, u2) => {
        // @ts-ignore
        if (u1.fullName_FL < u2.fullName_FL) {
          return 1;
        }
        // @ts-ignore
        if (u1.fullName_FL > u2.fullName_FL) {
          return -1;
        }
        return 0;
      });
    }
    this.returnedArray = this.employeeData?.slice(0, this.employeeShow);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.returnedArray = this.employeeService.filterBySalary?.slice(0, this.employeeShow);

      // this.animal = result;
    });
  }


}
