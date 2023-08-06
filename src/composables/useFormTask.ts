import { ref } from 'vue'
import type { Task } from '@/types'

type Props = {
  readonly task?: Record<string, any>;
  readonly onSubmit?: ((...args: any[]) => any);
}

export default (props: Props) => {
  const form = ref(props.task as Task) 

  return { form }
}
