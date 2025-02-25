import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, tap } from 'rxjs';
import { Employee } from 'src/models/employee.model';
import { getCurrentEmployee, State } from 'src/Store/selector/employees.selector';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  pageTitle = 'Employee Edit';

  employeeForm!: FormGroup;

  employee$: Observable<Employee | null | undefined> | undefined;

  //const employeeObservable: Observable<Employee | null | undefined> = getEmployeeObservable();


  id: string | null = null;


  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  //private validationMessages!: { [key: string]: { [key: string]: string; }; };
  //private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    console.log("ID in Form page:" + this.id);


    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });

    // Watch for changes to the currently selected employee
    // this.employee$ = this.store.select(getCurrentEmployee)
    //  .pipe(
    //    tap(currentEmployee => this.displayEmployee(currentEmployee))
    //  );

    this.employee$ = this.store.select(getCurrentEmployee);
    this.employee$.subscribe
      (obj => this.displayEmployee(obj as Employee)
      );


  }

  displayEmployee(employee: Employee): void {

    if (employee) {
      // Reset the form back to pristine
      this.employeeForm.reset();

      // Display the appropriate page title
      if (employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${employee.firstname + ' ' + employee.lastname}`;
      }

      // Update the data on the form
      this.employeeForm.patchValue({
        firstname: employee.firstname,
        lastName: employee.lastname,
        department: employee.department,
        email: employee.email,
        country: employee.country
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form submitted:', this.employeeForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }

}
