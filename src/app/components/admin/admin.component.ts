import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { ArtlistComponent } from '../artlist/artlist.component';
import { itemsPerPage } from '../pagination/pagination.component';
import 'rxjs/add/operator/map';

//services
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { ArtworkService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
//models
import { Artwork } from '../../models/artwork.model';
import { User } from '../../models/user.model'



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public items: Artwork[];
  public users: User[];
  public size: number;
  public currentPage: number;
  public shownPages: Artwork[];
  public noitems: boolean;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
    private artService: ArtworkService
  ) {
  }

  ngOnInit() {

  }

}
