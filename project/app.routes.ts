import { Routes } from '@angular/router';
import { CategoryList } from './component/category-list/category-list';
import { BookList } from './component/book-list/book-list';
import { UserList } from './component/user-list/user-list';
import { BookForm } from './component/book-form/book-form';
import { Login } from './component/login/login';
import { AuthGuardService } from './services/authGuard-service';
import { BookDetails } from './component/book-details/book-details';


export const routes: Routes = [
   {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: Login},
  { path: 'books', component: BookList, canActivate: [AuthGuardService]},
  { path: 'users', component: UserList, canActivate: [AuthGuardService]},
  { path: 'categories', component: CategoryList, canActivate: [AuthGuardService]},
  {path: 'add', component: BookForm, canActivate: [AuthGuardService]},
  { path: 'edit/:id', component: BookForm, canActivate: [AuthGuardService]}, 
  { path: 'add', component: BookForm, canActivate: [AuthGuardService]}, 
  { path: 'view/:id', component: BookDetails, canActivate: [AuthGuardService]}, 
  {path: '**', redirectTo: '/login'},
];
