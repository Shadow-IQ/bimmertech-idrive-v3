<script setup>
const props = defineProps({
  product: { type:Object, required:true },
  inCart: { type:Boolean, default:false }
})
const emits = defineEmits(['view','add','remove'])
</script>

<template>
  <article class="card">
    <div class="card-media">
      <img :src="product.image" :alt="product.title" loading="lazy">
    </div>
    <div class="card-body">
      <div style="display:flex; align-items:center; gap:8px;">
        <img v-if="product.icon" :src="product.icon" alt="" style="width:18px;height:18px;opacity:.8">
        <h3 class="card-title" style="margin:0">{{ product.title }}</h3>
      </div>

      <p class="subcopy">{{ product.smallDescription }}</p>
      <div class="meta">
        <span class="chip">{{ product.category }}</span>
        <span class="chip">{{ product.type }}</span>
        <span class="chip" v-if="product.cable">Cable</span>
        <span class="chip" v-else>USB</span>
      </div>
      <div class="price-line">${{ product.price }}</div>
      <div class="actions">
        <button class="btn" @click="$emit('view', product)">Learn more</button>
        <button v-if="!inCart" class="btn primary" @click="$emit('add', product)">+ Select</button>
        <button v-else class="btn" @click="$emit('remove', product.id)">Remove</button>
      </div>
    </div>
  </article>
</template>
