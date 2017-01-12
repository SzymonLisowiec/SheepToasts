/*****************************************************
 Name: SheepToasts
 Version: 1.0
 Author: Szymon Lisowiec
 Github: https://github.com/SzymonLisowiec/SheepToasts
 License: MIT
*****************************************************/
function SheepToasts(config){
  'use strict';
  
  if(typeof config == 'undefined') config = {};
  
  var _private = {
  	
    animation: (typeof config.animation == 'object')?config.animation:false,
    sort: (config.sort == 'top')?'top':'bottom',
    toastMargin: (typeof config.toastMargin == 'number')?config.toastMargin:4,
    delayRemove: (typeof config.delayRemove == 'number')?config.delayRemove:5000,
    
    cssMain: {
    	display: 'inline-block',
      maxWidth: '320px',
      padding: '5px 8px',
      position: 'fixed',
      top: 'auto',
      right: '32px',
      bottom: '32px',
      left: 'auto',
      borderRadius: '3px',
      wordBreak: 'break-all',
      fontFamily: 'cursive, sans-serif',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'top 0.32s, bottom 0.32s',
      webKitAnimationDuration: '0.5s',
      mozAnimationDuration: '0.5s',
      oAnimationDuration: '0.5s',
      animationDuration: '0.5s'
    },
    cssButtons: {
    	display: 'inline-block',
      height: '20px',
      margin: '-3px 0 0 3px',
      padding: '0 5px',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      border: 'none',
      borderRadius: '10px',
      fontFamily: 'inherit',
      fontSize: '11px',
      cursor: 'pointer'
    },
    cssModes: {
    	warning: {
      	color: '#fafeff',
      	background: '#c8354e',
        textShadow: '#e74c3c 1px 2px 1px',
        _buttons: {
        	color: '#fafeff',
          textShadow: '#46231f 0px 0px 3px',
          background: '#e25353'
        }
      },
      info: {
      	color: '#fafeff',
      	background: '#2980b9',
        textShadow: '#3498db 1px 2px 1px',
        _buttons: {
        	color: '#fafeff',
          textShadow: '#173646 0px 0px 3px',
          background: '#2c9fea'
        }
      },
      success: {
      	color: '#fafeff',
      	background: '#27ae60',
        textShadow: '#1e7744 1px 2px 1px',
        _buttons: {
        	color: '#fafeff',
          textShadow: '#185833 0px 0px 3px',
          background: '#5ac17f'
        }
      }
    },
    
    root: null,
    toasts: {},
    toastCounter: 0,
    toastsMonster: null,
    
  	init: function(){
    	
      if(typeof config.cssMain != 'undefined')
      	for(var key in config.cssMain) _private.cssMain[key] = config.cssMain[key];
      if(typeof config.cssButtons != 'undefined')
      	for(var key in config.cssButtons) _private.cssButtons[key] = config.cssButtons[key];
      if(typeof config.cssModes != 'undefined')
      	for(var key in config.cssModes) _private.cssModes[key] = config.cssModes[key];
      
      if(_private.cssMain.top != 'auto' && _private.cssMain.top != 'auto')
      	return console.error('SheepToasts :: One cssMain property of "top" and "bottom" have to be set on "auto"');
      
      _private.root = document.createElement('div');
      _private.root.setAttribute('id', 'SheepToasts');
      _private.root.style.width = 0;
      _private.root.style.height = 0;
      _private.root.style.overflow = 'visable';
      _private.root.style.position = 'fixed';
      _private.root.style.top = 0;
      _private.root.style.left = 0;
      _private.root
      _private.body = document.getElementsByTagName('body')[0];
      _private.body.insertBefore(_private.root, _private.body.firstChild);
      delete _private.body;
      
      if(_private.animation && typeof _private.animation.duration != 'undefined'){
      	_private.cssMain.webKitanimationDuration = _private.animation.duration;
      	_private.cssMain.mozanimationDuration = _private.animation.duration;
        _private.cssMain.oanimationDuration = _private.animation.duration;
      	_private.cssMain.animationDuration = _private.animation.duration;
      }
      
      _private.toastMonser = setInterval(function(){
        for(var toast in _private.toasts){
        	toast = _private.toasts[toast];
        	if(typeof toast.dataset.timeRemove != 'undefined' && new Date().getTime() >= toast.dataset.timeRemove)
          	_public.close(toast.id);
        }
      }, 100);
      
    },
  	
  };
  
  var _public = {
  	
  	show: function(mode, msg, animation, buttons){
    	
      if(typeof _private.cssModes[mode] != 'undefined'){
      	
        var latestToast = document.getElementById('SheepToast-'+_private.toastCounter);
        var toast = document.createElement('div');
        _private.toastCounter++;
        toast.dataset.count = _private.toastCounter;
        toast.setAttribute('id', 'SheepToast-'+_private.toastCounter);
        _private.toasts['SheepToast-'+_private.toastCounter] = toast;
        toast.innerHTML = msg;
        for(var key in _private.cssMain)
        	toast.style[key] = _private.cssMain[key];
        for(var key in _private.cssModes[mode])
        	if(key != '_buttons') toast.style[key] = _private.cssModes[mode][key];
       	if(_private.animation) toast.className = 'animated '+_private.animation.in;
        if(typeof animation == 'string') toast.className = 'animated '+animation;
        _private.root.append(toast);
        
        if(_private.sort == 'top' && latestToast != null){
        	var d = (toast.style.top != 'auto')?'top':'bottom';
          toast.style[d] = parseFloat(latestToast.offsetHeight)+parseFloat(latestToast.style[d])+_private.toastMargin+'px';
        }else{
        	for(var k in _private.toasts){
          	if(k != toast.id){
            	_private.toasts[k].style[_private.sort] = parseFloat(_private.toasts[k].style[_private.sort])+parseFloat(toast.offsetHeight)+_private.toastMargin+'px';
            }
          }
        }
        
        if(typeof buttons == 'object'){
        	for(var key in buttons){
          	var data = buttons[key];
          	var button = document.createElement('button');
            button.setAttribute('id', 'SheepToast-button-'+key);
            button.innerHTML = data.value;
            for(var key in _private.cssButtons)
        			button.style[key] = _private.cssButtons[key];
           	for(var key in _private.cssModes[mode]._buttons)
        			button.style[key] = _private.cssModes[mode]._buttons[key];
            
            button.toastId = toast.id;
            if(typeof data.callback != 'undefined') button.onclick = data.callback;
            
            button.addEventListener('focus', function(){ this.style.outline = 'none'; });
            
            toast.append(button);
          }
        }else{
        	toast.dataset.timeRemove = new Date().getTime()+_private.delayRemove;
        	toast.addEventListener('click', function(){
          	_public.close(toast.id);
          });
        }
        
      }else console.error('SheepToast :: Selected toast mode not exists.');
      
    },
    
    warning: function(msg, animation, buttons){ _public.show('warning', msg, animation, buttons); },
    info: function(msg, animation, buttons){ _public.show('info', msg, animation, buttons); },
    success: function(msg, animation, buttons){ _public.show('success', msg, animation, buttons); },
  	
    close: function(id, animation){
    	if(_private.animation || typeof animation == 'string'){
        ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'].forEach(function(event){
          _private.toasts[id].addEventListener(event, function(event){
            if(typeof _private.toasts[id] != 'undefined'){
              if(_private.sort == 'bottom'){
                for(var k in _private.toasts){
                  if(k == id) break;
                  var toast = _private.toasts[k];
                  var d = (toast.style.top != 'auto')?'top':'bottom';
                  toast.style[d] = parseFloat(toast.style[d])-parseFloat(_private.toasts[id].offsetHeight)-_private.toastMargin+'px';
                }
              }else{
              	for(var k in _private.toasts){
                  if(_private.toasts[k].dataset.count > _private.toasts[id].dataset.count){
                    var toast = _private.toasts[k];
                    var d = (toast.style.top != 'auto')?'top':'bottom';
                    toast.style[d] = parseFloat(toast.style[d])-parseFloat(_private.toasts[id].offsetHeight)-_private.toastMargin+'px';
                  }
                }
              }
              _private.toasts[id].parentNode.removeChild(_private.toasts[id]);
              delete _private.toasts[id];
            }
          });
        });
        if(_private.animation) _private.toasts[id].className = 'animated '+_private.animation.out;
        if(typeof animation == 'string') _private.toasts[id].className = 'animated '+animation;
      }else{
      	//if(typeof _private.toasts[id] != 'undefined'){
          _private.toasts[id].parentNode.removeChild(_private.toasts[id]);
          delete _private.toasts[id];
        //}
      }
    }
    
  };
  
  _private.init();
  return _public;
  
}
