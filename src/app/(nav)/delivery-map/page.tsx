"use client";
import { useState } from "react";
import { Map } from "./components/Map/Map";
import { CafeList } from "./components/CafeList/CafeList";

export default function DeliveryMapPage() {
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);

  const handleToggleCafe = (id: string) => {
    setSelectedCafeId((currentId) => (currentId === id ? null : id));
  };

  const handleSelectCafe = (cafeId: string | null) => {
    setSelectedCafeId(cafeId);
  };

  return (
    <div className="flex flex-1 justify-end min-h-0 gap-3">
      <Map
        selectedCafeId={selectedCafeId}
        onToggleCafe={handleToggleCafe}
        onSelectCafe={handleSelectCafe}
      />
      <CafeList selectedCafeId={selectedCafeId} onToggleCafe={handleToggleCafe} />
    </div>
  );
}
