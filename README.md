Canvas inspect
==============
Canvas inspect is a wrapper around the html5 canvas context. It records state changes and function calls to the context object that then can be replayed later.

Usage
=====

```js
//Get the canvas element and wrap its context.
var canvas = document.getElementById("screen"),
    ctx = wrapContext(canvas.getContext("2d"));

//Record some state changes and function calls
ctx.startRecording();
ctx.fillStyle = "#f00";
ctx.fillRect(0, 0, 800, 600);
ctx.stopRecording();

//Replay the last frame with 1 second delay between function calls.
ctx.replayFrame(-1, 1000);
```

Todo
====
  - Examples with GUI
  - Saving frames to JSON.

License
=======
Copyright (c) 2013 Jakob Hillerström

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.