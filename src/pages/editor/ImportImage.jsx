import { sanitizeUrl } from "@braintree/sanitize-url";
import { useState } from "react";
import toast from "react-hot-toast";
import UploadIcon2 from "../../assets/icons/Upload2";
import LinkIcon2 from "../../assets/icons/Link2";
import { useAddImageToDocMutation } from "../../redux/slices/editor/editorEndpoints";
import { tryCatch } from "../../Util/Create-article/helpers";
import { useParams } from "react-router-dom";
import { Spinner, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ImportImage({ editor }) {
  const { title, content, docIsCreated } = useSelector((state) => state.editor);

  const [localUpload, setLocalUpload] = useState(true);
  const [drag, setDrag] = useState(false);
  const [addImagetoDoc, { isLoading }] = useAddImageToDocMutation();
  const params = useParams();
  return (
    <div
      className="import-img-box d-flex gap-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <button
          style={{ opacity: localUpload ? 1 : 0.3 }}
          className="option"
          onClick={() => setLocalUpload(true)}
        >
          <UploadIcon2 />
        </button>
       
      </div>
      <div>
        {!localUpload ? (
          <div className="d-flex flex-column align-items-center gap-2 insert-url">
            <button
              onClick={() => {
                const url = window.prompt("أدخل عنوان URL للصورة:");
                if (url === null) return;
                const linkPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                const isLinkValid = linkPattern.test(url);
                if (!isLinkValid || url.length === 0)
                  return toast.error("برجاء ادخل رابط صحيح");

                const sanitizedUrl = sanitizeUrl(url);
                editor.chain().focus().setImage({ src: sanitizedUrl }).run();
              }}
            >
              إضافة رابط
            </button>
            <span>إدراج</span>
          </div>
        ) : !isLoading ? (
          <label style={{ transform: drag ? "scale(1.1)" : "initial" }}>
            <span className="dragBox">
              اسحب صورة هنا
              <br />
              أو
              <br />
              اضغط
              <input
                type="file"
                onChange={async (e) => {
                  editor
                    .chain()
                    // .focus("end")
                    // .createParagraphNear()
                    .insertContent(" ", {
                      preserveWhitespace: "full",
                    })
                    .run();
                  const formData = new FormData();
                  formData.append("image", e.target.files[0]);
                  const url = await tryCatch(
                    addImagetoDoc.bind(null, { id: params.id, body: formData })
                  );
                  if (url?.image)
                    editor.chain().focus().setImage({ src: url.image }).run();
                }}
                //   ondragover="drag()"
                onDragOver={() => setDrag(true)}
                onDragExit={() => setDrag(false)}
                onDragLeave={() => setDrag(false)}
                onDrop={() => setDrag(false)}
                id="uploadFile"
                accept="image/*"
              />
            </span>
          </label>
        ) : (
          <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        )}
      </div>
    </div>
  );
}
