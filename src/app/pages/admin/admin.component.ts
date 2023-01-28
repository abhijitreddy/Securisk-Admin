import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public selectedNav = 'About Us';
  public user: any;

  constructor(private auth: AngularFireAuth, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.auth.authState.subscribe((user) => {
      this.spinner.hide();
      if (user) {
        this.user = user;
        console.log(this.user);
      } else {
        this.auth.signOut().then(res => {
          this.router.navigate(['/login']);
        })
      }
    })
  }
  
  logout() {
    this.spinner.show();
    this.auth.signOut().then(res => {this.spinner.hide()}).catch(err => this.spinner.hide())
  }

  onNavChange(nav: string) {
    this.selectedNav = nav;
  }
}
