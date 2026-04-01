import { IProduct } from "./types";
import { TBlogPosts } from "./types";
import {retry} from "@reduxjs/toolkit/query";



export const apiBaseUrl = 'https://pnhdstudioapi.ru';
//export const apiBaseUrl = 'http://localhost:9000';
export const CDN_URL = 'https://cdn.pnhd.ru';

export const ACQUIRE_RATIO = 0.965 //комиссия эквайринга

export const checkResponse = (res: any) => {
    if (res.ok || res.created) {
      return res.json() as Array<IProduct>;
    }
    return res.json().then((err: any) => Promise.reject(err));
};

  
  export const getShopData = async (searchParams?: { [n: string]: string}) => {
    let queryString = '';
    if (searchParams) {
        const keys = Object.keys(searchParams);
        keys.forEach((key, index) => {
            if (index === 0)  return queryString += `?${key}=${searchParams[key]}`;
            return queryString += `&${key}=${searchParams[key]}`
        })
    }
    const shopData = await fetch(`${apiBaseUrl}/api/products${queryString}`, {
        next: { revalidate: 3600, tags: ['shopDataTag'] },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(checkResponse)
    return shopData.data;
}

export const getPosts = async (): Promise<TBlogPosts> => {
    const posts = await fetch(`${apiBaseUrl}/api/blog`, {
        next: { revalidate: 3600, tags: ['blogTag'] },
    })
    .then(checkResponse);

    return posts;
}

export const tumblers = [ 'DTG', 'DTF', 'ТЕРМОПЕРЕНОС', 'ВЫШИВКА' ];

export const prices = [
    {
        name: 'DTG',
        prices: [
            {
                format: 'А6',
                price: '350 Р. / 450 Р.'
            },
            {
                format: 'А5',
                price: '450 Р. / 575 Р.'
            },
            {
                format: 'А4',
                price: '575 Р. / 750 Р.'
            },
            {
                format: 'А3',
                price: '750 Р. / 850 Р.'
            },
            {
                format: 'А3+',
                price: '850 Р. / 1050 Р.'
            },
        ]
    },
    {
        name: 'DTF',
        prices: [
            {
                format: 'mini',
                price: '400 Р.'
            },
            {
                format: 'А6',
                price: '450 Р.'
            },
            {
                format: 'А5',
                price: '550 Р.'
            },
            {
                format: 'А4',
                price: '700 Р.'
            },
            {
                format: 'А3',
                price: '850 Р.'
            },
            {
                format: 'А3+',
                price: '1050 Р.'
            },
        ]
    },
    {
        name: 'ТЕРМОПЕРЕНОС',
        prices: [
            {
                format: 'mini',
                price: '400 Р.'
            },
            {
                format: 'А6',
                price: '550 Р.'
            },
            {
                format: 'А5',
                price: '700 Р.'
            },
            {
                format: 'А4',
                price: '950 Р.'
            },
            {
                format: 'А3',
                price: '1050 Р.'
            },
            {
                format: 'А3+',
                price: '1200 Р.'
            },
        ]
    },
    {
        name: 'ВЫШИВКА',
        prices: [
            {
                format: 'А6',
                price: '900 Р.'
            },
            {
                format: 'А5',
                price: '1100 Р.'
            },
            {
                format: 'А4',
                price: '1600 Р.'
            },
            {
                format: 'А3',
                price: '2100 Р.'
            },
        ]
    },
]


export const feedbackArr = [
    {
        id: 1,
        name: 'наташа п.',
        feedback: 'Делала худи подарок. Качество огонь, клиент доволен :)',
    },
    {
        id: 2,
        name: 'дарья т.',
        feedback: 'Отличные футболки, особенно порадовал оверсайз (обычно его никто не делает) ну и качество печати!',
    },
    {
        id: 3,
        name: 'ира м.',
        feedback: 'Стирала толстовку уже раз 10. Печать как новая!',
    },
    {
        id: 4,
        name: 'саша м.',
        feedback: 'Ребята, спасибо! Очень выручили когда нужно было срочно напечатать! Качество отличное!',
    },
    {
        id: 5,
        name: 'елизавета к.',
        feedback: 'Хорошее место и очень приветливая девушка-администратор. Все показала, рассказала об уходе и красиво запаковала.',
    },
    {
        id: 6,
        name: 'дарья м.',
        feedback: 'Очень понравился сервис и результат печати. Всё качественно, быстро.',
    },
    {
        id: 7,
        name: 'соня к.',
        feedback: 'Обалденные ребята. Сделали качественно, недорого. Я считаю, что могли бы даже побольше взять…Однозначно рекомендую',
    },
]


export type ReviewSource = 'yandex' | '2gis' | 'avito' | 'vk' | 'google';

export const reviewsData: Array<{
    id: number;
    name: string;
    initials: string;
    source: ReviewSource;
    date: string;
    stars: number;
    tags: string[];
    text: string;
}> = [
    {
        id: 1,
        name: 'Наташа П.',
        initials: 'НП',
        source: 'yandex',
        date: 'Янв 2025',
        stars: 5,
        tags: ['подарок', 'толстовки'],
        text: 'Делала худи подарок. Качество огонь, клиент доволен :)',
    },
    {
        id: 2,
        name: 'Дарья Т.',
        initials: 'ДТ',
        source: 'yandex',
        date: 'Фев 2025',
        stars: 5,
        tags: ['футболки', 'качество'],
        text: 'Отличные футболки, особенно порадовал оверсайз (обычно его никто не делает) ну и качество печати!',
    },
    {
        id: 3,
        name: 'Ира М.',
        initials: 'ИМ',
        source: 'yandex',
        date: 'Мар 2025',
        stars: 5,
        tags: ['толстовки', 'качество'],
        text: 'Стирала толстовку уже раз 10. Печать как новая!',
    },
    {
        id: 4,
        name: 'Саша М.',
        initials: 'СМ',
        source: 'yandex',
        date: 'Мар 2025',
        stars: 5,
        tags: ['срочно', 'качество'],
        text: 'Ребята, спасибо! Очень выручили когда нужно было срочно напечатать! Качество отличное!',
    },
    {
        id: 5,
        name: 'Елизавета К.',
        initials: 'ЕК',
        source: '2gis',
        date: 'Фев 2025',
        stars: 5,
        tags: ['сервис'],
        text: 'Хорошее место и очень приветливая девушка-администратор. Все показала, рассказала об уходе и красиво запаковала.',
    },
    {
        id: 6,
        name: 'Дарья М.',
        initials: 'ДМ',
        source: '2gis',
        date: 'Янв 2025',
        stars: 5,
        tags: ['качество', 'сервис'],
        text: 'Очень понравился сервис и результат печати. Всё качественно, быстро.',
    },
    {
        id: 7,
        name: 'Соня К.',
        initials: 'СК',
        source: '2gis',
        date: 'Апр 2025',
        stars: 5,
        tags: ['качество'],
        text: 'Обалденные ребята. Сделали качественно, недорого. Я считаю, что могли бы даже побольше взять… Однозначно рекомендую',
    },
    {
        id: 8,
        name: 'Анна Л.',
        initials: 'АЛ',
        source: 'avito',
        date: 'Мар 2025',
        stars: 5,
        tags: ['подарок', 'футболки'],
        text: 'Заказывала футболки с принтом в подарок. Всё сделали быстро, принт держится отлично. Буду обращаться ещё!',
    },
    {
        id: 9,
        name: 'Максим В.',
        initials: 'МВ',
        source: 'avito',
        date: 'Фев 2025',
        stars: 5,
        tags: ['срочно', 'толстовки'],
        text: 'Срочно нужны были толстовки для мероприятия. Ребята помогли, сделали за 2 дня. Качество супер.',
    },
    {
        id: 10,
        name: 'Катя Р.',
        initials: 'КР',
        source: 'vk',
        date: 'Янв 2025',
        stars: 5,
        tags: ['сервис', 'подарок'],
        text: 'Заказывала корпоративные футболки. Отличный сервис, быстро ответили, помогли с макетом. Всем советую!',
    },
    {
        id: 11,
        name: 'Олег Б.',
        initials: 'ОБ',
        source: 'vk',
        date: 'Мар 2025',
        stars: 5,
        tags: ['качество', 'футболки'],
        text: 'Печать качественная, цвета насыщенные. Заказывал уже трижды — каждый раз отличный результат.',
    },
    {
        id: 12,
        name: 'Мария С.',
        initials: 'МС',
        source: 'google',
        date: 'Янв 2025',
        stars: 5,
        tags: ['подарок', 'качество'],
        text: 'Заказывала худи с принтом в подарок другу. Всё сделали аккуратно, принт яркий. Очень довольна!',
    },
    {
        id: 13,
        name: 'Никита Ф.',
        initials: 'НФ',
        source: 'google',
        date: 'Фев 2025',
        stars: 5,
        tags: ['срочно', 'футболки'],
        text: 'Нужны были футболки для команды срочно. Сделали быстро, качество отличное. Обязательно вернусь.',
    },
    {
        id: 14,
        name: 'Юля П.',
        initials: 'ЮП',
        source: 'google',
        date: 'Мар 2025',
        stars: 5,
        tags: ['сервис', 'толстовки'],
        text: 'Приятный сервис, помогли с выбором материала и расположением принта. Толстовка получилась супер!',
    },
]


export const faqArr = [
    {
        title: 'В какие дни работает студия?',
        text: 'Ежедневно с 11 до 20 часа. Без выходных',
    },
    {
        title: 'Как к вам проехать?',
        text: 'Повернуть с Каменноостровского проспекта на улицу Чапыгина и пройти к следующему крыльцу после Wildberries',
    },
    {
        title: 'Можно ли сделать шелкографию на 1 штуку?',
        text: 'Шелкография — тиражный метод печати, делаем её только для заказов от 50 штук. Ближайший аналог — DTF',
    },
    {
        title: 'Есть ли доставка?',
        text: `По СПб можно вызвать к нам курьера
            любой службы. Укажи номер заказа
            в комментариях и вызови доставку
            до двери.
            
            По РФ доставляем через СДЭК.
            Если нужна другая транспортная
            компания, то её можно вызвать самостоятельно`,
    },
    {
        title: 'Можно ли вышить/напечатать логотип известного бренда?',
        text: `Мы можем отказать в печати
        логотипа бренда, чтобы не нарушать
        авторские права, либо запросить
        подтверждение прав`,
    },
]


export function getCookie(cookie: string) {
    return cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      //@ts-ignore
      acc[name] = value
      return acc
    }, {})
}


