export default {
	getInfo() {
		return JSON.parse(localStorage.getItem('meeting'));
	},
	setInfo(meetingId) {
		return localStorage.setItem('meeting',meetingId);
	}
}