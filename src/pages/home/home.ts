import { Component } from '@angular/core';
import { Facebook, NativeStorage, GooglePlus } from 'ionic-native';
import { NavController, LoadingController,AlertController } from 'ionic-angular';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
  }

  doFbLogin(){
    let permissions = new Array();
    let nav = this.navCtrl;
    let env = this;
    permissions= ["public_profile"];
    Facebook.login(permissions).then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();
      Facebook.api("/me?fields=name,email",params).then(function(user){
          user.picture="https://graph.facebook.com/"+userId+"/piture?type=large";
          NativeStorage.setItem('user',{
            name: user.name,
            email: user.email,
            picture: user.picture
          }).then(function(){
            nav.push(UserPage,user);
          },function(error){
            console.log(JSON.stringify(error));
          });
      },function(error){
        console.log(JSON.stringify(error));
      });
    },function(error){
      console.log(JSON.stringify(error));
    });
  }

  doGoogleLogin(){
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content:'Espere un momento'
    });
    loading.present();
    GooglePlus.login({
      'scopes':'',
      'webClientId':'589942987775-j70r69t4970o81vd3v7e8d3s93lik23l.apps.googleusercontent.com',
      'offline':true
    }).then(function(user){
      NativeStorage.setItem('user',{
            name: user.name,
            email: user.email,
            picture: user.picture
          }).then(function(){
            nav.push(UserPage,user);
          },function(error){
            console.log("El error1 fue: ",error);
          });
          
          loading.dismiss();

    },function(error){
      console.log("El error2 fue: ",error);
      loading.dismiss();
    });
  }

}
