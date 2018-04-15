import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../core/services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'nov-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl  = new FormControl('', [Validators.required, Validators.minLength(5)]);

  matcher = new MyErrorStateMatcher();

  constructor(public authService: AuthService) { }

  getErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
        this.emailFormControl.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.isLogin){
      this.authService.emailLogin(this.emailFormControl.value, this.passwordFormControl.value);
    } else {
      this.authService.emailSignUp(this.emailFormControl.value, this.passwordFormControl.value);
    }
  }

}
