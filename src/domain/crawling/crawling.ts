import * as console from "console";
import {defaults} from "axios";

const axios = require("axios");
const cheerio = require("cheerio");


const companyInfoCrawling = async (companyName: string) => {
    try {
        const injae: String = await axios.get('https://www.google.com/search?q=' + companyName + "인재상");
        const culture: String = await axios.get('https://www.google.com/search?q=' + companyName + "문화").data;

        console.log(injae)

        return "asdf"
    } catch (error) {
        console.error(error);
    }
};

companyInfoCrawling("카카오").then(()=>{
})

export default companyInfoCrawling