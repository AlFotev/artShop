//Modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutesModule } from './routes/app-routes.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/guard.service';
import { AdminGuard } from './services/admin.guard.service';
import { inputValidate } from './services/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//services
import { AuthService } from './services/auth.service';
import { ArtworkService } from './services/artworks.service';
import { AdminService } from './services/admin.service';
//Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ArtframeComponent } from './components/artframe/artframe.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { ArtlistComponent } from './components/artlist/artlist.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddartComponent } from './components/addart/addart.component';
import { EditComponent } from './components/edit/edit.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    inputValidate,
    MyprofileComponent,
    ArtframeComponent,
    PaginationComponent,
    CategoryComponent,
    UserComponent,
    ArtlistComponent,
    UserlistComponent,
    DetailComponent,
    AddartComponent,
    EditComponent,
    PageNotFoundComponent
  ],
  imports: [NgbModule.forRoot(),
  ToastrModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutesModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, ArtworkService, AuthGuard, AdminGuard, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
