<template>
  <div class="cm-container">
    <div class="cm-title">Create Meeting:</div>
    <div class="form-meeting">
     <div class="form-container">
        <div class = "cm-name-section">
          <div class="cm-name-section-name">
            <p>Name:</p>
          </div>
          <div class="cm-name-section-text">
            <input type="text" v-model = "nameMeeting" placeholder="Name of the meeting">
          </div>
        </div>
        <div class="cm-date-section">
          <div class="cm-date-section-name">
            <p>Date:</p>
          </div>
          <div class="cm-date-section-text" id="cm-date-section-text" @click="hideBackground">
            <datepicker v-model = "dateMeeting" :min="currentDate"></datepicker>
          </div>
        </div>
        <div class="cm-time-section">
          <div class="cm-time-section-name">
            <p>Time:</p>
          </div>
          <div class="cm-time-section-text" >
            <input type="time" v-model="timeMeeting">
          </div>
        </div>    
      </div>
      <div class = "cm-buttons-section">
        <button @click="createMeeting">Create</button>
        <button onclick=" window.location.href = '#/MainPage';">Cancel</button>
      </div>
    </div>
    <div class="location-meeting">
      <div class = "cm-location-section">
        <meta name="viewport" content="initial-scale=1.0">
        <meta charset="utf-8">
        <div id="map"></div>
      </div>
    </div>    
  </div>
</template>

<script>
import MoveSimulator from './MoveSimulator.js';
import UserService from './userService.js';
import datepicker from 'vue-date';
import {load, Map, Marker} from 'vue-google-maps';
load('AIzaSyC3PrXtnbmkCGJOFCVrUG_-pnHbhv_MmeQ')
     var latMeeting = -17.366459319280217;
     var lngMeeting = -66.17553426265715;
export default {
  data () {
    return {
      nameMeeting: '',
      dateMeeting: '',
      timeMeeting: '',
      currentDate: ''
    }
  },
  components: { 
    datepicker 
  },
  http: {
    emulateJSON: true,
    emulateHTTP: true
  },
  methods: {
    createMeeting () {    
      var meetingObject = {
        UserId: UserService.getInfo().Id,
        Name: this.nameMeeting,
        DateTime: this.dateMeeting + "T" + this.timeMeeting + ":00",
        Latitude: latMeeting,
        Longitude: lngMeeting
      };
      this.$http({
        url: `http://localhost:2399/api/Meetings`,
        method: 'post',
        body: meetingObject,
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
    hideBackground () {
        var Calend = document.getElementById("cm-date-section-text");
        Calend.style.background = "white";
    },
   initMap () {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -17.366459319280217, lng: -66.17553426265715},
          zoom: 20
        });
        var marker = new google.maps.Marker({
          position: {
            lat: -17.366459319280217,
            lng: -66.17553426265715
          },
          map: map,
          draggable: true
        });
        google.maps.event.addListener(marker,'position_changed', function(){
          latMeeting = marker.getPosition().lat();
          lngMeeting = marker.getPosition().lng();
        })
      }
    },
   beforeMount () {
    var me = this;
    setTimeout(function () {
      var d = new Date();
      var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      me.currentDate = strDate;
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
.cm-title {
  width: 100%;
  height: 8%;
  font-size: 30px;
  padding-top: 20px;
  color: #CD6427;
}

.form-meeting {
  float: left;
  width: 35%;
  height: 70%;
  background-color: transparent;
}

.form-container {
  height: 60%;
  width: 80%;
  position: relative;
  left: 10%;
  box-sizing: border-box;
}

.location-meeting {
  float: left;
  width: 60%;
  height: 70%;
  margin-right: 5%;
}

.cm-container {
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
  overflow-y: hide;
}

.cm-name-section {
  width: 100%;
  height: 20%;
  background-color: transparent;
  position: relative;
}

.cm-name-section-name {
  float: left;
  padding: 2%;
  width: 25%;
  height: 100%;
}

.cm-name-section-name p {
  font-size: 20px;
  margin-left: 1px; 
}

.cm-name-section-text {
  float: left;
  left: 10%;
  width: 60%;
  height: 100%;
  padding-top: 3%;
}

.cm-name-section-text input {
  float: left;
  width: 80%;
  height: 50%;
}

.cm-date-section {
  position: relative;
  top: 5%;
  height: 20%;
  width: 100%;
  float: left;
}

.cm-date-section-name {
  float: left;
  width: 30%;
  height: 100%;
}

.cm-date-section-name p {
  font-size: 20px;
  margin-left: 10px;
}

.cm-date-section-text {
  float: left;
  width: 48%;
  height: 70%;
  background: url('.././assets/calendar.png');
  background-size: 100% 100%;
  margin-top: 10px;
}

.cm-date-section-text:hover {
 cursor: pointer;
}

.cm-time-section {
  width: 100%;
  height: 20%;
  float: left;
  position: relative;
  top: 15%;
}

.cm-time-section-name {
  position: relative;
  float: left;
  width: 30%;
  height: 100%;
  padding-top: 1.5%;
}

.cm-time-section-name p {
  font-size: 20px;
  margin-left: 10px;
}

.cm-time-section-text {
  float: left;
  position: relative;
  width: 70%;
  height: 100%;
  padding-top: 1.5%;
}

.cm-time-section-text input {
  float: left;
  width: 65%;
  height: 60%;
  margin-right: 30%;
}

.cm-location-section {
  width: 100%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  border: 2px solid #F4C294;
}

.cm-buttons-section {
  width: 100%;
  height: 7%;
  margin-top: 5%;
  float: left;
}

.cm-buttons-section button {
  width: 20%;
  height: 100%;
  border-radius: 30px;
  background-color: #EE9C00;
  font-size: 18px;
  color: #F1F2F1;
}

.cm-buttons-section button:hover {
  cursor: pointer;
  background-color: #CD6427;
  color: #F1F2F1;
}

#map {
  height: 100%;
  width: 100%;
  float: left;
  box-sizing: border-box;
}
</style>