export const urlQueryStringToObject = (searchParams: string) => {
    let obj = {};
    if (searchParams.includes('#')) {
        searchParams = searchParams.substring(0, searchParams.indexOf('#'));
    }
    const paramsArr = searchParams.split('&');
    paramsArr.forEach((param) => {
        const keyValueArr = param.split('=')
        if (keyValueArr[0].includes('utm') ||
            keyValueArr[0].includes('rs') ||
            keyValueArr[0].includes('roistat')
        ) {
            obj = {
                ...obj,
                [keyValueArr[0]]: keyValueArr[1]
            }
        }
    })
    return obj;
}

export const getCurrentUrl = (pathname: string, searchParams?: URLSearchParams) => {
    const search = searchParams?.toString() ? `?${searchParams.toString()}` : '';
    return `${pathname}${search}`;
}


export function getCurrentPath():Array<string>{
    let currentDir:RegExpMatchArray|null = __dirname.match(/(?<=[\/\\]app[\/\\]).+/)
    let path:Array<string> = []

    if (currentDir){
        path = currentDir[0].split(/\/\\]/)
    }

    return path
}


/*
{
  "post_id": 001,
  "title": "TEST POST",
  "subtitle": "Test subtitle",
  "slug": "test-slug",
  "createdAt": "27.07.2024",
  "cover": "https://pnhdstudioapi.ru/images/classic_tee/white_main.jpg",
  "likes": 300,
  "hashtags": ["#test1","test2","test3"],
  "author": "Mike Starina",
  "blog": {"__html": ""}
}
*/