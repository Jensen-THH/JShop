import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './backend/admin/admin.component';
import { IndexComponent } from './components/index/index.component';
import { SidebarComponent } from './backend/components/sidebar/sidebar.component';
import { HeaderStatsComponent } from './backend/components/headers/header-stats/header-stats.component';
import { AdminNavbarComponent } from './backend/components/navbars/admin-navbar/admin-navbar.component';
import { FooterAdminComponent } from './backend/components/footers/footer-admin/footer-admin.component';
import { UserDropdownComponent } from './backend/components/dropdowns/user-dropdown/user-dropdown.component';
import { CardStatsComponent } from './backend/components/cards/card-stats/card-stats.component';
import { NotificationDropdownComponent } from './backend/components/dropdowns/notification-dropdown/notification-dropdown.component';
import { DashboardComponent } from './backend/views/dashboard/dashboard.component';
import { TablesComponent } from './backend/views/tables/tables.component';
import { CardTableComponent } from './backend/components/cards/card-table/card-table.component';
import { AddProductComponent } from './backend/components/add-product/add-product.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    FooterComponent,
    HeroComponent,
    CategoryComponent,
    DetailproductComponent,
    ContactComponent,
    SignupComponent,
    CartComponent,
    AboutComponent,
    ProductsComponent,
    SearchComponent,
    AdminComponent,
    IndexComponent,
    SidebarComponent,
    HeaderStatsComponent,
    AdminNavbarComponent,
    FooterAdminComponent,
    UserDropdownComponent,
    CardStatsComponent,
    NotificationDropdownComponent,
    DashboardComponent,
    TablesComponent,
    CardTableComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
