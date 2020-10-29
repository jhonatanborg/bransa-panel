<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">

      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
    <v-snackbar
      absolute
      top
      right
      color="success"
      elevation="24"
      multi-line
      :value="updateExists"
      :timeout="-1"
    >
      <span>Nova versão disponível!</span>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="refreshApp">
          Atualizar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },
  created () {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        window.location.reload()
      })
    }
  },
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false
  }),
  methods: {
    showRefreshUI (e) {
      this.registration = e.detail
      this.updateExists = true
    },
    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
}
</script>
