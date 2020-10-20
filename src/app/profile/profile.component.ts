import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTaskDetails,getId } from '../classes/admin-detail';  
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public adminId;
  public haveData = 0;

  public data = [];
  userId = 'demo';

  public dataRequest = false;
  private AddTaskDetails = new AddTaskDetails(); 
  private getId = new getId(); 
  constructor(public adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // if((this.adminService.isLoggedIn()) )  
    // {  
    //   this.route.paramMap.subscribe(params => {  
    //     this.adminId =+ params.get('adminId');  
    //   });  
    // }  
    // else  
    // {  
    //     this.router.navigate(['/login']);  
    // }  

  }
  addTask(TaskDetails) {
    if(TaskDetails !== ""){
      this.AddTaskDetails.taskDescription = TaskDetails;
      this.AddTaskDetails.isApprove = false;
      this.AddTaskDetails.isRejected=false;
      this.AddTaskDetails.roles = localStorage.getItem("roles");
      console.log(this.AddTaskDetails.email)
      this.AddTaskDetails.email=localStorage.getItem("email");
      console.log(this.AddTaskDetails.email+ "email "+localStorage.getItem("email"))
    this.adminService.addTask(this.AddTaskDetails).subscribe(
      response => {
      
          if(response != ""){
            alert("task added");
            this.getAdminData();
          }

      },
      error => {
       alert("Please check network");
      }
    );
    }else{
      alert("Please add task description ")
    }
  }
  approveTask(e){
    this.getId.id = e.target.name;
    console.log(e.target.name);
    


  let bodyrequest= {
      "variables": {
  "AP": {
      "value": true,
      "type": "Boolean"
  },
  
  "taskId": {
      "value": this.getId.id,
      "type": "string"
  },
  "userid": {
      "value": this.userId,
      "type": "string"
  }
  }
  };
    this.adminService.approveTask(bodyrequest).subscribe(
      response => {
      
          if(response != ""){
            alert("Task Approved");
          }

      },
      error => {
        alert("Please check network");
      }
    );
  }
  rejectedTask(e){
   
    console.log(e.target.name);
    let bodyrequest= {
      "variables": {
  "AP": {
      "value": false,
      "type": "Boolean"
  },
  
  "taskId": {
      "value": this.getId.id,
      "type": "string"
  },
  "userid": {
      "value": this.userId,
      "type": "string"
  }
  }
  };
    this.adminService.rejectTask(bodyrequest).subscribe(
      response => {
      
          if(response != ""){
            alert("Task Rejected");
          }

      },
      error => {
        alert("Please check network");
      }
    );
  }
  getAdminData() {
    this.haveData = 0;

    this.dataRequest = true;
    var arr = [];
    this.adminService.getUserDetail().subscribe(
      response => {
        let result = response.json();
// && task.email === localStorage.getItem("email")
        arr = result.filter(task => task.roles === localStorage.getItem("roles"));
        console.log(arr);
        this.data = arr;
        if (result === " ") {
          this.haveData = 0;
        }
        else {
          this.haveData = this.haveData + 1;
        }
      },
      error => {
        console.log("error while getting User Data");
      }
    );
  }

} 