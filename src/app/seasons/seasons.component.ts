import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Seasons } from '../models/seasons/seasons.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeasonsService } from './seasons.service';
import { SeasonsResult } from '../models/seasons/seasons-result.model';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: Seasons[];

  onProgress = false;
  isMaxLoad = false;
  selectedData: Seasons;
  filter_form: FormGroup;
  q = "";
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: SeasonsService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
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


  onCancel() {
    this.modalService.dismissAll();
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
          this.dataService.dataSubject.next(new SeasonsResult(
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
