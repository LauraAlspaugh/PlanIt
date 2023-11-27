<template>
    <div class="note-border p-2">

        <div class="d-flex align-items-center  mb-2">
            <img :src="noteProp.creator.picture" alt="creator image" :title="noteProp.creator.name">
            <p class="ms-2 mb-0"> {{ noteProp.creator.name }}</p>
            <i v-if="account.id" @click="destroyNote()" class="mdi mdi-delete ms-1" role="button" type="button"
                title="delete this note"></i>
        </div>
        <p class="mb-0">{{ noteProp.body }}</p>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Note } from '../models/Note.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { notesService } from '../services/NotesService.js';
export default {
    props: { noteProp: { type: Note, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            notes: computed(() => AppState.notes),
            async destroyNote() {
                try {
                    const wantstoDestroy = await Pop.confirm('Are you sure you want to destroy this note? ')
                    if (!wantstoDestroy) {
                        return
                    } const noteId = props.noteProp.id
                    await notesService.destroyNote(noteId)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)

                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
img {
    height: 5vh;
    width: 5vh;
    object-fit: cover;
    border-radius: 50%;
}

.note-border {
    border: solid black 1px;
}
</style>