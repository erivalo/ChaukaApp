<template>
  <div class="mp-list">
    <div class="mp-headers">
      <div class="mp-event">
        <a>Events</a>
      </div>
      <div class="mp-hour">
        <a>Hrs</a>
      </div>
    </div>
    <MeetingList :meetings="meetings"></MeetingList>
    <MeetingList :meetings="acceptMeetings"></MeetingList>
  </div>
</template>

<script>
import MeetingList from './MeetingList.vue';
import UserService from './userService.js';
export default {
  components : {
    MeetingList
  },
  data () {
    return {
      meetings: [],
      acceptMeetings : []
    }
  },
  mounted () {
    var userInfo = document.getElementById("profile-name");
    this.$http({
      url: `http://localhost:2399/api/users/${UserService.getInfo().Id}/participations/userStatus/Creator/meetings`,
      method: 'get',                  
    })
    .then(meetingsList => {                     
      this.meetings = meetingsList.body; 
      this.$http({
        url: `http://localhost:2399/api/users/${UserService.getInfo().Id}/participations/userStatus/Accepted/meetings`,
        method: 'get',                  
      })
      .then(acceptedMeetings => {                     
        this.acceptMeetings =  acceptedMeetings.body;
      })          
    }) 
  },
  created () {
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

<style scoped>

.mp-list {
  width: 100%;
  height: 90%;
}

.mp-headers{
  width: 100%;
  height: 5%;
  margin-top: 30px;
}

.mp-event {
  width: 50%;
  height: 100%;
  float: left;
}

.mp-event a{
  font-size: 25px;
  color: #CD6427;
}

.mp-hour {
  width: 30%;
  height: 100%;
  float: left;
}

.mp-hour a{
  font-size: 25px;
  color: #CD6427;
}
</style>