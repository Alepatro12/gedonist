import './style.css';
import React, { useLayoutEffect } from 'react';

const Fortune = () => {
	// надписи и цвета на секторах
const prizes = [
  //   {
  //     text: "OMORI",
  //     color: "hsl(197 30% 43%)",
  //   },
  //   { 
  //     text: "The Witcher",
  //     color: "hsl(43 74% 66%)",
  //   },
  //   {
  //     text: "NieR Replicant ver.1.22474487139..",
  //     color: "hsl(27 87% 67%)",
  //   },
  //   {
  //     text: "Vampire: The Masquerade - Bloodlines",
  //     color: "hsl(12 76% 61%)",
  //   },
  //   {
  //     text: "Final Fantasy XV",
  //     color: "hsl(350 60% 52%)",
  //   },
  //   {
  //     text: "Othercide",
  //     color: "hsl(270 87% 67%)",
  //   },
  //   {
  //     text: "Stronghold Legends",
  //     color: "hsl(91 43% 54%)",
  //   },
  //   {
  //     text: "Star Wars: Knights of the Old Republic",
  //     color: "hsl(140 36% 74%)",
  //   },
	// {
  //     text: "Disciples: Sacred Lands - Gold",
  //     color: "hsl(12 56% 64%)",
  // },
	// {
	// 	text: "Code Vein",
	// 	color: "hsl(72 46% 54%)",
	// },
	// {
	// 	text: "King Arthur: The Role-playing Wargame",
	// 	color: "hsl(220 56% 64%)",
	// },
	// {
  //   	text: "Mass Effect: Andromeda",
  //   	color: "hsl(300 46% 74%)",
  //   },
    {
      text: "Elven Legacy",
      color: "hsl(197 30% 43%)",
    },
    { 
      text: "Frostpunk",
      color: "hsl(43 74% 66%)",
    },
    {
      text: "DreadOut",
      color: "hsl(27 87% 67%)",
    },
    {
      text: "Call of the Sea",
      color: "hsl(12 76% 61%)",
    },
    {
      text: "Devil May Cry 2",
      color: "hsl(350 60% 52%)",
    },
    {
      text: "Silent Hill",
      color: "hsl(270 87% 67%)",
    },
    {
      text: "The Legend of Tianding",
      color: "hsl(91 43% 54%)",
    },
    {
      text: "The Closing Shift",
      color: "hsl(140 36% 74%)",
    },
	{
      text: "The Coma: Cutting Class",
      color: "hsl(12 56% 64%)",
  },
	{
		text: "Warhammer 40,000: Dawn of War - Winter Assault",
		color: "hsl(72 46% 54%)",
	},
	{
		text: "Drakengard",
		color: "hsl(220 56% 64%)",
	},
	{
    	text: "Bastion",
    	color: "hsl(300 46% 74%)",
    },
  ];
  
  useLayoutEffect(() => {
	const wheel = document.querySelector(".deal-wheel");
	const spinner = wheel.querySelector(".spinner");
	const trigger = wheel.querySelector(".btn-spin");
	const ticker = wheel.querySelector(".ticker");
  // на сколько секторов нарезаем круг
  let prizeSlice = 360 / prizes.length;
  // на какое расстояние смещаем сектора друг относительно друга
  let prizeOffset = Math.floor(180 / prizes.length);
  // прописываем CSS-классы, которые будем добавлять и убирать из стилей
  const spinClass = "is-spinning";
  const selectedClass = "selected";
  // получаем все значения параметров стилей у секторов
	let spinnerStyles = window.getComputedStyle(spinner);
  
  // переменная для анимации
  let tickerAnim;
  // угол вращения
  let rotation = 0;
  // текущий сектор
  let currentSlice = 0;
  // переменная для текстовых подписей
  let prizeNodes;
  let count = null;
  
  // расставляем текст по секторам
  const createPrizeNodes = () => {
	prizeSlice = 360 / prizes.length;
	prizeOffset = Math.floor(180 / prizes.length);
    // обрабатываем каждую подпись
	spinner.replaceChildren();
    prizes.forEach(({ text, color, reaction }, i) => {
      // каждой из них назначаем свой угол поворота
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      // добавляем код с размещением текста на страницу в конец блока spinner
      spinner.insertAdjacentHTML(
        "beforeend",
        // текст при этом уже оформлен нужными стилями
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
          <span class="text">${text}</span>
        </li>`
      );
    });
  };
  
  // рисуем разноцветные секторы
  const createConicGradient = () => {
    // устанавливаем нужное значение стиля у элемента spinner
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          // получаем цвет текущего сектора
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
  };
  
  // создаём функцию, которая нарисует колесо в сборе
  const setupWheel = () => {
    // сначала секторы
    createConicGradient();
    // потом текст
    createPrizeNodes();
    // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
    prizeNodes = wheel.querySelectorAll(".prize");
  };
  
  // определяем количество оборотов, которое сделает наше колесо
  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // функция запуска вращения с плавной остановкой
  const runTickerAnimation = () => {
	spinnerStyles = window.getComputedStyle(spinner);
    // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);
    
    if (rad < 0) rad += (2 * Math.PI);
    
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    // анимация язычка, когда его задевает колесо при вращении
    // если появился новый сектор
    if (currentSlice !== slice) {
      // убираем анимацию язычка
      ticker.style.animation = "none";
      // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
      setTimeout(() => ticker.style.animation = null, 10);
      // после того, как язычок прошёл сектор - делаем его текущим 
      currentSlice = slice;
    }
    // запускаем анимацию
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };
  
  // функция выбора призового сектора
  const selectPrize = () => {
    const selected = Math.floor(rotation / prizeSlice);
    prizeNodes[selected].classList.add(selectedClass);
	count = selected;
  };
  
  // отслеживаем нажатие на кнопку
  trigger.addEventListener("click", () => {
	if (count !== null && prizes.length > 1) {
		prizes.splice(count, 1);
		setupWheel();
	}
    // делаем её недоступной для нажатия
    trigger.disabled = true;
    // задаём начальное вращение колеса
    rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
    // убираем прошлый приз
    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
    wheel.classList.add(spinClass);
    // через CSS говорим секторам, как им повернуться
    spinner.style.setProperty("--rotate", rotation);
    // возвращаем язычок в горизонтальную позицию
    ticker.style.animation = "none";
    // запускаем анимацию вращение
    runTickerAnimation();
  });
  
  // отслеживаем, когда закончилась анимация вращения колеса
  spinner.addEventListener("transitionend", () => {
    // останавливаем отрисовку вращения
    cancelAnimationFrame(tickerAnim);
    // получаем текущее значение поворота колеса
    rotation %= 360;
    // выбираем приз
    selectPrize();
    // убираем класс, который отвечает за вращение
    wheel.classList.remove(spinClass);
    // отправляем в CSS новое положение поворота колеса
    spinner.style.setProperty("--rotate", rotation);
    // делаем кнопку снова активной
    trigger.disabled = false;
  });
  
  // подготавливаем всё к первому запуску
  setupWheel();
});

	return (
		<div className="center">
			<div className="deal-wheel">
				<ul className="spinner"></ul>
				<div className="ticker"></div>
				<button className="btn-spin">Кликайте сюда, госпожа</button>
			</div>
		</div>
	);
}

export default Fortune;