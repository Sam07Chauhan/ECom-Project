import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  constructor(private product:ProductService){}
  productList: undefined| product[];
  productMessage: string|undefined;
  icon = faTrash;
  edit=faEdit;
  ngOnInit(): void{
    this.GetProductList();
  }
  deleteProduct(id:number){
    //console.warn(id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.GetProductList();
        this.productMessage="Product deleted successfully";
      }
      setTimeout(()=> this.productMessage=undefined,3000)
    });
  }
  GetProductList(){
    this.product.productList().subscribe((result)=>{
      this.productList = result;
    })
  }


}
