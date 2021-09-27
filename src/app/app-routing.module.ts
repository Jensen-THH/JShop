import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './backend/admin/admin.component';
import { TablesComponent } from './backend/views/tables/tables.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { IndexComponent } from './components/index/index.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: MainComponent , children :[
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:productId', component: DetailproductComponent },
    { path: 'about', component: AboutComponent },
    { path: 'products/:category', component: ProductsComponent },
    { path: 'search/:category', component: SearchComponent },
    { path: 'search/:category', component: SearchComponent },

    {path:'' , component: IndexComponent},
    {path:'index' , component: IndexComponent},
    { path: '', redirectTo: 'index', pathMatch: 'full' },
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, children:[
    { path: 'table', component: TablesComponent },
    { path: '', redirectTo: 'cart', pathMatch: 'full' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }