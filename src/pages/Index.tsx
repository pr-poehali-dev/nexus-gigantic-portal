import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const LEAD_URL = 'https://functions.poehali.dev/899924fb-543f-4fc5-95ce-0bb69ed7bb1f';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const TELEGRAM_RE = /^@?[a-zA-Z0-9_]{5,32}$/;

const NAV = ['Платформа', 'Инфраструктура', 'Вертикали', 'Комплаенс'];

const HERO_METRICS = [
  { value: '0%', label: 'Fraud' },
  { value: 'Fix', label: 'CPA' },
  { value: '100%', label: 'Human' },
  { value: 'High', label: 'LTV' },
];

const TICKER = ['DATA MINING', 'DIRECT SCOUTING', 'HUMAN VALIDATION', 'ZERO FRAUD', 'HIGH LTV'];

const PROBLEMS = [
  {
    icon: 'TrendingUp',
    title: 'Рост CAC',
    text: 'Слепые алгоритмы скликивают миллионные бюджеты, максимизируя показы, но не гарантируя транзакционную активность лида.',
  },
  {
    icon: 'Bug',
    title: 'Токсичный трафик',
    text: 'До 40% лидов из открытых партнерских сетей не активируют продукт после получения пластика.',
  },
  {
    icon: 'ArrowDownWideNarrow',
    title: 'Пессимизация',
    text: 'Жесткие антифрод-системы агрегаторов пессимизируют карточки продуктов из-за накруток.',
  },
  {
    icon: 'EyeOff',
    title: 'Слепота аудитории',
    text: 'Таргетинг больше не пробивает рекламный шум — конверсия падает ежеквартально.',
  },
];

const ARCHITECTURE = [
  {
    step: '01',
    title: 'Predictive Mining',
    text: 'Алгоритмы парсинга отсекают нецелевые сегменты до показа оффера.',
  },
  {
    step: '02',
    title: 'Direct Scout Network',
    text: 'Маршрутизация лидов через закрытую сеть менеджеров. Абсолютный отказ от спама.',
  },
  {
    step: '03',
    title: 'Human QA',
    text: 'Ручная проверка каждого целевого действия перед передачей в биллинг банка.',
  },
];

const VERTICALS = [
  'Дебетовые карты',
  'Кредитные карты',
  'Премиум сегмент',
  'РКО',
  'Брокерские счета',
  'Автокредиты',
  'Ипотечные продукты',
  'Вклады и накопительные',
];

const ONBOARDING = [
  'Подписание NDA и фиксация CPA.',
  'Интеграция ссылок и настройка Postback.',
  'Тестовый пролив (Validation phase) до 100 лидов.',
  'Анализ качества и анлок бюджетов.',
];

const ECOSYSTEM = [
  'Т-Банк',
  'Альфа-Банк',
  'ВТБ',
  'Газпромбанк',
  'Сбер',
  'Озон Банк',
  'ОТП Банк',
  'Точка',
  'Уралсиб',
  'Совкомбанк',
  'Контур',
];

const COMPARISON = [
  { criterion: 'Качество лида', others: 'Низкое (автоматика)', nexus: 'Высокое (Human QA)' },
  { criterion: 'Прозрачность антифрода', others: 'Скрыто', nexus: 'Полная отчетность' },
  { criterion: 'Связь с фаундером', others: 'Нет', nexus: 'Прямой доступ' },
  { criterion: 'Скорость интеграции', others: 'Долго', nexus: '24-48 часов' },
];

const SCORING_LEVELS = [
  'Fingerprint-анализ устройства',
  'Валидация по IP и User-Agent',
  'Анализ транзакционной активности',
  'Проверка по внутренней антифрод-базе',
  'Финальный ручной контроль скаут-менеджером',
];

const FAQ = [
  {
    q: 'Как вы боретесь с фродом?',
    a: 'Используем собственную систему NexusShield и ручную верификацию каждого действия.',
  },
  {
    q: 'Какие объемы вы даете?',
    a: 'Масштабируемся от 100 до 5000+ целевых действий в месяц под требования банка.',
  },
  {
    q: 'Нужна ли от нас техническая интеграция?',
    a: 'Интеграция возможна через Postback, API или виджеты, настройка занимает не более 1 дня.',
  },
  {
    q: 'Как вы проверяете качество лидов?',
    a: 'Каждый лид проходит 5-уровневую проверку: Fingerprint-анализ устройства, валидация по IP, анализ истории активности, проверка по антифрод-базе и финальный ручной контроль.',
  },
  {
    q: 'Возможна ли работа по NDA?',
    a: 'Да, мы работаем строго по договору NDA и обеспечиваем полную конфиденциальность данных.',
  },
  {
    q: 'Какой средний LTV лидов?',
    a: 'Мы оптимизируем кампании под высокий LTV, ориентируясь на целевые действия, а не просто на выдачу.',
  },
  {
    q: 'Как быстро вы масштабируете связки?',
    a: 'Масштабируем объемы в течение 24-48 часов после подтверждения качества на тестовом проливе.',
  },
  {
    q: 'Предоставляете ли вы отчетность?',
    a: 'Да, предоставляем логи по каждому лиду и еженедельную аналитику.',
  },
];

