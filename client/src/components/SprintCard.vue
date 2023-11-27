<template>
    <div class="container-fluid">
        <section class="row  p-3 border-task ">
            <div class="col-12 d-flex justify-content-around">
                <button data-bs-toggle="collapse" :data-bs-target="'#collapse' + sprintProp.id"
                    class="btn btn-outline-dark me-3" :title="'Show tasks for sprint'">
                    <i class="mdi mdi-barley"></i>
                </button>
                <i v v-if="account.id == sprintProp.creatorId" @click="destroySprint" role="button "
                    class="mdi mdi-delete-forever fs-2 ms-3"></i>
                <span class="fs-2">{{ sprintProp.name }}</span>
                <span class=" fs-2"><i class="mdi mdi-check"></i> {{ combinedTaskWeight }}</span>
                <button data-bs-toggle="modal" data-bs-target="#taskFormModal" data-bs @click="setActiveSprint()"
                    class="btn btn-light me-3">
                    Create Task <i class="mdi mdi-plus"></i>
                </button>
            </div>
            <div>
            </div>
            <section class="row">
                <div v-for="task in tasks" :key="task.id" class="col-12">
                    <!-- {{ task.name }} -->
                    <TaskCard :taskProp="task" />
                </div>
            </section>


        </section>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Sprint } from '../models/Sprint.js';
import { sprintsService } from '../services/SprintsService.js';
import TaskCard from './TaskCard.vue';
import { tasksService } from '../services/TasksService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
    props: { sprintProp: { type: Sprint, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            tasks: computed(() => AppState.tasks.filter(task => task.sprintId == props.sprintProp.id)),
            combinedTaskWeight: computed(() => {
                let total = 0;
                const tasks = AppState.tasks.filter(task => task.sprintId == props.sprintProp.id);
                tasks.forEach(task => total += task.weight);
                return total;
            }),
            setActiveSprint() {
                sprintsService.setActiveSprint(props.sprintProp);
            },
            async destroySprint() {
                try {
                    const wantstoDestroy = await Pop.confirm('Are you sure you want to destroy this Sprint? ')
                    if (!wantstoDestroy) {
                        return
                    } await sprintsService.destroySprint(props.sprintProp.id)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)

                }
            },
        };
    },
    components: { TaskCard, }
}
</script>


<style lang="scss" scoped>
.border-task {
    border: 1px solid black;
    margin: 3px;
    border-radius: 3px;
}
</style>