import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  ProductList : undefined|product[];
  constructor(private route:ActivatedRoute,private prod:ProductService){ 
  }
  ngOnInit():void{
    let query = this.route.snapshot.paramMap.get('query');
    //console.log(query);
    
    query && this.prod.SearchProducts(query).subscribe((data)=>{
      this.ProductList=data
      //console.warn(data);
      
    })
  }

}
