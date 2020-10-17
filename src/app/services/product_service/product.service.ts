import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http_service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl
  constructor(private httpService: HttpService) { }
  getAllProduct() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.getService(`${this.baseUrl}product`, true, httpOptions)
  }
  shortByDate() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.getService(`${this.baseUrl}sortByDate`, true, httpOptions)
  }
  getProductByCategory(categoryName) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.getService(`${this.baseUrl}product/${categoryName}`, true, httpOptions)
  }
  getAllCategory() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.getService(`${this.baseUrl}category`, true, httpOptions)

  }
  saveCategory(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.postService(data, `${this.baseUrl}category`, true, httpOptions)

  }
  saveProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.postService(data, `${this.baseUrl}product`, true, httpOptions)

  }

  updateProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.postService(data, `${this.baseUrl}productUpdate`, true, httpOptions)

  }
  deleteProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    }
    return this.httpService.deleteService(`${this.baseUrl}product?productId=${data.productId}`, true, httpOptions)

  }
}
