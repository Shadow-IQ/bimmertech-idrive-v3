<script setup>
import { ref, onMounted } from 'vue'

const videos = ref([])
const loading = ref(true)
const error = ref('')

async function load(){
  loading.value = true
  error.value = ''
  try{
    const res = await fetch('/api2/get-videos?productId=868')
    if(!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    // Expecting an array of { videoType, title, thumbnail, embedLink }
    videos.value = (Array.isArray(data) ? data : data?.videos || []).filter(v => v.videoType === 'video')
  }catch(e){
    // graceful fallback with mock data
    videos.value = [
      { title: 'iDrive Coding Overview', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', embedLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoType: 'video' },
      { title: 'CarPlay Activation Demo', thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg', embedLink: 'https://www.youtube.com/embed/oHg5SJYRHA0', videoType: 'video' }
    ]
    error.value = 'Using sample videos (API unavailable).'
  }finally{
    loading.value = false
  }
}

const open = ref(null)
function openVideo(v){ open.value = v }
function close(){ open.value = null }

onMounted(load)
</script>

<template>
  <div>
    <div v-if="loading" class="subcopy">Loading videos…</div>
    <div v-else class="carousel">
      <div v-for="v in videos" :key="v.embedLink" class="carousel-card" style="min-width:300px">
        <img :src="v.thumbnail" :alt="v.title" style="width:100%; border-radius:10px; border:1px solid var(--border)">
        <h4>{{ v.title }}</h4>
        <div class="actions">
          <button class="btn primary" @click="openVideo(v)">Play</button>
        </div>
      </div>
    </div>
    <p v-if="error" class="subcopy">{{ error }}</p>

    <div v-if="open" class="modal-backdrop" @click.self="close">
      <div class="modal" role="dialog" aria-modal="true" aria-label="Video player">
        <div class="modal-head">
          <div class="modal-title">{{ open.title }}</div>
          <button class="btn" @click="close">Close</button>
        </div>
        <div class="modal-body" style="grid-template-columns:1fr">
          <div class="modal-media">
            <iframe :src="open.embedLink" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
