<template>
  <div class="inv-container">
    <div class="inv-top">
      <div class="inv-name">{{info.Name}}</div>
      <div class="inv-date">{{myDate}}</div>
      <div class="inv-time">Hrs {{Time}}</div>
    </div>
    <div class="inv-bottom">
      <button class="inv-accept" @click="acceptInvitation"> ACCEPT </button>
      <button class="inv-reject" @click="rejectInvitation"> REJECT </button>
    </div>
  </div>
</template>

<script>
import UserService from './userService.js';
export default {
  props: ['info'],
  data () {
    return {
      name: '',
      myDate: '',
      Time: ''
    }
  },
  methods: {
    acceptInvitation () {
      var invitationObject = {
        UserId: UserService.getInfo().Id,
        MeetingId: this.info.Id,
        UserStatus: "Accepted",
        ParticipationStatus: "Incoming",
        TrackingTypeId: 1
      }
      this.$http({
        url: `http://localhost:2399/api/users/${UserService.getInfo().Id}/participations/${this.info.Id}`,
        method: 'put',
        body: invitationObject,
        headers: {                    
          'Content-Type' : 'application/json'          
        }
      })
      .then(response => { 
        window.location.href = "http://localhost:8081/#/MainPage";     
      })
      .catch(function (err) {
        console.log(err)        
      })
    },
    rejectInvitation () {
      var invitationObject = {
        UserId: UserService.getInfo().Id,
        MeetingId: this.info.Id,
        UserStatus: "Rejected",
        ParticipationStatus: "Incoming",
        TrackingTypeId: 1
      }
      this.$http({
        url: `http://localhost:2399/api/users/${UserService.getInfo().Id}/participations/${this.info.Id}`,
        method: 'put',
        body: invitationObject,
        headers: {                    
          'Content-Type' : 'application/json'          
        }
      })
      .then(response => {     
        window.location.href = "http://localhost:8081/#/MainPage";       
      })
      .catch(function (err) {
        console.log(err)        
      })
    }
  },
  created () {
    var arrayOfStrings = this.info.DateTime.split('T');
    this.Time = arrayOfStrings[1];
    this.myDate = arrayOfStrings[0];
  }
}
</script>

<style>
.inv-container {
  width: 50%;
  height: 150px;
  margin-left: 20%;
  margin-top: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
}

.inv-container:hover {
  background-color: lightgray;
}

.inv-top {
  height: 50%;
  width: 80%;
  margin-left: 10%;
  box-sizing: border-box;
  float: left;
  font-size: larger;
  font-weight: bold;
}

.inv-bottom {
  height: 50%;
  width: 80%;
  margin-left: 10%;
  box-sizing: border-box;
  float: left;
}

.inv-name {
  width: 100%;
  height: 30%;
  margin-top: 2%;
  text-align: left;
  box-sizing: border-box; 
  float: left;
  color: #615D57;
  font-size: 25px;
}

.inv-date {
  width: 50%;
  height: 30%;
  margin-top: 2%;
  box-sizing: border-box; 
  float: left;
  color: #615D57;
  font-size: 20px;
  text-align: left;
}

.inv-time {
  width: 50%;
  height: 30%;
  margin-top: 2%;
  box-sizing: border-box; 
  float: left;
  color: #615D57;;
  font-size: 20px;
}

.inv-accept {
  width: 30%;
  height: 40%;
  margin-top: 5%;
  margin-left: 10%;
  box-sizing: border-box;
  float: left; 
  border-radius: 30px;
  background-color: #EE9C00;
  color: #F1F2F1;
  font-size: 15px;
}

.inv-reject {
  width: 30%;
  height: 40%;
  margin-top: 5%;
  margin-left: 5%;
  box-sizing: border-box;
  float: left; 
  border-radius: 30px;
  background-color: #EE9C00;
  font-size: 15px;
  color: #F1F2F1;
}

.inv-accept:hover {
  color: #F1F2F1;
  background-color: #CD6427;
}

.inv-reject:hover {
  color: #F1F2F1;
  background-color: #CD6427;
}
</style>
