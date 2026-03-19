import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import { DeliveryState } from "../DeliveryTab/DeliveryTab.types";
import "./DeliveryTab.style.css";

export const DeliveryTab = ({ 
  state, 
  activeTimeTab, 
  setActiveTimeTab 
}: { 
  state: DeliveryState, 
  activeTimeTab: "nearest" | "by-time" | null, 
  setActiveTimeTab: (val: "nearest" | "by-time") => void} 
) => {
  const { address, building, entrance, floor, apartment, intercom, addressCheckStatus, setAddress, setBuilding, setEntrance, setFloor, setApartment, setIntercom, setAddressCheckStatus} = state;

  const buildingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (addressCheckStatus === "success") {
      buildingRef.current?.focus();
    }
  }, [addressCheckStatus]);

  return (
    <div>
      <div className="delivery-container">
        <div className="delivery-address group">
          <Input 
            value={address} 
            onChange={(e) => {
              setAddress(e.target.value); 
              setAddressCheckStatus(null);
            }} 
            label="Улица" 
            placeholder="Введите улицу, дом"
            helperText={addressCheckStatus === "success" ? "Адрес входит в зону доставки" : ""}
            error={addressCheckStatus === "error" ? "Адрес вне зоны доставки. Введите другой адрес" : ""}
            className="placeholder:ps-6"
          />
          {!address && <Image src="/icons/search.svg" alt="Поиск" width={20} height={20} className="icon-search"/>}
          {address && <ClearButton onClick={() => {setAddress(""); setAddressCheckStatus(null);}} className="right-1 top-[24px]"/>}
        </div>
        <div className="delivery-buttons-group">
          <Button 
            variant="base" 
            theme={address && !addressCheckStatus ? "primary" : "secondary"} 
            size="sm" 
            onClick={() => {
              // setAddressCheckStatus("error");
              setAddressCheckStatus("success");
            }}>
            <Text>Найти</Text>
          </Button>
          <Button variant="icon" theme="secondary" size="icon-sm">
            <Image src="/icons/map-primary.svg" alt="Карта" width={14} height={20} className="icon-map"/>
          </Button>
        </div>
      </div>
      <div className="delivery-address-details">
        <Input 
          type="number"
          ref={buildingRef} 
          value={building} 
          onChange={(e) => setBuilding(e.target.value)} 
          label="Корпус" 
          placeholder="___" 
          className="delivery-address-details-input"/>
        <Input 
          type="number"
          value={entrance} 
          onChange={(e) => setEntrance(e.target.value)}  
          label="Подъезд" 
          placeholder="___"  
          className="delivery-address-details-input"/>
        <Input  
          type="number"
          value={floor} 
          onChange={(e) => setFloor(e.target.value)} 
          label="Этаж" 
          placeholder="___"  
          className="delivery-address-details-input"/>
        <Input 
          type="number"
          value={apartment} 
          onChange={(e) => setApartment(e.target.value)} 
          label="Квартира" 
          placeholder="___" 
          className="delivery-address-details-input"/>
      </div>
      <div>
        <Text variant="label-s-regular-12" className="intercom-label">Домофон</Text>
        <div className="intercom-buttons">
          <Button 
            variant="base" 
            theme={intercom === "working" ? "primary" : "secondary"} 
            size="md"
            onClick={() => {
              setIntercom("working");
              if (activeTimeTab === null) setActiveTimeTab("nearest");
            }}
            className={intercom === "working" ? "button-active" : "button-default"}
          >
            <Text>Работает</Text>
          </Button>
          <Button 
            variant="base" 
            theme={intercom === "not-working" ? "primary" : "secondary"} 
            size="md"
            onClick={() => {
              setIntercom("not-working");
              if (activeTimeTab === null) setActiveTimeTab("nearest");
            }}
            className={intercom === "not-working" ? "button-active" : "button-default"}
          >
            <Text>Не работает</Text>
          </Button>
        </div>
      </div>
    </div>
)};

const ClearButton = ({ onClick, className="" }: { onClick: () => void; className?: string }) => (
  <button type="button" className={`clear-button ${className}`} onClick={onClick}>
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14}/>
  </button>
);