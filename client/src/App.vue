<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="navbar-color text-light">
    <p class="m-5 fs-5"><i class="mdi mdi-copyright"></i> 2023 by Laura Alspaugh.</p>
  </footer>
  <ModalComponent :modalId="'projectFormModal'">

    <template #modalHeader>
      Create Project
    </template>

    <template #modalBody>
      <ProjectModal />
    </template>
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'
import ProjectModal from './components/ProjectModal.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, ProjectModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.navbar-color {
  background-color: #935116;
}
</style>
