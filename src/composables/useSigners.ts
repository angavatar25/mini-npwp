import { ref } from "vue"
import { apiFetch } from "../helper/api";

export interface TSigner {
  name: string,
  npwp: string,
  statusTaxpayer: string,
  signatory: string,
  defaultSignatory: boolean,
  id?: string,
};

export function useSigners() {
  const signersList = ref([]);

  const signerData = ref({});

  const isModalOpen = ref(false);
  const isAddModalOpen = ref(false);

  const handleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const handleAddModal = () => {
    isAddModalOpen.value = !isAddModalOpen.value;
  };

  const getAllSigners = () => {
    apiFetch("/signers", "GET")
      .then((res) => {
        const { data } = res;
        signersList.value = data;
      })
  }

  const createNewSigner = (payload: TSigner) => {
    const body = {
      data: payload
    };

    apiFetch("/signers", "POST", body)
      .then(() => {
        handleAddModal();
      })
  }

  const getSignerById = (id: string) => {
    apiFetch(`/signers/${id}`, "GET")
      .then((res) => {
        const { data } = res;
        signerData.value = data;
        handleModal();
      })
  }

  const updateSignerData = (payload: TSigner) => {
    const body = {
      data: payload
    };

    const { id: signerId } = signerData.value;

    apiFetch(`/signers/${signerId}`, "PUT", body)
      .then(() => {
        const index = signersList.value.findIndex(item => item.id === signerId);

        if (index !== -1) {
          signersList.value[index] = { ...signersList.value[index], ...payload };
        }

        isModalOpen.value = false;
      })
  }

  return {
    signersList,
    isModalOpen,
    signerData,
    isAddModalOpen,
    getAllSigners,
    createNewSigner,
    handleModal,
    getSignerById,
    handleAddModal,
    updateSignerData,
  }
}