const Section = ({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => (
  <section id={id} className={`px-6 md:px-10 py-[120px] max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-nexus-gray mb-6">
    {children}
  </span>
);

function LeadForm() {
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [errors, setErrors] = useState<{ email?: string; telegram?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const next: { email?: string; telegram?: string } = {};
    if (!EMAIL_RE.test(email.trim())) next.email = 'Укажите корректный корпоративный Email';
    if (!TELEGRAM_RE.test(telegram.trim()))
      next.telegram = 'Формат: @username (от 5 символов)';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), telegram: telegram.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) {
          setErrors(data.errors);
          setStatus('idle');
          return;
        }
        throw new Error('request failed');
      }
      setStatus('success');
      setEmail('');
      setTelegram('');
    } catch {
      setStatus('error');
      setServerError('Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10 animate-fade-up">
        <div className="w-16 h-16 rounded-2xl border border-nexus-line flex items-center justify-center mx-auto mb-6">
          <Icon name="Check" size={32} className="text-white" />
        </div>
        <h3 className="font-display font-bold text-2xl mb-3">Заявка отправлена</h3>
        <p className="text-nexus-gray max-w-sm mx-auto">
          Мы получили ваш запрос и свяжемся в Telegram в ближайшее время для передачи медиаплана и
          NDA.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm text-nexus-gray hover:text-white transition-colors"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Корпоративный Email"
          className={`w-full bg-nexus-graphite border rounded-xl px-5 py-4 text-white placeholder:text-nexus-gray focus:outline-none transition-colors ${
            errors.email ? 'border-red-500/60' : 'border-nexus-line focus:border-white/30'
          }`}
        />
        {errors.email && <p className="text-red-400 text-sm mt-2 pl-1">{errors.email}</p>}
      </div>
      <div>
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="Telegram для связи"
          className={`w-full bg-nexus-graphite border rounded-xl px-5 py-4 text-white placeholder:text-nexus-gray focus:outline-none transition-colors ${
            errors.telegram ? 'border-red-500/60' : 'border-nexus-line focus:border-white/30'
          }`}
        />
        {errors.telegram && <p className="text-red-400 text-sm mt-2 pl-1">{errors.telegram}</p>}
      </div>
      {serverError && <p className="text-red-400 text-sm pl-1">{serverError}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-nexus-black font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Icon name="Loader2" size={18} className="animate-spin" />
            Отправка...
          </>
        ) : (
          'Отправить запрос'
        )}
      </button>
    </form>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-nexus-black text-white font-body overflow-x-hidden">
      {/* БЛОК 1: GLOBAL HEADER */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between glass border-x-0 border-t-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md border border-nexus-line flex items-center justify-center">
              <Icon name="Hexagon" size={18} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight">Nexus Media</span>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-nexus-gray hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="text-sm font-medium px-5 py-2.5 rounded-lg border border-nexus-line bg-transparent hover:bg-white/5 transition-colors">
            Запросить доступ
          </button>
        </div>
      </header>

      {/* БЛОК 2: HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg radial-fade" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[120px] animate-glow-pulse" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-4xl animate-fade-up">
            <Kicker>Enterprise-Grade Acquisition</Kicker>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight text-gradient mb-8">
              Эволюция лидогенерации для финансового сектора
            </h1>
            <p className="text-lg md:text-xl text-nexus-gray max-w-2xl leading-relaxed mb-12">
              Верифицированный финтех-трафик. Обеспечиваем банки клиентами по CPA-модели. Никакого
              фрода и ботов.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {HERO_METRICS.map((m) => (
                <div key={m.label} className="glass glass-hover rounded-2xl p-6">
                  <div className="font-display font-extrabold text-3xl mb-1">{m.value}</div>
                  <div className="text-sm text-nexus-gray uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 bg-white text-nexus-black font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors">
              Назначить сессию
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* БЛОК 3: БЕГУЩАЯ СТРОКА (TICKER) */}
      <div className="border-y border-nexus-line py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center text-sm font-medium tracking-[0.2em] uppercase text-nexus-gray"
            >
              <span className="mx-8">{t}</span>
              <Icon name="Circle" size={5} className="fill-white/40 text-white/40" />
            </span>
          ))}
        </div>
      </div>

      {/* БЛОК 4: ПРОБЛЕМАТИКА РЫНКА */}
      <Section id="platform">
        <Kicker>Market Analysis</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Системный кризис Performance
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-3xl p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl border border-nexus-line flex items-center justify-center mb-6">
                <Icon name={p.icon} size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{p.title}</h3>
              <p className="text-nexus-gray leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК 5: РЕШЕНИЕ */}
      <Section>
        <div className="glass rounded-[2.5rem] p-10 md:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <Kicker>Solution</Kicker>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-8">
              Boutique Anti-Fraud Engine
            </h2>
            <p className="text-lg md:text-xl text-nexus-gray leading-relaxed max-w-2xl mx-auto">
              Мы не покупаем слепые охваты. Nexus Media использует закрытую скаут-сеть и предиктивный
              парсинг для точечного привлечения реальных людей.
            </p>
          </div>
        </div>
      </Section>

      {/* БЛОК 6: АРХИТЕКТУРА СЕТИ */}
      <Section id="infrastructure">
        <Kicker>Infrastructure</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Инфраструктура качества
        </h2>
        <div className="space-y-5">
          {ARCHITECTURE.map((a) => (
            <div
              key={a.step}
              className="glass glass-hover rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
            >
              <div className="font-display font-extrabold text-5xl md:text-6xl text-white/15 shrink-0 w-24">
                {a.step}
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl mb-2">{a.title}</h3>
                <p className="text-nexus-gray leading-relaxed max-w-2xl">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК 7: ВЕРТИКАЛИ */}
      <Section id="verticals">
        <Kicker>Verticals</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Масштабируем финтех
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VERTICALS.map((v) => (
            <div
              key={v}
              className="glass glass-hover rounded-2xl px-6 py-6 flex items-center gap-3 text-lg font-medium"
            >
              <Icon name="CreditCard" size={20} className="text-nexus-gray shrink-0" />
              {v}
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК 8: КОМПЛАЕНС */}
      <Section id="compliance">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
          <div>
            <Kicker>Compliance</Kicker>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-tight">
              Траст институционального уровня
            </h2>
          </div>
          <div className="glass rounded-3xl p-8 md:p-12">
            <Icon name="ShieldCheck" size={32} className="text-white mb-6" />
            <p className="text-lg text-nexus-gray leading-relaxed">
              Мы понимаем жесткие требования служб безопасности финтех-корпораций. Никаких накруток
              отзывов или нарушения политик сторов. Только прозрачная экономика целевых действий.
            </p>
          </div>
        </div>
      </Section>

      {/* БЛОК 9: ONBOARDING */}
      <Section>
        <Kicker>Onboarding</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Протокол запуска за 48 часов
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {ONBOARDING.map((o, i) => (
            <div key={i} className="glass glass-hover rounded-3xl p-8 flex items-start gap-6">
              <div className="font-display font-extrabold text-2xl text-white/25 shrink-0">
                0{i + 1}
              </div>
              <p className="text-lg leading-relaxed pt-0.5">{o}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК 10: API & ТЕХНОЛОГИИ */}
      <Section>
        <div className="glass rounded-[2.5rem] p-10 md:p-16 grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">
          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-3xl border border-nexus-line grid-bg flex items-center justify-center">
              <Icon name="Webhook" size={56} className="text-white" />
            </div>
          </div>
          <div>
            <Kicker>Technology</Kicker>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-6">
              Enterprise API
            </h2>
            <p className="text-lg text-nexus-gray leading-relaxed">
              Инфраструктура позволяет настроить бесшовную передачу квалифицированных лидов напрямую
              в вашу CRM в режиме реального времени. Настроим интеграцию под архитектуру вашего банка
              за один день.
            </p>
          </div>
        </div>
      </Section>

      {/* БЛОК 11: БЕЗОПАСНОСТЬ */}
      <Section>
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
          <div className="glass rounded-3xl p-8 md:p-12 order-2 md:order-1">
            <Icon name="Lock" size={32} className="text-white mb-6" />
            <p className="text-lg text-nexus-gray leading-relaxed">
              Работа с финансовым трафиком требует абсолютной конфиденциальности. Мы не храним данные
              на публичных серверах. Скоринг развернут в изолированных контурах с шифрованием AES-256.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Kicker>Security</Kicker>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-tight">
              Data Security &amp; Privacy
            </h2>
          </div>
        </div>
      </Section>

      {/* БЛОК 12: ЭКСКЛЮЗИВНОСТЬ */}
      <Section>
        <div className="relative text-center max-w-4xl mx-auto">
          <Icon name="Crown" size={40} className="text-white/40 mx-auto mb-8" />
          <Kicker>Exclusivity</Kicker>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-8 text-gradient">
            Бутиковый подход
          </h2>
          <p className="text-lg md:text-xl text-nexus-gray leading-relaxed">
            Мы не работаем по конвейеру. Все бриф-сессии, согласования квот, разработка медиапланов и
            стратегические созвоны проводятся лично фаундером агентства для максимальной скорости
            решений.
          </p>
        </div>
      </Section>

      {/* БЛОК 13: ЭКОСИСТЕМА */}
      <Section>
        <Kicker>Ecosystem</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Интегрируемся с лидерами
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ECOSYSTEM.map((e) => (
            <div
              key={e}
              className="glass glass-hover rounded-2xl px-6 py-10 flex items-center justify-center text-center font-display font-semibold text-lg text-nexus-gray"
            >
              {e}
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК: ПРЕИМУЩЕСТВА (СРАВНИТЕЛЬНАЯ ТАБЛИЦА) */}
      <Section>
        <Kicker>Comparison</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Преимущества
        </h2>
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3">
            <div className="p-6 md:p-8 text-sm text-nexus-gray uppercase tracking-wider">
              Критерий
            </div>
            <div className="p-6 md:p-8 text-sm text-nexus-gray uppercase tracking-wider border-l border-nexus-line">
              Обычные CPA-сети
            </div>
            <div className="p-6 md:p-8 text-sm uppercase tracking-wider border-l border-nexus-line font-semibold">
              Nexus Media
            </div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={row.criterion}
              className={`grid grid-cols-3 ${i !== 0 ? 'border-t border-nexus-line' : 'border-t border-nexus-line'}`}
            >
              <div className="p-6 md:p-8 font-medium">{row.criterion}</div>
              <div className="p-6 md:p-8 border-l border-nexus-line text-nexus-gray flex items-center gap-2">
                <Icon name="X" size={16} className="text-nexus-gray shrink-0" />
                {row.others}
              </div>
              <div className="p-6 md:p-8 border-l border-nexus-line flex items-center gap-2">
                <Icon name="Check" size={16} className="text-white shrink-0" />
                {row.nexus}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК: SLA И ГАРАНТИИ */}
      <Section>
        <div className="glass rounded-[2.5rem] p-10 md:p-16 grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">
          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-3xl border border-nexus-line grid-bg flex items-center justify-center">
              <Icon name="BadgeCheck" size={56} className="text-white" />
            </div>
          </div>
          <div>
            <Kicker>SLA</Kicker>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-6">
              Гарантии качества и SLA
            </h2>
            <p className="text-lg text-nexus-gray leading-relaxed">
              Мы работаем по жесткому SLA. Время ответа менеджера — до 30 минут. Гарантия
              окупаемости трафика при соблюдении медиаплана. Юридическое сопровождение каждого
              лида и прямые контракты с рекламодателями.
            </p>
          </div>
        </div>
      </Section>

      {/* БЛОК: ТЕХНОЛОГИЧЕСКИЙ СКОРИНГ */}
      <Section>
        <Kicker>Scoring</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4 max-w-2xl">
          Многоуровневый фильтр трафика
        </h2>
        <p className="text-lg text-nexus-gray leading-relaxed mb-16 max-w-2xl">
          Каждый входящий запрос проходит 5-уровневую проверку перед передачей в банк:
        </p>
        <div className="space-y-5">
          {SCORING_LEVELS.map((level, i) => (
            <div
              key={level}
              className="glass glass-hover rounded-3xl p-8 flex items-center gap-6"
            >
              <div className="font-display font-extrabold text-2xl text-white/25 shrink-0 w-10">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-lg leading-relaxed">{level}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* БЛОК: FAQ */}
      <Section>
        <Kicker>FAQ</Kicker>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-16 max-w-2xl">
          Частые вопросы
        </h2>
        <div className="glass rounded-3xl px-8 md:px-10">
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-nexus-line"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-7">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-nexus-gray text-base leading-relaxed pb-7">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* БЛОК 14: LEAD FORM */}
      <Section id="contacts">
        <div className="glass rounded-[2.5rem] p-10 md:p-16 max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <div className="text-center mb-10">
              <Kicker>Integration</Kicker>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
                Начать интеграцию
              </h2>
              <p className="text-nexus-gray">Запросите медиаплан и NDA.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </Section>

      {/* БЛОК 15: FOOTER */}
      <footer className="border-t border-nexus-line px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md border border-nexus-line flex items-center justify-center">
                <Icon name="Hexagon" size={18} className="text-white" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight">Nexus Media</span>
            </div>
            <p className="text-nexus-gray max-w-xs">Fintech Performance Agency</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-nexus-gray mb-4">Контакты</div>
            <a
              href="mailto:nexmedia@gmail.com"
              className="text-white hover:text-nexus-gray transition-colors"
            >
              nexmedia@gmail.com
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-nexus-gray mb-4">Документы</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-nexus-gray hover:text-white transition-colors">
                  Anti-Fraud Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-nexus-gray hover:text-white transition-colors">
                  Data Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-nexus-line text-sm text-nexus-gray">
          © 2026 Nexus Media.
        </div>
      </footer>
    </div>
  );
}