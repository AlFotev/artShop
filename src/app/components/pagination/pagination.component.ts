import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artwork } from '../../models/artwork.model';
export const itemsPerPage: number = 2;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input("size") size: number;
  @Output() onReacted = new EventEmitter<number>();
  public allPages: number[];
  public lastPage:number;
  public currentPage: number;
  constructor(
  ) {
    this.currentPage = 1;
    this.allPages = [];
  }

  ngOnInit() {
    this.lastPage = Math.ceil(this.size / itemsPerPage);
    for (let i = 1; i <= this.lastPage; i++) {
      this.allPages.push(i)
    }
  }
  exportPage(event) {
    this.currentPage = event.target.innerHTML;
    this.onReacted.emit(this.currentPage);
  }
  nextPage(){
    this.currentPage++;
    if(this.currentPage > this.lastPage){
      this.currentPage--;
      return;
    }
    this.onReacted.emit(this.currentPage);
  }
  prevPage(){
    this.currentPage--;
    if(this.currentPage < 1){
      this.currentPage++;
      return;
    }
    this.onReacted.emit(this.currentPage);
  }

}
