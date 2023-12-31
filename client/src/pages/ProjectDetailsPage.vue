<template>
    <div class="container">
        <section v-if="project" class="row project-card">
            <div class="col-12 text-center">
                <div class="settings-buttons">
                    <button data-bs-toggle="offcanvas" data-bs-target="#projectsNavigationOffcanvas"
                        class="btn mb-1 btn-dark fs-1 d-block" title="See your projects" type="button">
                        <i class="mdi mdi-alpha-p-circle-outline"></i>
                    </button>
                </div>
                <p class="fs-1 ">{{ project.name }} <i v-if="account.id == project.creatorId" @click="destroyProject()"
                        :title="'Delete this project'" role="button" type="button"
                        class="ms-2 mdi mdi-delete-forever text-info"></i></p>
                <p class="fs-5">{{ project.description }}</p>
            </div>
            <div class="col-12  align-items-end  m-3 p-3">
                <div>
                    <p class="fs-3">Sprints</p>
                    <p>Group your tasks into sprints for better organization. </p>
                </div>
                <!-- <button data-bs-toggle="modal" data-bs-target="#sprintFormModal" class="btn btn-dark px-5">Create
                    Sprint</button> -->
                <button type="button" class="btn btn-dark pr-4" data-bs-toggle="modal" data-bs-target="#sprintFormModal">
                    Create Sprint
                    <!-- <SprintModal /> -->
                </button>
            </div>
            <div v-for="sprint in sprints" :key="sprint.id" class="col-12">
                <SprintCard :sprintProp="sprint" />
            </div>
        </section>
    </div>



    <OffCanvasCard :offcanvasId="'taskDetailsOffcanvas'" :offcanvasPlacement="'offcanvas-end'">
        <template v-if="activeTask" #offcanvasTitle>
            <span>
                {{ activeTask.name }}
            </span>

            <button v-if="activeTask.creatorId == account.id" @click="startEditing()" class="btn btn-outline-info ms-3"
                :title="`Edit ${activeTask.name}`">
                <i class="mdi mdi-pencil"></i>
            </button>
        </template>

        <template #offcanvasBody>
            <TaskDetails />
        </template>
    </OffCanvasCard>

    <OffCanvasCard :offcanvasId="'projectsNavigationOffcanvas'">
        <template #offcanvasTitle>
            <p class="fs-3 text-dark">Projects</p>
        </template>

        <template #offcanvasBody>
            <div class="container-fluid">
                <section class="row justify-content-between">
                    <div class="col-4">
                        <p class="text-dark">Name</p>
                    </div>
                    <div class="col-4">
                        <p class="text-dark">Started</p>
                    </div>
                </section>
                <section v-for="project in myProjects" :key="project.id" class="row justify-content-between">
                    <ProjectCard :projectProp="project" />
                </section>
            </div>
        </template>
    </OffCanvasCard>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watch, popScopeId } from 'vue';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute, useRouter } from 'vue-router';
import { sprintsService } from '../services/SprintsService.js';
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
import { router } from '../router.js';
import SprintModal from '../components/SprintModal.vue';
import SprintCard from '../components/SprintCard.vue';
import OffCanvasCard from '../components/OffCanvasCard.vue';
import TaskDetails from '../components/TaskDetails.vue';
import ProjectCard from '../components/ProjectCard.vue';
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const watchableProjectId = computed(() => route.params.projectId);
        watch(watchableProjectId, () => {
            projectsService.clearAppState();
            getProjectById();
            getNotesByProjectId()
            getSprintsByProjectId();
            getTasksByProjectId()
        }, { immediate: true });
        async function getProjectById() {
            try {
                const projectId = watchableProjectId.value;
                await projectsService.getProjectById(projectId);
            }
            catch (error) {
                logger.error(error);
                Pop.error((error));
            }
        }
        async function getSprintsByProjectId() {
            try {
                const projectId = watchableProjectId.value;
                await sprintsService.getSprintsByProjectId(projectId);
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        async function getTasksByProjectId() {
            try {
                const projectId = watchableProjectId.value;
                await tasksService.getTasksByProjectId(projectId);
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        async function getNotesByProjectId() {
            try {
                const projectId = watchableProjectId.value;
                await notesService.getNotesByProjectId(projectId);
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        return {
            project: computed(() => AppState.activeProject),
            myProjects: computed(() => AppState.myProjects),
            projects: computed(() => AppState.projects),
            account: computed(() => AppState.account),
            sprints: computed(() => AppState.sprints),
            activeTask: computed(() => AppState.activeTask),
            async destroyProject() {
                try {
                    const project = AppState.activeProject;
                    const wantstoDestroy = await Pop.confirm('Are you sure you want to delete this project? ');
                    if (!wantstoDestroy) {
                        return;
                    }
                    await projectsService.destroyProject(project.id);
                    Pop.success('this project has been destroyed! ');
                    router.push({ name: 'Home' });
                }
                catch (error) {
                    logger.error(error);
                    Pop.error(error);
                }
            },
            startEditing() {
                tasksService.changeEditStatus(true)
            }
        };
    },
    components: { SprintCard, OffCanvasCard, TaskDetails, ProjectCard }
};
</script>


<style lang="scss" scoped>
.project-card {
    margin: 10px;
    border: 2px solid black;
    padding: 5px;
    border-radius: 7px;
    /* From https://css.glass */
    background: rgba(187, 174, 174, 0.62);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3.6px);
    -webkit-backdrop-filter: blur(3.6px);
    border: 1px solid rgba(30, 23, 23, 0.78);
}
</style>