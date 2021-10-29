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
    sortFlaf: number=0;
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
        let x = this.caresList.cars.length-1;
        if(this.caresList.cars.length==0){
            this.form.value.id = 1
        } else {
            this.form.value.id = parseInt(this.caresList.cars[x].id)+1;
        }
        
        let data = this.caresList;         
        data.cars.push(this.form.value); 
        
        this.userService.addCars(this.dealerId, data).subscribe(data => {
           this.getCars(this.dealerId);
        })
    }

    updateCar(id: any) {
        let data = this.caresList.cars; 
        data = data.map((data:any, index:number) => {
            if(data.id == this.selectedData.id) return data[index] = this.form.value;
            else return data;
        });
        this.caresList.cars=data;  
        this.userService.updateCar(this.dealerId, this.caresList).subscribe(data => {
            this.getCars(this.dealerId);
        })
    }

    delete() {
        let data = this.caresList.cars; 
        data = data.filter(((item:any) => item.id != this.selectedData.id));
        this.caresList.cars=data;        
        this.userService.deleteCar(this.dealerId, this.caresList).subscribe(data => {
            this.getCars(this.dealerId);
        })
    }

    searchCars(event:any){
        console.log(event)
        let value = event.target.value.toUpperCase();
        let car =  this.caresList.cars;
        var filteredArray = car.filter(function( obj:any ) { 
           return obj.brand.toUpperCase().includes(value)
        });
        console.log(filteredArray)
        if(value){
            this.caresList.cars = filteredArray;           
        } else {
            this.getCars(this.dealerId);
        }
       
    }

    sort(type:any){
        let car =  this.caresList.cars;

        if(this.sortFlaf==0){
            if( type == 'model'){
                var sortedArray = car.sort((a:any, b:any) => (a.model < b.model ? -1 : 1)); 
            }else{
                var sortedArray = car.sort((a:any, b:any) => (a.brand < b.brand ? -1 : 1)); 
            }
             
            this.sortFlaf = 1 ;
        }else{
            if( type == 'model'){
                var sortedArray = car.sort((a:any, b:any) => (a.model > b.model ? -1 : 1));  
            }else{
                var sortedArray = car.sort((a:any, b:any) => (a.brand > b.brand ? -1 : 1));  
            }
             
            this.sortFlaf = 0; 
        }
        
           
        this.caresList.cars = sortedArray;
    }
}