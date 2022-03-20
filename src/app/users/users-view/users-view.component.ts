import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { UsersService } from '../users.service';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersViewPointsService } from './users-view-points/users-view-points.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  user:User;
  selectedNav:string;
  coreService;
  constructor(private cs:CoreService,
    private usersService:UsersService,
    private router:Router,
    private route:ActivatedRoute) { 
    this.selectedNav = "overview";
    this.coreService = this.cs
  }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
   this.usersService.find(id).subscribe(resp=>{
     this.user = resp;
   },error=>{
      this.coreService.showAlertAutoClose("danger","User not found");
     this.router.navigate(["/admin/users"]);
   });
    
  }

  onBack(){
    this.router.navigate(["/admin/users"]);
  }

  selectNav(selected:string){
    this.selectedNav = selected;
  }

}
