<template>
  <div v-if="isAddModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black text-black bg-opacity-50">
    <div class="bg-white w-full max-w-xl rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4">Tambah Penandatangan SPT</h2>
      <p class="text-sm text-gray-500 mb-6">* Field wajib diisi</p>

      <div @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">NPWP *</label>
          <input
            v-model="form.npwp"
            @input="onNPWPInput"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
          <p v-if="errors.npwp" class="text-red-500 text-sm">{{ errors.npwp }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Nama Penandatangan SPT *</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Bertindak sebagai *</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input v-model="form.signatory" type="radio" value="TAXPAYER" required />
              Wajib Pajak
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.signatory" type="radio" value="AUTHORIZED_REPRESENTATIVE" required />
              Kuasa
            </label>
          </div>
          <p v-if="errors.statusTaxpayer" class="text-red-500 text-sm">{{ errors.statusTaxpayer }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Status Wajib Pajak *</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input
                value="ACTIVE"
                v-model="form.statusTaxpayer"
                type="radio"
                required
              />
              Aktif
            </label>
            <label class="flex items-center gap-2">
              <input
                v-model="form.statusTaxpayer"
                type="radio"
                value="NOT_ACTIVE"
                required
              />
              Tidak Aktif
            </label>
          </div>
          <p v-if="errors.signatory" class="text-red-500 text-sm">{{ errors.signatory }}</p>
        </div>

        <div class="mb-6">
          <label class="flex items-center gap-2">
            <input v-model="form.defaultSignatory" type="checkbox" />
            Jadikan sebagai default
          </label>
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" @click="close" class="px-4 py-2 text-gray-600 hover:text-black">BATAL</button>
          <button type="submit" @click="onSubmit" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded">SIMPAN</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useForm } from '../../composables/useForm';
import { npwpNumberOnly } from '../../helper/formatter';

const { form, errors, validateForm, onNPWPInput } = useForm();

defineProps({
  isAddModalOpen: Boolean,
});

const emit = defineEmits(['close', 'save'])

function close() {
  emit('close')
}

function onSubmit() {
  if (validateForm()) {
    const formUpdated = {
      ...form,
      npwp: npwpNumberOnly(form.npwp),
    }
    emit('save', { ...formUpdated })
  }
}
</script>