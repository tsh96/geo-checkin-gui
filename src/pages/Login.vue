<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">Geo Check-in Login Form</h5>
          </div>
          <div class="row">
            <q-card
              square
              bordered
              class="q-pa-lg shadow-1"
            >
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    v-model="username"
                    type="username"
                    label="Username"
                  />
                  <q-input
                    square
                    filled
                    v-model="password"
                    type="password"
                    label="Password"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="Login"
                  @click="login()"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <router-link
                  to="/register"
                  class="text-grey-6"
                >Not reigistered? Created an Account</router-link>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api'
import * as geoCheckIn from '../services/geoCheckIn'
import selfInfo from '../store/self-info'

export default defineComponent({
  setup () {
    const username = ref('')
    const password = ref('')

    function login () {
      geoCheckIn.login({
        username: username.value,
        password: password.value
      }).then(res => {
        if (res.data.success) {
          geoCheckIn.getSelfInfo().then(({ data }) => {
            if (!selfInfo.state || typeof selfInfo.state === 'function') return
            selfInfo.state.value = data

            if (data.roles.includes('Admin')) {

            }
          })
        }
      })
    }

    return { username, password, login }
  }
})
</script>

<style>
.q-card {
  width: 360px;
}
</style>
