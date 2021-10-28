import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dealership',
    templateUrl: './dealerships.component.html'
})
export class DealershipComponent implements OnInit {

    constructor() { }

    selectedData: any;
    isLoading: boolean = true;

    ngOnInit() { }

    selectRow(data: any) {
        this.selectedData = data;
    }

    getUsers() {
        this.isLoading = true;

    }
}