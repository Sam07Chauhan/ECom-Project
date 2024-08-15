import { Component } from '@angular/core';
import { product } from '../data';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  ProductMessage: undefined | string;
  productData:undefined|product;
  constructor(private route:ActivatedRoute,private product: ProductService) { }
  ngOnInit(): void {
   var productId= this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&this.product.getProductById(productId).subscribe((data)=>{
      this.productData=data;
    })
  }
  update(data: product) {
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.ProductMessage="Product updated successfully";
      }
      setTimeout(()=> 
        this.ProductMessage=undefined,3000
      )
    })
  }

}
