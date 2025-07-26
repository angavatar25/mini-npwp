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
          <input v-model="form.nama" type="text" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Bertindak sebagai *</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input v-model="form.sebagai" type="radio" value="Wajib Pajak" required />
              Wajib Pajak
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.sebagai" type="radio" value="Kuasa" required />
              Kuasa
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Status Wajib Pajak *</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input v-model="form.status" type="radio" value="Aktif" required />
              Aktif
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.status" type="radio" value="Tidak Aktif" required />
              Tidak Aktif
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label class="flex items-center gap-2">
            <input v-model="form.default" type="checkbox" />
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
import { reactive, defineEmits, defineProps, onMounted, computed } from 'vue'
import { useSigners } from '../../composables/useSigners';
import { SignersSignatory, SignersStatus } from '../../enum/SignersEnum';

const { signerData } = useSigners();

const props = defineProps({
  isOpen: Boolean,
  data: {
    type: Object as () => {
      defaultSignatory: boolean
      id: string
      name: string
      npwp: string
      signatory: string
      statusTaxpayer: string
    },
    required: true
  },
});

const emit = defineEmits(['close', 'save'])

const form = reactive({
  npwp: '',
  name: '',
  signatory: '',
  statusTaxpayer: '',
  defaultSignatory: false
});

const signer = computed(() => signerData);

function close() {
  emit('close')
}

function onSubmit() {
  emit('save', { ...form })
  close()
}

onMounted(() => {
  console.log(props.data)
  const { name, npwp, signatory, statusTaxpayer, defaultSignatory } = props.data;

  form.npwp = npwp;
  form.name = name;
  form.signator = signatory === SignersSignatory.TAXPAYER ? "Wajib Pajak" : "Kuasa";
  form.statusTaxpayer = statusTaxpayer === SignersStatus.ACTIVE ? "Aktif" : "Tidak Aktif";
  form.defaultSignatory = defaultSignatory;
})
</script>