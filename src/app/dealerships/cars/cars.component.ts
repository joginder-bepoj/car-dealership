import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html'
})
export class CarsComponent implements OnInit {
    selectedData: any;
    isLoading: boolean = false;
    caresList: any;
    error: any;
    form!: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            brand: ['', Validators.required],
            model: ['', Validators.required],
            color: ['', Validators.required],
            price: ['', Validators.required]           
        })
     }

    dealerId:any;

    ngOnInit() { 
        this.dealerId = this.route.snapshot.paramMap.get('id');
        this.getCars(this.dealerId)
    }

    emptyRow() {
        this.selectedData = null;
        this.form.reset();
    }

    selectRow(data: any) {
        this.selectedData = data;
        this.patchForm(this.selectedData);
        console.log(this.selectedData)
    }

    patchForm({ brand, model, color, price }: any) {
        this.form.patchValue({
            brand,
            model,
            color,
            price
        })
       
    }

    getCars(id:any) {       
        this.isLoading = true;
        this.userService.getCars(id).subscribe(res => {
            this.isLoading = false;
            this.caresList = res;
            
        }, error => {
            this.isLoading = false;
            this.error = error.message;
        })
    }

    onSubmit() {
        
        if (this.selectedData) this.updateCar(this.selectedData.id);
        else this.addCar();
    }

    addCar() {
        let data = this.caresList; 
        this.userService.addCars(this.dealerId, this.form.value).subscribe(data => {
           this.getCars(this.dealerId);
        })
    }

    updateCar(id: any) {
        console.log(this.form.value)
        let data = this.caresList; 

        this.userService.updateCar(this.dealerId, this.form.value).subscribe(data => {
            this.getCars(this.dealerId);
        })
    }

    delete() {
        this.userService.deleteDealer(this.selectedData.id).subscribe(data => {
            this.getCars(this.dealerId);
        })
    }
}