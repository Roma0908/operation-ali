import React, { useState, useEffect, useRef } from 'react';

const birthdayConfig = {
  name: "Әли",
  heroImage: "WhatsApp Image 2026-10-09 at 21.32.11.jpeg",
  memes: [
    { src: "images (7).jpg", title: "ДОКУМЕНТ №001", caption: "Когда сказал: 'Я уже выхожу', но ещё даже не собрался." },
    { src: "images (6).jpg", title: "ДОКУМЕНТ №002", caption: "Когда планировал быть серьёзным человеком, но друзья снова появились в чате." },
    { src: "images (5).jpg", title: "ДОКУМЕНТ №003", caption: "Уровень уверенности: 100%. Уровень понимания ситуации: засекречен." },
    { src: "images (4).jpg", title: "ДОКУМЕНТ №004", caption: "Эксперт по поиску приключений, которые никто не заказывал." },
    { src: "images (3).jpg", title: "ДОКУМЕНТ №005", caption: "Официальное заключение: обычным человеком Әли быть отказался." },
    { src: "77d7a1d009fb63f2d25f769763733c32.jpg", title: "ДОКУМЕНТ №006", caption: "Секретный материал. Открывать только в присутствии свидетелей." }
  ],
  finalText: "Әли, с днём рождения, брат! 🎉\nСегодня тебе официально разрешается быть главным героем, получать подарки, есть праздничный торт и делать вид, что ты стал серьёзнее на целый год.\nЖелаю тебе побольше счастливых моментов, верных друзей, крутых возможностей, успехов во всём, за что ты берёшься, и историй, которые мы ещё долго будем вспоминать со смехом.\nПусть жизнь подкидывает тебе не проблемы, а интересные квесты, не разочарования, а неожиданные бонусы, и побольше моментов, когда всё складывается именно так, как хочется.\nОставайся собой, не теряй чувство юмора и продолжай собирать воспоминания, которые стоят дороже любых подарков.\nИ помни: это не просто новый год твоей жизни. Это новый уровень.\nС днём рождения, Әли! Ты легенда. 🎂"
};

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2";
  const variants = {
    primary: "bg-transparent border-2 border-[#0f0] text-[#0f0] hover:bg-[#0f0] hover:text-black shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_20px_rgba(0,255,0,0.8)]",
    secondary: "bg-transparent border border-gray-500 text-gray-300 hover:border-white hover:text-white",
    danger: "bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black shadow-[0_0_10px_rgba(255,0,0,0.3)]",
    gold: "bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card = ({ title, children, className = "", onClick }) => (
  <div onClick={onClick} className={`bg-[#0a192f] border border-[#0f0] bg-opacity-80 p-5 rounded-sm relative overflow-hidden group ${onClick ? 'cursor-pointer hover:bg-[#112240] transition-colors' : ''} ${className}`}>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0f0] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
    <h3 className="text-[#0f0] font-mono text-xs mb-3 uppercase tracking-widest border-b border-[#0f0]/30 pb-2">{title}</h3>
    <div className="text-gray-300 font-sans text-sm">{children}</div>
  </div>
);

const MessageBox = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-[#0a192f] border-2 border-[#0f0] p-6 max-w-sm w-full text-center shadow-[0_0_30px_rgba(0,255,0,0.2)] animate-pulse-fast">
                <p className="text-[#0f0] font-mono mb-6">{message}</p>
                <Button onClick={onClose} variant="primary">ПОНЯТЬ И ПРИНЯТЬ</Button>
            </div>
        </div>
    );
};

const useConfetti = (active) => {
    useEffect(() => {
        if (!active) return;
        const container = document.getElementById('confetti-container');
        if (!container) return;

        const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('absolute', 'w-2', 'h-4', 'opacity-0');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animation via JS for simplicity without external CSS files
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            confetti.animate([
                { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random()*200 - 100}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity
            });
            
            container.appendChild(confetti);
        }
        return () => { container.innerHTML = ''; };
    }, [active]);
};


