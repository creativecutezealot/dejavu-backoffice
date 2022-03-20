import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  onProgress = false;
  IsShowAlert  = false;
  alertMessage = "";
  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router) { 
    if(this.authService.isAuthenticated()){
      this.router.navigate(["/admin/dashboard"])
    }
    
  }

  ngOnInit() {
    this.renderer.addClass(document.body,'signin');
    this.signInForm = new FormGroup({
      'email': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)
    })
   
  }
  ngOnDestroy(){
    this.renderer.removeClass(document.body,'signin');
  }

  onSignIn(){
    if(!this.onProgress){
    this.authService.siginInUser(this.signInForm.get('email').value,this.signInForm.get('password').value).subscribe(
      (response: {message:'',auth:false,token:'',success:false,user: User})=>{

        if(response.success==false){
          this.onProgress = false;
          this.IsShowAlert = true;
          this.alertMessage = response.message;
        }else{
          this.authService.token = response.token;
          localStorage.setItem("token",response.token);
          localStorage.setItem("auth_user_id",response.user._id);
          this.authService.user = response.user;
          this.onProgress  = false;
          this.IsShowAlert = false;
          this.router.navigate(["/admin/dashboard"]);
        }
        
        
      },
      (error)=>{
        this.onProgress = false;
        this.IsShowAlert = true;
        this.alertMessage = error.error.message;
         
      }
  );
    this.onProgress = true;
    
    }
  }

}
