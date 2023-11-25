<template>
    <!-- Modal -->
    <!-- <div class="modal fade" id="sprintFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark" id="exampleModalLabel">Create Sprint</h5>
                    <form @submit.prevent="createSprint()">
                        <div class="mb-3">
                            <label for="sprintName" class="form-label">Sprint Name</label>
                            <input v-model="editable.name" type="text" class="form-control" id="sprintName"
                                placeholder="Sprint Name...">
                        </div>

                        <div class="text-end">
                            <button type="submit" class="btn btn-dark">Create</button>
                        </div>
                    </form>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-dark "> -->

    <form @submit.prevent="createSprint()">
        <div class="mb-3">
            <label for="sprintName" class="form-label">Sprint Name</label>
            <input v-model="editable.name" type="text" class="form-control" id="sprintName" placeholder="Sprint Name...">
        </div>


        <div class="text-end">
            <button type="submit" class="btn btn-dark">Create</button>
        </div>
    </form>
    <!-- </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div> -->
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ReactiveEffect, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { sprintsService } from '../services/SprintsService.js';
import { Modal } from 'bootstrap';
export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            async createSprint() {
                try {
                    const sprintData = editable.value
                    sprintData.projectId = route.params.projectId
                    await sprintsService.createSprint(sprintData)
                    editable.value = {}
                    Modal.getOrCreateInstance('#sprintFormModal').hide()
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