<template>
  <div class="invitation-list">
    <invitation v-for="(invitation, index) in invitations" :info="invitation"></invitation>
  </div>
</template>

<script>
import Invitation from './Invitation.vue';
import EventBus from './event-bus.js';
export default {
  props: ['invitations'],
  components: {
    Invitation
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.invitation-list {
  width: 90%;
  height: 90%;
  float: left;
  margin-left: 10%;
  box-sizing: border-box;
}
</style>