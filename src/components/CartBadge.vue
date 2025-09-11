<script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '../stores/cart'

const cart = useCart()
const { count, total } = storeToRefs(cart)
const emits = defineEmits(['open'])
</script>

<template>
  <button class="cart-badge" @click="$emit('open')">
    <span class="count">{{ count }}</span>
    <div>
      <div><strong>Cart</strong></div>
      <small>${{ total.toFixed(0) }}</small>
    </div>
  </button>
</template>
