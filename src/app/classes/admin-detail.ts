export class AdminDetail {  
    email : string;  
    username : string;  
    password : string ;  
    roles : string;  
} 

export class AddTaskDetails {
    taskDescription:String;
    isApprove:boolean;
    isRejected:boolean;
    roles:String;
    email:String;

}

export class getId{
    id:Int16Array;
}