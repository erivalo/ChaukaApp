<template>
  <div class="m-container">
    <div class="title">Meeting Description</div>
    <div class="m-left">
      <div class="m-info">
        <div class="info-container">
          <div class="m-name">
            <h3>Meeting name: {{currentMeeting.Name}}</h3>
          </div>
        </div>
        <div class="info-container">
          <div class="m-name">
            <h3>Date: {{myDate}}</h3>
          </div>
        </div>
        <div class="info-container">
          <div class="m-name">
            <h3>Time: {{Time}}</h3>
          </div>
        </div>
        <div class="info-container2">
          <div class="m-top">
            <div class="status-container">Status:
              <select v-model="State">
                <option value="Incoming">Incoming</option>
                <option value="In-the-place">in-the-place</option>
                <option value="Notcoming">not-coming</option>
              </select>
            </div>
          </div>
          <div class="status-update">
            <button class="s-update" @click="UpdateState">Update</button>
          </div>
          <div class="people-status">
            <div class="in-coming">In coming: {{usersInComing}}</div>
            <div class="in-the-place">In the place: {{usersInThePlace}}</div>
            <div class="not-coming">Not coming: {{usersNotComing}}</div>
          </div>
        </div>
      </div>
      <div class="n-go-back" onclick=" window.location.href = '#/MainPage';">
        <div class="go-back-icon"></div>
        <div class="go-back-text">Home</div>
      </div>
    </div>
    <div class="m-right">
      <meta name="viewport" content="initial-scale=1.0">
      <meta charset="utf-8">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import UserService  from './userService.js';
import MeetingService from './meetingService.js';
import MeetingInfo from './MeetingInfo.vue';
var latMeeting=0;
var lngMeeting=0;
var globals = '';

export default {
  components: {
    MeetingInfo
  },
  data () {
    return {
     currentMeeting: {
        UserId: '',
        Name: '',
        DateTime: '',
        Latitude: '',
        Longitude: ''
      },
      State: '',
      Time: '',
      myDate: '',
      usersInComing: '',
      usersNotComing: '',
      usersInThePlace: '',
      usersPositions: ''
    }
  },
  created () {
    var meetingId = MeetingService.getInfo();
    this.$http({
      url: `http://localhost:2399/api/Meetings/${meetingId}`,
      method: 'get',                  
    })
    .then(meeting => {                     
      this.currentMeeting = meeting.body;
      var arrayOfStrings = meeting.body.DateTime.split('T');
      this.Time = arrayOfStrings[1];
      this.myDate = arrayOfStrings[0];      
    });
    this.$http({
      url: `http://localhost:2399/api/participations/${meetingId}/ParticipationStatus/Incoming/users`,
      method: 'get',                  
    })
    .then(users => {                     
      this.usersInComing = users.body.length; 
    }); 
    this.$http({
      url: `http://localhost:2399/api/participations/${meetingId}/ParticipationStatus/Notcoming/users`,
      method: 'get',                  
    })
    .then(users => {                     
      this.usersNotComing = users.body.length;
    });
    this.$http({
      url: `http://localhost:2399/api/participations/${meetingId}/ParticipationStatus/In-the-place/users`,
      method: 'get',                  
    })
    .then(users => {                     
      this.usersInThePlace = users.body.length;
    });
    this.$http({
      url: `http://localhost:2399/api/UserLocations`,
      method: 'get',                  
    })
    .then(usersLocations => {                     
      this.usersPositions = usersLocations.body;
    });
  },
  http: {
    emulateJSON: true,
    emulateHTTP: true
  },
  methods: {
    initMap () {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.currentMeeting.Latitude, lng: this.currentMeeting.Longitude},
        zoom: 17
      });
       var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var marker = new google.maps.Marker({
          position: {
            lat: this.currentMeeting.Latitude,
            lng: this.currentMeeting.Longitude
          },
          map: map,
          icon: image,
          animation: google.maps.Animation.DROP,
        });
        
        var userMarker1 = new google.maps.Marker({
          position: {
            lat: this.usersPositions[1].Latitude,
            lng: this.usersPositions[1].Longitude
          },
          map: map,
          animation: google.maps.Animation.DROP,
        });
        console.log(this.usersPositions)
         var userMarker2 = new google.maps.Marker({
          position: {
            lat: this.usersPositions[2].Latitude,
            lng: this.usersPositions[2].Longitude
          },
          map: map,
          animation: google.maps.Animation.DROP,
        });

          var userMarker3 = new google.maps.Marker({
          position: {
            lat: this.usersPositions[3].Latitude,
            lng: this.usersPositions[3].Longitude
          },
          map: map,
          animation: google.maps.Animation.DROP,
        });
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
    },
    UpdateState() {
      var meetingId = MeetingService.getInfo();
      var invitationObject = {
        UserId: UserService.getInfo().Id,
        MeetingId: meetingId,
        UserStatus: "Accepted",
        ParticipationStatus: this.State,
        TrackingTypeId: 2
      }
      this.$http({
        url: `http://localhost:2399/api/users/${UserService.getInfo().Id}/participations/${meetingId}`,
        method: 'put',
        body: invitationObject,
        headers: {                    
          'Content-Type' : 'application/json'          
        }
      })
      .then(response => {     
        console.log(response)   
      })
      .catch(function (err) {
        console.log(err)        
      })
    }
  },
  beforeMount (){
    var me = this;
    setTimeout(function () {
      me.initMap();
    }, 500);  
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

.title {
  width: 100%;
  height: 10%;
  padding-top: 15px;
  font-size: 30px;
  color: #CD6427 ;
}

h3 {
  margin-top: 5px;
}

.m-container {
  width: 100%;
  height: 90%;
  box-sizing: border-box;
}

.m-right {
  width: 65%;
  height: 85%;
  box-sizing: border-box;
  float: left;
  box-sizing: border-box;
  border: 2px solid #F4C294;
}

.m-left {
  width: 30%;
  height: 85%;
  box-sizing: border-box;
  float: left;
}

#map {
  height: 100%;
  width: 100%;
  float: left;
  box-sizing: border-box;
}

