<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  categories: { type: Array, default: () => [] },
  types: { type: Array, default: () => [] }
})
const emits = defineEmits(['update:filters'])

const q = ref('')
const selectedCategories = ref([]) // multi-select
const type = ref('')               // single-select
const sort = ref('default')        // default | priceDesc | priceAsc

watchEffect(() => {
  emits('update:filters', {
    q: q.value,
    categories: selectedCategories.value,
    type: type.value,
    sort: sort.value
  })
})
</script>

<template>
  <div class="filters" id="category-filter" aria-label="Filters">
    <div class="form-control" style="flex:1; min-width:260px;">
      <label class="sr" for="q">Search</label>
      <input id="q" v-model="q" placeholder="Search features, tags, titles..." />
    </div>

    <div class="form-control">
      <label for="categories">Category</label>
      <select id="categories" v-model="selectedCategories" multiple style="min-width:220px; height:42px">
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="type">Type</label>
      <select id="type" v-model="type">
        <option value="">All</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="sort">Sort</label>
      <select id="sort" v-model="sort">
        <option value="default">Default</option>
        <option value="priceDesc">Price (high to low)</option>
        <option value="priceAsc">Price (low to high)</option>
      </select>
    </div>
  </div>
</template>
