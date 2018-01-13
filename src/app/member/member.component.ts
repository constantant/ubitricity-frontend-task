import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: [ './member.component.css' ]
})
export class MemberComponent implements OnInit, OnDestroy {

  @Input()
  member: IMember;

  @Input()
  isTeamLead = false;

  get title(): 'Mr.' | 'Ms.' {
    if (!this.member) {
      return;
    }

    return this.member.gender === 'F' ? 'Ms.' : 'Mr.';
  }

  get skills(): ISkill[] {
    if (!this.member) {
      return [];
    }

    return Object.keys(this.member.skills)
      .map((name: string) => ({name, level: this.member.skills[ name ]}))
      .sort((s1: ISkill, s2: ISkill) => s1.level > s2.level ? -1 : 1);
  }

  private _dataSubscription: Subscription;

  constructor(private _companyService: CompanyService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this._activatedRoute.snapshot.params.memberId) {
      return;
    }

    this._dataSubscription = this._activatedRoute.params.switchMap(() => this._companyService.getMember(
      this._activatedRoute.snapshot.parent.params.departmentId,
      this._activatedRoute.snapshot.params.memberId
    )).subscribe((member: IMember) => this.member = member);
  }

  ngOnDestroy() {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
    }
  }

}
