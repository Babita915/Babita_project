import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  bookForm: FormGroup;
  nextId: any [] = [];
  bookList: any [] = [];
  id!: string;

   constructor(private bookService: BookService, private fb: FormBuilder,
     private router: Router) {
     this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      copies: ['', Validators.required],
     })
   }
  
   onSubmit() {
    if(this.bookForm.valid) {
      const newBook: any = {
        id: this.nextId.length+1,
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        category: this.bookForm.value.category,
        copies: this.bookForm.value.copies
      }

     
    if(this.id) {
      this.bookService.updateBook(this.id, newBook).subscribe((book: any) => {
         console.log(book)
      })
    }  else {
      this.bookService.addBook(newBook).subscribe((book: any) => {

        console.log(book)
      })
    }
  } else {
    console.log('Please fill all feilds')
  }

  this.router.navigate(['/books'])
}
}