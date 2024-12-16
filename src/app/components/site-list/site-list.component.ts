import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from 'src/app/services/password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {
siteName !: string
siteUrl  !: string
siteImgUrl  !: string
siteId !: string
formState : string = "Add New"
allSites !: Observable<Array<any>>
isSuccess: boolean = false
alertmsg :string = "Data Saved !" 

constructor(private passwordManagerService: PasswordManagerService){
    this.loadSites()
}



onSubmit(f: any) {
if (this.formState == "Add New"){

  this.passwordManagerService.addSite(f).then(()=>{
    this.isSuccess = true
    console.log(f)
  
 
  })
  .catch((err)=>{
    console.log(err)
  })
}
else if(this.formState == "Edit")
  this.passwordManagerService.updateSite(this.siteId,f).then(()=>{
    this.isSuccess = true
    
  })
  .catch((err)=>{
    console.log(err)
  })
}



loadSites(){
  this.allSites = this.passwordManagerService.loadSites()
  }

editSites(siteId :string,siteName :string,siteUrl :string,siteImgUrl :string){
  // this.passwordManagerService.updateSite(idSite ,this.siteName ,this.siteUrl ,this.siteImgUrl )
  this.siteName = siteName
  this.siteUrl = siteUrl
  this.siteImgUrl = siteImgUrl
  this.siteId = siteId
  this.formState = "Edit"
  
  
}
deleteSites(siteId:string){
  this.passwordManagerService.deleteSite(siteId)
  this.alertmsg = "Data Deleted !"
  this.isSuccess = true

}
cancel(){
  this.formState = "Add New"
  
}


}
