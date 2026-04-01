import { useState } from "react";
import { useSearchFormStore } from "@/entities/client/store/searchForm/searchForm";
import { InputPhone } from "@/features/Inputs/ui/InputPhone/InputPhone";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";

export const SearchForm = () => {
  const { search, foundClientId, reset } = useSearchFormStore();
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (phone.length !== 10) return;
    search(phone);
    setSearched(true);
  };

  const handleChange = (val: string) => {
    setPhone(val);
    setSearched(false);
    reset();
  };

  return (
    <div className="flex gap-3 w-[352px]">
      <div className="w-[264px] h-16">
        <InputPhone
          value={phone}
          withSearchIcon
          onChange={handleChange}
          error={ searched && foundClientId === null ? "Клиент с таким номером не найден" : undefined }
          helperText={ foundClientId !== null ? "Клиент есть в базе" : undefined }
        />
      </div>

      <Button variant="base" theme={phone.length === 10 && !searched ? "primary" : "secondary"} size="sm" onClick={handleSearch}>
        <Text variant="body-m-medium-16">Найти</Text>
      </Button>
    </div>
  );
};