"use client";

import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { FormFields } from "./form-fields";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ICertType } from "@/models/cert-type-model";
import { ICertificate } from "@/models/certificate-model";

type IProps = {
  certTypes: ICertType[];
  getCertFromApi: () => void;
  setEditCert: (cert?: ICertificate) => void;
  editCert?: ICertificate;
};

export function Form(props: IProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { certTypes, getCertFromApi, editCert, setEditCert } = props;

  useEffect(() => {
    if (editCert?.id) setOpenModal(true);
  }, [editCert]);

  return (
    <div>
      <button
        className="flex gap-x-1 ring-1 ring-blue-300 hover:ring-blue-600 rounded-lg py-1 px-3"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        <PlusIcon className="h-6 w-6 stroke-blue-600" /> Add
      </button>
      {openModal ? (
        <Modal {...{ openModal, setOpenModal }} title="Certificate Form">
          <FormFields
            {...{ certTypes, getCertFromApi, editCert, setEditCert }}
          />
        </Modal>
      ) : null}
    </div>
  );
}
