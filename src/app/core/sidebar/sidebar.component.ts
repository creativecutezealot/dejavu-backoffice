import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoading:boolean;
  subscription = new Subscription();
  userSubjectSubscription = new Subscription();
  role: number;
  constructor(private coreService:CoreService, private authService: AuthService) {
    this.coreService.isLoadingSubject.subscribe(resp=>{
      this.isLoading = resp;
    });
   }

  ngOnInit() {
    this.subscription =  this.authService.me().subscribe(
      (data)=>{
       
        this.authService.userSubject.next(data);
    },(error)=>{
      localStorage.removeItem('token');
    });

    this.userSubjectSubscription = this.authService.userSubject.subscribe((data)=>{
      this.authService.user = data;
      this.role = this.authService.user.user_type;
    })
  }

}
