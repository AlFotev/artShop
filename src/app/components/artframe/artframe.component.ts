import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Artwork } from '../../models/artwork.model';
import { ArtworkService } from '../../services/artworks.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-artframe',
  templateUrl: './artframe.component.html',
  styleUrls: ['./artframe.component.css']
})
export class ArtframeComponent implements OnInit {
  @Input("currentArt") curArt: Artwork;
  @Output() changeDetect = new EventEmitter<boolean>();
  public id: string;
  public author: string;
  public heading: string;
  public description: string;
  public image: string;
  private date: string;
  public category: string;
  public status: string;
  public likes: string;
  public price: number;
  public change: boolean;
  constructor(
    private artServ: ArtworkService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.change = false;
  }

  ngOnInit() {
    let describe = this.curArt.description ? this.curArt.description : '';
    if (describe.length > 247) {
      this.description = describe.substring(0, 247) + "...";
    } else {
      this.description = describe;
    }
    this.id = this.curArt["_id"] ? this.curArt["_id"] : '';
    this.author = this.curArt.author ? this.curArt.author : '';
    this.status = this.curArt.status ? this.curArt.status : '';
    this.likes = this.curArt.likes ? this.curArt.likes : '';
    this.heading = this.curArt.heading ? this.curArt.heading : '';
    this.image = this.curArt.image ? this.curArt.image : '';
    this.category = this.curArt.category ? this.curArt.category : '';
    this.date = this.artServ.calcTime(this.curArt["_kmd"]["ect"]) + " ago";
    this.price = 0;
  }
  approveArtWork() {
    this.adminService.approveArtWork(
      this.id,
      this.author,
      this.price,
      this.heading,
      this.description,
      this.image,
      this.category,
      "approved",
      this.likes
    )
      .subscribe(success => {
        if (this.change) {
          this.change = false;
          this.changeDetect.emit(this.change);
          return;
        } else {
          this.change = true;
          this.changeDetect.emit(this.change);
          return;
        }
      }, error => {
        console.log("no")
      })
  }

  deleteArtWork(){
    let id = this.id;
    this.adminService.deleteArtWork(id)
    .subscribe(success=>{
      this.toastr.success("Успешно изтрихте тази публикация!")
      if (this.change) {
        this.change = false;
        this.changeDetect.emit(this.change);
        return;
      } else {
        this.change = true;
        this.changeDetect.emit(this.change);
        return;
      }
    },error=>{
      this.toastr.error("Грешка при изтриване!")
    })
  }
  isAuthor():boolean{
    return this.artServ.isAuthor(this.author);
  }
}
