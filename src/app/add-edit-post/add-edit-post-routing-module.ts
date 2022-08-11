import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditPostComponent } from "./add-edit-post.component";

const routes: Routes = [
    { path: '', component: AddEditPostComponent },
    { path: 'add', component: AddEditPostComponent },
    { path: 'edit/:id', component: AddEditPostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddEditPostRoutingModule { }
