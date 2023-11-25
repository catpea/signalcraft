(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/wheel/index.js
  var require_wheel = __commonJS({
    "node_modules/wheel/index.js"(exports, module) {
      module.exports = addWheelListener;
      module.exports.addWheelListener = addWheelListener;
      module.exports.removeWheelListener = removeWheelListener;
      function addWheelListener(element, listener, useCapture) {
        element.addEventListener("wheel", listener, useCapture);
      }
      function removeWheelListener(element, listener, useCapture) {
        element.removeEventListener("wheel", listener, useCapture);
      }
    }
  });

  // node_modules/bezier-easing/src/index.js
  var require_src = __commonJS({
    "node_modules/bezier-easing/src/index.js"(exports, module) {
      var NEWTON_ITERATIONS = 4;
      var NEWTON_MIN_SLOPE = 1e-3;
      var SUBDIVISION_PRECISION = 1e-7;
      var SUBDIVISION_MAX_ITERATIONS = 10;
      var kSplineTableSize = 11;
      var kSampleStepSize = 1 / (kSplineTableSize - 1);
      var float32ArraySupported = typeof Float32Array === "function";
      function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
      }
      function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
      }
      function C(aA1) {
        return 3 * aA1;
      }
      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }
      function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
      }
      function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
          currentT = aA + (aB - aA) / 2;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
      }
      function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);
          if (currentSlope === 0) {
            return aGuessT;
          }
          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
      }
      function LinearEasing(x) {
        return x;
      }
      module.exports = function bezier(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
          throw new Error("bezier x values must be in [0, 1] range");
        }
        if (mX1 === mY1 && mX2 === mY2) {
          return LinearEasing;
        }
        var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
        for (var i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
        function getTForX(aX) {
          var intervalStart = 0;
          var currentSample = 1;
          var lastSample = kSplineTableSize - 1;
          for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
          }
          --currentSample;
          var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
          var guessForT = intervalStart + dist * kSampleStepSize;
          var initialSlope = getSlope(guessForT, mX1, mX2);
          if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0) {
            return guessForT;
          } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
          }
        }
        return function BezierEasing(x) {
          if (x === 0) {
            return 0;
          }
          if (x === 1) {
            return 1;
          }
          return calcBezier(getTForX(x), mY1, mY2);
        };
      };
    }
  });

  // node_modules/amator/index.js
  var require_amator = __commonJS({
    "node_modules/amator/index.js"(exports, module) {
      var BezierEasing = require_src();
      var animations = {
        ease: BezierEasing(0.25, 0.1, 0.25, 1),
        easeIn: BezierEasing(0.42, 0, 1, 1),
        easeOut: BezierEasing(0, 0, 0.58, 1),
        easeInOut: BezierEasing(0.42, 0, 0.58, 1),
        linear: BezierEasing(0, 0, 1, 1)
      };
      module.exports = animate;
      module.exports.makeAggregateRaf = makeAggregateRaf;
      module.exports.sharedScheduler = makeAggregateRaf();
      function animate(source, target, options) {
        var start = /* @__PURE__ */ Object.create(null);
        var diff = /* @__PURE__ */ Object.create(null);
        options = options || {};
        var easing = typeof options.easing === "function" ? options.easing : animations[options.easing];
        if (!easing) {
          if (options.easing) {
            console.warn("Unknown easing function in amator: " + options.easing);
          }
          easing = animations.ease;
        }
        var step = typeof options.step === "function" ? options.step : noop;
        var done = typeof options.done === "function" ? options.done : noop;
        var scheduler = getScheduler(options.scheduler);
        var keys2 = Object.keys(target);
        keys2.forEach(function(key) {
          start[key] = source[key];
          diff[key] = target[key] - source[key];
        });
        var durationInMs = typeof options.duration === "number" ? options.duration : 400;
        var durationInFrames = Math.max(1, durationInMs * 0.06);
        var previousAnimationId;
        var frame = 0;
        previousAnimationId = scheduler.next(loop);
        return {
          cancel
        };
        function cancel() {
          scheduler.cancel(previousAnimationId);
          previousAnimationId = 0;
        }
        function loop() {
          var t = easing(frame / durationInFrames);
          frame += 1;
          setValues(t);
          if (frame <= durationInFrames) {
            previousAnimationId = scheduler.next(loop);
            step(source);
          } else {
            previousAnimationId = 0;
            setTimeout(function() {
              done(source);
            }, 0);
          }
        }
        function setValues(t) {
          keys2.forEach(function(key) {
            source[key] = diff[key] * t + start[key];
          });
        }
      }
      function noop() {
      }
      function getScheduler(scheduler) {
        if (!scheduler) {
          var canRaf = typeof window !== "undefined" && window.requestAnimationFrame;
          return canRaf ? rafScheduler() : timeoutScheduler();
        }
        if (typeof scheduler.next !== "function")
          throw new Error("Scheduler is supposed to have next(cb) function");
        if (typeof scheduler.cancel !== "function")
          throw new Error("Scheduler is supposed to have cancel(handle) function");
        return scheduler;
      }
      function rafScheduler() {
        return {
          next: window.requestAnimationFrame.bind(window),
          cancel: window.cancelAnimationFrame.bind(window)
        };
      }
      function timeoutScheduler() {
        return {
          next: function(cb) {
            return setTimeout(cb, 1e3 / 60);
          },
          cancel: function(id) {
            return clearTimeout(id);
          }
        };
      }
      function makeAggregateRaf() {
        var frontBuffer = /* @__PURE__ */ new Set();
        var backBuffer = /* @__PURE__ */ new Set();
        var frameToken = 0;
        return {
          next,
          cancel: next,
          clearAll
        };
        function clearAll() {
          frontBuffer.clear();
          backBuffer.clear();
          cancelAnimationFrame(frameToken);
          frameToken = 0;
        }
        function next(callback) {
          backBuffer.add(callback);
          renderNextFrame();
        }
        function renderNextFrame() {
          if (!frameToken)
            frameToken = requestAnimationFrame(renderFrame);
        }
        function renderFrame() {
          frameToken = 0;
          var t = backBuffer;
          backBuffer = frontBuffer;
          frontBuffer = t;
          frontBuffer.forEach(function(callback) {
            callback();
          });
          frontBuffer.clear();
        }
        function cancel(callback) {
          backBuffer.delete(callback);
        }
      }
    }
  });

  // node_modules/ngraph.events/index.js
  var require_ngraph = __commonJS({
    "node_modules/ngraph.events/index.js"(exports, module) {
      module.exports = function eventify(subject) {
        validateSubject(subject);
        var eventsStorage = createEventsStorage(subject);
        subject.on = eventsStorage.on;
        subject.off = eventsStorage.off;
        subject.fire = eventsStorage.fire;
        return subject;
      };
      function createEventsStorage(subject) {
        var registeredEvents = /* @__PURE__ */ Object.create(null);
        return {
          on: function(eventName, callback, ctx) {
            if (typeof callback !== "function") {
              throw new Error("callback is expected to be a function");
            }
            var handlers = registeredEvents[eventName];
            if (!handlers) {
              handlers = registeredEvents[eventName] = [];
            }
            handlers.push({ callback, ctx });
            return subject;
          },
          off: function(eventName, callback) {
            var wantToRemoveAll = typeof eventName === "undefined";
            if (wantToRemoveAll) {
              registeredEvents = /* @__PURE__ */ Object.create(null);
              return subject;
            }
            if (registeredEvents[eventName]) {
              var deleteAllCallbacksForEvent = typeof callback !== "function";
              if (deleteAllCallbacksForEvent) {
                delete registeredEvents[eventName];
              } else {
                var callbacks = registeredEvents[eventName];
                for (var i = 0; i < callbacks.length; ++i) {
                  if (callbacks[i].callback === callback) {
                    callbacks.splice(i, 1);
                  }
                }
              }
            }
            return subject;
          },
          fire: function(eventName) {
            var callbacks = registeredEvents[eventName];
            if (!callbacks) {
              return subject;
            }
            var fireArguments;
            if (arguments.length > 1) {
              fireArguments = Array.prototype.splice.call(arguments, 1);
            }
            for (var i = 0; i < callbacks.length; ++i) {
              var callbackInfo = callbacks[i];
              callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
            }
            return subject;
          }
        };
      }
      function validateSubject(subject) {
        if (!subject) {
          throw new Error("Eventify cannot use falsy object as events subject");
        }
        var reservedWords = ["on", "fire", "off"];
        for (var i = 0; i < reservedWords.length; ++i) {
          if (subject.hasOwnProperty(reservedWords[i])) {
            throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
          }
        }
      }
    }
  });

  // node_modules/panzoom/lib/kinetic.js
  var require_kinetic = __commonJS({
    "node_modules/panzoom/lib/kinetic.js"(exports, module) {
      module.exports = kinetic;
      function kinetic(getPoint, scroll, settings) {
        if (typeof settings !== "object") {
          settings = {};
        }
        var minVelocity = typeof settings.minVelocity === "number" ? settings.minVelocity : 5;
        var amplitude = typeof settings.amplitude === "number" ? settings.amplitude : 0.25;
        var cancelAnimationFrame2 = typeof settings.cancelAnimationFrame === "function" ? settings.cancelAnimationFrame : getCancelAnimationFrame();
        var requestAnimationFrame2 = typeof settings.requestAnimationFrame === "function" ? settings.requestAnimationFrame : getRequestAnimationFrame();
        var lastPoint;
        var timestamp;
        var timeConstant = 342;
        var ticker;
        var vx, targetX, ax;
        var vy, targetY, ay;
        var raf;
        return {
          start,
          stop,
          cancel: dispose
        };
        function dispose() {
          cancelAnimationFrame2(ticker);
          cancelAnimationFrame2(raf);
        }
        function start() {
          lastPoint = getPoint();
          ax = ay = vx = vy = 0;
          timestamp = /* @__PURE__ */ new Date();
          cancelAnimationFrame2(ticker);
          cancelAnimationFrame2(raf);
          ticker = requestAnimationFrame2(track);
        }
        function track() {
          var now = Date.now();
          var elapsed = now - timestamp;
          timestamp = now;
          var currentPoint = getPoint();
          var dx = currentPoint.x - lastPoint.x;
          var dy = currentPoint.y - lastPoint.y;
          lastPoint = currentPoint;
          var dt = 1e3 / (1 + elapsed);
          vx = 0.8 * dx * dt + 0.2 * vx;
          vy = 0.8 * dy * dt + 0.2 * vy;
          ticker = requestAnimationFrame2(track);
        }
        function stop() {
          cancelAnimationFrame2(ticker);
          cancelAnimationFrame2(raf);
          var currentPoint = getPoint();
          targetX = currentPoint.x;
          targetY = currentPoint.y;
          timestamp = Date.now();
          if (vx < -minVelocity || vx > minVelocity) {
            ax = amplitude * vx;
            targetX += ax;
          }
          if (vy < -minVelocity || vy > minVelocity) {
            ay = amplitude * vy;
            targetY += ay;
          }
          raf = requestAnimationFrame2(autoScroll);
        }
        function autoScroll() {
          var elapsed = Date.now() - timestamp;
          var moving = false;
          var dx = 0;
          var dy = 0;
          if (ax) {
            dx = -ax * Math.exp(-elapsed / timeConstant);
            if (dx > 0.5 || dx < -0.5)
              moving = true;
            else
              dx = ax = 0;
          }
          if (ay) {
            dy = -ay * Math.exp(-elapsed / timeConstant);
            if (dy > 0.5 || dy < -0.5)
              moving = true;
            else
              dy = ay = 0;
          }
          if (moving) {
            scroll(targetX + dx, targetY + dy);
            raf = requestAnimationFrame2(autoScroll);
          }
        }
      }
      function getCancelAnimationFrame() {
        if (typeof cancelAnimationFrame === "function")
          return cancelAnimationFrame;
        return clearTimeout;
      }
      function getRequestAnimationFrame() {
        if (typeof requestAnimationFrame === "function")
          return requestAnimationFrame;
        return function(handler) {
          return setTimeout(handler, 16);
        };
      }
    }
  });

  // node_modules/panzoom/lib/createTextSelectionInterceptor.js
  var require_createTextSelectionInterceptor = __commonJS({
    "node_modules/panzoom/lib/createTextSelectionInterceptor.js"(exports, module) {
      module.exports = createTextSelectionInterceptor;
      function createTextSelectionInterceptor(useFake) {
        if (useFake) {
          return {
            capture: noop,
            release: noop
          };
        }
        var dragObject;
        var prevSelectStart;
        var prevDragStart;
        var wasCaptured = false;
        return {
          capture,
          release
        };
        function capture(domObject) {
          wasCaptured = true;
          prevSelectStart = window.document.onselectstart;
          prevDragStart = window.document.ondragstart;
          window.document.onselectstart = disabled;
          dragObject = domObject;
          dragObject.ondragstart = disabled;
        }
        function release() {
          if (!wasCaptured)
            return;
          wasCaptured = false;
          window.document.onselectstart = prevSelectStart;
          if (dragObject)
            dragObject.ondragstart = prevDragStart;
        }
      }
      function disabled(e) {
        e.stopPropagation();
        return false;
      }
      function noop() {
      }
    }
  });

  // node_modules/panzoom/lib/transform.js
  var require_transform = __commonJS({
    "node_modules/panzoom/lib/transform.js"(exports, module) {
      module.exports = Transform;
      function Transform() {
        this.x = 0;
        this.y = 0;
        this.scale = 1;
      }
    }
  });

  // node_modules/panzoom/lib/svgController.js
  var require_svgController = __commonJS({
    "node_modules/panzoom/lib/svgController.js"(exports, module) {
      module.exports = makeSvgController;
      module.exports.canAttach = isSVGElement;
      function makeSvgController(svgElement, options) {
        if (!isSVGElement(svgElement)) {
          throw new Error("svg element is required for svg.panzoom to work");
        }
        var owner = svgElement.ownerSVGElement;
        if (!owner) {
          throw new Error(
            "Do not apply panzoom to the root <svg> element. Use its child instead (e.g. <g></g>). As of March 2016 only FireFox supported transform on the root element"
          );
        }
        if (!options.disableKeyboardInteraction) {
          owner.setAttribute("tabindex", 0);
        }
        var api = {
          getBBox,
          getScreenCTM,
          getOwner,
          applyTransform,
          initTransform
        };
        return api;
        function getOwner() {
          return owner;
        }
        function getBBox() {
          var bbox = svgElement.getBBox();
          return {
            left: bbox.x,
            top: bbox.y,
            width: bbox.width,
            height: bbox.height
          };
        }
        function getScreenCTM() {
          var ctm = owner.getCTM();
          if (!ctm) {
            return owner.getScreenCTM();
          }
          return ctm;
        }
        function initTransform(transform) {
          var screenCTM = svgElement.getCTM();
          if (screenCTM === null) {
            screenCTM = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
          }
          transform.x = screenCTM.e;
          transform.y = screenCTM.f;
          transform.scale = screenCTM.a;
          owner.removeAttributeNS(null, "viewBox");
        }
        function applyTransform(transform) {
          svgElement.setAttribute("transform", "matrix(" + transform.scale + " 0 0 " + transform.scale + " " + transform.x + " " + transform.y + ")");
        }
      }
      function isSVGElement(element) {
        return element && element.ownerSVGElement && element.getCTM;
      }
    }
  });

  // node_modules/panzoom/lib/domController.js
  var require_domController = __commonJS({
    "node_modules/panzoom/lib/domController.js"(exports, module) {
      module.exports = makeDomController;
      module.exports.canAttach = isDomElement;
      function makeDomController(domElement, options) {
        var elementValid = isDomElement(domElement);
        if (!elementValid) {
          throw new Error("panzoom requires DOM element to be attached to the DOM tree");
        }
        var owner = domElement.parentElement;
        domElement.scrollTop = 0;
        if (!options.disableKeyboardInteraction) {
          owner.setAttribute("tabindex", 0);
        }
        var api = {
          getBBox,
          getOwner,
          applyTransform
        };
        return api;
        function getOwner() {
          return owner;
        }
        function getBBox() {
          return {
            left: 0,
            top: 0,
            width: domElement.clientWidth,
            height: domElement.clientHeight
          };
        }
        function applyTransform(transform) {
          domElement.style.transformOrigin = "0 0 0";
          domElement.style.transform = "matrix(" + transform.scale + ", 0, 0, " + transform.scale + ", " + transform.x + ", " + transform.y + ")";
        }
      }
      function isDomElement(element) {
        return element && element.parentElement && element.style;
      }
    }
  });

  // node_modules/panzoom/index.js
  var require_panzoom = __commonJS({
    "node_modules/panzoom/index.js"(exports, module) {
      "use strict";
      var wheel = require_wheel();
      var animate = require_amator();
      var eventify = require_ngraph();
      var kinetic = require_kinetic();
      var createTextSelectionInterceptor = require_createTextSelectionInterceptor();
      var domTextSelectionInterceptor = createTextSelectionInterceptor();
      var fakeTextSelectorInterceptor = createTextSelectionInterceptor(true);
      var Transform = require_transform();
      var makeSvgController = require_svgController();
      var makeDomController = require_domController();
      var defaultZoomSpeed = 1;
      var defaultDoubleTapZoomSpeed = 1.75;
      var doubleTapSpeedInMS = 300;
      var clickEventTimeInMS = 200;
      module.exports = createPanZoom;
      function createPanZoom(domElement, options) {
        options = options || {};
        var panController = options.controller;
        if (!panController) {
          if (makeSvgController.canAttach(domElement)) {
            panController = makeSvgController(domElement, options);
          } else if (makeDomController.canAttach(domElement)) {
            panController = makeDomController(domElement, options);
          }
        }
        if (!panController) {
          throw new Error(
            "Cannot create panzoom for the current type of dom element"
          );
        }
        var owner = panController.getOwner();
        var storedCTMResult = { x: 0, y: 0 };
        var isDirty = false;
        var transform = new Transform();
        if (panController.initTransform) {
          panController.initTransform(transform);
        }
        var filterKey = typeof options.filterKey === "function" ? options.filterKey : noop;
        var pinchSpeed = typeof options.pinchSpeed === "number" ? options.pinchSpeed : 1;
        var bounds = options.bounds;
        var maxZoom = typeof options.maxZoom === "number" ? options.maxZoom : Number.POSITIVE_INFINITY;
        var minZoom = typeof options.minZoom === "number" ? options.minZoom : 0;
        var boundsPadding = typeof options.boundsPadding === "number" ? options.boundsPadding : 0.05;
        var zoomDoubleClickSpeed = typeof options.zoomDoubleClickSpeed === "number" ? options.zoomDoubleClickSpeed : defaultDoubleTapZoomSpeed;
        var beforeWheel = options.beforeWheel || noop;
        var beforeMouseDown = options.beforeMouseDown || noop;
        var speed = typeof options.zoomSpeed === "number" ? options.zoomSpeed : defaultZoomSpeed;
        var transformOrigin = parseTransformOrigin(options.transformOrigin);
        var textSelection = options.enableTextSelection ? fakeTextSelectorInterceptor : domTextSelectionInterceptor;
        validateBounds(bounds);
        if (options.autocenter) {
          autocenter();
        }
        var frameAnimation;
        var lastTouchEndTime = 0;
        var lastTouchStartTime = 0;
        var pendingClickEventTimeout = 0;
        var lastMouseDownedEvent = null;
        var lastMouseDownTime = /* @__PURE__ */ new Date();
        var lastSingleFingerOffset;
        var touchInProgress = false;
        var panstartFired = false;
        var mouseX;
        var mouseY;
        var clickX;
        var clickY;
        var pinchZoomLength;
        var smoothScroll;
        if ("smoothScroll" in options && !options.smoothScroll) {
          smoothScroll = rigidScroll();
        } else {
          smoothScroll = kinetic(getPoint, scroll, options.smoothScroll);
        }
        var moveByAnimation;
        var zoomToAnimation;
        var multiTouch;
        var paused = false;
        listenForEvents();
        var api = {
          dispose,
          moveBy: internalMoveBy,
          moveTo,
          smoothMoveTo,
          centerOn,
          zoomTo: publicZoomTo,
          zoomAbs,
          smoothZoom,
          smoothZoomAbs,
          showRectangle,
          pause,
          resume,
          isPaused,
          getTransform: getTransformModel,
          getMinZoom,
          setMinZoom,
          getMaxZoom,
          setMaxZoom,
          getTransformOrigin,
          setTransformOrigin,
          getZoomSpeed,
          setZoomSpeed
        };
        eventify(api);
        var initialX = typeof options.initialX === "number" ? options.initialX : transform.x;
        var initialY = typeof options.initialY === "number" ? options.initialY : transform.y;
        var initialZoom = typeof options.initialZoom === "number" ? options.initialZoom : transform.scale;
        if (initialX != transform.x || initialY != transform.y || initialZoom != transform.scale) {
          zoomAbs(initialX, initialY, initialZoom);
        }
        return api;
        function pause() {
          releaseEvents();
          paused = true;
        }
        function resume() {
          if (paused) {
            listenForEvents();
            paused = false;
          }
        }
        function isPaused() {
          return paused;
        }
        function showRectangle(rect) {
          var clientRect = owner.getBoundingClientRect();
          var size = transformToScreen(clientRect.width, clientRect.height);
          var rectWidth = rect.right - rect.left;
          var rectHeight = rect.bottom - rect.top;
          if (!Number.isFinite(rectWidth) || !Number.isFinite(rectHeight)) {
            throw new Error("Invalid rectangle");
          }
          var dw = size.x / rectWidth;
          var dh = size.y / rectHeight;
          var scale = Math.min(dw, dh);
          transform.x = -(rect.left + rectWidth / 2) * scale + size.x / 2;
          transform.y = -(rect.top + rectHeight / 2) * scale + size.y / 2;
          transform.scale = scale;
        }
        function transformToScreen(x, y) {
          if (panController.getScreenCTM) {
            var parentCTM = panController.getScreenCTM();
            var parentScaleX = parentCTM.a;
            var parentScaleY = parentCTM.d;
            var parentOffsetX = parentCTM.e;
            var parentOffsetY = parentCTM.f;
            storedCTMResult.x = x * parentScaleX - parentOffsetX;
            storedCTMResult.y = y * parentScaleY - parentOffsetY;
          } else {
            storedCTMResult.x = x;
            storedCTMResult.y = y;
          }
          return storedCTMResult;
        }
        function autocenter() {
          var w;
          var h;
          var left = 0;
          var top = 0;
          var sceneBoundingBox = getBoundingBox();
          if (sceneBoundingBox) {
            left = sceneBoundingBox.left;
            top = sceneBoundingBox.top;
            w = sceneBoundingBox.right - sceneBoundingBox.left;
            h = sceneBoundingBox.bottom - sceneBoundingBox.top;
          } else {
            var ownerRect = owner.getBoundingClientRect();
            w = ownerRect.width;
            h = ownerRect.height;
          }
          var bbox = panController.getBBox();
          if (bbox.width === 0 || bbox.height === 0) {
            return;
          }
          var dh = h / bbox.height;
          var dw = w / bbox.width;
          var scale = Math.min(dw, dh);
          transform.x = -(bbox.left + bbox.width / 2) * scale + w / 2 + left;
          transform.y = -(bbox.top + bbox.height / 2) * scale + h / 2 + top;
          transform.scale = scale;
        }
        function getTransformModel() {
          return transform;
        }
        function getMinZoom() {
          return minZoom;
        }
        function setMinZoom(newMinZoom) {
          minZoom = newMinZoom;
        }
        function getMaxZoom() {
          return maxZoom;
        }
        function setMaxZoom(newMaxZoom) {
          maxZoom = newMaxZoom;
        }
        function getTransformOrigin() {
          return transformOrigin;
        }
        function setTransformOrigin(newTransformOrigin) {
          transformOrigin = parseTransformOrigin(newTransformOrigin);
        }
        function getZoomSpeed() {
          return speed;
        }
        function setZoomSpeed(newSpeed) {
          if (!Number.isFinite(newSpeed)) {
            throw new Error("Zoom speed should be a number");
          }
          speed = newSpeed;
        }
        function getPoint() {
          return {
            x: transform.x,
            y: transform.y
          };
        }
        function moveTo(x, y) {
          transform.x = x;
          transform.y = y;
          keepTransformInsideBounds();
          triggerEvent("pan");
          makeDirty();
        }
        function moveBy(dx, dy) {
          moveTo(transform.x + dx, transform.y + dy);
        }
        function keepTransformInsideBounds() {
          var boundingBox = getBoundingBox();
          if (!boundingBox)
            return;
          var adjusted = false;
          var clientRect = getClientRect();
          var diff = boundingBox.left - clientRect.right;
          if (diff > 0) {
            transform.x += diff;
            adjusted = true;
          }
          diff = boundingBox.right - clientRect.left;
          if (diff < 0) {
            transform.x += diff;
            adjusted = true;
          }
          diff = boundingBox.top - clientRect.bottom;
          if (diff > 0) {
            transform.y += diff;
            adjusted = true;
          }
          diff = boundingBox.bottom - clientRect.top;
          if (diff < 0) {
            transform.y += diff;
            adjusted = true;
          }
          return adjusted;
        }
        function getBoundingBox() {
          if (!bounds)
            return;
          if (typeof bounds === "boolean") {
            var ownerRect = owner.getBoundingClientRect();
            var sceneWidth = ownerRect.width;
            var sceneHeight = ownerRect.height;
            return {
              left: sceneWidth * boundsPadding,
              top: sceneHeight * boundsPadding,
              right: sceneWidth * (1 - boundsPadding),
              bottom: sceneHeight * (1 - boundsPadding)
            };
          }
          return bounds;
        }
        function getClientRect() {
          var bbox = panController.getBBox();
          var leftTop = client(bbox.left, bbox.top);
          return {
            left: leftTop.x,
            top: leftTop.y,
            right: bbox.width * transform.scale + leftTop.x,
            bottom: bbox.height * transform.scale + leftTop.y
          };
        }
        function client(x, y) {
          return {
            x: x * transform.scale + transform.x,
            y: y * transform.scale + transform.y
          };
        }
        function makeDirty() {
          isDirty = true;
          frameAnimation = window.requestAnimationFrame(frame);
        }
        function zoomByRatio(clientX, clientY, ratio) {
          if (isNaN(clientX) || isNaN(clientY) || isNaN(ratio)) {
            throw new Error("zoom requires valid numbers");
          }
          var newScale = transform.scale * ratio;
          if (newScale < minZoom) {
            if (transform.scale === minZoom)
              return;
            ratio = minZoom / transform.scale;
          }
          if (newScale > maxZoom) {
            if (transform.scale === maxZoom)
              return;
            ratio = maxZoom / transform.scale;
          }
          var size = transformToScreen(clientX, clientY);
          transform.x = size.x - ratio * (size.x - transform.x);
          transform.y = size.y - ratio * (size.y - transform.y);
          if (bounds && boundsPadding === 1 && minZoom === 1) {
            transform.scale *= ratio;
            keepTransformInsideBounds();
          } else {
            var transformAdjusted = keepTransformInsideBounds();
            if (!transformAdjusted)
              transform.scale *= ratio;
          }
          triggerEvent("zoom");
          makeDirty();
        }
        function zoomAbs(clientX, clientY, zoomLevel) {
          var ratio = zoomLevel / transform.scale;
          zoomByRatio(clientX, clientY, ratio);
        }
        function centerOn(ui) {
          var parent = ui.ownerSVGElement;
          if (!parent)
            throw new Error("ui element is required to be within the scene");
          var clientRect = ui.getBoundingClientRect();
          var cx = clientRect.left + clientRect.width / 2;
          var cy = clientRect.top + clientRect.height / 2;
          var container = parent.getBoundingClientRect();
          var dx = container.width / 2 - cx;
          var dy = container.height / 2 - cy;
          internalMoveBy(dx, dy, true);
        }
        function smoothMoveTo(x, y) {
          internalMoveBy(x - transform.x, y - transform.y, true);
        }
        function internalMoveBy(dx, dy, smooth) {
          if (!smooth) {
            return moveBy(dx, dy);
          }
          if (moveByAnimation)
            moveByAnimation.cancel();
          var from = { x: 0, y: 0 };
          var to = { x: dx, y: dy };
          var lastX = 0;
          var lastY = 0;
          moveByAnimation = animate(from, to, {
            step: function(v) {
              moveBy(v.x - lastX, v.y - lastY);
              lastX = v.x;
              lastY = v.y;
            }
          });
        }
        function scroll(x, y) {
          cancelZoomAnimation();
          moveTo(x, y);
        }
        function dispose() {
          releaseEvents();
        }
        function listenForEvents() {
          owner.addEventListener("mousedown", onMouseDown, { passive: false });
          owner.addEventListener("dblclick", onDoubleClick, { passive: false });
          owner.addEventListener("touchstart", onTouch, { passive: false });
          owner.addEventListener("keydown", onKeyDown, { passive: false });
          wheel.addWheelListener(owner, onMouseWheel, { passive: false });
          makeDirty();
        }
        function releaseEvents() {
          wheel.removeWheelListener(owner, onMouseWheel);
          owner.removeEventListener("mousedown", onMouseDown);
          owner.removeEventListener("keydown", onKeyDown);
          owner.removeEventListener("dblclick", onDoubleClick);
          owner.removeEventListener("touchstart", onTouch);
          if (frameAnimation) {
            window.cancelAnimationFrame(frameAnimation);
            frameAnimation = 0;
          }
          smoothScroll.cancel();
          releaseDocumentMouse();
          releaseTouches();
          textSelection.release();
          triggerPanEnd();
        }
        function frame() {
          if (isDirty)
            applyTransform();
        }
        function applyTransform() {
          isDirty = false;
          panController.applyTransform(transform);
          triggerEvent("transform");
          frameAnimation = 0;
        }
        function onKeyDown(e) {
          var x = 0, y = 0, z = 0;
          if (e.keyCode === 38) {
            y = 1;
          } else if (e.keyCode === 40) {
            y = -1;
          } else if (e.keyCode === 37) {
            x = 1;
          } else if (e.keyCode === 39) {
            x = -1;
          } else if (e.keyCode === 189 || e.keyCode === 109) {
            z = 1;
          } else if (e.keyCode === 187 || e.keyCode === 107) {
            z = -1;
          }
          if (filterKey(e, x, y, z)) {
            return;
          }
          if (x || y) {
            e.preventDefault();
            e.stopPropagation();
            var clientRect = owner.getBoundingClientRect();
            var offset = Math.min(clientRect.width, clientRect.height);
            var moveSpeedRatio = 0.05;
            var dx = offset * moveSpeedRatio * x;
            var dy = offset * moveSpeedRatio * y;
            internalMoveBy(dx, dy);
          }
          if (z) {
            var scaleMultiplier = getScaleMultiplier(z * 100);
            var offset = transformOrigin ? getTransformOriginOffset() : midPoint();
            publicZoomTo(offset.x, offset.y, scaleMultiplier);
          }
        }
        function midPoint() {
          var ownerRect = owner.getBoundingClientRect();
          return {
            x: ownerRect.width / 2,
            y: ownerRect.height / 2
          };
        }
        function onTouch(e) {
          beforeTouch(e);
          clearPendingClickEventTimeout();
          if (e.touches.length === 1) {
            return handleSingleFingerTouch(e, e.touches[0]);
          } else if (e.touches.length === 2) {
            pinchZoomLength = getPinchZoomLength(e.touches[0], e.touches[1]);
            multiTouch = true;
            startTouchListenerIfNeeded();
          }
        }
        function beforeTouch(e) {
          if (options.onTouch && !options.onTouch(e)) {
            return;
          }
          e.stopPropagation();
          e.preventDefault();
        }
        function beforeDoubleClick(e) {
          clearPendingClickEventTimeout();
          if (options.onDoubleClick && !options.onDoubleClick(e)) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
        }
        function handleSingleFingerTouch(e) {
          lastTouchStartTime = /* @__PURE__ */ new Date();
          var touch = e.touches[0];
          var offset = getOffsetXY(touch);
          lastSingleFingerOffset = offset;
          var point = transformToScreen(offset.x, offset.y);
          mouseX = point.x;
          mouseY = point.y;
          clickX = mouseX;
          clickY = mouseY;
          smoothScroll.cancel();
          startTouchListenerIfNeeded();
        }
        function startTouchListenerIfNeeded() {
          if (touchInProgress) {
            return;
          }
          touchInProgress = true;
          document.addEventListener("touchmove", handleTouchMove);
          document.addEventListener("touchend", handleTouchEnd);
          document.addEventListener("touchcancel", handleTouchEnd);
        }
        function handleTouchMove(e) {
          if (e.touches.length === 1) {
            e.stopPropagation();
            var touch = e.touches[0];
            var offset = getOffsetXY(touch);
            var point = transformToScreen(offset.x, offset.y);
            var dx = point.x - mouseX;
            var dy = point.y - mouseY;
            if (dx !== 0 && dy !== 0) {
              triggerPanStart();
            }
            mouseX = point.x;
            mouseY = point.y;
            internalMoveBy(dx, dy);
          } else if (e.touches.length === 2) {
            multiTouch = true;
            var t1 = e.touches[0];
            var t2 = e.touches[1];
            var currentPinchLength = getPinchZoomLength(t1, t2);
            var scaleMultiplier = 1 + (currentPinchLength / pinchZoomLength - 1) * pinchSpeed;
            var firstTouchPoint = getOffsetXY(t1);
            var secondTouchPoint = getOffsetXY(t2);
            mouseX = (firstTouchPoint.x + secondTouchPoint.x) / 2;
            mouseY = (firstTouchPoint.y + secondTouchPoint.y) / 2;
            if (transformOrigin) {
              var offset = getTransformOriginOffset();
              mouseX = offset.x;
              mouseY = offset.y;
            }
            publicZoomTo(mouseX, mouseY, scaleMultiplier);
            pinchZoomLength = currentPinchLength;
            e.stopPropagation();
            e.preventDefault();
          }
        }
        function clearPendingClickEventTimeout() {
          if (pendingClickEventTimeout) {
            clearTimeout(pendingClickEventTimeout);
            pendingClickEventTimeout = 0;
          }
        }
        function handlePotentialClickEvent(e) {
          if (!options.onClick)
            return;
          clearPendingClickEventTimeout();
          var dx = mouseX - clickX;
          var dy = mouseY - clickY;
          var l = Math.sqrt(dx * dx + dy * dy);
          if (l > 5)
            return;
          pendingClickEventTimeout = setTimeout(function() {
            pendingClickEventTimeout = 0;
            options.onClick(e);
          }, doubleTapSpeedInMS);
        }
        function handleTouchEnd(e) {
          clearPendingClickEventTimeout();
          if (e.touches.length > 0) {
            var offset = getOffsetXY(e.touches[0]);
            var point = transformToScreen(offset.x, offset.y);
            mouseX = point.x;
            mouseY = point.y;
          } else {
            var now = /* @__PURE__ */ new Date();
            if (now - lastTouchEndTime < doubleTapSpeedInMS) {
              if (transformOrigin) {
                var offset = getTransformOriginOffset();
                smoothZoom(offset.x, offset.y, zoomDoubleClickSpeed);
              } else {
                smoothZoom(lastSingleFingerOffset.x, lastSingleFingerOffset.y, zoomDoubleClickSpeed);
              }
            } else if (now - lastTouchStartTime < clickEventTimeInMS) {
              handlePotentialClickEvent(e);
            }
            lastTouchEndTime = now;
            triggerPanEnd();
            releaseTouches();
          }
        }
        function getPinchZoomLength(finger1, finger2) {
          var dx = finger1.clientX - finger2.clientX;
          var dy = finger1.clientY - finger2.clientY;
          return Math.sqrt(dx * dx + dy * dy);
        }
        function onDoubleClick(e) {
          beforeDoubleClick(e);
          var offset = getOffsetXY(e);
          if (transformOrigin) {
            offset = getTransformOriginOffset();
          }
          smoothZoom(offset.x, offset.y, zoomDoubleClickSpeed);
        }
        function onMouseDown(e) {
          clearPendingClickEventTimeout();
          if (beforeMouseDown(e))
            return;
          lastMouseDownedEvent = e;
          lastMouseDownTime = /* @__PURE__ */ new Date();
          if (touchInProgress) {
            e.stopPropagation();
            return false;
          }
          var isLeftButton = e.button === 1 && window.event !== null || e.button === 0;
          if (!isLeftButton)
            return;
          smoothScroll.cancel();
          var offset = getOffsetXY(e);
          var point = transformToScreen(offset.x, offset.y);
          clickX = mouseX = point.x;
          clickY = mouseY = point.y;
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
          textSelection.capture(e.target || e.srcElement);
          return false;
        }
        function onMouseMove(e) {
          if (touchInProgress)
            return;
          triggerPanStart();
          var offset = getOffsetXY(e);
          var point = transformToScreen(offset.x, offset.y);
          var dx = point.x - mouseX;
          var dy = point.y - mouseY;
          mouseX = point.x;
          mouseY = point.y;
          internalMoveBy(dx, dy);
        }
        function onMouseUp() {
          var now = /* @__PURE__ */ new Date();
          if (now - lastMouseDownTime < clickEventTimeInMS)
            handlePotentialClickEvent(lastMouseDownedEvent);
          textSelection.release();
          triggerPanEnd();
          releaseDocumentMouse();
        }
        function releaseDocumentMouse() {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          panstartFired = false;
        }
        function releaseTouches() {
          document.removeEventListener("touchmove", handleTouchMove);
          document.removeEventListener("touchend", handleTouchEnd);
          document.removeEventListener("touchcancel", handleTouchEnd);
          panstartFired = false;
          multiTouch = false;
          touchInProgress = false;
        }
        function onMouseWheel(e) {
          if (beforeWheel(e))
            return;
          smoothScroll.cancel();
          var delta = e.deltaY;
          if (e.deltaMode > 0)
            delta *= 100;
          var scaleMultiplier = getScaleMultiplier(delta);
          if (scaleMultiplier !== 1) {
            var offset = transformOrigin ? getTransformOriginOffset() : getOffsetXY(e);
            publicZoomTo(offset.x, offset.y, scaleMultiplier);
            e.preventDefault();
          }
        }
        function getOffsetXY(e) {
          var offsetX, offsetY;
          var ownerRect = owner.getBoundingClientRect();
          offsetX = e.clientX - ownerRect.left;
          offsetY = e.clientY - ownerRect.top;
          return { x: offsetX, y: offsetY };
        }
        function smoothZoom(clientX, clientY, scaleMultiplier) {
          var fromValue = transform.scale;
          var from = { scale: fromValue };
          var to = { scale: scaleMultiplier * fromValue };
          smoothScroll.cancel();
          cancelZoomAnimation();
          zoomToAnimation = animate(from, to, {
            step: function(v) {
              zoomAbs(clientX, clientY, v.scale);
            },
            done: triggerZoomEnd
          });
        }
        function smoothZoomAbs(clientX, clientY, toScaleValue) {
          var fromValue = transform.scale;
          var from = { scale: fromValue };
          var to = { scale: toScaleValue };
          smoothScroll.cancel();
          cancelZoomAnimation();
          zoomToAnimation = animate(from, to, {
            step: function(v) {
              zoomAbs(clientX, clientY, v.scale);
            }
          });
        }
        function getTransformOriginOffset() {
          var ownerRect = owner.getBoundingClientRect();
          return {
            x: ownerRect.width * transformOrigin.x,
            y: ownerRect.height * transformOrigin.y
          };
        }
        function publicZoomTo(clientX, clientY, scaleMultiplier) {
          smoothScroll.cancel();
          cancelZoomAnimation();
          return zoomByRatio(clientX, clientY, scaleMultiplier);
        }
        function cancelZoomAnimation() {
          if (zoomToAnimation) {
            zoomToAnimation.cancel();
            zoomToAnimation = null;
          }
        }
        function getScaleMultiplier(delta) {
          var sign = Math.sign(delta);
          var deltaAdjustedSpeed = Math.min(0.25, Math.abs(speed * delta / 128));
          return 1 - sign * deltaAdjustedSpeed;
        }
        function triggerPanStart() {
          if (!panstartFired) {
            triggerEvent("panstart");
            panstartFired = true;
            smoothScroll.start();
          }
        }
        function triggerPanEnd() {
          if (panstartFired) {
            if (!multiTouch)
              smoothScroll.stop();
            triggerEvent("panend");
          }
        }
        function triggerZoomEnd() {
          triggerEvent("zoomend");
        }
        function triggerEvent(name) {
          api.fire(name, api);
        }
      }
      function parseTransformOrigin(options) {
        if (!options)
          return;
        if (typeof options === "object") {
          if (!isNumber2(options.x) || !isNumber2(options.y))
            failTransformOrigin(options);
          return options;
        }
        failTransformOrigin();
      }
      function failTransformOrigin(options) {
        console.error(options);
        throw new Error(
          [
            "Cannot parse transform origin.",
            "Some good examples:",
            '  "center center" can be achieved with {x: 0.5, y: 0.5}',
            '  "top center" can be achieved with {x: 0.5, y: 0}',
            '  "bottom right" can be achieved with {x: 1, y: 1}'
          ].join("\n")
        );
      }
      function noop() {
      }
      function validateBounds(bounds) {
        var boundsType = typeof bounds;
        if (boundsType === "undefined" || boundsType === "boolean")
          return;
        var validBounds = isNumber2(bounds.left) && isNumber2(bounds.top) && isNumber2(bounds.bottom) && isNumber2(bounds.right);
        if (!validBounds)
          throw new Error(
            "Bounds object is not valid. It can be: undefined, boolean (true|false) or an object {left, top, right, bottom}"
          );
      }
      function isNumber2(x) {
        return Number.isFinite(x);
      }
      function isNaN(value) {
        if (Number.isNaN) {
          return Number.isNaN(value);
        }
        return value !== value;
      }
      function rigidScroll() {
        return {
          start: noop,
          stop: noop,
          cancel: noop
        };
      }
      function autoRun() {
        if (typeof document === "undefined")
          return;
        var scripts = document.getElementsByTagName("script");
        if (!scripts)
          return;
        var panzoomScript;
        for (var i = 0; i < scripts.length; ++i) {
          var x = scripts[i];
          if (x.src && x.src.match(/\bpanzoom(\.min)?\.js/)) {
            panzoomScript = x;
            break;
          }
        }
        if (!panzoomScript)
          return;
        var query = panzoomScript.getAttribute("query");
        if (!query)
          return;
        var globalName = panzoomScript.getAttribute("name") || "pz";
        var started = Date.now();
        tryAttach();
        function tryAttach() {
          var el = document.querySelector(query);
          if (!el) {
            var now = Date.now();
            var elapsed = now - started;
            if (elapsed < 2e3) {
              setTimeout(tryAttach, 100);
              return;
            }
            console.error("Cannot find the panzoom element", globalName);
            return;
          }
          var options = collectOptions(panzoomScript);
          console.log(options);
          window[globalName] = createPanZoom(el, options);
        }
        function collectOptions(script) {
          var attrs = script.attributes;
          var options = {};
          for (var j = 0; j < attrs.length; ++j) {
            var attr2 = attrs[j];
            var nameValue = getPanzoomAttributeNameValue(attr2);
            if (nameValue) {
              options[nameValue.name] = nameValue.value;
            }
          }
          return options;
        }
        function getPanzoomAttributeNameValue(attr2) {
          if (!attr2.name)
            return;
          var isPanZoomAttribute = attr2.name[0] === "p" && attr2.name[1] === "z" && attr2.name[2] === "-";
          if (!isPanZoomAttribute)
            return;
          var name = attr2.name.substr(3);
          var value = JSON.parse(attr2.value);
          return { name, value };
        }
      }
      autoRun();
    }
  });

  // src/library/ReactiveObject.js
  var ReactiveObject = class {
    #observers = {};
    constructor(obj) {
      if (typeof obj !== "object")
        throw new TypeError("Argument must be an object.");
      Object.entries(obj).forEach(([key, val]) => this.#defineReactiveProperty(key, val));
    }
    #defineReactiveProperty(key, val) {
      Object.defineProperty(this, key, {
        get: () => val,
        set: (newValue) => {
          if (newValue === val)
            return;
          val = newValue;
          this.#notifyObservers(key, newValue);
        }
      });
    }
    #notifyObservers(key, value) {
      if (Array.isArray(this.#observers[key]))
        this.#observers[key].forEach((observer) => observer(value));
    }
    subscribe(key, observer) {
      if (typeof observer !== "function")
        throw new TypeError("Observer must be a function.");
      if (!Array.isArray(this.#observers[key]))
        this.#observers[key] = [];
      this.#observers[key].push(observer);
      observer(this[key]);
      return () => {
        this.#unsubscribe(key, observer);
      };
    }
    #unsubscribe(key, observer) {
      this.#observers[key] = this.#observers[key].filter((obs) => obs !== observer);
    }
  };

  // src/node/helper/NodeRegistry.js
  var NodeRegistry = class {
    constructor() {
      this.nodeClasses = /* @__PURE__ */ new Map();
    }
    register(type, nodeClass) {
      if (this.nodeClasses.has(type)) {
        throw new Error(`Type ${type} is already registered.`);
      }
      this.nodeClasses.set(type, nodeClass);
    }
    create(type, id) {
      if (!this.nodeClasses.has(type)) {
        throw new Error(`Type "${type}" is not registered.`);
      }
      const NodeClass = this.nodeClasses.get(type);
      return new NodeClass(id);
    }
  };

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // src/node/types/base/Node.js
  var Node = class {
    #deleted = false;
    #id = "id" + v4_default();
    #version = 1;
    #name = null;
    properties = [];
    // inputs
    functions = [];
    // outputs
    // Geometry
    #x = Math.random() * 7e3;
    #y = Math.random() * 7e3;
    #z = 0;
    #h = 100;
    #w = 300;
    // Theme
    #bg = `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`;
    constructor() {
      let intervalID = setInterval(() => {
        this.x = Math.random() > 0.5 ? this.x + 50 : this.x - 50;
        this.y = Math.random() > 0.5 ? this.y + 50 : this.y - 50;
      }, 5e3 * Math.random());
    }
    #subscribers = {};
    notify({ type, name, oldVal, newVal }) {
      Object.values(this.#subscribers).forEach(
        (callback) => callback({ type, name, oldVal, newVal, node: this })
      );
    }
    subscribe(callback) {
      const id = Math.random().toString(36).substring(2);
      this.#subscribers[id] = callback;
      return () => this.unsubscribe(id);
    }
    unsubscribe(id) {
      delete this.#subscribers[id];
    }
    set id(newVal) {
      const oldVal = this.#id;
      this.#id = newVal;
      this.version++;
      this.notify({ type: "updated", name: "id", newVal, oldVal });
    }
    get id() {
      return this.#id;
    }
    set name(newVal) {
      const oldVal = this.#name;
      this.#name = newVal;
      this.version++;
      this.notify({ type: "updated", name: "name", newVal, oldVal });
    }
    get name() {
      return this.#name;
    }
    set bg(newVal) {
      const oldVal = this.#bg;
      this.#bg = newVal;
      this.version++;
      this.notify({ type: "updated", name: "bg", newVal, oldVal });
    }
    get bg() {
      return this.#bg;
    }
    set version(newVal) {
      this.#version++;
    }
    get version() {
      return this.#version;
    }
    set x(newVal) {
      const oldVal = this.#x;
      this.#x = newVal;
      this.version++;
      this.notify({ type: "updated", name: "x", newVal, oldVal });
    }
    get x() {
      return this.#x;
    }
    set y(newVal) {
      const oldVal = this.#y;
      this.#y = newVal;
      this.version++;
      this.notify({ type: "updated", name: "y", newVal, oldVal });
    }
    get y() {
      return this.#y;
    }
    set z(newVal) {
      const oldVal = this.#z;
      this.#z = newVal;
      this.version++;
      this.notify({ type: "updated", name: "z", newVal, oldVal });
    }
    get z() {
      return this.#z;
    }
    set h(newVal) {
      const oldVal = this.#h;
      this.#h = newVal;
      this.version++;
      this.notify({ type: "updated", name: "h", newVal, oldVal });
    }
    get h() {
      return this.#h;
    }
    set w(newVal) {
      const oldVal = this.#w;
      this.#w = newVal;
      this.version++;
      this.notify({ type: "updated", name: "w", newVal, oldVal });
    }
    get w() {
      return this.#w;
    }
  };

  // src/node/types/base/NodeCore.js
  var NodeCore = class extends Node {
    constructor() {
      super();
    }
  };

  // src/node/types/TextNode.js
  var TextNode = class extends NodeCore {
    constructor() {
      super();
      this.functions.push({ id: "output" });
      this.properties.push({ id: "text" });
    }
    output() {
    }
    #input = null;
    set input(v) {
      this.#input = v;
      this.version++;
      this.notify("updated", "input", v);
    }
    get input() {
      return this.#input;
    }
    // custom properties
    #text = "white";
    set text(v) {
      this.#text = v;
      this.version++;
      this.notify("updated", "text", v);
    }
    get text() {
      return this.#text;
    }
  };

  // src/node/types/FunctionNode.js
  var CodeNode = class extends NodeCore {
    constructor() {
      super();
      this.functions.push({ id: "output" });
      this.properties.push({ id: "code" });
    }
    output() {
    }
    #input = null;
    set input(v) {
      this.#input = v;
      this.version++;
      this.notify("updated", "input", v);
    }
    get input() {
      return this.#input;
    }
    // custom properties
    #code = "white";
    set code(v) {
      this.#code = v;
      this.version++;
      this.notify("updated", "code", v);
    }
    get code() {
      return this.#code;
    }
  };

  // src/node/types/ColorNode.js
  var ColorNode = class extends NodeCore {
    constructor() {
      super();
      this.functions.push({ id: "output" });
      this.properties.push({ id: "color" });
    }
    output() {
    }
    #input = null;
    set input(v) {
      this.#input = v;
      this.version++;
      this.notify("updated", "input", v);
    }
    get input() {
      return this.#input;
    }
    // custom properties
    #color = "white";
    set color(v) {
      this.#color = v;
      this.version++;
      this.notify("updated", "color", v);
    }
    get color() {
      return this.#color;
    }
  };

  // src/node/NodeCollection.js
  var NodeCollection = class {
    #content = [];
    #registry = new NodeRegistry();
    constructor() {
      this.#registry.register("text", TextNode);
      this.#registry.register("color", ColorNode);
      this.#registry.register("function", CodeNode);
    }
    forEach(callback) {
      this.#content.forEach(callback);
    }
    create(...arg) {
      const node = this.#registry.create(...arg);
      this.#content.push(node);
      this.#notify("created", { node });
      return node;
    }
    remove(id) {
      const node = this.#content.find((node2) => node2.id === id);
      if (node) {
        node.deleted = true;
        this.#notify("removed", { node });
      }
    }
    removeDeleted() {
      this.#content = this.#content.filter((node) => !node.deleted);
    }
    update(id, property, value) {
      const node = this.#content.find((node2) => node2.id === id);
      if (node && node[property] !== value) {
        const old = node[property];
        node[property] = value;
        this.#notify("updated", { node, property, value, old });
      }
    }
    #observers = {};
    #notify(eventName, eventData) {
      if (Array.isArray(this.#observers[eventName]))
        this.#observers[eventName].forEach((observer) => observer(eventData));
    }
    subscribe(eventName, observer) {
      if (typeof observer !== "function")
        throw new TypeError("Observer must be a function.");
      if (!Array.isArray(this.#observers[eventName]))
        this.#observers[eventName] = [];
      this.#observers[eventName].push(observer);
      return () => {
        this.#unsubscribe(eventName, observer);
      };
    }
    #unsubscribe(eventName, observer) {
      this.#observers[eventName] = this.#observers[eventName].filter(
        (obs) => obs !== observer
      );
    }
  };

  // src/Application.js
  var SignalcraftCore = class {
    #nodes = new NodeCollection();
    // #edges = new EdgeCollection();
    #setup = new ReactiveObject({ fgColor: "blue", bgColor: "green" });
    constructor() {
      let intervalID = setInterval(() => {
        this.#setup.bgColor = `hsl(${parseInt(Math.random() * 360)}, 20%, 35%)`;
        this.createNode("color");
      }, 1e4);
    }
    async ready() {
    }
    async start() {
    }
    async stop() {
    }
    get nodes() {
      return this.#nodes;
    }
    createNode(...arg) {
      this.#nodes.create(...arg);
    }
    removeNode() {
    }
    linkNodes() {
    }
    unlinkNodes() {
    }
    #subscribers = {};
    #notify(type, data) {
      Object.values(this.#subscribers).forEach(
        (callback) => callback(type, data)
      );
    }
    subscribe(callback) {
      const id = Math.random().toString(36).substring(2);
      this.#subscribers[id] = callback;
      return () => this.unsubscribe(id);
    }
    unsubscribe(id) {
      delete this.#subscribers[id];
    }
    integrate(that, map) {
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          const [objectName, eventName, fluff] = key.split(" ");
          const handlerFunction = map[key];
          switch (objectName) {
            case "setup":
              this.#setup.subscribe(eventName, handlerFunction.bind(that));
              break;
            case "nodes":
              this.#nodes.subscribe(eventName, handlerFunction.bind(that));
              break;
            case "edges":
              break;
            default:
          }
        }
      }
    }
  };

  // node_modules/jsx-dom/index.js
  var keys = Object.keys;
  function isBoolean(val) {
    return typeof val === "boolean";
  }
  function isElement(val) {
    return val && typeof val.nodeType === "number";
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return typeof val === "object" ? val !== null : isFunction(val);
  }
  function isFunction(val) {
    return typeof val === "function";
  }
  function isComponentClass(Component2) {
    const { prototype } = Component2;
    return !!(prototype && prototype.isReactComponent);
  }
  function isArrayLike(obj) {
    return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number";
  }
  function forEach(value, fn) {
    if (!value)
      return;
    for (const key of keys(value)) {
      fn(value[key], key);
    }
  }
  function isRef(maybeRef) {
    return isObject(maybeRef) && "current" in maybeRef;
  }
  var isUnitlessNumber = {
    animationIterationCount: 0,
    borderImageOutset: 0,
    borderImageSlice: 0,
    borderImageWidth: 0,
    boxFlex: 0,
    boxFlexGroup: 0,
    boxOrdinalGroup: 0,
    columnCount: 0,
    columns: 0,
    flex: 0,
    flexGrow: 0,
    flexPositive: 0,
    flexShrink: 0,
    flexNegative: 0,
    flexOrder: 0,
    gridArea: 0,
    gridRow: 0,
    gridRowEnd: 0,
    gridRowSpan: 0,
    gridRowStart: 0,
    gridColumn: 0,
    gridColumnEnd: 0,
    gridColumnSpan: 0,
    gridColumnStart: 0,
    fontWeight: 0,
    lineClamp: 0,
    lineHeight: 0,
    opacity: 0,
    order: 0,
    orphans: 0,
    tabSize: 0,
    widows: 0,
    zIndex: 0,
    zoom: 0,
    // SVG-related properties
    fillOpacity: 0,
    floodOpacity: 0,
    stopOpacity: 0,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    strokeMiterlimit: 0,
    strokeOpacity: 0,
    strokeWidth: 0
  };
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  var prefixes = ["Webkit", "ms", "Moz", "O"];
  keys(isUnitlessNumber).forEach((prop) => {
    prefixes.forEach((prefix) => {
      isUnitlessNumber[prefixKey(prefix, prop)] = 0;
    });
  });
  var jsxDomType = Symbol.for("jsx-dom:type");
  var JsxDomType = /* @__PURE__ */ function(JsxDomType2) {
    JsxDomType2["ShadowRoot"] = "ShadowRoot";
    return JsxDomType2;
  }(JsxDomType || {});
  function ShadowRoot(_ref) {
    let { children, ref, ...attr2 } = _ref;
    return {
      [jsxDomType]: JsxDomType.ShadowRoot,
      ref,
      attr: attr2,
      children
    };
  }
  function isShadowRoot(el) {
    return el != null && el[jsxDomType] === JsxDomType.ShadowRoot;
  }
  var SVGNamespace = "http://www.w3.org/2000/svg";
  var XLinkNamespace = "http://www.w3.org/1999/xlink";
  var XMLNamespace = "http://www.w3.org/XML/1998/namespace";
  function isVisibleChild(value) {
    return !isBoolean(value) && value != null;
  }
  var DomTokenList = typeof DOMTokenList !== "undefined" ? DOMTokenList : function() {
  };
  function className(value) {
    if (Array.isArray(value)) {
      return value.map(className).filter(Boolean).join(" ");
    } else if (value instanceof DomTokenList) {
      return "" + value;
    } else if (isObject(value)) {
      return keys(value).filter((k) => value[k]).join(" ");
    } else if (isVisibleChild(value)) {
      return "" + value;
    } else {
      return "";
    }
  }
  var svg = {
    animate: 0,
    circle: 0,
    clipPath: 0,
    defs: 0,
    desc: 0,
    ellipse: 0,
    feBlend: 0,
    feColorMatrix: 0,
    feComponentTransfer: 0,
    feComposite: 0,
    feConvolveMatrix: 0,
    feDiffuseLighting: 0,
    feDisplacementMap: 0,
    feDistantLight: 0,
    feFlood: 0,
    feFuncA: 0,
    feFuncB: 0,
    feFuncG: 0,
    feFuncR: 0,
    feGaussianBlur: 0,
    feImage: 0,
    feMerge: 0,
    feMergeNode: 0,
    feMorphology: 0,
    feOffset: 0,
    fePointLight: 0,
    feSpecularLighting: 0,
    feSpotLight: 0,
    feTile: 0,
    feTurbulence: 0,
    filter: 0,
    foreignObject: 0,
    g: 0,
    image: 0,
    line: 0,
    linearGradient: 0,
    marker: 0,
    mask: 0,
    metadata: 0,
    path: 0,
    pattern: 0,
    polygon: 0,
    polyline: 0,
    radialGradient: 0,
    rect: 0,
    stop: 0,
    svg: 0,
    switch: 0,
    symbol: 0,
    text: 0,
    textPath: 0,
    tspan: 0,
    use: 0,
    view: 0
  };
  var nonPresentationSVGAttributes = /^(a(ll|t|u)|base[FP]|c(al|lipPathU|on)|di|ed|ex|filter[RU]|g(lyphR|r)|ke|l(en|im)|ma(rker[HUW]|s)|n|pat|pr|point[^e]|re[^n]|s[puy]|st[^or]|ta|textL|vi|xC|y|z)/;
  function Fragment(attr2) {
    const fragment = document.createDocumentFragment();
    appendChild(attr2.children, fragment);
    return fragment;
  }
  var Component = class {
    constructor(props) {
      this.props = props;
    }
    render() {
      return null;
    }
  };
  /* @__PURE__ */ Object.defineProperties(Component.prototype, {
    isReactComponent: {
      value: true
    }
  });
  function initComponentClass(Class, attr2, children) {
    attr2 = {
      ...attr2,
      children
    };
    const instance = new Class(attr2);
    return instance.render();
  }
  function jsx(tag, _ref) {
    let { children, ...attr2 } = _ref;
    if (!attr2.namespaceURI && svg[tag] === 0) {
      attr2 = {
        ...attr2,
        namespaceURI: SVGNamespace
      };
    }
    let node;
    if (isString(tag)) {
      node = attr2.namespaceURI ? document.createElementNS(attr2.namespaceURI, tag) : document.createElement(tag);
      attributes(attr2, node);
      appendChild(children, node);
      if (node instanceof window.HTMLSelectElement && attr2.value != null) {
        if (attr2.multiple === true && Array.isArray(attr2.value)) {
          const values = attr2.value.map((value) => String(value));
          node.querySelectorAll("option").forEach((option) => option.selected = values.includes(option.value));
        } else {
          node.value = attr2.value;
        }
      }
      attachRef(attr2.ref, node);
    } else if (isFunction(tag)) {
      if (isObject(tag.defaultProps)) {
        attr2 = {
          ...tag.defaultProps,
          ...attr2
        };
      }
      node = isComponentClass(tag) ? initComponentClass(tag, attr2, children) : tag({
        ...attr2,
        children
      });
    } else {
      throw new TypeError(`Invalid JSX element type: ${tag}`);
    }
    return node;
  }
  function createElement(tag, attr2) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }
    if (isString(attr2) || Array.isArray(attr2)) {
      children.unshift(attr2);
      attr2 = {};
    }
    attr2 = attr2 || {};
    if (attr2.children != null && !children.length) {
      ;
      ({ children, ...attr2 } = attr2);
    }
    return jsx(
      tag,
      {
        ...attr2,
        children
      },
      attr2.key
    );
  }
  function attachRef(ref, node) {
    if (isRef(ref)) {
      ref.current = node;
    } else if (isFunction(ref)) {
      ref(node);
    }
  }
  function appendChild(child, node) {
    if (isArrayLike(child)) {
      appendChildren(child, node);
    } else if (isString(child) || isNumber(child)) {
      appendChildToNode(document.createTextNode(child), node);
    } else if (child === null) {
      appendChildToNode(document.createComment(""), node);
    } else if (isElement(child)) {
      appendChildToNode(child, node);
    } else if (isShadowRoot(child)) {
      const shadowRoot = node.attachShadow(child.attr);
      appendChild(child.children, shadowRoot);
      attachRef(child.ref, shadowRoot);
    }
  }
  function appendChildren(children, node) {
    for (const child of [...children]) {
      appendChild(child, node);
    }
    return node;
  }
  function appendChildToNode(child, node) {
    if (node instanceof window.HTMLTemplateElement) {
      node.content.appendChild(child);
    } else {
      node.appendChild(child);
    }
  }
  function normalizeAttribute(s, separator) {
    return s.replace(/[A-Z]/g, (match) => separator + match.toLowerCase());
  }
  function style(node, value) {
    if (value == null || value === false)
      ;
    else if (Array.isArray(value)) {
      value.forEach((v) => style(node, v));
    } else if (isString(value)) {
      node.setAttribute("style", value);
    } else if (isObject(value)) {
      forEach(value, (val, key) => {
        if (key.indexOf("-") === 0) {
          node.style.setProperty(key, val);
        } else if (isNumber(val) && isUnitlessNumber[key] !== 0) {
          node.style[key] = val + "px";
        } else {
          node.style[key] = val;
        }
      });
    }
  }
  function attribute(key, value, node) {
    switch (key) {
      case "xlinkActuate":
      case "xlinkArcrole":
      case "xlinkHref":
      case "xlinkRole":
      case "xlinkShow":
      case "xlinkTitle":
      case "xlinkType":
        attrNS(node, XLinkNamespace, normalizeAttribute(key, ":"), value);
        return;
      case "xmlnsXlink":
        attr(node, normalizeAttribute(key, ":"), value);
        return;
      case "xmlBase":
      case "xmlLang":
      case "xmlSpace":
        attrNS(node, XMLNamespace, normalizeAttribute(key, ":"), value);
        return;
    }
    switch (key) {
      case "htmlFor":
        attr(node, "for", value);
        return;
      case "dataset":
        forEach(value, (dataValue, dataKey) => {
          if (dataValue != null) {
            node.dataset[dataKey] = dataValue;
          }
        });
        return;
      case "innerHTML":
      case "innerText":
      case "textContent":
        if (isVisibleChild(value)) {
          node[key] = value;
        }
        return;
      case "dangerouslySetInnerHTML":
        if (isObject(value)) {
          node.innerHTML = value["__html"];
        }
        return;
      case "value":
        if (value == null || node instanceof window.HTMLSelectElement) {
          return;
        } else if (node instanceof window.HTMLTextAreaElement) {
          node.value = value;
          return;
        }
        break;
      case "spellCheck":
        node.spellcheck = value;
        return;
      case "class":
      case "className":
        if (isFunction(value)) {
          value(node);
        } else {
          attr(node, "class", className(value));
        }
        return;
      case "ref":
      case "namespaceURI":
        return;
      case "style":
        style(node, value);
        return;
      case "on":
      case "onCapture":
        forEach(value, (eventHandler, eventName) => {
          node.addEventListener(eventName, eventHandler, key === "onCapture");
        });
        return;
    }
    if (isFunction(value)) {
      if (key[0] === "o" && key[1] === "n") {
        let attribute2 = key.toLowerCase();
        const useCapture = attribute2.endsWith("capture");
        if (attribute2 === "ondoubleclick") {
          attribute2 = "ondblclick";
        } else if (useCapture && attribute2 === "ondoubleclickcapture") {
          attribute2 = "ondblclickcapture";
        }
        if (!useCapture && node[attribute2] === null) {
          node[attribute2] = value;
        } else if (useCapture) {
          node.addEventListener(attribute2.substring(2, attribute2.length - 7), value, true);
        } else {
          let eventName;
          if (attribute2 in window) {
            const standardEventName = attribute2.substring(2);
            eventName = standardEventName;
          } else {
            const customEventName = attribute2[2] + key.slice(3);
            eventName = customEventName;
          }
          node.addEventListener(eventName, value);
        }
      }
    } else if (isObject(value)) {
      node[key] = value;
    } else if (value === true) {
      attr(node, key, "");
    } else if (value !== false && value != null) {
      if (node instanceof SVGElement && !nonPresentationSVGAttributes.test(key)) {
        attr(node, normalizeAttribute(key, "-"), value);
      } else {
        attr(node, key, value);
      }
    }
  }
  function attr(node, key, value) {
    node.setAttribute(key, value);
  }
  function attrNS(node, namespace, key, value) {
    node.setAttributeNS(namespace, key, value);
  }
  function attributes(attr2, node) {
    for (const key of keys(attr2)) {
      attribute(key, attr2[key], node);
    }
    return node;
  }
  var index = {
    Component,
    PureComponent: Component,
    createElement,
    Fragment,
    ShadowRoot
  };

  // src/element/signalcraft-view/index.js
  var import_panzoom = __toESM(require_panzoom(), 1);
  var SignalcraftViewElement = class extends HTMLElement {
    #unsubscribe = [];
    #rootElement;
    #svgElement;
    #svgScene;
    #viewBox;
    #pan;
    #signalcraft;
    constructor() {
      super();
      this.#signalcraft = globalThis.signalcraft;
      this.attachShadow({ mode: "open" });
      this.#templateInitialization();
      this.#signalcraft.nodes.forEach((node) => {
        this.#createNode(node);
      });
      const grandCentral = {
        "setup bgColor": (v) => this.#svgElement.querySelector(".background").setAttribute("fill", v),
        "nodes created ...": this.#createNode,
        "nodes deleted ...": this.#deleteNode
        // 'setup .backgroundColor 2': v => this.#svgElement.getElementById("backgroundColor").setAttribute("fill", v),
        // 'click .button.edit':   this.#something,
        // 'click .button.delete': 'destroy',
        // 'node *': this.#updateNode,
        // 'nodes *': this.#updateNodes,
      };
      this.#signalcraft.integrate(this, grandCentral);
    }
    connectedCallback() {
      this.#setup();
    }
    destroy() {
      this.#unsubscribe.map((o) => o());
    }
    #sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async #setup() {
      await this.#installPanAndZoom();
      await this.#monitorDatabase();
    }
    async #templateInitialization() {
      const div1 = document.createElement("div");
      div1.setAttribute("class", "bg-secondaryd rounded bg-info");
      div1.setAttribute("style", "overflow: hidden;");
      const documentFragment = this.shadowRoot.appendChild(div1);
      this.#rootElement = this.shadowRoot.firstChild;
      this.#svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.#svgElement.setAttributeNS(null, "style", "border: 1px solid gold;");
      this.#svgElement.setAttributeNS(null, "width", "100%");
      this.#svgElement.setAttributeNS(null, "height", "666");
      this.#rootElement.appendChild(this.#svgElement);
      this.#svgElement.appendChild(
        /* @__PURE__ */ index.createElement("defs", null, /* @__PURE__ */ index.createElement("linearGradient", { id: "Gradient2" }, /* @__PURE__ */ index.createElement("stop", { offset: "0%", "stop-color": "#1d2b3a" }), /* @__PURE__ */ index.createElement("stop", { offset: "100%", "stop-color": "#1c293b" })))
      );
      this.#svgScene = document.createElementNS("http://www.w3.org/2000/svg", "g");
      this.#svgScene.setAttributeNS(null, "id", "scene");
      this.#svgElement.appendChild(this.#svgScene);
      const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect2.setAttributeNS(null, "class", "background");
      rect2.setAttributeNS(null, "x", "0");
      rect2.setAttributeNS(null, "y", "0");
      rect2.setAttributeNS(null, "width", 11e3);
      rect2.setAttributeNS(null, "height", 8e3);
      rect2.setAttributeNS(null, "fill", "silver");
      this.#svgScene.appendChild(rect2);
      const circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle3.setAttributeNS(null, "cx", "1050");
      circle3.setAttributeNS(null, "cy", "500");
      circle3.setAttributeNS(null, "r", "50");
      this.#svgScene.appendChild(circle3);
      const circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle4.setAttributeNS(null, "cx", "250");
      circle4.setAttributeNS(null, "cy", "250");
      circle4.setAttributeNS(null, "r", "50");
      this.#svgScene.appendChild(circle4);
      const vertical1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      vertical1.setAttributeNS(null, "x1", "100");
      vertical1.setAttributeNS(null, "y1", "100");
      vertical1.setAttributeNS(null, "x2", "100");
      vertical1.setAttributeNS(null, "y2", "200");
      vertical1.setAttributeNS(null, "stroke", "white");
      this.#svgScene.appendChild(vertical1);
      const horizontal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      horizontal1.setAttributeNS(null, "x1", "50");
      horizontal1.setAttributeNS(null, "y1", "150");
      horizontal1.setAttributeNS(null, "x2", "150");
      horizontal1.setAttributeNS(null, "y2", "150");
      horizontal1.setAttributeNS(null, "stroke", "white");
      this.#svgScene.appendChild(horizontal1);
    }
    #deleteNode({ node: o }) {
      const node = this.#svgElement.getElementById(o.id);
      node.remove();
    }
    #createNode({ node: o }) {
      this.#unsubscribe.push(o.subscribe((o2) => this.#updateNode(o2)));
      this.#svgScene.appendChild(
        /* @__PURE__ */ index.createElement("g", { id: o.id, transform: `translate(${o.x},${o.y})` }, /* @__PURE__ */ index.createElement("rect", { class: "interactive", width: o.w, height: "80", ry: "5", fill: o.bg, dfill: "url(#Gradient2)" }), /* @__PURE__ */ index.createElement("text", { class: "interactive", x: "90", y: "25", "font-size": "12px", fill: "#fff", "text-anchor": "middle", "font-weight": "bold", "font-family": "Arial" }, " Geometry "), /* @__PURE__ */ index.createElement("circle", { class: "interactive", cx: "0", cy: "50", r: "5", fill: "cyan" }), /* @__PURE__ */ index.createElement("text", { class: "interactive", x: "10", y: "55", "font-size": "10px", fill: "#fff", "font-family": "Arial" }, " Geometry "), /* @__PURE__ */ index.createElement("circle", { class: "interactive", cx: o.w, cy: "50", r: "5", fill: "magenta" }))
      );
    }
    #updateNode({ type, name, oldVal, newVal, node: o }) {
      const node = this.#svgElement.getElementById(o.id);
      node.setAttributeNS(null, "transform", `translate(${o.x},${o.y})`);
    }
    async #installPanAndZoom() {
      (0, import_panzoom.default)(this.#svgScene, { smoothScroll: false });
    }
    async #monitorDatabase() {
      const updateNode = (o) => {
      };
      const appendNode = (o) => {
      };
    }
    async #injectNodes() {
      var node = this.#svgElement.getElementById("myNode");
      var drag = {
        enabled: false,
        transform: { x: 10, y: 10 },
        start: { x: 0, y: 0 }
      };
      node.addEventListener("mousedown", (event2) => {
        event2.preventDefault();
        drag.enabled = true;
        var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
        var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;
        drag.start.x = event2.clientX * scaleX - drag.transform.x;
        drag.start.y = event2.clientY * scaleY - drag.transform.y;
      });
      window.addEventListener("mousemove", (event2) => {
        event2.preventDefault();
        if (!drag.enabled)
          return;
        var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
        var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;
        drag.transform.x = event2.clientX * scaleX - drag.start.x;
        drag.transform.y = event2.clientY * scaleY - drag.start.y;
        node.setAttribute(
          "transform",
          `translate(${drag.transform.x},${drag.transform.y})`
        );
      });
      window.addEventListener("mouseup", () => {
        event.preventDefault();
        drag.enabled = false;
      });
    }
  };

  // src/signalcraft.js
  var application = new SignalcraftCore();
  globalThis.signalcraft = application;
  application.start();
  customElements.define("signalcraft-view", SignalcraftViewElement);
  for (let i = 0; i < 100; i++) {
    signalcraft.createNode("color");
  }
  signalcraft.createNode("text");
})();
