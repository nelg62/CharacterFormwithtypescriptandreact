import { FC, ReactElement } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal(props: ModalProps): ReturnType<FC> {
  return (
    <div
      className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}
    >
      <div className="modal-main bg-slate-300">
        <div className="modal-head">
          <h1></h1>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="btn-container">
          <button
            type="button"
            className="absolute top-1 right-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            onClick={props.onClose}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
