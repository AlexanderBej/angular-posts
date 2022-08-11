import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../core/models/post.model';
import { MergeListsService } from '../core/utils/merge-lists.service';
import { PostService } from '../core/services/post.service';
import { UserService } from '../core/services/user.service';
import { ToastMessageService } from '../core/utils/toast-message.service';
import { User } from '../core/interfaces/user-object.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  public userList: User[] = [];
  public postID: number | undefined;
  public post: Post = new Post();
  public loadingData = true;

  public postForm: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    user: new UntypedFormControl('', Validators.required),
    body: new UntypedFormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private location: Location,
    private mergeService: MergeListsService,
    private toastMessage: ToastMessageService
  ) {
    if (router.url !== '/add') {
      activatedRoute.data.pipe(takeUntil(this.onDestroy)).subscribe((response: any) => {
        this.post = response.currentPost;
        this.postID = this.post.id;
      });
    }
  }

  ngOnInit(): void {
    this.userService.getAllUsers().pipe(takeUntil(this.onDestroy)).subscribe(users => {
      this.userList = users
      this.populatePostFields();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
  }

  public get titleInput(): AbstractControl | null {
    return this.postForm.get('title');
  }

  public get userInput(): AbstractControl | null {
    return this.postForm.get('user')
  }

  public get bodyInput(): AbstractControl | null {
    return this.postForm.get('body');
  }


  private populatePostFields(): void {
    this.titleInput?.setValue(this.post.title);
    const selectedUser = this.userList.find(user => {
      return user.id == this.post.userId;
    })
    this.userInput?.setValue(selectedUser);
    this.bodyInput?.setValue(this.post.body);
    this.loadingData = false;
  }

  /**
   * The existance of postID means this is edit mode
   * in which case the post is updated
   * else the post is updated
   */
  public save(): void {
    // check form for invalid fields
    if (this.postForm.invalid) {
      this.toastMessage.showError('Some of the post fields are invalid!')
      return
    }

    this.post.title = this.titleInput?.value;
    this.post.userId = this.userInput?.value.id;
    this.post.body = this.bodyInput?.value;

    if (this.postID === undefined) {
      this.saveNewPost();
    } else {
      this.updateExistingPost();
    }
  }

  private saveNewPost(): void {
    this.postService.addPost(this.post).pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
      this.mergeService.saveNewPostToStorage(data);
      this.toastMessage.showSuccess('Post saved successfully');
      this.goBack();
    });
  }

  private updateExistingPost(): void {
    this.postService.updatePost(this.post).pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
      this.mergeService.saveEditedPostToStorage(data);
      this.toastMessage.showSuccess('Post updated successfully');
      this.goBack();
    });
  }

  public goBack(): void {
    this.location.back();
  }



}
