import axios from "axios";
import {useMutation} from "react-query";
import messageToHtml from "../_helpers/messageToHtml";

export default function useDownloadMessage() {
    const downloadMessage = async ({fileType, message}) => {
        const headers = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        const content = {
            rich_text: messageToHtml(message),
        }

        switch (fileType) {
            case 'pdf':
                const pdfFile = await axios.post(`https://backend.mutqinai.com/api/v1/grammmer-checker/convert-to-pdf/`, content, {headers})
                return pdfFile.data.pdf_url;
            case 'word':
                const wordFile = await axios.post(`https://backend.mutqinai.com/api/v1/grammmer-checker/convert-to-word/`, content, {headers})
                // window.open(wordFile.data.word_url, '_blank');
                return wordFile.data.word_url;
            case 'txt':
                const txtFile = await axios.post(`https://backend.mutqinai.com/api/v1/grammmer-checker/convert-to-text/`, content, {headers})
                return txtFile.data.txt_url;
        }
    }

    const {mutate: download, data: downloadedLinkFile, isLoading: isDownloading} = useMutation({
        mutationFn: downloadMessage,
        onSuccess: async (data) => {
           

            window.open(data, '_blank')
        }
    })

    return {download, downloadedLinkFile, isDownloading};
}