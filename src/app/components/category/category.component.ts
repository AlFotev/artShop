import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtframeComponent } from '../artframe/artframe.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { itemsPerPage } from '../pagination/pagination.component';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

//models
import { Artwork } from '../../models/artwork.model';

//services
import { ArtworkService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public category: string;
  public items: Artwork[];
  public size: number;
  public currentPage: number;
  public shownPages: Artwork[];
  public noitems: boolean;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private artService: ArtworkService
  ) {
  }

  ngOnInit() {
    this.category = this.router.url;
    this.artService.getByCategory(this.category)
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

  takeCurrentPage(page) {
    this.currentPage = Number(page);
    let start = (this.currentPage * itemsPerPage) - 2;
    let end = start + itemsPerPage;
    this.shownPages = this.items.slice(start, end);
  }

  ngOnDestroy() {
    this.items = [];
  }


}
