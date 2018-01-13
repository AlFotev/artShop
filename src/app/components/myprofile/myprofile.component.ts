import { Component, OnInit } from '@angular/core';
import { ArtframeComponent } from '../artframe/artframe.component';
import { PaginationComponent } from '../pagination/pagination.component';
import {itemsPerPage} from '../pagination/pagination.component';
import { ArtworkService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  private myusername: string;
  public id: any;
  private toastr: ToastrService;
  public allmyartworks: Artwork[];
  public size:number;
  public currentPage:number;
  public shownPages:Artwork[];
  constructor(private artService: ArtworkService) {
  }

  ngOnInit() {
    this.allmyartworks = [];
    this.myusername = localStorage.username;
    this.id = localStorage.id;
    this.artService.getByUser(this.id)
      .subscribe(data => {
        data.map((el, i) => this.allmyartworks[i] = el);
        this.size = this.allmyartworks.length;
        this.takeCurrentPage(1);
      },
      error => {

      })
  }

  takeCurrentPage(page){
     this.currentPage = Number(page);
     let start = (this.currentPage * itemsPerPage) - 2;
     let end = start + itemsPerPage;
     this.shownPages = this.allmyartworks.slice(start, end);
  }

}
