import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: [ './department.component.css' ]
})
export class DepartmentComponent implements OnInit {

  department: IDepartment;
  members: IMember[];
  showLeaderInfo = true;

  constructor(private _companyService: CompanyService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this._activatedRoute.url.subscribe(() => {
      this.showLeaderInfo = !this._activatedRoute.children.length;
    });
    this._activatedRoute.params.switchMap(({departmentId}) => Observable.forkJoin(
      this._companyService.getDepartment(departmentId),
      this._companyService.getMembers(departmentId)
    )).subscribe((data: [ IDepartment, IMember[] ]) => {
      const [ department, members ] = data;

      this.department = department;
      members.unshift(department.teamLeader);
      this.members = members;
    });
  }

}
