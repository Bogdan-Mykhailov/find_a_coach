<template>
  <section>
   <base-card>
     <h2>Register as a coach now!</h2>
     <CoachForm @save-data="saveData"/>
   </base-card>
  </section>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";

export default {
  components: {CoachForm},


  data() {
    return {};
  },

  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/addCoach', data);
      this.$router.replace('/coaches');
    }
  }
}
</script>

<style scoped>

</style>
