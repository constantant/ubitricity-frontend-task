import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../shared';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: [ './member-form.component.css' ]
})
export class MemberFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  canUndo = false;

  private _dataSubscription: Subscription;
  private _history;

  constructor(private _companyService: CompanyService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (!this._activatedRoute.snapshot.params.memberId) {
      this._makeForm();
      return;
    }

    this._dataSubscription = this._activatedRoute.params.switchMap(() => this._companyService.getMember(
      this._activatedRoute.snapshot.parent.params.departmentId,
      this._activatedRoute.snapshot.params.memberId
    )).subscribe((member: IMember) => this._makeForm(member));
  }

  ngOnDestroy() {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
    }
  }

  save() {
    console.log(this.form.value);
    if (this.form.invalid) {
      console.log('fail!');
      return;
    }

    const departmentId = this._activatedRoute.snapshot.parent.params.departmentId;
    const {job, description, skills, gender, name} = this.form.value;
    const _skills = {};
    (skills as ISkill[]).forEach((skill: ISkill) => {
      _skills[ skill.name ] = skill.level;
    });

    if (this._activatedRoute.snapshot.data.isAddForm) {
      this._companyService.postMember(
        departmentId,
        {job, description, gender, name, skills: _skills}
      ).subscribe(() => {
        this._router.navigate([ `/${departmentId}` ]);
        console.log('POST is successful!');
      });
      return;
    }

    this._companyService.putMember(
      departmentId,
      this._activatedRoute.snapshot.params.memberId,
      {job, description, gender, name, skills: _skills}
    ).subscribe(() => {
      console.log('PUT is successful!');
    });
  }

  undo() {
    if (!this._history) {
      return;
    }

    const skillsForm = this.form.get('skills') as FormArray;
    const {name, gender, description, job, skills} = this._history;
    while (skillsForm.length !== 0) {
      skillsForm.removeAt(0);
    }

    this.form.setValue({name, gender, description, job, skills: []}, {
      emitEvent: false
    });

    (skills as ISkill[]).forEach((skill: ISkill) => this.addSkill(skill));
    this.canUndo = false;
  }

  addSkill(skill?: ISkill) {
    const skills = this.form.get('skills') as FormArray;
    if (!skill) {
      skills.push(this._makeSkillForm());
      return;
    }

    const {name, level} = skill;
    skills.push(this._makeSkillForm(name, level));
  }

  removeSkill(index: number) {
    const skills = this.form.get('skills') as FormArray;
    skills.removeAt(index);
  }

  private _makeForm(member: IMember = {name: '', gender: 'M', job: '', description: '', skills: {}}) {
    const skillsForm = this._formBuilder.array([]);
    const {name, gender, skills, description, job} = member;
    Object.keys(skills).forEach((key: string) => {
      skillsForm.push(this._makeSkillForm(key, skills[ key ]));
    });
    this.form = this._formBuilder.group({
      name: [ name, [
        Validators.required,
        Validators.maxLength(100)
      ] ],
      gender: [ gender, [
        Validators.required,
        Validators.maxLength(1),
        (c: AbstractControl) => [ 'F', 'M' ].indexOf(c.value) === -1 ? {error: 'Not match'} : null
      ] ],
      job: [ job, [
        Validators.required,
        Validators.maxLength(100)
      ] ],
      description: [ description, [
        Validators.maxLength(255)
      ] ],
      skills: skillsForm
    });

    this._history = this.form.value;
    this.form.valueChanges.subscribe(() => this.canUndo = true);
  }

  private _makeSkillForm(name: string = '', level: number = 0): FormGroup {
    return this._formBuilder.group({
      name: [ name, [
        Validators.required,
        Validators.maxLength(100)
      ] ],
      level: [ level, [
        Validators.required,
        (c: AbstractControl) => c.value > 100 || c.value < 0 ? {error: 'Not match'} : null
      ] ]
    });
  }

}
