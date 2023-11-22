<template>
  <h1>Welcome to PlanIt!</h1>
</template>

<script>
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getProjects() {
      try {
        const projects = await projectsService.getProjects()
      } catch (error) {
        logger.error(error)
        Pop.error(error)

      }
    }
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
