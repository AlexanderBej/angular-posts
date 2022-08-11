import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostComponent {

  @Input() post: Post | undefined;

  constructor(private router: Router) { }

  public openPostDetails(): void {
    this.router.navigate(['post/' + this.post?.id]);
  }
}