const ScreenLogin = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "INITIALIZING SECURE SYSTEM...\nCONNECTING TO BIRTHDAY DATABASE...\nIDENTITY REQUIRED...\n...\nSYSTEM READY.";
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="w-full text-left font-mono text-[#0f0] text-sm md:text-base whitespace-pre-wrap min-h-[120px]">
        {text}
        <span className="animate-pulse">_</span>
      </div>
      
      {showButton && (
        <div className="bg-[#0a192f] border border-[#0f0] p-8 w-full text-center relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#0f0] opacity-50 animate-scan"></div>
            <h1 className="text-2xl md:text-4xl text-[#0f0] font-black tracking-widest mb-2 uppercase">TOP SECRET</h1>
            <h2 className="text-lg md:text-xl text-white mb-6 uppercase">ДОСТУП К ЗАСЕКРЕЧЕННОМУ ДЕЛУ</h2>
            <p className="text-gray-400 mb-2 italic">«В системе обнаружен один крайне подозрительный именинник».</p>
            <p className="text-[#0f0] font-mono text-xl mb-8 border-b border-[#0f0] inline-block pb-1">Имя подозреваемого: {birthdayConfig.name}</p>
            <div>
                <Button onClick={onComplete} className="w-full md:w-auto">НАЧАТЬ ОПЕРАЦИЮ</Button>
            </div>
        </div>
      )}
    </div>
  );
};

