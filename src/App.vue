<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import { usePermission } from '@vueuse/core'

const notifications = ref(
  usePermission('notifications')
)

const permission = computed(
  () => notifications.value === "granted"
)

const notifyMe = () => {
  // We check if the browser supports notifications
  if (!("Notification" in window)) {
    alert(
      "This browser does not support desktop notifications",
    );
  }

  // We check if the permissions have been granted before
  else if (Notification.permission === "granted") {
    // If it is correct, we launch a notification
    if (import.meta.env.DEV) {
      const notification = new Notification("Hi dev, permissions have been granted before!");
    } else if (import.meta.env.PROD) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Hi prod, permissions have been granted before!");
      });
    }
  }

  // If not, we ask permission for notification
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user grants us, we create the notification
      if (permission === "granted") {
        if (import.meta.env.DEV) {
          const notification = new Notification("Hi dev, permissions are granted now!");
        } else if (import.meta.env.PROD) {          
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Hi prod, permissions are granted now!");
          });          
        }
      }
    });
  }

  // Lastly, if the user has denied permission,
  // and wants to be respectful, there's no need to bother them.
}
</script>

<template>
  <div class="m-10">
    <header class="mx-auto w-full lg:w-3/4">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </header>

    <RouterView />

    <div class="mx-auto w-full lg:w-3/4 mt-7">
      <button v-if='!permission' class="btn btn-default" @click="notifyMe">Notify me!</button>
      <button v-else='permission' class="btn btn-default" @click="notifyMe">Try to notify me!</button>
    </div>
  </div>
</template>
