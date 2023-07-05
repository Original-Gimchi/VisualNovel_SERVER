import * as console from "console";
import axios from "axios";
import {WRTN_JWT} from "@utils/env/env";

const companyInfoCrawling = async (companyName: string) => {
    try {
        const companyInfo = await axios.post('https://william.wow.wrtn.ai/generate/plugin/64a542460987203b57ef7418?platform=web&user=rlaghgus7530@gmail.com',{
            "message": `${companyName} 회사의 인재상, 기업문화를 자세하게 10줄 정도로 적어줄래?`,
            "reroll": false
        },{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${WRTN_JWT}`
            },
        });
        const content = companyInfo.data.data.content;

        return {content}
    } catch (error) {
        console.error(error);
    }
};

export default companyInfoCrawling