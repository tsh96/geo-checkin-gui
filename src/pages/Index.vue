<template>
  <q-page class="row items-center justify-evenly">
    <gmap-map
      :options="mapOptions"
      :center="center"
      :zoom="17"
      style="width: 100vw; height: calc(100vh - 50px)"
    >
      <GmapMarker :position="center" />
      <gmap-circle
        :center="center"
        :radius="accuracy"
      />
    </gmap-map>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageIndex',
  mounted () {
    navigator.geolocation.watchPosition(
      position => {
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
        this.accuracy = position.coords.accuracy
      },
      err => { this.$q.notify(JSON.stringify(err)) },
      { enableHighAccuracy: true }
    )
  },
  data () {
    return {
      center: { lat: 10, lng: 10 },
      accuracy: 0,
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      }
    }
  }
})
</script>
