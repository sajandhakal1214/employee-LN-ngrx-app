import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, tap } from 'rxjs';
import { Employee } from 'src/models/employee.model';
import { getCurrentEmployee, State } from 'src/Store/selector/employees.selector';
import { ActivatedRoute } from '@angular/router';
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
    private storageService: StorageService
  ) {
    this.eid$ = this.store.select(state => state.employee.currentEmployeeId);
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    console.log("ID in Form page:" + this.id);

    const savedId = this.storageService.load<string>('id');

    if (savedId) {
      this.store.dispatch(EmployeeActions.saveIdToStorage({ id: savedId }));
    }

    // if (this.id !== null) {
    //   this.store.dispatch(EmployeeActions.saveIdToStorage({ id: Number(this.id) }));
    // }




    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
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

  }

  displayEmployee(employee: Employee): void {

    console.log(this.store.dispatch(loadIdFromStorage()))

    if (employee) {
      // Reset the form back to pristine
      this.employeeForm.reset();

      // if (employee.id === null) {
      //   this.store.dispatch(loadIdFromStorage());

      // }


      // Update the data on the form
      this.employeeForm.patchValue({
        firstName: employee.firstName,
        lastname: employee.lastname,
        department: employee.department,
        email: employee.email,
        country: employee.country
      });
    }
  }

  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     console.log('Form submitted:', this.employeeForm.value);
  //   } else {
  //     console.log('Form is invalid!');
  //   }
  // }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.employeeForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const employee = { ...this.myEmployee, ...this.employeeForm.value };

        debugger
        if (employee.id === 0) {
          this.store.dispatch(EmployeeActions.addEmployee({ employee }));
        } else {
          this.store.dispatch(EmployeeActions.updateEmployee({ employee }));
        }
      }
    }
  }

}
