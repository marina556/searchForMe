import { EmployeeJobStatuses } from './employee-job-statuses';
import { Position } from './position';
import { Department } from './department';

export interface EmployeeData {
  id: string;
  fullName_FL: string;
  fullName_SL: string;
  hiringDate: string;
  firstContractingSalary: string;
  position: Position;
  department: Department;
  employeeJobStatuses: EmployeeJobStatuses;
}
