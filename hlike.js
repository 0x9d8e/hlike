var hlike = {
  fbKey: '',
  vkKey: '',
  url: document.location.href,
  style: {},
  defaultStyle: {
    widget: {
      height: '0',
      width: '0'
    },
    widget_iframe: {
      display: 'inline-block',
      position: 'absolute',
      width: '18px',
      height: '18px',
      top: '0px',
      left: '0px',
      overflow: 'hidden',
      opacity: 0,
    }
  },
  set: function(params) {
    for(var key in params) {
      hlike[key] = params[key];
    }
    return hlike;
  },
  
  fb: {
    like: function(selector) {
        var d = document;
        var elements = d.querySelectorAll(selector);

        hlike.fb.widgets = elements;

        for(var i = hlike.fb.widgets.length-1; i >= 0; i--) {
          var widget = hlike.fb.widgets[i];

          var widgetFrame = d.createElement('div'); 

          widget.appendChild(widgetFrame);

          widgetFrame.setAttribute('class', 'hlike-frame fb-like');
          widgetFrame.setAttribute('data-href', hlike.url);
          widgetFrame.setAttribute('data-layout', 'button');
          widgetFrame.setAttribute('data-action', 'like');
          widgetFrame.setAttribute('data-show-faces', 'true');
          widgetFrame.setAttribute('data-share', 'false');

          hlike._hide(widget);
        }

        setTimeout(function(){
          hlike.fb._init();
        }, 0);

        return hlike;
    },
    _init: function(callback) {
      var d = document;

      if (!d.getElementById(hlike.fb._id)) {
        hlike.fb._js = d.createElement('script'); 
        hlike.fb._js.setAttribute('id', hlike.fb.id);
        hlike.fb._js.onload = function() {
          if(typeof(callback) !== 'undefined')
            callback();

          setTimeout(function(){
            FB.Event.subscribe('edge.create', hlike.fb._liked);
            FB.Event.subscribe('edge.remove', hlike.fb._unliked);
          }, 100);
        };

        if(!d.getElementById('fb-root')) {
           hlike.fb._root = d.createElement("div"); 
           hlike.fb._root.setAttribute('id', 'fb-root'); 
           d.querySelector('body').appendChild(hlike.fb._root);
        }

        hlike._fs.parentNode.insertBefore(hlike.fb._js, hlike._fs);
        hlike.fb._js.setAttribute('src', '//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.5&appId='+hlike.fbKey);
      }
    },
    liked: function(callback) {
      hlike.fb._liked = callback;
      return hlike;
    },

    unliked: function(callback) {
      hlike.fb._unliked = callback;
      return hlike;
    },
    _id: 'facebook-jssdk',
    _liked: function(response) {},
    _unliked: function(response) {}
  },
  
  vk: {
    like: function(selector) {
        var d = document;
        var elements = d.querySelectorAll(selector);
        hlike.vk.widgets = elements;
        hlike.vk._init(function(){
          VK.init({apiId: hlike.vkKey, onlyWidgets: true});

          for(var i = hlike.vk.widgets.length-1; i >= 0; i--) {
            var widget = hlike.vk.widgets[i];
            var widgetFrame = d.createElement('div'); 

            widget.appendChild(widgetFrame);

            widgetFrame.setAttribute('class', 'hlike-frame vk_like');
            widgetFrame.setAttribute('id', 'vk_like_'+i);

            VK.Widgets.Like("vk_like_"+i, {type: "mini"});

            setTimeout(function(){
              hlike._hide(widget);
            }, 50);
          }
       });

       return hlike;
    },
    liked: function(callback) {
      hlike.vk._liked = callback;
      return hlike;
    },
    unliked: function(callback) {
      hlike.vk._unliked = callback;
      return hlike;
    },
    _init: function(callback) {
      var d = document;

      hlike.vk._js = d.createElement('script'); 
      hlike.vk._js.onload = function() {
        if(typeof(callback) !== 'undefined')
          callback();
        
        setTimeout(function(){
          VK.Observer.subscribe('widgets.like.liked', hlike.vk._liked);
          VK.Observer.subscribe('widgets.like.unliked', hlike.vk._unliked);
        }, 0);
      };

      hlike._fs.parentNode.insertBefore(hlike.vk._js, hlike._fs);
      hlike.vk._js.setAttribute('src', '//vk.com/js/api/openapi.js?117');

    },
    _liked: function(response) {},
    _unliked: function(response) {}
  },
  
  gp: {
    like: function(selector) {
      var d = document;
      var elements = d.querySelectorAll(selector);
      hlike.gp.widgets = elements;

      for(var i = hlike.gp.widgets.length-1; i >= 0; i--) {
        var widget = hlike.gp.widgets[i];
        var widgetFrame = d.createElement('div'); 

        widget.appendChild(widgetFrame);

        widgetFrame.setAttribute('class', 'hlike-frame');
        widgetFrame.setAttribute('data-size', 'small');

        var widgetFrameInner = d.createElement('div');
        widgetFrame.appendChild(widgetFrameInner);
        widgetFrameInner.setAttribute('class', 'g-plusone');
        widgetFrameInner.setAttribute('id', 'g-plusone-'+i);

      }

      hlike.gp._init(function(){
        setTimeout(function() {
          for(var i = hlike.gp.widgets.length-1; i >= 0; i--) {
            var widget = hlike.gp.widgets[i];
            hlike._hide(widget);
          }
        }, 0);
      });

      return hlike;
    },
    _init: function(callback) {
      var d = document;
      hlike.gp._js = d.createElement('script'); 
      hlike.gp._js.onload = callback;

      hlike.gp._js.setAttribute('src', 'https://apis.google.com/js/platform.js');
      hlike._fs.parentNode.insertBefore(hlike.gp._js, hlike._fs);
    },
  },
  
  pin: {
    like: function(selector) {
      var d = document;
      var elements = d.querySelectorAll(selector);
      hlike.pin.widgets = elements;

      for(var i = hlike.pin.widgets.length-1; i >= 0; i--) {
        var widget = hlike.pin.widgets[i];
        var widgetFrame = d.createElement('a'); 

        widget.appendChild(widgetFrame);

        widgetFrame.setAttribute('data-pin-do', 'buttonBookmark');
        widgetFrame.setAttribute('data-pin-color', 'red');
        widgetFrame.setAttribute('href', '//www.pinterest.com/pin/create/button/');

        var img = d.createElement('img');
        img.src = '//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_20.png';
        widgetFrame.appendChild(img);
      }

      hlike.pin._init(function(){
        /*
         *  Этот ужас нужно будет как-то убрать. Pinterest вродебы поддерживает некий коллбек, но на деле не вызывает его, а onload скрипта слишком рано.
         */
        var pinInterval = setInterval(function() {
          for(var i = hlike.pin.widgets.length-1; i >= 0; i--) {
            var widget = hlike.pin.widgets[i];
            hlike.pin._hide(widget);
          }
        }, 1000);//The Kostyl' :)
        setTimeout(function(){
          clearInterval(pinInterval);
        }, 1000*20);
      });
    },
    _init: function(callback) {
      var d = document;
      hlike.pin._js = d.createElement('script'); 
      hlike.pin._js.onload = callback;

      hlike._fs.parentNode.insertBefore(hlike.pin._js, hlike._fs);

      hlike.pin._js.setAttribute('defer', 'defer');
      hlike.pin._js.setAttribute('src', '//assets.pinterest.com/js/pinit.js');
    },
    _hide: function(widget) {
      var widget_iframe = widget.childNodes[0];
      for(var key in hlike.style.widget) {
        widget.style.cssText += key+':'+hlike.style.widget[key]+' !important';
      }
      for(var key in hlike.style.widget_iframe) {
        widget_iframe.style.cssText += key+':'+hlike.style.widget_iframe[key]+' !important';
      }
    }
  },
 
  _hide: function(widget) {
    var widget_iframe = widget.querySelector('.hlike-frame');
    for(var key in hlike.style.widget) {
      widget.style[key] = hlike.style.widget[key];
    }
    for(var key in hlike.style.widget_iframe) {
      widget_iframe.style[key] = hlike.style.widget_iframe[key];
    }
  },
  
  _fs: document.getElementsByTagName('script')[0]
};