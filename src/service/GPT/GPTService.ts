import {GPT_SECRET} from "@utils/env/env";
import {InternalServerException} from "@utils/exception/Exceptions";
import companyInfoCrawling from "@src/domain/crawling/crawling";
import CompanySaveDto from "@service/company/CompanySaveDto";
import FitCompanyDto from "@service/company/FitCompanyDto";
import * as console from "console";
import JasoDto from "@service/jaso/JasoDto";

const {Configuration, OpenAIApi} = require("openai");

interface QuestionDto {
    quest: string,
    experience: string,
    max: number,
}

interface GPTChatServiceDto {
    company: string,
    job: string,
    record: string,
    skills: string,
    question: QuestionDto[],
}

const CreateJaso = async (gPTChatServiceDto: GPTChatServiceDto) => {
    const configuration = new Configuration({
        apiKey: GPT_SECRET,
    });
    try {
        const openai = new OpenAIApi(configuration);

        let questionString: string = "";

        for (const question of gPTChatServiceDto.question) {
            questionString += question.quest + "이게 자소서 작성 문항이고," + question.experience + "이 경험을 엮어줬으면 좋겠어 그리고" + question.max + "자에 가깝게 글을 작성해주면 좋겠어\n"
        }

        const companyInfo = companyInfoCrawling(gPTChatServiceDto.company)

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", messages: [
                {role: "system", content: "너는 자기소개서를 깔끔하게 작성해주는 사람이야"},
                {role: "system", content: companyInfo + "이거는 지원할 회사에 대한 정보야"},
                {role: "system", content: gPTChatServiceDto.job + "이거는 지원할 직군이야"},
                {role: "system", content: gPTChatServiceDto.skills + "이거는 너가 가지고 있는 역량이야"},
                {role: "user", content: questionString + "마지막으로 전체 자소서 작성 문항마다 대괄호로 감싼 소제목을 작성하고, 문항에 대한 답을 작성해줘"},
            ],
        }).data.choices[0];

        return response;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw new InternalServerException()
    }
}

const CreateCompany = async (companyName: string) => {
    const configuration = new Configuration({
        apiKey: GPT_SECRET,
    });
    try {
        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", messages: [
                {
                    role: "system", content: `너는 회사에 대한 정보를 알려주는 사람이야
[키워드]
키워드
[한줄 소개]
한줄 소개
[상세 소개]
상세 소개

형식으로 대답해
`
                },
                {
                    role: "assistant", content: `
[키워드]
유연근무제 높은연봉
[한줄 소개]
대한민국 최고의 it회사 카카오
[상세 소개]
카카오는 대한민국 최고의 it회사로 유명하다. 

`
                },
                {role: "user", content: companyName + "라는 회사의 키워드, 한줄 소개, 상세 소개를 알려줘"},
            ],
        });

        const text = response.data.choices[0].message.content

        // 키워드 추출하기
        const keyword = text.match(/(?<=^\[키워드]\n).*?(?=\n|$)/s)[0];
        console.log(keyword);

// 간략한 소개 추출하기
        const shortDesc = text.match(/(?<=\[한줄 소개\]\n).*?(?=\n)/s);
        console.log(shortDesc);

// 상세 소개 추출하기
        const longDesc = text.match(/(?<=\[상세 소개]\n).*?(?=$)/s)[0];
        console.log(longDesc);

        return new CompanySaveDto(
            keyword,
            shortDesc,
            longDesc
        );


    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw new InternalServerException()
    }
}

const ShowFitCompany = async (keyword: string) => {
    const configuration = new Configuration({
        apiKey: GPT_SECRET,
    });
    try {
        const openai = new OpenAIApi(configuration);

        let response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", messages: [
                {
                    role: "system", content: `당신은 회사를 추천해야 합니다. 
[회사이름]
회사이름
[한줄 소개]
한줄 소개
라는 양식으로 회사를 추천해주세요.`
                },
                {
                    role: "user",
                    content: "유연 근무제, 높은 월급, 스프링 부트라는 회사의 키워드로 5개의 한국회사를 출력하는데, 무조건 회사이름 : 한줄 소개의 형식으로 출력해줘."
                },
                {
                    role: "assistant", content:
                        `[회사이름]
카카오
[한줄 소개]
혁신적인 모바일 플랫폼과 다양한 서비스를 제공하는 IT 기업
[회사이름]
네이버
[한줄 소개]
포털 사이트 및 온라인 서비스를 운영하는 종합 인터넷 기업
[회사이름]
삼성전자
[한줄 소개]
전자제품 및 반도체 분야에서 세계적으로 선도하는 대한민국의 기업
[회사이름]
LG전자
[한줄 소개]
전자제품, 가전제품 및 모바일 기기 분야에서 혁신을 이끄는 기업
[회사이름]
SK텔레콤
[한줄 소개]
통신 서비스, 인터넷, 모바일 등 다양한 분야에서 선도적인 통신사
`
                },
                {role: "user", content: keyword + "라는 회사의 키워드로 5개의 한국회사를 출력하는데, 무조건 회사이름 : 한줄 소개의 형식으로 출력해줘."},
            ],
        });

        let text = response.data.choices[0].message.content + "\n"
        const companies: FitCompanyDto[] = [];

        for (let i = 0; i < 5; i++) {
            const name = text.match(/(?<=^\[회사이름]\n).*?(?=\n|$)/s);

            const shortDesc = text.match(/(?<=\[한줄 소개\]\n).*?(?=\n|$)/s);
            if (shortDesc && name) {
                companies.push(new FitCompanyDto(
                    name[0],
                    shortDesc[0]
                ));
                text = text.replace("[회사이름]\n" + name[0] + "\n[한줄 소개]\n" + shortDesc + "\n", "")
            }

        }
        return {companies};

    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw new InternalServerException()
    }
}

const updateJasoWithGPT = async (jaso: string) => {
    const configuration = new Configuration({
        apiKey: GPT_SECRET,
    });
    try {
        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", messages: [
                {role: "system", content: "너는 자기소개서를 깔끔하게 정리해주는 사람이야"},
                {role: "user", content: jaso + "이 자기소개서 글을 깔끔하게 정리해줘"},
            ],
        })

        return response.data.choices[0];

    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw new InternalServerException()
    }
}


export {
    CreateJaso,
    CreateCompany,
    ShowFitCompany,
    updateJasoWithGPT,
};