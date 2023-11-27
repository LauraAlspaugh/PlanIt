<template>
    <form @submit.prevent="createTask()">
        <div class="mb-3">
            <label for="taskName" class="form-label">Task Name</label>
            <input v-model="editable.name" type="text" class="form-control" id="taskName" placeholder="Task Name...">
        </div>
        <div class="mb-3">
            <label for="taskWeight" class="form-label">Task Weight</label>
            <input v-model="editable.weight" type="number" class="form-control" id="taskWeight" required min="1" max="5"
                placeholder="Task Weight...">
        </div>
        <div class="mb-3">
            <label class="me-2" for="isComplete">Is Complete</label>
            <input v-model="editable.isComplete" type="checkbox" class="form-check-input" id="isComplete">
        </div>


        <div class="text-end">
            <button type="submit" class="btn btn-dark">Create</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { tasksService } from '../services/TasksService.js';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async createTask() {
                try {
                    const taskData = editable.value
                    taskData.projectId = AppState.activeProject.id
                    taskData.sprintId = AppState.activeSprint.id
                    await tasksService.createTask(taskData)
                    editable.value = {}
                    Modal.getOrCreateInstance('#taskFormModal').hide()
                } catch (error) {
                    Pop.error(error)
                }
            },
        }
    }
};
</script>


<style lang="scss" scoped></style>