import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './model/model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // Set your backend base URL here (update if your backend is on a different host/port)
  private baseUrl = 'http://localhost:8000/api/books';

  constructor(private http: HttpClient) { }

 
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(id: string) {
  return this.http.get<Book>(`${this.baseUrl}/${id}`);
}


  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}