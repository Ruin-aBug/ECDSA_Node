<template>
  <div class="container wallet">
    <h1 class="title">
      Your Wallet
    </h1>

    <label>
      Wallet Address:
      <input type="text" placeholder="Type an address, for example: 0x01" v-model="newAddr" @input="onChange" />
    </label>

    <div className="balance">Balance: {{ balance }}</div>
  </div>
</template>

<script setup lang="ts" >
import { ref } from "vue";
import server from "../server";
const newAddr = ref<string>("");
defineProps(["balance"]);
const emits = defineEmits(["update-addr-balance"]);

async function onChange() {
  try {
    const result = await server.get(`balance/${newAddr.value}`);
    console.log(result.data);
    emits("update-addr-balance", newAddr.value, result.data);
  } catch (error: any) {
    console.error(error.massage);
  }

}
</script>

<style scoped>
.wallet {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.balance {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: .9em;
  display: inline-flex;
  margin-top: 10px;
  padding: 0.75rem;
  background-color: #f4f6f8;
}
</style>