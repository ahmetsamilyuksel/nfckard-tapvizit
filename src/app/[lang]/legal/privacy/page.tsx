import Link from "next/link";
import { isValidLocale, defaultLocale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: "Политика конфиденциальности | tapvizit.life",
    description:
      "Политика конфиденциальности и обработки персональных данных — tapvizit.life",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <Link
          href={`/${locale}/create`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Назад к конструктору
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-gray-500">
            Последнее обновление: февраль 2026 г.
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900">
          {/* Введение */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Общие положения
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Настоящая Политика конфиденциальности (далее — «Политика»)
              определяет порядок обработки и защиты персональных данных
              пользователей (далее — «Субъект персональных данных»,
              «Пользователь») интернет-сервиса tapvizit.life (далее —
              «Оператор»).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Политика разработана в соответствии с Федеральным законом от
              27.07.2006 № 152-ФЗ «О персональных данных» (далее — 152-ФЗ),
              а также иными нормативно-правовыми актами Российской Федерации
              в области защиты персональных данных.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Используя сервис tapvizit.life и предоставляя свои персональные
              данные, Пользователь выражает согласие с условиями настоящей
              Политики. Если Пользователь не согласен с условиями Политики, он
              обязан прекратить использование сервиса.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Настоящая Политика является неотъемлемой частью{" "}
              <Link
                href={`/${locale}/legal/offer`}
                className="text-sky-600 hover:text-sky-700 underline"
              >
                Публичной оферты
              </Link>{" "}
              сервиса tapvizit.life.
            </p>
          </section>

          {/* 1. Информация об операторе */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Информация об операторе персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>1.1.</strong> Оператором персональных данных является
              интернет-сервис tapvizit.life.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>1.2.</strong> Контактные данные Оператора:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                <strong>Сайт:</strong>{" "}
                <a
                  href="https://tapvizit.life"
                  className="text-sky-600 hover:text-sky-700 underline"
                >
                  tapvizit.life
                </a>
              </li>
              <li className="text-gray-700">
                <strong>Электронная почта:</strong>{" "}
                <a
                  href="mailto:info@tapvizit.life"
                  className="text-sky-600 hover:text-sky-700 underline"
                >
                  info@tapvizit.life
                </a>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>1.3.</strong> Оператор определяет цели обработки
              персональных данных, состав персональных данных, подлежащих
              обработке, действия (операции), совершаемые с персональными
              данными.
            </p>
          </section>

          {/* 2. Правовые основания обработки */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Правовые основания обработки персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.1.</strong> Обработка персональных данных осуществляется
              на следующих правовых основаниях (статья 6 Федерального закона
              № 152-ФЗ):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                <strong>Согласие Субъекта персональных данных</strong> —
                Пользователь даёт согласие на обработку персональных данных при
                оформлении заказа и использовании сервиса (пп. 1 п. 1 ст. 6
                152-ФЗ);
              </li>
              <li className="text-gray-700">
                <strong>Исполнение договора</strong> — обработка необходима для
                исполнения договора (Публичной оферты), стороной которого
                является Субъект персональных данных (пп. 5 п. 1 ст. 6 152-ФЗ);
              </li>
              <li className="text-gray-700">
                <strong>Законные интересы Оператора</strong> — обработка
                необходима для обеспечения работоспособности сервиса, улучшения
                качества услуг и обеспечения безопасности.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>2.2.</strong> Оператор обрабатывает персональные данные
              исключительно при наличии хотя бы одного из указанных правовых
              оснований.
            </p>
          </section>

          {/* 3. Цели обработки */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Цели обработки персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.1.</strong> Оператор обрабатывает персональные данные
              Пользователя в следующих целях:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                <strong>Оказание услуг и исполнение заказа:</strong> создание
                Цифровой визитной карточки, изготовление физической NFC-карты,
                организация доставки по указанному адресу;
              </li>
              <li className="text-gray-700">
                <strong>Связь с Пользователем:</strong> уведомление о статусе
                заказа, ответы на обращения и претензии, направление
                информационных сообщений о сервисе;
              </li>
              <li className="text-gray-700">
                <strong>Улучшение качества сервиса:</strong> анализ поведения
                пользователей на сайте, выявление и устранение технических
                неполадок, совершенствование функциональности сервиса;
              </li>
              <li className="text-gray-700">
                <strong>Обеспечение безопасности:</strong> предотвращение
                мошеннических действий, защита прав и законных интересов
                Оператора и Пользователей;
              </li>
              <li className="text-gray-700">
                <strong>Соблюдение требований законодательства:</strong>{" "}
                исполнение обязанностей, предусмотренных законодательством РФ (в
                том числе налоговым и бухгалтерским законодательством).
              </li>
            </ul>
          </section>

          {/* 4. Состав персональных данных */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Состав обрабатываемых персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.1.</strong> В процессе оказания услуг Оператор может
              обрабатывать следующие категории персональных данных:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              4.1.1. Данные, предоставляемые Пользователем при оформлении заказа:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Имя и фамилия;
              </li>
              <li className="text-gray-700">
                Номер телефона;
              </li>
              <li className="text-gray-700">
                Адрес электронной почты;
              </li>
              <li className="text-gray-700">
                Адрес доставки (почтовый адрес);
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              4.1.2. Данные, размещаемые на Цифровой визитке:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Имя, фамилия, должность, название компании;
              </li>
              <li className="text-gray-700">
                Контактный телефон и адрес электронной почты;
              </li>
              <li className="text-gray-700">
                Адрес веб-сайта;
              </li>
              <li className="text-gray-700">
                Ссылки на профили в социальных сетях (Telegram, WhatsApp,
                VKontakte, Instagram, LinkedIn, TikTok, YouTube, Facebook и
                другие);
              </li>
              <li className="text-gray-700">
                Фотография профиля;
              </li>
              <li className="text-gray-700">
                Текстовое описание (биография);
              </li>
              <li className="text-gray-700">
                Почтовый адрес (при указании Пользователем);
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              4.1.3. Платёжные данные:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Данные о транзакциях (идентификатор платежа, дата, сумма, статус);
              </li>
              <li className="text-gray-700">
                Оператор <strong>не хранит</strong> полные номера банковских
                карт, CVV-коды и иные платёжные реквизиты — обработка платежей
                осуществляется сертифицированным платёжным агрегатором (YooKassa /
                ЮKassa).
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              4.1.4. Технические данные, собираемые автоматически:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                IP-адрес;
              </li>
              <li className="text-gray-700">
                Данные файлов cookie;
              </li>
              <li className="text-gray-700">
                Информация о браузере и устройстве (User-Agent);
              </li>
              <li className="text-gray-700">
                Дата и время посещения сайта;
              </li>
              <li className="text-gray-700">
                Страницы, посещённые на сайте;
              </li>
              <li className="text-gray-700">
                Источник перехода (реферер).
              </li>
            </ul>
          </section>

          {/* 5. Порядок получения согласия */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Порядок получения согласия на обработку персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.1.</strong> Согласие на обработку персональных данных
              предоставляется Пользователем в следующих формах:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Проставление отметки (чекбокса) о согласии с Политикой
                конфиденциальности при оформлении заказа на Сайте;
              </li>
              <li className="text-gray-700">
                Совершение конклюдентных действий — заполнение форм на Сайте
                и оплата заказа.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.2.</strong> Согласие считается предоставленным на весь
              срок использования сервиса и может быть отозвано Пользователем
              в любое время (см. раздел 8 настоящей Политики).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>5.3.</strong> Предоставляя персональные данные третьих лиц
              (например, при указании контактных данных на визитке), Пользователь
              подтверждает наличие согласия таких лиц на обработку их данных.
            </p>
          </section>

          {/* 6. Хранение персональных данных */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Хранение персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.1.</strong> В соответствии с частью 5 статьи 18
              Федерального закона № 152-ФЗ при сборе персональных данных, в том
              числе посредством информационно-телекоммуникационной сети Интернет,
              оператор обязан обеспечить запись, систематизацию, накопление,
              хранение, уточнение (обновление, изменение), извлечение
              персональных данных граждан Российской Федерации с использованием
              баз данных, находящихся на территории Российской Федерации.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.2.</strong> Персональные данные Пользователей хранятся
              на серверах, расположенных на территории Российской Федерации.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>6.3.</strong> Оператор обеспечивает надёжное хранение
              персональных данных и принимает все необходимые меры для
              предотвращения несанкционированного доступа к ним.
            </p>
          </section>

          {/* 7. Сроки хранения */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Сроки хранения персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>7.1.</strong> Сроки хранения персональных данных
              определяются в зависимости от целей обработки:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li className="text-gray-700">
                <strong>Данные активных аккаунтов и Цифровых визиток</strong> —
                в течение всего срока предоставления услуги (пока Цифровая
                визитка активна и доступна по URL-адресу). При удалении визитки
                или прекращении работы сервиса данные удаляются в течение 30
                календарных дней;
              </li>
              <li className="text-gray-700">
                <strong>Данные о заказах и транзакциях</strong> — 5 (пять) лет
                с момента совершения операции, в соответствии с требованиями
                налогового и бухгалтерского законодательства Российской
                Федерации;
              </li>
              <li className="text-gray-700">
                <strong>Данные для маркетинговых коммуникаций</strong> — до
                момента отзыва согласия Пользователем;
              </li>
              <li className="text-gray-700">
                <strong>Технические данные (логи, cookie)</strong> — не более 1
                (одного) года с момента сбора.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>7.2.</strong> По истечении сроков хранения персональные
              данные уничтожаются или обезличиваются, если иное не предусмотрено
              законодательством Российской Федерации.
            </p>
          </section>

          {/* 8. Права субъекта персональных данных */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Права субъекта персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>8.1.</strong> В соответствии со статьями 14–17
              Федерального закона № 152-ФЗ Пользователь имеет следующие права:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li className="text-gray-700">
                <strong>Право на доступ (ст. 14 152-ФЗ):</strong> Пользователь
                вправе получить информацию, касающуюся обработки его персональных
                данных, в том числе содержащую: подтверждение факта обработки,
                правовые основания и цели обработки, применяемые способы
                обработки, наименование и местонахождение Оператора, лиц, которые
                имеют доступ к персональным данным;
              </li>
              <li className="text-gray-700">
                <strong>Право на уточнение (ст. 14 152-ФЗ):</strong>{" "}
                Пользователь вправе требовать от Оператора уточнения своих
                персональных данных, их блокирования или уничтожения в случае,
                если персональные данные являются неполными, устаревшими,
                неточными;
              </li>
              <li className="text-gray-700">
                <strong>Право на удаление (ст. 14, 17 152-ФЗ):</strong>{" "}
                Пользователь вправе требовать удаления своих персональных данных.
                При поступлении требования об удалении Оператор прекращает
                обработку и уничтожает персональные данные в срок, не
                превышающий 30 (тридцати) календарных дней, за исключением
                данных, хранение которых требуется по закону;
              </li>
              <li className="text-gray-700">
                <strong>Право на отзыв согласия (ст. 15 152-ФЗ):</strong>{" "}
                Пользователь вправе отозвать своё согласие на обработку
                персональных данных в любое время, направив письменное
                уведомление Оператору. Отзыв согласия не влияет на законность
                обработки, осуществлённой до момента отзыва;
              </li>
              <li className="text-gray-700">
                <strong>Право на обжалование (ст. 17 152-ФЗ):</strong>{" "}
                Пользователь вправе обжаловать действия или бездействие
                Оператора в уполномоченный орган по защите прав субъектов
                персональных данных (Роскомнадзор) или в судебном порядке.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>8.2.</strong> Для реализации указанных прав Пользователь
              направляет запрос на электронную почту Оператора:{" "}
              <a
                href="mailto:info@tapvizit.life"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                info@tapvizit.life
              </a>
              .
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>8.3.</strong> Оператор рассматривает запрос в течение 30
              (тридцати) календарных дней с момента его получения и направляет
              мотивированный ответ Пользователю.
            </p>
          </section>

          {/* 9. Файлы cookie */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Использование файлов cookie
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>9.1.</strong> Сайт tapvizit.life использует файлы cookie
              — небольшие текстовые файлы, которые сохраняются на устройстве
              Пользователя при посещении Сайта.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>9.2.</strong> На Сайте используются следующие типы файлов
              cookie:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                <strong>Необходимые (технические) cookie:</strong> обеспечивают
                корректную работу Сайта, запоминание языковых предпочтений,
                авторизацию. Без них использование Сайта невозможно;
              </li>
              <li className="text-gray-700">
                <strong>Аналитические cookie:</strong> помогают Оператору
                понимать, как Пользователи взаимодействуют с Сайтом, какие
                страницы посещают, выявлять ошибки. Данные собираются в
                обезличенном виде;
              </li>
              <li className="text-gray-700">
                <strong>Функциональные cookie:</strong> запоминают выбор
                Пользователя (настройки дизайна, заполненные поля формы) для
                удобства использования сервиса.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>9.3.</strong> Пользователь может управлять использованием
              файлов cookie через настройки своего браузера: отключить все cookie
              или настроить уведомления об их установке. Отключение cookie может
              повлиять на функциональность Сайта.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>9.4.</strong> Продолжая использование Сайта, Пользователь
              подтверждает согласие на использование файлов cookie в соответствии
              с настоящей Политикой.
            </p>
          </section>

          {/* 10. Меры по защите персональных данных */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Меры по защите персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>10.1.</strong> Оператор принимает необходимые и достаточные
              организационные и технические меры для защиты персональных данных
              от неправомерного или случайного доступа, уничтожения, изменения,
              блокирования, копирования, распространения, а также от иных
              неправомерных действий с ними.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              10.2. Технические меры:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Шифрование данных при передаче по каналам связи (протокол
                HTTPS/TLS);
              </li>
              <li className="text-gray-700">
                Шифрование персональных данных при хранении;
              </li>
              <li className="text-gray-700">
                Использование межсетевых экранов (файрволов) и систем
                обнаружения вторжений;
              </li>
              <li className="text-gray-700">
                Регулярное резервное копирование данных;
              </li>
              <li className="text-gray-700">
                Защита серверов от несанкционированного доступа;
              </li>
              <li className="text-gray-700">
                Регулярное обновление программного обеспечения.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              10.3. Организационные меры:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                Ограничение круга лиц, имеющих доступ к персональным данным;
              </li>
              <li className="text-gray-700">
                Разграничение прав доступа к информационным системам;
              </li>
              <li className="text-gray-700">
                Ознакомление лиц, осуществляющих обработку персональных данных,
                с требованиями законодательства и внутренними документами
                Оператора;
              </li>
              <li className="text-gray-700">
                Контроль за соблюдением мер по защите персональных данных.
              </li>
            </ul>
          </section>

          {/* 11. Передача данных третьим лицам */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              11. Передача персональных данных третьим лицам
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>11.1.</strong> Оператор не продаёт, не передаёт и не
              раскрывает персональные данные Пользователей третьим лицам, за
              исключением случаев, описанных ниже.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>11.2.</strong> Персональные данные могут быть переданы
              следующим категориям третьих лиц исключительно в целях исполнения
              заказа и оказания услуг:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li className="text-gray-700">
                <strong>Платёжный агрегатор — ЮKassa (YooKassa):</strong>{" "}
                передаются данные, необходимые для обработки платежа
                (идентификатор заказа, сумма платежа). Полные реквизиты
                банковской карты обрабатываются непосредственно ЮKassa и не
                передаются Оператору. ЮKassa является сертифицированным
                платёжным сервисом, соответствующим стандартам PCI DSS;
              </li>
              <li className="text-gray-700">
                <strong>Службы доставки — СДЭК, Почта России, Ozon Доставка,
                  Яндекс Доставка:</strong>{" "}
                передаются данные, необходимые для осуществления доставки (имя
                получателя, адрес доставки, контактный телефон).
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>11.3.</strong> Персональные данные могут быть переданы
              государственным органам Российской Федерации в случаях,
              предусмотренных действующим законодательством (по запросу суда,
              правоохранительных органов, налоговых органов и пр.).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>11.4.</strong> Публичная информация, размещённая
              Пользователем на Цифровой визитке, доступна неограниченному кругу
              лиц по URL-адресу визитки и через QR-код. Размещение данных на
              Цифровой визитке осуществляется Пользователем добровольно и
              осознанно.
            </p>
          </section>

          {/* 12. Трансграничная передача */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              12. Трансграничная передача персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>12.1.</strong> Оператор обеспечивает хранение персональных
              данных граждан Российской Федерации на серверах, расположенных на
              территории Российской Федерации, в соответствии с требованиями
              части 5 статьи 18 Федерального закона № 152-ФЗ.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>12.2.</strong> Трансграничная передача персональных данных
              может осуществляться только в страны, обеспечивающие адекватную
              защиту прав субъектов персональных данных, и только при наличии
              законных оснований.
            </p>
          </section>

          {/* 13. Изменение Политики */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              13. Изменение Политики конфиденциальности
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>13.1.</strong> Оператор вправе вносить изменения в
              настоящую Политику. Новая редакция Политики вступает в силу с
              момента её размещения на Сайте, если иное не предусмотрено новой
              редакцией.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>13.2.</strong> Действующая редакция Политики всегда
              доступна на странице:{" "}
              <a
                href="https://tapvizit.life/ru/legal/privacy"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                tapvizit.life/ru/legal/privacy
              </a>
              .
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>13.3.</strong> Продолжение использования сервиса после
              внесения изменений означает согласие Пользователя с новой
              редакцией Политики.
            </p>
          </section>

          {/* Контактная информация */}
          <section className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Контактная информация для обращений по вопросам персональных данных
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              По всем вопросам, связанным с обработкой персональных данных,
              реализацией прав субъектов персональных данных, а также для
              направления запросов, претензий и отзыва согласия, обращайтесь:
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Электронная почта:</strong>{" "}
              <a
                href="mailto:info@tapvizit.life"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                info@tapvizit.life
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Сайт:</strong>{" "}
              <a
                href="https://tapvizit.life"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                tapvizit.life
              </a>
            </p>
          </section>

          {/* Footer links */}
          <section className="flex flex-wrap gap-4 text-sm text-gray-500 pt-6 border-t border-gray-200">
            <Link
              href={`/${locale}/legal/offer`}
              className="hover:text-gray-900 transition-colors"
            >
              Публичная оферта
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={`/${locale}/legal/refund`}
              className="hover:text-gray-900 transition-colors"
            >
              Политика возврата
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}
