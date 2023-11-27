<template>
    <form @submit.prevent="editTask()">
        <div class="mb-3">
            <label for="name" class="form-label">Task Name</label>
            <input v-model="editable.name" type="text" class="form-control" id="name" required placeholder="Task Name...">
        </div>
        <div class="mb-3">
            <label for="weight" class="form-label">Task Weight</label>
            <input v-model="editable.weight" type="text" class="form-control" id="weight" required
                placeholder="Task Weight...">
        </div>
        <div class="d-flex justify-content-between mb-3">
            <button @click="editable.isComplete = false" class="btn rounded-pill px-4"
                :class="editable.isComplete ? 'btn-outline-dark' : 'btn-dark'" type="button ">
                Pending
            </button>
            <button @click="editable.isComplete = true" class="btn rounded-pill px-4"
                :class="editable.isComplete ? ' btn-dark' : 'btn-outline-dark'" type="button ">
                Done
            </button>
        </div>
        <div class="mb-3">
            <label for="taskWeight" class="form-label">Sprint <i class="mdi mdi-run text-info"></i></label>
            <select v-model="editable.sprintId" id="taskWeight" class="form-select">
                <option v-for="sprint in sprints" :key="sprint.id" :value="sprint.id">{{ sprint.name }}</option>
            </select>
        </div>
        <div class="text-end">
            <button @click="stopEditing()" class="btn btn-outline-dark me-2" type="button">Cancel</button>
            <button type="submit" class="btn btn-dark">Save Changes</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { tasksService } from '../services/TasksService.js';
export default {
    setup() {
        const editable = ref({})
        function setEditable() {
            editable.value = { ...AppState.activeTask }
        }
        onMounted(() => {
            setEditable()
        })
        return {
            editable,
            sprints: computed(() => AppState.sprints),
            async editTask() {
                try {
                    const taskData = editable.value
                    await tasksService.editTask(taskData)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)

                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>