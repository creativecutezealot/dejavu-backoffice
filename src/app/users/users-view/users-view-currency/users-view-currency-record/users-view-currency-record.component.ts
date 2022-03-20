import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';

import { CurrencyType } from 'src/app/models/currency-type/currency-type.model';
import { UserCurrencyResult } from 'src/app/models/user-currency/user-currency-result.model';
import { UserCurrency } from 'src/app/models/user-currency/user-currency.model';
import { UsersViewCurrencyService } from '../users-view-currency.service';

@Component({
  selector: 'app-users-view-currency-record',
  templateUrl: './users-view-currency-record.component.html',
  styleUrls: ['./users-view-currency-record.component.css']
})
export class UsersViewCurrencyRecordComponent implements OnInit {
  @Input('currency_type') currency_type: CurrencyType;
  @Output('close') close = new EventEmitter<null>();
  @Input('user') user;
  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: UserCurrency[];
  method: string;
  data_form: FormGroup;
  onProgress = false;
  isMaxLoad = false;
  selectedData: UserCurrency;
  filter_form: FormGroup;
  q = "";
  remaining_balance: number;
  total_debit: number;
  total_credit: number;
  coreService:CoreService;
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: UsersViewCurrencyService,
    private cs: CoreService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.coreService = this.cs;
  }


  ngOnInit() {

    this.filter_form = new FormGroup({
      'q': new FormControl(this.q)
    });
   // this.loadData();
   // this.loadBalance();

  }

  loadBalance() {
    this.dataService.getBalance(this.user._id).subscribe(resp => {
      this.remaining_balance = resp.remaining;
      this.total_credit = resp.total_credit;
      this.total_debit = resp.total_debit;
    });
  }

  loadData() {

    this.onProgress = true;
    this.subscription = this.dataService.get(this.user._id, this.currency_type._id, 1).subscribe(
      (resp) => {
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        this.onProgress = false;
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


  onSave() {
    if (!this.onProgress) {
      this.onProgress = true;
      let form_data = this.data_form.value;
      if (this.method == "edit") {
        form_data._id = this.selectedData._id;
      }
      this.dataService.submit(this.user._id, form_data).subscribe((data) => {


        if (data.success == true) {
          this.loadBalance();
          this.subscription = this.dataService.get(this.user._id, this.currency_type._id, 1).subscribe(
            (resp) => {

              this.onProgress = false;
              this.modalService.dismissAll();

              if (this.method == "add") {
                this.cs.showAlertAutoClose("success", "You have successfully added new item");
              } else {
                this.cs.showAlertAutoClose("success", "You have successfully updated item");
              }
              this.loadData();
            },
            (error) => {
              this.onProgress = false;
            });
        } else {
          this.onProgress = false;
          this.cs.showAlertInline = false;
          this.cs.showAlertAutoClose("danger", data.message);
        }


      }, (error) => {

        this.onProgress = false;
        this.cs.alert.type = "danger";
        if (error.message) {
          this.cs.alert.message = error.error;
        } else {
          this.cs.alert.message = error.error.message;
        }
        this.cs.showAlertAutoClose();
      });
    }

  }//end

  ngOnDestroy() {

    this.dataSubjectSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }


  onCancel() {
    this.modalService.dismissAll();
  }

  onAdd(content) {
    this.openModal('add', content);
  }

  openModal(sec, content) {

    if (sec == 'add') {
      this.method = 'add';
      this.data_form = new FormGroup({
        'type': new FormControl("", Validators.required),
        'amount': new FormControl("", Validators.required),
        'description': new FormControl("", Validators.required),
      });
    }


    if (sec == "edit") {
      this.method = 'edit';
      this.data_form = new FormGroup({
        'type': new FormControl(this.selectedData.type, Validators.required),
        'amount': new FormControl(this.selectedData.amount, Validators.required),
        'description': new FormControl(this.selectedData.description, Validators.required),
      });
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }//end
  onSelect(data: UserCurrency, content) {

    this.selectedData = data;
    this.openModal('edit', content);
  }


  onSearch(event) {
    this.onProgress = true;
    this.subscription = this.dataService.get(this.user._id, this.currency_type._id, 1, event.target.value).subscribe(
      (resp) => {
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        this.onProgress = false;
      },
      (error) => {
        this.onProgress = false;
      });

  }
  onLoadMore() {
    if (this.dataService.page < this.dataService.total_page) {
      this.onProgress = true;
      this.dataService.page++;
      this.dataService.get(this.user._id, this.currency_type._id, this.dataService.page, this.q).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new UserCurrencyResult(
            this.dataService.total_result,
            this.dataService.total_page,
            this.dataService.page,
            this.dataService.data
          ));
        }, (error) => {
          this.onProgress = false;

        }
      )

    }//end
  }

  onBack() {
    this.close.next(null);
  }

}
