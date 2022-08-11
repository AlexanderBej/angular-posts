import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(catchError(this.formatErrors));
  }

  public getPostByID(postID: number): Observable<Post> {
    return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/' + postID).pipe(catchError(this.formatErrors));
  }

  public addPost(post: Post): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', post).pipe(catchError(this.formatErrors));
  }

  public updatePost(post: Post): Observable<any> {
    const updatePostURL = 'https://jsonplaceholder.typicode.com/posts/' + post.id;
    return this.http.put(updatePostURL, post).pipe(catchError(this.formatErrors));
  }

  public removePost(postID: number): Observable<Post> {
    const removePostURL = 'https://jsonplaceholder.typicode.com/posts/' + postID;
    return this.http.delete<Post>(removePostURL).pipe(catchError(this.formatErrors));
  }


  private formatErrors(error: any) {
    const errorMessage = 'Error!\nSomething went wrong!\n' + error.error
    window.alert(errorMessage)
    return throwError(error.error);
  }
}
