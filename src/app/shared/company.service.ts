import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  private _host = environment.restApiEndpoint;

  constructor(private _http: HttpClient) {
  }

  getCompany(): Observable<ICompany> {
    return this._http.get<ICompany>(
      `${this._host}/company`);
  }

  getDepartments(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(
      `${this._host}/company/departments`
    );
  }

  getDepartment(departmentId: string): Observable<IDepartment> {
    return this._http.get<IDepartment>(
      `${this._host}/company/departments/${departmentId}`
    );
  }

  getMembers(departmentId: string): Observable<IMember[]> {
    return this._http.get<IMember[]>(
      `${this._host}/company/departments/${departmentId}/members`
    );
  }

  getMember(departmentId: string, memberId: string): Observable<IMember> {
    return this._http.get<IMember>(
      `${this._host}/company/departments/${departmentId}/members/${memberId}`
    );
  }

  postMember(departmentId: string, member: IMember): Observable<IMember> {
    return this._http.post<IMember>(
      `${this._host}/company/departments/${departmentId}/members`,
      member
    );
  }

  getSkills(departmentId: string, memberId: string): Observable<IMember> {
    return this._http.get<IMember>(
      `${this._host}/company/departments/${departmentId}/members/${memberId}/skills`
    );
  }

  putSkills(departmentId: string, memberId: string, skills: ISkills): Observable<IMember> {
    return this._http.put<IMember>(
      `${this._host}/company/departments/${departmentId}/members/${memberId}/skills`,
      skills
    );
  }

  deleteSkills(departmentId: string, memberId: string, skills: ISkills): Observable<IMember> {
    return this._http.delete<IMember>(
      `${this._host}/company/departments/${departmentId}/members/${memberId}/skills`,
      skills
    );
  }

}
