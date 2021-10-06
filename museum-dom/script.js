console.log(`Ваша оценка - 99 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) Форма покупки билетов 

2) слайдера сравнения изображений в секции "Explore" 

3) кастомного видеоплеера в секции "Video" 

4) слайдера в секции "Video" 

5) YouTube-видео в плейлисте в секции "Video", маленькие видео выровнены по краям большого 

6) карты 

7) Результат проверки скорости сайта для мобильных устройств: 0 to 49 (red): Poor - не выполнено 0 ,баллов; 50 to 89 (orange): Needs Improvement - частично выполнено - 4 баллов; 90 to 100 (green): Good - выполнено полностью - 8 баллов 

Частично выполненные пункты:
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

12) Секция Welcome 

13) Секция Visiting 

14) Секция Explore 

15) Секция Video 

16) Секция Gallery 

17) Секция Tickets 

18) Секция Contacts 

19) Блок footer  

20) слайдера в секции "Welcome" 

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

11) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки,  элементы не должны скрываться, обрезаться, наезжать друг на друга, если это не предусмотрено макетом. 

12) галереи изображений и изображений в ней 

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
