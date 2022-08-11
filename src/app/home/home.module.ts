import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './comments/comments.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostComponent } from './post-card/post-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostDetailsComponent } from './post-details/post-details.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserDetailsComponent } from './post-details/user-details/user-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    CommentsComponent,
    PostComponent,
    PostDetailsComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
    HomeRoutingModule,
    MatButtonToggleModule
  ],
})
export class HomeModule { }
