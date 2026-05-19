import React, { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  MessageSquare,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Check,
  Menu as MenuIcon,
  X,
  Sparkles,
  Info,
  Droplet,
  Coffee,
  CheckCircle,
  ArrowRight,
  Smartphone,
  BookOpen,
  Mail,
  AlertCircle
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface Ingredient {
  name: string;
  weight: string;
  origin: string;
}

interface Nutrition {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  price: number;
  category: "brunch" | "pasta" | "steak" | "drink";
  image: string;
  tagline: string;
  description: string;
  isBest?: boolean;
  isVegan?: boolean;
  hashtags: string[];
  cookingTime: string;
  allergens: string[];
  ingredients: Ingredient[];
  nutrition: Nutrition;
  reviews: Review[];
  bgIcon?: string;
  secretTitle?: string;
  secretDesc?: string;
  secretImage?: string;
}

// ==========================================
// MENU STATIC DATA
// ==========================================
const MENU_DATA: MenuItem[] = [
  {
    id: "prime-steak",
    name: "프라임 안심 스테이크",
    englishName: "Prime Tenderloin Steak",
    price: 54000,
    category: "steak",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    tagline: "참나무 장작으로 훈연하여 깊은 풍미를 더한 최고급 안심 스테이크",
    description: "USDA 최고 프라임 등급의 안심만을 엄선하여 21일간 저온 숙성했습니다. 은은한 향이 배어나오는 참나무 화덕에서 최고 온도로 표면을 빠르게 시어링하여 육즙 손실을 원천적으로 차단했으며, 입안 가득 맴도는 감칠맛과 참나무 고유의 그윽한 숯불 향의 조화가 환상적입니다.",
    isBest: true,
    hashtags: ["참나무장작", "프라임등급", "저탄고지", "시그니처디너"],
    cookingTime: "25분",
    allergens: ["쇠고기", "우유(버터)"],
    ingredients: [
      { name: "안심 소고기 (USDA Prime)", weight: "180g", origin: "미국산" },
      { name: "계절 아스파라거스 & 미니 당근", weight: "50g", origin: "국내산 (제주)" },
      { name: "AOP 등급 이즈니 버터", weight: "15g", origin: "프랑스산" },
      { name: "블랙 트러플 말돈 소금", weight: "2g", origin: "영국산" }
    ],
    nutrition: {
      calories: "480 kcal",
      protein: "38g",
      carbs: "4g",
      fat: "32g"
    },
    reviews: [
      { author: "정민호", rating: 5, date: "2026.04.12", comment: "참나무 불향이 안심 스테이크 전체에 은은하게 피어올라서 첫입부터 마지막까지 정말 깊은 감동을 받았습니다. 굽기는 미디움 웰던으로 주문했는데 안쪽이 놀랍도록 촉촉하고 야들하네요." },
      { author: "Sarah K.", rating: 5, date: "2026.05.01", comment: "The quality of meat is outstanding! Best tenderloin steak in Seoul. The warm woodfired flavor makes it completely unique. Highly recommended for anniversaries." },
      { author: "이진우", rating: 5, date: "2026.05.10", comment: "부모님 결혼기념일에 예약해서 다녀왔는데 셰프님이 정성스럽게 서빙해 주셔서 너무 행복했습니다. 스테이크 겉면의 바삭한 크러스트와 부드러운 속살의 대비가 만점입니다." }
    ],
    secretTitle: "Oak Wood Fired Heat (참나무 화덕 훈연의 과학)",
    secretDesc: "샤이닝 테이블의 자랑인 이탈리아산 황토 화덕은 450도 이상의 초고온을 유지합니다. 엄선된 국산 참나무 장작으로 피워낸 강력한 화력은 단순한 열기뿐 아니라 고기 내부 깊숙이 참나무 진액의 향을 불어넣습니다. 과학적인 열 순환 설계 덕분에 가벼운 참나무 훈연막이 겉돌지 않고 퍼져 고기의 부드러운 육향을 몇 배나 드높입니다.",
    secretImage: "https://images.unsplash.com/photo-1582260838182-0ea510101490?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "basil-pasta",
    name: "바질 페스토 파스타",
    englishName: "Fresh Basil Pesto Pasta",
    price: 22000,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    tagline: "전남 구례산 유기농 바질과 고소한 가평 잣으로 직접 찧어 개어낸 생 바질 파스타",
    description: "시판 제품으로는 결코 따라올 수 없는 녹색의 싱그러운 아로마를 자랑합니다. 아침 이슬을 가득 머금은 새벽 수확 바질과 이탈리아 전통 파마산 에이징 치즈, 그리고 청정 가평 잣을 절구로 직접 찧는 전통 방식을 고집하여 공기 접촉을 최소화하고 풀잎 고유의 초록 빛깔과 향기를 싱그럽게 보존해 서빙합니다.",
    isBest: true,
    hashtags: ["구례생바질", "수제페스토", "프레시그린", "가평잣"],
    cookingTime: "12분",
    allergens: ["밀(밀가루)", "견과류(잣)", "우유(파마산치즈)"],
    ingredients: [
      { name: "유기농 무농약 바질", weight: "40g", origin: "국내산 (구례)" },
      { name: "최고급 청정 가평 잣", weight: "20g", origin: "국내산 (가평)" },
      { name: "24개월 숙성 네추럴 레지아노", weight: "15g", origin: "이탈리아산" },
      { name: "데체코 스파게티니 & 엑스트라버진", weight: "100g", origin: "이탈리아산" }
    ],
    nutrition: {
      calories: "540 kcal",
      protein: "14g",
      carbs: "62g",
      fat: "24g"
    },
    reviews: [
      { author: "김민수", rating: 5, date: "2026.03.20", comment: "이 파스타는 첫 숟가락을 드는 순간 입안에 허브 숲이 펼쳐집니다. 전혀 텁텁하지 않고 가평 잣 특유의 고소한 지방 맛이 소스 전체에 가볍게 잘 고 녹아들었네요. 매주 생각나는 마성의 맛입니다!" },
      { author: "이은지", rating: 5, date: "2026.04.28", comment: "인생 바질 파스타예요. 색감도 완전 예술적인 형광 연록색이고 바질 시트러스 아로마가 다 먹을 때까지 쨍하게 살아서 진짜 행복한 점심 브런치였습니다." }
    ],
    secretTitle: "Mortar Grind Artisan (돌절구로 찧어낸 수제 미학)",
    secretDesc: "고속 블렌더로 휘핑하면 회전 칼날의 마찰 열로 인해 바질 잎의 엽록소가 금세 타버려 거뭇해지고 아로마 오일이 휘발합니다. 당사는 수고스럽더라도 식재료의 세포를 으깨어 향긋하고 불휘발성 오일을 완벽히 추출해내는 '차가운 돌절구 으깸(Artisan Pestle & Mortar)' 방식을 여전히 계승하고 있습니다. 입체적이고 서정적으로 밀려드는 질감의 비밀이 바로 여기에 있습니다.",
    secretImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "avocado-toast",
    name: "아보카도 가든 토스트",
    englishName: "Avocado Garden Toast",
    price: 18000,
    category: "brunch",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=1200&q=80",
    tagline: "숲속의 버터 아보카도와 수란을 곁들인 건강 호밀 브런치 토스트",
    description: "천연 효모 사워도우 토스트 위에 유기농 허브 필드 크림치즈를 듬뿍 바르고, 질감이 균일하고 가장 부드러운 상태로 후숙한 해발 2,000m 고원 에스텔라 아보카도를 도톰하게 꽃모양으로 슬라이싱해 겹겹이 얹었습니다. 그 위에 뜨거운 수란을 무심하게 올려 톡 터지는 오렌지빛 노른자의 농밀함까지 함께 만끽하실 수 있습니다.",
    isBest: false,
    isVegan: true,
    hashtags: ["후숙아보카도", "유기농수란", "천연사워도우", "헬시브런치", "비건옵션가능"],
    cookingTime: "10분",
    allergens: ["밀(사워도우)", "에그(계란)", "우유(크림치즈)"],
    ingredients: [
      { name: "최상급 멕시코 아보카도", weight: "1개 (120g)", origin: "멕시코 에스텔라" },
      { name: "방사형 토종 유정란 (수란)", weight: "1알", origin: "국내산 (충주)" },
      { name: "천연발효 사워도우 호밀빵", weight: "80g", origin: "수제 자체베이킹" },
      { name: "참깨 타히니 바질 오일", weight: "5ml", origin: "국내산" }
    ],
    nutrition: {
      calories: "395 kcal",
      protein: "12g",
      carbs: "34g",
      fat: "19g"
    },
    reviews: [
      { author: "한소희", rating: 4, date: "2026.04.18", comment: "아보카도를 아끼지 않고 통째로 한 개 이상 올린 비주얼에 감동했어요. 사워도우 빵은 바삭하면서도 쫀득한 안살 질감이 대단히 만족스럽고, 수란 크림과 곁들이면 가벼운 오찬으로 딱입니다." },
      { author: "David L.", rating: 5, date: "2026.05.04", comment: "Fresh, beautifully plated and super nourishing. The egg yolk is incredibly creamy. Best brunch location ever!" }
    ],
    secretTitle: "The Sourdough Microbe (천연 효모 사워도우의 미학)",
    secretDesc: "우리의 사워도우는 인공 이스트를 전면 배제하고, 프랑스 밀과 정수된 물을 섞어 6년째 보존 중인 마더 스타터 '샤이니 마더'로 72시간 발효해 굽습니다. 이 촉촉하고 가벼운 가득한 사워도우는 소화가 대단히 부드러우며 은은한 천연 사워 풍미가 아보카도의 유지방과 놀라운 케미를 선사합니다."
  },
  {
    id: "berry-pancakes",
    name: "베리베리 팬케이크",
    englishName: "Double Berry Fluffy Pancakes",
    price: 16000,
    category: "brunch",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
    tagline: "솜사탕처럼 사르르 녹는 폭신한 팬케이크와 네 가지 계절 야생 베리 콩포트",
    description: "일본식 수플레 기법과 프렌치 머랭 레시피의 장점만을 미세 배합하여 타협할 수 없는 폭신함의 정점을 안겨드립니다. 직접 제조한 천연 우유 오리지널 메이플 마스카포네 휩크림과 3시간 동안 뭉근하게 졸여 과육이 고스란히 씹히는 라즈베리, 블루베리, 블랙베리, 레드커런트 수제 믹스 콩포트를 풍성하게 흘림 데코레이션했습니다.",
    isBest: false,
    hashtags: ["폭신팬케이크", "마스카포네크림", "수제베리콩포트", "기분좋은단맛"],
    cookingTime: "15분",
    allergens: ["밀", "에그", "우유"],
    ingredients: [
      { name: "프랑스산 유기농 밀가루 T55", weight: "80g", origin: "프랑스산" },
      { name: "계절 냉장 블루베리 & 블랙베리", weight: "40g", origin: "국내산, 칠레산" },
      { name: "덴마크산 마스카포네 트리플 크림", weight: "30g", origin: "덴마크산" },
      { name: "버몬트 오리지널 단풍나무 수액", weight: "20ml", origin: "캐나다산" }
    ],
    nutrition: {
      calories: "620 kcal",
      protein: "10g",
      carbs: "85g",
      fat: "18g"
    },
    reviews: [
      { author: "유하은", rating: 5, date: "2026.04.22", comment: "이거 꼭 시키세요! 정말 솜사탕처럼 폭폭해서 입에서 연기처럼 녹아버립니다. 베리 콩포트 소스가 지나치게 달지 않고 새콤한 활력을 줘서 에스프레소 커피랑 절묘한 매칭이 되었습니다." }
    ]
  },
  {
    id: "carbonara",
    name: "클래식 카르보나라",
    englishName: "Traditional Roman Carbonara",
    price: 20000,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80",
    tagline: "생크림 한 방울 없이 오직 노른자와 로마 페코리노 치즈로 가득 채운 클래식 로마식 파스타",
    description: "정통 로마 방식 가이드라인을 엄격히 수호합니다. 훈연한 이탈리아 베이컨 '관찰레'를 자작하게 고열로 구워 기름을 우려낸 뒤, 알 dente로 저온 가공 추출된 그라냐노 스파게티 가닥에 온화한 62도의 스팀 온도에서 자연방사 친환경 노른자 크림과 이탈리아 야생 양젖 페코리노 로마노 치즈만을 교밀하게 에멀전 유화하여 깊은 고소함의 원조를 경험하세요.",
    isBest: false,
    hashtags: ["관찰레최고급", "페코리노로마노", "오리지널로마식", "생크림무첨가"],
    cookingTime: "14분",
    allergens: ["밀", "에그", "우유(양젖치즈)"],
    ingredients: [
      { name: "정품 이탈리아 마스뜨로 관찰레", weight: "40g", origin: "이탈리아 라치오" },
      { name: "로마노 양젖 하드 페코리노 치즈", weight: "25g", origin: "이탈리아산" },
      { name: "유기농 야생 방사 유정란 노른자", weight: "2알", origin: "국내산" },
      { name: "그라냐노 이탈리아 동압착 스파게티", weight: "90g", origin: "이탈리아산" }
    ],
    nutrition: {
      calories: "690 kcal",
      protein: "22g",
      carbs: "58g",
      fat: "31g"
    },
    reviews: [
      { author: "박상현", rating: 5, date: "2026.03.11", comment: "한국에서 먹은 로마식 카르보나라 중 최고입니다. 생크림 특유의 뭉뚝하고 느끼한 끝맛 대신 관찰레 베이컨의 기분 좋은 염도와 치즈 가루의 매큼 구수한 맛이 면발 하나하나 진하게 감겨요." }
    ]
  },
  {
    id: "orange-ade",
    name: "시그니처 오렌지 에이드",
    englishName: "Signature Orange Sparkling Ade",
    price: 8000,
    category: "drink",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
    tagline: "캘리포니아 썬플라워 유기농 오렌지를 통째로 착즙하고 초밀 탄산을 가미한 수제 에이드",
    description: "시판 시럽과 인공 파우더를 단 1g도 섞지 않습니다. 따뜻한 햇살을 가득 받고 자라 당도가 최상에 달한 생 오렌지만을 셰프들이 프레스로 당일 아침 수동 착즙하며, 목넘김이 조밀하고 부드러운 탄산수와 수제 비정제 사탕수수 시럽, 애플민트 허브로 향긋한 활기를 가미한 눈이 번쩍 뜨이는 싱그러운 오렌지 칵테일 에이드입니다.",
    isBest: false,
    hashtags: ["생오렌지착즙", "초밀탄산", "유기농애플민트", "무방부제무색소"],
    cookingTime: "5분",
    allergens: ["없음(과일류)"],
    ingredients: [
      { name: "캘리포니아 오디세이 생오렌지", weight: "1.5개", origin: "미국산" },
      { name: "천연 자작나무 시럽 탄산수", weight: "250ml", origin: "이탈리아 가스바르" },
      { name: "유기농 가든 애플민트", weight: "3g", origin: "매장 테라스텃밭" }
    ],
    nutrition: {
      calories: "140 kcal",
      protein: "1g",
      carbs: "32g",
      fat: "0g"
    },
    reviews: [
      { author: "최유진", rating: 5, date: "2026.05.02", comment: "자극적으로 인위적인 시럽 단맛이 전혀 아니고 오렌지 오리지널 과일 주스 배합에 톡 쏘는 기포가 너무 고급스럽습니다. 무조건 1인 1잔 추천 드려요 정말 맑아집니다." }
    ]
  }
];

// ==========================================
// STORY TEXTS & BRAND QUOTES
// ==========================================
const BRAND_STORIES = {
  about: "따스한 아침 햇살을 닮은 미식의 정원, 샤이닝 테이블에 오신 것을 환영합니다.",
  philosophies: [
    {
      title: "기분 좋은 새벽 농장의 영양",
      desc: "우리는 신선한 아침 식사를 위해 매일 새벽 4시, 전속 계약을 맺은 전국 각지의 유기농 농장 식자재와 허브들을 문 앞까지 직배송 받습니다. 보존을 위한 냉방 화학 물질을 단 일체 가미하지 않은 내추럴 상태의 싱그러운 흙냄새를 머금은 푸름을 식탁 위에 고스란히 옮깁니다."
    },
    {
      title: "기본과 본질을 고집하는 요리",
      desc: "지름길을 찾는 인공 조미료(MSG)나 가공 통조림 식품은 우리의 주방에 들일 자리가 없습니다. 스테이크 참나무 직화 훈연, 직접 찧는 바질 오일, 72시간 배지 발효 사워도우 도우까지 전통 시간과 노력이 빚어내는 정직한 본질만이 최고의 속 편함과 감동을 창출할 수 있기 때문입니다."
    },
    {
      title: "따뜻한 사랑과 연결의 복합 공간",
      desc: "단지 밥을 바쁘고 가볍게 떼우는 자리가 아닙니다. 은은히 쏟아지는 아침 온실 테라스 통창 아래 빛줄기 속에서 평소 사랑하는 이의 눈빛을 온전히 마주하고, 일상의 피로를 한 줌 씻어낼 수 있도록 구석구석 정교한 조도, 테이블 배음, 가구 촉감까지 한 획 다정한 배려를 새겨두었습니다."
    }
  ],
  chefSpeech: {
    avatar: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    name: "박준선 총괄 헤드 셰프 (Executive Chef)",
    quote: "주방의 뜨거운 화덕 안 참나무 향이 홀을 은은히 데우고, 테이블 위 기어는 따스한 햇빛과 흘려퍼지는 재즈가 조화를 이룰 때 비로소 진정한 파인다이닝 브런치가 완벽해집니다. 최고의 맛은 타협 없는 새벽 수확과, 접시 위에 진심 한 티스푼을 아낌없이 녹여내 고된 귀하께 행복을 선물하는 것입니다."
  }
};

// ==========================================
// SPARKLE PARTICLE LOGIC
// ==========================================
interface SparkleParticle {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  dx: number;
  dy: number;
  shape: "diamond" | "star8" | "circle" | "ring";
  duration: number;
  delay: number;
  spin: number;
}

function SparklesOverlay() {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    const handleSparkle = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = customEvent.detail;
      
      const luxuryGolds = [
        "#C68B59", // Warm copper gold
        "#FBBF24", // Vibrant amber
        "#FCD34D", // Luxury gold
        "#FEF08A", // Champagne light yellow
        "#FFFBEB", // Pearl off-white
        "#818CF8", // Shimmer violet/silver touch
        "#34D399", // Soft emerald shimmer
        "#FFFFFF", // Clear bright star white
      ];

      const shapes: ("diamond" | "star8" | "circle" | "ring")[] = [
        "diamond",
        "star8",
        "circle",
        "ring",
      ];
      
      // We will generate 35 magical particles with staggered styles
      const newParticles: SparkleParticle[] = Array.from({ length: 35 }).map((_, i) => {
        // Distribute nicely across 360 degrees
        const angle = (i * (360 / 35) + Math.random() * 15) * (Math.PI / 180);
        
        // Two tiers of particles: Fast explosion and Slow drifting trail
        const isTrail = i % 3 === 0;
        const velocity = isTrail 
          ? 2.0 + Math.random() * 3.5  // Slower trail
          : 4.5 + Math.random() * 8.0; // Fast energetic outward burst
          
        return {
          id: `${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          color: luxuryGolds[Math.floor(Math.random() * luxuryGolds.length)],
          size: isTrail
            ? 4 + Math.random() * 5     // Smaller stardust trail
            : 8 + Math.random() * 12,   // Larger premium stars
          dx: Math.cos(angle) * velocity,
          dy: Math.sin(angle) * velocity,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          duration: isTrail 
            ? 0.8 + Math.random() * 0.6 // Drifting lasts longer
            : 0.5 + Math.random() * 0.4, // Instant impact has shorter flash
          delay: isTrail 
            ? 0.02 + Math.random() * 0.12 // Beautiful staggered stardust stream
            : 0,
          spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 240),
        };
      });

      // Keep up to 350 active particles overall to maintain gorgeous visual fidelity without losing frames
      setParticles((prev) => [...prev, ...newParticles].slice(-350));
    };

    window.addEventListener("menu-sparkle", handleSparkle as EventListener);
    return () => window.removeEventListener("menu-sparkle", handleSparkle as EventListener);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              // Elegant física acceleration/deceleration using custom keyframe intervals:
              // Fast starting motion followed by slow environmental hover drift
              x: [
                p.x, 
                p.x + p.dx * 12, 
                p.x + p.dx * 20, 
                p.x + p.dx * 25, 
                p.x + p.dx * 27
              ],
              y: [
                p.y, 
                p.y + p.dy * 12, 
                p.y + p.dy * 20 + 8,  // Gentle weight/gravity addition starts
                p.y + p.dy * 25 + 24, // Slowing drift downwards
                p.y + p.dy * 27 + 45  // Soft final settle down
              ],
              scale: [0, 1.4, 1.1, 0.6, 0],
              opacity: [0, 1, 0.95, 0.6, 0],
              rotate: [0, p.spin * 0.4, p.spin * 0.7, p.spin * 0.9, p.spin],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.12, 0.8, 0.3, 1], // Custom ultra-premium cubic bezier curve
            }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(253,224,71,0.55)]"
            style={{ width: p.size, height: p.size }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full select-none"
            >
              {p.shape === "diamond" && (
                <path
                  d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
                  fill={p.color}
                />
              )}
              {p.shape === "star8" && (
                <path
                  d="M12 0L14.3 8.3L22 6L15.7 12L22 18L14.3 15.7L12 24L9.7 15.7L2 18L8.3 12L2 6L9.7 8.3Z"
                  fill={p.color}
                />
              )}
              {p.shape === "circle" && (
                <circle cx="12" cy="12" r="8" fill={p.color} />
              )}
              {p.shape === "ring" && (
                <circle
                  cx="12"
                  cy="12"
                  r="7.5"
                  stroke={p.color}
                  strokeWidth="2.5"
                  fill="none"
                />
              )}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// COMPACT HELPER FUNCTIONS
// ==========================================
const formatKRW = (val: number) => {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" })
    .format(val)
    .replace("₩", "₩ ");
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "menu" | "story" | "reserve">("home");
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reservation Form states
  const [resDate, setResDate] = useState<string>("");
  const [resGuests, setResGuests] = useState<number>(2);
  const [resTime, setResTime] = useState<string>("");
  const [resNotes, setResNotes] = useState<string>("");

  // Saved reservations state
  const [savedReservations, setSavedReservations] = useState<any[]>([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [lastResDetails, setLastResDetails] = useState<any | null>(null);

  // Premium Custom Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedMenuId]);

  // Automatically dismiss toast reports
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Global magical sparkle listener on all buttons/menu elements
  useEffect(() => {
    const handleGlobalClick = (e: any) => {
      let target = e.target as HTMLElement | null;
      let shouldSparkle = false;

      while (target && target !== document.body) {
        if (
          target.getAttribute("data-sparkle") === "true" ||
          target.id?.includes("menu") ||
          target.id?.includes("featured") ||
          target.id?.includes("filter") ||
          target.id?.includes("nav") ||
          target.id?.includes("brand") ||
          target.id?.includes("wishlist") ||
          target.id?.includes("direct") ||
          target.id?.includes("detail") ||
          target.id?.includes("cta") ||
          target.id?.includes("btn") ||
          target.tagName === "BUTTON"
        ) {
          shouldSparkle = true;
          break;
        }
        target = target.parentElement;
      }

      if (shouldSparkle) {
        const event = new CustomEvent("menu-sparkle", { detail: { x: e.clientX, y: e.clientY } });
        window.dispatchEvent(event);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Read saved reservations on load
  useEffect(() => {
    const saved = localStorage.getItem("shining_reservations");
    if (saved) {
      try {
        setSavedReservations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleWishlistToggle = (id: string, e?: MouseEvent<HTMLButtonElement>) => {
    if (e) e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const currentYear = 2026;
  const currentMonth = 5; // June (0-indexed 5 = June)

  const handleDirectReservation = (menuId: string) => {
    // autofill info if available
    const item = MENU_DATA.find((m) => m.id === menuId);
    setResNotes(item ? `[${item.name}] 예약을 우선 지정 요청합니다.` : "");
    setSelectedMenuId(null);
    setActiveTab("reserve");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800 transition-all duration-300 relative select-none">
      {/* MAGICAL EMITTER PORTAL */}
      <SparklesOverlay />

      {/* FLOATING PREMIUM TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="fixed bottom-6 right-6 z-[9999] bg-stone-900 border border-emerald-800/40 text-[#FAF9F5] px-6 py-4 rounded-2xl shadow-[0_25px_50px_-12px_rgba(77,96,78,0.3)] flex items-center space-x-3 max-w-sm"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C68B59] animate-spin" />
            </div>
            <p className="text-xs sm:text-sm font-medium pr-1">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActiveTab("home");
              setSelectedMenuId(null);
            }}
            id="brand-logo-btn"
            className="flex items-center space-x-2 text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-[#FAF9F5] shadow-md shadow-emerald-900/10">
              <Sparkles className="w-5 h-5 animate-pulse" id="nav-sparkle-icon" />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-emerald-950 font-serif-elegant">
                샤이닝 테이블
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#C68B59] -mt-1 font-semibold">
                Sunshine Brunch & Dining
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                setActiveTab("home");
                setSelectedMenuId(null);
              }}
              id="nav-home"
              className={`relative text-sm font-medium tracking-wide transition-colors py-2 cursor-pointer ${
                activeTab === "home" && !selectedMenuId
                  ? "text-emerald-800 font-bold"
                  : "text-stone-500 hover:text-emerald-800"
              }`}
            >
              <span className="relative z-10 px-1">홈</span>
              {activeTab === "home" && !selectedMenuId && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-800 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("menu");
                setSelectedMenuId(null);
              }}
              id="nav-menu"
              className={`relative text-sm font-medium tracking-wide transition-colors py-2 cursor-pointer ${
                activeTab === "menu" || selectedMenuId
                  ? "text-emerald-800 font-bold"
                  : "text-stone-500 hover:text-emerald-800"
              }`}
            >
              <span className="relative z-10 px-1">메뉴</span>
              {(activeTab === "menu" || selectedMenuId) && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-800 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("story");
                setSelectedMenuId(null);
              }}
              id="nav-story"
              className={`relative text-sm font-medium tracking-wide transition-colors py-2 cursor-pointer ${
                activeTab === "story" && !selectedMenuId
                  ? "text-emerald-800 font-bold"
                  : "text-stone-500 hover:text-emerald-800"
              }`}
            >
              <span className="relative z-10 px-1">브랜드 스토리</span>
              {activeTab === "story" && !selectedMenuId && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-800 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("reserve");
                setSelectedMenuId(null);
              }}
              id="nav-reserve"
              className={`relative text-sm font-medium tracking-wide transition-colors py-2 cursor-pointer ${
                activeTab === "reserve" && !selectedMenuId
                  ? "text-emerald-800 font-bold"
                  : "text-stone-500 hover:text-emerald-800"
              }`}
            >
              <span className="relative z-10 px-1">예약하기</span>
              {activeTab === "reserve" && !selectedMenuId && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-800 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {wishlist.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab("menu");
                  setSelectedMenuId(null);
                }}
                id="wishlist-badge-btn"
                className="relative p-2 text-stone-600 hover:text-rose-500 transition-colors"
                title={`${wishlist.length}개의 위시리스트 품목`}
              >
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold animate-bounce">
                  {wishlist.length}
                </span>
              </button>
            )}
            <button
              onClick={() => {
                setActiveTab("reserve");
                setSelectedMenuId(null);
              }}
              id="nav-cta-reserve"
              className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider bg-emerald-800 text-[#FAF9F5] shadow-xs hover:bg-[#5E7260] active:scale-95 transition-all cursor-pointer"
            >
              지금 예약하기
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center space-x-3">
            {wishlist.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab("menu");
                  setSelectedMenuId(null);
                }}
                id="mobile-wishlist-btn"
                className="relative p-2 text-rose-500"
              >
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 text-stone-700 hover:text-emerald-800 transition-colors focus:outline-hidden touch-target animate-bounce"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-stone-200 bg-[#FAF9F5] overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3 flex flex-col">
                <button
                  onClick={() => {
                    setActiveTab("home");
                    setSelectedMenuId(null);
                    setMobileMenuOpen(false);
                  }}
                  id="mobile-nav-home"
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-emerald-800 transition-all touch-target"
                >
                  홈
                </button>
                <button
                  onClick={() => {
                    setActiveTab("menu");
                    setSelectedMenuId(null);
                    setMobileMenuOpen(false);
                  }}
                  id="mobile-nav-menu"
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-emerald-800 transition-all touch-target"
                >
                  메뉴 탐색
                </button>
                <button
                  onClick={() => {
                    setActiveTab("story");
                    setSelectedMenuId(null);
                    setMobileMenuOpen(false);
                  }}
                  id="mobile-nav-story"
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-emerald-800 transition-all touch-target"
                >
                  브랜드 스토리
                </button>
                <button
                  onClick={() => {
                    setActiveTab("reserve");
                    setSelectedMenuId(null);
                    setMobileMenuOpen(false);
                  }}
                  id="mobile-nav-reserve"
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-emerald-800 transition-all touch-target"
                >
                  실시간 예약하기
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveTab("reserve");
                      setSelectedMenuId(null);
                      setMobileMenuOpen(false);
                    }}
                    id="mobile-nav-cta-btn"
                    className="w-full py-3 rounded-full text-center text-sm font-semibold bg-emerald-800 text-[#FAF9F5] shadow-xs cursor-pointer"
                  >
                    일반 및 단체 단독 예약
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CORE CONTENT NAVIGATION */}
      <main className="flex-grow overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          {selectedMenuId ? (
            <motion.div
              key={`detail-${selectedMenuId}`}
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <MenuDetailView
                menuId={selectedMenuId}
                onBack={() => setSelectedMenuId(null)}
                wishlist={wishlist}
                onWishlistToggle={handleWishlistToggle}
                onReserve={handleDirectReservation}
                onShowToast={(msg) => setToastMessage(msg)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -35, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "home" && (
                <HomeView
                  onNavigate={(tab) => {
                    setActiveTab(tab);
                    setSelectedMenuId(null);
                  }}
                  onSelectMenu={(id) => setSelectedMenuId(id)}
                  wishlist={wishlist}
                  onWishlistToggle={handleWishlistToggle}
                  onShowToast={(msg) => setToastMessage(msg)}
                />
              )}
              {activeTab === "menu" && (
                <MenuView
                  onSelectMenu={(id) => setSelectedMenuId(id)}
                  wishlist={wishlist}
                  onWishlistToggle={handleWishlistToggle}
                  onReserveDirect={handleDirectReservation}
                  onShowToast={(msg) => setToastMessage(msg)}
                />
              )}
              {activeTab === "story" && (
                <StoryView
                  onNavigate={(tab) => {
                    setActiveTab(tab);
                    setSelectedMenuId(null);
                  }}
                />
              )}
              {activeTab === "reserve" && (
                <ReservationView
                  resDate={resDate}
                  setResDate={setResDate}
                  resGuests={resGuests}
                  setResGuests={setResGuests}
                  resTime={resTime}
                  setResTime={setResTime}
                  resNotes={resNotes}
                  setResNotes={setResNotes}
                  currentYear={currentYear}
                  currentMonth={currentMonth}
                  onSuccess={(details) => {
                    setLastResDetails(details);
                    setSuccessModalOpen(true);
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1C201C] text-stone-400 border-t border-emerald-950 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif-elegant">
                샤이닝 테이블
              </span>
            </div>
            <p className="text-sm max-w-sm text-stone-400/95 leading-relaxed font-light">
              빛나는 아침 햇살 아래에서 펼쳐지는 정교한 유기농 브런치와, 참나무 화덕으로 훈연한 최고급 스테이크 특선을 사랑하는 사람들과 함께 온전히 만끽하세요.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <p>상호명: (주)샤이닝에프앤비 | 대표이사: 박준선</p>
              <p>사업자등록번호: 214-88-019283 | 서울시 서초구 신반포로 12</p>
              <p>이메일: rsvp@shiningtable.co.kr</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-serif-elegant">
              운영 및 서비스
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => { setActiveTab("home"); setSelectedMenuId(null); }} className="hover:text-amber-500 cursor-pointer transition-colors text-left" id="footer-link-home">
                  홈페이지 오버뷰
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("menu"); setSelectedMenuId(null); }} className="hover:text-amber-500 cursor-pointer transition-colors text-left" id="footer-link-menu">
                  브런치 & 디너 전체 메뉴
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("story"); setSelectedMenuId(null); }} className="hover:text-amber-500 cursor-pointer transition-colors text-left" id="footer-link-story">
                  브랜드 이야기 & 철학
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("reserve"); setSelectedMenuId(null); }} className="hover:text-amber-500 cursor-pointer transition-colors text-left" id="footer-link-reserve">
                  통합 온라인 실시간 예약
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Info */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-serif-elegant">
              이용 안내 & 영업시간
            </h4>
            <div className="text-sm leading-relaxed space-y-1">
              <p>화요일 - 일요일 (매주 월요일 정기 휴무)</p>
              <p>영업시간 : 오전 11:00 ~ 오후 21:00</p>
              <p className="text-amber-500 font-semibold text-[12px]">
                BreakTime : 15:00 - 17:00 (식사 주방 완전 정비 휴식시간)
              </p>
              <p>마지막 주문 : 점심 14:30 | 저녁 20:30</p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-500">
              <MapPin className="w-4 h-4 text-[#C68B59]" />
              <span>전동차 발렛 파킹 무료 서비스 제공</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SHINING TABLE Boutique Dining. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <span className="cursor-pointer hover:underline">개인정보처리방침</span>
            <span>|</span>
            <span className="cursor-pointer hover:underline">이용약관</span>
          </div>
        </div>
      </footer>

      {/* RESERVATION SUCCESS MODAL */}
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          setActiveTab("home");
          setSelectedMenuId(null);
        }}
        details={lastResDetails}
      />
    </div>
  );
}

// ==========================================
// VIEW 1: HOME OVERVIEW VIEW
// ==========================================
interface HomeViewProps {
  onNavigate: (tab: "home" | "menu" | "story" | "reserve") => void;
  onSelectMenu: (id: string) => void;
  wishlist: string[];
  onWishlistToggle: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
  onShowToast: (msg: string) => void;
}

function HomeView({ onNavigate, onSelectMenu, wishlist, onWishlistToggle, onShowToast }: HomeViewProps) {
  const featured = MENU_DATA.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 110, damping: 14 },
    },
  };

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative min-h-[550px] lg:h-[650px] flex items-center bg-stone-900 overflow-hidden rounded-b-[2rem] sm:rounded-b-[4rem]" id="home-hero-section">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=1920&q=80"
            alt="Beautiful table presentation of exquisite gourmet brunch"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C201C]/95 via-[#1C201C]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full">
          <div className="max-w-2xl text-left space-y-6">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-white text-xs uppercase tracking-widest backdrop-blur-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C68B59] animate-spin" />
              <span>햇살 아래 즐기는 완벽한 치유</span>
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-white leading-tight font-serif-elegant"
            >
              햇살 아래 즐기는<br />
              <span className="text-[#C68B59]">신선한 브런치 한 접시</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg font-light"
            >
              빛나는 아침 햇살을 닮은 건강하고 따뜻한 요리, 샤이닝 테이블에서 소중한 사람들과의 기분 좋은 시식을 실시간 예약해보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-2 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => onNavigate("reserve")}
                id="hero-reserve-btn"
                className="px-8 py-4 bg-[#C68B59] hover:bg-amber-600 text-white text-[11px] font-bold tracking-widest uppercase rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                지금 자리 예약하기
              </button>
              <button
                onClick={() => onNavigate("menu")}
                id="hero-menu-btn"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF9F5] text-[11px] font-bold tracking-widest uppercase rounded-full backdrop-blur-xs transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                전체 메뉴판 둘러보기
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE FEATURED SIGNATURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C68B59] block mb-2">
            Signature Menu List
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-emerald-950 font-serif-elegant">
            샤이닝 테이블의 시그니처 정찬
          </h2>
          <div className="h-0.5 w-16 bg-[#C68B59] mx-auto mt-4" />
        </div>

        {/* Featured Items Cards with Staggered motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featured.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => onSelectMenu(item.id)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/50 shadow-xs hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              id={`featured-card-${item.id}`}
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                  <button
                    onClick={(e) => {
                      onWishlistToggle(item.id, e);
                    }}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#FAF9F5]/95 text-stone-400 hover:text-rose-500 shadow-sm transition-colors cursor-pointer hover:scale-110 active:scale-95"
                    id={`wishlist-btn-home-${item.id}`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        wishlist.includes(item.id) ? "fill-rose-500 text-rose-500 scale-110" : "text-stone-400"
                      }`}
                    />
                  </button>
                  {item.isBest && (
                    <span className="absolute bottom-4 left-4 inline-flex px-2.5 py-1 text-[9px] font-bold tracking-wider text-white bg-[#C68B59] uppercase rounded-xs">
                      Best choice
                    </span>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[10px] tracking-widest text-[#C68B59] uppercase font-extrabold block">
                    {item.category.toUpperCase()} PREMIUM
                  </span>
                  <h3 className="text-lg font-bold text-emerald-950 group-hover:text-[#C68B59] transition-colors font-serif-elegant">
                    {item.name}
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
                    {item.tagline}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-900 font-mono">
                  {formatKRW(item.price)}
                </span>
                <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 group-hover:underline">
                  자세히 보기 <ArrowRight className="w-3.5 h-3.5 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-8 text-center">
          <button
            onClick={() => onNavigate("menu")}
            id="more-menu-btn"
            className="px-6 py-3 border border-emerald-800 text-emerald-800 rounded-full text-xs font-semibold tracking-widest hover:bg-emerald-800 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            모든 브런치 메뉴 리스트 구경하기
          </button>
        </div>
      </section>

      {/* TODAY SPECIAL DISCOUNT OR SERVICE BANNER with hover motion */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80 }}
        className="bg-[#C68B59] py-10 px-4 md:px-8 text-[#FAF9F5] shadow-xs rounded-[2rem] max-w-7xl mx-auto"
        id="special-banner-section"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="p-3 bg-white/20 rounded-full shrink-0">
              <Sparkles className="w-6 h-6 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold font-serif-elegant tracking-wide">
                [오늘만 만날 수 있는 스페셜 선물 메뉴]
              </h3>
              <p className="text-white/85 text-xs md:text-sm font-light pt-0.5">
                당일 예약 후 방문하시는 모든 오찬 테이블에 메이플 생 타르트 디저트를 무료 테이스팅 서비스해 드립니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onNavigate("reserve");
              onShowToast("오늘만 드리는 무료 타르트 혜택이 적용 예약 모드로 설정되었습니다!");
            }}
            id="special-banner-reserve-btn"
            className="px-6 py-3 bg-white text-[#C68B59] rounded-full text-xs font-bold tracking-wider hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            무료 타르트 혜택 예약해두기
          </button>
        </div>
      </motion.section>

      {/* PROOFS & REVIEWS OVERVIEW */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-stone-200/60 p-8 rounded-2xl shadow-xs space-y-5"
        >
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-stone-200 items-center justify-center">
            <div className="px-8 pb-6 sm:pb-0 text-center">
              <div className="flex items-center justify-center space-x-1 text-[#C68B59] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C68B59] text-[#C68B59]" />
                ))}
              </div>
              <span className="block text-3xl font-extrabold font-mono text-emerald-950">4.89</span>
              <span className="text-[11px] text-stone-400">네이버 평점 (리뷰 1,245건)</span>
            </div>
            <div className="px-8 pt-6 sm:pt-0 text-center">
              <div className="flex items-center justify-center space-x-1 text-[#C68B59] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C68B59] text-[#C68B59]" />
                ))}
              </div>
              <span className="block text-3xl font-extrabold font-mono text-emerald-950">4.96</span>
              <span className="text-[11px] text-stone-400">구글방문 평점 (후기 890건)</span>
            </div>
          </div>
          <p className="text-stone-500 text-xs max-w-lg mx-auto leading-relaxed italic font-light">
            &ldquo;창가로 가득 쏟아지는 아침 한 잔 식사에 눈과 입이 동시에 에너지를 얻었습니다. 예약자가 완전 철저해서 웨이팅 스트레스가 없어서 부모님 대접해 드리기 최고입니다.&rdquo; - 실제 예약 손님 최연우 님
          </p>
        </motion.div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-emerald-900 border border-emerald-950 text-[#FAF9F5] py-16 px-6 sm:px-12 text-center space-y-6">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
              alt="Cozy organic bakery lifestyle background"
              className="w-full h-full object-cover opacity-15"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#1C201C]/85" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif-elegant">
              기분 좋은 아침, 자리를 예약하세요
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light max-w-md mx-auto">
              가장 예쁜 아침 채광줄기와 영양 만점 수제 브런치 정찬을 지금 단 1분 만에 스마트 간편 시스템으로 확보해보세요.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate("reserve")}
                id="cta-bottom-reserve-btn"
                className="px-8 py-3.5 bg-[#C68B59] text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-lg hover:bg-amber-600 transition-all cursor-pointer"
              >
                지금 자리 예약 신청하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



