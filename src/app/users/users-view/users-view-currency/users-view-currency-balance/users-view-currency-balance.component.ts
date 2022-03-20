import { Component, Input, OnInit } from '@angular/core';
import { CurrencyType } from 'src/app/models/currency-type/currency-type.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-view-currency-balance',
  templateUrl: './users-view-currency-balance.component.html',
  styleUrls: ['./users-view-currency-balance.component.css']
})
export class UsersViewCurrencyBalanceComponent implements OnInit {
  @Input('item') item: CurrencyType;
  @Input('user') user: User;
  constructor() { }

  ngOnInit() {
    

  }

}
