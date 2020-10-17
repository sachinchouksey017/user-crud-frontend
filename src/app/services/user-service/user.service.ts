import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../http_service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl
  constructor(private httpService: HttpService) { }
  login(data) {
    return this.httpService.postService(data, `${this.baseUrl}login`)

  }
  create(data) {
    return this.httpService.postService(data, `${this.baseUrl}user`)
  }
  update(data) {
    return this.httpService.postService(data, `${this.baseUrl}userUpdate`)
  }
  forgot(data) {
    return this.httpService.postService(data, `${this.baseUrl}forgotPassword`)
  }
  resetPassword(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.postService(data, `${this.baseUrl}resetPassword`, true, httpOptions)
  }

  getAllUser() {
    return this.httpService.getService(`${this.baseUrl}user`)

  }
  updateProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.postService(data, `${this.baseUrl}productUpdate`, true, httpOptions)

  }
  deleteUser(data) {
    return this.httpService.deleteService(`${this.baseUrl}user?userId=${data.userId}`)

  }
  uploadFile(data) {
    console.log('in upload', data);

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'token': lo
    //   })

    return this.httpService.postService(data, `${this.baseUrl}profile`)
  }
}
