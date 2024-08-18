import {useSearchParams} from "react-router-dom";

export default function useActiveModel() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsModel = searchParams.get('model')
    const model = searchParamsModel ?
        (searchParamsModel === 'ChatGPT' || searchParamsModel === 'GPT4' || searchParamsModel === 'Google PalM 2') ? searchParamsModel : 'ChatGPT'
        :
        'ChatGPT'

    function changeModel(model) {
        setSearchParams({
            model
        })
    }

    return {model, changeModel}
}