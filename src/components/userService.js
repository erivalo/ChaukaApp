export default {
	getInfo () {
		return JSON.parse(localStorage.getItem('user'));
	},
	setInfo (user) {
		return localStorage.setItem('user', JSON.stringify(user));
	}
}