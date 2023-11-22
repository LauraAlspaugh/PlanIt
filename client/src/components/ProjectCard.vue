<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-4">
                <p class="fs-1">{{ projectProp.name }}</p>
            </div>
        </section>
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


<style lang="scss" scoped></style>