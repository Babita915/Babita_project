import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'], // small typo fix: styleUrl → styleUrls
})
export class BookList {
  books: any[] = [];
  id!: string;

  constructor(private bookService: BookService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loadBook();
  }

  // Load all books
  loadBook() {
    this.bookService.getBooks().subscribe({
      next: (data: any) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        alert('Failed to load books. Please check your login/token.');
      }
    });
  }


  viewBook(id: number){
    this.router.navigate(['view', id])
  }

  // Navigate to edit page
  editBook(id: number){
    this.router.navigate(['edit', id]);
  }

  // Delete book with error handling
  deleteBook(id: string) {
         this.bookService.deleteBook(id).subscribe(() => this.loadBook());
    }
  }

