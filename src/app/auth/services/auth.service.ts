import { Injectable } from '@angular/core';
import { PersistanceService } from '../../common/services/persistance.service';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SignInResponseInterface } from '../models/sign-in-response.model';
import { AuthCredentialsDtoInterface } from '../models/auth-dto.model';
import { UserInterface } from '../models/user.model';
import { ProfileDtoInterface } from '../models/profile.dto';
import { GetUsersListResponseInterface } from '../models/get-users-response.interface';
import { StatusCodeEnum } from '../models/status.enum';
import { UserRolesEnum } from '../models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistance: PersistanceService,
  ) { }

  public get isLoggedIn() {
    return of(Boolean(this.persistance.getItem('accessToken')));
  }

  public signUp(authCredentials: AuthCredentialsDtoInterface) {
    return this.http.post(`${environment.backendUrl}/auth/sign-up`, {
      username: authCredentials.username,
      password: authCredentials.password,
    });
  }

  public logIn(
    authCredentials: AuthCredentialsDtoInterface,
  ): Observable<SignInResponseInterface> {
    return this.http.post<SignInResponseInterface>(
      `${environment.backendUrl}/auth/sign-in`,
      authCredentials,
    );
  }
  public logOut() {
    this.persistance.removeItem('accessToken');
  }

  public getCurrentUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(
      `${environment.backendUrl}/auth/current-user`,
    );
  }

  public getUser(username: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(
      `${environment.backendUrl}/auth/user/${username}`,
    );
  }

  public patchProfile(
    username: string,
    profileDto: ProfileDtoInterface,
  ): Observable<UserInterface> {
    return this.http.patch<UserInterface>(
      `${environment.backendUrl}/auth/edit-profile/${username}`,
      profileDto,
    );
  }

  public patchCurrentProfile(
    profileDto: ProfileDtoInterface,
  ): Observable<UserInterface> {
    return this.http.patch<UserInterface>(
      `${environment.backendUrl}/auth/edit-current-profile`,
      profileDto,
    );
  }

  public updateRole(
    username: string,
    role: UserRolesEnum,
  ): Observable<UserInterface> {
    return this.http.put<UserInterface>(
      `${environment.backendUrl}/auth/update-role/${username}`,
      {
        role,
      },
    );
  }

  public changePassword(
    username: string,
    password: string,
  ): Observable<{ status: StatusCodeEnum }> {
    return this.http.patch<{ status: StatusCodeEnum }>(
      `${environment.backendUrl}/auth/edit-password/${username}`,
      {
        password,
      },
    );
  }

  public changeCurrentPassword(
    password: string,
  ): Observable<{ status: StatusCodeEnum }> {
    return this.http.patch<{ status: StatusCodeEnum }>(
      `${environment.backendUrl}/auth/edit-current-password`,
      {
        password,
      },
    );
  }

  public getUsersList(page: number): Observable<GetUsersListResponseInterface> {
    return this.http.get<GetUsersListResponseInterface>(
      `${environment.backendUrl}/auth/users`,
      {
        params: {
          page,
        },
      },
    );
  }
}
