import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../core/models/post.model';
import { MergeListsService } from '../core/utils/merge-lists.service';
import { PostService } from '../core/services/post.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  public allPosts: Post[] = [];
  public postsLoaded = false

  public searchText = '';
  public criteria = 'id';
  public order = 'asc';

  public page = 1;
  public total = 0;

  constructor(
    private service: PostService,
    private router: Router,
    private mergeService: MergeListsService
  ) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()
  }

  /**
   * gets all posts from the API call and merges them with the data
   * from the session storage
   */
  private getAllPosts() {
    this.service.getAllPosts().pipe(takeUntil(this.onDestroy)).subscribe(data => {
      const mergedPostList = this.mergeService.mergePostList(data)
      this.allPosts = mergedPostList.sort((a: Post, b: Post) => a.id - b.id);
      this.postsLoaded = true;
    })
  }

  public addNewPost(): void {
    this.router.navigate(['add']);
  }


  public onSortCriteriaChange(value: string): void {
    this.criteria = value;
    this.sortPosts();
  }

  public onSortOrderChange(value: string): void {
    this.order = value;
    this.sortPosts();
  }


  private sortPosts(): void {
    switch (this.criteria) {
      case 'id':
        switch (this.order) {
          case 'asc':
            this.allPosts = this.allPosts.sort((a: Post, b: Post) => a.id - b.id);
            break;
          case 'desc':
            this.allPosts = this.allPosts.sort((a: Post, b: Post) => b.id - a.id);
            break;
        }
        break;
      case 'title':
        switch (this.order) {
          case 'asc':
            this.allPosts = this.allPosts.sort((a: Post, b: Post) => (b.title > a.title ? -1 : 1));
            break;
          case 'desc':
            this.allPosts = this.allPosts.sort((a: Post, b: Post) => (a.title > b.title ? -1 : 1));
            break;
        }
        break;
    }
  }

}
