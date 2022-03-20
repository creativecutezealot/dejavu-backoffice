import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
import { CoreService } from '../core/core.service';
import { UsersResult } from '../models/users/users-result.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: User[];
  onProgress = false;
  isMaxLoad = false;
  method: string = "add";
  data_form: FormGroup;
  selectedData: User;

  filter_form: FormGroup;
  q = "";
  coreService:CoreService;
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: UsersService,
    private cs: CoreService,
    private router:Router
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
  }

  loadData() {
    this.onProgress = true;
    this.subscription = this.dataService.get().subscribe(
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

  ngOnDestroy() {
    this.dataSubjectSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  onAdd(content) {
    this.openModal('add', content);
  }

  openModal(sec, content) {

    if (sec == 'add') {
      this.method = 'add';
      this.data_form = new FormGroup({
        'user_type': new FormControl("", Validators.required),
        'first_name': new FormControl("", Validators.required),
        'last_name': new FormControl("", Validators.required),
        'display_name': new FormControl("", Validators.required),
        'status': new FormControl("", Validators.required),
        'password': new FormControl("", Validators.required),
        'email': new FormControl("", [Validators.required, Validators.email]),
      });
    }


    if (sec == "edit") {
      this.method = 'edit';
      this.data_form = new FormGroup({
        'user_type': new FormControl(this.selectedData.user_type, Validators.required),
        'first_name': new FormControl(this.selectedData.first_name, Validators.required),
        'last_name': new FormControl(this.selectedData.last_name, Validators.required),
        'display_name': new FormControl(this.selectedData.display_name, Validators.required),
        'status': new FormControl(this.selectedData.status, Validators.required),
        'email': new FormControl(this.selectedData.email, [Validators.required, Validators.email])
      });
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }//end

  onSelect(data: User, content) {

    this.selectedData = data;
    this.openModal('edit', content);
  }

  onSave() {
    if (!this.onProgress) {
      this.onProgress = true;
      let form_data = this.data_form.value;
      if (this.method == "edit") {
        form_data._id = this.selectedData._id;
      }
      this.dataService.submit(form_data).subscribe((data) => {
        if(data.success){
          this.subscription = this.dataService.get().subscribe(
            (resp) => {
              this.onProgress = false;
              this.modalService.dismissAll();
              this.coreService.showAlertInline = true;
              if (this.method == "add") {
                this.coreService.showAlertAutoClose("success", "You have successfully added new item");
              } else {
                this.coreService.showAlertAutoClose("success", "You have successfully updated item");
              }
              this.loadData();
            },
            (error) => {
              this.onProgress = false;
            });
        }else{
          this.onProgress = false;
          this.coreService.showAlertInline = false;
          this.coreService.showAlertAutoClose("danger", data.message+": "+this.data_form.get('email').value);
        }
       
      }, (error) => {
        this.onProgress = false;

        if (error.message) {
          this.coreService.showAlertAutoClose("danger", error.error);
        } else {
          this.coreService.showAlertAutoClose("danger", error.error.message);
        }
      });
    }

  }//end
  onCancel() {
    this.modalService.dismissAll();
  }


  deleteItem(item, content) {
    this.selectedData = item;
    this.openModal('delete', content);
  }

  onDelete() {
    if (!this.onProgress) {
      this.onProgress = true;
      this.dataService.delete(this.selectedData).subscribe(
        (data) => {
          this.dataService.get().subscribe(
            (resp) => {

              this.onProgress = false;
              this.modalService.dismissAll();
              this.coreService.showAlertAutoClose("success", "You have successfully deleted the record");

              this.dataService.data = resp.data;
              this.dataService.dataSubject.next(resp);

            }, (error) => {
              this.onProgress = false;


              if (error.message) {
                this.coreService.showAlertAutoClose("danger", error.error);
              } else {

                this.coreService.showAlertAutoClose("danger", error.error.message);
              }
            });


        }, (error) => {
          this.onProgress = false;
          if (error.message) {
            alert(error.error);
          } else {
            alert(error.error.message);
          }

        });
    }
  }


  onSearch(event) {
    this.onProgress = true;
    this.subscription = this.dataService.get(1, event.target.value).subscribe(
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
      this.dataService.get(this.dataService.page, this.q).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new UsersResult(
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
  }//end form

  onViewUser(user:User){
    this.router.navigate(["/admin/users/view",user._id]);
  }

}
