import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from 'src/employee-list/employee-list.component';
import { EmployeeFormComponent } from 'src/employee-form/employee-form.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { employeeReducer } from 'src/Store/reducers/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from 'src/Store/effects/employee.effects';
import { MatTableModule } from '@angular/material/table';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


// export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function (state, action) {
//     console.log('previous state', state);
//     console.log('action', action);
//     let nextState = reducer(state, action);
//     console.log('current state', nextState);
//     return nextState;
//   };
// }

// export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    StoreModule.forRoot({employees:employeeReducer}),
    EffectsModule.forRoot([EmployeeEffects]),
    StoreDevtoolsModule.instrument({
      name:'Employee App DevTools',
      maxAge:25      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
