import { Component } from '@angular/core';
import {FormBuilder,FormGroup,FormsModule,Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  isLogin: boolean = true;
  showForgotPassword = false;
  showSignForm: boolean = false;
  showLoginForm: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.showLoginForm = true;
    this.logInForm();
    this.createSignupForm();
    this.ReserPassword();
  }
  logInForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  ReserPassword() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
    });
  }
  createSignupForm() {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(100)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        mobile: ['', [Validators.pattern('^[0-9]*$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        terms: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  signup() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  resetPass() {
    alert('Mail Sent Successfully');
    this.showForgotPassword = false;
    this.showLoginForm = true;
  }
  closeForgotPasswords() {
    this.showForgotPassword = false;
    this.showLoginForm = true;
  }

  login() {
    if (this.loginForm.valid) {
      return;
    } else {
      alert('Login SuccessFull');
    }
  }

  openForgotPassword() {
    this.showForgotPassword = true;
    this.showLoginForm = false;
  }

  closeForgotPassword() {
    this.showForgotPassword = false;
  }

  onLoginClick() {
    this.loginForm.reset();
    alert('Login Successfull');
    
  }

  signupClick() {
    this.showLoginForm = false;
    this.showSignForm = true;
  }

  onRegissterClick() {
    this.showLoginForm = true;
    this.showSignForm = false;
  }

  resetPassword() {
    if (this.forgotPasswordForm.valid) {
      console.log('Reset password success');
      setTimeout(() => this.closeForgotPassword(), 5000);
    } else {
      console.error('Reset password failed');
    }
  }

  redirectToLogin() {
    this.showLogin();
  }

  showLogin() {
    this.isLogin = true;
  }

  showSignup() {
    this.isLogin = false;
  }
}
