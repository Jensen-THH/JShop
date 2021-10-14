import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './backend/admin/admin.component';
import { AddProductComponent } from './backend/components/add-product/add-product.component';
import { EditProductComponent } from './backend/components/edit-product/edit-product.component';
import { DashboardComponent } from './backend/views/dashboard/dashboard.component';
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
import { AuthGuard } from './guards/auth.guard';
import { AddImageComponent } from './backend/components/add-image/add-image.component';

const routes: Routes = [
  { path: '', component: MainComponent , children :[
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:productId', component: DetailproductComponent },
    { path: 'about', component: AboutComponent },
    { path: 'products/:category', component: ProductsComponent },
    { path: 'search/:category', component: SearchComponent },

    {path:'' , component: IndexComponent},
    {path:'index' , component: IndexComponent},
    { path: '', redirectTo: 'index', pathMatch: 'full' },
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], children:[
    {path: 'upload',component:AddImageComponent,canActivate:[AuthGuard]},
    { path: 'table', component: TablesComponent ,canActivate:[AuthGuard]} ,
    { path: 'add-product', component: AddProductComponent ,canActivate:[AuthGuard]},
    { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
    { path: 'edit-product/:id', component: EditProductComponent ,canActivate:[AuthGuard]},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }