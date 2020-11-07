import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { EmployeeService } from '../core/services/employee.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm = new FormGroup({
    searchBy: new FormControl('salary'),
    name: new FormControl(''),
    searchRange: new FormControl('Between'),
    minRange: new FormControl(0),
    maxRange: new FormControl(0),
  });

  // constructor() { }

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    private employeeService: EmployeeService
    // private tableComponent: TableComponent
    ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    this.employeeService.handleSubmit(this.filterForm);
    this.onNoClick();
  }
}
