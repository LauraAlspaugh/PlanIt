<template>
    <div v-if="project" class="container-fluid">
        <section class="row">
            <div class="col-12">
                <p>{{ project.name }}</p>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watch } from 'vue';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const route = useRoute();

        const watchableProjectId = computed(() => route.params.projectId);



        async function getProjectById() {
            try {
                const projectId = route.params.projectId
                await projectsService.getProjectById(projectId);
            }
            catch (error) {
                Pop.error((error));
            }
        }
        watch(watchableProjectId, () => {
            // projectsService.clearAppState()
            getProjectById(watchableProjectId.value);


        }, { immediate: true });
        return {
            project: computed(() => AppState.activeProject),
            account: computed(() => AppState.account),
            myProjects: computed(() => AppState.myProjects),
        }
    }
};
</script>


<style lang="scss" scoped></style>