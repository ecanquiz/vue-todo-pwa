import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as Services from '../services/'
import type { Task } from '@/types'

export default (props: { readonly id?: string; }) => {
  const router = useRouter()
  const task = ref({} as Task)
  const pending = ref(false)

  const isRenderable = computed(
    ()=> (props.id && Object.keys(task.value).length > 0)
      || props.id===undefined
  )
    
  const getTask = ()=> {
    pending.value = true
    Services.getTask(props.id)
      .then(response => task.value = response.data)
      .catch(
        error => console.log({
          errorCode: error.code, errorMessage: error.message
        })
      )
      .finally(() => pending.value = false)
  }

  onMounted(()=>{
    if (props.id)
      getTask();
  })
    
  return {
    isRenderable,
    pending,
    task,
    router
  }
}
