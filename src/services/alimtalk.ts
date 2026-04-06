import { SolapiMessageService } from 'solapi';
import dotenv from 'dotenv';
dotenv.config();

// 보안을 위해 .env에 저장했던 환경변수를 가져옵니다.
const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY || '';
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET || '';
const SENDER_NUMBER = process.env.SOLAPI_SENDER_NUMBER || ''; 
const PFID = process.env.SOLAPI_KAKAO_PFID || ''; 
const TEMPLATE_ID = process.env.SOLAPI_TEMPLATE_ID || '';
const RECEIVER_PHONE = process.env.RECEIVER_PHONE_NUMBER || '';

// 솔라피 API 클래스 인스턴스화
const messageService = new SolapiMessageService(SOLAPI_API_KEY, SOLAPI_API_SECRET);

export interface PropertyData {
  name: string;
  phone: string;
  propertyType: string;
  transactionType: string;
  address: string;
  price: string;
  details?: string;
}

export const sendAlimtalk = async (data: PropertyData) => {
  // 환경변수가 없으면 아직 셋팅 전이므로 무시합니다.
  if(!SOLAPI_API_KEY || SOLAPI_API_KEY === '발급받은_API_KEY를_여기에_넣어주세요') {
    console.log('[알림톡] 환경변수 미설정으로 카카오톡 발송 로직은 스킵됩니다.');
    return;
  }

  try {
    const response = await messageService.send({
      to: RECEIVER_PHONE, // 우리(대방 현 부동산) 측 핸드폰
      from: SENDER_NUMBER, // 발신자 번호 (솔라피에 등록된 번호여야 함)
      kakaoOptions: {
        pfId: PFID,
        templateId: TEMPLATE_ID,
        // 치환 문구: 승인받은 카카오 알림톡 템플릿의 변수명 (#{이름}) 과 정확히 일치해야 합니다!
        variables: {
          '#{이름}': data.name,
          '#{연락처}': data.phone,
          '#{매물종류}': data.propertyType,
          '#{거래유형}': data.transactionType,
          '#{소재지}': data.address,
          '#{희망가격}': data.price,
          '#{상세설명}': data.details || '없음',
        }
      }
    });
    console.log(`[알림톡 발송 완료] ${data.name} 님의 매물 정보를 전송했습니다! =>`, response);
  } catch (error) {
    // API 통신 에러 발생
    console.error(`[알림톡 발송 에러] 매물 접수는 완료되었으나 카카오톡/문자 전송에 실패했습니다:`, error);
  }
};
