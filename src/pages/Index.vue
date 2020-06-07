<template>
  <q-page class="row items-center justify-evenly">
    <gmap-map
      :options="mapOptions"
      :center="center"
      :zoom="17"
      style="width: 100vw; height: calc(100vh - 50px)"
    >
      <GmapMarker
        :position="currentPosition"
        :icon="icon"
      />
      <GmapMarker
        v-for="(position, index) in targetPositions"
        :key="index"
        draggable
        @position_changed="targetPositionChangedHandler(index, $event)"
        @click="targetPositionClickHandler(index)"
        :position.sync="position"
        clickable
      />
      <gmap-circle
        :center="center"
        :radius="accuracy"
      />
    </gmap-map>
    <div
      style="position: absolute; bottom: 8px"
      class="bg-grey-2 q-gutter-x-md q-pa-sm rounded-borders"
    >
      <q-btn
        label="Back To Current Position"
        @click="backToCurrentPosition()"
        color="secondary"
      />
      <q-toggle
        name="music_active"
        v-model="deleteTargetPositionMode"
        label="Delete Target Position by Click"
      />
      <q-btn
        @click="addTargetPosition()"
        color="primary"
      >
        Add Target Position <q-chip
          size="sm"
          color="green-3"
        >{{targetPositions.length}}</q-chip>
      </q-btn>
      <q-btn
        label="Save Changed"
        @click="save()"
        color="positive"
        :loading="saveBtnLoading"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

/**
 * Return distance between two position in meter
 * latitude and longitute of positions are in degree
 */
function distance (p1: { lat: number; lng: number }, p2: { lat: number; lng: number }) {
  const φ1 = p1.lat * Math.PI / 180
  const φ2 = p2.lat * Math.PI / 180
  const Δφ = φ2 - φ1
  const Δλ = (p2.lng - p1.lng) * Math.PI / 180
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const R = 6371 * 1000
  return R * c
}

export default Vue.extend({
  name: 'PageIndex',
  mounted () {
    navigator.geolocation.watchPosition(
      position => {
        this.currentPosition.lat = position.coords.latitude
        this.currentPosition.lng = position.coords.longitude
        this.accuracy = position.coords.accuracy
      },
      err => { this.$q.notify(JSON.stringify(err)) },
      { enableHighAccuracy: true }
    )
  },
  data () {
    return {
      deleteTargetPositionMode: false,
      center: { lat: 10, lng: 10 },
      currentPosition: { lat: 10, lng: 10 },
      targetPositions: [] as { lat: number; lng: number }[],
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
      },
      saveBtnLoading: false
    }
  },
  methods: {
    addTargetPosition () {
      this.targetPositions.push({
        lat: this.center.lat,
        lng: this.center.lng
      })
    },
    targetPositionChangedHandler (index: number, val: { lat: () => number; lng: () => number }) {
      this.targetPositions[index].lat = val.lat()
      this.targetPositions[index].lng = val.lng()
    },
    targetPositionClickHandler (index: number) {
      if (this.deleteTargetPositionMode) this.targetPositions.splice(index, 1)
    },
    save () {
      this.saveBtnLoading = true
      setTimeout(() => {
        this.saveBtnLoading = false
        this.$q.notify({ message: 'Saved', position: 'top' })
      }, 2000)
    },
    backToCurrentPosition () {
      this.center.lat = this.currentPosition.lat
      this.center.lng = this.currentPosition.lng
    }
  }
})
</script>
