<template>
  <q-page class="row items-center justify-evenly">
    <gmap-map
      :options="mapOptions"
      :center="center"
      :zoom="17"
      style="width: 100vw; height: calc(100vh - 50px)"
    >
      <GmapMarker
        :position="center"
        :icon="icon"
      />
      <GmapMarker
        v-for="(position, index) in targetLocations"
        :key="index"
        draggable
        @position_changed="targetLocationChangedHandler(index, $event)"
        :position.sync="position"
      />
      <gmap-circle
        :center="center"
        :radius="accuracy"
      />
    </gmap-map>
    <q-btn
      label="Add Target Location"
      style="position: absolute; bottom: 8px"
      @click="addTargetLocation()"
      color="primary"
    />
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
      targetLocations: [] as { lat: number; lng: number }[],
      accuracy: 0,
      icon: { path: 'M 0 5 a 5 5 0 1 1 10 0 a 5 5 0 1 1 -10 0 Z', anchor: { x: 5, y: 5 } },
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
  },
  methods: {
    addTargetLocation () {
      this.targetLocations.push({
        lat: this.center.lat,
        lng: this.center.lng
      })
    },
    targetLocationChangedHandler (index: number, val: { lat: () => number; lng: () => number }) {
      this.targetLocations[index].lat = val.lat()
      this.targetLocations[index].lng = val.lng()
    }
  }
})
</script>
