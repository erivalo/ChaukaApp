import Vue2 from 'vue'
export default {
	putState(userId,participation)
	{
		var vm = new Vue2({})
        var invitationObject = {
              UserId: userId,
              MeetingId: 1,
              UserStatus: "Accepted",
              ParticipationStatus: participation,
              TrackingTypeId: 1
            }
            console.log(invitationObject);
            vm.$http({
              url: `http://localhost:2399/api/users/${userId}/participations/1`,
              method: 'put',
              body: invitationObject,
              headers: {                    
                'Content-Type' : 'application/json'          
              }
            })
            .then(response => {     
              //console.log(response)   
            })
            .catch(function (err) {
              //console.log(err)        
            })
	},
	putPosition(userId,latitud,longitud)
		{
		var vm = new Vue2({})
        var invitationObject = {
              UserId: userId,
              Latitude: latitud,
              Longitude: longitud
            }
            console.log(invitationObject);
            vm.$http({
              url: `http://localhost:2399/api/UserLocations/${userId}`,
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
              //console.log(err)        
            })
	},
}