const ScreenIdentification = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [msg, setMsg] = useState(null);

    const handleAnswer = (reaction, nextStep) => {
        setMsg(reaction);
        setTimeout(() => {
            setMsg(null);
            if (nextStep === 'done') onComplete();
            else setStep(nextStep);
        }, 3000);
    };

    const steps = [
        {
            q: "Кто ты?",
            opts: [
                { text: birthdayConfig.name, r: "Слишком очевидный ответ. Но допустим." },
                { text: "Легенда", r: "Самооценка зафиксирована на высоком уровне." },
                { text: "Главный подозреваемый", r: "Признание принято." },
                { text: "Я просто посмотреть зашёл", r: "Отсюда просто так не уходят." }
            ]
        },
        {
            q: "Готов ли ты узнать, что хранится в твоём досье?",
            opts: [
                { text: "Я ГОТОВ", r: "Мужественный выбор. Протокол запущен." },
                { text: "А МОЖНО НЕ НАДО?", r: "Отказ зарегистрирован. Система проигнорировала его по неизвестным причинам." }
            ]
        },
        {
            q: "Какой у тебя уровень легендарности?",
            opts: [
                { text: "Обычный человек", r: "Ложь обнаружена. Анализ показывает обратное." },
                { text: "Локальная легенда", r: "Скромно, но мы-то знаем правду." },
                { text: "Легенда района", r: "Район подтверждает. Продолжаем." },
                { text: "Уровень вне документации", r: "ВНИМАНИЕ: Обнаружена критическая масса легендарности." }
            ]
        }
    ];

    if (msg) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-fade-in">
            <div className="text-[#0f0] font-mono text-xl md:text-2xl border border-[#0f0] p-6 bg-[#0a192f] inline-block shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                {msg}
            </div>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto w-full animate-fade-in mt-10">
            <div className="text-center mb-8 border-b-2 border-dashed border-gray-700 pb-4">
                <h2 className="text-2xl text-white font-mono uppercase tracking-widest mb-2">ПРОВЕРКА ДОСТУПА</h2>
                <p className="text-[#0f0] text-sm">ЭТАП {step + 1} / 3</p>
            </div>
            
            <div className="bg-[#0a192f] border border-gray-600 p-6 shadow-lg mb-8">
                <h3 className="text-xl text-[#0f0] font-mono mb-6 text-center">{steps[step].q}</h3>
                <div className="flex flex-col space-y-4">
                    {steps[step].opts.map((opt, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleAnswer(opt.r, step === 2 ? 'done' : step + 1)}
                            className="bg-transparent border border-gray-500 text-gray-300 hover:border-[#0f0] hover:text-[#0f0] p-3 text-left font-mono text-sm transition-all hover:pl-6 relative overflow-hidden group"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[#0f0] absolute left-2 transition-all">❯</span>
                            {opt.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ScreenDossier = ({ onNext, onFoundEgg }) => (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
        <h2 className="text-3xl text-white font-mono uppercase tracking-widest mb-8 text-center border-b border-[#0f0] pb-4">
            PERSONAL FILE: {birthdayConfig.name.toUpperCase()}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card title="CLASSIFIED PROFILE">
                <p className="mb-2"><span className="text-[#0f0]">Объект наблюдения:</span> {birthdayConfig.name}</p>
                <p className="mb-2"><span className="text-[#0f0]">Статус:</span> Известная личность.</p>
                <p className="mb-2"><span className="text-[#0f0]">Опасность для скуки:</span> Критический уровень.</p>
                <p>Способность появляться в неожиданных ситуациях — требует дальнейшего изучения.</p>
            </Card>
            <Card title="THREAT ASSESSMENT">
                <p className="mb-2 flex justify-between"><span>Угроза серьёзным разговорам:</span> <span className="text-red-400">ВЫСОКАЯ</span></p>
                <p className="mb-2 flex justify-between"><span>Вероятность случайного прикола:</span> <span className="text-[#0f0]">97%</span></p>
                <p className="mb-2 flex justify-between"><span>Уровень легендарности:</span> <span className="text-yellow-400">ЗАСЕКРЕЧЕН</span></p>
                <div className="mt-4 h-2 w-full bg-gray-800 rounded overflow-hidden">
                    <div className="h-full bg-red-500 w-[97%]"></div>
                </div>
            </Card>
            <Card title="ACHIEVEMENTS">
                <ul className="list-disc pl-5 space-y-2 text-[#0f0]">
                    <li><span className="text-gray-300">Выжил ещё один год.</span></li>
                    <li><span className="text-gray-300">Разблокировал новый уровень жизни.</span></li>
                    <li><span className="text-gray-300">Получил доступ к пакету воспоминаний.</span></li>
                    <li><span className="text-gray-300">Продолжает оставаться легендой.</span></li>
                </ul>
            </Card>
            <Card title="SYSTEM WARNING">
                <div className="flex items-start space-x-3 text-red-400">
                    <span className="text-2xl">⚠️</span>
                    <p className="font-mono text-sm leading-relaxed">
                        ВНИМАНИЕ: дальнейшее изучение досье может вызвать неконтролируемый приступ смеха. Рекомендуется пристегнуться<span 
                            onClick={() => onFoundEgg('egg1')} 
                            className="cursor-pointer hover:text-white"
                            title="Секретная точка"
                        >.</span>
                    </p>
                </div>
            </Card>
        </div>
        <div className="text-center">
            <Button onClick={onNext}>ОТКРЫТЬ АРХИВ ДОКАЗАТЕЛЬСТВ</Button>
        </div>
    </div>
);

const ScreenMemes = ({ onNext, onFoundEgg }) => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div className="max-w-5xl mx-auto w-full animate-fade-in">
            <h2 className="text-3xl text-white font-mono uppercase tracking-widest mb-2 text-center">EVIDENCE ROOM</h2>
            <p className="text-center text-gray-400 mb-8 font-mono text-sm">АРХИВ ДОКАЗАТЕЛЬСТВ (ОПЕРАТИВНАЯ СЪЁМКА)</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {birthdayConfig.memes.map((meme, idx) => (
                    <Card key={idx} title={meme.title} className="hover:scale-105 transition-transform duration-300" onClick={() => setSelectedImg(meme)}>
                        <div className="w-full h-48 bg-black mb-3 border border-gray-700 flex items-center justify-center overflow-hidden">
                            {/* Fallback styling if image missing, but uses real src */}
                            <img src={meme.src} alt={meme.title} className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" onError={(e) => {
                                e.target.onerror = null; 
                                e.target.parentElement.innerHTML = `<div class="text-xs text-gray-500 text-center p-2">[ИЗОБРАЖЕНИЕ ЗАСЕКРЕЧЕНО]<br/><span class="text-[#0f0]">${meme.src}</span></div>`;
                            }}/>
                        </div>
                        <p className="text-xs text-gray-300 italic">"{meme.caption}"</p>
                        {idx === 5 && (
                             <span onClick={(e) => { e.stopPropagation(); onFoundEgg('egg2'); }} className="absolute bottom-2 right-2 text-[8px] text-gray-700 cursor-pointer hover:text-[#0f0]">006</span>
                        )}
                    </Card>
                ))}
            </div>

            <div className="text-center">
                <Button onClick={onNext}>ПЕРЕЙТИ К ИСПЫТАНИЯМ</Button>
            </div>

            {selectedImg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4" onClick={() => setSelectedImg(null)}>
                    <div className="max-w-2xl w-full bg-[#111] border-2 border-[#0f0] p-2" onClick={e => e.stopPropagation()}>
                        <div className="border-b border-[#0f0] p-2 mb-2 flex justify-between items-center">
                            <span className="text-[#0f0] font-mono text-sm">{selectedImg.title}</span>
                            <button onClick={() => setSelectedImg(null)} className="text-[#0f0] hover:text-white">✕</button>
                        </div>
                        <img src={selectedImg.src} alt="Meme" className="w-full h-auto max-h-[60vh] object-contain mb-4" />
                        <p className="text-white text-center font-mono p-4 bg-[#0a192f] border border-gray-700">"{selectedImg.caption}"</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const ScreenMiniGame = ({ onNext, onFoundEgg }) => {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [msg, setMsg] = useState(null);

    const handleAction = (points, message, nextRound) => {
        setScore(s => s + points);
        setMsg(message);
        setTimeout(() => {
            setMsg(null);
            if (nextRound > 3) onNext();
            else setRound(nextRound);
        }, 2000);
    };

    if (msg) return (
         <div className="flex flex-col items-center justify-center min-h-[40vh] text-center animate-fade-in">
             <div className="text-[#0f0] font-mono text-xl border border-[#0f0] p-8 bg-[#0a192f] shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                 <p className="mb-4">{msg}</p>
                 <p className="text-sm text-gray-400">ТЕКУЩИЙ СЧЁТ: {score}</p>
             </div>
         </div>
    );

    return (
        <div className="max-w-2xl mx-auto w-full animate-fade-in relative mt-10">
            <div className="flex justify-between items-center border-b-2 border-[#0f0] pb-2 mb-8 font-mono text-[#0f0]">
                <span>РАУНД {round}/3</span>
                <span>СЧЁТ: {score}</span>
            </div>

            {round === 1 && (
                <div className="bg-[#0a192f] border border-gray-600 p-6 text-center shadow-lg">
                    <h3 className="text-xl text-white font-mono mb-8">Система обнаружила подозрительный уровень легендарности. Что будем делать?</h3>
                    <div className="grid gap-4">
                        <Button variant="secondary" onClick={() => handleAction(10, "Повторная проверка подтвердила диагноз.", 2)}>А. Проверить ещё раз</Button>
                        <Button variant="secondary" onClick={() => handleAction(50, "Отличный план. Главное — не паниковать.", 2)}>Б. Сделать вид, что всё под контролем</Button>
                        <Button variant="secondary" onClick={() => handleAction(100, "Лучшая защита — нападение. Система в шоке.", 2)}>В. Обвинить систему в сбое</Button>
                    </div>
                </div>
            )}

            {round === 2 && (
                <div className="bg-[#0a192f] border border-gray-600 p-6 text-center shadow-lg">
                    <h3 className="text-xl text-white font-mono mb-2">ВВЕДИТЕ СЕКРЕТНЫЙ КОД ДОСТУПА</h3>
                    <p className="text-gray-400 mb-8 text-sm text-center">Один из символов правильный. Остальные вызовут... ничего не вызовут, просто ошибка.</p>
                    <div className="flex justify-center space-x-6 text-5xl">
                        <button onClick={() => setMsg("НЕВЕРНЫЙ КОД. Ваш уровень уверенности впечатляет.")} className="hover:scale-110 transition-transform filter grayscale hover:grayscale-0">☢️</button>
                        <button onClick={() => handleAction(100, "ДОСТУП ПОДТВЕРЖДЁН. Глаз-алмаз.", 3)} className="hover:scale-110 transition-transform filter grayscale hover:grayscale-0" title="Нажми меня">👁️</button>
                        <button onClick={() => setMsg("ОШИБКА БИОХИМИИ. Попробуй ещё раз.")} className="hover:scale-110 transition-transform filter grayscale hover:grayscale-0">☣️</button>
                    </div>
                </div>
            )}

            {round === 3 && (
                <div className="bg-[#0a192f] border border-gray-600 p-6 text-center shadow-lg">
                    <h3 className="text-xl text-white font-mono mb-8">ПОСЛЕДНЕЕ ИСПЫТАНИЕ: Кто достоин главного праздничного сюрприза?</h3>
                    <div className="grid gap-4">
                        <Button variant="secondary" onClick={() => setMsg("Случайный прохожий не прошёл проверку лица.")}>Случайный прохожий</Button>
                        <Button variant="secondary" onClick={() => setMsg("Секретные агенты не празднуют дни рождения.")}>Секретный агент 007</Button>
                        <Button variant="primary" onClick={() => handleAction(500, "ПРАВИЛЬНЫЙ ОТВЕТ. ИНИЦИАЛИЗАЦИЯ ФИНАЛА...", 4)}>Только {birthdayConfig.name}</Button>
                    </div>
                </div>
            )}
            
            <span 
                className="absolute -top-6 right-0 text-[10px] text-gray-800 cursor-pointer hover:text-[#0f0]" 
                onClick={() => onFoundEgg('egg3')}
            >v1.0.42</span>
        </div>
    );
};

const ScreenGifts = ({ onNext, onFoundEgg }) => {
    const [opened, setOpened] = useState([]);

    const handleOpen = (id) => {
        if (!opened.includes(id)) setOpened([...opened, id]);
    };

    const gifts = [
        { id: 'g1', title: "MESSAGE DROP", type: 'text', content: "Сообщение расшифровано: 'Будь аккуратнее, говорят этот возраст вызывает резкое желание купить дачу'." },
        { id: 'g2', title: "MEMORY ARCHIVE", type: 'image', content: "Память временно недоступна. Все смешные видео спрятаны в целях безопасности твоей репутации." },
        { id: 'g3', title: "CLASSIFIED WISHES", type: 'list', content: ["Здоровья (чтобы печень справлялась)", "Денег (чтобы хватало на глупости)", "Счастья (тут без шуток, искренне)"] },
        { id: 'g4', title: "UNKNOWN OBJECT", type: 'box', content: "Внутри обнаружен: Бесконечный респект от друзей." }
    ];

    const allOpened = opened.length === gifts.length;

    return (
        <div className="max-w-4xl mx-auto w-full animate-fade-in text-center mt-4">
            <h2 className="text-3xl text-red-500 font-mono uppercase tracking-widest mb-2 font-bold flex justify-center items-center gap-2">
                <span className="animate-pulse">🔒</span> RESTRICTED ACCESS
            </h2>
            <p className="text-gray-400 mb-10 font-mono text-sm">«Комната, в которую не должны были пустить даже тебя»</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {gifts.map((g) => {
                    const isOpen = opened.includes(g.id);
                    return (
                        <div key={g.id} className={`border-2 p-6 transition-all duration-500 ${isOpen ? 'bg-[#0a192f] border-[#0f0]' : 'bg-[#111] border-gray-700 hover:border-gray-500'} relative`}>
                            {g.id === 'g4' && !isOpen && (
                                <span onClick={(e) => { e.stopPropagation(); onFoundEgg('egg4'); }} className="absolute top-2 right-2 cursor-pointer w-4 h-4 rounded-full bg-gray-800 hover:bg-[#0f0]"></span>
                            )}
                            
                            <h3 className={`font-mono mb-4 text-lg ${isOpen ? 'text-[#0f0]' : 'text-gray-500'}`}>{g.title}</h3>
                            
                            {!isOpen ? (
                                <button onClick={() => handleOpen(g.id)} className="px-4 py-2 bg-gray-800 text-gray-400 border border-gray-600 hover:text-white hover:border-white font-mono text-sm uppercase">
                                    РАСПОЗНАТЬ
                                </button>
                            ) : (
                                <div className="text-gray-300 font-sans text-sm animate-fade-in">
                                    {Array.isArray(g.content) ? (
                                        <ul className="list-disc pl-5 text-left text-white inline-block">
                                            {g.content.map((c, i) => <li key={i} className="mb-1">{c}</li>)}
                                        </ul>
                                    ) : (
                                        <p className="text-white italic">{g.content}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {allOpened && (
                <div className="animate-slide-up">
                    <p className="text-[#0f0] font-mono mb-4 text-xl">ВСЕ СИСТЕМЫ ВЗЛОМАНЫ.</p>
                    <Button onClick={onNext} variant="danger" className="animate-pulse">ПЕРЕХВАТ УПРАВЛЕНИЯ</Button>
                </div>
            )}
        </div>
    );
};

const ScreenFinal = ({ onFoundEgg }) => {
    const [decrypted, setDecrypted] = useState(false);
    const [shaking, setShaking] = useState(false);
    useConfetti(decrypted);

    const handleDecrypt = () => {
        setShaking(true);
        setTimeout(() => {
            setShaking(false);
            setDecrypted(true);
        }, 1500);
    };

    if (!decrypted) {
        return (
            <div className={`flex flex-col items-center justify-center min-h-[60vh] transition-all ${shaking ? 'animate-shake' : ''}`}>
                <Button onClick={handleDecrypt} variant="danger" className="text-xl px-10 py-6 border-4">
                    [ РАСШИФРОВАТЬ ГЛАВНОЕ ПОЗДРАВЛЕНИЕ ]
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto w-full animate-fade-in bg-gradient-to-br from-[#1a1a00] to-[#332b00] border-2 border-yellow-500 p-8 rounded-lg shadow-[0_0_50px_rgba(255,215,0,0.3)] text-center relative z-10 my-8">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-8 tracking-widest drop-shadow-md">
                ОПЕРАЦИЯ УСПЕШНА
            </h1>
            
            <div className="bg-black bg-opacity-40 p-6 rounded border border-yellow-700/50 mb-8 backdrop-blur-sm">
                <p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-serif">
                    {birthdayConfig.finalText}
                </p>
                <span onClick={() => onFoundEgg('egg5')} className="cursor-pointer text-yellow-500 hover:text-white" title="Последний секрет">✨</span>
            </div>

            <div className="border-4 border-yellow-600/50 p-2 bg-black inline-block relative max-w-full">
                <img 
                    src={birthdayConfig.heroImage} 
                    alt="Именинник" 
                    className="max-w-full h-auto max-h-[500px] object-contain shadow-2xl"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.parentElement.innerHTML = `<div class="text-yellow-500 flex items-center justify-center h-64 w-64 border border-yellow-500 bg-black">[ФОТО ЗАСЕКРЕЧЕНО]<br/>${birthdayConfig.heroImage}</div>`;
                    }}
                />
            </div>
        </div>
    );
};

export default function App() {
    const [screen, setScreen] = useState(1);
    const [eggs, setEggs] = useState([]);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [globalMsg, setGlobalMsg] = useState(null);

    const handleFoundEgg = (id) => {
        if (!eggs.includes(id)) {
            setEggs(prev => [...prev, id]);
            setGlobalMsg(`СЕКРЕТ НАЙДЕН (${eggs.length + 1}/5)`);
            setTimeout(() => setGlobalMsg(null), 3000);
        }
    };

    // Screens map for easy navigation
    const screensMap = {
        1: <ScreenLogin onComplete={() => setScreen(2)} />,
        2: <ScreenIdentification onComplete={() => setScreen(3)} />,
        3: <ScreenDossier onNext={() => setScreen(4)} onFoundEgg={handleFoundEgg} />,
        4: <ScreenMemes onNext={() => setScreen(5)} onFoundEgg={handleFoundEgg} />,
        5: <ScreenMiniGame onNext={() => setScreen(6)} onFoundEgg={handleFoundEgg} />,
        6: <ScreenGifts onNext={() => setScreen(7)} onFoundEgg={handleFoundEgg} />,
        7: <ScreenFinal onFoundEgg={handleFoundEgg} />
    };

    return (
        <div className={`min-h-screen font-sans text-gray-200 selection:bg-[#0f0] selection:text-black overflow-x-hidden ${screen === 7 ? 'bg-[#050505]' : 'bg-[#111]'}`}>
            
            {/* Confetti Container Layer */}
            <div id="confetti-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden"></div>

            {/* Header (Fixed Top) */}
            <header className="fixed top-0 w-full p-4 flex justify-between items-center z-40 bg-gradient-to-b from-[#000] to-transparent pointer-events-none">
                <div className="text-xs font-mono opacity-50 hidden sm:block pointer-events-auto">SYS_VER: 1.0.42 | STATUS: CLASSIFIED</div>
                <div className="flex gap-4 pointer-events-auto bg-black/50 p-2 rounded backdrop-blur-sm border border-gray-800">
                    <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className={eggs.length === 5 ? 'text-yellow-400 font-bold' : 'text-[#0f0]'}>SECRETS: {eggs.length}/5</span>
                        <div className="flex space-x-1">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i <= eggs.length ? (eggs.length === 5 ? 'bg-yellow-400 shadow-[0_0_5px_yellow]' : 'bg-[#0f0]') : 'bg-gray-700'}`}></div>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={() => setSoundEnabled(!soundEnabled)} 
                        className={`text-xs font-mono border px-2 py-1 transition-colors ${soundEnabled ? 'text-[#0f0] border-[#0f0]' : 'text-gray-500 border-gray-600'}`}
                    >
                        {soundEnabled ? 'SND: ON' : 'SND: OFF'}
                    </button>
                </div>
            </header>

            {/* Global Message Toast */}
            {globalMsg && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down pointer-events-none">
                    <div className="bg-[#0a192f] border border-[#0f0] text-[#0f0] px-6 py-2 font-mono shadow-[0_0_15px_rgba(0,255,0,0.5)] whitespace-nowrap">
                        {globalMsg}
                    </div>
                </div>
            )}

            {/* Easter Egg Success Banner */}
            {eggs.length === 5 && (
                <div className="fixed bottom-0 w-full z-50 bg-yellow-500 text-black text-center font-bold p-2 text-sm sm:text-base border-t-4 border-yellow-300 animate-slide-up shadow-[0_-5px_20px_rgba(250,204,21,0.5)]">
                    СЕКРЕТ ОБНАРУЖЕН: Ты нашёл всё. Уровень любопытства подтверждён! 🏆
                </div>
            )}

            {/* Main Content Area */}
            <main className="container mx-auto px-4 pt-20 pb-24 relative z-10 min-h-screen flex items-center justify-center">
                {screensMap[screen]}
            </main>

            {/* CSS styles inline for single-file requirement */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in-down { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
                @keyframes pulse-fast { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; box-shadow: 0 0 40px rgba(0,255,0,0.4); } }
                @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
                @keyframes shake { 
                    0% { transform: translate(1px, 1px) rotate(0deg); } 
                    10% { transform: translate(-1px, -2px) rotate(-1deg); } 
                    20% { transform: translate(-3px, 0px) rotate(1deg); } 
                    30% { transform: translate(3px, 2px) rotate(0deg); } 
                    40% { transform: translate(1px, -1px) rotate(1deg); } 
                    50% { transform: translate(-1px, 2px) rotate(-1deg); } 
                    60% { transform: translate(-3px, 1px) rotate(0deg); } 
                    70% { transform: translate(3px, 1px) rotate(-1deg); } 
                    80% { transform: translate(-1px, -1px) rotate(1deg); } 
                    90% { transform: translate(1px, 2px) rotate(0deg); } 
                    100% { transform: translate(1px, -2px) rotate(-1deg); } 
                }
                
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
                .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
                .animate-pulse-fast { animation: pulse-fast 2s infinite; }
                .animate-scan { animation: scan 3s linear infinite; }
                .animate-shake { animation: shake 0.5s; animation-iteration-count: infinite; }
                
                /* Custom Scrollbar for a more terminal feel */
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #111; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; border: 1px solid #111; }
                ::-webkit-scrollbar-thumb:hover { background: #0f0; }
            `}} />
        </div>
    );
}