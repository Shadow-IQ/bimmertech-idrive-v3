import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  state: () => ({ items: [] }),
  getters: {
    count: (state) => state.items.length,
    total: (state) => state.items.reduce((s,i)=> s + Number(i.price||0), 0)
  },
  actions: {
    add(product){
      if(!this.items.find(i => i.id === product.id)){
        this.items.push(product)
      }
    },
    remove(id){
      this.items = this.items.filter(i => i.id !== id)
    },
    clear(){ this.items = [] }
  }
})
