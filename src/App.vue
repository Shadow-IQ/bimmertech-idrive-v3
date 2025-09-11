<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Filters from './components/Filters.vue'
import ProductCard from './components/ProductCard.vue'
import ProductModal from './components/ProductModal.vue'
import CategoryCarousel from './components/CategoryCarousel.vue'
import VideoCarousel from './components/VideoCarousel.vue'
import CartBadge from './components/CartBadge.vue'
import productsJson from './data/products.json'
import { useCart } from './stores/cart'

const vinDecoded = ref(false)
function onScrollTop(){ window.scrollTo({top:0, behavior:'smooth'}) }
function onScrollShop(){ const el = document.getElementById('category-filter'); if(el){ el.scrollIntoView({behavior:'smooth'}) } }
function onScrollInstall(){ const el = document.getElementById('install'); if(el){ el.scrollIntoView({behavior:'smooth'}) } }

const cart = useCart()
const allProducts = productsJson
const filters = ref({ q:'', categories:[], type:'', sort:'default' })
const selected = ref(null)

// Showable products: before VIN => showOnStartUp; after VIN => all (assume compatible)
const showable = computed(() => {
  return allProducts.filter(p => vinDecoded.value ? true : p.showOnStartUp)
})

const categories = computed(() => Array.from(new Set(showable.value.map(p=>p.category))).sort())
const types = computed(() => Array.from(new Set(showable.value.map(p=>p.type))).sort())

function matchesFilter(p){
  const q = (filters.value.q||'').trim().toLowerCase()
  if(q){
    const hay = [p.title, p.smallDescription, ...(p.tags||[])].join(' ').toLowerCase()
    if(!hay.includes(q)) return false
  }
  if(filters.value.categories?.length){
    if(!filters.value.categories.includes(p.category)) return false
  }
  if(filters.value.type){
    if(p.type !== filters.value.type) return false
  }
  return true
}

const selectedList = computed(() => {
  let list = showable.value.filter(matchesFilter)
  switch(filters.value.sort){
    case 'priceDesc': list.sort((a,b)=> b.price - a.price); break;
    case 'priceAsc': list.sort((a,b)=> a.price - b.price); break;
    default: break;
  }
  return list
})
const otherList = computed(() => {
  let list = showable.value.filter(p => !matchesFilter(p))
  switch(filters.value.sort){
    case 'priceDesc': list.sort((a,b)=> b.price - a.price); break;
    case 'priceAsc': list.sort((a,b)=> a.price - b.price); break;
    default: break;
  }
  return list
})

const hasFilters = computed(() => (filters.value.q?.length || filters.value.categories?.length || filters.value.type))

function subheadingText(){
  const cats = (filters.value.categories||[]).join(' / ')
  const type = filters.value.type
  if(!cats && !type) return ''
  if(type) return `Selected ${type.toLowerCase()} products: ${cats || 'All'}`
  return `Selected products: ${cats}`
}

function openModal(p){ selected.value = p }
function closeModal(){ selected.value = null }

function handleQuickFilter(cat){
  filters.value = { ...filters.value, categories:[cat] }
}
</script>

<template>
  <NavBar @scrollTop="onScrollTop" @scrollShop="onScrollShop" @scrollInstall="onScrollInstall" />

  <div class="container">
    <header class="section-head">
      <div>
        <h1 class="headline">BMW iDrive Coding</h1>
        <p class="subcopy">Explore coding options for your BMW. Use filters to refine results and learn more in the modal.</p>
      </div>
    </header>

    <!-- Category cards quick filter -->
    <CategoryCarousel :categories="categories" @quickFilter="handleQuickFilter" />

    <!-- Video carousel -->
    <section style="margin: 18px 0;">
      <h3 style="margin:0 0 8px;">Videos</h3>
      <VideoCarousel />
    </section>

    <Filters :categories="categories" :types="types" @update:filters="filters = $event" />

    <section v-if="hasFilters" style="margin: 8px 0 6px; display:flex; align-items:center; gap:10px;">
      <strong>{{ subheadingText() }}</strong>
    </section>

    <!-- Selected products grid -->
    <section class="grid section-anchor" aria-label="Selected products">
      <div v-for="p in selectedList" :key="p.id" class="col-3">
        <ProductCard
          :product="p"
          :in-cart="!!cart.items.find(i=>i.id===p.id)"
          @view="openModal"
          @add="cart.add"
          @remove="cart.remove"
        />
      </div>
    </section>

    <!-- Other coding options -->
    <section v-if="otherList.length" style="margin-top:20px;">
      <h3 class="subcopy" style="margin:0 0 10px;">Other coding options</h3>
      <div class="grid" aria-label="Other options">
        <div v-for="p in otherList" :key="p.id" class="col-3">
          <ProductCard
            :product="p"
            :in-cart="!!cart.items.find(i=>i.id===p.id)"
            @view="openModal"
            @add="cart.add"
            @remove="cart.remove"
          />
        </div>
      </div>
    </section>

    <!-- Installation section anchor -->
    <section id="install" style="margin: 40px 0;">
      <h2 style="margin:0 0 10px;">Effortless installation in 2 simple steps</h2>
      <ol>
        <li>Place an order and receive your activation code or cable (if required).</li>
        <li>Follow the on-screen instructions to apply coding to your iDrive.</li>
      </ol>
    </section>

    <ProductModal
      v-if="selected"
      :open="!!selected"
      :product="selected"
      :in-cart="!!cart.items.find(i=>i.id===selected?.id)"
      @close="closeModal"
      @add="cart.add"
      @remove="cart.remove"
    />

    <CartBadge @open="() => alert('Selected items: ' + cart.items.map(i=>i.title).join(', '))" />
  </div>
</template>
