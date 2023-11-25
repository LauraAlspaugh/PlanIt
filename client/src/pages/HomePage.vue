<template>
  <div class="container-fluid">
    <section v-if="account.id" class="row">

      <div class="col-12 d-flex">
        <h1 class=" text-start p-5  project-name">Projects</h1>
        <button class="text-end project-name btn rounded-pill fs-3 pr-3" type="button" data-bs-toggle="modal"
          data-bs-target="#projectFormModal">Create Project</button>
      </div>
      <section class="row">

        <div v-for="project in projects" :key="project.id" class="col-12 mb-3">

          <ProjectCard :projectProp="project" />
        </div>
      </section>
    </section>

    <section v-else class="row main-card p-4">
      <div class="col-12">
        <h1 class="fs-4">Please login to start planning!</h1>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ProjectCard from '../components/ProjectCard.vue';
import ProjectModal from '../components/ProjectModal.vue';

export default {
  setup() {
    watchEffect(() => {
      AppState.account
      getProjects();
    });
    async function getProjects() {
      try {
        if (!AppState.account.id) {

          return
        }
        await projectsService.getProjects();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    return {
      projects: computed(() => AppState.myProjects),
      account: computed(() => AppState.account)
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
