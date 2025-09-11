<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCart } from '../stores/cart'

const cart = useCart()
const showMenu = ref(false)
const vin = ref('')
const vinDecoded = ref(false)

function decodeVIN(){
  // simple client-side validation: 17 chars marks as decoded
  if((vin.value||'').trim().length === 17){
    vinDecoded.value = true
    // In a real app, call backend, then scroll to grid
    const el = document.getElementById('category-filter')
    if(el){ el.scrollIntoView({behavior:'smooth'}) }
  }
}

const isMobile = ref(false)
function onResize(){ isMobile.value = window.matchMedia('(max-width: 900px)').matches }
onMounted(()=>{ onResize(); window.addEventListener('resize', onResize) })
onBeforeUnmount(()=> window.removeEventListener('resize', onResize))

const emits = defineEmits(['scrollTop','scrollShop','scrollInstall'])
</script>

<template>
  <nav class="top-nav">
    <div class="top-nav-inner">
      <div class="nav-left">
        <div class="menu">
          <button class="btn" @click="showMenu = !showMenu">All Products ▾</button>
          <div v-if="showMenu" class="menu-pop">
            <a href="#">Infotainment</a>
            <a href="#">Performance</a>
            <a href="#">Lighting</a>
            <a href="#">Connectivity</a>
            <a href="#">Doors &amp; Trunk</a>
            <a href="#">Navigation</a>
          </div>
        </div>
        <button class="btn" @click="$emit('scrollInstall')">Installation</button>
      </div>

      <div style="display:flex; align-items:center; gap:10px;">
        <div class="vin-field">
          <span style="opacity:.7">VIN</span>
          <input class="mono" placeholder="enter your VIN here" v-model="vin" maxlength="17">
          <span v-if="vinDecoded" class="tick" title="decoded"></span>
          <button class="btn" @click="decodeVIN">Decode</button>
        </div>
        <button class="btn primary" @click="$emit('scrollShop')">Buy now</button>
        <button class="btn" @click="$emit('scrollShop')">Cart ({{ cart.count }})</button>
      </div>
    </div>
  </nav>

  <div v-if="isMobile" class="bottom-nav">
    <button @click="$emit('scrollTop')">Home</button>
    <button @click="$emit('scrollShop')">Shop</button>
    <button class="mono" @click="decodeVIN">VIN</button>
    <button @click="$emit('scrollInstall')">Installation</button>
  </div>
</template>
