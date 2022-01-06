import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../service/api.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  allproduct : any 
  filterTerm: any | undefined;
  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.apiService.GetAllProduct().subscribe(res=>{
      this.allproduct = res
      this.allproduct = this.allproduct.reverse()
    })
  }
  deleteProduct(id:any,i:any){
    if (window.confirm('Do you want to go ahead?')){
      this.apiService.deleteProduct(id).subscribe((res)=>{
        this.allproduct.splice(i,1)
      })
    }
  }
}
