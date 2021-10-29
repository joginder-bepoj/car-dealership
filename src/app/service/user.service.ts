import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl = 'http://localhost:3000/dealers';

    constructor(
        private http: HttpClient
    ) { }

    getDealers(search: any) {
        let param = new HttpParams();
        if (search) param = param.append('search', search);
        return this.http.get(`${this.apiUrl}`, { params: param });
    }

    addDealer(data: any) {
        return this.http.post(`${this.apiUrl}`, data);
    }

    updateDealer(id: any, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    deleteDealer(id: any) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
