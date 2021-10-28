import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl = 'http://localhost:3000';

    constructor(
        private http: HttpClient
    ) { }

    getUsers(search: any) {
        let param = new HttpParams();
        if (search) param = param.append('search', search);
        return this.http.get(`${this.apiUrl}/users`, { params: param });
    }

}
