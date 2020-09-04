import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.initSigninForm();
  }

  // initialisation de l'instance pour reactive form

  initSigninForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // onSubmitSigninForm() {
  //   // console.log(this.signinForm.value);
  //   const email = this.signinForm.get('email').value;
  //   const password = this.signinForm.get('password').value;
  //   this.authenticationService.signiUpUser(email, password).then(
  //     () => {
  //       console.log('OKEY)');
  //     }
  //   ).catch(
  //     (error) => {
  //       console.log();
  //     }
  //   );
  // }

  onSubmitSigninForm() {
    // console.log(this.signinForm.value);
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authenticationService.signInUser(email, password).then(
      (data) => {
        console.log(data);
        this.router.navigate(['/admin', 'dashboard']);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}

