<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black text-black bg-opacity-50">
    <div class="bg-white w-full max-w-xl rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4">Tambah Penandatangan SPT</h2>
      <p class="text-sm text-gray-500 mb-6">* Field wajib diisi</p>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">NPWP *</label>
          <input v-model="form.npwp" type="text" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Nama Penandatangan SPT *</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
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
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Status Wajib Pajak *</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input v-model="form.statusTaxpayer" type="radio" value="ACTIVE" required />
              Aktif
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.statusTaxpayer" type="radio" value="NOT_ACTIVE" required />
              Tidak Aktif
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label class="flex items-center gap-2">
            <input v-model="form.defaultSignatory" type="checkbox" />
            Jadikan sebagai default
          </label>
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" @click="close" class="px-4 py-2 text-gray-600 hover:text-black">BATAL</button>
          <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded">SIMPAN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits, defineProps, onMounted, computed, watch, ref } from 'vue'
import { SignersSignatory, SignersStatus } from '../../enum/SignersEnum';

interface DataProps {
  name: string
  npwp: string
  statusTaxpayer: string
  signatory: string
  defaultSignatory: boolean
  id: string
}

const props = defineProps<{
  isOpen: boolean
  data: DataProps
}>()

const emit = defineEmits(['close', 'save'])

const form = ref({
  npwp: '',
  name: '',
  signatory: '',
  statusTaxpayer: '',
  defaultSignatory: false
});

function close() {
  emit('close')
}

function onSubmit() {
  emit('save', { ...form })
  close()
}

watch(() => props.data, (newData) => {
  if (!newData) return
  
  const { name, npwp, signatory, statusTaxpayer, defaultSignatory } = newData;

  console.log(name);

  form.value.npwp = newData.npwp;
  form.value.name = newData.name;
  form.value.signatory = signatory;
  form.value.statusTaxpayer = statusTaxpayer;
  form.value.defaultSignatory = defaultSignatory;
}, { immediate: true })
</script>