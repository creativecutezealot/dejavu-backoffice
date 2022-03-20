import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {

  
  coreService:CoreService;
  constructor(private router: Router,private cs:CoreService) {
    this.coreService = this.cs;
    this.router.events
    .subscribe((event) => {
        if(event instanceof NavigationStart) {
            this.coreService.loading = true;
            this.coreService.isLoadingSubject.next(this.coreService.loading);
        }
        else if (
            event instanceof NavigationEnd || 
            event instanceof NavigationCancel
            ) {
              this.coreService.loading = false;
              this.coreService.isLoadingSubject.next(this.coreService.loading);
        }
    });

  }

  ngOnInit() {
  
  }


  closeAlert(){
    this.coreService.closeAlert();
  }

}
