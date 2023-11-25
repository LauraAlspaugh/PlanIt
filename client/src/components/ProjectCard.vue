<template>
    <div class="container-fluid">
        <router-link :to="{ name: 'ProjectDetails', params: { projectId: projectProp.id } }">
            <section class="row project-name  p-3 project-card">
                <div class="col-4">
                    <p v-if="route.name == 'Home'" class="fs-2">{{ projectProp.name }}</p>
                </div>

                <div v-if="route.name == 'Home'" class="col-2">
                    <img :src="projectProp.creator.picture" alt="Creator">
                </div>

                <div class="col-4 fs-3">
                    Created On: {{ projectProp.createdAt }}
                </div>
            </section>
        </router-link>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Project } from '../models/Project.js';
import { useRoute } from 'vue-router';
export default {
    props: { projectProp: { type: Project, required: true } },
    setup() {
        const route = useRoute()
        return {
            route
        }
    }
};
</script>


<style lang="scss" scoped>
.project-card {
    background-color: #D7DBDD;
}

.project-name {
    color: #283747;
}
</style>