import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
  }
  onActivate(){
    window.scroll(0,0)
  }


}
