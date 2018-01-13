import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: [ './company.component.css' ]
})
export class CompanyComponent implements OnInit {

  company: ICompany;
  departments: IDepartment[];
  showSquares = true;

  constructor(private _companyService: CompanyService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit() {
    this._router.events.subscribe(() => this._updateSquares());
    Observable.forkJoin(
      this._companyService.getCompany(),
      this._companyService.getDepartments()
    ).subscribe((data: [ ICompany, IDepartment[] ]) => {
      const [ company, departments ] = data;

      this.company = company;
      this.departments = departments;
    });
    this._updateSquares();
  }

  private _updateSquares() {
    this.showSquares = !this._activatedRoute.children.length;
  }

}
