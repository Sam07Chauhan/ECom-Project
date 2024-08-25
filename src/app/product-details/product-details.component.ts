import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  resultProduct: undefined | product;
  quantity: number = 1;
  //quantity:undefined | string;
  constructor(private product:ProductService, private ActiveRoute:ActivatedRoute){}
  ngOnInit():void{
    let productId = this.ActiveRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProductById(productId).subscribe((result)=>{
      this.resultProduct=result;
    })
  }
  handleQuantity(val: string){
    if(this.quantity >1 && val === 'min'){
      this.quantity -=1;
    }
    else if(this.quantity < 20 && val === 'plus'){
      this.quantity +=1;
    }
    //let a = parseInt(val);      // Convert string to number
    //let b = a - 1;              // Decrease the number by 1
    //this.quantity = b.toString(); // Convert the number back to string
    //console.warn(this.quantity);  // Log the updated quantity
  }
  
}
