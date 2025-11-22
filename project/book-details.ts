import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookService } from '../../services/book-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {
   book: any;
   id!: string;

   constructor(private bookSerive: BookService,
     private router: Router, 
     private route: ActivatedRoute) {}

   ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if(this.id) {
      this.loadBook(this.id);
    }
   }

   loadBook(id: string) {
    this.bookSerive.getBookById(id).subscribe({
      next: (data: any) => {this.book = data},
      error: (err) => {console.log('Error loading book')}
    })
   }

   editBook() {
   if(this.book?.id) {
    this.router.navigate(['edit', this.book.id])
   }
   }

   goBack() {
    this.router.navigate(['/books'])
   }

}
