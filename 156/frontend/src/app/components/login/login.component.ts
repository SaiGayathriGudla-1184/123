import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  showLogin = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  toggleForms() {
    this.showLogin = !this.showLogin;
    this.errorMessage = '';
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.errorMessage = err.error.message || 'Login failed'
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    const { email, password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.authService.signup(email, password).subscribe({
      next: () => {
        this.errorMessage = 'Sign up successful! Please log in.';
        this.toggleForms();
      },
      error: err => this.errorMessage = err.error.message || 'Sign up failed'
    });
  }
}
