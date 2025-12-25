const TWELFTH_PROJECT_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/project/12th';

export const twelfthProjectsData = [
  {
    id: '1200',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/voyage.png`,
    title: 'VOYAGE',
    teamMember: '박우현(PM) 성윤정(FE) 장유빈(FE) 정지윤(BE) 유채민(BE)',
    summary: '현대인 심리 건강 개선을 위한 중장년층과 청년층의 세대통합 멘토링 서비스',
    content:
      '현대인의 심리적 건강을 위해 중장년층의 자기효능감과 청년층의 자기확신감 증대를 목표로 기획된 서비스로, 중장년층과 청년층이 서로의 멘토이자 멘티가 되어 도움을 주는 서비스. 멘토는 멘티의 고민에 해답을 제시하고, 채팅을 통한 멘토링을 진행할 수 있으며, 커뮤니티 칼럼 작성 및 스크랩이 가능하다. 한편, 멘티는 한 줄 고민 작성, 관심 멘토 설정, 자동 멘토 매칭 및 멘토링에 참여하는 등 고민을 해결하는 데에 도움을 얻을 수 있다.',
    googleDriveUrl: 'https://drive.google.com/file/d/1qSz7S6vBKoj3NCsHP2Qf_WEXpYTMq2E8/view?usp=sharing',
    gitOrgUrl: null,
    gitBeUrl: 'https://github.com/Likelion-at-SMWU-12th/CheongpaGamja-Server',
    gitFeUrl: 'https://github.com/Likelion-at-SMWU-12th/CheongpaGamja-Client',
    no: '12기',
    category: '중앙해커톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1201',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/bbangutbbangood.png`,
    title: '빵긋빵굿',
    teamMember: '김보미(PM) 강주은(FE) 최현서(FE) 이효림(BE) 홍상희(BE)',
    summary: '웰니스 빵 정보(상품 및 레시피)를 제공하는 서비스',
    content:
      '‘빵돌이’, ‘빵순이의 일상’과 같은 키워드처럼 다이어트나 건강을 생각하는 사람들 사이에서도 빵을 포기하지 못하는 소비자들을 위해 건강빵을 통해 맛있게 먹으면서도 건강을 관리할 수 있는 플랫폼을 만들고자 기획한 서비스 (빵 유형 테스트, 웰니스 빵, 레시피, 기록 등)',
    googleDriveUrl: 'https://drive.google.com/file/d/1zNaoDSXQad78KwzuXvOSiAYG0ujQxunJ/view?usp=sharing',
    gitOrgUrl: null,
    gitBeUrl: 'https://github.com/Likelion-at-SMWU-12th/DreamPatissier-Server',
    gitFeUrl: 'https://github.com/Likelion-at-SMWU-12th/DreamPatissier-Client',
    no: '12기',
    category: '중앙해커톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1202',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/hancare.png`,
    title: '한케어',
    teamMember: '오시은(PM) 유동은(FE) 이현정(FE) 경민서(BE) 서문지(BE)',
    summary: '한의학 기반 맞춤형 건강관리 서비스',
    content:
      '한의학/한의원 정보 및 식습관 기반 건강관리 서비스를 제공하여 현대인의 신체적 건강 문제를 해결하기 위해 기획. 한의원 찾기나 한의학 관련 칼럼 제공, 또는 캘린더에 한의원 예약 기록이나 일정을 관리할 수 있는 서비스를 제공한다. ',
    googleDriveUrl: 'https://drive.google.com/file/d/16hlXRwlbk9ui4Ipg0DlmahHIjPlpaiom/view?usp=sharing',
    gitOrgUrl: null,
    gitBeUrl: 'https://github.com/Likelion-at-SMWU-12th/Hanappun-Server',
    gitFeUrl: 'https://github.com/Likelion-at-SMWU-12th/Hanappun-Client',
    no: '12기',
    category: '중앙해커톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1203',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/prog.png`,
    title: 'P-ROG',
    teamMember: '이현정(FE) 외 5명',
    summary: '평가가 아닌 성장의 기회, 대학생 프로젝트를 위한 피드백 플랫폼',
    content: `문제해결능력과 피드백은 필요충분조건이라는 것을 비롯하여 기획된 서비스입니다.

기존의 공유 플랫폼은 대학생 프로젝트를 진행할 때에 성장 과정에 맞지 않는 구조이거나, 직접적인 조언을 얻기 어려운 경우이므로 발전 방향을 찾기 어렵다는 한계점을 가집니다. 이를 극복하고자 P-ROG은 다양한 시각에서의 피드백을 중점으로 받아 프로젝트를 한층 더 성장시키는 과정을 제공하고자 합니다. 따라서 별점, 좋아요, 랭킹 등의 평가적인 요소를 최대한 없애고, 프로젝트에 대한 설명과 함께 고민 부분들도 같이 작성하여 프로젝트를 등록할 수 있습니다. 이용자는 게시된 프로젝트를 보고 피드백 작성을 할 수 있으며,  채택될 경우 포인트를 받을 수 있습니다. 또한 Ai 피드백 정리 보고서 기능도 구현하여, 적립한 포인트로 다량의 피드백을 손쉽게 정리할 수 있습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1NvIYy8K_p7qj8MThAcyilAF0YZYFj5kC/view?usp=sharing',
    gitOrgUrl: 'https://github.com/Line4thon-PROG',
    gitBeUrl: null,
    gitFeUrl: 'https://github.com/Line4thon-PROG/prog-frontend',
    no: '12기',
    category: '4호선톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1204',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/tostar.png`,
    title: '별이에게',
    teamMember: '김보미(PM) 외 5명',
    summary: '펫로스 증후군을 겪는 반려인들을 위한 따뜻한 위로의 공간',
    content: `별이에게는 반려동물의 상실로 인한 아픔을 치유하고 추억을 되새길 수 있도록 돕습니다.

펫로스 커뮤니티💬:반려동물을 잃은 사람들이 모여 소통하고 위로받을 수 있는 공간입니다. 실시간 소켓 기능을 통해 감정을 나누고 공감할 수 있습니다.

편지 쓰기 및 답장 기능💌 :떠나보낸 반려동물에게 편지를 쓰고, AI가 생성한 답장을 받는 기능입니다. 이를 통해 마음을 정리하고 추억을 되새길 수 있습니다.

게시물 등록 및 친구 추가🐶:사용자가 서로의 게시물을 공유하고 친구를 추가하며 더 깊은 교류를 할 수 있습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/14yfare2GZBvG19C3B9F9bzDV8-_PTmWl/view?usp=sharing',
    gitOrgUrl: 'https://github.com/Likelion-To-Star',
    gitBeUrl: null,
    gitFeUrl: null,
    no: '12기',
    category: '4호선톤',
    techStack: 'Spring Boot, React(JavaScript)',
    award: null,
  },
  {
    id: '1205',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/decemo.png`,
    title: 'DECEMO',
    teamMember: '강주은(FE) 외 5명',
    summary: '한 해의 마지막, 12월 한 달간 추억을 소중하게 기록할 수 있는 회고 서비스',
    content: `DECEMBER + MEMO : 12월 한달간 질문에 답변하며 한 해를 되돌아볼 수 있는 서비스

종을 클릭하여 매일매일 달라지는 31가지의 질문에 답변하고 저장할 수 있는 기능을 구현하였고, 진행률을 확인가능하다. 여기에서 작성했던 답변은 1월 1일부터 재열람이 가능하며 2024년 연말의 추억과 다짐을 되돌아볼 수 있는 기능을 기획 및 개발했습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1tjDn7TJU3FuDfHaRdR3QiCbJe0WSVfBg/view?usp=sharing',
    gitOrgUrl: 'https://github.com/2024-LINE4THON/DECEMO',
    gitBeUrl: null,
    gitFeUrl: null,
    no: '12기',
    category: '4호선톤',
    techStack: 'Django, HTML, CSS, JavaScript',
    award: null,
  },
  {
    id: '1206',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/joinus.png`,
    title: '조인어스',
    teamMember: '유동은(FE) 외 5명',
    summary: '공유를 통해 환경보호를 실천하고자 하는 서비스',
    content: `지속적으로 증가하는 지구의 온실가스로 나날이 심해지는 기후위기에 관심을 가지고 공유하고자 기획한 서비스입니다.  환경 보호를 위한 작은 행동들을 사진으로 찍어 글과 함께 올리고, 원하는 프레임을 선택하면 나만의 실천 카드를 만들어 공유할 수 있습니다. 만든 실천카드는 월별로 한번에 모아볼 수 있으며, 내 랭킹과 어스 랭킹 1~3위를 볼 수 있으며, 다른 테마를 구매해 적용도 가능합니다.

실천 카드를 통해 모인 작은 행동들과 공유를 통해 만들어지는 작은 관심들이 기후와 환경을 향한 큰 관심이 되고, 모인 관심이 세상을 조금 더 푸르게 만들 것입니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1Bv9OquznQyHRriyjj6nJhj4S5OpSBDUA/view?usp=sharing',
    gitOrgUrl: 'https://github.com/2024-line4-earth',
    gitBeUrl: null,
    gitFeUrl: 'https://github.com/2024-line4-earth/Join_us_FE',
    no: '12기',
    category: '4호선톤',
    techStack: 'Django, React(JavaScript)',
    award: '대상',
  },
  {
    id: '1207',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/2gather.png`,
    title: '2GATHER',
    teamMember: '최현서(FE) 외 5명',
    summary: 'AI 기반 타임라인 마케팅 전략 제안 플랫폼',
    content: `대부분의 대학생, 사회초년생들은 제한된 자원과 네트워크의 한계로 인해 팀원을 찾는 것에 어려움을 겪고 있음. 기존의 제한적인 홍보 방법 등을 볼 때 능력있는 사람들이 기회를 찾고 네트워크를 넓히는 데 한계가 있다고 느껴 기획한 서비스

<사회초년생의 성공적인 프로젝트와 창업을 위한 든든한 지원군>

매년 새로운 사용자를 유입하고, 졸업 후 3년, 또는 창업 . 후5년이 경과한 전문가들은 순환 구조에 따라 플랫폼을 떠나게 하여 신선한 크리에이터가 지속적으로 유입되는 시스템을 유지하도록 했다. AIDA 모델을 기반으로 인공지능을 학습시켜 한정된 자금 내에서 최대 효과를 내는 홍보 전략 및 마케팅 플랜을 짤 수 있다. 또한 예산에 맞는 크리에이터 추천이나 직관적인 결과를 제시해준다는 장점도 있다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1WYwez7zrizd9NUrIfF7nD-5mEC1Z8VyB/view?usp=sharing',
    gitOrgUrl: 'https://github.com/Line4thon-Gather',
    gitBeUrl: null,
    gitFeUrl: 'https://github.com/Line4thon-Gather/gather_Front_End',
    no: '12기',
    category: '4호선톤',
    techStack: 'Spring Boot, React(JavaScript)',
    award: null,
  },
  {
    id: '1208',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/planpal.png`,
    title: '플랜팔',
    teamMember: '박우현(PM), 경민서(BE) 외 4명',
    summary: '혼자 그리고 함께 체계적으로 관리하는 일정',
    content: `오늘날 협업의 필요성은 점차 커지고 있습니다. 개인의 일정관리만큼이나 중요한 것은 서로의 일정을 공유, 조율하여 계획을 함께 실현하는 능력입니다. PlanPal은 이러한 협업 시대에 맞춰 탄생한 캘린더 서비스로, 친구, 가족, 동료와 함께 일정과 약속을 보다 간편하게 관리할 수 있는 솔루션을 제공합니다.

각자의 바쁜 일정을 한눈에 파악하고 가용시간을 기반으로 최적의 약속시간을 자동 추천하여협업과 소통의 효율성을 극대화하는 서비스로 단순한 일정관리 도구를 넘어, 서로의 계획을 함께 실현하는 파트너로 자리 잡을 수 있도록 설계되었습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1tufelGI7VIGagt7l3oXGO24RLb9wWRDV/view?usp=sharing',
    gitOrgUrl: 'https://github.com/2024-4LINETHON-PlanPal',
    gitBeUrl: 'https://github.com/2024-4LINETHON-PlanPal/2024-4LINETHON-PlanPal-Server',
    gitFeUrl: null,
    no: '12기',
    category: '4호선톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1209',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/nugu.png`,
    title: '누구 (NUGU)',
    teamMember: '유채민(BE), 정지윤(BE) 외 4명',
    summary: '함께 만들어가는 트렌디한 자기소개 서비스',
    content: `“나보다 나를 더 잘 아는 친구가 나를 대신 소개한다면?”

여러분, 갑작스러운 자기소개 시간이 부담스럽거나 새로운 사람을 만날 때 나를 어떻게 표현해야 할지 고민해본 적 있으신가요? “누구”는 이러한 고민을 덜어드리고, 자신을 더욱 편하게 소개할 수 있도록 돕는 자기소개 플랫폼입니다.

<주요 기능>

나의 자기소개, 누구(나만의 프로필 생성(MBTI, 한 줄 소개, 키워드 등), 공유)

친구가 작성하는, 누구 소개(친구들이 나를 표현하는 키워드 투표, 간단 소개 작성, 상위 3개 키워드 확인 가능)

다함께 즐기는, 누구 테스트(소유자와 접속자가 서로를  더 잘 알 수 있는 퀴즈)`,
    googleDriveUrl: null,
    gitOrgUrl: 'https://github.com/Line4Thon-Nugu',
    gitBeUrl: 'https://github.com/Line4Thon-Nugu/Nugu-Backend',
    gitFeUrl: null,
    no: '12기',
    category: '4호선톤',
    techStack: 'Spring Boot, React(JavaScript)',
    award: '우수상',
  },
  {
    id: '1210',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/line4thonservice.png`,
    title: '4호선톤 사이트',
    teamMember: '홍상희(BE) 외 5명',
    summary: '멋쟁이들을 위한 4호선톤 축제',
    content: `해커톤을 참가해도 서비스를 홍보하기에 어려움을 느꼈거나, 서비스 배포 이후 실제 사용자 리뷰를 받을 수 없어서 아쉬웠던 점을 극복하고자 기획한 서비스이자 4호선톤 참가자들이 자유롭게 서비스를 업로드하고, 평가할 수 있는 웹 플랫폼
    서비스 홍보 / 경험 / 리뷰를 한 번에 모아볼 수 있는 서비스를 구현`,
    googleDriveUrl: 'https://drive.google.com/file/d/1cNlHblBddo__4JL9A9ecEAoJ0ApnYwI1/view?usp=sharing',
    gitOrgUrl: 'https://github.com/line4thon-team15',
    gitBeUrl: 'https://github.com/line4thon-team15/back-repo',
    gitFeUrl: null,
    no: '12기',
    category: '4호선톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1211',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/moatravel.png`,
    title: 'MOA(모아)',
    teamMember: '서문지(BE), 성윤정(FE) 외 3명',
    summary: '👭함께 떠날 여행 메이트를 모아주는 여행 동행 서비스',
    content: `여행을 계획 중인 사용자가 자신의 여행 스타일을 진단하여 유사한 여행 스타일을 가진 사람들과 동행할 수 있도록 매칭해주는 플랫폼

사용자의 여행 타입을 진단하여, 개인의 여행 스타일에 맞는 여행 유형을 추천하는 기능을 제공합니다. 각 화면을 통해 사용자는 퀴즈 형식으로 여행 취향과 스타일을 탐색할 수 있으며, 결과에 따라 자신의 여행 성향을 시각적으로 확인할 수 있습니다. 또한 검색 및 필터링 기능이나 여행 정보 게시물을 모아 볼 수 있는 커뮤니티 기능도 구현하였습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1YeNHNYi618E3ITY0jic7YkfiVj5vLPP_/view?usp=sharing',
    gitOrgUrl: null,
    gitBeUrl: 'https://github.com/TEAM-4line/4line_backend',
    gitFeUrl: 'https://github.com/TEAM-4line/4line_frontend',
    no: '12기',
    category: '4호선톤',
    techStack: 'Spring Boot, React(JavaScript, TypeScript)',
    award: '우수상',
  },
  {
    id: '1212',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/pyeonshulleng.png`,
    title: '편슐랭',
    teamMember: '이효림(BE) 외 5명',
    summary: '편의점 꿀조합 모음 서비스',
    content: `사용자들이 다양한 편의점 상품을 조합하여 자신만의 꿀 조합을 만들고, 공유할 수 있는 웹 애플리케이션

높아지는 물가에 편의점 음식으로 식사를 해결하는 사람이 많아지고, 그에 따라 여러 맛있는 조합도 인스타와 페이스북 등 여러 SNS에 퍼지고 있음.하지만 그 레시피들을 모아서 볼 수 있는 어플이나 사이트가 없고 자신의 레시피를 추천하고 공유하고자 하는 사람들의 커뮤니티 어플도 존재하지 않음.따라서 편의점에서 자신만의 맛있는 조합을 만들고, 그 아이디어를 공유하고 또 다른 사용자의 레시피도 함께 보면서 편의점에서 간단히 식사를 해결하는 것만이 아닌 편의점 식사에서의 즐거움을 제공하고자 하는데 목적을 둠`,
    googleDriveUrl: 'https://drive.google.com/file/d/1sCaaK_1x-tlW2QSgJzTrZ2Iysvsy5_44/view?usp=sharing',
    gitOrgUrl: 'https://github.com/4-18',
    gitBeUrl: 'https://github.com/4-18/BACKEND',
    gitFeUrl: null,
    no: '12기',
    category: '4호선톤',
    techStack: 'Spring Boot, React(JavaScript)',
    award: null,
  },
  {
    id: '1213',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/timi.png`,
    title: 'Timi',
    teamMember: '장유빈(FE) 외 4명',
    summary: '가장 간편한 그룹 시간 조율 서비스',
    content: `모바일 환경 최적화 - 공유가 편리한 그룹 시간 관리 서비스

간편한 일회성 서비스 - 이름만 입력하여도 로그인 가능

시간 입력 방식 다양화 - 드래그 시간 입력 + 직접 시간 입력 방식

시간 별 상세 코멘트 가능 - 설명이 필요한 시간이 있는 경우 코멘트 작성

파악하기 쉬운 최적 시간 - 색상으로 모든 팀원이 가능한 시간을 한 눈에 파악

최종 확정 시간 표시 - 그룹의 최종 확정 시간과 만남 장소를 확정지어 팀원 모두 확인 가능`,
    googleDriveUrl: 'https://drive.google.com/file/d/1Q48bgaYi2ee0oF6QQ65-xPlT3A99TaD1/view?usp=sharing',
    gitOrgUrl: 'https://github.com/4LineThon',
    gitBeUrl: null,
    gitFeUrl: 'https://github.com/4LineThon/Frontend',
    no: '12기',
    category: '4호선톤',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
  {
    id: '1214',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/yourstory.png`,
    title: '당신의 이야기',
    teamMember: '오시은(PM) 강주은(FE) 성윤정(FE) 이효림(BE) 정지윤(BE)',
    summary: '이타적 자서전을 통해 세대를 연결하는 사회적 가치 창출 공공 웹서비스',
    content: `봉사자와 사회복지 센터 간 연계로 홀몸 어르신 말벗 활동과 동시에 이타적 자서전 대필 봉사 활동 웹서비스를 통한 봉사 프로그램 구축 및 시스템화

센터(사회복지사/홀몸 어르신)과 지자체(도서관/출판사), 그리고 개인(봉사자/웹 방문자)가 상호작용하며 20~30대 청년층과 60~80대의 어르신과의 만남을 통한 세대 간 연결을가능하게 하는 사회적 가치 창출 공공 웹서비스입니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/1D2f5GO6P4wVWJKSbIFzAObiZYXm-uL55/view?usp=sharing',
    gitOrgUrl: null,
    gitBeUrl: 'https://github.com/MINIPROJECT-yourstory/yourstory-BE',
    gitFeUrl: 'https://github.com/MINIPROJECT-yourstory/yourstory-FE',
    no: '12기',
    category: '파이널프로젝트',
    techStack: 'Spring Boot, React(JavaScript)',
    award: null,
  },
  {
    id: '1215',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/imfine.png`,
    title: '아임파인',
    teamMember: '박우현(PM) 최현서(FE) 이현정(FE) 경민서(BE) 유채민(BE)',
    summary: '어린이 금융교육 플랫폼',
    content: `
아이들이 건강하고 올바른 경제관념을 가질 수 있도록 금융 경제 상식을 교육하고 더 나아가 아이들이 현명한 소비자이자 생산자로 성장하여 경제적인 사회 구성원이 될 수 있도록 지원하고자 합니다.

지속적이고 쉽게 접근 가능한 어린이들을 위한 금융교육을 제공하기 위해 전 날의 경제 뉴스를 요약하여 제공하고, 해당 내용 기반 퀴즈 기능을 구현하였습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/11McZ1eQsVe7w0voA0y3a2UkQZUsOFGUF/view?usp=sharing',
    gitOrgUrl: 'https://github.com/LikeLion-mini-project-IMFINE',
    gitBeUrl: null,
    gitFeUrl: null,
    no: '12기',
    category: '파이널프로젝트',
    techStack: 'Spring Boot, React(JavaScript)',
    award: null,
  },
  {
    id: '1216',
    thumbnail: `${TWELFTH_PROJECT_IMAGE_PATH}/erumi.png`,
    title: '이루미',
    teamMember: '김보미(PM) 유동은(FE) 장유빈(FE) 서문지(BE) 홍상희(BE)',
    summary: '나라는 꿈을 이뤄가는 공간: 버킷리스트 아카이브 서비스',
    content: `카테고리 별 장기적인 버킷리스트를 작성하고 관리하고 싶은 사용자, 또는 자기 개발과 꿈을 이루고 싶은 사용자 등을 주요 타겟으로 한 버킷리스트 아카이브 서비스

주요 기능으로는 버킷리스트 작성, 버킷리스트 목록 확인, 버킷리스트 커뮤니티가 있습니다.`,
    googleDriveUrl: 'https://drive.google.com/file/d/18TEDAvhG1aOmD2GqkwH5mhUCXVNBR8dd/view?usp=sharing',
    gitOrgUrl: 'https://github.com/miniproject-likelion12th',
    gitBeUrl: null,
    gitFeUrl: null,
    no: '12기',
    category: '파이널프로젝트',
    techStack: 'Django, React(JavaScript)',
    award: null,
  },
];
