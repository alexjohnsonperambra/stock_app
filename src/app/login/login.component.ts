import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  strUserName = '';
  strPassword = '';

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    let dctData ={
      username: this.strUserName,
      password: this.strPassword
    }
    this.serverService.postData('auth',dctData).subscribe(res=>{
      console.log(res,'response');
      if(res['status']==1){
        let lst: any[]
        lst =[]
        localStorage.setItem('lstStock',JSON.stringify(lst))
        this.router.navigate(['/home'])
      }
      else{
        Swal.fire('Error',res['reason'],'error');
      }
    })
    
  }

}
