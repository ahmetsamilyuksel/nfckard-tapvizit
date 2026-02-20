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
    title: "Политика возврата | tapvizit.life",
    description:
      "Политика возврата и обмена товаров и услуг — цифровые визитки и NFC-карты — tapvizit.life",
  };
}

export default async function RefundPage({
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
            Политика возврата
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
              Настоящая Политика возврата (далее — «Политика») является
              неотъемлемой частью{" "}
              <Link
                href={`/${locale}/legal/offer`}
                className="text-sky-600 hover:text-sky-700 underline"
              >
                Публичной оферты
              </Link>{" "}
              интернет-сервиса tapvizit.life (далее — «Исполнитель») и
              определяет условия и порядок возврата денежных средств и обмена
              товаров.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Политика разработана в соответствии с Законом Российской Федерации
              от 07.02.1992 № 2300-1 «О защите прав потребителей» (далее —
              ЗОЗПП), в том числе статьями 18, 22, 25, 26.1, 32 ЗОЗПП, а также
              иными нормативно-правовыми актами Российской Федерации.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Услуги Исполнителя включают два компонента: цифровую услугу
              (создание персональной Цифровой визитной карточки) и изготовление
              физического товара (NFC-карта с индивидуальным дизайном). Условия
              возврата различаются для каждого из этих компонентов.
            </p>
          </section>

          {/* 1. Возврат за цифровую услугу */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Цифровая визитная карточка (цифровая услуга)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>1.1.</strong> Цифровая визитная карточка представляет собой
              услугу, которая оказывается в полном объёме незамедлительно после
              оплаты заказа. В момент оплаты Заказчик получает уникальный
              URL-адрес и QR-код для доступа к своей Цифровой визитке.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>1.2.</strong> Перед оплатой Заказчику предоставляется
              полный предпросмотр Цифровой визитки, позволяющий оценить
              содержание и внешний вид карточки. Совершая оплату, Заказчик
              подтверждает, что ознакомился с предпросмотром и согласен с
              результатом.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>1.3.</strong> В соответствии со статьёй 32 ЗОЗПП потребитель
              вправе отказаться от исполнения договора о выполнении работ
              (оказании услуг) в любое время при условии оплаты исполнителю
              фактически понесённых расходов, связанных с исполнением
              обязательств по данному договору.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>1.4.</strong> Поскольку цифровая услуга оказывается в
              полном объёме незамедлительно после оплаты (Заказчик получает
              работоспособную Цифровую визитку с URL-адресом и QR-кодом),
              фактически понесённые расходы Исполнителя равны полной стоимости
              услуги. Таким образом, <strong>возврат денежных средств за
              цифровую услугу не осуществляется</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>1.5.</strong> Если цифровая услуга оказана ненадлежащим
              образом (например, Цифровая визитка недоступна по предоставленному
              URL-адресу по вине Исполнителя), Заказчик вправе потребовать
              безвозмездного устранения недостатков или возврата уплаченных
              денежных средств.
            </p>
          </section>

          {/* 2. Физическая NFC-карта надлежащего качества */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Физическая NFC-карта надлежащего качества
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.1.</strong> Физическая NFC-карта изготавливается по
              индивидуальному заказу Заказчика и обладает
              индивидуально-определёнными свойствами: персонализированный дизайн,
              содержание контактных данных Заказчика, запрограммированный NFC-чип
              со ссылкой на Цифровую визитку конкретного Заказчика.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.2.</strong> В соответствии с пунктом 4 статьи 26.1 ЗОЗПП
              потребитель не вправе отказаться от товара надлежащего качества,
              имеющего индивидуально-определённые свойства, если указанный товар
              может быть использован исключительно приобретающим его потребителем.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>2.3.</strong> Поскольку каждая NFC-карта изготавливается
              персонально для конкретного Заказчика с его уникальным дизайном и
              данными, <strong>возврат и обмен NFC-карты надлежащего качества
              не осуществляется</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>2.4.</strong> Данное ограничение распространяется на все
              типы карт: Стандарт (ПВХ), Премиум (матовая ламинация) и Металл.
            </p>
          </section>

          {/* 3. Физическая NFC-карта ненадлежащего качества (дефектная) */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Физическая NFC-карта ненадлежащего качества (дефектная)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.1.</strong> В соответствии со статьёй 18 ЗОЗПП, если в
              физической NFC-карте обнаружены недостатки (дефекты), Заказчик
              имеет право по своему выбору потребовать:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Безвозмездного устранения недостатков;
              </li>
              <li className="text-gray-700">
                Замены на аналогичный товар надлежащего качества;
              </li>
              <li className="text-gray-700">
                Возврата уплаченных денежных средств за физическую NFC-карту.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.2.</strong> К дефектам физической NFC-карты относятся:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Неработоспособность NFC-чипа (карта не считывается устройством);
              </li>
              <li className="text-gray-700">
                Заводской брак печати (смазанное изображение, неправильные цвета,
                несоответствие утверждённому дизайну);
              </li>
              <li className="text-gray-700">
                Механические повреждения, полученные до момента передачи
                Заказчику (трещины, сколы, деформация);
              </li>
              <li className="text-gray-700">
                Несоответствие содержания NFC-чипа (ссылка ведёт на чужую
                визитку или несуществующую страницу по вине Исполнителя).
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.3.</strong> Заказчик вправе предъявить требование о
              замене или возврате в течение 7 (семи) календарных дней с момента
              получения физической NFC-карты.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>3.4.</strong> В соответствии со статьёй 22 ЗОЗПП возврат
              денежных средств за дефектную NFC-карту осуществляется в течение 10
              (десяти) календарных дней с момента предъявления соответствующего
              требования.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>3.5.</strong> При замене дефектной NFC-карты Исполнитель
              изготавливает и отправляет новую карту за свой счёт в кратчайшие
              сроки (ориентировочно 3–7 рабочих дней с момента одобрения заявки).
            </p>
          </section>

          {/* 4. Отказ от заказа до отправки */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Отказ от заказа до отправки физической NFC-карты
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.1.</strong> Если Заказчик желает отказаться от заказа до
              момента передачи физической NFC-карты в службу доставки, он вправе
              обратиться к Исполнителю с соответствующим запросом.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.2.</strong> В случае отказа от заказа до начала
              изготовления физической NFC-карты Заказчику возвращается полная
              стоимость заказа за вычетом стоимости уже оказанной цифровой услуги
              (поскольку Цифровая визитка создаётся незамедлительно и услуга
              считается оказанной).
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>4.3.</strong> В случае отказа от заказа после начала
              изготовления, но до передачи в службу доставки, Заказчику
              возвращается стоимость заказа за вычетом стоимости цифровой услуги
              и фактически понесённых расходов на изготовление (материалы,
              печать, программирование чипа).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>4.4.</strong> После передачи физической NFC-карты в службу
              доставки отказ от заказа и возврат за физическую карту не
              принимается, так как карта изготовлена по индивидуальному заказу
              (п. 4 ст. 26.1 ЗОЗПП).
            </p>
          </section>

          {/* 5. Расходы на обратную доставку */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Расходы на доставку при возврате
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.1.</strong> В случае возврата или замены дефектной
              NFC-карты (ненадлежащего качества) расходы на обратную доставку
              несёт Исполнитель.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>5.2.</strong> Исполнитель предоставляет Заказчику
              инструкции по отправке дефектной карты или организует забор карты
              через службу доставки.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>5.3.</strong> В отдельных случаях Исполнитель может принять
              решение о замене карты без необходимости возврата дефектного
              экземпляра (по результатам рассмотрения предоставленных
              фотографий/видео дефекта).
            </p>
          </section>

          {/* 6. Порядок подачи заявки на возврат */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Порядок подачи заявки на возврат или замену
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.1.</strong> Для подачи заявки на возврат денежных средств
              или замену дефектной NFC-карты Заказчик направляет обращение на
              электронную почту Исполнителя:{" "}
              <a
                href="mailto:info@tapvizit.life"
                className="text-sky-600 hover:text-sky-700 underline"
              >
                info@tapvizit.life
              </a>
              .
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.2.</strong> В обращении необходимо указать:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-gray-700">
                Имя и контактные данные Заказчика (телефон, электронная почта);
              </li>
              <li className="text-gray-700">
                Номер заказа или URL-адрес Цифровой визитки;
              </li>
              <li className="text-gray-700">
                Описание обнаруженного дефекта;
              </li>
              <li className="text-gray-700">
                Фотографии или видео, подтверждающие наличие дефекта;
              </li>
              <li className="text-gray-700">
                Предпочтительный способ урегулирования (замена или возврат
                денежных средств).
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>6.3.</strong> Исполнитель рассматривает заявку в течение 5
              (пяти) рабочих дней с момента её получения и сообщает Заказчику
              о принятом решении.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>6.4.</strong> Исполнитель вправе запросить у Заказчика
              дополнительные материалы для рассмотрения заявки (дополнительные
              фотографии, видео проверки NFC-чипа и пр.).
            </p>
          </section>

          {/* 7. Способ и сроки возврата денежных средств */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Способ и сроки возврата денежных средств
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>7.1.</strong> Возврат денежных средств осуществляется тем
              же способом, которым была произведена оплата заказа (на банковскую
              карту, электронный кошелёк и т.д.), если иное не согласовано
              сторонами.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>7.2.</strong> Срок возврата денежных средств составляет не
              более 10 (десяти) календарных дней с момента принятия Исполнителем
              решения о возврате, в соответствии со статьёй 22 ЗОЗПП.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>7.3.</strong> Фактический срок зачисления денежных средств
              на счёт Заказчика зависит от банка-эмитента карты или платёжной
              системы и может составлять до 30 (тридцати) календарных дней. Данный
              срок не зависит от Исполнителя.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>7.4.</strong> При возврате частичной стоимости заказа
              Исполнитель предоставляет Заказчику детальный расчёт удержанных
              сумм (стоимость цифровой услуги, фактически понесённые расходы).
            </p>
          </section>

          {/* 8. Случаи, когда возврат не осуществляется */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Случаи, в которых возврат не осуществляется
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Возврат денежных средств не осуществляется в следующих случаях:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                Заказчик передумал после получения NFC-карты надлежащего качества
                (товар с индивидуально-определёнными свойствами, п. 4 ст. 26.1
                ЗОЗПП);
              </li>
              <li className="text-gray-700">
                Повреждение NFC-карты произошло по вине Заказчика (механические
                повреждения, воздействие воды, огня, химических веществ);
              </li>
              <li className="text-gray-700">
                Заказчик указал некорректные данные при оформлении заказа
                (ошибки в дизайне, контактных данных), которые были отражены в
                предпросмотре до оплаты;
              </li>
              <li className="text-gray-700">
                NFC-карта не считывается из-за несовместимости или неисправности
                устройства Заказчика (при подтверждённой работоспособности
                NFC-чипа);
              </li>
              <li className="text-gray-700">
                Цифровая визитка создана и доступна по URL-адресу (цифровая
                услуга оказана в полном объёме);
              </li>
              <li className="text-gray-700">
                Заказчик не обратился с заявкой в установленный срок (7
                календарных дней с момента получения).
              </li>
            </ul>
          </section>

          {/* Сводная таблица */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Сводная таблица условий возврата
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">
                      Ситуация
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">
                      Возврат
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">
                      Основание
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">
                      Цифровая визитка (услуга оказана)
                    </td>
                    <td className="px-4 py-3 text-red-600 font-medium">
                      Не возвращается
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      Ст. 32 ЗОЗПП — услуга оказана в полном объёме
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">
                      NFC-карта надлежащего качества
                    </td>
                    <td className="px-4 py-3 text-red-600 font-medium">
                      Не возвращается
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      П. 4 ст. 26.1 ЗОЗПП — индивидуально-определённые свойства
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">
                      NFC-карта с дефектом
                    </td>
                    <td className="px-4 py-3 text-green-600 font-medium">
                      Полный возврат или замена
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      Ст. 18, 22 ЗОЗПП — в течение 7 дней, возврат за 10 дней
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">
                      Отказ до изготовления карты
                    </td>
                    <td className="px-4 py-3 text-yellow-600 font-medium">
                      Частичный (за вычетом цифровой услуги)
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      Ст. 32 ЗОЗПП — за вычетом фактических расходов
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">
                      Отказ после отправки карты
                    </td>
                    <td className="px-4 py-3 text-red-600 font-medium">
                      Не возвращается
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      П. 4 ст. 26.1 ЗОЗПП — индивидуальный заказ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Контактная информация */}
          <section className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Контактная информация для обращений
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              По всем вопросам, связанным с возвратом и обменом, обращайтесь:
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
