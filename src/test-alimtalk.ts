import { sendAlimtalk } from './services/alimtalk';

const runTest = async () => {
    console.log("알림톡 발송 테스트를 시작합니다...");
    await sendAlimtalk({
        name: '홍길동',
        phone: '010-1234-5678',
        propertyType: '아파트',
        transactionType: '매매',
        address: '양산시 물금읍 대방노블랜드',
        price: '5억',
        details: '테스트 매물 등록건입니다. 잘 도착했나요?'
    });
    console.log("테스트 요청 완료.");
}

runTest();
