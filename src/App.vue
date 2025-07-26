<template>
  <HomesignPage
    :signersList="signersList"
    @openModal="handleAddModal"
    @getSigner="handleGetSignerById"
  />
  <SignerModal
    :isOpen="isModalOpen"
    :data="signerData"
    @close="handleModal"
    @save="addSigner"
  />
  <AddSignerModal
    :isAddModalOpen="isAddModalOpen"
    @close="handleAddModal"
    @save="handleAddNewSigner"
  />
</template>

<script setup lang="ts">
import HomesignPage from "./components/HomesignPage.vue";
import SignerModal from "./components/Modal/SignerModal.vue";
import AddSignerModal from "./components/Modal/AddSignerModal.vue";

import { TSigner, useSigners } from "./composables/useSigners";
import { onMounted } from "vue";

const {
  handleModal,
  getSignerById,
  createNewSigner,
  handleAddModal,
  getAllSigners,
  updateSignerData,
  isModalOpen,
  signerData,
  isAddModalOpen,
  signersList,
} = useSigners();

function addSigner(payload: TSigner) {
  console.log(payload);
  updateSignerData(payload);
}

const handleGetSignerById = (id: string) => {
  getSignerById(id);
};

const handleAddNewSigner = (payload: TSigner) => {
  createNewSigner(payload);
  signersList.value.push(payload);
}

onMounted(() => {
  getAllSigners();
})
</script>
