import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../interfaces/user-object.interface";
import { ToastMessageService } from "../utils/toast-message.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private toastMessage: ToastMessageService) { }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + userId).pipe(catchError(this.formatErrors));
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(catchError(this.formatErrors));
  }


  private formatErrors(error: any) {
    this.toastMessage.showError('Something went wrong!');
    this.toastMessage.showError(error.error);
    return throwError(error.error);
  }
}
