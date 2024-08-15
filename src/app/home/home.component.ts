import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProduct:undefined|product[];
  trendyProduct:undefined|product[];

  constructor(private product:ProductService){}
  ngOnInit():void{
    this.product.popularProduct().subscribe((data)=>{
      this.popularProduct=data;
    })
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProduct=data;
    })
  }


  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
