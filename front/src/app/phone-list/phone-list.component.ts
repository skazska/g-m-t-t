import { Component, OnInit } from '@angular/core';
import {CrudService} from "../crud.service";
import {PhoneModel} from "../phone-model";

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.less']
})
export class PhoneListComponent implements OnInit {
  phones = null;
  error = null;
  status = "data";
  loadingIndicator = false;

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.loadingIndicator = true;
    this.getList();
  }

  getList() {
    this.crudService.list().subscribe(
      phones => {
        this.phones = phones;
        this.loadingIndicator = false;
      },
      error => {
        this.status = 'error';
        this.error = error;
        this.loadingIndicator = false;
      }
    );
  }

  erase(event: Event, phone :PhoneModel) :void {
    event.stopPropagation();
    if (phone.remove) {
      this.crudService.delete(phone.name).subscribe(
        () => {
          this.getList();
        },
        error => {
          console.error(error);
        }
      )
    } else {
      phone.remove = true;
    }
  }
}
