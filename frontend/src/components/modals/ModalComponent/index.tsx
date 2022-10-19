import React from "react";
import { Modal, ModalProps } from "antd";
import clsx from "clsx";
import "./styles.sass";

interface IModalComponent extends ModalProps {
  topModal?: boolean;
  noPadding?: boolean;
  modificator?: string;
  children?: React.ReactNode;
}

const ModalComponent = ({
  open,
  title,
  width,
  confirmLoading,
  topModal,
  centered,
  onCancel,
  noPadding,
  closable,
  modificator,
  closeIcon,
  children,
}: IModalComponent) => (
  <Modal
    title={title}
    open={open}
    confirmLoading={confirmLoading || false}
    onCancel={onCancel}
    width={width || 520}
    style={{ top: topModal ? 20 : centered ? 0 : 100 }}
    closable={closable}
    footer={null}
    bodyStyle={{
      padding: noPadding ? 0 : 24,
    }}
    centered={centered || false}
    className={clsx("app-modal", {
      [modificator as string]: modificator,
    })}
    closeIcon={closeIcon}
  >
    <div
      className={clsx("modal-content-wrapper", {
        noPadding,
      })}
    >
      {children}
    </div>
  </Modal>
);

export default ModalComponent;
