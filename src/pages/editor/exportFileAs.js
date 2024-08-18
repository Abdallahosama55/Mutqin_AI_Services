import { baseURL } from "@/redux/api/url";
import toast from "react-hot-toast";
function plainHTML(title, description, content) {
  return `
<!DOCTYPE html>
  <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="${description}" />
      <link
        rel="apple-touch-icon"
        href="/logo192.png" />
      <link
        rel="manifest"
        href="/manifest.json" />

      <title>${title}</title>
    </head>
    <body>
    ${content}
    </body>
  </html>`;
}

export default async function exportFileAs(type, data) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("rich_text", plainHTML("مستند جديد", "مستند جديد", data));

  // return
  try {
    const res = await fetch(
      `${import.meta.env.VITE_MUTQIN_API}grammmer-checker/convert-to-${type}/`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      window.open(data[`${data.txt_url ? "txt" : type}_url`], "_blank");
    } else throw Error(res.statusText);
  } catch (error) {
    toast.error("حدث خطأ أثناء محاول تحميل المستند");
  }
}
