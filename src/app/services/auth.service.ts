import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObservable = new BehaviorSubject(null);
  public user$ = this.userObservable.asObservable();

  constructor() { }

  setUser(user) {
    this.userObservable.next(user);
  }
}
