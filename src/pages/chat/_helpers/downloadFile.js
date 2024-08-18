import axios from "axios";
import {saveAs} from 'file-saver';
import toast from "react-hot-toast";

export default async function downloadFile(fileUrl) {
    try {
        await toast.promise(
            axios.post(fileUrl, {
                responseType: 'blob'
            }),
            {
                loading: 'جاري تصدير الرسالة...',
                success: (response) => {
                    const blob = new Blob([response.data], {type: response.data.type});
                    const filename = fileUrl.split('/').pop();
                    saveAs(blob, filename);

                    return 'تم تصدير الرسالة بنجاح'
                },
                error: 'حدث خطأ أثناء تصدير الرسالة'
            }
        )

    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
