import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html'
})
export class CarsComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
    ) { }

    dealerId:any;

    ngOnInit() { 
        this.dealerId = this.route.snapshot.paramMap.get('id');
        console.log('this.dealerId',this.dealerId)
    }
}