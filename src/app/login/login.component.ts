import { Component, OnInit } from '@angular/core';  
import { FormGroup, Validators, FormControl } from '@angular/forms';  
import { AdminDetail } from '../classes/admin-detail';  
import { AdminService } from '../services/admin.service';  
import { Router } from '@angular/router';  
  
@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']  
})  
export class LoginComponent implements OnInit {  
  
  private adminDetail = new AdminDetail();  
  
  constructor(private adminService : AdminService, private router : Router) { }  
  
  ngOnInit() {  
    // if((this.adminService.isLoggedIn()) )  
    // {  
    //     this.router.navigate(['/profile' , localStorage.getItem('id')]);  
    // }  
    // else  
    // {  
    //     this.router.navigate(['/login']);  
    // }  
  }  
  
  // create the form object.  
  form = new FormGroup({  
    email : new FormControl('' , Validators.required),  
    password : new FormControl('' , Validators.required)  
  });  
  
  Login(LoginInformation)  
  {  
      this.adminDetail.username = this.Email.value;  
      this.adminDetail.password = this.Password.value;  
  
      this.adminService.login(this.adminDetail).subscribe(  
        response => {  
            let result =  response.json();  
              
            if(result != null)  
            {  
              let token = response.headers.get("Authorization");  
  
              localStorage.setItem("token" , token);   
           
              localStorage.setItem("email",result.email);
              if(result.roles.length != 0){
                localStorage.setItem("roles",result.roles[0].roles);
              }
             
              this.router.navigate(['/profile']);
            }  
           else
            {  
              alert("please register before login Or Invalid combination of Email and password");  
            }  
             
        },  
        error => {  
            console.log("Error in authentication");  
        }  
      );  
  }  
  
  get Email(){  
      return this.form.get('email');  
  }  
  
  get Password(){  
      return this.form.get('password');  
  }  
  
}  