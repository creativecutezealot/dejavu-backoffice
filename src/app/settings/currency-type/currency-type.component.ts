import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { CurrencyTypeResult } from 'src/app/models/currency-type/currency-type-result.model';
import { CurrencyType } from 'src/app/models/currency-type/currency-type.model';
import { CurrencyTypeService } from './currency-type.service';

@Component({
  selector: 'app-currency-type',
  templateUrl: './currency-type.component.html',
  styleUrls: ['./currency-type.component.css']
})
export class CurrencyTypeComponent implements OnInit {

  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: CurrencyType[];

  onProgress = false;
  isMaxLoad = false;
  method: string = "add";
  data_form: FormGroup;
  selectedData: CurrencyType;
  filter_form: FormGroup;
  q = "";
  coreService:CoreService
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: CurrencyTypeService,
    private cs: CoreService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
      this.coreService  = this.cs;
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

  ngOnDestroy() {

    this.dataSubjectSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  onAdd(content) {
    console.log("on Progress: "+this.onProgress)
    this.openModal('add', content);
  }

  openModal(sec, content) {

    if (sec == 'add') {
      this.method = 'add';
      this.data_form = new FormGroup({
        'name': new FormControl("", Validators.required)

      });
    }


    if (sec == "edit") {
      this.method = 'edit';
      this.data_form = new FormGroup({
        'name': new FormControl(this.selectedData.name, Validators.required)
      });
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }//end

  onSelect(data: CurrencyType, content) {

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

        this.subscription = this.dataService.get().subscribe(
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
      this.dataService.acrhive(this.selectedData).subscribe(
        (data) => {
          this.dataService.get().subscribe(
            (resp) => {

              this.onProgress = false;

              this.cs.showAlertAutoClose("success", "You have successfully deleted the record");
              this.modalService.dismissAll();


              this.dataService.data = resp.data;
              this.dataService.dataSubject.next(resp);

            }, (error) => {
              this.onProgress = false;

              if (error.message) {
                this.cs.showAlertAutoClose("danger", error.error);
              } else {
                this.cs.showAlertAutoClose("danger", error.error.message);
              }
            });


        }, (error) => {
          this.onProgress = false;
          if (error.message) {
            this.cs.showAlertAutoClose("danger", error.error);
          } else {
            this.cs.showAlertAutoClose("danger", error.error.message);
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
          this.dataService.dataSubject.next(new CurrencyTypeResult(
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
