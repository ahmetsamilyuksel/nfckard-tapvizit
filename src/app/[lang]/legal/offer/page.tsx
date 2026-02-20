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
    title: "Публичная оферта | tapvizit.life",
    description:
      "Договор публичной оферты на оказание услуг по созданию цифровых визиток и изготовлению NFC-карт — tapvizit.life",
  };
}

export default async function OfferPage({
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
            Публичная оферта
          </h1>
          <p className="text-sm text-gray-500">
            Последнее обновление: февраль 2026 г.
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900">
          {/* Преамбула */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Преамбула
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Настоящий документ является официальным предложением (публичной
              офертой) интернет-сервиса tapvizit.life (далее — «Исполнитель»),
              адресованным любому физическому или юридическому лицу (далее —
              «Заказчик»), и содержит все существенные условия оказания услуг по
              созданию цифровых визитных карточек и изготовлению физических
              NFC-карт.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              В соответствии с пунктом 2 статьи 437 Гражданского кодекса
              Российской Федерации (далее — ГК РФ) настоящий документ является
              публичной офертой, и в случае принятия изложенных ниже условий
              лицо, производящее акцепт данной оферты, становится Заказчиком
              (в соответствии с п. 3 ст. 438 ГК РФ акцепт оферты равносилен
              заключению договора на условиях, изложенных в оферте).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Акцептом (принятием) условий настоящей оферты является оформление
              Заказчиком заказа на сайте tapvizit.life и/или оплата услуг
              Исполнителя.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Настоящая оферта регулируется положениями Гражданского кодекса РФ
              (в том числе ст. 435, 437, 438), Закона РФ от 07.02.1992
              № 2300-1 «О защите прав потребителей» (далее — ЗОЗПП), а также
              иными нормативно-правовыми актами Российской Федерации.
            </p>
          </section>

          {/* 1. Термины и определения */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Термины и определения
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              В настоящей оферте нижеуказанные термины используются в следующих
              значениях:
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.1. Исполнитель</strong> — интернет-сервис tapvizit.life,
              осуществляющий деятельность по созданию цифровых визитных карточек
              и изготовлению физических NFC-карт.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.2. Заказчик</strong> — физическое или юридическое лицо,
              осуществившее акцепт настоящей оферты и оформившее заказ на
              оказание услуг Исполнителя.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.3. Сайт</strong> — интернет-ресурс Исполнителя,
              расположенный по адресу tapvizit.life.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.4. Цифровая визитная карточка (Цифровая визитка)</strong>{" "}
              — персональная веб-страница Заказчика, созданная с помощью сервиса
              Исполнителя, содержащая контактную информацию, ссылки на социальные
              сети и иные данные, указанные Заказчиком. Доступна по уникальному
              URL-адресу и через QR-код.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.5. NFC-карта (Физическая карта)</strong> — физическая
              карта с NFC-чипом, содержащим ссылку на Цифровую визитку Заказчика,
              изготовленная по индивидуальному дизайну Заказчика.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.6. Заказ</strong> — оформленная Заказчиком через Сайт
              заявка на создание Цифровой визитки и/или изготовление NFC-карты.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>1.7. Услуга</strong> — комплекс действий Исполнителя по
              созданию Цифровой визитки, изготовлению NFC-карты и доставке
              физической карты Заказчику.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>1.8. Акцепт</strong> — полное и безоговорочное принятие
              Заказчиком условий настоящей оферты путём совершения действий,
              указанных в Преамбуле.
            </p>
          </section>

          {/* 2. Предмет договора */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Предмет договора
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.1.</strong> Исполнитель обязуется оказать Заказчику
              следующие услуги, а Заказчик обязуется оплатить их:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Создание персональной Цифровой визитной карточки, доступной по
                уникальному URL-адресу и QR-коду;
              </li>
              <li className="text-gray-700">
                Изготовление физической NFC-карты с индивидуальным дизайном
                Заказчика, содержащей NFC-чип со ссылкой на Цифровую визитку;
              </li>
              <li className="text-gray-700">
                Доставка физической NFC-карты по адресу, указанному Заказчиком.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.2.</strong> Цифровая визитка создаётся на основании
              данных, введённых Заказчиком в конструкторе на Сайте. Заказчик
              самостоятельно заполняет контактную информацию, выбирает дизайн,
              тему оформления и макет карты.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.3.</strong> Перед оплатой Заказчику предоставляется
              полный предпросмотр Цифровой визитки в том виде, в котором она
              будет опубликована. Оплата заказа подтверждает согласие Заказчика
              с содержанием и внешним видом Цифровой визитки.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>2.4.</strong> NFC-карта изготавливается по индивидуальному
              заказу Заказчика и обладает индивидуально-определёнными свойствами
              (персонализированный дизайн, контент, запрограммированный NFC-чип).
            </p>
          </section>

          {/* 3. Порядок оформления заказа */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Порядок оформления заказа
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.1.</strong> Заказ оформляется Заказчиком самостоятельно
              через Сайт tapvizit.life в следующем порядке:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Заказчик заполняет данные для Цифровой визитки в конструкторе
                (имя, контактные данные, ссылки на социальные сети, фотографию
                и прочее);
              </li>
              <li className="text-gray-700">
                Заказчик выбирает тему оформления, цветовую схему и макет карты;
              </li>
              <li className="text-gray-700">
                Заказчик проверяет предпросмотр Цифровой визитки;
              </li>
              <li className="text-gray-700">
                Заказчик выбирает тип физической NFC-карты (Стандарт ПВХ,
                Премиум, Металл);
              </li>
              <li className="text-gray-700">
                Заказчик указывает контактные данные для связи (имя, телефон,
                электронная почта);
              </li>
              <li className="text-gray-700">
                Заказчик указывает адрес доставки и выбирает способ доставки;
              </li>
              <li className="text-gray-700">
                Заказчик подтверждает согласие с условиями настоящей оферты и
                Политикой конфиденциальности;
              </li>
              <li className="text-gray-700">
                Заказчик производит оплату заказа.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.2.</strong> Моментом заключения договора является момент
              поступления оплаты за заказ от Заказчика.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>3.3.</strong> После успешной оплаты Заказчик незамедлительно
              получает: уникальный URL-адрес своей Цифровой визитки и QR-код для
              доступа к ней. Физическая NFC-карта направляется Заказчику в
              соответствии с разделом 5 настоящей оферты.
            </p>
          </section>

          {/* 4. Цена и порядок оплаты */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Цена и порядок оплаты
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.1.</strong> Стоимость услуг Исполнителя определяется в
              российских рублях и указывается на Сайте на момент оформления
              заказа. Стоимость зависит от выбранного типа NFC-карты:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Стандарт (ПВХ) — стоимость указана на сайте в момент оформления
                заказа;
              </li>
              <li className="text-gray-700">
                Премиум (матовая ламинация) — стоимость указана на сайте в
                момент оформления заказа;
              </li>
              <li className="text-gray-700">
                Металл — стоимость указана на сайте в момент оформления заказа.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.2.</strong> В стоимость заказа входит: создание Цифровой
              визитки, генерация QR-кода, изготовление физической NFC-карты
              выбранного типа, программирование NFC-чипа. Стоимость доставки
              рассчитывается отдельно и зависит от выбранного способа доставки
              и региона.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.3.</strong> Оплата производится в безналичной форме
              посредством одного из следующих способов:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Банковские карты (Visa, MasterCard, МИР);
              </li>
              <li className="text-gray-700">
                Система быстрых платежей (СБП);
              </li>
              <li className="text-gray-700">ЮKassa (YooKassa);</li>
              <li className="text-gray-700">
                Иные способы оплаты, доступные на Сайте в момент оформления
                заказа.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.4.</strong> Обработка платежей осуществляется
              сертифицированным платёжным агрегатором. Исполнитель не хранит
              данные банковских карт Заказчика.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>4.5.</strong> Исполнитель вправе изменять цены на свои
              услуги в одностороннем порядке. Изменение цен не распространяется
              на уже оплаченные заказы.
            </p>
          </section>

          {/* 5. Сроки оказания услуг и доставка */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Сроки оказания услуг и доставка
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.1. Цифровая визитка</strong> (цифровая услуга):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Цифровая визитка создаётся и становится доступной по уникальному
                URL-адресу и QR-коду незамедлительно после успешной оплаты
                заказа;
              </li>
              <li className="text-gray-700">
                Услуга по созданию Цифровой визитки считается полностью
                оказанной в момент предоставления Заказчику URL-адреса и QR-кода.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.2. Физическая NFC-карта:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Изготовление физической NFC-карты осуществляется в течение 1–3
                рабочих дней с момента оплаты заказа;
              </li>
              <li className="text-gray-700">
                После изготовления карта передаётся в службу доставки.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.3.</strong> Доставка физической NFC-карты осуществляется
              выбранной Заказчиком службой доставки:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                <strong>СДЭК</strong> — ориентировочный срок доставки 3–7 рабочих
                дней;
              </li>
              <li className="text-gray-700">
                <strong>Почта России</strong> — ориентировочный срок доставки
                5–14 рабочих дней;
              </li>
              <li className="text-gray-700">
                <strong>Ozon Доставка</strong> — ориентировочный срок доставки
                2–5 рабочих дней;
              </li>
              <li className="text-gray-700">
                <strong>Яндекс Доставка</strong> — ориентировочный срок доставки
                1–3 рабочих дня.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.4.</strong> Указанные сроки доставки являются
              ориентировочными и могут варьироваться в зависимости от региона
              доставки и загруженности служб доставки. Исполнитель не несёт
              ответственности за задержки, вызванные действиями служб доставки.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.5.</strong> Общий срок исполнения заказа (от оплаты до
              получения физической карты) составляет от 3 до 14 рабочих дней
              в зависимости от выбранного способа доставки и региона.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>5.6.</strong> Риск случайной гибели или случайного
              повреждения товара переходит к Заказчику с момента передачи
              физической NFC-карты службе доставки.
            </p>
          </section>

          {/* 6. Качество и гарантии */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Качество и гарантии
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.1.</strong> Исполнитель гарантирует, что Цифровая
              визитка будет создана в соответствии с данными, введёнными
              Заказчиком, и будет доступна по предоставленному URL-адресу.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.2.</strong> Исполнитель гарантирует работоспособность
              NFC-чипа в физической карте при соблюдении условий эксплуатации.
              Гарантийный срок на физическую NFC-карту составляет 12 (двенадцать)
              месяцев с момента получения Заказчиком.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.3.</strong> Исполнитель обеспечивает доступность
              Цифровой визитки в сети Интернет в режиме 24/7, за исключением
              периодов технического обслуживания и обстоятельств непреодолимой
              силы.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.4.</strong> Исполнитель обеспечивает хостинг Цифровой
              визитки на протяжении всего срока действия сервиса. В случае
              прекращения работы сервиса Исполнитель уведомляет Заказчика не
              менее чем за 30 (тридцать) календарных дней.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>6.5.</strong> Гарантия не распространяется на повреждения
              физической NFC-карты, возникшие по вине Заказчика (механические
              повреждения, воздействие воды, огня, химических веществ и т.д.).
            </p>
          </section>

          {/* 7. Права и обязанности сторон */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Права и обязанности сторон
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              7.1. Исполнитель обязан:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Оказать услуги надлежащего качества в соответствии с условиями
                настоящей оферты;
              </li>
              <li className="text-gray-700">
                Создать Цифровую визитку и предоставить доступ к ней
                незамедлительно после оплаты;
              </li>
              <li className="text-gray-700">
                Изготовить и отправить физическую NFC-карту в установленные сроки;
              </li>
              <li className="text-gray-700">
                Обеспечить доступность и работоспособность Цифровой визитки;
              </li>
              <li className="text-gray-700">
                Обеспечить сохранность и защиту персональных данных Заказчика в
                соответствии с Политикой конфиденциальности;
              </li>
              <li className="text-gray-700">
                Информировать Заказчика об изменениях условий оферты.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              7.2. Исполнитель вправе:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Изменять условия настоящей оферты в одностороннем порядке с
                уведомлением путём публикации изменений на Сайте;
              </li>
              <li className="text-gray-700">
                Привлекать третьих лиц для исполнения своих обязательств
                (службы доставки, платёжные системы);
              </li>
              <li className="text-gray-700">
                Приостановить доступ к Цифровой визитке в случае нарушения
                Заказчиком условий оферты или законодательства РФ;
              </li>
              <li className="text-gray-700">
                Отказать в оказании услуг в случае предоставления Заказчиком
                заведомо ложной информации.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              7.3. Заказчик обязан:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Предоставить достоверные данные при оформлении заказа;
              </li>
              <li className="text-gray-700">
                Своевременно оплатить заказ в полном объёме;
              </li>
              <li className="text-gray-700">
                Указать корректный адрес доставки;
              </li>
              <li className="text-gray-700">
                Ознакомиться с предпросмотром Цифровой визитки перед оплатой;
              </li>
              <li className="text-gray-700">
                Не размещать в содержании визитки информацию, противоречащую
                законодательству РФ;
              </li>
              <li className="text-gray-700">
                Принять и оплатить доставку физической NFC-карты.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              7.4. Заказчик вправе:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                Получить услуги надлежащего качества в соответствии с условиями
                настоящей оферты;
              </li>
              <li className="text-gray-700">
                Обращаться к Исполнителю по вопросам, связанным с оказанием
                услуг;
              </li>
              <li className="text-gray-700">
                Требовать замены или возврата денежных средств за некачественный
                товар в соответствии с разделом 8 настоящей оферты и Политикой
                возврата;
              </li>
              <li className="text-gray-700">
                Отказаться от исполнения договора в соответствии со статьёй 32
                ЗОЗПП.
              </li>
            </ul>
          </section>

          {/* 8. Возврат и обмен */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Возврат и обмен
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>8.1.</strong> Условия возврата и обмена регулируются{" "}
              <Link
                href={`/${locale}/legal/refund`}
                className="text-sky-600 hover:text-sky-700 underline"
              >
                Политикой возврата
              </Link>
              , являющейся неотъемлемой частью настоящей оферты.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>8.2.</strong> Цифровая визитка является услугой, оказанной
              в полном объёме в момент предоставления URL-адреса и QR-кода.
              В соответствии со ст. 32 ЗОЗПП при отказе потребителя от
              исполнения договора исполнитель вправе потребовать оплату
              фактически понесённых расходов. Поскольку услуга оказана в полном
              объёме, возврат денежных средств за Цифровую визитку не
              осуществляется.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>8.3.</strong> Физическая NFC-карта, изготовленная по
              индивидуальному заказу Заказчика, не подлежит обмену и возврату
              надлежащего качества на основании п. 4 ст. 26.1 ЗОЗПП (товар
              с индивидуально-определёнными свойствами).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>8.4.</strong> В случае обнаружения дефектов физической
              NFC-карты (заводской брак, неработоспособность NFC-чипа) Заказчик
              вправе требовать замены или возврата денежных средств в порядке,
              предусмотренном ст. 18 ЗОЗПП и Политикой возврата.
            </p>
          </section>

          {/* 9. Ответственность сторон */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Ответственность сторон
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>9.1.</strong> Стороны несут ответственность за
              неисполнение или ненадлежащее исполнение своих обязательств по
              настоящей оферте в соответствии с законодательством Российской
              Федерации.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>9.2.</strong> Исполнитель не несёт ответственности за:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Содержание Цифровой визитки, заполненной Заказчиком
                самостоятельно;
              </li>
              <li className="text-gray-700">
                Ошибки в данных, указанных Заказчиком при оформлении заказа;
              </li>
              <li className="text-gray-700">
                Задержки и сбои в работе служб доставки;
              </li>
              <li className="text-gray-700">
                Невозможность доставки по причине указания Заказчиком
                некорректного адреса;
              </li>
              <li className="text-gray-700">
                Временную недоступность сервиса вследствие технических работ
                или обстоятельств непреодолимой силы;
              </li>
              <li className="text-gray-700">
                Убытки Заказчика, возникшие в результате действий третьих лиц.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>9.3.</strong> Заказчик несёт полную ответственность за
              достоверность и правомерность информации, размещённой на Цифровой
              визитке.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>9.4.</strong> Совокупная ответственность Исполнителя перед
              Заказчиком по настоящей оферте ограничивается суммой, фактически
              уплаченной Заказчиком за заказ.
            </p>
          </section>

          {/* 10. Обстоятельства непреодолимой силы (форс-мажор) */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Обстоятельства непреодолимой силы (форс-мажор)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>10.1.</strong> Стороны освобождаются от ответственности за
              частичное или полное неисполнение обязательств по настоящей оферте,
              если это неисполнение явилось следствием обстоятельств непреодолимой
              силы, возникших после заключения договора, которые сторона не могла
              предвидеть или предотвратить.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>10.2.</strong> К обстоятельствам непреодолимой силы
              относятся: стихийные бедствия, пожары, наводнения, землетрясения,
              эпидемии, пандемии, военные действия, забастовки, принятие
              государственными органами нормативных актов, делающих невозможным
              исполнение обязательств, сбои в работе сетей связи и
              интернет-инфраструктуры, а также иные обстоятельства, которые не
              могли быть предусмотрены сторонами.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>10.3.</strong> При наступлении обстоятельств непреодолимой
              силы срок исполнения обязательств по настоящей оферте
              продлевается на период действия таких обстоятельств.
            </p>
          </section>

          {/* 11. Интеллектуальная собственность */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              11. Интеллектуальная собственность
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>11.1.</strong> Все элементы Сайта, включая дизайн,
              программный код, графические элементы, шаблоны карт, являются
              объектами интеллектуальной собственности Исполнителя и защищены
              законодательством Российской Федерации об авторском праве.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>11.2.</strong> Контент, размещённый Заказчиком на
              Цифровой визитке (тексты, фотографии, логотипы), остаётся
              интеллектуальной собственностью Заказчика или соответствующих
              правообладателей.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>11.3.</strong> Заказчик предоставляет Исполнителю
              неисключительную лицензию на использование размещённого контента
              в целях оказания услуг (отображение на Цифровой визитке, печать
              на NFC-карте).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>11.4.</strong> Заказчик гарантирует, что размещаемый им
              контент не нарушает интеллектуальных прав третьих лиц.
            </p>
          </section>

          {/* 12. Порядок разрешения споров */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              12. Порядок разрешения споров
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>12.1.</strong> Все споры и разногласия, возникающие в связи
              с исполнением настоящей оферты, разрешаются сторонами путём
              переговоров в претензионном порядке.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>12.2.</strong> Претензия направляется в письменной форме
              на электронную почту Исполнителя: info@tapvizit.life. В претензии
              должны быть указаны:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Данные Заказчика (имя, контактная информация);
              </li>
              <li className="text-gray-700">Номер заказа (при наличии);</li>
              <li className="text-gray-700">
                Суть претензии с описанием обстоятельств;
              </li>
              <li className="text-gray-700">
                Требования Заказчика;
              </li>
              <li className="text-gray-700">
                Подтверждающие документы или фотографии (при необходимости).
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>12.3.</strong> Срок рассмотрения претензии составляет 10
              (десять) календарных дней с момента её получения Исполнителем.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>12.4.</strong> В случае невозможности разрешения спора
              в претензионном порядке спор подлежит рассмотрению в суде в
              соответствии с действующим законодательством Российской Федерации,
              в том числе с учётом права потребителя на выбор подсудности
              (ст. 17 ЗОЗПП).
            </p>
          </section>

          {/* 13. Изменение и расторжение договора */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              13. Изменение и расторжение договора
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>13.1.</strong> Исполнитель оставляет за собой право
              вносить изменения в условия настоящей оферты в одностороннем
              порядке. Изменения вступают в силу с момента их публикации на
              Сайте.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>13.2.</strong> Заказчик вправе отказаться от исполнения
              договора в любое время в соответствии со статьёй 32 ЗОЗПП, при
              условии оплаты Исполнителю фактически понесённых расходов,
              связанных с исполнением обязательств по настоящему договору.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>13.3.</strong> Если Заказчик отказывается от договора до
              начала изготовления физической NFC-карты, ему возвращается полная
              стоимость заказа за вычетом стоимости уже оказанной цифровой
              услуги и фактически понесённых расходов.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>13.4.</strong> Если Заказчик отказывается от договора
              после начала изготовления или отправки физической NFC-карты,
              возврат стоимости физической карты не осуществляется, так как
              карта изготовлена по индивидуальному заказу.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>13.5.</strong> Исполнитель вправе расторгнуть договор в
              одностороннем порядке в случае нарушения Заказчиком условий
              настоящей оферты или законодательства РФ, с возвратом Заказчику
              уплаченных денежных средств за вычетом фактически понесённых
              расходов.
            </p>
          </section>

          {/* 14. Заключительные положения */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              14. Заключительные положения
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>14.1.</strong> Настоящая оферта вступает в силу с момента
              её размещения на Сайте и действует до момента её отзыва
              Исполнителем.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>14.2.</strong> Недействительность отдельных положений
              настоящей оферты не влечёт за собой недействительности оферты в
              целом.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>14.3.</strong> Во всём, что не урегулировано настоящей
              офертой, стороны руководствуются действующим законодательством
              Российской Федерации.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>14.4.</strong> Принимая условия настоящей оферты, Заказчик
              подтверждает, что ознакомлен с{" "}
              <Link
                href={`/${locale}/legal/privacy`}
                className="text-sky-600 hover:text-sky-700 underline"
              >
                Политикой конфиденциальности
              </Link>{" "}
              и{" "}
              <Link
                href={`/${locale}/legal/refund`}
                className="text-sky-600 hover:text-sky-700 underline"
              >
                Политикой возврата
              </Link>
              , которые являются неотъемлемыми частями настоящей оферты.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>14.5.</strong> Все уведомления и сообщения в рамках
              настоящей оферты могут направляться сторонами друг другу по
              электронной почте.
            </p>
          </section>

          {/* Контактная информация */}
          <section className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Контактная информация Исполнителя
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Сервис:</strong> tapvizit.life
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Сайт:</strong>{" "}
              <a
                href="https://tapvizit.life"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                tapvizit.life
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Электронная почта:</strong>{" "}
              <a
                href="mailto:info@tapvizit.life"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                info@tapvizit.life
              </a>
            </p>
          </section>

          {/* Footer links */}
          <section className="flex flex-wrap gap-4 text-sm text-gray-500 pt-6 border-t border-gray-200">
            <Link
              href={`/${locale}/legal/refund`}
              className="hover:text-gray-900 transition-colors"
            >
              Политика возврата
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={`/${locale}/legal/privacy`}
              className="hover:text-gray-900 transition-colors"
            >
              Политика конфиденциальности
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}
