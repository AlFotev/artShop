import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Artwork } from '../../models/artwork.model';
import { ArtworkService } from '../../services/artworks.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public id:string;
  public author:string;
  public heading:string;
  public description:string;
  public image:string;
  public status:string;
  public date:string;
  public price:number;
  public likes:string;
  public category
  constructor(
    private artServ: ArtworkService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.likes = '';
      this.price = 0;
      this.artServ.showDetails(this.id)
      .subscribe(success=>{
        this.author = success.author;
        this.heading = success.heading;
        this.description = success.description;
        this.category = success.category;
        this.image = success.image;
        this.date = this.artServ.calcTime(success["_kmd"]["ect"]) + " ago";
        this.status = success.status;
      })
   });
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
        this.ngOnInit();
        this.toastr.success("Успешно одобрена");
        this.router.navigateByUrl("/myprofile");
      }, error => {
        this.toastr.error("Неуспех")
      })
  }

  deleteArtWork(){
    let id = this.id;
    this.adminService.deleteArtWork(id)
    .subscribe(success=>{
      this.toastr.success("Успешно изтрихте тази публикация!")
      this.router.navigateByUrl("/myprofile");
     
    },error=>{
      this.toastr.error("Грешка при изтриване!")
    })
  }
  isAuthor():boolean{
    return this.artServ.isAuthor(this.author);
  }

}
