//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard.service';
import { AdminGuard } from '../services/admin.guard.service';

//components
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminComponent } from '../components/admin/admin.component';
import { MyprofileComponent } from '../components/myprofile/myprofile.component';
import { CategoryComponent } from '../components/category/category.component';
import { ArtlistComponent } from '../components/artlist/artlist.component';
import { UserlistComponent } from '../components/userlist/userlist.component';
import { AddartComponent } from '../components/addart/addart.component';
import { DetailComponent } from '../components/detail/detail.component';
import { EditComponent } from '../components/edit/edit.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

//services
import { AuthService } from '../services/auth.service';




const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "admin", canActivate: [AdminGuard], component: AdminComponent,
    children: [
      { path: '', redirectTo: 'pending', pathMatch: 'full' },
      { path: 'pending', component: ArtlistComponent },
      { path: 'approved', component: ArtlistComponent },
      { path: 'commonusers', component: UserlistComponent },
      { path: 'special', component: UserlistComponent }
    ]
  },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "myprofile", canActivate: [AuthGuard], component: MyprofileComponent,
    children: [
      { path: '', redirectTo: 'myarts', pathMatch: 'full' },
      { path: 'myarts', component: ArtlistComponent },
      { path: 'addart', component: AddartComponent }
    ]
  },
  { path: "art", component: CategoryComponent },
  { path: "photography", component: CategoryComponent },
  { path: "handmade", component: CategoryComponent },
  { path: "details/:id",canActivate: [AuthGuard], component: DetailComponent },
  { path: "edit/:id", canActivate: [AuthGuard],component: EditComponent },
  { path: "**" ,component: PageNotFoundComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }
