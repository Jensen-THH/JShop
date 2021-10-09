import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService) { }
  users : any
  filterTerm: any | undefined;
  ngOnInit(): void {
    this.authService.getAlluser().subscribe(res=>{
      this.users =  res
      this.users = this.users.filter((item: { email: any; })=> item.email !== "admin@gmail.com" )
    })

  }
  deleteUser(id:any,i:any){
    if (window.confirm('Do you want to go ahead?')){
    this.authService.deleteUser(id).subscribe((res)=>{
      this.users.splice(i,1)
    })
  }

  }

}
