<script setup>
const props = defineProps({
  categories: { type:Array, default:()=>[] }
})
const emits = defineEmits(['quickFilter'])

function handleSeeMore(cat){
  // a) emit filter selection; parent will scroll to #category-filter
  emits('quickFilter', cat)
  // b) local smooth scroll
  const el = document.getElementById('category-filter')
  if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}) }
}
</script>

<template>
  <div class="carousel">
    <div v-for="c in categories" :key="c" class="carousel-card">
      <h4>{{ c }}</h4>
      <p class="subcopy" style="margin:0">Explore coding in {{ c }}.</p>
      <div class="actions" style="margin-top:8px;">
        <button class="btn primary" @click="handleSeeMore(c)">See more</button>
      </div>
    </div>
  </div>
</template>
