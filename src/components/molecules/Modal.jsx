import { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useBreakpoint } from "use-breakpoint";
import { useOnClickOutside } from "usehooks-ts";
import { BREAKPOINTS } from "@/helpers/constants";

function CenteredModal({
  children,
  onClose,
  show,
  size,
  outSideClose = true,
  ...props
}) {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    outSideClose && onClose();
  });

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  return (
    <Modal
      {...props}
      className={"position-fixed top-50 start-50 translate-middle   h-100"}
      aria-labelledby=""
      centered
      onHide={onClose}
      size={size}
      show={show}
      backdrop="static"
    >
      <Modal.Body
        ref={ref}
        className={` ${
          isBelowDesktop
            ? ""
            : ""
        }`}
      >
 
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModal;
