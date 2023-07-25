<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="coachContactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ desc }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";

export default {
  props: [
    'id',
  ],

  components: {
    BaseBadge,
    BaseButton,
    BaseCard
  },

  data() {
    return {
      selectedCoach: null,
    };
  },

  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },

    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`
    },

    rate() {
      return this.selectedCoach.hourlyRate;
    },

    desc() {
      return this.selectedCoach.description;
    },

    areas() {
      return this.selectedCoach.areas;
    }
  },

  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      ({id}) => id === this.id);
  }
}
</script>

<style scoped>

</style>
