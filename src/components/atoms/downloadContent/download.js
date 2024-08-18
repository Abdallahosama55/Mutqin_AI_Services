// import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";

import axios from "axios";
import { baseURL } from "../../../redux/api/url";
import { sanitizeUrl } from "@braintree/sanitize-url";
// Download Editor Content

export const downloadPdf = async (editor, isFirstTextArabic, type) => {
  // Check if editor has content
  if (!editor.getText()) return toast.error("لا يوجد محتوي لتحميله");

  try {
    // const opt = {
    //   margin: 1,
    //   filename: "document.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    // };
    const token = localStorage.getItem("token");

    let HtmlCode = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" ش="width=device-width, initial-scale=1.0">
          <title>Rich Text Example</title>
          <style>

          </style>
        </head>
        <body dir="${isFirstTextArabic ? "rtl" : "ltr"}">
          ${editor.getHTML()}
        </body>
      </html>`;

    const { data } = await axios.post(
      `https://backend.mutqinai.com/api/v1/grammmer-checker/convert-to-${
        type ? type : "pdf"
      }/`,
      {
        rich_text: HtmlCode,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.open(data[`${data.txt_url ? "txt" : type}_url`], "_blank");

    toast.success("تم تحميل الملف");
  } catch (error) {
    toast.error("حدث خطأ أثناء محاولة تصدير الملف");
  }
};
export const handleDownloadHTML = (editor) => {
  // Check if editor has content
  if (editor.getText().length === 0)
    return toast.error("لا يوجد محتوي لتحميله");
  try {
    const blob = new Blob([editor.getHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "editor_content.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

export const handleDownload = (editor) => {
  // Check if editor has content
  if (editor.getText().length === 0)
    return toast.error("لا يوجد محتوي لتحميله");
  try {
    const element = document.createElement("a");
    const file = new Blob([editor.getText()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "editor_content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("تم تحميل الملف ");
  } catch (error) {
    console.log(error);
  }
};
export const downloadAsDocx = (editor) => {};

// export const downloadAsDocx = async (editor) => {
//   // Check if editor has content
//   if (editor.getText().length === 0) {
//     return toast.error("لا يوجد محتوي لتحميله");
//   }

//   try {
//     // Convert editor content to HTML
//     const htmlContent = editor.getHTML();

//     // Convert HTML to DOCX using mammoth
//     const { arrayBuffer } = await mammoth.convertToHtml(htmlContent);

//     // Create a blob from the array buffer
//     const blob = new Blob([arrayBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     });

//     // Save the blob as a DOCX file
//     saveAs(arrayBuffer, "document.docx");

//     toast.success("تم تحميل الملف بنجاح");
//   } catch (error) {
//     console.error("Error generating DOCX:", error);
//     toast.error("حدث خطأ أثناء تحميل الملف");
//   }
// };

export async function insertImg(editor, id) {
  // if (editor.getText().length === 0) return toast.error("ًاضف محتوي اولا");
  const token = localStorage.getItem("token");
  const maxWidth = 40;
  const maxHeight = 40;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        // Post the FormData object to the API endpoint

        const response = await axios.post(
          `${baseURL}v1/text-rephrase/texts/${id}/images/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure proper content type
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uploadedImage = response.data.image;
        editor
          .chain()
          .focus()
          .setImage({
            src: `https://backend.mutqinai.com${uploadedImage}`,
          })
          .run();

        // Read the uploaded image file as data URL
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //   const img = new Image();
        //   img.onload = () => {
        //     const canvas = document.createElement("canvas");
        //     const ctx = canvas.getContext("2d");

        //     // Calculate aspect ratio
        //     let aspectRatio = img.width / img.height;
        //     let newWidth, newHeight;

        //     // Adjust width and height while maintaining aspect ratio
        //     if (aspectRatio > 1) {
        //       newWidth = maxWidth;
        //       newHeight = maxWidth / aspectRatio;
        //     } else {
        //       newWidth = maxHeight * aspectRatio;
        //       newHeight = maxHeight;
        //     }

        //     // Set canvas dimensions
        //     canvas.width = newWidth;
        //     canvas.height = newHeight;

        //     // Draw image onto canvas
        //     ctx.drawImage(img, 0, 0, newWidth, newHeight);

        //     // Convert canvas content to data URL
        //     const resizedImageDataUrl = canvas.toDataURL("image/jpeg");

        //     // Set the resized image into the editor
        //   };
        //   img.src = reader.result;
        // };
      } catch (error) {
        toast.error("حدث خطأ أثناء محاولة رفع الصورة");
      }
    }
  };

  input.click();
}

// export async function insertImg(editor, id) {
//   const token = localStorage.getItem("token");
//   const maxWidth = 40;
//   const maxHeight = 40;

//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*";
//   input.onchange = async () => {
//     const file = input.files[0];
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("image", file);

//         // Post the FormData object to the API endpoint
//         const response = await axios.post(
//           `${baseURL}v1/text-rephrase/texts/${id}/images/`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data", // Ensure proper content type
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const uploadedImage = response.data.image;

//         // Create an image element
//         const img = new Image();
//         img.crossOrigin = "anonymous"; // Set crossOrigin property
//         img.src = `https://srv475086.hstgr.cloud${uploadedImage}`;
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");

//           canvas.width = maxWidth;
//           canvas.height = maxHeight;

//           // Draw the image onto the canvas with the desired dimensions
//           ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

//           // Convert the canvas content to a data URL
//           const resizedImageDataUrl = canvas.toDataURL("image/jpeg");

//           // Set the resized image into the editor
//           editor.chain().focus().setImage({ src: resizedImageDataUrl }).run();
//         };
//       } catch (error) {
//         console.log("Error uploading image:", error);
//       }
//     }
//   };

//   input.click();
// }

export async function insertImgURl(editor, id) {
  const url = window.prompt("Enter an image URL:");
  if (url === null || url === "") {
    return;
  }

  const maxWidth = 80;
  const maxHeight = 80;

  // Set the image node using the sanitized URL with desired width and height
  editor
    .chain()
    .focus()
    .setImage({
      src: url,
      maxWidth: 30,
      maxHeight: 30,
    })
    .run();
}

// export function insertImgURl(editor) {
//   // Prompt for image URL and ensure user cancels or enters a value
//   const url = window.prompt("Enter an image URL:");
//   if (url === null || url === "") {
//     return;
//   }

//   // Sanitize the URL to prevent potential security vulnerabilities,
//   // using a trusted library like `sanitize-url` (not included by default)
//   const sanitizedUrl = sanitizeUrl(url); // Assuming 'sanitizeUrl' is imported

//   // Set the image node using the sanitized URL
//   editor.chain().focus().setImage({ src: sanitizedUrl }).run();
// }
