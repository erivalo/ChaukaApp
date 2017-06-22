import Vue2 from 'vue'
import ServicesToMoveSimulator from './ServicesToMoveSimulator.js'
export default {
	meetingInfo()
	{
		var vm = new Vue2({})

		vm.$http({
          url: `http://localhost:2399/api/Meetings/1`,
          method: 'get',                  
        })
      	.then(meeting => {                     
        	console.log(meeting);
        	var simulationObject1 = {
          	User1: {
          		Latitude: -22.366459319280217, 
				    Longitude: -70.17553426265715
            	},
          	Latitude: meeting.body.Latitude, 
		      	Longitude: meeting.body.Longitude,
          	oldDistance: 1000
	        }
	        this.timeIntU2(simulationObject1);

	        var simulationObject2 = {
          	User1: {
          		Latitude: -22.366459319280217, 
				      Longitude: -70.17553426265715
          	},
          	Latitude: meeting.body.Latitude, 
			Longitude: meeting.body.Longitude,
          	oldDistance: 1000
	        }
	        this.timeIntU4(simulationObject2);

	        var simulationObject3 = {
          	User1: {
          		Latitude: -22.366459319280217, 
				      Longitude: -70.17553426265715
          	},
          	Latitude: meeting.body.Latitude, 
			Longitude: meeting.body.Longitude,
          	oldDistance: 1000
	        }
	        this.timeIntU3(simulationObject3);
    	});     
	},
	timeIntU2(simulationObject)
	{
    var vm = new Vue2({
    })
		var calculate = this.calDistance;
		function doSomething() {	

			simulationObject.User1.Latitude += 0.2;
			simulationObject.User1.Longitude += 0.2;
			var newLatitude = simulationObject.User1.Latitude 
			var newLongitude = simulationObject.User1.Longitude;
			var distance = calculate(newLatitude,newLongitude, simulationObject.Latitude, simulationObject.Longitude)
				//simulationObject.MeetingInfo.Latitude, simulationObject.MeetingInfo.Longitude); 
      		console.log("Actual distance: "+distance)
      		if(simulationObject.oldDistance > distance  && distance > 1)
      		{
      			console.log("In coming")
            ServicesToMoveSimulator.putState(2,"Incoming")
            ServicesToMoveSimulator.putPosition(2,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      		}
      		else if(simulationObject.oldDistance > 10){
      			simulationObject.User1.Latitude = -22.366459319280217;
      			simulationObject.User1.Longitude = -70.17553426265715;
      		}
      		else 
      		{
      			if((simulationObject.oldDistance > distance || simulationObject.oldDistance < distance ) && distance < 1)
      			{
      				console.log("In the place")
              ServicesToMoveSimulator.putState(2,"In-the-place")
              ServicesToMoveSimulator.putPosition(2,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      				//post por status
      			}
      			else
      			{
      				ServicesToMoveSimulator.putState(2,"Notcoming")
              ServicesToMoveSimulator.putPosition(2,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      			}
      		}
      		simulationObject.oldDistance = distance;
      	}
      	setInterval(doSomething,10000)
	},
	timeIntU3(simulationObject)
	{
    var vm = new Vue2({})
		var calculate = this.calDistance;
		function doSomething() {	
			var newLatitude = simulationObject.User1.Latitude 
			var newLongitude = simulationObject.User1.Longitude;
			var distance = calculate(newLatitude,newLongitude, simulationObject.Latitude, simulationObject.Longitude)
				//simulationObject.MeetingInfo.Latitude, simulationObject.MeetingInfo.Longitude); 
      		console.log("Actual distance: "+distance)
      		if(simulationObject.oldDistance > distance && distance > 1)
      		{
            simulationObject.User1.Latitude += 0.5;
            simulationObject.User1.Longitude += 0.5;
      			console.log("In coming")
      			ServicesToMoveSimulator.putState(3,"Incoming")
            ServicesToMoveSimulator.putPosition(3,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      			//post por status
      		}
      		else 
      		{
      			if((simulationObject.oldDistance >= distance || simulationObject.oldDistance <= distance) && distance < 1)
      			{
      				console.log("In the place  ")
      				ServicesToMoveSimulator.putState(3,"In-the-place")
              ServicesToMoveSimulator.putPosition(3,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      				//post por status
      			}
      			else
      			{
      				console.log("Not comming")
              ServicesToMoveSimulator.putState(3,"Notcoming")
              ServicesToMoveSimulator.putPosition(3,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      				//post por status
      			}
      		}
      		simulationObject.oldDistance = distance;
      	}
      	setInterval(doSomething,10000)
	},
	timeIntU4(simulationObject)
	{
    var vm = new Vue2({
  // options
    })
		var calculate = this.calDistance;
		function doSomething() {	
			var newLatitude = simulationObject.User1.Latitude 
			var newLongitude = simulationObject.User1.Longitude;
			var distance = calculate(newLatitude,newLongitude, simulationObject.Latitude, simulationObject.Longitude)
			//simulationObject.MeetingInfo.Latitude, simulationObject.MeetingInfo.Longitude); 
			console.log("Distance: "+ distance);
			if(simulationObject.oldDistance > distance && distance > 1)
      		{
      			simulationObject.User1.Latitude -= 0.5;
			     	simulationObject.User1.Longitude -= 0.5;
      			console.log("In coming")
            ServicesToMoveSimulator.putState(4,"Incoming")
            ServicesToMoveSimulator.putPosition(4,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      		}else if(simulationObject.oldDistance > 10){

            simulationObject.User1.Latitude = -22.366459319280217;
            simulationObject.User1.Longitude = -70.17553426265715;
      		}
      		else 
      		{
      			if(simulationObject.oldDistance >= distance && distance < 1)
      			{
      				console.log("In the place")
              ServicesToMoveSimulator.putState(4,"In-the-place")
              ServicesToMoveSimulator.putPosition(4,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      			}
      			else
      			{
      				simulationObject.User1.Latitude -= 0.5;
					    simulationObject.User1.Longitude -= 0.5;
              ServicesToMoveSimulator.putState(4,"Notcoming")
              ServicesToMoveSimulator.putPosition(4,simulationObject.User1.Latitude,simulationObject.User1.Longitude)
      				console.log("Not comming")
      			}
      		}
			simulationObject.oldDistance = distance;
		}
		
      	setInterval(doSomething,10000)
	},
	calDistance(nLat,nLng,mLat, mLng) {
		var x = nLat - mLat;
		var y = nLng - mLng;
		var dist = Math.sqrt((x*x)+(y*y));
		return dist;

	}
}