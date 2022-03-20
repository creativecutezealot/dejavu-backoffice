import { Component, OnInit, Input } from '@angular/core';
import { UsersBalance } from 'src/app/models/users-balance/users-balance.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersViewPointsService } from './users-view-points.service';
import { CoreService } from 'src/app/core/core.service';
import { UsersBalanceResult } from 'src/app/models/users-balance/users-balance-result.model';
import { AppService } from 'src/app/app-service';

@Component({
  selector: 'app-users-view-points',
  templateUrl: './users-view-points.component.html',
  styleUrls: ['./users-view-points.component.css']
})
export class UsersViewPointsComponent implements OnInit {
  @Input('data') user;
  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: UsersBalance[];
  method: string;
  data_form: FormGroup;
  onProgress = false;
  isMaxLoad = false;
  selectedData: UsersBalance;
  filter_form: FormGroup;
  q = "";
  remaining_balance: number;
  total_debit: number;
  total_credit: number;
  coreService:CoreService;
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: UsersViewPointsService,
    private cs: CoreService,
    private appService:AppService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.coreService = this.cs;
  }


  ngOnInit() {

    this.filter_form = new FormGroup({
      'q': new FormControl(this.q)
    });
    this.loadData();
    this.loadBalance();

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
    this.subscription = this.dataService.get(this.user._id, 1).subscribe(
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


        if(data.success==true){
          this.loadBalance();
          this.subscription = this.dataService.get(this.user._id, 1).subscribe(
            (resp) => {
  
              this.onProgress = false;
              this.modalService.dismissAll();
  
              if (this.method == "add") {
               
                this.coreService.showAlertAutoClose("success", "You have successfully added new item");
              } else {
               
                this.coreService.showAlertAutoClose("success", "You have successfully updated item");
              }
              this.appService.socket.emit("send_data_to_user",{type:"force_reload_bets",user:this.user});
            
              this.loadData();
            },
            (error) => {
              this.onProgress = false;
            });
        }else{
          this.onProgress = false;
         this.coreService.showAlertInline = false;
          this.coreService.showAlertAutoClose("danger", data.message);
        }


      }, (error) => {

        this.onProgress = false;
        this.coreService.alert.type = "danger";
        if (error.message) {
          this.coreService.alert.message = error.error;
        } else {
          this.coreService.alert.message = error.error.message;
        }
        this.coreService.showAlertAutoClose();
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
  onSelect(data: UsersBalance, content) {

    this.selectedData = data;
    this.openModal('edit', content);
  }


  onSearch(event) {
    this.onProgress = true;
    this.subscription = this.dataService.get(this.user._id, 1, event.target.value).subscribe(
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
      this.dataService.get(this.user._id, this.dataService.page, this.q).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new UsersBalanceResult(
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

}
