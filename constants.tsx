
import { Character, Question, GameStage } from './types';

export const CHARACTERS: Character[] = [
  { id: '1', name: 'البطل الشجاع', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=b6e3f4', color: 'bg-blue-400' },
  { id: '2', name: 'البطلة الذكية', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aria&backgroundColor=ffdfbf', color: 'bg-pink-400' },
  { id: '3', name: 'المغامر القوي', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Caleb&backgroundColor=c0aede', color: 'bg-green-400' },
  { id: '4', name: 'المبدعة الصغيرة', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mimi&backgroundColor=ffd5dc', color: 'bg-yellow-400' },
];

export const QUESTIONS: Record<GameStage, Question[]> = {
  [GameStage.HOME]: [
    {
      id: 1,
      text: "ماذا تفعل إذا رأيت سلكاً كهربائياً مكشوفاً في الصالة؟",
      options: ["ألمسه بيدي", "أبتعد عنه وأخبر أمي أو أبي فوراً", "أحاول تغطيته بلعبة"],
      correctIndex: 1,
      imagePrompt: "A child pointing at an exposed electrical wire sparking on a wall in a living room. The child looks cautious and is keeping a distance. Cartoon style.",
      feedback: "رائع! الكهرباء خطيرة جداً، وإخبار الكبار هو تصرف الأبطال."
    },
    {
      id: 2,
      text: "أين المكان الصحيح لحفظ الأدوية والمنظفات؟",
      options: ["تحت المغسلة", "في خزانة عالية ومغلقة", "بجانب السرير"],
      correctIndex: 1,
      imagePrompt: "A locked white medicine cabinet mounted high on a wall, out of reach of children. Bright friendly colors, cartoon style.",
      feedback: "صحيح تماماً! يجب أن تكون الأدوية بعيدة عن متناول أيدينا."
    },
    {
      id: 3,
      text: "دق جرس الباب وأنت وحدك في المنزل، ماذا تفعل؟",
      options: ["أفتح الباب فوراً", "أنظر من العين السحرية ولا أفتح للغرباء", "أرحب بالطارق وأدخله"],
      correctIndex: 1,
      imagePrompt: "A child looking through a door peephole safely. Outside is a blurred stranger. The door is closed and locked. Cartoon style.",
      feedback: "أنت بطل حذر! لا تفتح الباب أبداً إلا لمن تعرفه جيداً."
    },
    {
      id: 4,
      text: "هل مسموح لنا اللعب بأعواد الكبريت أو الولاعة؟",
      options: ["نعم، النار جميلة", "لا، النار تسبب الحرائق وتؤذينا", "فقط في غرفتي"],
      correctIndex: 1,
      imagePrompt: "A cartoon box of matches and a lighter with a red 'X' over them, indicating danger. Friendly warning style.",
      feedback: "بطل السلامة! النار ليست لعبة أبداً."
    },
    {
      id: 5,
      text: "رأيت سكيناً حادة على طاولة المطبخ، كيف تتصرف؟",
      options: ["أجرب تقطيع التفاح", "أتركها في مكانها وأبتعد عنها", "ألعب بها كأنها سيف"],
      correctIndex: 1,
      imagePrompt: "A sharp kitchen knife lying on a kitchen counter next to a bowl of fruit. No one is touching it. Bright cartoon illustration.",
      feedback: "إجابة ذكية! الأدوات الحادة للجرح وليست للمرح."
    },
    {
      id: 6,
      text: "وجدت مكواة الملابس مشتعلة، هل تقترب منها؟",
      options: ["ألمسها لأرى إن كانت ساخنة", "أبتعد عنها فوراً ولا ألمس السلك", "أحاول إطفاءها بنفسي"],
      correctIndex: 1,
      imagePrompt: "A hot clothes iron on an ironing board with steam rising. A child is standing far away pointing at it. Cartoon style.",
      feedback: "أحسنت! المكواة قد تسبب حروقاً مؤلمة، دائماً أطلب مساعدة الكبار."
    },
    {
      id: 7,
      text: "عندما تريد الصعود أو النزول على الدرج (السلم)، ماذا تفعل؟",
      options: ["أركض بسرعة كبيرة", "أصعد بهدوء وأمسك بالدرابزين", "أقفز من فوق الدرجات"],
      correctIndex: 1,
      imagePrompt: "A happy child walking safely down stairs, holding the handrail correctly. Safety first. Cartoon illustration.",
      feedback: "بطل ذكي! التمسك بالدرابزين يحميك من الانزلاق والسقوط."
    },
    {
      id: 8,
      text: "رأيت زجاجة سائل ملون وجميل في المطبخ، هل تشرب منها؟",
      options: ["نعم، يبدو طعمها كالعصير", "لا، قد تكون مادة سامة ومنظفات", "أذوقها قليلاً فقط"],
      correctIndex: 1,
      imagePrompt: "Colorful cleaning bottles under a sink. A bright red 'No' sign. Cartoon style.",
      feedback: "تصرف بطولي! المنظفات ليست عصيرات، وهي خطيرة جداً على صحتنا."
    },
    {
      id: 9,
      text: "هل مسموح لك بتسلق المكتبة أو خزانة الملابس العالية؟",
      options: ["نعم لأصل للألعاب العالية", "لا، قد تسقط الخزانة فوقي وتؤذيني", "فقط إذا كان أخي معي"],
      correctIndex: 1,
      imagePrompt: "A heavy bookshelf leaning slightly with a warning sign. A child standing safely on the floor. Cartoon style.",
      feedback: "إجابة صحيحة! تسلق الأثاث خطر جداً، اطلب من الكبار إحضار ما تريد."
    },
    {
      id: 10,
      text: "إذا شممت رائحة دخان أو حريق في المنزل، ماذا تفعل؟",
      options: ["أختبئ تحت السرير", "أخرج فوراً وأزحف تحت الدخان إذا وجد", "أذهب للمطبخ لأرى النار"],
      correctIndex: 1,
      imagePrompt: "A child crawling low under a layer of smoke towards an exit door. Safety procedure. Cartoon style.",
      feedback: "ممتاز! الزحف تحت الدخان يساعدك على التنفس والخروج بأمان."
    }
  ],
  [GameStage.STREET]: [
    {
      id: 11,
      text: "من أين نعبر الطريق بأمان يا بطل؟",
      options: ["من بين السيارات المسرعة", "من ممر المشاة عندما تكون الإشارة خضراء", "أركض بأقصى سرعة"],
      correctIndex: 1,
      imagePrompt: "A happy child holding a parent's hand while crossing the street on a white zebra crossing. The pedestrian light is green. Cartoon style.",
      feedback: "ممتاز! ممر المشاة هو طريق الأمان لكل الأبطال."
    },
    {
      id: 12,
      text: "ماذا تفعل إذا عرض عليك شخص غريب قطعة حلوى؟",
      options: ["آخذها وأشكره", "أرفض بأدب وأبتعد عنه بسرعة", "أذهب معه لمنزله"],
      correctIndex: 1,
      imagePrompt: "A friendly child politely raising a hand to say 'no' to a stranger offering a colorful lollipop. The child is backing away. Cartoon style.",
      feedback: "تصرف بطولي! لا نقبل الهدايا من الغرباء أبداً."
    },
    {
      id: 13,
      text: "أين هو المكان الأسلم للعب بالدراجة أو الكرة؟",
      options: ["في موقف السيارات", "في الحديقة العامة المخصصة للعب", "في وسط الشارع الرئيسي"],
      correctIndex: 1,
      imagePrompt: "Children playing happily with a ball and a bike in a safe, fenced park with trees and grass. Cartoon style.",
      feedback: "أحسنت! الحديقة هي مملكة المرح والأمان."
    },
    {
      id: 14,
      text: "لماذا نرتدي حزام الأمان في السيارة؟",
      options: ["لأنه يزين ملابسنا", "ليحمينا من الصدمات إذا توقفت السيارة فجأة", "لأن الشرطي سيغضب"],
      correctIndex: 1,
      imagePrompt: "A child sitting in a car seat with a seatbelt securely fastened across the chest. The child is smiling. Cartoon style.",
      feedback: "رائع! الحزام هو درعك الواقي داخل السيارة."
    },
    {
      id: 15,
      text: "إذا ضعت عن أهلك في السوق، ماذا تفعل؟",
      options: ["أخرج من السوق للشارع", "أبحث عن موظف أمن أو بائع وأطلب مساعدته", "أجلس وأبكي بصوت عالي"],
      correctIndex: 1,
      imagePrompt: "A child talking to a friendly security guard in a uniform inside a bright shopping mall. Clear cartoon illustration.",
      feedback: "إجابة حكيمة! اطلب المساعدة دائماً من الأشخاص الموثوقين."
    },
    {
      id: 16,
      text: "أريد ركوب دراجتي، ماذا يجب أن أرتدي لحماية رأسي؟",
      options: ["قبعة رياضية", "خوذة الأمان المخصصة للدراجات", "لا أرتدي شيئاً"],
      correctIndex: 1,
      imagePrompt: "A child putting on a bright colorful bicycle helmet and buckling it. Safety gear. Cartoon style.",
      feedback: "بطل ذكي! الخوذة تحمي رأسك من الإصابات إذا سقطت لا قدر الله."
    },
    {
      id: 17,
      text: "رأيت جسراً للمشاة فوق الشارع الكبير، هل تستخدمه؟",
      options: ["نعم، هو الأكثر أماناً لعبور الشارع", "لا، أفضل الركض بين السيارات", "أعبر من تحت الجسر"],
      correctIndex: 0,
      imagePrompt: "A modern pedestrian bridge over a busy highway. People are walking on it safely. Cartoon illustration.",
      feedback: "رائع! الجسور والأنفاق مخصصة لتحميك من السيارات السريعة."
    },
    {
      id: 18,
      text: "ما هو رقم الطوارئ الذي تتصل به إذا احتجت مساعدة؟",
      options: ["رقم صديقي", "رقم الإسعاف أو الدفاع المدني (مثل 997/998/999)", "لا أتصل بأحد"],
      correctIndex: 1,
      imagePrompt: "A large friendly phone keypad with emergency numbers highlighted. Cartoon style.",
      feedback: "بطل مستعد! حفظ أرقام الطوارئ ضروري جداً لطلب المساعدة بسرعة."
    },
    {
      id: 19,
      text: "هل يصح عبور الشارع من خلف الحافلة (الأتوبيس) مباشرة؟",
      options: ["نعم، لأختبئ من السيارات", "لا، يجب أن أنتظر حتى تبتعد الحافلة وأرى الطريق بوضوح", "أعبر بسرعة خلفها"],
      correctIndex: 1,
      imagePrompt: "A school bus parked at a stop. A child waiting on the sidewalk for it to move before crossing. Cartoon style.",
      feedback: "إجابة ممتازة! يجب أن نرى الطريق بوضوح من الجهتين قبل العبور."
    },
    {
      id: 20,
      text: "أين تقف عندما تنتظر الحافلة أو السيارة؟",
      options: ["وسط الشارع لأراها قادمة", "بعيداً عن حافة الرصيف في مكان آمن", "أجلس على الإسفلت"],
      correctIndex: 1,
      imagePrompt: "A child standing safely in the middle of a wide sidewalk away from the road curb. Cartoon illustration.",
      feedback: "أنت بطل حذر! الوقوف بعيداً عن حافة الرصيف يحميك من السيارات المارة."
    }
  ]
};
