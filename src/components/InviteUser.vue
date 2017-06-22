<template>
  <div id="app">
    <div class="iu-add-friends">
      <div class="pop-up" id="pop-up"></div>
      <div class="iu-top">
        <div class="search-icon"></div>
        <p>Select an email:</p>
        <select v-model="email" >
          <option >Choose an email</option>
          <option  v-for="(user, index) in users">{{user.Email}}</option>
        </select>
      </div>
      <div class="iu-bottom">
        <button class="iu-add" @click="sendInvitation"> ADD </button>
      </div>
    </div>
    <div class="n-go-back" onclick=" window.location.href = '#/MainPage';">
      <div class="go-back-icon"></div>
      <div class="go-back-text">Home</div>
    </div>
  </div>
</template>

<script>
import UserService  from './userService.js';
import MeetingService from './meetingService.js';
export default {
  name: 'app',
  data () {
    return {
      email: '',
      meetingId: '',
      users: [],
      userId: ''
    }
  },
  methods: {
    getId (currentEmail) {
      return this.users.find(x => x.Email == currentEmail).Id;
    },
    createInvitation (email) {    
      var invitationObject = {
        Email: this.email,
        MeetingId: MeetingService.getInfo(),
        UserId: this.getId(this.email),
        UserStatus: "Pending"
      };
      console.log(invitationObject)
      this.$http({
        url: `http://localhost:2399/api/Participations`,
        method: 'post',
        body: invitationObject,
        headers: {                    
          'Content-Type' : 'application/json'          
        }
      })
      .then(response => {       
        var element = document.getElementById("pop-up");
        element.innerHTML = "Invitation sent";
        element.style.color = "#008000";
        setTimeout(function(){ element.style.color = "#F1F2F1"; }, 2000);
      })
      .catch(function (err) {
       /* alert("You already invited that user");*/
        var element = document.getElementById("pop-up");
        element.innerHTML = "User already invited to this meeting";
        element.style.color = "red";
        setTimeout(function(){ element.style.color = "#F1F2F1"; }, 2000);
      })
    },
    sendInvitation () {
      this.createInvitation(this.email);
    }
  },
  created () {
    this.$http({
      url: `http://localhost:2399/api/Users`,
      method: 'get',                  
    })
    .then(userList => {                     
      var currentUserEmail = UserService.getInfo().Email;
      this.users = userList.body.filter(x => x.Email !== currentUserEmail);        
    }) 
  },
  updated () {
    var pname = document.getElementById("profile-name");
    var navName = (UserService.getInfo().Email.split('@')[0]);
    console.log(navName);
    console.log(navName.length);

    if (navName.length > 10) {
      pname.innerHTML = navName.substring(0, 10); 
    }
    else {
      pname.innerHTML = navName;
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  overflow: hidden; 
  margin: 0px;
}

p {
  font-size: 25px;
  color: black;
  margin-top: 10px;
  margin-left: 2%;
}

select {
  width: 60%;
  height: 25%;
  color: black;
}

.search-icon {
  width: 70%;
  height: 50%;
  background-image: url(./../assets/searchEmail.png);
  background-size: 15% 100%;
  background-repeat: no-repeat;
  float: left;
  margin-top: 5px;
  margin-left: 250px;
}

.iu-top {
  height: 50%;
  width: 100%;
  box-sizing: border-box;
  float: left;
}

.iu-bottom {
  height: 50%;
  width: 100%;
  box-sizing: border-box;
  float: left;
  margin-top: 50px;
}

.iu-add-friends{
  width: 40%;
  height: 30%;
  margin-top: 10%;
  margin-left: 30%;
  margin-bottom: 10%;
}

.iu-emailFriend {
  width: 80%;
  height: 40%;
  margin-left: 10%;
  margin-top: 5%;
  box-sizing: border-box;
}

.iu-add {
  margin-top: 35px;
  margin-left: 12px;
  width: 20%;
  height: 40%;
  border-radius: 30px;
  background-color: #EE9C00;
  font-size: 15px;
  color: #F1F2F1;
}

.iu-add:hover {
  cursor: pointer;
  background-color: #CD6427 ;
  color: #F1F2F1;
}

.n-go-back {
  float: left;
  width: 10%;
  height: 5%;
  position: absolute;
  left: 15%;
  top: 5%;
}

.n-go-back:hover {
  cursor: pointer;
}

.go-back-icon {
  width: 20%;
  height: 100%;
  float: left;
  background-image: url(./../assets/goBack.png);
  background-size: 80%;
  background-repeat: no-repeat;
}

.go-back-text {
  width: 60%;
  height: 100%;
  float: left;
  color: #EE9C00;
  font-size: 20px;
  text-align: left;
}

.pop-up {
  width: 200px;
  height: 35px;
  margin-left: 33%;
  float:left;
}

</style>

