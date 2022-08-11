import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public getCommentsForPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('https://jsonplaceholder.typicode.com/comments?postId=' + postId).pipe(catchError(this.formatErrors));
  }

  public addComment(comment: Comment): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/comments', comment).pipe(catchError(this.formatErrors));
  }

  public updateComment(comment: Comment): Observable<any> {
    const updateCommentURL = 'https://jsonplaceholder.typicode.com/comments/' + comment.id;
    return this.http.put(updateCommentURL, comment).pipe(catchError(this.formatErrors));
  }

  public removeComment(commentID: number): Observable<Comment> {
    const removeCommentURL = 'https://jsonplaceholder.typicode.com/comments/' + commentID;
    return this.http.delete<Comment>(removeCommentURL).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    const errorMessage = 'Error!\nSomething went wrong!\n' + error.error
    window.alert(errorMessage)
    return throwError(error.error);
  }
}
