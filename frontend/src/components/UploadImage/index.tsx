import { useMemo, useState } from "react";
import { Col, Row } from "antd";
import clsx from "clsx";
import { UploadIcon } from "../../icons/icons";
import { url } from "../../consts";
import { addNotification } from "../../utils/notifications";
import { IFileInfo } from "../../types";
import "./styles.sass";

const maxFileSize = 3 * 1024 * 1024;

const UploadImage = ({
  label,
  imgName,
  formats,
  disabled,
  setFile,
  filePreview,
  sizeStr,
  InputCol,
  labelCol,
  gutter,
  bigSize,
  isBanner,
}: {
  label?: string;
  imgName?: string | null;
  formats?: string[];
  disabled?: boolean;
  filePreview?: string;
  setFile?: (fileInfo: IFileInfo) => void;
  sizeStr?: string;
  InputCol?: number;
  labelCol?: number;
  gutter?: number | [number, number];
  bigSize?: boolean;
  isBanner?: boolean;
}) => {
  const [isMouseOnAvatar, setIsMouseOnAvatar] = useState<boolean>(false);

  const fileToBase64 = (file: File) => {
    if (setFile) {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
          setFile({ file, preview: (reader.result as string) || "" });
        reader.onerror = (error) => reject(error);
      });
    }
  };

  const saveFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0].size <= maxFileSize) {
      fileToBase64(ev.target.files[0]);
    } else {
      addNotification({
        type: "danger",
        title: `File size limit exceeded (max - ${maxFileSize / 1000000}MB)`,
      });
    }
  };

  const imgExist = useMemo(
    () => filePreview || (imgName && imgName.length > 0),
    [filePreview, imgName]
  );

  return (
    <div className="file-input">
      <Row
        gutter={gutter || 0}
        style={{
          width: "100%",
        }}
      >
        <Col md={labelCol || (label ? 12 : 0)} xs={24}>
          <div className="file-input__texts">
            <p className="file-input__title">{label}</p>
            {formats?.length && !disabled && (
              <p
                className="file-input__formats"
                style={{
                  maxWidth: sizeStr && "none",
                }}
              >
                You can use formats: {formats.join(", ")}
                {sizeStr && <span>. Max size: {sizeStr}</span>}
              </p>
            )}
          </div>
        </Col>
        <Col md={InputCol || 12} xs={24}>
          <div
            className={clsx("file-input__row", {
              banner: isBanner,
              bigSize: bigSize,
              transparent: Boolean(filePreview?.length),
            })}
            onMouseEnter={() => !disabled && setIsMouseOnAvatar(true)}
            onMouseLeave={() => !disabled && setIsMouseOnAvatar(false)}
          >
            <div className="file-input__row__image">
              {imgExist && (
                <img src={filePreview || url + imgName} alt={label} />
              )}
            </div>
            {!disabled && (
              <div className="file-input__row__button">
                <input
                  type="file"
                  onChange={saveFile}
                  accept={
                    formats?.map((f) => `image/${f.toLowerCase()}`).join(",") ||
                    "image/jpeg,image/jpg,image/png"
                  }
                  // disabled={disabled || false}
                />
                <div
                  className="file-input__row__back"
                  style={{
                    opacity: isMouseOnAvatar || !imgExist ? "1" : "0",
                  }}
                >
                  <UploadIcon />
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UploadImage;
