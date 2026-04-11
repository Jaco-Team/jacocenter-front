import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { promocodesData } from "../../utils/mocks";
import { columns } from "./PromocodeList.columns";

export const PromocodeList = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Modal title="Промокоды" isOpen={isOpen} onClose={onClose}>
      <div className="pt-1 px-4">
        <Table data={promocodesData} columns={columns} height={296} width={800} rowHeight={56} headerHeight={52} variant="secondary"/>
      </div>
    </Modal>
  );
}