# SheepToasts
Light weight and simple custom alerts (toasts) in pure JavaScript.
 **Warning: You have to use [Animate.css](https://daneden.github.io/animate.css/), to use animations of toasts.**

## Constructor
```JavaScript
var SheepToasts = new SheepToasts(options);
```
- **options** - The configuration. [object]

## Options
- **animation** - Names of animations for "In" and "Out". [object] [Default: none]
```JavaScript
/* Example: */
{
  in: 'fadeIn', //Default: none
  out: 'fadeOut', //Default: none
  duration: '1s' //Default: 0.5s
}
```
- **sort** - This have to set on "top" (new toasts on top) or "bottom (new toasts on bottom) [string] [Default: bottom]
- **toastMargin** - Space between toasts in pixels [integer] [Default: 4]
- **delayRemove** - The time (in ms) after which toast will be removed (Not working, if toast have buttons) [function] [Default: 5000]
- **cssMain** - Basic CSS of toasts.  [object] [Default: below]
```JavaScript
{
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
  transition: 'top 0.32s, bottom 0.32s'
}
```
- **cssButtons** - Basic CSS of buttons.  [object] [Default: below]
```JavaScript
{
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
}
```
- **cssModes** - Can you add custom mode or edit existing.  [object] [Default: success/info/warning]
```JavaScript
//Simple example on "success" mode:
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
```

## Methods

#show(mode, message, animation, buttons)
- **mode** - success, info, warning or your custom modes.  [string] [Required]
- **message** - message  [string] [Required]
- **animation** - Name of animation for show toast. [string] [Default: Using animation from global options]
- **buttons** - Buttons  [object] [Default: none]
```JavaScript
//Example:
SheepToasts.show('info', 'We use cookies to give you the best experience on our website.', null, {
  ok: { //Id of button: SheepToast-button-ok
    value: 'Accept', //Text in button
    callback: function(){
      console.log(this.id+' has been clicked!');
      SheepToasts.close(this.toastid);
    }
  }
});
```

#success(message, animation, buttons)
Alias for show() with set mode on "success".

#info(message, animation, buttons)
Alias for show() with set mode on "info".

#warning(message, animation, buttons)
Alias for show() with set mode on "warning".

#close(id, animation)
- **id** - Id of toast. Each toast have id "SheepToast-NumberOfToast", for example "SheepToast-1".  [string] [Required]
- **animation** - Name of animation for close toast. [string] [Default: Using animation from global options]

##Some examples

#Show success toast:
```JavaScript
SheepToasts.success('All right.');
```

#"Are you sure?" toast
```
SheepToasts.warning('Are you sure?', null, {
  yes: {
    value: 'Yes',
    callback: function(){
    	alert('You are sure!');
      SheepToasts.close(this.toastId);
    }
  },
  no: {
  	value: 'No',
    callback: function(){
    	SheepToasts.close(this.toastId);
    }
  }
});
```

##License
MIT License

Copyright (c) 2017 Kysune

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