.m-info {
  height: 90%;
  width: 80%;
  margin-right: 10%;
  float: right;
  box-sizing: border-box;
}

.m-name {
  height: 100%;
  width: 100%;
  float: left;
  box-sizing: border-box;
  text-align: left;
  padding-left: 2px;
}

.info-container {
  width: 100%;
  height: 12%;
  float: left;
  margin: 10px 10px 10px 10px;
}

.info-container2 {
  width: 100%;
  height: 25%;
  float: left;
  margin: 10px 10px 10px 10px;
  box-sizing: border-box;
  border: 2px solid #F4C294;
  font-size: larger;
  font-weight: bold;
}

.m-top {
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  float: left;
}

.status-update {
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  float: left;
}

.s-update {
  width: 25%;
  height: 50%;
  float: left;
  box-sizing: border-box;
  margin-left: 37%;
  border-radius: 30px;
  background-color: #EE9C00;
  font-size: 15px;
  margin-top: 15px;
}

.s-update:hover {
  cursor: pointer;
  background-color: #CD6427;
  color: #F1F2F1;
}

.status-container {
  width: 80%;
  height: 80%;
  margin-top: 5px;
  margin-left: 10%;
  float: left;
  box-sizing: border-box;
}

.status-container select{
  width: 80%;
  height: 50%;
}

.n-go-back {
  float: left;
  width: 10%;
  height: 5%;
  position: absolute;
  left: 4%;
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

.people-status {
  width: 100%;
  height: 130%;
  float: left;
  margin-top: 20px;
  box-sizing: border-box;
}

.in-coming {
  width: 100%;
  height: 33%;
  float: left;
  text-align: left;
}

.in-the-place {
  width: 100%;
  height: 33%;
  float: left;
  text-align: left;
}

.not-coming {
  width: 100%;
  height: 33%;
  float: left;
  text-align: left;
}
</style>