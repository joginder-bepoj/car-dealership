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

    getCars(data: any) {      
      //  let param = new HttpParams();
       // if (data) param = param.append('data', data);
        return this.http.get(`${this.apiUrl+'/'+data}`);
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

    addCars(id: any, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    updateCar(id: any, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

}
