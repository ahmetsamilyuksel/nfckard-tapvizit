import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const t = getTranslations(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t.termsTitle}</h1>
        <p className="text-sm text-gray-500 mb-8">{t.termsLastUpdate}: 21.02.2026</p>

        {locale === "ru" ? (
          <div className="prose prose-gray max-w-none">
            <h2>1. Общие положения</h2>
            <p>1.1. Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между владельцем сайта vizit.life (далее — Продавец) и пользователем сайта (далее — Покупатель).</p>
            <p>1.2. Продавец предоставляет Покупателю услуги по созданию цифровых визитных карточек с технологией NFC и их доставке.</p>
            <p>1.3. Используя сайт и оформляя заказ, Покупатель соглашается с условиями настоящего Соглашения.</p>
            <p>1.4. Продавец оставляет за собой право в любое время изменять условия настоящего Соглашения.</p>

            <h2>2. Описание услуг</h2>
            <p>2.1. Продавец предоставляет следующие услуги:</p>
            <ul>
              <li>Создание персонализированной цифровой визитной карточки на платформе vizit.life</li>
              <li>Генерация уникального QR-кода и ссылки на цифровую визитку</li>
              <li>Запись ссылки на NFC-чип, встроенный в физическую карту</li>
              <li>Производство и доставка физической NFC-карты (PVC / Премиум / Металл)</li>
              <li>Хостинг и поддержка цифровой визитки на срок не менее 1 года</li>
            </ul>
            <p>2.2. Покупатель самостоятельно заполняет контактную информацию для визитки через онлайн-форму на сайте.</p>
            <p>2.3. Продавец не несёт ответственности за достоверность информации, указанной Покупателем.</p>

            <h2>3. Оформление и оплата заказа</h2>
            <p>3.1. Заказ считается оформленным после заполнения формы на сайте и подтверждения оплаты.</p>
            <p>3.2. Цены на товары указаны на сайте в российских рублях и включают все налоги.</p>
            <p>3.3. Оплата производится через платёжную систему ЮMoney (YooMoney) или иным способом, указанным на сайте.</p>
            <p>3.4. Продавец приступает к производству карты после получения оплаты.</p>
            <p>3.5. Стоимость услуг:</p>
            <ul>
              <li>Стандарт (PVC карта) — 500₽</li>
              <li>Премиум (матовая ламинация) — 850₽</li>
              <li>Металл (металлическая карта) — 1700₽</li>
            </ul>

            <h2>4. Доставка</h2>
            <p>4.1. Доставка осуществляется через службы доставки: CDEK, Почта России, Яндекс Доставка, а также через маркетплейсы Wildberries, Ozon, Яндекс Маркет, Avito.</p>
            <p>4.2. Сроки доставки составляют от 3 до 14 рабочих дней в зависимости от региона доставки.</p>
            <p>4.3. Стоимость доставки рассчитывается отдельно и зависит от выбранного способа доставки и региона.</p>
            <p>4.4. Риск случайной гибели или повреждения товара переходит к Покупателю с момента передачи товара службе доставки.</p>

            <h2>5. Возврат и обмен товара</h2>
            <p>5.1. В соответствии с Законом РФ «О защите прав потребителей» (от 07.02.1992 №2300-1):</p>
            <p><strong>5.2. Возврат товара надлежащего качества:</strong></p>
            <ul>
              <li>NFC-карты являются товаром, изготовленным по индивидуальному заказу с персональными данными Покупателя</li>
              <li>Согласно статье 26.1 Закона о защите прав потребителей и Постановлению Правительства РФ от 31.12.2020 №2463, товары, изготовленные по индивидуальному заказу, не подлежат возврату при условии их надлежащего качества</li>
              <li>Исключение: если товар не был использован, сохранён товарный вид, потребительские свойства и документы — возврат возможен в течение 7 дней с момента получения</li>
            </ul>
            <p><strong>5.3. Возврат товара ненадлежащего качества:</strong></p>
            <ul>
              <li>Если NFC-карта имеет производственный брак (не считывается NFC-чип, повреждена поверхность карты, неправильная печать), Покупатель имеет право на:</li>
              <li>Бесплатную замену карты на аналогичную — в течение 14 дней с момента получения</li>
              <li>Полный возврат стоимости товара — в течение 14 дней с момента получения</li>
              <li>Уменьшение покупной цены — по договорённости сторон</li>
            </ul>
            <p><strong>5.4. Порядок возврата:</strong></p>
            <ul>
              <li>Для оформления возврата необходимо связаться с Продавцом по электронной почте info@vizit.life</li>
              <li>Покупатель должен предоставить фото/видео подтверждение дефекта</li>
              <li>Возврат денежных средств осуществляется тем же способом, которым была произведена оплата, в течение 10 рабочих дней</li>
              <li>Стоимость обратной доставки при возврате товара ненадлежащего качества оплачивается Продавцом</li>
            </ul>

            <h2>6. Гарантийные обязательства</h2>
            <p>6.1. Гарантийный срок на физическую NFC-карту составляет 12 месяцев с момента получения.</p>
            <p>6.2. Гарантия распространяется на:</p>
            <ul>
              <li>Работоспособность NFC-чипа</li>
              <li>Целостность печати и ламинации</li>
              <li>Доступность цифровой визитки по ссылке</li>
            </ul>
            <p>6.3. Гарантия не распространяется на:</p>
            <ul>
              <li>Механические повреждения, вызванные неправильным использованием</li>
              <li>Повреждения, вызванные воздействием воды, огня, химических веществ</li>
              <li>Естественный износ материалов</li>
            </ul>

            <h2>7. Цифровая визитка</h2>
            <p>7.1. Цифровая визитка размещается на платформе vizit.life и доступна по уникальной ссылке.</p>
            <p>7.2. Продавец гарантирует доступность цифровой визитки в течение не менее 1 года с момента создания.</p>
            <p>7.3. Покупатель может редактировать информацию на цифровой визитке в любое время.</p>
            <p>7.4. Продавец оставляет за собой право удалить визитку, содержащую незаконный контент.</p>

            <h2>8. Ответственность сторон</h2>
            <p>8.1. Продавец не несёт ответственности за:</p>
            <ul>
              <li>Перебои в работе сайта, вызванные техническими причинами</li>
              <li>Действия третьих лиц</li>
              <li>Несовместимость NFC с устройством Покупателя (для таких случаев предусмотрен QR-код)</li>
            </ul>
            <p>8.2. Покупатель несёт ответственность за достоверность предоставленных данных и контактной информации.</p>

            <h2>9. Разрешение споров</h2>
            <p>9.1. Все споры и разногласия разрешаются путём переговоров.</p>
            <p>9.2. При невозможности достижения согласия путём переговоров, спор подлежит разрешению в соответствии с действующим законодательством Российской Федерации.</p>

            <h2>10. Контактная информация</h2>
            <p>Электронная почта: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>
            <p>Сайт: <a href="https://vizit.life" className="text-sky-600">vizit.life</a></p>
          </div>
        ) : locale === "en" ? (
          <div className="prose prose-gray max-w-none">
            <h2>1. General Provisions</h2>
            <p>1.1. This User Agreement (hereinafter — Agreement) governs the relationship between the owner of vizit.life (hereinafter — Seller) and the website user (hereinafter — Buyer).</p>
            <p>1.2. The Seller provides services for creating digital business cards with NFC technology and their delivery.</p>
            <p>1.3. By using the website and placing an order, the Buyer agrees to the terms of this Agreement.</p>

            <h2>2. Description of Services</h2>
            <p>2.1. The Seller provides the following services:</p>
            <ul>
              <li>Creating a personalized digital business card on the vizit.life platform</li>
              <li>Generating a unique QR code and link to the digital card</li>
              <li>Writing the link to an NFC chip embedded in a physical card</li>
              <li>Manufacturing and delivery of a physical NFC card (PVC / Premium / Metal)</li>
              <li>Hosting and maintaining the digital card for at least 1 year</li>
            </ul>

            <h2>3. Order and Payment</h2>
            <p>3.1. An order is considered placed after completing the form on the website and confirming payment.</p>
            <p>3.2. Payment is processed through YooMoney payment system or other methods specified on the website.</p>
            <p>3.3. Pricing:</p>
            <ul>
              <li>Standard (PVC card) — €5</li>
              <li>Premium (matte lamination) — €9</li>
              <li>Metal (metal card) — €18</li>
            </ul>

            <h2>4. Delivery</h2>
            <p>4.1. Delivery is carried out through CDEK, Russian Post, Yandex Delivery, and through marketplaces Wildberries, Ozon, Yandex Market, Avito.</p>
            <p>4.2. Delivery time is 3-14 business days depending on the delivery region.</p>

            <h2>5. Returns and Exchanges</h2>
            <p>5.1. In accordance with Russian Consumer Protection Law:</p>
            <p><strong>5.2. Return of quality goods:</strong> NFC cards are custom-made products. Returns are possible within 7 days if the product is unused and in original condition.</p>
            <p><strong>5.3. Return of defective goods:</strong> If the NFC card has manufacturing defects (NFC chip doesn&apos;t work, surface damage, incorrect printing), the Buyer is entitled to free replacement or full refund within 14 days.</p>
            <p><strong>5.4. Return procedure:</strong> Contact info@vizit.life with photo/video evidence. Refund is processed within 10 business days.</p>

            <h2>6. Warranty</h2>
            <p>6.1. Warranty period for the physical NFC card is 12 months from receipt.</p>
            <p>6.2. Warranty covers NFC chip functionality, print integrity, and digital card availability.</p>

            <h2>7. Contact Information</h2>
            <p>Email: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>
            <p>Website: <a href="https://vizit.life" className="text-sky-600">vizit.life</a></p>
          </div>
        ) : (
          <div className="prose prose-gray max-w-none">
            <h2>1. Genel Hükümler</h2>
            <p>1.1. Bu Kullanıcı Sözleşmesi (bundan sonra — Sözleşme) vizit.life web sitesinin sahibi (bundan sonra — Satıcı) ile site kullanıcısı (bundan sonra — Alıcı) arasındaki ilişkileri düzenler.</p>
            <p>1.2. Satıcı, NFC teknolojisi ile dijital kartvizit oluşturma ve teslimat hizmetleri sunar.</p>
            <p>1.3. Siteyi kullanarak ve sipariş vererek, Alıcı bu Sözleşme koşullarını kabul eder.</p>

            <h2>2. Hizmet Tanımı</h2>
            <p>2.1. Satıcı aşağıdaki hizmetleri sunar:</p>
            <ul>
              <li>vizit.life platformunda kişiselleştirilmiş dijital kartvizit oluşturma</li>
              <li>Benzersiz QR kod ve dijital kartvizit bağlantısı oluşturma</li>
              <li>Bağlantının fiziksel karta gömülü NFC çipine yazılması</li>
              <li>Fiziksel NFC kartın (PVC / Premium / Metal) üretimi ve teslimatı</li>
              <li>Dijital kartviziti en az 1 yıl boyunca barındırma ve destekleme</li>
            </ul>

            <h2>3. Sipariş ve Ödeme</h2>
            <p>3.1. Sipariş, sitedeki formun doldurulması ve ödemenin onaylanmasından sonra verilmiş sayılır.</p>
            <p>3.2. Ödeme YooMoney ödeme sistemi veya sitede belirtilen diğer yöntemlerle yapılır.</p>
            <p>3.3. Fiyatlandırma:</p>
            <ul>
              <li>Standart (PVC kart) — 150₺</li>
              <li>Premium (mat laminasyon) — 250₺</li>
              <li>Metal (metal kart) — 500₺</li>
            </ul>

            <h2>4. Teslimat</h2>
            <p>4.1. Teslimat CDEK, Yandex Teslimat ve Wildberries, Ozon, Yandex Market, Avito gibi pazaryerleri aracılığıyla yapılır.</p>
            <p>4.2. Teslimat süresi bölgeye göre 3-14 iş günüdür.</p>

            <h2>5. İade ve Değişim</h2>
            <p>5.1. Rusya Federasyonu Tüketici Hakları Koruma Kanunu uyarınca:</p>
            <p><strong>5.2. Kaliteli ürünlerin iadesi:</strong> NFC kartlar bireysel sipariş üzerine üretilir. Kullanılmamış ve orijinal durumda olan ürünler 7 gün içinde iade edilebilir.</p>
            <p><strong>5.3. Kusurlu ürünlerin iadesi:</strong> NFC kartında üretim hatası varsa (NFC çip çalışmıyor, yüzey hasarı, yanlış baskı), Alıcı 14 gün içinde ücretsiz değişim veya tam iade hakkına sahiptir.</p>
            <p><strong>5.4. İade prosedürü:</strong> Fotoğraf/video kanıtı ile info@vizit.life adresine başvurun. İade 10 iş günü içinde işlenir.</p>

            <h2>6. Garanti</h2>
            <p>6.1. Fiziksel NFC kart için garanti süresi teslim tarihinden itibaren 12 aydır.</p>
            <p>6.2. Garanti NFC çip işlevselliğini, baskı bütünlüğünü ve dijital kartvizit erişilebilirliğini kapsar.</p>

            <h2>7. İletişim Bilgileri</h2>
            <p>E-posta: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>
            <p>Web sitesi: <a href="https://vizit.life" className="text-sky-600">vizit.life</a></p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <Link href={`/${locale}`} className="text-sky-600 hover:text-sky-700 font-medium">
            &larr; {t.navHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
