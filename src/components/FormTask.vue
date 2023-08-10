<script setup lang="ts">
import useFormTask from '../composables/useFormTask'
import type { Task } from '@/types'

const props = defineProps<{ task: Task }>()

const { form } = useFormTask(props)
</script>

<template>
  <form>
    <div class="m-2">
      <label>Title</label>
      <input type="text" v-model="form.title">
    </div>

   <div class="m-2">
      <label>Description</label>
      <textarea v-model="form.description"></textarea>
    </div>

    <div class="m-4">
      <label class="mr-2">Done</label>
      <input type="checkbox" v-model="form.done"/>
    </div>
  </form>
</template>
