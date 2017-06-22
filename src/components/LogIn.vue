<template>
  <div class="container">
    <div class="login-form col-md-4 col-md-offset-4">          
      <div class="form-group row">
        <div class="logo-app"></div>
      </div>
      <div class="row">                  
        <div class="form-group">         
            <input class="user-mail form-control" type="text" placeholder="Email" id="iu-emailFriend" v-model="userEmail" maxlength="50" pattern="[a-zA -Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@gmail.com" @keyup.enter="logInUser">              
        </div>          
      </div>
      <div class="row">        
        <button class="btn logIn col-md-4 col-md-offset-4" @click="logInUser" >Log In</button>
      </div>
    </div>
  </div>  
</template>
<script>
import UserService from './userService.js';
export default {
  data () {
    return {
     userName: '',
     userEmail: '',
    }
  },
  methods: {
    logInUser() {  
      if(document.getElementById("iu-emailFriend").validity.valid && this.userEmail!= "") {  
        var userObject = {
          Name: this.userName,
          Email: this.userEmail,
        }
        this.$http({
          url: `http://localhost:2399/api/Users`,
          method: 'post',
          body: userObject,
          headers: {                    
            'Content-Type' : 'application/json'          
          }
        })
        .then(response => {      
          UserService.setInfo(response.body);  
          window.location.href = "http://localhost:8081/#/MainPage";
          var logo = document.getElementById("logo");
          logo.style.display = "block";
          var profile = document.getElementById("profile");
          profile.style.display = "block";
          var notifications = document.getElementById("notifications");
          notifications.style.display = "block";
          var signout = document.getElementById("menu");
          signout.style.display = "block";
          this.userName = response.body.Email.split("@")[0];
        })
        .catch(function (err) {
          console.log(err)        
        });
      }
      else {
        var element = document.getElementById("user-pop-up");
        element.innerHTML = "Invalid e-mail, use a google account";
        element.style.color = "red";
        setTimeout(function(){ element.style.color = "#F1F2F1"; }, 2000);
      }     
    }
  },
  mounted () {
    var logo = document.getElementById("logo");
    logo.style.display = "none";
    var profile = document.getElementById("profile");
    profile.style.display = "none";
    var notifications = document.getElementById("notifications");
    notifications.style.display = "none";
    var signout = document.getElementById("menu");
    signout.style.display = "none";
  }
}
</script>

<style scoped>

.container {
  height: 100%;
  width: 100%;
}

.login-form {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.logo-app {    
  height: 53px;
  width: 299px;
  background: url('../assets/chauka.png');
  margin: 0 auto;  
}
.logIn {
  /*height: 5%;
  width: 20%;
  top: 60%;
  left: 40%;*/
  font-size: 20px;
  border-radius: 8px;
}

.logIn:hover {  
  background-color: #CD6427;
  border: 1px solid black;
  color: white;
}
</style>
