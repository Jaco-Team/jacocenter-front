"use client";
import { Map } from "./components/Map/Map";
import { CafeList } from "./components/CafeList/CafeList";
import { useEffect } from "react";
import { useMapStore } from "@/entities/map/store/mapStore/mapStore";

export default function DeliveryMapPage() {
  const resetMap = useMapStore((s) => s.resetMap);

  useEffect(() => {
    resetMap();
  }, [resetMap]);

  return (
    <div className="flex flex-1 justify-end min-h-0 gap-3">
      <Map />
      <CafeList />
    </div>
  );
}
