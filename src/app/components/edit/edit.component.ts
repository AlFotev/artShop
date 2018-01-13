import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../models/artwork.model';
import { Artform } from '../../models/art-form.model';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtworkService } from '../../services/artworks.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public inputData = new Artform('', '', '', '');
  public allCategorys: string[];
  private body: {};
  public id: string;
  public author: string;
  public heading: string;
  public description: string;
  public image: string;
  public status: string;
  public date: string;
  public price: number;
  public likes: string;
  public category
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private artServ: ArtworkService,
    private authService: AuthService) {
    this.allCategorys = [
      "фотография",
      "хенд-мейд",
      "картини"
    ]
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.likes = '';
      this.price = 0;
      this.artServ.showDetails(this.id)
        .subscribe(success => {
          this.author = success.author;
          this.heading = success.heading;
          this.description = success.description;
          this.category = success.category;
          this.image = success.image;
          this.date = this.artServ.calcTime(success["_kmd"]["ect"]) + " ago";
          this.status = success.status;
          this.inputData = new Artform(this.heading, this.description, this.category, this.image);
        })
    });
  }

   editArt() {
     this.body = {
       heading: this.inputData.heading,
       description: this.inputData.description,
       category: this.inputData.category,
       image: this.inputData.image,
       author: localStorage.username,
       status: "pending"
     }
     this.artServ.editArt(this.body,this.id)
       .subscribe(success => {
         this.toastr.success("Успешно редактирахте тази творба!");
         this.router.navigateByUrl("/myprofile/myarts");
       }, error => {
         this.toastr.error("Неуспешно редактиране на творбата!")
       })
   }

}
