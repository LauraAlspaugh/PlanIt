<template>
    <div v-if="task" class="container-fluid">
        <section v-if="!isEditingTask" class="row">
            <div class="col-12 mb-3">
                <p>Status</p>
                <div class="d-flex justify-content-between">
                    <button @click="updateTaskStatus({ isComplete: false })" class="btn rounded-pill px-4"
                        :class="task.isComplete ? 'btn-outline-dark' : 'btn-dark'" type="button ">
                        Pending
                    </button>
                    <button @click="updateTaskStatus({ isComplete: true })" class="btn rounded-pill px-4"
                        :class="task.isComplete ? ' btn-dark' : 'btn-outline-dark'" type="button ">
                        Done
                    </button>
                </div>
            </div>
            <div class="col-12 text-center mb-3">
                <p class="fs-2 note-border">Notes</p>
            </div>
            <div class="col-12 mb-3">
                <form @submit.prevent="createNote()">
                    <label for="noteBody" class="form-label fs-5">Create a Note</label>
                    <div class="input-group mb-3">
                        <input v-model="editable.body" id="noteBody" type="text" class="form-control"
                            placeholder="Tell us..." required>
                        <button class="btn btn-dark " type="submit" title="Create Note"><i
                                class="mdi mdi-send"></i></button>
                    </div>

                </form>
            </div>
            <div v-for="note in notes" :key="note.id" class="col-12 mb-3">
                <NoteCard :noteProp="note" />
            </div>
        </section>
        <section v-else class="row">
            <div class="col-12">
                <EditTask />
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
import NoteCard from './NoteCard.vue';
import EditTask from './EditTask.vue';
export default {
    setup() {
        const editable = ref({});
        return {
            editable,
            isEditingTask: computed(() => AppState.isEditingTask),
            task: computed(() => AppState.activeTask),
            notes: computed(() => AppState.notes.filter(note => note.taskId == AppState.activeTask?.id)),
            async updateTaskStatus(taskData) {
                try {
                    taskData.id = AppState.activeTask.id;
                    await tasksService.updateTaskStatus(taskData);
                }
                catch (error) {
                    logger.error(error);
                    Pop.error(error);
                }
            },
            async createNote() {
                try {
                    const noteData = editable.value;
                    noteData.projectId = AppState.activeProject.id;
                    noteData.taskId = AppState.activeTask.id;
                    await notesService.createNote(noteData);
                    editable.value = {};
                }
                catch (error) {
                    logger.error(error);
                    Pop.error(error);
                }
            }
        };
    },
    components: { NoteCard, EditTask }
};
</script>


<style lang="scss" scoped>
.note-border {
    width: 100%;
    border-bottom: 1px solid black;
}
</style>