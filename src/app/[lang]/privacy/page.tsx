import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";

export default async function PrivacyPage({
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
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t.privacyTitle}</h1>
        <p className="text-sm text-gray-500 mb-8">{t.privacyLastUpdate}: 21.02.2026</p>

        {locale === "ru" ? (
          <div className="prose prose-gray max-w-none">
            <h2>1. Общие положения</h2>
            <p>1.1. Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки и защиты персональных данных пользователей сайта vizit.life (далее — Сайт).</p>
            <p>1.2. Политика разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».</p>
            <p>1.3. Используя Сайт, пользователь даёт согласие на обработку своих персональных данных в соответствии с настоящей Политикой.</p>

            <h2>2. Собираемые данные</h2>
            <p>2.1. Мы собираем следующие персональные данные:</p>
            <ul>
              <li><strong>Контактные данные:</strong> имя, фамилия, электронная почта, номер телефона</li>
              <li><strong>Данные для визитки:</strong> должность, компания, адрес, ссылки на социальные сети, фотография</li>
              <li><strong>Данные для доставки:</strong> адрес доставки, контактный телефон</li>
              <li><strong>Платёжные данные:</strong> обрабатываются исключительно платёжной системой ЮMoney (YooMoney), мы не храним данные банковских карт</li>
              <li><strong>Технические данные:</strong> IP-адрес, тип браузера, данные cookies</li>
            </ul>

            <h2>3. Цели обработки данных</h2>
            <p>3.1. Персональные данные обрабатываются для:</p>
            <ul>
              <li>Создания и отображения цифровой визитной карточки</li>
              <li>Выполнения заказов и доставки NFC-карт</li>
              <li>Связи с пользователем по вопросам заказа</li>
              <li>Улучшения качества обслуживания и функционала Сайта</li>
              <li>Выполнения обязательств, предусмотренных законодательством РФ</li>
            </ul>

            <h2>4. Защита данных</h2>
            <p>4.1. Мы принимаем все необходимые организационные и технические меры для защиты персональных данных:</p>
            <ul>
              <li>Шифрование данных при передаче (SSL/TLS)</li>
              <li>Хранение данных на защищённых серверах</li>
              <li>Ограничение доступа к персональным данным</li>
              <li>Регулярное обновление систем безопасности</li>
            </ul>

            <h2>5. Передача данных третьим лицам</h2>
            <p>5.1. Мы не продаём и не передаём персональные данные третьим лицам, за исключением случаев:</p>
            <ul>
              <li>Передачи данных службам доставки (CDEK, Почта России) для выполнения заказа</li>
              <li>Передачи данных платёжной системе ЮMoney для обработки оплаты</li>
              <li>Передачи данных маркетплейсам (Wildberries, Ozon, Яндекс Маркет) при заказе через эти площадки</li>
              <li>Требования действующего законодательства РФ</li>
            </ul>

            <h2>6. Публичная информация на визитке</h2>
            <p>6.1. Информация, размещённая на цифровой визитке (имя, контакты, социальные сети), является публично доступной по ссылке визитки.</p>
            <p>6.2. Пользователь самостоятельно определяет, какую информацию размещать на визитке.</p>
            <p>6.3. Пользователь может в любой момент удалить или изменить информацию на визитке.</p>

            <h2>7. Cookies</h2>
            <p>7.1. Сайт использует файлы cookies для:</p>
            <ul>
              <li>Обеспечения корректной работы Сайта</li>
              <li>Сохранения языковых настроек</li>
              <li>Авторизации в административной панели</li>
            </ul>
            <p>7.2. Пользователь может отключить cookies в настройках браузера.</p>

            <h2>8. Права пользователя</h2>
            <p>8.1. Пользователь имеет право:</p>
            <ul>
              <li>Запросить информацию о хранящихся персональных данных</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Потребовать удаления персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
            <p>8.2. Для реализации своих прав пользователь может обратиться по электронной почте: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>

            <h2>9. Срок хранения данных</h2>
            <p>9.1. Персональные данные хранятся в течение срока действия цифровой визитки и в течение 3 лет после её удаления.</p>
            <p>9.2. Данные о заказах хранятся в соответствии с требованиями бухгалтерского и налогового учёта.</p>

            <h2>10. Контактная информация</h2>
            <p>По вопросам обработки персональных данных:</p>
            <p>Электронная почта: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>
            <p>Сайт: <a href="https://vizit.life" className="text-sky-600">vizit.life</a></p>
          </div>
        ) : locale === "en" ? (
          <div className="prose prose-gray max-w-none">
            <h2>1. General Provisions</h2>
            <p>1.1. This Privacy Policy defines how vizit.life collects, uses, and protects personal data of users.</p>
            <p>1.2. By using the website, you consent to data processing as described in this Policy.</p>

            <h2>2. Data We Collect</h2>
            <ul>
              <li><strong>Contact data:</strong> name, email, phone number</li>
              <li><strong>Card data:</strong> title, company, address, social media links, photo</li>
              <li><strong>Delivery data:</strong> shipping address, contact phone</li>
              <li><strong>Payment data:</strong> processed exclusively by YooMoney; we do not store card details</li>
              <li><strong>Technical data:</strong> IP address, browser type, cookies</li>
            </ul>

            <h2>3. How We Use Data</h2>
            <ul>
              <li>Creating and displaying digital business cards</li>
              <li>Processing and delivering NFC card orders</li>
              <li>Communicating about orders</li>
              <li>Improving our services</li>
            </ul>

            <h2>4. Data Protection</h2>
            <p>We implement SSL/TLS encryption, secure server storage, access restrictions, and regular security updates.</p>

            <h2>5. Third-Party Sharing</h2>
            <p>We do not sell personal data. Data is shared only with delivery services (CDEK), payment processor (YooMoney), and marketplaces when orders are placed through them.</p>

            <h2>6. Your Rights</h2>
            <p>You can request access to, correction of, or deletion of your personal data by contacting <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a>.</p>

            <h2>7. Contact</h2>
            <p>Email: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>
          </div>
        ) : (
          <div className="prose prose-gray max-w-none">
            <h2>1. Genel Hükümler</h2>
            <p>1.1. Bu Gizlilik Politikası, vizit.life kullanıcılarının kişisel verilerinin nasıl toplandığını, kullanıldığını ve korunduğunu tanımlar.</p>
            <p>1.2. Siteyi kullanarak bu Politikada açıklanan veri işlemeye onay vermiş olursunuz.</p>

            <h2>2. Topladığımız Veriler</h2>
            <ul>
              <li><strong>İletişim verileri:</strong> ad, soyad, e-posta, telefon numarası</li>
              <li><strong>Kart verileri:</strong> unvan, şirket, adres, sosyal medya bağlantıları, fotoğraf</li>
              <li><strong>Teslimat verileri:</strong> teslimat adresi, iletişim telefonu</li>
              <li><strong>Ödeme verileri:</strong> yalnızca YooMoney tarafından işlenir; kart bilgilerini saklamayız</li>
              <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı türü, çerezler</li>
            </ul>

            <h2>3. Verilerin Kullanımı</h2>
            <ul>
              <li>Dijital kartvizitlerin oluşturulması ve görüntülenmesi</li>
              <li>NFC kart siparişlerinin işlenmesi ve teslimatı</li>
              <li>Siparişlerle ilgili iletişim</li>
              <li>Hizmetlerimizin iyileştirilmesi</li>
            </ul>

            <h2>4. Veri Koruma</h2>
            <p>SSL/TLS şifreleme, güvenli sunucu depolama, erişim kısıtlamaları ve düzenli güvenlik güncellemeleri uyguluyoruz.</p>

            <h2>5. Üçüncü Taraflarla Paylaşım</h2>
            <p>Kişisel verilerinizi satmıyoruz. Veriler yalnızca teslimat hizmetleri (CDEK), ödeme işlemcisi (YooMoney) ve sipariş verilen pazaryerleri ile paylaşılır.</p>

            <h2>6. Haklarınız</h2>
            <p>Kişisel verilerinize erişim, düzeltme veya silme talebinde bulunmak için <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a> adresine başvurabilirsiniz.</p>

            <h2>7. İletişim</h2>
            <p>E-posta: <a href="mailto:info@vizit.life" className="text-sky-600">info@vizit.life</a></p>
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
