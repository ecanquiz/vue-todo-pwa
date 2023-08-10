<script setup lang="ts">
import FormTask from '../components/FormTask.vue'
import useCreateOrEdit from '../composables/useCreateOrEdit'

const props = defineProps<{
  id?: string
}>()
  
const {
  isRenderable,
  pending,
  task,
  router
} = useCreateOrEdit(props)   
</script>

<template>
  <div class="container row col-md-6 mx-auto w-full lg:w-3/4">
        <div  class="flex space-x-2">
      <button
        class="btn btn-primary mb-4"
        @click="router.push({ path: '/' })"
      >
        See all tasks
      </button>
    </div>
    <h1 v-if="pending" class="text-2xl" align="center">Loading...</h1>
    <h1 v-else class="text-2xl" align="center">
      {{$props.id ? 'Edit' : 'Create'}} Task
    </h1>
    <FormTask v-if="isRenderable" :task="task" />
  </div>
</template>
