console.log(`
Ваша оценка - 72 балла 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) Секция Explore 

2) Секция Video 

3) Секция Tickets 

4) Форма покупки билетов 

5) Секция Contacts 

6) Секция Visiting 

7) Секция Explore 

8) Секция Video 

9) Секция Gallery 

10) Секция Tickets 

11) Форма покупки билетов 

12) Секция Contacts 

13) Блок footer  

14) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки,  элементы не должны скрываться, обрезаться, наезжать друг на друга, если это не предусмотрено макетом. 

15) слайдера сравнения изображений в секции "Explore" 

16) YouTube-видео в плейлисте в секции "Video", маленькие видео выровнены по краям большого 

17) галереи изображений и изображений в ней 

18) карты 

19) Результат проверки скорости сайта для мобильных устройств: 0 to 49 (red): Poor - не выполнено 0 ,баллов; 50 to 89 (orange): Needs Improvement - частично выполнено - 4 баллов; 90 to 100 (green): Good - выполнено полностью - 8 баллов 

Частично выполненные пункты:
1) Секция Welcome 

2) Секция Visiting 

3) Секция Gallery 

4) Блок footer  

5) Блок header 

6) Секция Welcome 

7) кастомного видеоплеера в секции "Video" 

8) слайдера в секции "Video" 

Выполненные пункты:
1) Блок header 

2) Секция Welcome 

3) Секция Visiting 

4) Секция Explore 

5) Секция Video 

6) Секция Gallery 

7) Секция Tickets 

8) Форма покупки билетов 

9) Секция Contacts 

10) Блок footer  

11) Блок header 

12) слайдера в секции "Welcome" 

13) при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку 

14) ссылки в меню работают, обеспечивая плавную прокрутку по якорям 

15) при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается 

16) вёрстка меню соответствует макету на всех проверяемых разрешениях 

`)
const progressVideo = document.querySelector('.progress-video');

progressVideo.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
})

const progressVolume = document.querySelector('.progress-volume');

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
})

document.getElementById("menu-toggle").onclick = function () {
  document.body.classList.toggle("mobile-menu-close")
  document.body.classList.toggle("mobile-menu-open")
}
