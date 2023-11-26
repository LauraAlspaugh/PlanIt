<template>
    <div class="container-fluid">
        <section class="row p-3">
            <div class="col-12 d-flex align-items-center ">
                <i v-if="taskProp.isComplete" class="mdi mdi-checkbox-marked fs-2"></i>
                <i v-else class="mdi mdi-checkbox-blank-outline fs-2"></i>
                <button @click="setActiveTask()" data-bs-toggle="offcanvas" data-bs-target="#taskDetailsOffcanvas"
                    class=" btn rounded-pill ms-3 btn-light">{{ taskProp.name }}</button>
                <i v-if="account.id == taskProp.creatorId" @click="destroyTask" role="button "
                    class="mdi mdi-delete-forever fs-2 ms-3"></i>
            </div>
            <div class="ms-5">
                <i class="mdi mdi-run"></i>
                <span>Created on: {{ taskProp.createdAt }}</span>
                <span v-if="taskProp.completedOn">| Completed on: {{ taskProp.completedOn }}</span>
                <div class="d-flex ">
                    <p>{{ noteCount }} <i class="mdi mdi-message"></i> </p>
                    <p class="ms-4">{{ taskProp.weight }} <i class="mdi mdi-check"></i> </p>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Task } from '../models/Task.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { tasksService } from '../services/TasksService.js';
export default {
    props: { taskProp: { type: Task, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            noteCount: computed(() => AppState.notes.filter(note => note.taskId == props.taskProp.id).length),
            async destroyTask() {
                try {
                    const wantstoDestroy = await Pop.confirm('Are you sure you want to destroy this Task? ')
                    if (!wantstoDestroy) {
                        return
                    } await tasksService.destroyTask(props.taskProp.id)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)

                }
            },
            setActiveTask() {
                tasksService.setActiveTask(props.taskProp)
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>