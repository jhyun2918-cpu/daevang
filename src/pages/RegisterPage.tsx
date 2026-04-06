import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building, Phone, User, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, '소유자 성함을 입력해주세요.'),
  telecom: z.string().min(1, '통신사를 선택해주세요.'),
  phone: z.string().regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, '올바른 연락처 형식을 입력해주세요.'),
  submitterName: z.string().optional(),
  submitterTelecom: z.string().optional(),
  submitterPhone: z.string().optional(),
  propertyType: z.string().min(1, '매물 종류를 선택해주세요.'),
  transactionType: z.string().min(1, '거래 유형을 선택해주세요.'),
  address: z.string().min(5, '상세 주소를 입력해주세요.'),
  price: z.string().min(1, '희망 가격을 입력해주세요. (예: 매매가 3억, 전세 1.5억 등)'),
  details: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // 폼 데이터를 결합하여 알림톡 연동을 유지합니다.
      let finalName = data.name;
      let finalPhone = `${data.telecom} ${data.phone}`;

      // 접수자 정보가 있을 경우 소유자 정보와 합쳐서 서버에 전송 (백엔드 수정 불필요)
      if (data.submitterName || data.submitterPhone) {
        finalName = `${data.name} (접수: ${data.submitterName || '이름없음'})`;
        finalPhone = `${data.telecom} ${data.phone} / 접수자: ${data.submitterPhone || ''}`;
      }

      const submissionData = {
        ...data,
        name: finalName,
        phone: finalPhone
      };

      // POST data to Node.js backend
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error('서버 에러가 발생했습니다.');

      setIsSuccess(true);
      reset();
      // 사용자가 충분히 읽을 수 있도록 자동 초기화(setTimeout) 기능을 제거했습니다.
    } catch (error) {
      console.error(error);
      alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 flex justify-center items-center relative z-10">
      <div className="w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden transition-all duration-500">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-[#d4af37] opacity-[0.15] blur-[80px] rounded-full"></div>

        <div className="text-center mb-10">
          <Building className="hidden md:block w-12 h-12 text-[#d4af37] mx-auto mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-widest drop-shadow-lg">
            빠르고 확실한 <span className="gold-text">간편 매물접수</span>
          </h2>
          <p className="text-[#aaaaaa] text-lg font-light tracking-wide">
            대방 <span className="text-[#d4af37]">현</span> 부동산이 책임지고 중개해 드립니다.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-[rgba(3,199,90,0.1)] border border-[#03c75a] rounded-2xl p-8 text-center animate-[fade-up_0.5s_ease-out]">
            <CheckCircle2 className="w-16 h-16 text-[#03c75a] mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
              [매물 접수 완료]<br />
              <span className="text-[#03c75a] text-xl md:text-2xl">소중한 매물, 책임지고 중개하겠습니다!</span>
            </h3>
            
            <div className="text-[rgba(255,255,255,0.8)] text-sm md:text-lg leading-relaxed text-left max-w-2xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-10 p-4 md:p-6 bg-[rgba(0,0,0,0.3)] rounded-xl border border-[rgba(255,255,255,0.05)] break-keep">
              <p>안녕하세요, <strong>[대방 현 부동산]</strong>입니다.</p>
              <p>금일 접수하신 매물은 현재 저희가 관리 중인 네이버 부동산, 블로그, 지역 커뮤니티 등 주요 채널에 노출 작업을 진행할 예정입니다.</p>
              <p>단순히 매물을 올리는 것에 그치지 않고, 매물의 가치가 돋보일 수 있도록 전략적으로 홍보하겠습니다. 빠른 시일 내에 좋은 소식으로 연락드리겠습니다. 감사합니다!</p>
            </div>
            
            <Link 
              to="/"
              className="inline-block px-12 py-3 bg-[#03c75a] text-white rounded-full font-bold hover:bg-[#02a048] transition-colors shadow-[0_0_20px_rgba(3,199,90,0.3)] text-lg"
            >
              확 인
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            {/* Owner Info Section */}
            <div className="border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.3)] rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#d4af37] mb-5 flex items-center gap-2">
                <User size={20} /> 소유자 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">소유자 성함</label>
                  <input
                    {...register('name')}
                    className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)]"
                    placeholder="홍길동"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">통신사</label>
                    <select
                      {...register('telecom')}
                      className="w-full glass-input rounded-xl px-2 py-3 appearance-none bg-[rgba(20,20,20,0.8)] text-center text-sm md:text-base"
                    >
                      <option value="">선택</option>
                      <option value="SKT">SKT</option>
                      <option value="KT">KT</option>
                      <option value="LGU+">LGU+</option>
                      <option value="SKT 알뜰폰">SKT 알뜰폰</option>
                      <option value="KT 알뜰폰">KT 알뜰폰</option>
                      <option value="LGU+ 알뜰폰">LGU+ 알뜰폰</option>
                    </select>
                    {errors.telecom && <p className="text-red-400 text-sm mt-1">{errors.telecom.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">연락처</label>
                    <input
                      {...register('phone')}
                      className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)] text-sm md:text-base"
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Submitter Info Section (Optional) */}
            <div className="border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.3)] rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#d4af37] mb-5 flex items-center gap-2">
                <User size={20} /> 접수자 정보 <span className="text-[#aaaaaa] text-sm font-normal ml-2">(소유자와 다를 경우만 입력)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">접수자 성함</label>
                  <input
                    {...register('submitterName')}
                    className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)]"
                    placeholder="가족 / 대리인 이름"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">연락처</label>
                  <input
                    {...register('submitterPhone')}
                    className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)]"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Property Info Section */}
            <div className="border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.3)] rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#d4af37] mb-5 flex items-center gap-2">
                <Building size={20} /> 매물 정보
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">매물 종류</label>
                  <select
                    {...register('propertyType')}
                    className="w-full glass-input rounded-xl px-4 py-3 appearance-none bg-[rgba(20,20,20,0.8)]"
                  >
                    <option value="">선택해주세요</option>
                    <option value="아파트">아파트</option>
                    <option value="상가/사무실">상가 / 사무실</option>
                    <option value="오피스텔/원룸">오피스텔 / 원룸</option>
                    <option value="주택/빌라">주택 / 빌라</option>
                    <option value="토지">토지</option>
                    <option value="기타">기타</option>
                  </select>
                  {errors.propertyType && <p className="text-red-400 text-sm mt-1">{errors.propertyType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">거래 유형</label>
                  <select
                    {...register('transactionType')}
                    className="w-full glass-input rounded-xl px-4 py-3 appearance-none bg-[rgba(20,20,20,0.8)]"
                  >
                    <option value="">선택해주세요</option>
                    <option value="매매">매매</option>
                    <option value="전세">전세</option>
                    <option value="월세">월세</option>
                  </select>
                  {errors.transactionType && <p className="text-red-400 text-sm mt-1">{errors.transactionType.message}</p>}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">소재지 (주소)</label>
                  <input
                    {...register('address')}
                    className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)]"
                    placeholder="동/호수까지 정확하게 입력해주세요"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">희망 가격</label>
                  <input
                    {...register('price')}
                    className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)]"
                    placeholder="예: 매매가 3억, 보증금 1천 / 월세 50만"
                  />
                  {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-sm text-[rgba(255,255,255,0.7)] mb-2 font-medium">
                    상세 설명 <span className="text-[#aaaaaa] text-xs font-normal">(선택)</span>
                  </label>
                  <textarea
                    {...register('details')}
                    rows={4}
                    className="w-full glass-input rounded-xl px-4 py-3 placeholder-[rgba(255,255,255,0.3)] resize-none"
                    placeholder="입주가능일, 옵션(시스템에어컨, 중문 등), 수리여부 등 기타 내용을 자유롭게 적어주세요."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center sm:flex-row flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.5)]">
                <Info size={16} className="text-[#d4af37]" />
                입력하신 정보는 매물 상담 목적으로만 사용됩니다.
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-gold px-10 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
              >
                {isSubmitting ? '접수 중...' : '간편 매물접수 완료'}
                {!isSubmitting && <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
