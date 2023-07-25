<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleErrorClose">
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <CoachFilter @change-filter="setFilters"/>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to register as coach</base-button>
          <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as coach</base-button>
        </div>

        <div v-if="isLoading || error">
          <BaseSpinner/>
        </div>

        <ul v-else-if="hasCoaches || !error">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            v-bind="coach"
          />
        </ul>

        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>

import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {
    BaseButton,
    CoachItem,
    CoachFilter,
  },

  data() {
    return {
      error: null,
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      }
    };
  },

  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }

        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }

        return this.activeFilters.career && coach.areas.includes('career');

      });
    },

    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },

    isLoggedIn() {
      return this.$store.getters.isAuth;
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    }
  },

  created() {
    this.loadCoaches();
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },

    handleErrorClose() {
      this.error = null;
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
