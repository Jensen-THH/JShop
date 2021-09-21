import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:productId', component: DetailproductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'search/:category', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }