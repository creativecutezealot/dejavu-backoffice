import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { CurrencyType } from 'src/app/models/currency-type/currency-type.model';
import { CurrencyTypeService } from 'src/app/settings/currency-type/currency-type.service';

@Component({
  selector: 'app-users-view-currency',
  templateUrl: './users-view-currency.component.html',
  styleUrls: ['./users-view-currency.component.css']
})
export class UsersViewCurrencyComponent implements OnInit {

  @Input('data') user;
  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  isMaxLoad = false;
  onProgress:boolean= false;
  data: CurrencyType[];
  is_currency_view  = false;
 selected_currency_type: CurrencyType;
  constructor( private dataService: CurrencyTypeService,
    private cs: CoreService ) { 

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.onProgress = true;
    this.subscription = this.dataService.get().subscribe(
      (resp) => {
        this.onProgress = false;
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        
      },
      (error) => {
        this.onProgress = false;
      });

    this.dataSubjectSubscription = this.dataService.dataSubject.subscribe((resp) => {

      this.data = resp.data;
      this.dataService.total_page = resp.total_page;
      this.dataService.total_result = resp.total_result;
      this.dataService.page = resp.page;
      if (this.dataService.total_page == 0) {
        this.isMaxLoad = true;
      } else {
        if (this.dataService.page == this.dataService.total_page) {
          this.isMaxLoad = true;
        } else {
          this.isMaxLoad = false;
        }
      }
    });
  }


  onViewCurrency(item){
      this.selected_currency_type = item;
      this.is_currency_view = true;
  }

  onLoadMore(){
    
  }

  onClose(){
    this.is_currency_view = false;
  }

}
