// console.log(`Самооценка - 105 баллов 
// Не сделано: 
// Калькулятор продажи билетов в форме продажи билетов
// Валидация формы
// Интерактивная карта в секции Contacts
// Любой собственный дополнительный функционал

// Отзыв по пунктам ТЗ:

// Частично выполненные пункты:
// 1) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно 

// Выполненные пункты:
// 1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам 

// 2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки 

// 3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) 

// 4) слайды перелистываются плавно с анимацией смещения вправо или влево 

// 5) перелистывание слайдов бесконечное (зацикленное) 

// 6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

// 7) при перелистывании слайдов кликами или свайпами меняется номер активного слайда 

// 8) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

// 9) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят 

// 10) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео 

// 11) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео 

// 12) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео 

// 13) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) 

// 14) перелистывание слайдов бесконечное (зацикленное) 

// 15) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

// 16) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

// 17) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

// 18) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

// 19) прогресс-бар отображает прогресс проигрывания видео 

// 20) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео 

// 21) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" 

// 22) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) 

// 23) при перемещении ползунка громкости звука изменяется громкость видео 

// 24) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой 

// 25) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой 

// 26) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем 

// 27) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними 

// 28) клавиша Пробел — пауза, при повторном нажатии - play 

// 29) Клавиша M (англ) — отключение/включение звука 

// 30) Клавиша F — включение/выключение полноэкранного режима 

// 31) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика 

// 32) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика 

// 33) ползунок можно перетягивать мышкой по горизонтали 

// 34) ползунок никогда не выходит за границы картины 

// 35) при перемещении ползунка справа налево плавно появляется нижняя картина 

// 36) при перемещении ползунка слева направо плавно появляется верхняя картина 

// 37) при обновлении страницы ползунок возвращается в исходное положение 

// 38) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ 

// 39) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется 

// 40) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется 

// 41) при изменении количества билетов Basic и Senior пересчитывается общая цена за них 

// 42) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них 

// 43) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них 

// `)