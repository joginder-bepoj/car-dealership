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
    form!: FormGroup;

    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            totalBudget: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            latitude: [],
            longitude: []
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

    patchForm({ name, location, totalBudget, owner }: any) {
        this.form.patchValue({
            name,
            address: location?.address,
            totalBudget,
            firstName: owner?.firstName,
            lastName: owner?.lastName
        })
    }

    getDealers() {
        this.isLoading = true;
        this.userService.getDealers(null).subscribe(data => {
            setTimeout(() => {
                this.isLoading = false;
                this.dealers = data;
            }, 850)
        }, error => {
            this.isLoading = false;
        })
    }

    onSubmit() {
        this.form.value.location = { address: this.form.value.address, latitude: '', longitude: '' };
        this.form.value.owner = { firstName: this.form.value.firstName, lastName: this.form.value.lastName }
        delete this.form.value.address;
        delete this.form.value.firstName;
        delete this.form.value.lastName;
        if (this.selectedData) this.updateDealer(this.selectedData.id);
        else this.addDealer();
    }

    addDealer() {
        this.userService.addDealer(this.form.value).subscribe(data => {
            this.getDealers();
        })
    }

    updateDealer(id: any) {
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