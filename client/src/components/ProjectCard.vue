<template>
    <div class="container-fluid">
        <router-link :to="{ name: 'Project', params: { projectId: projectProp.id } }">
            <section class="row project-name  p-4 m-3 project-card">
                <div class="col-4">
                    <p class="fs-2">{{ projectProp.name }}</p>
                </div>
                <div class="col-4">

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
export default {
    props: { projectProp: { type: Project, required: true } },
    setup() {
        return {}
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