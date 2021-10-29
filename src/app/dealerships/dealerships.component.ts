import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-dealership',
    templateUrl: './dealerships.component.html'
})
export class DealershipComponent implements OnInit {

    selectedData: any;
    isLoading: boolean = false;
    dealers: any;
    error: any;
    form!: FormGroup;

    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],          
            totalBudget: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            remainingBudget:[],
            cars:[]
        })
    }

    ngOnInit() {
        this.getDealers();
    }

    emptyRow() {
        this.selectedData = null;
        this.form.reset();
    }

    selectRow(data: any) {
        this.selectedData = data;       
        this.patchForm(this.selectedData);
    }

    patchForm({ name, location, totalBudget, owner, cars, remainingBudget }: any) {
        this.form.patchValue({
            name,            
            totalBudget,
            firstName: owner?.firstName,
            lastName: owner?.lastName,
            latitude: location?.latitude,
            longitude: location?.longitude,
            cars,
            remainingBudget
        });
        
    }

    getDealers() {
        this.isLoading = true;
        this.userService.getDealers(null).subscribe(data => {
            this.isLoading = false;
            this.dealers = data;
        }, error => {
            this.isLoading = false;
            this.error = error.message;
        })
    }

    onSubmit() {
        this.form.value.location = { latitude:this.form.value.latitude, longitude: this.form.value.longitude };
        this.form.value.owner = { firstName: this.form.value.firstName, lastName: this.form.value.lastName };           
        delete this.form.value.latitude;
        delete this.form.value.longitude;
        delete this.form.value.firstName;
        delete this.form.value.lastName;
        if (this.selectedData) this.updateDealer(this.selectedData.id);
        else this.addDealer(); this.form.value.cars = [];
    }

    addDealer() {
        this.userService.addDealer(this.form.value).subscribe(data => {
            this.getDealers();
        })
    }

    updateDealer(id: any) {
        console.log(this.form.value)
        this.userService.updateDealer(this.selectedData.id, this.form.value).subscribe(data => {
            this.getDealers();
        })
    }

    delete() {
        this.userService.deleteDealer(this.selectedData.id).subscribe(data => {
            this.getDealers();
        })
    }
}