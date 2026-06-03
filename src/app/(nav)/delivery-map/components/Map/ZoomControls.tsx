import { ZoomControlsProps } from "./ZoomControls.types";

export const ZoomControls = ({
  onZoomIn,
  onZoomOut,
  className = "",
}: ZoomControlsProps) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <button
        type="button"
        onClick={onZoomIn}
        className="grid h-12 w-12 cursor-pointer place-items-center rounded-lg bg-bg-base"
        aria-label="Приблизить"
      >
        <span className="col-start-1 row-start-1 h-px w-4 bg-current" />
        <span className="col-start-1 row-start-1 h-4 w-px bg-current" />
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        className="grid h-12 w-12 cursor-pointer place-items-center rounded-lg bg-bg-base"
        aria-label="Отдалить"
      >
        <span className="h-px w-4 bg-current" />
      </button>
    </div>
  );
};
