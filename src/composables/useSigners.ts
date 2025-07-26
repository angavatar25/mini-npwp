import { ref } from "vue"
import { apiFetch } from "../helper/api";

export interface TSigner {
  name: string,
  npwp: string,
  statusTaxpayer: string,
  signatory: string,
  defaultSignatory: boolean,
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
        if (res) {
          const { data } = res;
          signerData.value = data;
        }
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
  }
}