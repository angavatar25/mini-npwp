import { reactive } from "vue";
import { formatNPWPInput } from "../helper/formatter";

export const useForm = () => {
  const form = reactive({
    npwp: '',
    name: '',
    signatory: '',
    statusTaxpayer: '',
    defaultSignatory: false
  });
  
  const errors = reactive({
    npwp: '',
    name: '',
    signatory: '',
    statusTaxpayer: '',
    defaultSignatory: false,
  });

  const validateForm = () => {
    errors.npwp = form.npwp ? '' : 'NPWP wajib diisi'
    errors.name = form.name ? '' : 'Nama wajib diisi'
    errors.statusTaxpayer = form.statusTaxpayer ? '' : 'Status wajib dipilih'
    errors.signatory = form.signatory ? '' : 'Signatory wajib dipilih'
  
    return !errors.npwp && !errors.name && !errors.statusTaxpayer && !errors.signatory
  }

  const onNPWPInput = (event: any) => {
    const input = event.target
    const formatted = formatNPWPInput(input.value)
    input.value = formatted
    form.npwp = formatted
  }

  return {
    form,
    errors,
    validateForm,
    onNPWPInput
  }
}