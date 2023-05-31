<template>
  <div class="container transfer">
    <h1 class="title">Send Transaction</h1>
    <label>
      Send Amount:
      <input type="text" placeholder="1,2,3,..." v-model="amount" />
    </label>
    <label>
      Recipient:
      <input type="text" placeholder="Type an address, for example: 0x02" v-model="recipient" />
    </label>
    <button class="button" @click="transfer">TRANSFER</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import server from '../server';

const props = defineProps(["address"]);
const emits = defineEmits(["update-balance"])
const recipient = ref<string>("");
const amount = ref<number>(0);

async function transfer() {
  try {
    const res = await server.post(`send`, {
      sender: props.address,
      recipient: recipient.value,
      amount: amount.value,
    })
    emits("update-balance", res.data)
  } catch (error) {
    console.error(error);
  }

}


</script>

<style scoped>
.transfer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.button {
  background-color: #319795;
  border-radius: 0.125rem;
  padding: 10px 20px;
  color: white;
  display: inline-flex;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: .9em;
  border: none;
}

.button:hover {
  cursor: pointer;
}
</style>