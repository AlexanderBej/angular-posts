import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.model';
import { CommentService } from 'src/app/core/services/comment.service';
import { MergeListsService } from 'src/app/core/utils/merge-lists.service';
import { ToastMessageService } from 'src/app/core/utils/toast-message.service';
import { ConfirmPopUpComponent } from 'src/app/shared/components/confirm-pop-up/confirm-pop-up.component';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  @Input() comments: Comment[] = [];
  @Input() postID = 0;
  public isAddCommentBoxOpen = false;

  private selectedCommentToEdit: Comment | undefined;

  public commentForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    name: new UntypedFormControl('', Validators.required),
    body: new UntypedFormControl('', Validators.required)
  });

  private confirmModalOptions: NgbModalOptions = {
    size: 'dialog-centered',
    ariaLabelledBy: 'confim-modal',
    modalDialogClass: 'confim-modal'
  };

  constructor(
    private modalService: NgbModal,
    private commentService: CommentService,
    private mergeService: MergeListsService,
    private toastMessage: ToastMessageService
  ) { }

  ngOnInit(): void {
    this.comments = this.mergeService.mergePostCommentList(this.comments, this.postID)
      .sort(((a: Comment, b: Comment) => b.id - a.id));
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
  }

  public get emailInput(): AbstractControl | null {
    return this.commentForm.get('email');
  }

  public get nameInput(): AbstractControl | null {
    return this.commentForm.get('name');
  }

  public get bodyInput(): AbstractControl | null {
    return this.commentForm.get('body');
  }

  /**
   * 
   * @param commentToUpdate the comment selected to be edited
   * opens the edit container and populates the form fields
   */
  public sendCommToEdit(commentToUpdate: Comment): void {
    this.selectedCommentToEdit = commentToUpdate
    const index = this.comments.indexOf(commentToUpdate);
    this.comments.splice(index, 1);
    this.isAddCommentBoxOpen = true;
    this.populateCommentFields(commentToUpdate);
  }

  private populateCommentFields(commentToUpdate: Comment): void {
    this.emailInput?.setValue(commentToUpdate.email);
    this.nameInput?.setValue(commentToUpdate.name);
    this.bodyInput?.setValue(commentToUpdate.body);
  }

  public removeComment(commentToRemove: Comment): void {
    const message = 'Are you sure you want to remove this comment?';
    const modal = this.modalService.open(ConfirmPopUpComponent, this.confirmModalOptions);
    modal.componentInstance.message = message;

    modal.result.then((result: boolean) => {
      if (result) {
        this.removeCommentFromLists(commentToRemove);
      }
    })
  }

  /**
   * 
   * @param commentToRemove the comment selected to be removed
   * 
   * sends a call to the server to remove the selected comment based on the id
   * adds the id in the removedCommentIds list in session storage
   * removes the comment object from the comments array so the update is visible
   */
  private removeCommentFromLists(commentToRemove: Comment): void {
    if (commentToRemove.id) {
      this.commentService.removeComment(commentToRemove.id).pipe(takeUntil(this.onDestroy)).subscribe(data => {
        if (data) {
          const index = this.comments.indexOf(commentToRemove);
          this.comments.splice(index, 1);
          if (commentToRemove.id) {
            this.mergeService.addToRemovedCommentsList(commentToRemove.id);
          }
          this.toastMessage.showSuccess("Comment removed successfully");
        }
      });
    }
  }

  public saveComment(): void {
    // check form for invalid fields
    if (this.commentForm.invalid) {
      this.toastMessage.showError('Some of the comment fields are invalid!')
      return
    }

    const commentToSave: Comment = new Comment()
    commentToSave.name = this.nameInput?.value
    commentToSave.email = this.emailInput?.value
    commentToSave.body = this.bodyInput?.value
    commentToSave.postId = this.postID

    if (this.selectedCommentToEdit === undefined) {
      this.addCommentToLists(commentToSave);
    } else {
      commentToSave.id = this.selectedCommentToEdit.id;
      this.updateCommentInLists(commentToSave);
    }
  }

  /**
   * 
   * @param commentToSave the added comment
   * 
   * sends an API call to save the comment
   * adds the comment to the session storage
   * adds the comment to the comments array so the update is visible
   */
  private addCommentToLists(commentToSave: Comment): void {
    this.commentService.addComment(commentToSave).pipe(takeUntil(this.onDestroy)).subscribe((comm: any) => {
      this.comments.push(comm);
      this.comments = this.comments.sort(((a: Comment, b: Comment) => b.id - a.id));
      this.mergeService.saveNewCommentToStorage(comm);
      this.toastMessage.showSuccess("Comment saved successfully");
      this.cancelAddComment();
    });
  }


  /**
   * 
   * @param commentToSave the edited comment
   * 
   * sends an API call to update the comment details
   * adds the comment to the session storage
   */
  private updateCommentInLists(commentToSave: Comment): void {
    this.commentService.updateComment(commentToSave).pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
      this.comments = this.comments.sort(((a: Comment, b: Comment) => b.id - a.id));
      this.mergeService.saveEditedCommentToStorage(data);
      this.toastMessage.showSuccess("Comment updated successfully");
      this.cancelAddComment();
    });
  }


  /**
   * resets the comment form
   * closes the add comment box
   */
  cancelAddComment(): void {
    this.commentForm.reset();
    this.isAddCommentBoxOpen = false;
  }

}
