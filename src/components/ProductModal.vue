<script setup>
const props = defineProps({
  product: { type:Object, required:true },
  open: { type:Boolean, default:false },
  inCart: { type:Boolean, default:false }
})
const emits = defineEmits(['close','add','remove'])
</script>

<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true" aria-label="Product details">
      <div class="modal-head">
        <div class="modal-title">{{ product.title }}</div>
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
      <div class="modal-body">
        <div class="modal-media">
          <img v-if="!product.embedLink" :src="product.image" :alt="product.title" />
          <iframe v-else :src="product.embedLink" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="modal-meta">
          <div class="subcopy">{{ product.smallDescription }}</div>
          <p style="margin:0">{{ product.description }}</p>
          <div class="meta">
            <span class="chip">{{ product.category }}</span>
            <span class="chip">{{ product.type }}</span>
            <span class="chip" v-if="product.cable">Cable</span>
            <span class="chip" v-else>USB</span>
          </div>
          <div class="price-line">${{ product.price }}</div>
          <div class="actions">
            <button v-if="!inCart" class="btn primary" @click="$emit('add', product)">+ Select</button>
            <button v-else class="btn" @click="$emit('remove', product.id)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
