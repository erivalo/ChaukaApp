<template>
	<ol class="ml-meeting-list">
		<li v-for = "(meeting,index) in meetings">
			<MeetingInfo
				:info = "meeting"
				:checkDetails="onCheckDetails"
				:invite="onCheckInvite">
			</MeetingInfo>
		</li>	
	</ol>
</template>

<script>
import MeetingInfo from './MeetingInfo.vue';
import EventBus from './event-bus.js';
export default {
	props: ['meetings'],
	components: {
		MeetingInfo
	},
	data () {
		return {
		}
	},
	methods: {
    onCheckDetails (item) {
      EventBus.$emit('on-check-detail', item.Id)
    },
    onCheckInvite (item) {
    	EventBus.$emit('on-check-invite', item.Id)
    }
	}
}
</script>

<style>
ol {
	list-style: none;
	overflow-y: auto;
	overflow-x: hidden;
}

li {
	margin-top: 10px;
}
</style>