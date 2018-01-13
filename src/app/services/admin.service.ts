import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable } from "rxjs/Observable";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Artwork } from "../models/artwork.model";
import { User } from "../models/user.model";
const usersBaseUrl = `https://baas.kinvey.com/user`;
const adminId = '89dde57e-cae2-445a-a5d5-62b7df6bb4d5';

@Injectable()
export class AdminService {
    constructor(
        private toastr: ToastrService,
        private http: HttpClient,
        private route: Router,
        private authService: AuthService
    ) { }
    getPendingArtWorks(): Observable<Artwork[]> {
        let key = this.authService.key()
        const pendingUrl = `https://baas.kinvey.com/appdata/${key}/` + `artWorks/?query={"status":"pending"}`;
        return this.http.get<Artwork[]>(pendingUrl,
            { headers: new HttpHeaders().set("Authorization", this.authService.userHeader()) })
    }
    getApprovedArtWorks() {
        let key = this.authService.key()
        const approvedUrl = `https://baas.kinvey.com/appdata/${key}/` + `artWorks/?query={"status":"approved"}`;
        return this.http.get<Artwork[]>(approvedUrl,
            { headers: new HttpHeaders().set("Authorization", this.authService.userHeader()) })
    }
    approveArtWork(
        id:string,
        author: string,
        price: number,
        heading: string,
        description: string,
        image: string,
        category: string,
        status: string,
        likes: string
    ) {
        let key = this.authService.key()
        let body = {
            author,
            price,
            heading,
            description,
            image,
            category,
            status,
            likes
        }
        const detailedUrl = `https://baas.kinvey.com/appdata/${key}/` + `artWorks/${id}`;
        return this.http.put<Artwork>(detailedUrl, body, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }
    deleteArtWork(id) {
        let delUrl = this.authService.url() + `appdata/${this.authService.key()}/artWorks/${id}?hard=true`;
        return this.http.delete(delUrl, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }

    getAdmins(): Observable<User[]> {
        let usersUrl = usersBaseUrl + `/${this.authService.key()}/?query={"role":"admin"}`
        return this.http.get<User[]>(usersUrl, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }
    getNotAdmins(): Observable<User[]> {
        let usersUrl = usersBaseUrl + `/${this.authService.key()}/?query={"role":"common"}`
        return this.http.get<User[]>(usersUrl, {
            headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
        })
    }
    assignAdmin(id) {
        let usersUrl = usersBaseUrl + `/${this.authService.key()}/${id}/roles/${adminId}`;
        return this.http.put(usersUrl,{},{
            headers: new HttpHeaders().set("Authorization", this.authService.masterHeader())
        })
    }
    revokeAdmin(id) {
        let usersUrl = usersBaseUrl + `/${this.authService.key()}/${id}/roles/${adminId}`;
        return this.http.delete(usersUrl, {
            headers: new HttpHeaders().set("Authorization", this.authService.masterHeader())
        })
    }
    updateUser(action, id, username,firstName,lastName) {
        if (action == "promote") {
            let usersUrl = usersBaseUrl + `/${this.authService.key()}/${id}`;
            let body = {
                username,
                firstName,
                lastName,
                role:"admin"
            }
            return this.http.put(usersUrl, body , {
                headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
            })
        } else if (action == "revoke") {
            let usersUrl = usersBaseUrl + `/${this.authService.key()}/${id}`;
            let body = {
                username,
                firstName,
                lastName,
                role:"common"
            }
            return this.http.put(usersUrl, body , {
                headers: new HttpHeaders().set("Authorization", this.authService.userHeader())
            })
        }
    }
    deleteUser(id) {
        let delUrl = this.authService.url() + `user/${this.authService.key()}/${id}`;
        return this.http.delete(delUrl, {
            headers: new HttpHeaders().set("Authorization", this.authService.masterHeader())
        })

    }
}