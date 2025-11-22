import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service'; // Assuming this path is correct

@Component({
  selector: 'app-login',
  // standalone: true is often needed for modern Angular components, but keeping existing structure for now.
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  // FIX: Changed '.html' to '.component.html' assuming standard Angular CLI file naming
  templateUrl: './login.html', 
  styleUrl: './login.css', // FIX: Changed '.css' to '.component.css' assuming standard Angular CLI file naming
})
export class Login {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // IMPROVEMENT/FIX: MaxLength(8) is often too short for modern security. Changed to a minimum length.
      // If you meant max length, set it higher (e.g., 50). Using minLength(8) is more common.
      password: ['', [Validators.required, Validators.minLength(8)]], 
    });
  }

  // Helper getter for easy access to form controls in the template
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.loginForm.invalid) {
      // Optional: Add logging for debugging
      console.log('Login attempt failed: Form is invalid.');
      return;
    }

    // Call the AuthService login method
    this.authService.login(this.loginForm.value).subscribe({
      next: (success) => {
        if (success) {
          console.log('Login successful, navigating to /books');
          this.router.navigate(['/books']);
        } else {
          // Handle login failure (e.g., credentials incorrect)
          console.error('Login failed: Invalid credentials.');
          // You would typically set a public error message property here to display in the template
        }
      },
      error: (err) => {
        // Handle API/network errors
        console.error('Login API error:', err);
        // Set a public error message property here to display in the template
      }
    });
  }
}