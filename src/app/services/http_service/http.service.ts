import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // interViewUrl='http://192.168.0.194:8000/';
  constructor(private http: HttpClient) { }


  postService(payload: any = null, url: string = '', tokenRequired: boolean = false, httpOptions = null) {
    /* handles post operations
      params : id  : id of question or comment to add/post,
      apiendpoint : endpoint i.e 'comments/' , 'answers/', 'editquestions/'
  */

    return this.http.post(url, payload, tokenRequired && httpOptions);
  }

  patchService(url, payload: any = null, tokenRequired: boolean = false, httpOptions = null) {
    /* handles edit/patch operations
  params : id  : id of question or comment to edit,
          apiendpoint : endpoint i.e 'comments' , 'answers'
  id attached as url param.
  */
    return this.http.patch(url, payload, tokenRequired && httpOptions);
  }

  deleteService(url: string = '', tokenRequired: boolean = false, httpOptions = null) {
    /* handles delete operations
  params : id  : id of question or comment to delete,
          apiendpoint : endpoint i.e 'comments' , 'answers'
  id attached as url param.
  */
    return this.http.delete(url, tokenRequired && httpOptions);
  }
  getService(url: string = '', tokenRequired: boolean = false, httpOptions = null) {
    /* handles api calls for get request */
    return this.http.get(url, tokenRequired && httpOptions);
  }

}
