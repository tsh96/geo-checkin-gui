<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">Geo Check-in Register Form</h5>
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
                    v-model="email"
                    type="email"
                    label="Email"
                  />
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
                  label="Register"
                  :loading="loading"
                  @click="register()"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <router-link
                  to="/login"
                  class="text-grey-6"
                >Already has an Account? Go to login</router-link>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script lang="ts">
import Vue from 'vue'
import { register } from '../services/geoCheckIn'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      loading: false
    }
  },

  methods: {
    register () {
      this.loading = true
      register({
        username: this.username,
        password: this.password,
        email: this.email
      })
        .then(res => {
          if (res.data.success) {
            this.$q.notify('Congratulation, your account has been successully created. You may now login')
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          }
        })
    }
  }
})
</script>

<style>
.q-card {
  width: 360px;
}
</style>
