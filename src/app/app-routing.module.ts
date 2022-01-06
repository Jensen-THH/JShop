import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AdminComponent } from './backend/admin/admin.component';
import { AddProductComponent } from './backend/components/add-product/add-product.component';
import { EditProductComponent } from './backend/components/edit-product/edit-product.component';
import { DashboardComponent } from './backend/views/dashboard/dashboard.component';
import { TablesComponent } from './backend/views/tables/tables.component';
import { AddImageComponent } from './backend/components/add-image/add-image.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { IndexComponent } from './components/index/index.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileuserComponent } from './components/profileuser/profileuser.component';

import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { OrderComponent } from './backend/views/order/order.component';
import { EditOrderComponent } from './backend/components/edit-order/edit-order.component';
import { ListorderComponent } from './components/profileuser/listorder/listorder.component';
import { DetailorderComponent } from './components/profileuser/detailorder/detailorder.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product/:productId', component: DetailproductComponent },
      { path: 'about', component: AboutComponent },
      { path: 'products/:category', component: ProductsComponent },
      { path: 'search/:category', component: SearchComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [UserGuard] },
      { path: '', component: IndexComponent },
      { path: 'index', component: IndexComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'profile', component: ProfileuserComponent, canActivate: [UserGuard],children:[
        {path:'listorder',component:ListorderComponent},
        {path:'detail/:id',component:DetailorderComponent},
        {path:'', redirectTo: 'listorder', pathMatch: 'full'},
      ] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: 'upload', component: AddImageComponent, canActivate: [AuthGuard] },
      { path: 'table', component: TablesComponent, canActivate: [AuthGuard] },
      { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
      { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
      { path: 'edit-order/:id', component: EditOrderComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }