import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditPostComponent } from './add-edit-post.component';
import { AddEditPostRoutingModule } from './add-edit-post-routing-module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddEditPostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AddEditPostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    SharedModule
  ],
  exports: [AddEditPostComponent],
})
export class AddEditPostModule { }