// ==========================================
// VIEW 2: FILTERABLE MENU LIST VIEW
// ==========================================
interface MenuViewProps {
  onSelectMenu: (id: string) => void;
  wishlist: string[];
  onWishlistToggle: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
  onReserveDirect: (menuId: string) => void;
  onShowToast: (msg: string) => void;
}

function MenuView({ onSelectMenu, wishlist, onWishlistToggle, onReserveDirect, onShowToast }: MenuViewProps) {
  const [filter, setFilter] = useState<"all" | "brunch" | "pasta" | "steak" | "drink">("all");

  const filteredItems = MENU_DATA.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#C68B59]">
          Culinary Masterpieces
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-emerald-950 font-serif-elegant">
          브런치의 미학과 정찬
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed font-light">
          새벽 이슬의 신선함과 정교한 조리법이 결합된, 아침을 가장 아름답게 밝혀줄 시그니처 정찬 컬렉션입니다.
        </p>
        <div className="h-0.5 w-12 bg-[#C68B59] mx-auto mt-2" />
      </div>

      {/* FILTER BUTTONS with active pill animation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-stone-200/50 pb-6">
        {[
          { key: "all", value: "전체 미식" },
          { key: "brunch", value: "햇살 브런치" },
          { key: "pasta", value: "수제 파스타" },
          { key: "steak", value: "참나무 스테이크" },
          { key: "drink", value: "시그니처 음료" }
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setFilter(btn.key as any);
              onShowToast(`미식 필터가 '${btn.value}' 카테고리로 설정되었습니다.`);
            }}
            className="relative px-5 py-2.5 rounded-full text-xs font-medium tracking-wider cursor-pointer select-none transition-colors duration-200"
            style={{ WebkitTapHighlightColor: "transparent" }}
            id={`filter-btn-${btn.key}`}
          >
            {filter === btn.key && (
              <motion.span
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-emerald-800 rounded-full shadow-xs"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-200 ${
              filter === btn.key ? "text-[#FAF9F5] font-semibold" : "text-stone-500 hover:text-emerald-800"
            }`}>
              {btn.value}
            </span>
          </button>
        ))}
      </div>

      {/* MENU GRID with Layout Animations */}
      <motion.div
        layout
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        id="menu-catalog-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => onSelectMenu(item.id)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/50 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              id={`menu-card-${item.id}`}
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={(e) => {
                      onWishlistToggle(item.id, e);
                    }}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#FAF9F5]/95 text-stone-400 hover:text-rose-500 shadow-sm transition-colors cursor-pointer hover:scale-110 active:scale-95"
                    id={`wishlist-btn-catalog-${item.id}`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        wishlist.includes(item.id) ? "fill-rose-500 text-rose-500 scale-110" : "text-stone-400"
                      }`}
                    />
                  </button>
                  {item.isBest && (
                    <span className="absolute bottom-4 left-4 bg-[#C68B59] text-white text-[9px] font-bold tracking-widest uppercase py-1 px-2.5 rounded-xs">
                      Best choice
                    </span>
                  )}
                  {item.isVegan && (
                    <span className="absolute bottom-4 right-4 bg-emerald-700/90 text-white text-[9px] font-bold tracking-widest uppercase py-1 px-2.5 rounded-xs">
                      Vegan options
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="block text-[10px] font-extrabold text-[#C68B59] tracking-widest uppercase">
                      {item.category.toUpperCase()} DICTIONARY
                    </span>
                    <span className="text-[10px] text-stone-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-stone-400" /> {item.cookingTime} 소요
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-950 group-hover:text-[#C68B59] transition-colors font-serif-elegant">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 block text-[10px] sm:text-[11px] tracking-wide font-light font-sans italic -mt-0.5">
                      {item.englishName}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed line-clamp-2 font-light">
                    {item.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-stone-400 font-mono px-2 py-0.5 rounded-md bg-stone-100/90"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
                <span className="text-base font-semibold text-emerald-950 font-mono">
                  {formatKRW(item.price)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReserveDirect(item.id);
                  }}
                  className="px-4 py-1.5 rounded-full bg-emerald-800 hover:bg-[#5E7260] text-white text-[10px] font-semibold tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                  id={`direct-reserve-btn-${item.id}`}
                >
                  기본 예약 신청
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ==========================================
// VIEW 3: IN-DEPTH DETAIL PAGE WITH SCIENTIFIC ACCURACY
// ==========================================
interface MenuDetailViewProps {
  menuId: string;
  onBack: () => void;
  wishlist: string[];
  onWishlistToggle: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
  onReserve: (menuId: string) => void;
  onShowToast: (msg: string) => void;
}

function MenuDetailView({ menuId, onBack, wishlist, onWishlistToggle, onReserve, onShowToast }: MenuDetailViewProps) {
  const item = MENU_DATA.find((m) => m.id === menuId);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-lg text-stone-500">정보가 존재하지 않는 메뉴입니다.</p>
        <button onClick={onBack} className="mt-4 px-6 py-2 bg-emerald-800 text-white rounded-lg cursor-pointer">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const isWished = wishlist.includes(item.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in" id="menu-detail-view-container">
      {/* Back to catalogue */}
      <div>
        <button
          onClick={onBack}
          id="detail-back-btn"
          className="inline-flex items-center space-x-2 text-stone-500 hover:text-emerald-800 text-sm font-medium tracking-wide py-2 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>전체 메뉴판 목록으로 복귀하기</span>
        </button>
      </div>

      {/* Grid layout panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Aspect Grid Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[400px] sm:h-[480px] object-cover"
              referrerPolicy="no-referrer"
            />
            {item.isBest && (
              <span className="absolute top-4 left-4 bg-[#C68B59] text-white text-xs font-bold tracking-widest uppercase py-1 px-3.5 rounded-sm">
                Premium Quality Choice
              </span>
            )}
          </div>
        </div>

        {/* Right Product spec area */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-0">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-[#C68B59] uppercase block">
                {item.category.toUpperCase()} SPECIAL CATALOG
              </span>
              <span className="text-stone-400 text-xs flex items-center gap-1 font-mono">
                <Clock className="w-4 h-4 text-[#C68B59]" /> 조리시간 {item.cookingTime} 예정
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950 font-serif-elegant">
                {item.name}
              </h1>
              <p className="text-stone-400 font-light text-xs sm:text-sm italic tracking-wide font-sans mt-0.5">
                {item.englishName}
              </p>
            </div>
            <p className="text-2xl font-bold font-mono text-[#C68B59]">
              {formatKRW(item.price)}
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {item.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-emerald-50 text-emerald-800 font-mono px-3 py-1 rounded-md border border-emerald-100"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/50 flex gap-2.5 items-start">
              <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-normal font-light">
                <span className="font-semibold block">식재료 함유 알레르기 수포 안내</span>
                본 요리는 조리과정 중 <span className="underline font-medium">{item.allergens.join(", ")}</span> 성분이 수반됩니다. 민감하신 분은 예약 폼 요청메모에 필히 제거요청 바랍니다.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200/60 flex items-center gap-4">
            <button
              onClick={() => onReserve(item.id)}
              id="detail-order-reserve-btn"
              className="flex-grow py-4 bg-emerald-800 text-[#FAF9F5] text-xs font-bold tracking-widest uppercase rounded-full shadow-md hover:bg-[#5E7260] transition-all cursor-pointer text-center"
            >
              이 메뉴 포함 실시간 예약진행
            </button>
            <button
              onClick={(e) => onWishlistToggle(item.id, e)}
              id="detail-wishlist-toggle-btn"
              className={`p-3.5 rounded-full border text-stone-400 hover:text-rose-500 hover:border-rose-300 transition-colors cursor-pointer ${
                isWished ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-stone-200"
              }`}
            >
              <Heart className={`w-5.5 h-5.5 ${isWished ? "fill-rose-500" : ""}`} />
            </button>
            <button
              onClick={() => alert(`해당 메뉴 [${item.name}] 정보가 공유 클립보드에 무사히 복사되었습니다!`)}
              id="detail-share-btn"
              className="p-3.5 rounded-full border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <Share2 className="w-5.5 h-5.5" />
            </button>
          </div>
        </div>
      </div>

      {/* TECHNICAL SPECTACULAR SPECS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-200/60">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-emerald-950 font-serif-elegant flex items-center gap-2">
            <Droplet className="w-5 h-5 text-emerald-800" /> 엄선 성분 원재료 품목 리치 리포트
          </h3>
          <div className="border border-stone-200/50 rounded-xl overflow-hidden bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-[10px] uppercase tracking-wider text-stone-400 border-b border-stone-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">동원원물</th>
                  <th className="px-4 py-3 font-semibold">인용 대비 표준분량</th>
                  <th className="px-4 py-3 font-semibold text-right">정규 원산지</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {item.ingredients.map((ing, i) => (
                  <tr key={i} className="hover:bg-stone-50/50 text-xs text-stone-600">
                    <td className="px-4 py-3 font-medium text-stone-800">{ing.name}</td>
                    <td className="px-4 py-3 font-mono">{ing.weight}</td>
                    <td className="px-4 py-3 text-right">{ing.origin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-emerald-950 font-serif-elegant flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-800" /> 영양소 및 칼로리 총량 보고서
          </h3>
          <div className="bg-white border border-stone-200/50 p-6 rounded-xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-stone-50 p-4 rounded-lg text-center border border-stone-100">
                <span className="block text-[10px] text-stone-400 uppercase tracking-widest font-semibold">칼로리</span>
                <span className="block text-base sm:text-lg font-bold font-mono text-[#C68B59] mt-1">{item.nutrition.calories}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg text-center border border-stone-100">
                <span className="block text-[10px] text-stone-400 uppercase tracking-widest font-semibold">단백질</span>
                <span className="block text-base sm:text-lg font-bold font-mono text-emerald-950 mt-1">{item.nutrition.protein}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg text-center border border-stone-100">
                <span className="block text-[10px] text-stone-400 uppercase tracking-widest font-semibold">탄수화물</span>
                <span className="block text-base sm:text-lg font-bold font-mono text-emerald-950 mt-1">{item.nutrition.carbs}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg text-center border border-stone-100">
                <span className="block text-[10px] text-stone-400 uppercase tracking-widest font-semibold">천연지방</span>
                <span className="block text-base sm:text-lg font-bold font-mono text-emerald-950 mt-1">{item.nutrition.fat}</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-400 leading-relaxed font-light">
              * 위 분석 수치는 산지 수급 시점 및 매일 아침 당도가 높은 원물 상태에 따른 조리 오차 한도 약 ±5%를 전유합니다. 영양 균형 식단 설계를 하시는 분들을 위한 정밀 가이드입니다.
            </p>
          </div>
        </div>
      </div>

      {item.secretTitle && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-emerald-900 text-stone-100 p-8 sm:p-12 rounded-2xl items-center relative overflow-hidden shadow-xs">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C68B59] bg-white/10 px-3 py-1 rounded-full inline-block">
              Secret of Flavor (풍미의 비밀)
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-elegant text-white">
              {item.secretTitle}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              {item.secretDesc}
            </p>
          </div>
          {item.secretImage && (
            <div className="lg:col-span-4 h-52 sm:h-60 rounded-xl overflow-hidden shadow-inner border border-white/10">
              <img
                src={item.secretImage}
                alt={item.secretTitle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      )}

      {/* REVIEWS GRID LIST */}
      <div className="space-y-6 pt-6 animate-fade-in-up">
        <div className="border-b border-stone-200/50 pb-4">
          <h3 className="text-xl font-bold text-emerald-950 font-serif-elegant flex items-center justify-between">
            <span>실제 예약 방문객 미식 후기 ({item.reviews.length}개)</span>
            <span className="text-[#C68B59] text-sm font-semibold font-mono flex items-center gap-1">
              ⭐ {(item.reviews.reduce((acc, r) => acc + r.rating, 0) / item.reviews.length).toFixed(1)} / 5.0
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {item.reviews.map((rev, revIdx) => (
            <div
              key={revIdx}
              className="bg-white p-6 rounded-2xl border border-stone-200/50 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-bold text-stone-800">{rev.author} 님</span>
                <span className="font-mono">{rev.date}</span>
              </div>
              <div className="flex items-center text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW 4: SOPHISTICATED BRAND STORY STORY VIEW
// ==========================================
interface StoryViewProps {
  onNavigate: (tab: "home" | "menu" | "story" | "reserve") => void;
}

function StoryView({ onNavigate }: StoryViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 14 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-16 pb-12"
      id="story-view-container"
    >
      {/* BRAND HERO with dynamic scale & brightness adjustment */}
      <motion.section
        variants={itemVariants}
        className="relative h-[400px] flex items-center bg-stone-900 overflow-hidden"
        id="story-hero-section"
      >
        <div className="absolute inset-0 z-0 scale-105">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80"
            alt="Warm baking light in early mornings"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C201C] via-[#1C201C]/70 to-[#1C201C]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full space-y-4">
          <span className="text-xs md:text-sm tracking-widest uppercase font-extrabold text-[#C68B59] block">
            Shining Morning Sunshine
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-serif-elegant tracking-tight">
            빛나는 아침을 여는 우리의 이야기
          </h1>
          <p className="text-stone-300 text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            한 줌의 아침 햇볕조차 아름답게 플레이터 위에 조화하려는, 샤이닝 테이블의 정교한 미학 철학입니다.
          </p>
          <div className="h-0.5 w-16 bg-[#C68B59] mx-auto mt-2" />
        </div>
      </motion.section>

      {/* CORE PHILOSOPHIES CARD GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {BRAND_STORIES.philosophies.map((phil, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.025 }}
            className="bg-white p-8 rounded-2xl border border-stone-200/55 space-y-4 shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-lg font-mono">
              0{i + 1}
            </div>
            <h3 className="text-lg font-bold text-emerald-950 font-serif-elegant">
              {phil.title}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
              {phil.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* THE CHEF IN DETAIL */}
      <motion.section
        variants={itemVariants}
        className="bg-white border-y border-stone-200/40 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="mx-auto lg:mx-0 max-w-md w-full relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#C68B59] to-emerald-800 rounded-[50px] opacity-10 blur-xl animate-pulse" />
            <div className="aspect-square bg-emerald-950 rounded-[40px] overflow-hidden shadow-lg border-4 border-[#FAF9F5]">
              <img
                src={BRAND_STORIES.chefSpeech.avatar}
                alt="Head chef portrait"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C68B59] block">
              The Chef's Heart & Soul
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-emerald-950 font-serif-elegant">
              자연의 순수함을 식지 않는 식탁 위에 입힙니다
            </h2>
            <div className="h-0.5 w-12 bg-[#C68B59]" />
            <p className="text-stone-600 text-sm sm:text-base italic leading-relaxed font-light pl-4 border-l-2 border-emerald-800">
              &ldquo;{BRAND_STORIES.chefSpeech.quote}&rdquo;
            </p>
            <div className="pt-2">
              <span className="block text-sm font-semibold text-emerald-950">
                {BRAND_STORIES.chefSpeech.name}
              </span>
              <span className="block text-xs text-stone-400">프랑스 파리 본원 그랑 디플로마 수석 연수관</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BOT CTA GENTLE WRAP */}
      <motion.section
        variants={itemVariants}
        className="max-w-3xl mx-auto px-4 text-center space-y-6"
      >
        <h3 className="text-2xl font-bold text-emerald-950 font-serif-elegant">
          오늘 아침, 햇살 한 모금 어떠세요?
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto font-light">
          기공 되지 않은 내추럴 고원 채소와 참나무 화끼로 은은히 구운 스테이크가 안겨주는 감동을 예약해보세요.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => onNavigate("menu")}
            id="story-cta-menu-btn"
            className="px-6 py-3 border border-emerald-800 text-emerald-800 rounded-full text-xs font-semibold tracking-widest hover:bg-emerald-800 hover:text-white transition-all cursor-pointer"
          >
            메뉴 보기
          </button>
          <button
            onClick={() => onNavigate("reserve")}
            id="story-cta-reserve-btn"
            className="px-6 py-3 bg-emerald-800 text-white rounded-full text-xs font-semibold tracking-widest hover:bg-[#5E7260] transition-all cursor-pointer"
          >
            예약 일정 잡기
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

// ==========================================
// VIEW 5: COMPREHENSIVE INTERACTIVE RESERVATION FORM
// ==========================================
interface ReservationViewProps {
  resDate: string;
  setResDate: (d: string) => void;
  resGuests: number;
  setResGuests: (g: number) => void;
  resTime: string;
  setResTime: (t: string) => void;
  resNotes: string;
  setResNotes: (n: string) => void;
  currentYear: number;
  currentMonth: number;
  onSuccess: (data: any) => void;
}

function ReservationView({
  resDate,
  setResDate,
  resGuests,
  setResGuests,
  resTime,
  setResTime,
  resNotes,
  setResNotes,
  currentYear,
  currentMonth,
  onSuccess
}: ReservationViewProps) {
  const [errorText, setErrorText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const daysInMonth = 30;
  const startDayOffset = 1; // June 1st, 2026 is Monday

  const gridDays: Array<{ dateStr: string; dayNum: number | null; isHoliday: boolean; isDisabled: boolean }> = [];

  for (let i = 0; i < startDayOffset; i++) {
    gridDays.push({ dateStr: "", dayNum: null, isHoliday: false, isDisabled: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (startDayOffset + d - 1) % 7;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const isHoliday = dayOfWeek === 1; // Monday is regular holiday
    const isPast = d < 10;
    const isDisabled = isHoliday || isPast;

    gridDays.push({
      dateStr,
      dayNum: d,
      isHoliday,
      isDisabled
    });
  }

  const selectDate = (date: string) => {
    setResDate(date);
    setErrorText("");
  };

  const selectTimeSlot = (time: string) => {
    setResTime(time);
    setErrorText("");
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resDate) {
      setErrorText("에약 방문 희망 날짜를 캘린더에서 터치 선택해 주세요.");
      return;
    }
    if (!resTime) {
      setErrorText("방문 계획이신 골든 식사 시간대 슬롯을 선택해 주십시오.");
      return;
    }

    const newReservation = {
      id: "RES-" + Date.now(),
      date: resDate,
      guests: resGuests,
      time: resTime,
      notes: resNotes || "없음",
      emailSent: false,
      emailError: ""
    };

    setIsSending(true);
    let finalReservation = { ...newReservation };

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          finalReservation.emailSent = result.emailSent;
          finalReservation.emailError = result.error;
        } else {
          finalReservation.emailError = result.error || "Email failed";
        }
      } else {
        finalReservation.emailError = `Server responded status ${response.status}`;
      }
    } catch (err: any) {
      console.error("Failed to run full-stack email notification:", err);
      finalReservation.emailError = err.message || String(err);
    } finally {
      setIsSending(false);
    }

    const saved = localStorage.getItem("shining_reservations");
    let currentSaved: any[] = [];
    if (saved) {
      try {
        currentSaved = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }
    const updated = [...currentSaved, finalReservation];
    localStorage.setItem("shining_reservations", JSON.stringify(updated));

    onSuccess(finalReservation);
  };

  const morningSlots = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];
  const eveningSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in" id="reservation-view-container">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest text-[#C68B59] uppercase block">
          Realtime Booking Slot
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950 font-serif-elegant">
          실시간 좌석 예약하기
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed font-light">
          원하시는 날짜와 인원수, 시간대 슬롯을 간편 클릭하여 샤이닝 테이블의 정교한 미식 좌석을 단독 예약해두세요.
        </p>
        <div className="h-0.5 w-12 bg-[#C68B59] mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Interactive Custom Calendar Grid */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/50 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-950 font-serif-elegant flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-700" />
              <span>방문일 캘린더 선택</span>
            </h3>
            <div className="flex items-center space-x-2 text-stone-500 text-xs font-mono">
              <button disabled className="p-1 opacity-25">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-stone-700">{currentYear}년 6월</span>
              <button disabled className="p-1 opacity-25">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-stone-400">
              <span className="text-rose-500 font-bold">일</span>
              <span>월</span>
              <span>화</span>
              <span>수</span>
              <span>목</span>
              <span>금</span>
              <span className="text-emerald-800">토</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {gridDays.map((cell, idx) => {
                const isSelected = resDate === cell.dateStr;

                return (
                  <div key={idx} className="aspect-square relative flex flex-col items-center justify-center">
                    {cell.dayNum !== null ? (
                      <button
                        type="button"
                        onClick={() => selectDate(cell.dateStr)}
                        disabled={cell.isDisabled}
                        id={`calendar-day-btn-${cell.dayNum}`}
                        className={`w-full h-full rounded-xl text-xs sm:text-sm font-semibold flex flex-col items-center justify-center p-1 transition-all focus:outline-hidden cursor-pointer ${
                          cell.isDisabled
                            ? "bg-transparent text-stone-300 opacity-60 cursor-not-allowed"
                            : isSelected
                            ? "bg-emerald-800 text-white shadow-xs scale-102"
                            : cell.isHoliday
                            ? "text-stone-300 pointer-events-none"
                            : "bg-stone-50 text-stone-700 hover:border-emerald-800 border border-stone-200/40"
                        }`}
                      >
                        <span className="block">{cell.dayNum}</span>
                        {cell.isHoliday && (
                          <span className="block text-[8px] sm:text-[9px] text-[#C68B59] mt-0.5 font-light">
                            휴무일
                          </span>
                        )}
                      </button>
                    ) : (
                      <div className="w-full h-full bg-stone-100/30 rounded-xl" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-400 space-y-1.5 leading-relaxed font-light">
            <p className="font-semibold text-stone-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" /> 매주 월요일은 정기 대청소 및 수확 점검 정기 정비 휴업입니다.
            </p>
            <p>• 예약 변경 일자 조율은 방문 최소 24시간 전까지 마이페이지에서만 무상 허용 적용됩니다.</p>
            <p>• 8인 초과의 특수한 단체 손님 전속 테라스 대여는 우측 고객전화를 추가 진행합니다.</p>
          </div>
        </div>

        {/* Right reservation inputs */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/50 shadow-xs">
          <form onSubmit={handleReservationSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-emerald-950 font-serif-elegant flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C68B59]" /> 동반 식사 인원수 지정
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setResGuests(num)}
                    id={`guests-btn-${num}`}
                    className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      resGuests === num
                        ? "bg-[#C68B59] text-white shadow-xs"
                        : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/50"
                    }`}
                  >
                    {num === 10 ? "10인+" : `${num}명`}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-400">
                * 5인 이상인 분들께는 수제 코스 소파 맞춤 테이블을 우선 배석 연출 안내해 드립니다.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-emerald-950 font-serif-elegant flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C68B59]" /> 방문 희망 시간대 슬롯 선택
              </label>

              <div className="space-y-2">
                <span className="text-[10px] tracking-wider uppercase font-extrabold text-[#C68B59] block">
                  오전 런치 타임 (Breakfast & Brunch)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {morningSlots.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => selectTimeSlot(val)}
                      id={`time-btn-${val}`}
                      className={`py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        resTime === val
                          ? "bg-emerald-800 text-white shadow-xs font-bold"
                          : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/40"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-2.5 px-3 bg-amber-50 rounded-lg border border-amber-200/30 text-center text-[10px] sm:text-[11px] text-[#D97706] font-semibold">
                ⚠️ [브레이크 타임] 15:00 - 17:00 (식사 주방 완전 정비 휴식시간)
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-wider uppercase font-extrabold text-[#C68B59] block">
                  오후 디너 타임 (Dinner Premium Course)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {eveningSlots.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => selectTimeSlot(val)}
                      id={`time-btn-${val}`}
                      className={`py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        resTime === val
                          ? "bg-emerald-800 text-white shadow-xs font-bold"
                          : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/40"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-emerald-950 font-serif-elegant flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C68B59]" /> 기타 메모 및 상세 요구 사항
              </label>
              <textarea
                value={resNotes}
                onChange={(e) => setResNotes(e.target.value)}
                id="notes-field"
                placeholder="예: 생일 보나파르트 촛불 서비스 희망 / 잣 견과류 알레르기 제외 당부 / 부모님용 폭신한 동반 좌석 선호."
                className="w-full h-24 p-3 bg-stone-50 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-hidden focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 font-light"
              />
            </div>

            {errorText && (
              <p className="text-xs text-rose-500 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-200/35">
                {errorText}
              </p>
            )}

            <button
              type="submit"
              id="reserve-submit-btn"
              disabled={isSending}
              className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#FAF9F5] shadow-md transition-all block text-center ${
                isSending
                  ? "bg-stone-500 cursor-not-allowed opacity-80"
                  : "bg-emerald-800 hover:bg-[#5E7260] cursor-pointer"
              }`}
            >
              {isSending ? "보안 예약 확인 및 안내 카드 전송중..." : "현재 기재 옵션 정보로 예약 확정하기"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW 6: SUCCESS POPUP GLASS MODAL
// ==========================================
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    id: string;
    date: string;
    guests: number;
    time: string;
    notes: string;
    emailSent?: boolean;
    emailError?: string;
  } | null;
}

function SuccessModal({ isOpen, onClose, details }: SuccessModalProps) {
  if (!isOpen || !details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-[#FAF9F5] max-w-sm sm:max-w-md w-full rounded-3xl p-6 sm:p-8 border border-stone-200 text-center shadow-2xl space-y-6 z-10 transition-transform duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle className="w-8 h-8 text-emerald-700 animate-bounce" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] bg-emerald-100/80 text-emerald-800 font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            Reserved Successfully
          </span>
          <h3 className="text-2xl font-bold text-stone-900 font-serif-elegant pt-1.5">
            예약이 완료되었습니다!
          </h3>
          <p className="text-stone-400 text-xs font-light max-w-xs mx-auto leading-relaxed">
            샤이닝 테이블의 대기 열에 예약 정보가 정식 온라인 기록되었습니다. 최고의 신선 식사로 보답하겠습니다.
          </p>
        </div>

        <div className="bg-white border border-stone-200/60 p-5 rounded-2xl text-left space-y-3">
          <div className="flex justify-between text-xs pb-2 border-b border-stone-100">
            <span className="text-stone-400">온라인 예약 코드</span>
            <span className="font-mono text-emerald-800 font-bold">{details.id}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">예약 지칭 지점</span>
            <span className="font-semibold text-stone-800">샤이닝 테이블 - 서울 본점</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">식사 약조 일시</span>
            <span className="font-semibold text-stone-800 font-mono">
              6월 {details.date.split("-")[2]}일 | {details.time}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">동반 식사 인원</span>
            <span className="font-semibold text-stone-800 font-mono">{details.guests}명</span>
          </div>
          <div className="text-xs space-y-1 pb-1">
            <span className="text-stone-400 block pb-1 border-t border-stone-100 pt-2 font-medium">기재 메모 희망사항:</span>
            <p className="font-light text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/30 line-clamp-2">
              {details.notes}
            </p>
          </div>

          {/* REALTIME EMAIL DELIVERY BLOCK */}
          <div className="border-t border-stone-100 pt-3">
            <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
              details.emailSent
                ? "bg-emerald-50/50 border-emerald-100/80 text-emerald-950"
                : "bg-amber-50/40 border-amber-100/80 text-amber-950"
            }`}>
              {details.emailSent ? (
                <Mail className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="text-[11.5px] font-bold text-stone-900 flex items-center gap-1.5 flex-wrap">
                  <span>알림 수신: ejkim1770@gmail.com</span>
                  {details.emailSent ? (
                    <span className="text-[9px] bg-emerald-600 text-[#FAF9F5] px-1.5 py-0.2 rounded-xs font-semibold">VIP 전송됨</span>
                  ) : (
                    <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.2 rounded-xs font-semibold">SMTP 대기</span>
                  )}
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed font-light">
                  {details.emailSent
                    ? "식품 알러지 보증 명세와 수제 브런치 정찬 전용 VIP 모바일 안내 카드가 고객님의 메일함으로 즉시 발송되었습니다."
                    : details.emailError 
                      ? `예약 접수는 되었으나 메일 전송 오류가 발생했습니다: ${details.emailError}`
                      : "예약 접수는 완료되었습니다! 서버 settings 환경변수에 SMTP 계정(SMTP_USER & SMTP_PASS)이 입력되면 ejkim1770@gmail.com으로 럭셔리 카드 메일이 발송됩니다."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          id="success-modal-close-btn"
          className="w-full py-3.5 rounded-full bg-emerald-800 hover:bg-[#5E7260] text-white text-xs tracking-wider font-extrabold uppercase transition-all shadow-xs cursor-pointer text-center block"
        >
          확인했으며, 메인 홈으로 가기
        </button>
      </div>
    </div>
  );
}
