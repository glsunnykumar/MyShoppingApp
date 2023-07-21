import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit{
   
    isSubmitted = false;
    loginFormGroup : FormGroup  ;
    authError =false;
    authMessage ='Invalid User Credentional';
    constructor(private formBuilder : FormBuilder ,
        private authService :AuthService,
        private localstorageservice :LocalstorageService,
        private router :Router
        ){
      
    }
    ngOnInit(): void {
       this._initLoginForm();
    }

    private _initLoginForm(){
        this.loginFormGroup = this.formBuilder.group({
            email :['',[Validators.required,Validators.email]],
            password :['',Validators.required]
        })
        
    }

    onLogin(){
        this.isSubmitted = true;
        if(this.loginFormGroup.invalid){
            return;
        }

        const loginData ={
            email : this.loginForm['email'].value,
            password : this.loginForm['password'].value
        }

        this.authService.login(loginData.email,loginData.password).subscribe(
            {
                next :(user) =>{
                    this.authError = false;
                    this.localstorageservice.setToken(user.token);
                    this.router.navigateByUrl('/');
                },
                error :(err :HttpErrorResponse) =>{
                    console.log('error returned');
                    this.authError = true;
                    switch(err.status){
                        case 404 : this.authMessage = 'user not found';
                        break;
                        case 400 :this.authMessage = 'invalid credentails';
                        break;
                        default :this.authMessage = 'server error try later';
                        break;
                    }
                }
            }
        )
    }

    get loginForm(){
        return this.loginFormGroup.controls;
    }
  
}
