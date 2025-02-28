import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, tap } from 'rxjs';
import { Employee } from 'src/models/employee.model';
import { getCurrentEmployee, State } from 'src/Store/selector/employees.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from 'src/service/storage.service';
import { loadIdFromStorage } from 'src/Store/actions/employee.actions';
import * as EmployeeActions from '../Store/actions/employee.actions';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  pageTitle = 'Employee Details';

  employeeForm!: FormGroup;

  employee$: Observable<Employee | null | undefined> | undefined;

  id: string | null = null;
  eid$: Observable<number | null>;
  myEmployee: Employee | null | undefined;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  //private validationMessages!: { [key: string]: { [key: string]: string; }; };
  //private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<State>,
    private storageService: StorageService,
    private router: Router
  ) {
    this.eid$ = this.store.select(state => state.employee.currentEmployeeId);
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log("ID in Form page:" + this.id);
    let savedId = null;
    if(this.id !== "0" && this.id !==null){
       savedId = this.storageService.save('id',this.id);
    }
    

    if (savedId!=null && savedId!==0) {
      this.store.dispatch(EmployeeActions.saveIdToStorage({ id: savedId }));
    }

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });


    this.employee$ = this.store.select(getCurrentEmployee);
    this.employee$.subscribe
      (obj => {
        this.displayEmployee(obj as Employee);
        this.myEmployee = obj
      });

     this.reloadEmployee();
     
  }

  reloadEmployee():void{
    this.store.select(getCurrentEmployee);
  }

  displayEmployee(employee: Employee): void {

    console.log("Dispatching Id from store: " +this.store.dispatch(loadIdFromStorage()))

    if (employee) {
      // Reset the form back to pristine
      this.employeeForm.reset();

      // Update the data on the form
      this.employeeForm.patchValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        department: employee.department,
        email: employee.email,
        country: employee.country
      });
    }
  }
  cancelEdit(employee: Employee):void{
     // Redisplay the currently selected employee
    // replacing any edits made
    this.displayEmployee(employee);
  }

  deleteEmployee(employee: Employee): void{
    if (employee && employee.id) {
      if (confirm(`Are you sure you want to delete employee: ${employee.firstName + ' ' + employee.lastName}?`)) {
        this.store.dispatch(EmployeeActions.deleteEmployee({ id: employee.id }));
      }
    }
    else {
      // No need to delete, it was never saved
      this.store.dispatch(EmployeeActions.clearCurrentEmployee());
    }
  }
  backToListing():void{
    this.router.navigate(['/list']);
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.employeeForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const employee = { ...this.myEmployee, ...this.employeeForm.value };

        debugger
        if (employee.id === 0) {
          this.store.dispatch(EmployeeActions.createEmployee({ employee }));
        } else {
          this.store.dispatch(EmployeeActions.updateEmployee({ employee }));
        }
      }
    }
  }

}
