<template>
  <q-page class="row items-center justify-evenly">
    <gmap-map
      ref="map"
      :options="mapOptions"
      :center="{lat: 0, lng: 0}"
      :zoom="17"
      @center_changed="centerChangedHandler"
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
        :center="currentPosition"
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { Position, getPositions, createPosition, updatePositionByID, deletePositionByID } from '../../services/geoCheckIn'

type MapObject = {
  $mapObject: {
    setCenter: (c: {
      lat: number;
      lng: number;
    }) => (void);
  };
}

export default defineComponent({
  setup (_, { root }) {
    const map = ref<MapObject>(null)
    const currentPosition = ref({ lat: 0, lng: 0 })
    const accuracy = ref(10)

    const mapOptions = ref({
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUI: false
    })
    const icon = ref({ path: 'M 0 5 a 5 5 0 1 1 10 0 a 5 5 0 1 1 -10 0 Z', anchor: { x: 5, y: 5 } })

    const targetPositions = ref([] as Position[])
    const currentCenter = { lat: 0, lng: 0 }

    function addTargetPosition () {
      createPosition({
        lat: currentCenter.lat,
        lng: currentCenter.lng
      }).then(({ data }) => {
        targetPositions.value.push(data)
      })
    }

    let timeOut: NodeJS.Timeout
    function targetPositionChangedHandler (index: number, val: { lat: () => number; lng: () => number }) {
      if (timeOut) {
        clearTimeout(timeOut)
      }
      timeOut = setTimeout(() => {
        const position = targetPositions.value[index]
        updatePositionByID(position._id, {
          lat: val.lat(),
          lng: val.lng()
        })
        root.$q.notify({ message: 'Saved', color: 'positive' })
      }, 1000)
    }

    const deleteTargetPositionMode = ref(false)
    function targetPositionClickHandler (index: number) {
      if (deleteTargetPositionMode.value) {
        const position = targetPositions.value[index]
        deletePositionByID(position._id).then(() => {
          targetPositions.value.splice(index, 1)
          root.$q.notify({ message: 'Deleted', color: 'positive' })
        })
      }
    }

    function backToCurrentPosition () {
      if (!map.value) return
      map.value.$mapObject.setCenter({
        lat: currentPosition.value.lat,
        lng: currentPosition.value.lng
      })
    }

    function centerChangedHandler (val: { lat: () => number; lng: () => number }) {
      currentCenter.lat = val.lat()
      currentCenter.lng = val.lng()
    }

    function loadPositions () {
      getPositions().then(({ data }) => {
        targetPositions.value = data
      })
    }

    onMounted(() => {
      loadPositions()
      navigator.geolocation.watchPosition(
        position => {
          currentPosition.value.lat = position.coords.latitude
          currentPosition.value.lng = position.coords.longitude
          accuracy.value = position.coords.accuracy
        },
        err => { root.$q.notify(JSON.stringify(err)) },
        { enableHighAccuracy: true }
      )
    })
    return {
      map,
      mapOptions,
      icon,
      accuracy,
      currentPosition,
      targetPositions,
      addTargetPosition,
      targetPositionChangedHandler,
      deleteTargetPositionMode,
      targetPositionClickHandler,
      centerChangedHandler,
      backToCurrentPosition
    }
  }
})
</script>
