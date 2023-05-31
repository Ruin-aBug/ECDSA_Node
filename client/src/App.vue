<script setup lang="ts">
import Transfer from './components/Transfer.vue';
import Wallet from './components/Wallet.vue';
import { ref } from "vue";

const balance = ref<number>(0);
const address = ref<string>("");

function updateAddrAndBalance(newAddr: string, newBalance: number) {
  balance.value = newBalance;
  address.value = newAddr;
}

function updateBalance(newBalance: number) {
  balance.value = newBalance;
}

</script>

<template>
  <main>
    <Wallet :balance="balance" :address="address" @update-addr-balance="updateAddrAndBalance"></Wallet>
    <Transfer :balance="balance" :address="address" @update-balance="updateBalance"></Transfer>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
}
</style>
