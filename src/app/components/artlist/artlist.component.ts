import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { ArtframeComponent } from '../artframe/artframe.component'
import { Router } from '@angular/router';
import { itemsPerPage } from '../pagination/pagination.component';
import 'rxjs/add/operator/map';

//services
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { ArtworkService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
//models
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-artlist',
  templateUrl: './artlist.component.html',
  styleUrls: ['./artlist.component.css']
})
export class ArtlistComponent implements OnInit {
  public items: Artwork[];
  public size: number;
  public currentPage: number;
  public shownPages: Artwork[];
  public myItems:Artwork[];
  public noitems: boolean;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
    private artService: ArtworkService
  ) { }

  ngOnInit() {
    if (this.router.url == "/admin/pending") {
      this.getPendingArtWorks();
    } else if (this.router.url == "/admin/approved") {
      this.getApprovedArtWorks();
    }
    else if (this.router.url == "/myprofile/myarts") {
      this.myArts();
    }
  }

  getPendingArtWorks() {
    this.adminService.getPendingArtWorks()
      .subscribe(success => {
        this.items = [];
        success.map(el => this.items.push(el));
        this.size = this.items.length;
        this.takeCurrentPage(1);
        if (this.items.length == 0) {
          this.noitems = true;
        }
      },
      error => {

      })
  }

  getApprovedArtWorks() {
    this.adminService.getApprovedArtWorks()
      .subscribe(success => {
        this.items = [];
        success.map(el => this.items.push(el));
        this.size = this.items.length;
        this.takeCurrentPage(1);
        if (this.items.length == 0) {
          this.noitems = true;
        }
      },
      error => {

      })
  }

  myArts() {
    let id = localStorage.id;
    this.artService.getByUser(id)
      .subscribe(success => {
        console.log(success)
        this.myItems = [];
        success.map(el => this.myItems.push(el));
        this.size = this.myItems.length;
        this.takeCurrentPage(1);
        if (this.myItems.length == 0) {
          this.noitems = true;
          return;
        }
      },
      error => {
        this.toastr.error("Грешка при зареждането на вашите творби!");
      })
  }
  takeCurrentPage(page) {
    this.currentPage = Number(page);
    let start = (this.currentPage * itemsPerPage) - 2;
    let end = start + itemsPerPage;
    if(this.router.url == "/myprofile/myarts"){
      this.shownPages = this.myItems.slice(start, end);
      return;
    }
    this.shownPages = this.items.slice(start, end);
  }


}
