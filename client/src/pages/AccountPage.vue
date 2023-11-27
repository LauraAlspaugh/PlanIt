<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.bio }}</p>
  </div>
  <section class="row">
    <form @submit.prevent="editAccount()" class="p-5">
      <div class="mb-3">
        <label for="name">Name</label>
        <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="Enter name...">
      </div>
      <div class="mb-3">
        <label for="picture">Picture</label>
        <input v-model="editable.picture" type="url" class="form-control" id="picture" placeholder="Picture...">
      </div>
      <div class="mb-3">
        <label for="picture">Bio</label>
        <textarea v-model="editable.bio" type="text" class="form-control" id="bio" placeholder="Bio..."></textarea>
      </div>

      <button type="submit" class="btn btn-dark">Submit</button>
    </form>
  </section>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = AppState.account;
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          const accountData = editable.value
          await accountService.editAccount(accountData)

        } catch (error) {
          logger.log(error)

        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
