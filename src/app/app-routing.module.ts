import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./core/components/error/error.component";
import { PostResolver } from "./core/resolvers/post-resolver.service";
import { HomeComponent } from "./home/home.component";
import { PostDetailsComponent } from "./home/post-details/post-details.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'post/:id',
        component: PostDetailsComponent,
        resolve: { currentPost: PostResolver }
    },
    {
        path: 'add',
        loadChildren: () => import('./add-edit-post/add-edit-post.module').then(m => m.AddEditPostModule)
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./add-edit-post/add-edit-post.module').then(m => m.AddEditPostModule),
        resolve: { currentPost: PostResolver }
    },
    {
        path: '404',
        component: ErrorComponent,
    },
    {
        path: '**',
        redirectTo: '/404',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
