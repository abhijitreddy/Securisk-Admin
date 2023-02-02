import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public isLogin: boolean = true;
  public showPassword: boolean = false;
  public showCfmPassword: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private auth: AngularFireAuth, 
    private afs: AngularFirestore, 
    private authService: AuthService, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { 
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
      user_type: new FormControl('', [Validators.required])
    }, { 
      validator: this.confirmedValidator('password', 'confirm_password')
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.auth.authState.subscribe((user) => {
      this.spinner.hide();
      if (user) {
        this.authService.setUser(user);
        this.router.navigate(['/admin']);
      }
    })
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) return;

      if (control.value !== matchingControl.value) matchingControl.setErrors({ confirmedValidator: true });
      else matchingControl.setErrors(null);
    }
  }

  login() {
    for (let i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsTouched();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this.spinner.show();
      this.auth
        .signInWithEmailAndPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .then((user) => {
          this.spinner.hide();
        })
        .catch((err) => {
          this.spinner.hide();
          this.toastr.error(err.message, 'Error');
          console.log(err.message);
        });
    }
  }

  register() {
    for (let i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsTouched();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    if (this.registerForm.valid) {
      this.spinner.show();
      this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password).then((user) => {
        let reqData = {
          email: this.registerForm.value.email,
          user_id: user.user?.uid,
          user_type: this.registerForm.value.user_type
        };
        this.afs.collection('users').add(reqData).then(res => {
          this.auth.signInWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password).then(res => {this.spinner.hide();}).catch(err => {
            console.log(err.message);
            this.spinner.hide();
          })
        }).catch(err => {
          console.log(err.message);
          this.toastr.error(err.message, 'Error');
          this.spinner.hide();
        });
      }).catch(err => {
        console.log(err.message);
        this.toastr.error(err.message, 'Error');
        this.spinner.hide();
      });
    }
  }
}
