import { GPT_SECRET } from '@utils/env/env';
import { InternalServerException } from '@utils/exception/Exceptions';
import companyInfoCrawling from '@src/domain/crawling/crawling';
import GPTChatServiceDto from '@service/GPT/GPTChatServiceDto';

const { Configuration, OpenAIApi } = require('openai');

const GPTChatService = async (gPTChatServiceDto: GPTChatServiceDto) => {
  const configuration = new Configuration({
    apiKey: GPT_SECRET
  });
  try {
    const openai = new OpenAIApi(configuration);

    let questionString =
      gPTChatServiceDto.quest +
      '이게 자소서 작성 문항이고,' +
      gPTChatServiceDto.experience +
      '이 경험을 엮어줬으면 좋겠어 그리고' +
      gPTChatServiceDto.max +
      '자에 가깝게 글을 작성해주면 좋겠어.';

    const companyInfo = await companyInfoCrawling(gPTChatServiceDto.company);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '너는 자기소개서를 깔끔하게 작성해주는 사람이야' },
        { role: 'system', content: companyInfo + '이거는 지원할 회사에 대한 정보야' },
        { role: 'system', content: gPTChatServiceDto.job + '이거는 지원할 직군이야' },
        { role: 'system', content: gPTChatServiceDto.skills + '이거는 너가 가지고 있는 역량이야' },
        { role: 'system', content: gPTChatServiceDto.record + '이거는 너의 이력이야' },
        {
          role: 'user',
          content:
            questionString + '마지막으로 자소서 제일 위에 대괄호로 감싼 소제목을 작성하고, 문항에 대한 답을 작성해줘'
        }
      ]
    });

    return response.data.choices[0].message.content;
    // console.log(response.data.data);
    // console.log(response.data.data.choices[0].messages);

    // return response.choices[0];
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw new InternalServerException();
  }
};

export default GPTChatService;
