<template>
  <h1>Welcome to PlanIt!</h1>
  <div v-for="project in projects" :key="project.id">

    <ProjectCard :projectProp="project" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ProjectCard from '../components/ProjectCard.vue';

export default {
  setup() {
    onMounted(() => {
      getProjects();
    });
    async function getProjects() {
      try {
        await projectsService.getProjects();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    return {
      projects: computed(() => AppState.projects)
    };
  },
  components: { ProjectCard }
}
</script>

<style scoped lang="scss"></style>
