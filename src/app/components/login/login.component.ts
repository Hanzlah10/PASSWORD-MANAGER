import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordManagerService } from 'src/app/services/password-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isFailure: boolean = false;

  constructor(private passwordManagerService : PasswordManagerService, private router: Router){}


  onSubmit(val:any){
    this.passwordManagerService.login(val.email,val.password).then(()=>{
      this.router.navigate(['/site-list'])
    })
    .catch((err)=>{
      console.log(err)
      this.isFailure = true
    })
  }

}
