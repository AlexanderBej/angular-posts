import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { ConfirmPopUpComponent } from './components/confirm-pop-up/confirm-pop-up.component';
import { MatDividerModule } from '@angular/material/divider';
import { FilterSearchPipe } from './pipes/filter-search.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    InitialsPipe,
    FilterSearchPipe,
    ConfirmPopUpComponent,
    SpinnerComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  exports: [
    InitialsPipe,
    FilterSearchPipe,
    SpinnerComponent
  ]
})
export class SharedModule { }
