import {memo, useState} from 'react';
import cls from './EventsSection.module.scss';
import MetaEvent from "src/entities/MetaEvent/ui/MetaEventCard.tsx";
import {MetaEventGridBlock} from "src/entities/MetaEvent";
import {
    SchemaSwitcher,
    SchemaSwitcherView
} from "./SchemaSwitcher/SchemaSwitcher.tsx";
import {useThrottle} from "src/shared/lib/hooks/useThrotte/useThrotle.ts";

const metaEventList: MetaEventGridBlock[] = [
    {
        id: 'hjgklhjrtkl-gdfjhkdfjhlk',
        summary: 'Режим ЧС в Курганской области из-за подъема воды',
        emotional: -90,
        position: [0, 0],
        date: new Date('2024-04-11'),
        text: 'В Курганской области из-за подъема уровня воды в реке Тобол введен режим ЧС.' +
            'Губернатор Шумков сообщил о росте водоема до 10 метров в селе Звериноголовском, что' +
            'является неблагоприятной отметкой. Вода движется по течению, и на сегодняшний день она составляет' +
            '383 см в районе Кургана, после того как выросла на 8 см за ночь. Пик паводка ожидается 13 апреля.'
    },
    {
        id: 'hjgka134alhjrtkl-gdfjhkdfjhlk',
        summary: 'Эвакуация в Каминском, паводок растет',
        emotional: -60,
        position: [1, 0],
        date: new Date('2024-04-11:01:46'),
        text: 'Губернатор Вадим Шумков в Telegram сообщил о росте уровня воды в селе Каминском до 743 см,' +
            'вызвавшей эвакуацию жителей. По его данным, «голова» паводка находится' +
            'в селе Ялым Притобольного округа, а «хвост» — в селе Прорывное Звериноголовского округа.' +
            'В общем по области подтоплено 183 жилых дома и' +
            '286 приусадебных участков, более 6 тыс. человек эвакуированы.'
    },
    {
        id: 'hjgka134alhaaajrtkl-gdfjhkdfjhlk',
        summary: 'Режим ЧС в Курганской области из-за подъема воды',
        emotional: -30,
        position: [2, 0],
        date: new Date('2024-04-11:01:46'),
        text: 'Губернатор Вадим Шумков в Telegram сообщил о росте уровня воды в селе Каминском до 743 см,' +
            'вызвавшей эвакуацию жителей. По его данным, «голова» паводка находится' +
            'в селе Ялым Притобольного округа, а «хвост» — в селе Прорывное Звериноголовского округа. В общем' +
            'по области подтоплено 183 жилых дома и 286 приусадебных участков, более 6 тыс. человек эвакуированы.'
    },
    {
        id: 'hjgkhaaajrtkl-gdfjhkdfjhlk',
        summary: 'Эвакуация жителей четырех сел в Кургане',
        emotional: -30,
        position: [0, 1],
        date: new Date('2024-04-11:01:46'),
        text: 'Власти Кетовского округа Курганской области начали предупредительную эвакуацию жителей четырех сел:' +
            'Барабы, Лаптево, Ново-Затобольное и Темляково из-за приближающегося паводка. Граждан ждут автобусы, им ' +
            'рекомендуется взять с собой документы, лекарства и ценные вещи. На территории трех сел вода уже зашла, ' +
            'подтоплены дома и участки. Введен режим ЧС в Кургане с 8 апреля.',
        children: [
            [0, 2],
            [2, 2]
        ]
    },
    {
        id: 'hjgkhaaajrtkl-gdfjhlk',
        summary: 'Эвакуация 280 тыс. человек в Курганской области',
        emotional: -10,
        position: [1, 1],
        date: new Date('2024-04-11:01:46'),
        text: 'Порядка 280 тыс. человек должны будут эвакуироваться при достижении рекой Тобол в Курганской' +
            'области отметки уровня воды в 14 метров.' +
            'Об этом сообщил в эфире телеканала "Россия-24" губернатор Курганской области Вадим Шумков.',
        children: [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [2, 1],
        ],
    },
    {
        id: '41325khaaajrtkl-gdfjhlk',
        summary: 'В Кургане подтоплены районы, дамба защищает часть города',
        emotional: -70,
        position: [2, 1],
        date: new Date('2024-04-11:01:46'),
        text: 'В Кургане за сутки уровень воды в реке Тобол повысился на 111 см до 742 см. ' +
            'Пресс-служба правительства ' +
            'сообщила, что «колоссальный объем воды» прибывает с юга и может вызвать быстрое подъём уровня воды. ' +
            'Уровень дамбы в городе увеличен до 11 метров и защищает только левую часть Кургана. Юго-западный ' +
            'микрорайон Черемухово уже подтоплен, а Нижняя Утятка оказалась отрезанной водой.'
    },
    {
        id: '41325khaaajraatkl-gdfjhlk',
        summary: 'Уровень воды в Кургане начал спадать',
        emotional: 100,
        position: [0, 2],
        date: new Date('2024-04-11:01:46'),
        text: 'Уровень воды в Кургане стабилизировался и начал медленно спадать, сообщил губернатор Вадим Шумков в ' +
            'своем телеграм-канале. Он уточнил, что дамба удерживается до снижения уровня ниже опасного, несмотря на ' +
            'то, что снизился уровень воды в реке Тобол. Власти рекомендуют жителям территорий в ' +
            'зонах риска продолжать эвакуироваться.',
    },
    {
        id: '41325hfgjfgjraatkl-gdfjhlk',
        summary: 'Росатом опровергает угрозу затопления',
        emotional: 50,
        position: [1, 2],
        date: new Date('2024-04-11:01:46'),
        text: 'Горнорудный дивизион «Росатома» обнародовал фотографии законсервированных скважин уранового ' +
            'месторождения Добровольное в Курганской области, назвав сообщения о возможной угрозе затопления их ' +
            'радионуклидами дезинформацией. Согласно представителям «Росатома», скважины находятся на возвышенности ' +
            'и не подвергаются воздействию паводковых вод. В Курганской области, где действует режим чрезвычайной ' +
            'ситуации из-за угрозы наводнения, местным жителям рекомендуется не оставлять себя без поддержки.'
    },
    {
        id: '41325hfyhjatkl-gdfjhlk',
        summary: 'Эвакуация в Тюменской области из-за паводков',
        emotional: -30,
        position: [2, 2],
        date: new Date('2024-04-11:01:46'),
        text: 'В Тюменской области из-за паводков эвакуировали более 5 тыс. человек. В регионе остаются ' +
            'подтопленными 180 жилых домов, свыше 2,8 тыс. приусадебных участков и 19 участков дорог. ' +
            'Режим ЧС действует в Тюменской, Курганской и Оренбургских областях из-за паводка, ' +
            'который вызвали резкое потепление и обильные осадки.'
    },
]

export const EventsSection = memo(() => {
    const [view, setView] = useState(SchemaSwitcherView.default)

    return (
        <section className={cls.events}>
            <div className={cls.eventsContent} id='#events-content'>
                    <h2 className={cls.mainTitle}>События</h2>
                <div className={cls.eventsMainInfo}>
                    <div className={cls.listSwitcher}>
                        <SchemaSwitcher view={view} setView={useThrottle((setView), 300)}/>
                        <div className={cls.eventsListContainer}>
                            <ul className={cls.eventsList}>
                                {metaEventList.map(event => (
                                    <MetaEvent metaEvent={event} key={event.id}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className={cls.mainText}>
                        В эпоху цифровой трансформации каждая секунда на вес золота, и каждый инсайт может стать
                        ключевым преимуществом. С Hoenir ваш бизнес получает доступ к мощнейшим инструментам
                        анализа данных, способным не только отслеживать текущие события, но и распознавать
                        скрытые тренды в океане информации. Представьте себе, что вы знаете о грядущих изменениях
                        до того, как они произойдут, и имеете возможность реагировать быстрее конкурентов.
                    </p>
                </div>
            </div>
        </section>
    );
});
