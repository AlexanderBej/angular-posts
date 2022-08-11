import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { CommentService } from './services/comment.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostToastComponent } from './components/post-toast/post-toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';
import { ToastService } from './services/toast.service';
import { StorageService } from './services/storage.service';
import { MergeListsService } from './utils/merge-lists.service';
import { ToastMessageService } from './utils/toast-message.service';
import { ErrorComponent } from './components/error/error.component';
import { RouterModule } from '@angular/router';
import { PostResolver } from './resolvers/post-resolver.service';



@NgModule({
  declarations: [
    NavbarComponent,
    PostToastComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  providers: [
    StorageService,
    ToastService,
    PostService,
    CommentService,
    UserService,
    MergeListsService,
    ToastMessageService,
    PostResolver
  ],
  exports: [
    NavbarComponent,
    PostToastComponent,
    ErrorComponent
  ],
  
})
export class CoreModule extends EnsureModuleLoadedOnceGuard { // Ensure that CoreModule is only loaded into AppModule
   // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
   constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
 }
