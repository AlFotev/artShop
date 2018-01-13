import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../models/artwork.model';
import { Artform } from '../../models/art-form.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtworkService } from '../../services/artworks.service';

@Component({
  selector: 'app-addart',
  templateUrl: './addart.component.html',
  styleUrls: ['./addart.component.css']
})
export class AddartComponent implements OnInit {
  public inputData = new Artform('', '', '', '');
  public allCategorys: string[];
  private body: {};
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private artService: ArtworkService,
    private authService: AuthService) {
    this.allCategorys = [
      "фотография",
      "хенд-мейд",
      "картини"
    ]
  }

  ngOnInit() {
  }

  addArt() {
    this.body = {
      heading: this.inputData.heading,
      description: this.inputData.description,
      category: this.inputData.category,
      image: this.inputData.image,
      author: localStorage.username,
      status: "pending"
    }
    this.artService.createArt(this.body)
      .subscribe(success => {
        this.toastr.success("Успешно създадохте нова творба!");
        this.router.navigateByUrl("/myprofile/myarts");
      }, error => {
        this.toastr.error("Неуспешно качване на творбата!")
      })
  }

}
