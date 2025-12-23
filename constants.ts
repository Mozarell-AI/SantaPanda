
import { SceneData } from './types';

export const SCENES: SceneData[] = [
  {
    id: 'splash',
    type: 'splash',
    title: 'Splash',
    characters: [],
    props: [],
    dialogue: []
  },
  {
    id: 'night1',
    type: 'night',
    nightNumber: 1,
    title: 'Ніч 1',
    characters: [
      { id: 'guy', x: 100, y: 160, pose: 'under_blanket' }, // Only heads visible
      { id: 'girl', x: 140, y: 160, pose: 'under_blanket' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'sax_stand', type: 'sax', x: 200, y: 180, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Він', text: '...Ем. Привіт.', emote: 'confused' },
      { speaker: 'Вона', text: 'Привіт. Не панікуй. Це просто ніч.', emote: 'smile' },
      { speaker: 'Він', text: 'Я прокинувся… і в мене в голові — білий шум.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Добре. Тоді давай домовимось: без сорому й без допитів.', emote: 'neutral' },
      { speaker: 'Він', text: 'Ти… хто?', emote: 'confused' },
      { speaker: 'Вона', text: 'Сьогодні? Я — випадковість, яка вирішила бути ніжною.', emote: 'smile' },
      { speaker: 'Він', text: 'А я?', emote: 'neutral' },
      { speaker: 'Вона', text: 'Ти — саксофоніст з обличчям “я загубив учорашній день”.', emote: 'laugh' },
      { speaker: 'Він', text: 'Це комплімент чи діагноз?', emote: 'confused' },
      { speaker: 'Вона', text: 'Це старт серіалу. Натискай далі.', emote: 'smile' }
    ]
  },
  {
    id: 'night2',
    type: 'night',
    nightNumber: 2,
    title: 'Ніч 2',
    characters: [
      { id: 'guy', x: 90, y: 150, pose: 'sitting' },
      { id: 'girl', x: 150, y: 150, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'lamp', type: 'lamp', x: 60, y: 170, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Вона', text: 'Правило перше: ми не вигадуємо трагедію там, де просто тиша.', emote: 'neutral' },
      { speaker: 'Він', text: 'Правило друге: якщо ти зникнеш, я не роблю вигляд, що мені байдуже.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Ого. Сміливо для другої ночі.', emote: 'smile' },
      { speaker: 'Він', text: 'Я ж саксофоніст. Ми або мовчимо, або говоримо занадто.', emote: 'confused' },
      { speaker: 'Вона', text: 'Тоді хай буде третє: не брехати про дрібниці.', emote: 'neutral' },
      { speaker: 'Він', text: 'Окей. Я боюся цієї кімнати… бо вона занадто затишна.', emote: 'neutral' }
    ]
  },
  {
    id: 'night3',
    type: 'night',
    nightNumber: 3,
    title: 'Ніч 3',
    characters: [
      { id: 'guy', x: 180, y: 160, pose: 'sitting' }, // Standing near sax
      { id: 'girl', x: 100, y: 160, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'sax_active', type: 'sax', x: 180, y: 160, layer: 'front' }
    ],
    dialogue: [
      { speaker: 'Він', text: 'Коли я граю — я не тікаю. Я… перетворююся.', emote: 'neutral' },
      { speaker: 'Вона', text: 'На кого?', emote: 'neutral' },
      { speaker: 'Він', text: 'На людину, яка не боїться бути почутою.', emote: 'smile' },
      { speaker: 'Вона', text: 'Тоді зіграй мені щось, що не просить дозволу.', emote: 'smile' },
      { speaker: 'Він', text: 'Це буде мелодія “я тут”.', emote: 'neutral' },
      { speaker: 'Вона', text: 'І мелодія “я теж”.', emote: 'smile' }
    ]
  },
  {
    id: 'night4',
    type: 'night',
    nightNumber: 4,
    title: 'Ніч 4',
    characters: [
      { id: 'guy', x: 90, y: 150, pose: 'sitting' },
      { id: 'girl', x: 150, y: 150, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'panda', type: 'panda', x: 200, y: 190, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Вона', text: 'У нас з’явився гість.', emote: 'smile' },
      { speaker: 'Він', text: 'Панда? В кімнаті саксофоніста? Це знак долі чи маркетинг?', emote: 'confused' },
      { speaker: 'Вона', text: 'Це знак, що хтось дуже хоче, аби ми не були серйозні.', emote: 'laugh' },
      { speaker: 'Він', text: 'Я можу бути серйозним.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Не сьогодні. Сьогодні ти смішний. І це лікує.', emote: 'smile' },
      { speaker: 'Він', text: 'Ти щойно назвала мене ліками?', emote: 'confused' },
      { speaker: 'Вона', text: 'Так. Без рецепта.', emote: 'laugh' }
    ]
  },
  {
    id: 'night5',
    type: 'night',
    nightNumber: 5,
    title: 'Ніч 5',
    characters: [
      { id: 'guy', x: 90, y: 150, pose: 'sitting' },
      { id: 'girl', x: 150, y: 150, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'clock', type: 'clock', x: 40, y: 100, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Він', text: 'Знаєш, що найстрашніше? Час не питає, чи готовий.', emote: 'neutral' },
      { speaker: 'Вона', text: 'А ти? Готовий?', emote: 'neutral' },
      { speaker: 'Він', text: 'Я готовий бути чесним. Але не готовий втрачати.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Ми не втрачаємо, коли пам’ятаємо.', emote: 'smile' },
      { speaker: 'Він', text: 'Це звучить як магія.', emote: 'confused' },
      { speaker: 'Вона', text: 'Ні. Це просто любов без пафосу.', emote: 'neutral' },
      { speaker: 'Він', text: 'Тоді я хочу запам’ятати твоє “каре” як окрему планету.', emote: 'smile' }
    ]
  },
  {
    id: 'night6',
    type: 'night',
    nightNumber: 6,
    title: 'Ніч 6',
    overlay: 'rain',
    characters: [
      { id: 'guy', x: 90, y: 150, pose: 'sitting' },
      { id: 'girl', x: 150, y: 150, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'mug', type: 'mug', x: 120, y: 170, layer: 'front' }
    ],
    dialogue: [
      { speaker: 'Вона', text: 'Дощ — це як система охолодження для думок.', emote: 'neutral' },
      { speaker: 'Він', text: 'А я думав, що мої думки — без вентиляторів.', emote: 'confused' },
      { speaker: 'Вона', text: 'Тоді пий. Гаряче. І повільно.', emote: 'neutral' },
      { speaker: 'Він', text: 'Ти завжди так лікуєш людей?', emote: 'neutral' },
      { speaker: 'Вона', text: 'Ні. Тільки тих, хто не грає героїзм.', emote: 'smile' },
      { speaker: 'Він', text: 'Я не герой. Я просто… поруч.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Це і є найрідкісніше.', emote: 'smile' }
    ]
  },
  {
    id: 'night7',
    type: 'night',
    nightNumber: 7,
    title: 'Ніч 7',
    overlay: 'kitchen',
    characters: [
      { id: 'guy', x: 90, y: 150, pose: 'sitting' },
      { id: 'girl', x: 150, y: 150, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Він', text: 'Слухай… хтось зверху знову йде до холодильника.', emote: 'confused' },
      { speaker: 'Вона', text: 'Це їхній ритуал. Як у тебе сакс.', emote: 'neutral' },
      { speaker: 'Він', text: 'А якщо він там ховає… таємниці?', emote: 'neutral' },
      { speaker: 'Вона', text: 'Можливо він просто голодний. Не роби з людей містику.', emote: 'smile' },
      { speaker: 'Він', text: 'Занадто пізно. Я вже уявив, що в холодильнику — маленькі всесвіти.', emote: 'laugh' },
      { speaker: 'Вона', text: 'Тоді бажаю сусіду смачної галактики.', emote: 'laugh' },
      { speaker: 'Він', text: 'Тсс… він відкрив дверцята.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Вітаю. Ми щойно подивились чужу ніч, не виходячи з ліжка.', emote: 'smile' }
    ]
  },
  {
    id: 'night8',
    type: 'night',
    nightNumber: 8,
    title: 'Ніч 8',
    overlay: 'confetti',
    characters: [
      { id: 'guy', x: 90, y: 150, pose: 'sitting' },
      { id: 'girl', x: 150, y: 150, pose: 'sitting' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'cake', type: 'cake', x: 190, y: 190, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Вона', text: 'У мене є новина. Сьогодні — день, коли світ має бути добрішим.', emote: 'smile' },
      { speaker: 'Він', text: 'Чому?', emote: 'confused' },
      { speaker: 'Вона', text: 'Бо в ньому є ти. І ще одна людина, яку треба святкувати.', emote: 'smile' },
      { speaker: 'Він', text: 'Тоді офіційно: я призначаю цю ніч — святковою.', emote: 'laugh' },
      { speaker: 'Вона', text: 'Звучить як наказ.', emote: 'neutral' },
      { speaker: 'Він', text: 'Ні. Як тост. За сміливість бути живою.', emote: 'smile' },
      { speaker: 'Вона', text: 'І за сміливість бути смішним.', emote: 'laugh' },
      { speaker: 'Він', text: '*Сакс грає короткий риф*', emote: 'neutral' },
      { speaker: 'Вона', text: 'Хаха. Добре. Сьогодні ми не аналізуємо. Сьогодні ми дихаємо.', emote: 'smile' }
    ]
  },
  {
    id: 'night9',
    type: 'night',
    nightNumber: 9,
    title: 'Ніч 9',
    characters: [
      { id: 'guy', x: 100, y: 160, pose: 'under_blanket' },
      { id: 'girl', x: 140, y: 160, pose: 'under_blanket' }
    ],
    props: [
      { id: 'bed', type: 'bed', x: 80, y: 160, layer: 'back' },
      { id: 'panda', type: 'panda', x: 180, y: 180, layer: 'back' }
    ],
    dialogue: [
      { speaker: 'Він', text: 'Мені вперше не страшно засинати.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Бо ти не один. І бо ти не тікаєш у голову.', emote: 'smile' },
      { speaker: 'Він', text: 'А завтра?', emote: 'neutral' },
      { speaker: 'Вона', text: 'Завтра ми будемо людьми. Без сценарію.', emote: 'neutral' },
      { speaker: 'Він', text: 'Тоді… добраніч.', emote: 'smile' },
      { speaker: 'Вона', text: 'Добраніч. І дякую, що був ніжним — навіть коли боявся.', emote: 'smile' },
      { speaker: 'Він', text: 'Я ще зіграю тобі “я тут”. Але завтра.', emote: 'neutral' },
      { speaker: 'Вона', text: 'Домовились.', emote: 'smile' }
    ]
  },
  {
    id: 'final',
    type: 'night', // Reuse 'night' rendering for simplicity in GameCanvas
    nightNumber: 10,
    title: 'Кінець',
    characters: [],
    props: [
        { id: 'xmas_pandas', type: 'panda_xmas', x: 120, y: 220, layer: 'front' }
    ],
    overlay: 'confetti',
    dialogue: []
  }
];
