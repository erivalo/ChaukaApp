<template>
	<div class="mi-meeting"  @click="sendInfo">
		<div class="mi-name" onclick=" window.location.href = '#/Meeting';">{{info.Name}}</div>
		<div class="mi-time">
			<div class="time-icon"></div>
			<div class="time-text">{{Time}}</div>
		</div>
		<div class="mi-date">{{myDate}}</div>
		<div class="mi-invite">
			<button onclick=" window.location.href = '#/InviteUser';" @click="sendInvite">Invite</button>
		</div>
	</div>
</template>

<script>
import MeetingService from './meetingService.js';
export default {
	data () {
		return {
			Time: '',
			myDate: ''
		}
	},
	props: ['info','checkDetails','invite'],
	methods: {
		sendInfo (e) {
			MeetingService.setInfo(this.info.Id);
		},
		sendInvite (e){
			MeetingService.setInfo(this.info.Id);
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
.mi-meeting {
	width: 70%;
	height: 100px;
	box-sizing: border-box;
	border-bottom: 1px solid gray;
	margin-left: 200px;
}

.mi-name {
	width: 60%;
	height: 50%;
	float: left;
	font-size: 20px;
	margin-top: 2px;
	text-align: left;
}

.mi-meeting:hover {
	background-color: lightgray;
	cursor: pointer;
	box-sizing: border-box;
}

.mi-time {
	width: 35%;
	height: 50%;
	float: left;
	font-size: 15px;
	margin-top: 5px;
}

.time-icon {
	width: 15%;
	height: 100%;
	float: left;
	background-image: url(.././assets/time.png);
	background-size: 50%;
  background-repeat: no-repeat;
}

.time-text {
	width: 50%;
	height: 100%;
	float: left;
	text-align: left;
}

.mi-date {
	width: 50%;
	height: 50%;
	float: left;
	font-size: 15px;
	text-align: left;
}

.mi-invite {
	width: 25%;
	height: 50%;
	float: left;
}

.mi-invite button {
  width: 45%;
  height: 60%;
  border-radius: 30px;
  background-color: #EE9C00 ;
  font-size: 18px;
  margin-left: 250px;
  color: #F1F2F1;
}

.mi-invite button:hover {
	cursor: pointer;
	background-color: #CD6427 ;
	color: #F1F2F1;
}
</style>