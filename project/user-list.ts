import { Component } from '@angular/core';
import {  UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userForm: FormGroup;
     users: any[] = [];
     userList: any[] = [];
      nextId: string[] = [];
      id!: number;

     
  ngOnInit(): void {
    this.userService.getUsers().subscribe((user: any) => {
      this.users = user
    })
  }

  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required])
    })
  }
  
  addUser() {
  if(this.userForm.valid) {
    const newUser: any = {
      id: this.nextId.length+1,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role
    }
    this.userList.push(newUser);
  
    if(this.id) {
      this.userService.updateUser(+this.id, newUser).subscribe((user: any) => {
        console.log(user)
      })
    } else {
      this.userService.createUser(newUser).subscribe((user: any) => {
        console.log(user)
    })
  } 

  
} else {
  console.log('Please fill all fields')
}
  }
}
