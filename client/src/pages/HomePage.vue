<template>
  <div class="col-12 d-flex">
    <h1 class=" text-start p-5  project-name">Projects</h1>
    <button class="text-end project-name btn rounded-pill fs-3 pr-3" type="button" data-bs-toggle="modal"
      data-bs-target="#projectFormModal">Create Project</button>
  </div>

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
import ProjectModal from '../components/ProjectModal.vue';

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

<style scoped lang="scss">
.project-name {
  font-family: 'Pinyon Script', cursive;
  color: #935116
}
</style>
