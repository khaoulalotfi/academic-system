"use client";
import { ICertType } from "@/models/cert-type-model";
import { ICertificate } from "@/models/certificate-model";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
//import { useSession } from "@/utils/auth-client"

type IProps = {
  certTypes: ICertType[];
  certificates: ICertificate[];
  setEditCert: (cert: ICertificate) => void;
  deleteCert: (id?: string) => void;
};

export function CertList(props: IProps) {
  const { certTypes, certificates, setEditCert, deleteCert } = props;
  // const { data: session } = useSession()

  const findType = (id?: string) => certTypes.find((i) => i.id === id)?.title;

  const changeCert = (id?: string) => {
    if (!id) return;
    const cert = certificates.find((i) => i.id === id);
    if (!cert) return;
    setEditCert(cert);
  };
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Note
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {certificates.map((c) => (
          <tr key={c.id}>
            <td className="px-6 py-4">{findType(c.typeId)}</td>
            <td className="px-6 py-4">{c.company}</td>
            <td className="px-6 py-4 flex gap-2">
              <button title="Edit" onClick={() => changeCert(c.id)}>
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button title="Delete" onClick={() => deleteCert(c.id)}>
                <TrashIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
