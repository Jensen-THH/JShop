import { Component,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
  
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jensen';
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.setUpAnalytics();
  }
  onActivate(){
    window.scroll(0,0)
  }
  setUpAnalytics() {
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      gtag('config', 'G-L1H2H8D710',
      {
        page_path: event.urlAfterRedirects
                }
            );
        });
}
  
  
}
