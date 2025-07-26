<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-2">Penandatangan SPT</h2>
    <p class="text-gray-500 mb-4">Tambah dan edit daftar Penandatangan SPT Anda</p>

    <button
      class="mb-4 bg-red-700 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      @click="onAdd"
    >
      + TAMBAH
    </button>

    <div class="overflow-x-auto">
      <table class="min-w-full border rounded">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">NPWP</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Sebagai</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Default</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in signersList"
            :key="index"
            class="border-b hover:bg-gray-50 text-black"
          >
            <td class="px-4 py-2 text-sm">{{ item.npwp }}</td>
            <td class="px-4 py-2 text-sm">{{ item.name }}</td>
            <td class="px-4 py-2 text-sm">{{ SignersSignatory[item.signatory] }}</td>
            <td class="px-4 py-2 text-sm">{{ SignersStatus[item.statusTaxpayer] }}</td>
            <td class="px-4 py-2 text-sm">{{ item.defaultSignatory ? "Ya" : "Tidak" }}</td>
            <td class="px-4 py-2">
              <button
                class="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded text-sm"
                @click="onEdit(item.id)"
              >
                ✏️ EDIT
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted } from "vue";
import { SignersSignatory, SignersStatus } from "../enum/SignersEnum";

defineProps({
  signersList: Array
});

const emits = defineEmits(['openModal', 'getSigner']);

function onAdd() {
  emits('openModal')
};

const onEdit = (id) => {
  emits('getSigner', id);
}
</script>