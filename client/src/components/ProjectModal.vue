<template>
    <form @submit.prevent="createProject()">
        <div class="mb-3">
            <label for="projectName" class="form-label">Project Name</label>
            <input v-model="editable.name" type="text" class="form-control" id="projectName" required maxlength="45"
                placeholder="Project Name...">
        </div>

        <div class="mb-3">
            <label for="projectDescription" class="form-label">Project Description</label>
            <textarea v-model="editable.description" class="form-control" id="projectDescription" rows="3"
                placeholder="Project Description..." maxlength="300" required></textarea>
        </div>

        <div class="text-end">
            <button type="submit" class="btn btn-dark">Create</button>
        </div>
    </form>
</template>


<script>
import { useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import { projectsService } from '../services/ProjectsService.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,
            async createProject() {
                try {
                    const projectData = editable.value
                    const project = await projectsService.createProject(projectData)
                    Pop.success('Project Created!')
                    Modal.getOrCreateInstance('#projectFormModal').hide()
                    editable.value = {}
                    router.push({ name: 'ProjectDetails', params: { projectId: project.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>