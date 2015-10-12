Пример:

hlike.set({
  vkKey: '5100067',
  fbKey: '1550284425231361',
  url: document.location.href,
  style: hlike.defaultStyle
}).vk('.hLike.vk')
  .fb('.hLike.facebook');

Можно указать собственные стили:
hlike.set({
  style: {
    widget: {
      width: '1em',
      height: '1em'
    },
    widget_iframe: {
      position: 'absolute',
      opacity: 0,
      overflow: 'hidden',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%'
    }
  }
})

Или дефолтные:
hlike.set({
  style: hlike.defaultStyle
});

Или никаких.

Если стили не указаны вообще, то никаких стилей не применится, включая дефолтные. 
Разумеется любые стили всегда можно указать в css (дублировать их в js не нужно).

Любые свойства можно либо прямо присвоить:

hlike.url = 'http://expample.com';

Либо передать объектом в метод set:

hlike.set({
  vkKey: '11111111',
  fbKey: '0000000000000000',
  url: document.location.href,
  style: hlike.defaultStyle
});

Метод возвращает this.

Далее вызываем методы соцсетей с css-селектором в единственном аттрибуте:

hlike.fb('.fbLike')
     .vk('.vkLike');

Если нужно вызывать их с какими-либо разными параметрами сначала вызываем set:

hlike.set({url: document.location.href+'?sn=vk'}).vk('.vkLike')
     .set({url: document.location.href+'?sn=fb'}).fb('.fbLike');

На момент написания этого текста доступны только лайки.

Общая идея в том, чтобы динамически создать внутри свёрстанного элемента с нужным внешним видом прозрачный абсолютно спозиционированный блок на всю ширину и высоту элемента и инициализировать внутри виджет соцсети, при том по возможности удобным способом. Таким образом мы получаем какой угодно внешний вид социальных кнопок, при этом они будут реагировать на наведение и т.п. Кликая по ним пользователь кликает по прозрачному виджету поверх. 

Ближайшие планы:

Вторым аттрибутом добавить селектор либо коллбек для счётчика лайков и каким-либо образом его заполнять;
Помимо селекоторов принимать массивы и коллекции элементов;
Добавить поддержку других (сейчас только vk и facebook);
Добавить поддержку шейров (сейчас только лайки);