import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Players } from '../models/players/players.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayersService } from './players.service';
import { PlayersResult } from '../models/players/players-result.model';
import { CoreService } from '../core/core.service';
import { PlayEntriesService } from '../play-entries/play-entries.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: Players[];

  onProgress = false;
  isMaxLoad = false;
  selectedData: Players;
  filter_form: FormGroup;
  q = "";
  coreService;
  selectedItem: any;
  itemForm: FormGroup;
  teams: any;
  selectedTeam: any;

  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: PlayersService,
    private cs: CoreService,
    private playerService: PlayersService,
    private pe: PlayEntriesService
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
    this.getTeams();
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

  onResync() {
    this.onProgress = true;
    this.coreService.loading = true;
    this.dataService.resync().subscribe(resp => {
      this.coreService.loading = false;
      this.loadData();
    })
  }//end

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
          this.dataService.dataSubject.next(new PlayersResult(
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

  addItem(content) {
    this.openModal('add', content);
  }

  editItem(item, content) {
    this.selectedItem = item;
    this.openModal('edit', content);
  }

  method: String = "add";
  openModal(sec, content) {
    console.log(sec)
    if (sec == 'add') {
      this.method = 'add';
      this.itemForm = new FormGroup({
        'key': new FormControl("", Validators.required),
        'first_name': new FormControl("", Validators.required),
        'last_name': new FormControl("", Validators.required),
        'jersey': new FormControl(""),
        'position': new FormControl(""),
        'image': new FormControl("")
      });
    }

    if (sec == 'edit') {
      this.method = 'edit';
      this.selectedTeam = this.teams[this.teams.findIndex(x => x.Key == this.selectedItem.Team)]
      this.itemForm = new FormGroup({
        'id': new FormControl(this.selectedItem._id, Validators.required),
        'key': new FormControl(this.selectedItem.Team, Validators.required),
        'first_name': new FormControl(this.selectedItem.FirstName, Validators.required),
        'last_name': new FormControl(this.selectedItem.LastName, Validators.required),
        'jersey': new FormControl(this.selectedItem.Jersey),
        'position': new FormControl(this.selectedItem.Position),
        'image': new FormControl(this.selectedItem.PhotoUrl)
      });
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }

  get fc() { return this.itemForm.controls }

  onSave() {
    if (this.itemForm.invalid) {

    } else {
      if (this.method == 'add') {
        let data = {
          team: this.selectedTeam.TeamID,
          first_name: this.fc.first_name.value,
          last_name: this.fc.last_name.value,
          jersey: this.fc.jersey.value,
          position: this.fc.position.value,
          key: this.selectedTeam.Key,
          image: this.fc.image.value
        }

        this.playerService.saveItem(data).subscribe(r => {
          if (r["status"] == "success") {
            this.coreService.showAlertAutoClose("success", "You have successfully added new item");
            this.loadData();
            this.modalService.dismissAll();

          } else {
            this.coreService.showAlertAutoClose("danger", r["message"]);
          }
        }, error => {
          console.log(error)
          this.coreService.showAlertAutoClose("danger", error["error"]["message"]);
        })
      } else if (this.method == 'edit') {
        console.log(this.selectedTeam)
        let data = {
          id: this.fc.id.value,
          team: this.selectedTeam.TeamID,
          first_name: this.fc.first_name.value,
          last_name: this.fc.last_name.value,
          jersey: this.fc.jersey.value,
          position: this.fc.position.value,
          key: this.selectedTeam.Key,
          image: this.fc.image.value
        }
        console.log(data.id)

        this.playerService.updateItem(data).subscribe(r => {
          if (r["success"]) {
            this.coreService.showAlertAutoClose("success", "You have successfully updated the item");
            this.loadData();
            // this.modalService.dismissAll();

          } else {
            this.coreService.showAlertAutoClose("danger", r["message"]);
          }
        }, error => {
          console.log(error)
          this.coreService.showAlertAutoClose("danger", error["error"]["message"]);
        })
      }
    }
  }

  deleteItem(item, content) {
    this.selectedItem = item;
    this.openModal('delete', content);
  }

  onDelete() {
    if (!this.onProgress) {
      this.onProgress = true;
      this.playerService.deleteItem(this.selectedItem._id).subscribe(
        (r) => {
          if (r["status"] == "success") {
            this.coreService.showAlertAutoClose("success", "You have successfully deleted an item");
            this.loadData()
            this.modalService.dismissAll()
          }
        }, (error) => {
          if (error.message) {
            alert(error.error);
          } else {
            alert(error.error.message);
          }

        }).add(() => {

          this.onProgress = false;
        });
    }
  }

  getTeams() {
    this.pe.getTeams().subscribe(r => {
      this.teams = r;
    })
  }

  selectTeam(e) {
    this.selectedTeam = this.teams[this.teams.findIndex(x => x.Key == e.target.value)]
  }

}
