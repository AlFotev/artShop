import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Artwork } from '../models/artwork.model';

@Injectable()
export class ArtworkService {
    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private router: Router
    ) { }
    createArt(body) {
        let url = this.authService.url() + `appdata/${this.authService.key()}/artWorks`;
        return this.http.post(url, body, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }

    editArt(body, id) {
        let url = this.authService.url() + `appdata/${this.authService.key()}/artWorks/${id}`;
        return this.http.put(url, body, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }
    getByUser(id): Observable<Artwork[]> {
        const key = this.authService.key();
        const artsUrl = `https://baas.kinvey.com/appdata/${key}/` + `artWorks/?query={"author":"${localStorage.username}"}`;
        return this.http.get<Artwork[]>(
            artsUrl,
            { headers: new HttpHeaders().set("Authorization", this.authService.userHeader()) }
        )
    }
    getByCategory(category) {
        let wanted: string;
        switch (category) {
            case "/art":
                wanted = "картини";
                break;
            case "/photography":
                wanted = "фотография";
                break;
            case "/handmade":
                wanted = "хенд-мейд";
                break;
            default:
                break;
        }
        const key = this.authService.key();

        const artsUrl = `https://baas.kinvey.com/appdata/${key}/` + `artWorks/?query={"category":"${wanted}","status":"approved"}`;
        return this.http.get<Artwork[]>(
            artsUrl,
            { headers: new HttpHeaders().set("Authorization", this.authService.visitorHeader()) }
        )
    }

    showDetails(id) {
        let key = this.authService.key()
        const detailedUrl = `https://baas.kinvey.com/appdata/${key}/` + `artWorks/${id}`;
        return this.http.get<Artwork>(detailedUrl, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }

    isAuthor(author): boolean {
        if (author == localStorage.username) {
            return true;
        }
        return false;
    }

    calcTime(dateIsoFormat) {
        let diff = (new Date).getTime() - (new Date(dateIsoFormat).getTime());
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

}