import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/core/services/comment.service';
import { MergeListsService } from 'src/app/core/utils/merge-lists.service';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmPopUpComponent } from 'src/app/shared/components/confirm-pop-up/confirm-pop-up.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/interfaces/user-object.interface';
import { ToastMessageService } from 'src/app/core/utils/toast-message.service';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  public postID = -1;
  public post: Post = new Post();
  public user: User | undefined;
  public comments: any[] = [];

  private confirmModalOptions: NgbModalOptions = {
    size: 'dialog-centered',
    ariaLabelledBy: 'confim-modal',
    modalDialogClass: 'confim-modal'
  };

  private userModalOptions: NgbModalOptions = {
    size: 'dialog-centered',
    ariaLabelledBy: 'user-modal',
    modalDialogClass: 'user-modal'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostService,
    private commentsService: CommentService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private mergeService: MergeListsService,
    private toastMessage: ToastMessageService,
    private location: Location
  ) {
    activatedRoute.data.pipe(takeUntil(this.onDestroy)).subscribe((response: any) => {
      this.post = response.currentPost;
      this.postID = this.post.id;
    })
  }

  ngOnInit(): void {
    if (this.post.userId) {
      this.userService.getUser(this.post.userId).pipe(takeUntil(this.onDestroy)).subscribe(user => {
        this.user = user;
      })
    }

    this.commentsService.getCommentsForPost(this.postID).pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.comments = this.mergeService.mergePostCommentList(data, this.postID);
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
}

  public editPost(): void {
    this.router.navigate(['edit/' + this.post.id]);
  }

  public removePost(): void {
    const message = 'Are you sure you want to remove this post?';
    const modal = this.modalService.open(ConfirmPopUpComponent, this.confirmModalOptions);
    modal.componentInstance.message = message;

    modal.result.then((result: boolean) => {
      if (result) {
        this.removePostFromLists();
      }
    })
  }


  /**
   * sends an API call to remove the post based on the id
   * adds the id in the removedPostIds list in session storage
   */
  private removePostFromLists(): void {
    this.postsService.removePost(this.postID).pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.mergeService.addToRemovedPostsList(this.postID);
      this.toastMessage.showSuccess("Post removed successfully");
      this.goBack();
    });
  }

  public openUserDetailsModal(): void {
    const modal = this.modalService.open(UserDetailsComponent, this.userModalOptions);
    modal.componentInstance.user = this.user;
  }

  public goBack(): void {
    this.location.back()
  }
}
