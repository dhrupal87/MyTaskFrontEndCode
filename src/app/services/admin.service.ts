import { Injectable } from '@angular/core';  
import { Http, RequestOptions , Headers } from '@angular/http';  
import { Observable } from 'rxjs';  
import { AdminDetail,AddTaskDetails,getId } from '../classes/admin-detail';  
import { Router } from '@angular/router';  
 

  
@Injectable({  
  providedIn: 'root'  
})  
export class AdminService {  
  
  // Base URL  
  private  baseUrl = "http://localhost:8086/api/";  
  
    
  
  constructor(private http: Http, private router : Router) { }  
  
  saveAdminDetails(adminDetail : AdminDetail) : Observable<any>  
  {  
      let url = this.baseUrl + "auth/signup";  
      return this.http.post(url,adminDetail);  
  }  
  
  addTask(addTaskDetails : AddTaskDetails) : Observable<any>
   {
    let url = this.baseUrl + "v1/task/addTask";
    return this.http.post(url,addTaskDetails);
  }

  approveTask(body :any): Observable<any>{
    let headers = new Headers();  
  
     

    headers.append('‘Access-Control-Allow-Origin' , 'http://localhost:8080/engine-rest');  
    let url = "http://localhost:8080/engine-rest/process-definition/key/TaskWorkflow/start";
    return this.http.post(url,body);
  }
  rejectTask(body :any): Observable<any>{
  
    let url = "http://localhost:8080/engine-rest/process-definition/key/TaskWorkflow/start";
    return this.http.post(url,body);
  }
  login(adminDetail : AdminDetail) : Observable<any>  
  {  
      let url = this.baseUrl + "auth/signin";  
      return this.http.post(url, adminDetail);  
  }  
  
  logout()   
  {   
    // Remove the token from the localStorage.  
    localStorage.removeItem('token');  
  
    this.router.navigate(['']);  
  
  }  
  
  /* 
  * Check whether User is loggedIn or not. 
  */  
  
  // isLoggedIn() {   
  //   let jwtHelper = new JwtHelperService();  
  //   let token = localStorage.getItem('token');  
  //   if(!token)  
  //   {  
  //     return false;  
  //   }  
  
  //   if(token)  
  //   {  
  //     let expirationDate = jwtHelper.getTokenExpirationDate(token);  
  
  //     let isExpired = jwtHelper.isTokenExpired(token);  
  
  //     return !isExpired;      
  //   }     
  // }  
    
    
  getUserDetail() : Observable<any>  
  {  
      let url = this.baseUrl + "v1/task/getAllTask";  
  
     
      let headers = new Headers();  
  
      let token = localStorage.getItem('token');  
  
      headers.append('Authorization' , 'Bearer ' + token);  
  
      let options = new RequestOptions( { headers : headers } );  
  
      return this.http.get(url , options);  
  }  
    
} 