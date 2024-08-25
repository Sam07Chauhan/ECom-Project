import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { product } from '../data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  routeSubscription: Subscription | undefined;
  searchResult: undefined | product[];

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('seller') && event.url.includes('seller')) {
          this.menuType = 'seller';
          const sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            const sellerData = JSON.parse(sellerStore)[0];
            if (sellerData && sellerData.Name) {
              this.sellerName = sellerData.Name;
            }
          }
        }
        else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          const userStore = localStorage.getItem('user');
          if (userStore) {
            const userData = JSON.parse(userStore)[0];
            if (userData && userData.name) {
              this.userName = userData.name;
              console.log(userData);
              console.warn('user Logged in');
            }
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }


  logOut(): void {
    localStorage.removeItem('seller');
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
  userlogOut(): void {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
  Search(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      //console.warn(element.value);
      this.product.SearchProducts(element.value).subscribe((data) => {
        //console.warn(data);
        if (data.length > 4) {
          data.length = 4;
        }

        this.searchResult = data;
      })
    }
  }
  Searchout() {
    this.searchResult = undefined;
  }
  SearchInput(val: string) {
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id: number) {
    this.route.navigate(['details/' + id]);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
