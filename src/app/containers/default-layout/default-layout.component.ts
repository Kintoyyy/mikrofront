import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { loginChecker } from '../../providers/login_checker';
import { User } from '../../providers/mikrowizard/user';
import { navItems } from './_nav';
import { dataProvider } from '../../providers/mikrowizard/data';
import { arch } from 'os';
import { DomSanitizer } from '@angular/platform-browser';
import { disconnect } from 'process';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;
  public current_user: User;
  public uid: number;
  public uname: string;
  public fname: string;
  public lname: string;
  public ispro: boolean=false;
  public action: string="password";
  public UserProfileModalVisible:boolean;
  public ConfirmModalVisible:boolean;
  public error:any=false;
  public currentStep:number=1;
  public qrCode:any=false;
  public totpCode:string='';
  public errorMessage:any=false;
  public data:any={};
  public timer:any;
  public password:any={
    'cupass':'',
    'pass1':'',
    'pass2':''
  };

  public passvalid:any={
    'cupass':false,
    'pass1':false,
    'pass2':false
  };
  version=require('../../../../package.json').version;

  constructor(
    private router: Router,
    private login_checker: loginChecker,
		private data_provider: dataProvider,
    private _sanitizer: DomSanitizer

  ) {
    var _self = this;
    var session_info: string = localStorage.getItem('current_user') || "[]";
    this.current_user = JSON.parse(session_info);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (!this.login_checker.isLoggedIn()) {
          setTimeout(function () {
            _self.router.navigate(['login']);
          }, 100);
        }
      }
    });
  }

  otpwizard(step:number){
    var _self=this;
    if(step==1){
      if(this.qrCode)
        this.currentStep=2;
      else
        this.currentStep=3;
    }
    if(step==2){
      this.currentStep=3;
    }
    if(step==3){
      if(this.qrCode!=false)
        this.data_provider.mytotp('enable',this.totpCode).then(res => {
          if(res['status']=='success'){
            _self.UserProfileModalVisible = false;
          }
          else{
            this.errorMessage=res['err'];
          }
        });
      else
        this.data_provider.mytotp('disable',this.totpCode).then(res => {
          if(res['status']=='success'){
            _self.UserProfileModalVisible = false;
          }
          else{
            this.errorMessage=res['err'];
          }
        });
    }
  }

  password_changed(variable:string,value:any){
    var _self=this;
    this.password[variable]=value;
        if(this.password['pass1']==this.password['pass2']){
      _self.passvalid['pass2']=true;
    }
    else{
      _self.passvalid['pass2']=false;
    }
  }
  
  show_user_modal(action:string){
    this.currentStep=1;
    this.errorMessage=false;
    this.totpCode='';
    this.qrCode=false;
    this.action=action;
    if(action=='otp')
      this.data_provider.mytotp('enable').then(res => {
        if(res['status']=='success'){
          this.currentStep=1;
          this.qrCode=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ res.otp);
          this.UserProfileModalVisible = true;
        }
        else{
          this.qrCode=false;
          this.currentStep=1;
          this.UserProfileModalVisible = true;

          this.errorMessage=res['err'];
        }
      });
    else
      this.UserProfileModalVisible = true;
  }
  show_confirm_modal(data:any){
    this.data={};
    if (data.action=='CancelTask'){
      this.action=data.action;
      this.data=data.data;
      console.dir(this.data);
      console.dir(this.action);
      //disable submit button
      this.data['SubmitDisable']=false;
      this.ConfirmModalVisible = true;
    }
    if (data.action=='update'){
      this.action='update';
      this.data={};
      this.ConfirmModalVisible = true;
    }
  }
  ConfirmAction(){
    var _self=this;
    if(this.action=='CancelTask'){
      this.data_provider.stop_task(this.data['signal']).then(res => {
        //disable submit button
        if(res['status']=='success'){
          setTimeout(function () {
            _self.ConfirmModalVisible = false;
          }, 5000);
        }
        this.data['SubmitDisable']=true;
        //wait 5 seconds before hiding the modal
      })
    }
    if(this.action=='update'){
       window.location.href = window.location.href.replace(/#.*$/, '')
    }
  }
  submit(){
    var _self=this;
    if(!_self.passvalid['pass2']){
      return;
    }
    this.data_provider.change_password(this.password['cupass'], this.password['pass1']).then(res => {
        if(res['status']=='success'){
          _self.logout();
          setTimeout(function () {
            _self.router.navigate(['login']);
          }, 100);
        }
        else{
          _self.error=res['err'];
        }
      },
      (err) => {
        console.dir(err);
      }
    );
  }


  get_user_info() {
    var _self = this;
    this.uid = this.current_user.partner_id;
    this.uname = this.current_user.name;
    this.fname = this.current_user.firstname;
    this.lname = this.current_user.lastname;
  }

  logout() {
    this.data_provider.logout();
  }

  ngOnInit(): void {
    var _self = this;
    this.get_user_info();
    this.data_provider.getSessionInfo().then((res) => {
      _self.ispro=res['ISPRO']
      _self.navItems=_self.navItems.filter((item:any) => {
        if (item.attributes){
          if('free' in item.attributes && _self.ispro){
            return ;
          }
          else if('pro' in item.attributes && _self.ispro){
            return item;
          }
          else if('pro' in item.attributes && !_self.ispro){
            return ;
          }
          else
            return item;
      }
      else{
          return item;
      }
      });
    });
    // check first time after 10 seconds
    setTimeout(function(){
      _self.data_provider.get_front_version().then((res:any) => {
        if(res['version']!=_self.version){
          console.log("New version is available. Please refresh the page.");
          _self.show_confirm_modal({action:'update'});
          // window.location.href = window.location.href.replace(/#.*$/, '');
        }
      });
    }, 10000);
    // check for new version every 5 seconds
    this.timer=setInterval(function(){
        _self.data_provider.get_front_version().then((res:any) => {
          if(res['version']!=_self.version){
            console.log("New version is available. Please refresh the page.");
            _self.show_confirm_modal({action:'update'});
            // window.location.href = window.location.href.replace(/#.*$/, '');
          }
        });
    }, 60000);
    
  }
  clearTimer() {
     clearInterval(this.timer); 
     this.ConfirmModalVisible = false;
    }
  
}
