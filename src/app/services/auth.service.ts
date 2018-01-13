import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable } from "rxjs/Observable";
import { ToastrService } from 'ngx-toastr';
import {} from ''
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_r1s-THlWM";
const kinveyAppSecret = "2de47d98534e4ad78bbe99e2a61f49ac";
const kinveyMaster = '08629d86d885490fa6c7814888dbd60e';
const registerUrl = `https://baas.kinvey.com/user/${kinveyAppKey}`;
const loginUrl = `https://baas.kinvey.com/user/${kinveyAppKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${kinveyAppKey}/_logout`;

@Injectable()
export class AuthService {
    constructor(
        private toastr: ToastrService,
        private http: HttpClient,
        private route: Router
    ) { }
    url(): string {
        return kinveyBaseUrl;
    }
    key() {
        return kinveyAppKey
    }
    secret(): string { return kinveyAppSecret }
    guestHeader(): string {
        return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
    }
    userHeader(): string {
        return 'Kinvey ' + localStorage.getItem("authtoken")
    }
    masterHeader(): string {
        return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMaster);
    }
    visitorHeader(){
        return 'Basic ' + btoa("visitor" + ':' + 1);
    }

    register(body): Observable<{}> {
        return this.http.post(
            registerUrl,
            body, {
                headers: new HttpHeaders().set("Authorization", this.guestHeader())
            })
    }
    isLogged(): boolean {
        if (localStorage.getItem("authtoken") != undefined) {
            return true;
        }
        return false;
    }
    logout(): void {
        this.http.post(logoutUrl, {},
            { headers: new HttpHeaders().set("Authorization", this.userHeader()) }
        ).subscribe(data => {
            this.toastr.success("Довиждане, " + localStorage.username);
            this.clearUserStat();
            this.route.navigate(["/home"]);
        })
    }
    login(data): Observable<{}> {
        let body = {
            username: data["username"],
            password: data["password"]
        }
        return this.http.post(
            this.url() + "user/" + this.key() + "/login",
            body, {
                headers: new HttpHeaders().set("Authorization", this.guestHeader())
            }
        )
    }

    setUserStat(data): void {
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('username', data['username']);
        localStorage.setItem('id', data['_id']);
        if (data["role"]) {
            localStorage.setItem('admin', data["role"]);
        }
    }
    clearUserStat(): void {
        localStorage.clear();
    }


    isAdmin(): boolean {
        if (localStorage.getItem("admin") === "admin") {
            return true;
        }
        return false;
    }
}