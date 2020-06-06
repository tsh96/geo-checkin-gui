<template>
  <q-page class="row items-center justify-evenly">
    <gmap-map
      :center="center"
      :zoom="17"
      style="width: 100vw; height: calc(100vh - 50px)"
    >
      <GmapMarker :position="center" />
    </gmap-map>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageIndex',
  mounted () {
    navigator.geolocation.watchPosition(position => {
      this.center.lat = position.coords.latitude
      this.center.lng = position.coords.longitude
      console.log(position)
    })
  },
  data () {
    return {
      center: { lat: 10, lng: 10 }
    }
  }
})
</script>
