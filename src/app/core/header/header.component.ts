import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showAccountMenu = false;
  subscription = new Subscription();
  userSubjectSubscription = new Subscription();
  constructor(private authService: AuthService,private renderer: Renderer2,) { }
  name = "";
  ngOnInit() {
   this.subscription =  this.authService.me().subscribe(
      (data)=>{
       
        this.authService.userSubject.next(data);
    },(error)=>{
      localStorage.removeItem('token');
    });
    this.userSubjectSubscription = this.authService.userSubject.subscribe((data)=>{
      this.authService.user = data;
      this.name = this.authService.user.first_name;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
   
  }


  onShowAccountMenu(){
   
    if(this.showAccountMenu==false){
      this.renderer.addClass(document.getElementById("account-menu-dropdown"),"show");
      this.showAccountMenu  = true;
    }else{
      this.showAccountMenu = false;
      this.renderer.removeClass(document.getElementById("account-menu-dropdown"),"show");
    }
  }
  onSignOut(){
  
    this.authService.signOutUser();
    
  }
}
