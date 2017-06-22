<template>
  <div id="app">
    <div class="nav-bar">
      <div class="left">
        <div class="logo" id = "logo"><a href="#/MainPage"></a></div>
      </div>
      <div class="middle"></div>
      <div class="right">
        <div class="create-profile" id = "profile" onclick=" window.location.href = '#/CreateMeeting';">
          <div class="profile-text">Create Meeting</div>
          <div class="profile-icon"></div>
        </div>
        <div class="notifications" id = "notifications" onclick=" window.location.href = '#/Notifications';">
          <div class="notification-text">Notifications</div>
          <div class="notification-icon"></div>
        </div>
        <div class="profile-menu" id="menu">
          <div class="profile-menu-picture"></div>
          <div class="profile-menu-text" id= "profile-name"></div>
          <div class="profile-menu-icon"></div>
          <div class="sign-out" id = "sign-out" @click="signOut"><p>Sign Out</p></div>
        </div>
      </div>
    </div>
    <div class="content" id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MoveSimulator from './components/MoveSimulator.js';
export default {
  name: 'app',
  methods: {
    signOut() {
      window.location.href = "http://172.20.56.12:8081/#";
    }
  },
  created ()
  {
    MoveSimulator.meetingInfo();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.nav-bar {
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  background-color: #CD6427;
  z-index: 10;
  box-sizing: border-box;
}

.left {
  position: relative;
  height: 100%;
  width: 25%;
  float: left;
}

.logo {
  position: relative;
  background-image: url(./assets/chaukaWhite.png);
  background-size: 100% 100%;
  height: 55%; 
  width: 65%;
  float: left;
  margin-left: 45px;
  margin-right: 10px;
  margin-top: 8px;
  margin-bottom: 5px;
  display: block;
}

.logo a {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
}

.middle {
  position: relative;
  height: 80%;
  width: 25%;
  float: left;
  margin-top: 6px;
}

.right {
  position: relative;
  height: 80%;
  width: 50%;
  float: left;
  margin-top: 6px;
}

.create-profile {
  position: relative;
  width: 30%;
  height: 100%;
  float: left;
  cursor: pointer;
  display: block;
}

.profile-text {
  width: 70%;
  height: 100%;
  float: left;
  margin-top: 10px;
  font-size: 16px;
}

.profile-icon {
  width: 20%;
  height: 100%;
  float: left;
  background-image: url(./assets/createmeeting.png);
  background-size: 60%;
  background-repeat: no-repeat;
  margin-top: 8px;
}

.notifications {
  position: relative;
  width: 30%;
  height: 100%;
  float: left;
  margin-left: 15px;
  cursor: pointer;
  display: block;
}

.notification-text {
  width: 70%;
  height: 100%;
  float: left;
  margin-top: 10px;
  font-size: 16px;
}

.notification-icon {
  width: 20%;
  height: 100%;
  float: left;
  background-image: url(./assets/notifications.png);
  background-size: 60%;
  background-repeat: no-repeat;
  margin-top: 5px;
  margin-left: -10px;
}

.profile-menu {
  position: relative;
  width: 30%;
  height: 100%;
  float: left;
  margin-left: 15px;
  cursor: pointer;
  display: block;
  font-size: 18px;
  text-align: center;
}

.profile-menu:hover .sign-out {
  display: block;
}

.profile-menu-picture {
  width: 20%;
  height: 100%;
  float: left;
  background-image: url(./assets/profilePicture.png);
  background-size: 110%;
  background-repeat: no-repeat;
  margin-top:-5px;
}

.profile-menu-text {
  width: 50%;
  height: 100%;
  float: left;
  margin-top: 10px;
  font-size: 16px;
}

.profile-menu-icon {
  width: 20%;
  height: 100%;
  float: left;
  background-image: url(./assets/arrowDown.png);
  background-size: 60%;
  background-repeat: no-repeat;
  margin-top: 10px;
}

.sign-out {
  height: 50px;
  width: 80%;
  position: absolute;
  top: 38px;
  right: 30px;
  background-color: #CD6427;
  display: none;
  color: white;
}

.sign-out p {
  margin-top: 10px;
  font-size: 18px;
  color: white;
}

.sign-out:hover {
  cursor: pointer;
  background-color: #F1F2F1;
  border: 1px solid #CD6427;
}

.sign-out:hover p {
  color: #CD6427;
}

.content {
  position: absolute;
  background-color: #F1F2F1;
  width: 100%;
  height: calc(100% - 50px);
  top: 50px;
  float: left;
  color: black;
  overflow-y: auto;
  overflow-x: hidden;
}

@media (max-width: 1050px) {
  .profile-text {
    font-size: 15px;
  }

  .notification-text {
    font-size: 15px;
  }

  .profile-menu-text {
    font-size: 15px;
  }
}

</style>