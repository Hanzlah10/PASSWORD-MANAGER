import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AES , enc } from 'crypto-js';
import { PasswordManagerService } from 'src/app/services/password-manager.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId!:string
  siteName!:string
  siteUrl!:string
  siteImgUrl!:string
  allPass!: Array<any>;
  email!: string;
  name!: string;
  password!: string;
  formState:string = "Add New"
  id !: string;
  isSuccess: boolean = false
  alertmsg :string = "Data Saved !" 
  

  constructor(private route: ActivatedRoute, private passwordManagerService :PasswordManagerService){
    this.route.queryParams.subscribe((val:any)=>{
      this.siteId = val.siteId
      this.siteName = val.siteName
      this.siteUrl = val.siteUrl
      this.siteImgUrl = val.siteImgUrl
      // console.log(val)
    });
    this.loadPass()
  }
  
  onSubmit(data:any){
    const encryptedPassword = this.encryptPassword(data.password)
    data.password = encryptedPassword;

     
    if(this.formState == "Add New"){

      this.passwordManagerService.addPassword(data,this.siteId).then(()=>{
        // console.log("data saved!")
        this.isSuccess = true
        this.alertmsg = "Data Added"


      })
      .catch((err)=>{
        console.log(err)
        this.isSuccess = false

      });
    }
    else if(this.formState == "Edit"){
      this.passwordManagerService.editPassword(data,this.siteId,this.id).then(()=>{
        // console.log("data Edited!")
        this.alertmsg = "Data Edited"
        this.isSuccess = true

      })
      .catch((err)=>{
        // console.log(err)
        this.isSuccess = false
      });
    }
    }

  loadPass(){
   this.passwordManagerService.loadPassword(this.siteId).subscribe((val)=>{
          this.allPass = val
   })
  //  console.log(this.allPass)
  

  }

  editPass(id:string,email:string,name:string,password:string){
    this.email = email;
    this.password = password;
    this.name = name;
    this.id = id
    this.formState = "Edit";
    // console.log(this.id)

  }
  deletePass(id:string){
    this.passwordManagerService.deletePassword(this.siteId,id)
    this.isSuccess = true
    this.alertmsg="Data Deleted"

  }
  
  encryptPassword(password:string){
    const secretkey = "W[OCE`6X@wx<vI";
    const encryptedPassword = AES.encrypt(password,secretkey).toString()
    return encryptedPassword
  }
  decryptPassword(password:string,i:number){
    const secretkey = "W[OCE`6X@wx<vI";
    const decryptPassword = AES.decrypt(password,secretkey).toString(enc.Utf8)
    return this.allPass[i].password = decryptPassword
  }

  // delayedFunction(){
  //     this.formState = "Add New"
  //     console.log("running delayed")
  //     this.isSuccess = true
  //     this.alertmsg="Form State AddNew"

  // }
  // switchstate(){
  //   setTimeout(this.delayedFunction, 10);
  //   this.formState = "Add New"
  // }
}
