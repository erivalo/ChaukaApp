<template>
  <div id="app">
    <body>
      <div class="notification-header">Notifications:</div>
      <invitation-list :invitations="invitations"> </invitation-list>
      <div class="n-go-back" onclick=" window.location.href = '#/MainPage';">
        <div class="go-back-icon"></div>
        <div class="go-back-text">Home</div>
      </div>
    </body>
  </div>
</template>

<script>
import InvitationList from './InvitationList.vue';
import mockedContacts from './users.mock.js';
import EventBus from './event-bus.js';
import UserService from './userService.js';
export default {
  name: 'app',
  components: {
    InvitationList
  },
  data () {
    return {
      invitations: [],
    }
  },
  methods: {
  },
  created() {
    this.$http({
      url: `http://localhost:2399/api/users/${UserService.getInfo().Id}/participations/userStatus/Pending/meetings`,
      method: 'get',                  
    })
    .then(InvitationsList => {                    
      this.invitations = InvitationsList.body;
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

.notification-header {
  width: 100%;
  height: 10%;
  color: #EE9C00;
  font-size: 25px;
  padding-top: 20px;
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
</style>