import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import {CrudService} from "../crud.service";
import {PhoneModel} from "../phone-model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-phone-record',
  templateUrl: './phone-record.component.html',
  styleUrls: ['./phone-record.component.less']
})
export class PhoneRecordComponent implements OnInit {
  record$ :Observable<PhoneModel>;
  title: string;
  name: string;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSubmit(form) {
    // TODO: Use EventEmitter with form value
    if (!form.valid) return;

    if (this.name) {
      this.crudService.update(this.name, form.value)
        .subscribe(
          response => {
            this.router.navigate(['..'])
          },
          error => {
            console.error(error);
          }
        );
    } else {
      this.crudService.add(form.value)
        .subscribe(
          response => {
            this.router.navigate(['..'])
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.name = name;
      this.title = 'Edit record';
      this.record$ = this.crudService.get(name);
    } else {
      this.title = 'Add new record';
      this.record$ = this.crudService.new();
    }

  }

}
