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
        var keys = Object.keys(target);
        keys.forEach(function(key) {
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
          keys.forEach(function(key) {
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
          cancel: function(id2) {
            return clearTimeout(id2);
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
        var api2 = {
          getBBox,
          getScreenCTM,
          getOwner,
          applyTransform,
          initTransform
        };
        return api2;
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
        var api2 = {
          getBBox,
          getOwner,
          applyTransform
        };
        return api2;
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
        var api2 = {
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
        eventify(api2);
        var initialX = typeof options.initialX === "number" ? options.initialX : transform.x;
        var initialY = typeof options.initialY === "number" ? options.initialY : transform.y;
        var initialZoom = typeof options.initialZoom === "number" ? options.initialZoom : transform.scale;
        if (initialX != transform.x || initialY != transform.y || initialZoom != transform.scale) {
          zoomAbs(initialX, initialY, initialZoom);
        }
        return api2;
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
          api2.fire(name, api2);
        }
      }
      function parseTransformOrigin(options) {
        if (!options)
          return;
        if (typeof options === "object") {
          if (!isNumber(options.x) || !isNumber(options.y))
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
        var validBounds = isNumber(bounds.left) && isNumber(bounds.top) && isNumber(bounds.bottom) && isNumber(bounds.right);
        if (!validBounds)
          throw new Error(
            "Bounds object is not valid. It can be: undefined, boolean (true|false) or an object {left, top, right, bottom}"
          );
      }
      function isNumber(x) {
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
            var attr = attrs[j];
            var nameValue = getPanzoomAttributeNameValue(attr);
            if (nameValue) {
              options[nameValue.name] = nameValue.value;
            }
          }
          return options;
        }
        function getPanzoomAttributeNameValue(attr) {
          if (!attr.name)
            return;
          var isPanZoomAttribute = attr.name[0] === "p" && attr.name[1] === "z" && attr.name[2] === "-";
          if (!isPanZoomAttribute)
            return;
          var name = attr.name.substr(3);
          var value = JSON.parse(attr.value);
          return { name, value };
        }
      }
      autoRun();
    }
  });

  // node_modules/calculate-percent/index.js
  var require_calculate_percent = __commonJS({
    "node_modules/calculate-percent/index.js"(exports, module) {
      module.exports = function(val, max, min = 0) {
        const range = Math.abs(max - min);
        const value = val - min;
        let percent = 100 * parseFloat(value) / parseFloat(range) / 100;
        return parseInt(percent * 100);
      };
    }
  });

  // node_modules/oneof/index.js
  var require_oneof = __commonJS({
    "node_modules/oneof/index.js"(exports, module) {
      module.exports = function(list2) {
        if (list2 == void 0)
          return null;
        if (list2.length === 0)
          return null;
        var min = 0;
        var max = list2.length - 1;
        var idx = Math.floor(Math.random() * (max - min + 1)) + min;
        return list2[idx];
      };
    }
  });

  // node_modules/lodash/_arrayPush.js
  var require_arrayPush = __commonJS({
    "node_modules/lodash/_arrayPush.js"(exports, module) {
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      module.exports = arrayPush;
    }
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/lodash/_Symbol.js"(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module.exports = getRawTag;
    }
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // node_modules/lodash/_baseIsArguments.js
  var require_baseIsArguments = __commonJS({
    "node_modules/lodash/_baseIsArguments.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      module.exports = baseIsArguments;
    }
  });

  // node_modules/lodash/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/lodash/isArguments.js"(exports, module) {
      var baseIsArguments = require_baseIsArguments();
      var isObjectLike = require_isObjectLike();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      module.exports = isArguments;
    }
  });

  // node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/lodash/isArray.js"(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/lodash/_isFlattenable.js
  var require_isFlattenable = __commonJS({
    "node_modules/lodash/_isFlattenable.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      module.exports = isFlattenable;
    }
  });

  // node_modules/lodash/_baseFlatten.js
  var require_baseFlatten = __commonJS({
    "node_modules/lodash/_baseFlatten.js"(exports, module) {
      var arrayPush = require_arrayPush();
      var isFlattenable = require_isFlattenable();
      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result || (result = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }
        return result;
      }
      module.exports = baseFlatten;
    }
  });

  // node_modules/lodash/flattenDeep.js
  var require_flattenDeep = __commonJS({
    "node_modules/lodash/flattenDeep.js"(exports, module) {
      var baseFlatten = require_baseFlatten();
      var INFINITY = 1 / 0;
      function flattenDeep2(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      module.exports = flattenDeep2;
    }
  });

  // src/application/system/ReactiveArray.js
  var ReactiveArray = class {
    #auto;
    // auto call .start() on all items
    #application;
    #parent;
    #Item = [];
    #content = [];
    constructor({ application: application2, parent, Item, auto } = {}) {
      if (!application2)
        throw new TypeError("application is required");
      if (!Item)
        throw new TypeError("Item is required");
      this.#auto = !!auto;
      this.#application = application2;
      this.#parent = parent;
      this.#Item = Item;
    }
    [Symbol.iterator]() {
      return this.#content.filter((item) => !item.deleted)[Symbol.iterator]();
    }
    dump() {
      return this.#content;
    }
    size() {
      return this.#content.filter((item) => !item.deleted).length;
    }
    forEach(callback) {
      this.#content.filter((item) => !item.deleted).forEach(callback);
    }
    create(argv) {
      const item = new this.#Item({ ...argv, application: this.#application, parent: this.#parent });
      const itemExists = this.#content.find((o) => o.id === item.id);
      if (itemExists)
        console.log(item);
      if (itemExists)
        throw new Error("Item Exixts");
      this.#content.push(item);
      if (this.#auto && item.start)
        item.start();
      this.#notify("created", { item });
      this.#notify("changed", { item, data: this });
      return item;
    }
    clear(hard) {
      return this.#content.filter((item) => !item.deleted).forEach(({ id: id2 }) => this.remove(id2, hard));
    }
    remove(id2, hard) {
      const item = this.#content.find((item2) => item2.id === id2);
      if (item) {
        if (item.stop)
          item.stop();
        item.deleted = true;
        this.#notify("removed", { item });
        this.#notify("changed", { item, data: this });
      } else {
        console.log("ITEM NOT FOUND", id2);
      }
      if (hard)
        this.#content = this.#content.filter((o) => o.id !== id2);
    }
    removeDeleted() {
      this.#content = this.#content.filter((item) => !item.deleted);
    }
    find(callback) {
      if (typeof callback !== "function")
        throw new TypeError("Find needs a function.");
      return this.#content.filter((item) => !item.deleted).find(callback);
    }
    get(id2) {
      return this.#content.find((item) => item.id == id2);
    }
    id(id2) {
      return this.get(id2);
    }
    has(id2) {
      return this.#content.filter((item) => !item.deleted).find((item) => item.id == id2);
    }
    destroy(matcher, hard) {
      if (typeof matcher !== "function")
        throw new TypeError("Find needs a function.");
      return this.#content.filter(matcher).forEach((o) => this.remove(o.id, hard));
    }
    filter(callback) {
      if (typeof callback !== "function")
        throw new TypeError("Find needs a function.");
      return this.#content.filter((item) => !item.deleted).filter(callback);
    }
    update(id2, property, value) {
      const item = this.#content.find((item2) => item2.id === id2);
      if (item && item[property] !== value) {
        const old = item[property];
        item[property] = value;
        this.#notify("updated", { item, property, value, old });
        this.#notify("changed", { item, data: this });
      }
    }
    #observers = {};
    #notify(eventName, eventData) {
      if (Array.isArray(this.#observers[eventName]))
        this.#observers[eventName].forEach((observer) => observer(eventData));
    }
    observe(eventName, observer) {
      observer({ data: this });
      return this.subscribe(eventName, observer);
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
    // Lifecycle
    start(auto = true) {
      this.#auto = auto;
      this.#content.filter((item) => !item.deleted).forEach((item) => item.start());
    }
    stop(auto = false) {
      this.#auto = auto;
      this.#content.filter((item) => !item.deleted).forEach((item) => item.stop());
    }
  };

  // src/application/system/ReactiveObject.js
  var ReactiveObject = class {
    #monitors = {};
    #observers = {};
    #state = {};
    defineReactiveProperty(key, val) {
      this.#state[key] = val;
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
        set: (newValue) => {
          const oldValue = this.#state[key];
          if (newValue === oldValue)
            return;
          this.#state[key] = newValue;
          this.#notifyObservers(key, newValue, oldValue);
          this.#notifyMonitors(key, newValue, oldValue);
        }
      });
    }
    #notifyObservers(key, value) {
      if (Array.isArray(this.#observers[key]))
        this.#observers[key].forEach((observer) => observer(value));
    }
    #notifyMonitors(key, value) {
      Object.values(this.#monitors).forEach((callback) => callback(key, value, this));
    }
    monitor(observer) {
      const id2 = Math.random().toString(36).substring(2);
      this.#monitors[id2] = observer;
      return () => {
        delete this.#monitors[id2];
      };
    }
    observe(key, observer) {
      observer(this[key]);
      return this.subscribe(key, observer);
    }
    subscribe(key, observer) {
      if (typeof observer !== "function")
        throw new TypeError("Observer must be a function.");
      if (!Array.isArray(this.#observers[key]))
        this.#observers[key] = [];
      this.#observers[key].push(observer);
      const value = this[key];
      return () => {
        this.#unsubscribe(key, observer);
      };
    }
    #unsubscribe(key, observer) {
      this.#observers[key] = this.#observers[key].filter((obs) => obs !== observer);
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

  // src/application/Api.js
  var DreamInterface = class {
    application;
    constructor(application2) {
      this.application = application2;
    }
    getApplication() {
      return this.application;
    }
    select(reference) {
      return this.application.Selection.create({ id: reference.id, kind: reference.kind, reference });
    }
    toggleSelect(item) {
      if (this.application.Selection.has(item.id)) {
        return this.application.Selection.remove(item.id, true);
      } else {
        return this.application.Selection.create({ id: item.id, kind: item.kind, reference: item });
      }
    }
    deselect(item) {
      return this.application.Selection.remove(item.id, true);
    }
    deselectAll(item) {
      return this.application.Selection.forEach(({ id: id2 }) => this.application.Selection.remove(id2, true));
    }
    removeSelected() {
      const { Selection, Nodes, Connectors } = this.application;
      Selection.filter((item) => item.kind == "Node").forEach(({ id: id2 }) => Connectors.destroy((link) => link.sourceNode == id2), true);
      Selection.filter((item) => item.kind == "Node").forEach(({ id: id2 }) => Connectors.destroy((link) => link.targetNode == id2), true);
      Selection.filter((item) => item.kind == "Node").forEach(({ id: id2 }) => Nodes.remove(id2, true));
      Selection.filter((item) => item.kind == "Connector").forEach(({ id: id2 }) => Connectors.remove(id2, true));
      Selection.clear(true);
    }
    addNode(type, values) {
      return this.application.Nodes.create({ type, values });
    }
    linkPorts(sourceNode, targetNode, options = { output: "output", input: "input" }) {
      const { output: outputPort, input: inputPort } = options;
      return this.application.Connectors.create({ sourceNode: sourceNode.id, targetNode: targetNode.id, sourcePort: sourceNode.port(outputPort).id, targetPort: targetNode.port(inputPort).id });
    }
    async execute(node, port = "output") {
      if (!node)
        throw new Error("you must specify which node to execute");
      const output2 = await node.Execute.run(port);
      console.log(`Output on port ${port} of node ${node.id}`, output2);
      return output2;
    }
  };

  // src/application/ui/Theme.js
  var Theme = class {
    captionHeight = 48;
    lineHeight = 32;
    gapHeight = 5;
    padding = 5;
    margin = 5;
    panelBackground = "blue";
  };

  // src/Theme.js
  var MyTheme = class extends Theme {
    panelBackground = "blue";
  };

  // src/application/model/Archetype.js
  var Archetype = class {
    id;
    type;
    // used in setting up reactive arrays in node (this could be upgraded to a real reactive object but outside of project scope atm)
    input = [];
    output = [];
    constructor({ id: id2, type, application: application2 }) {
      this.id = id2 || v4_default();
      this.type = type;
    }
  };

  // src/application/execute/Standard.js
  var Standard = class {
    node;
    application;
    constructor(node) {
      this.node = node;
      this.application = node.application;
    }
    async #upstream() {
      const response = {};
      for (const localPort of this.node.Input) {
        response[localPort.name] = [];
        const incomingConnectors = this.application.Connectors.filter((remoteConnector) => remoteConnector.targetPort == localPort.id);
        const nothingConnected = incomingConnectors.length == 0;
        if (nothingConnected) {
          let currentValue = localPort.value;
          if (this.node.values[localPort.name])
            currentValue = this.node.values[localPort.name];
          response[localPort.name].push(currentValue);
        } else {
          for (const incomingConnector of incomingConnectors) {
            const parentNode = this.application.Nodes.find((node) => node.id == incomingConnector.sourceNode);
            const connectedPort = parentNode.Output.find((item) => item.id == incomingConnector.sourcePort);
            const result = await parentNode.Execute.run(connectedPort.name);
            response[localPort.name].push(result);
          }
        }
      }
      return response;
    }
    async run(port) {
      const outputPort = this.node.Output.find((item) => item.name == port);
      if (!outputPort)
        throw new Error(`Port named ${port} was not found on node of type ${this.node.type}`);
      const response = await outputPort.generator({ ...await this.#upstream(), value: outputPort.value });
      return response;
    }
  };

  // src/application/model/node/Input.js
  var Input = class extends ReactiveObject {
    application;
    parent;
    #configuration;
    #setup;
    constructor(configuration) {
      super();
      this.application = configuration.application;
      this.parent = configuration.parent;
      this.#configuration = configuration;
      const defaults = {
        id: v4_default(),
        name: "unnamed",
        direction: "input",
        type: "string",
        description: "none",
        x: 0,
        y: 0,
        generator: () => ({})
      };
      this.#setup = Object.assign({}, defaults, configuration);
      Object.entries(this.#setup).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    }
    get configuration() {
      return this.#configuration;
    }
    read() {
      return {
        /*...*/
      };
    }
  };

  // src/application/model/node/Output.js
  var Output = class extends ReactiveObject {
    application;
    parent;
    #configuration;
    #setup;
    constructor(configuration) {
      super();
      this.application = configuration.application;
      this.parent = configuration.parent;
      this.#configuration = configuration;
      const defaults = {
        id: v4_default(),
        name: "unnamed",
        direction: "reply",
        type: "string",
        description: "none",
        x: 0,
        y: 0,
        generator: () => ({})
      };
      this.#setup = Object.assign({}, defaults, configuration);
      Object.entries(this.#setup).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    }
    get configuration() {
      return this.#configuration;
    }
    read() {
      return {
        /*...*/
      };
    }
  };

  // src/application/model/Node.js
  var Node = class extends ReactiveObject {
    #kind = "Node";
    #application;
    #unsubscribe = [];
    values;
    Input;
    Output;
    Execute;
    constructor({ id: id2, type, values, application: application2 }) {
      super();
      this.#application = application2;
      this.values = values || {};
      if (!type)
        throw new Error("You must initialize a node with a known type, type was not specified");
      this.Execute = new Standard(this);
      this.Input = new ReactiveArray({ application: application2, parent: this, Item: Input, auto: true });
      this.Output = new ReactiveArray({ application: application2, parent: this, Item: Output, auto: true });
      const archetype = application2.Archetypes.find((o) => o.type == type);
      if (!archetype)
        throw new Error(`Archetype not found. Unrecognized type detected "${type}"`);
      archetype.input.forEach((o) => {
        this.Input.create(o);
      });
      archetype.output.forEach((o) => {
        this.Output.create(o);
      });
      const props = {
        id: id2 || v4_default(),
        type,
        backgroundColor: "magenta",
        x: 999 * Math.random(),
        y: 999 * Math.random(),
        nodeWidth: 300,
        nodeHeight: 32,
        depthLevel: 0
      };
      Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    }
    start() {
    }
    stop() {
      this.#unsubscribe.map((o) => o());
    }
    port(name) {
      const inputCandidate = this.Input.find((port) => port.name == name);
      if (inputCandidate)
        return inputCandidate;
      const outputCandidate = this.Output.find((port) => port.name == name);
      if (outputCandidate)
        return outputCandidate;
      if (!output)
        throw new Error(`Port named ${name} was not found on node of type ${this.type}`);
    }
    get kind() {
      return this.#kind;
    }
    get application() {
      return this.#application;
    }
  };

  // src/application/model/Connector.js
  var Connector = class extends ReactiveObject {
    #kind = "Connector";
    application;
    #unsubscribe = [];
    constructor({ application: application2, id: id2, type, sourceNode, targetNode, sourcePort, targetPort }) {
      super();
      this.application = application2;
      const props = {
        id: id2 || v4_default(),
        type,
        sourceNode,
        targetNode,
        sourcePort,
        targetPort,
        backgroundColor: `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
        x1: 1e4 * Math.random(),
        y1: 8e3 * Math.random(),
        x2: 1e4 * Math.random(),
        y2: 8e3 * Math.random(),
        edgeWidth: 10,
        depthLevel: 0
      };
      Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    }
    start() {
    }
    stop() {
      this.#unsubscribe.map((o) => o());
    }
    get kind() {
      return this.#kind;
    }
  };

  // src/application/model/Junction.js
  var Junction = class extends ReactiveObject {
    #kind = "Junction";
    #application;
    #unsubscribe = [];
    values;
    Input;
    Output;
    Execute;
    constructor({ id: id2, values, application: application2 }) {
      super();
      this.#application = application2;
      this.values = values || {};
      this.Execute = new Standard(this);
      this.Input = new ReactiveArray({ application: application2, parent: this, Item: Input, auto: true });
      this.Output = new ReactiveArray({ application: application2, parent: this, Item: Output, auto: true });
      this.Input.create({ name: "input" });
      this.Output.create({ name: "output", generator: ({ input }) => input });
      const props = {
        id: id2 || v4_default(),
        x: 999 * Math.random(),
        y: 999 * Math.random()
      };
      Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    }
    start() {
    }
    stop() {
      this.#unsubscribe.map((o) => o());
    }
    port(name) {
      const inputCandidate = this.Input.find((port) => port.name == name);
      if (inputCandidate)
        return inputCandidate;
      const outputCandidate = this.Output.find((port) => port.name == name);
      if (outputCandidate)
        return outputCandidate;
      if (!output)
        throw new Error(`Port named ${name} was not found on node of type ${this.type}`);
    }
    get kind() {
      return this.#kind;
    }
    get application() {
      return this.#application;
    }
  };

  // src/application/ui/View.js
  var import_panzoom = __toESM(require_panzoom(), 1);
  var import_calculate_percent = __toESM(require_calculate_percent(), 1);

  // modules/domek/index.js
  var kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
  var svg = new Proxy({}, {
    get: function(target, property) {
      return function(properties, text2) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", property);
        for (const key in properties) {
          if (properties.hasOwnProperty(key)) {
            el.setAttributeNS(null, kebabize(key), properties[key]);
          }
        }
        if (text2)
          el.appendChild(document.createTextNode(text2));
        return el;
      };
    }
  });
  var html = new Proxy({}, {
    get: function(target, property) {
      return function(properties, text2) {
        const el = document.createElement(property);
        for (const key in properties) {
          if (properties.hasOwnProperty(key)) {
            el.setAttribute(kebabize(key), properties[key]);
          }
        }
        if (text2)
          el.appendChild(document.createTextNode(text2));
        return el;
      };
    }
  });
  var id = function(str = "") {
    return "id" + str.replaceAll(/ |-/g, "0");
  };
  var text = function(text2) {
    return document.createTextNode(text2);
  };
  var update2 = function(elements, properties) {
    const els = Array.isArray(elements) ? elements : [elements];
    for (const el of els) {
      for (const key in properties) {
        if (el.namespaceURI == "http://www.w3.org/2000/svg") {
          el.setAttributeNS(null, key, properties[key]);
        } else {
          el.setAttribute(key, properties[key]);
        }
      }
    }
  };
  function front(element) {
    const parentElement = element.parentNode;
    parentElement.removeChild(element);
    parentElement.appendChild(element);
  }
  function keyboard(verify, callback) {
    const listener = (e) => {
      if (verify(e)) {
        callback(e);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }

  // src/application/ui/view/Panel.js
  var import_oneof = __toESM(require_oneof(), 1);

  // src/application/ui/view/panel/Component.js
  var Component = class {
    el = {};
    // container of elements
    name;
    data;
    view;
    group = svg.g();
    isRoot = true;
    // by being added it is no longer a root container
    root = null;
    // reference to root
    parent = null;
    bounds = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      gap: 0,
      border: 0,
      padding: 0,
      radius: 0
    };
    children = [];
    #cleanup = [];
    constructor(name, { view } = {}) {
      this.root = this;
      this.name = name;
      this.view = view;
    }
    get #above() {
      if (this.isRoot)
        return [this];
      const selfIndex = this.parent.children.indexOf(this);
      return [...this.parent.children.slice(0, selfIndex)];
    }
    get x() {
      if (this.isRoot)
        return 0;
      return 0 + this.parent.x + this.parent.bounds.border + this.parent.bounds.padding;
    }
    get y() {
      if (this.isRoot)
        return 0;
      return 0 + this.parent.y + this.parent.bounds.border + this.parent.bounds.padding + this.#above.reduce((total, child) => total + child.height, 0) + this.parent.bounds.gap * this.#above.length;
    }
    get width() {
      if (isPercentValue(this.bounds.width))
        return this.siblings.reduce((max, sibling) => sibling.width > max ? sibling.width : max, 0) * (parseInt(this.bounds.width) / 100);
      return 0 + this.bounds.border + this.bounds.padding + (this.bounds.width || this.children.reduce((max, child) => child.width > max ? child.width : max, 0)) + this.bounds.padding + this.bounds.border;
    }
    get height() {
      return 0 + this.bounds.border + this.bounds.padding + this.bounds.height + this.children.reduce((total, child) => total + child.height, 0) + this.bounds.gap * (this.children.length > 0 ? this.children.length - 1 : 0) + this.bounds.padding + this.bounds.border;
    }
    get radius() {
      return this.bounds.radius;
    }
    add(child) {
      child.isRoot = false;
      child.root = this.root;
      child.parent = this;
      child.view = this.view;
      if (!child.data)
        child.data = this.data;
      child.group = this.group;
      this.children.push(child);
      return this;
    }
    get siblings() {
      return this.parent ? this.parent.children.filter((child) => child !== this) : [];
    }
    get all() {
      return [...this.children, ...flatten(this.children.map((child) => child.all))];
    }
    setup() {
      this.children.map((child) => child.setup());
    }
    setData(data) {
      this.data = data;
      return this;
    }
    setView(view) {
      this.view = view;
      return this;
    }
    setBounds(data) {
      if (Object.values(data).filter((item) => typeof item == "string").filter((item) => !item.endsWith("%")).length)
        throw new Error("String without percent is not supported.");
      Object.assign(this.bounds, data);
      return this;
    }
    cleanup(...arg) {
      this.#cleanup.push(...arg);
    }
    stop() {
      this.children.map((child) => child.stop());
      this.#cleanup.map((x) => x());
    }
  };
  function isPercentValue(input) {
    let output2 = false;
    if (typeof input == "string" && input.endsWith("%"))
      output2 = true;
    return output2;
  }

  // src/application/ui/view/panel/Container.js
  var Container = class extends Component {
    setup() {
      this.el.Panel = svg.rect({
        class: "panel-container",
        ry: this.radius,
        width: this.width,
        x: this.x,
        y: this.y,
        height: this.height
      });
      this.cleanup(() => Object.values(this.el).map((el) => el.remove()));
      this.cleanup(this.view.application.Selection.observe("changed", ({ data }) => {
        if (data.has(this.data.id)) {
          this.el.Panel.classList.add("selected");
        } else {
          this.el.Panel.classList.remove("selected");
        }
      }));
      this.children.map((child) => child.setup());
    }
    render() {
      update2(this.group, { "transform": `translate(${this.data.x}, ${this.data.y})` });
      this.view.scene.appendChild(this.group);
      this.group.appendChild(this.el.Panel);
      this.children.map((child) => child.render());
    }
    update() {
      update2(this.el.Panel, {});
    }
  };

  // src/application/ui/view/panel/caption/Movable.js
  var Movable = class {
    #container;
    #handle;
    #read;
    #write;
    #scale;
    // NOTE: set by a setter in this class, it is externaly set as view scale may change
    // local variables
    #dragging = false;
    #initialPosition = { x: 0, y: 0 };
    // handlers for cleanup
    #mouseDownHandler;
    #mouseMoveHandler;
    #mouseUpHandler;
    constructor({ container, handle, read, write }) {
      this.#container = container;
      this.#handle = handle;
      this.#read = read;
      this.#write = write;
      this.#mouseDownHandler = (e) => {
        this.#initialPosition.x = e.clientX;
        this.#initialPosition.y = e.clientY;
        this.#dragging = true;
        this.#container.addEventListener("mousemove", this.#mouseMoveHandler);
      };
      this.#mouseMoveHandler = (e) => {
        let dx = 0;
        let dy = 0;
        dx = e.clientX - this.#initialPosition.x;
        dy = e.clientY - this.#initialPosition.y;
        dx = dx + this.#read("x") * this.#scale;
        dy = dy + this.#read("y") * this.#scale;
        dx = dx / this.#scale;
        dy = dy / this.#scale;
        this.#write("x", dx);
        this.#write("y", dy);
        dx = 0;
        dy = 0;
        this.#initialPosition.x = e.clientX;
        this.#initialPosition.y = e.clientY;
      };
      this.#mouseUpHandler = (e) => {
        this.#dragging = false;
        this.#container.removeEventListener("mousemove", this.#mouseMoveHandler);
      };
      this.#handle.addEventListener("mousedown", this.#mouseDownHandler);
      this.#container.addEventListener("mouseup", this.#mouseUpHandler);
    }
    set scale(value) {
      this.#scale = value;
    }
    stop() {
      this.#handle.removeEventListener("mousedown", this.#mouseDownHandler);
      this.#container.removeEventListener("mousemove", this.#mouseMoveHandler);
      this.#container.removeEventListener("mouseup", this.#mouseUpHandler);
    }
  };

  // src/application/ui/view/panel/caption/Selectable.js
  var Selectable = class {
    #scale;
    // set by setter
    // handlers
    #mouseDownHandler;
    #mouseUpHandler;
    // used in stop/cleanup
    #handle;
    constructor({ handle, action }) {
      this.#handle = handle;
      this.#mouseDownHandler = (e) => {
        action(e);
      };
      this.#mouseUpHandler = (e) => {
      };
      this.#handle.addEventListener("mousedown", this.#mouseDownHandler);
      this.#handle.addEventListener("mouseup", this.#mouseUpHandler);
    }
    set scale(value) {
      this.#scale = value;
    }
    stop() {
      this.#handle.removeEventListener("mousedown", this.#mouseDownHandler);
      this.#handle.removeEventListener("mouseup", this.#mouseUpHandler);
    }
  };

  // src/application/ui/view/panel/caption/Focus.js
  var Focus = class {
    #scale;
    // set by setter
    // handlers
    #mouseDownHandler;
    #mouseUpHandler;
    // used in stop/cleanup
    #handle;
    constructor({ handle, action }) {
      this.#handle = handle;
      this.#mouseDownHandler = (e) => {
        action(e);
      };
      this.#mouseUpHandler = (e) => {
      };
      this.#handle.addEventListener("mousedown", this.#mouseDownHandler);
      this.#handle.addEventListener("mouseup", this.#mouseUpHandler);
    }
    set scale(value) {
      this.#scale = value;
    }
    stop() {
      this.#handle.removeEventListener("mousedown", this.#mouseDownHandler);
      this.#handle.removeEventListener("mouseup", this.#mouseUpHandler);
    }
  };

  // src/application/ui/view/panel/Caption.js
  var Caption = class extends Component {
    setup() {
      this.el.Caption = svg.rect({ class: `panel-caption`, ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
      this.el.CaptionText = svg.text({ class: `panel-caption-text`, x: this.x + this.width * 0.02, y: this.y + (this.height - this.height * 0.12) }, this.data.type);
      this.cleanup(() => Object.values(this.el).map((el) => el.remove()));
      this.cleanup(this.view.application.Selection.observe("changed", ({ data }) => {
        if (data.has(this.data.id)) {
          this.el.Caption.classList.add("selected");
        } else {
          this.el.Caption.classList.remove("selected");
        }
      }));
    }
    render() {
      const { Shortcuts, Dream } = this.view.application;
      this.group.appendChild(this.el.Caption);
      this.group.appendChild(this.el.CaptionText);
      const movable = new Movable({
        container: window,
        // <g> element representing an SVG scene
        handle: this.el.Caption,
        // <rect> that is the caption of a window meant to be dragged
        read: (property) => this.data[property],
        write: (property, value) => this.data[property] = value
      });
      this.cleanup(this.view.observe("transform", (v) => movable.scale = v.scale));
      this.cleanup(() => movable.stop());
      const selectable = new Selectable({
        handle: this.el.Caption,
        action: (e) => {
          const selectingMultiple = Shortcuts.isSelecting(e);
          if (selectingMultiple) {
            Dream.toggleSelect(this.data);
          } else {
            Dream.deselectAll();
            Dream.toggleSelect(this.data);
          }
        }
      });
      this.cleanup(() => selectable.stop());
      const focus = new Focus({
        handle: this.el.Caption,
        action: (e) => {
          front(this.parent.group);
        }
      });
      this.cleanup(() => focus.stop());
      this.children.map((child) => child.render());
    }
    update() {
      update2(this.el.Caption, {});
      update2(this.el.CaptionText, {});
    }
  };

  // src/application/ui/view/panel/Pod.js
  var Pod = class extends Component {
    setup() {
      this.el.Pod = svg.rect({ class: "panel-pod", ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
      this.cleanup(() => Object.values(this.el).map((el) => el.remove()));
      this.children.map((child) => child.setup());
    }
    render() {
      this.group.appendChild(this.el.Pod);
      this.children.map((child) => child.render());
    }
    update() {
      update(this.el.Pod, {});
    }
  };

  // src/application/ui/view/panel/line/Connectable.js
  var Connectable = class {
    #el = {};
    #scale;
    // set by setter
    #dragging = false;
    #initialPosition = { x: 0, y: 0 };
    // handlers
    #mouseDownHandler;
    #mouseMoveHandler;
    #mouseUpHandler;
    // used in stop/cleanup
    #container;
    #handle;
    constructor({ container, handle, canvas, node, port, link }) {
      this.#container = container;
      this.#handle = handle;
      this.#mouseDownHandler = (e) => {
        this.#initialPosition.x = e.clientX;
        this.#initialPosition.y = e.clientY;
        this.#dragging = true;
        this.#el.indicatorLine = svg.line({
          class: "cable-line-indicator line-ant-trail",
          "stroke-width": 2,
          "vector-effect": "non-scaling-stroke"
        });
        canvas.appendChild(this.#el.indicatorLine);
        this.#container.addEventListener("mousemove", this.#mouseMoveHandler);
      };
      this.#mouseMoveHandler = (e) => {
        let dx = 0;
        let dy = 0;
        dx = e.clientX - this.#initialPosition.x;
        dy = e.clientY - this.#initialPosition.y;
        dx = dx + port.x * this.#scale;
        dy = dy + port.y * this.#scale;
        dx = dx / this.#scale;
        dy = dy / this.#scale;
        const geometry = {
          // origin of th eindicator line is the port
          x1: port.x,
          y1: port.y,
          // target of the indicator line is where the cursor is dragging
          x2: dx,
          y2: dy
        };
        update2(this.#el.indicatorLine, geometry);
        dx = 0;
        dy = 0;
      };
      this.#mouseUpHandler = (e) => {
        const isOverAnotherPort = this.#dragging && e.target && e.target.classList.contains("panel-line-port");
        if (isOverAnotherPort) {
          const portAddress = e.target.dataset.portAddress;
          const [targetNodeId, targetPortId] = portAddress.split(":");
          const payload = {
            sourceNode: node.id,
            sourcePort: port.id,
            targetNode: targetNodeId,
            targetPort: targetPortId
          };
          if (payload.sourcePort != payload.targetPort)
            link(payload);
        }
        if (this.#el.indicatorLine)
          this.#el.indicatorLine.remove();
        this.#dragging = false;
        this.#container.removeEventListener("mousemove", this.#mouseMoveHandler);
      };
      this.#handle.addEventListener("mousedown", this.#mouseDownHandler);
      this.#container.addEventListener("mouseup", this.#mouseUpHandler);
    }
    set scale(value) {
      this.#scale = value;
    }
    stop() {
      this.#handle.removeEventListener("mousedown", this.#mouseDownHandler);
      this.#container.removeEventListener("mousemove", this.#mouseMoveHandler);
      this.#container.removeEventListener("mouseup", this.#mouseUpHandler);
    }
  };

  // src/application/ui/view/panel/Line.js
  var Line = class extends Component {
    setup() {
      this.el.Line = svg.rect({ class: "panel-line", ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
      this.el.LineText = svg.text({ class: `panel-line-text`, x: this.x + this.width * 0.02, y: this.y + (this.height - this.height / 5) }, this.data.name);
      this.children.map((child) => child.setup());
      let moveDown = this.height / 2;
      let moveHorizontally = 10;
      if (this.data.direction == "input") {
        const x = this.x - moveHorizontally;
        const y = this.y + moveDown;
        this.el.Port = svg.circle({ class: "panel-line-port", cx: x, cy: y, r: 8, height: this.height / 3 });
        this.data.x = x;
        this.data.y = y;
      } else {
        const x = this.x + this.width + moveHorizontally;
        const y = this.y + moveDown;
        this.el.Port = svg.circle({ class: "panel-line-port", cx: x, cy: y, r: 8, height: this.height / 3 });
        this.data.x = x;
        this.data.y = y;
      }
      this.el.Port.dataset.portAddress = [this.parent.data.id, this.data.id].join(":");
      this.cleanup(() => Object.values(this.el).map((el) => el.remove()));
    }
    render() {
      this.group.appendChild(this.el.Line);
      this.group.appendChild(this.el.LineText);
      this.group.appendChild(this.el.Port);
      if (this.data.direction == "input") {
      } else {
        const connectable = new Connectable({
          container: window,
          // <g> element representing an SVG scene
          handle: this.el.Port,
          canvas: this.group,
          node: this.parent.data,
          port: this.data,
          link: ({ sourceNode, sourcePort, targetNode, targetPort }) => this.view.application.Connectors.create({ sourceNode, sourcePort, targetNode, targetPort })
        });
        this.cleanup(this.view.observe("transform", (v) => connectable.scale = v.scale));
        this.cleanup(() => connectable.stop());
      }
      this.children.map((child) => child.render());
    }
    update() {
      update(this.el.Line, {});
    }
  };

  // src/application/ui/view/Panel.js
  var Panel = class {
    el;
    #cleanup = [];
    start({ data, view }) {
      const container = new Container(`container`);
      container.setBounds({ border: 1, gap: 5, radius: 5, padding: 2 });
      container.setView(view);
      container.setData(data);
      this.cleanup(data.observe("x", (v) => update2(container.group, { "transform": `translate(${v},${data.y})` })));
      this.cleanup(data.observe("y", (v) => update2(container.group, { "transform": `translate(${data.x},${v})` })));
      const caption = new Caption(`caption`);
      caption.setBounds({ border: 1, height: 32, width: "100%", radius: 3, margin: 4 });
      container.add(caption);
      const outputPod = new Pod(`outputPod`);
      outputPod.setBounds({ gap: 2, padding: 1, border: 1, radius: 3 });
      container.add(outputPod);
      const inputPod = new Pod(`inputPod`);
      inputPod.setBounds({ gap: 2, padding: 1, border: 1, radius: 3 });
      container.add(inputPod);
      data.Output.forEach((data2, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({ height: 32, width: 150, radius: 3, margin: 2 });
        port.setData(data2);
        outputPod.add(port);
      });
      data.Input.forEach((data2, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({ height: 32, width: 150, radius: 3 });
        port.setData(data2);
        inputPod.add(port);
      });
      container.setup();
      container.render();
      this.cleanup(() => container.stop());
    }
    stop() {
      this.#cleanup.map((x) => x());
    }
    cleanup(...arg) {
      this.#cleanup.push(...arg);
    }
  };

  // src/application/ui/view/cable/Selectable.js
  var Selectable2 = class {
    #scale;
    // set by setter
    // handlers
    #mouseDownHandler;
    #mouseUpHandler;
    // used in stop/cleanup
    #handle;
    constructor({ handle, action }) {
      this.#handle = handle;
      this.#mouseDownHandler = (e) => {
      };
      this.#mouseUpHandler = (e) => {
        action(e);
      };
      this.#handle.addEventListener("mousedown", this.#mouseDownHandler);
      this.#handle.addEventListener("mouseup", this.#mouseUpHandler);
    }
    set scale(value) {
      this.#scale = value;
    }
    stop() {
      this.#handle.removeEventListener("mousedown", this.#mouseDownHandler);
      this.#handle.removeEventListener("mouseup", this.#mouseUpHandler);
    }
  };

  // src/application/ui/view/Cable.js
  var Cable = class {
    el = {};
    #cleanup = [];
    constructor() {
    }
    start({ link, view }) {
      const { Shortcuts, Dream, Nodes, Selection, Cable: Cable2 } = view.application;
      const sourceNode = Nodes.id(link.sourceNode);
      const targetNode = Nodes.id(link.targetNode);
      const sourcePort = sourceNode.Output.id(link.sourcePort);
      const targetPort = targetNode.Input.id(link.targetPort);
      let x1 = sourceNode.x + sourcePort.x;
      let y1 = sourceNode.y + sourcePort.y;
      let x2 = targetNode.x + targetPort.x;
      let y2 = targetNode.y + targetPort.y;
      this.el.CableClick = svg.line({
        class: "cable-line-ghost",
        x1,
        y1,
        x2,
        y2,
        strokeLinecap: "round"
        // vectorEffect: 'non-scaling-stroke',
      });
      this.el.Cable = svg.line({
        class: "cable-line",
        // class:'cable-line line-ant-trail',
        x1,
        y1,
        x2,
        y2,
        // stroke: "white",
        // fill: 'red',
        // 'width': 5,
        // 'stroke-width': 5,
        strokeLinecap: "round",
        vectorEffect: "non-scaling-stroke"
      });
      this.cleanup(() => Object.values(this.el).map((el) => el.remove()));
      this.cleanup(sourceNode.observe("x", (v) => update2([this.el.Cable, this.el.CableClick], { x1: v + sourcePort.x })));
      this.cleanup(sourceNode.observe("y", (v) => update2([this.el.Cable, this.el.CableClick], { y1: v + sourcePort.y })));
      this.cleanup(targetNode.observe("x", (v) => update2([this.el.Cable, this.el.CableClick], { x2: v + targetPort.x })));
      this.cleanup(targetNode.observe("y", (v) => update2([this.el.Cable, this.el.CableClick], { y2: v + targetPort.y })));
      view.scene.insertBefore(this.el.CableClick, view.scene.firstChild.nextSibling);
      view.scene.insertBefore(this.el.Cable, view.scene.firstChild.nextSibling);
      const selectable = new Selectable2({
        handle: this.el.CableClick,
        action: (e) => {
          const selectingMultiple = Shortcuts.isSelecting(e);
          if (selectingMultiple) {
            Dream.toggleSelect(link);
          } else {
            Dream.deselectAll();
            Dream.toggleSelect(link);
          }
        }
      });
      this.cleanup(() => selectable.stop());
      this.cleanup(Selection.observe("changed", ({ data }) => {
        if (data.has(link.id)) {
          this.el.Cable.classList.add("selected");
        } else {
          this.el.Cable.classList.remove("selected");
        }
      }));
    }
    // start
    cleanup(...arg) {
      this.#cleanup.push(...arg);
    }
    stop() {
      console.log("Cable Cleanup");
      this.#cleanup.map((x) => x());
      this.el.Cable.remove();
    }
  };

  // src/application/ui/view/Menus.js
  var import_oneof2 = __toESM(require_oneof(), 1);

  // src/application/ui/view/menu/Component.js
  var Component2 = class {
    id = v4_default();
    el = {};
    // container of elements
    name;
    data;
    view;
    isRoot = true;
    // by being added it is no longer a root container
    root = null;
    // reference to root
    parent = null;
    defaults = {};
    options = {};
    children = [];
    #cleanup = [];
    constructor(name, options = {}) {
      this.root = this;
      this.name = name;
      this.options = Object.assign({}, options, this.defaults);
    }
    get #above() {
      if (this.isRoot)
        return [this];
      const selfIndex = this.parent.children.indexOf(this);
      return [...this.parent.children.slice(0, selfIndex)];
    }
    add(child) {
      child.isRoot = false;
      child.root = this.root;
      child.parent = this;
      child.view = this.view;
      if (!child.data)
        child.data = this.data;
      child.group = this.group;
      this.children.push(child);
      return this;
    }
    get siblings() {
      return this.parent ? this.parent.children.filter((child) => child !== this) : [];
    }
    get all() {
      return [...this.children, ...flatten(this.children.map((child) => child.all))];
    }
    setup() {
      this.children.map((child) => child.setup());
    }
    setData(data) {
      this.data = data;
      return this;
    }
    setView(view) {
      this.view = view;
      return this;
    }
    cleanup(...arg) {
      this.#cleanup.push(...arg);
    }
  };

  // src/application/ui/view/menu/Dropdown.js
  var Dropdown = class extends Component2 {
    constructor(...args) {
      super(...args);
    }
    setup() {
      this.el.navItemDropdown = document.createElement("li");
      this.el.navItemDropdown.setAttribute("class", "nav-item dropdown");
      const navLinkDropdownToggle = document.createElement("a");
      navLinkDropdownToggle.setAttribute("class", "nav-link dropdown-toggle");
      navLinkDropdownToggle.setAttribute("href", "#");
      navLinkDropdownToggle.setAttribute("role", "button");
      navLinkDropdownToggle.setAttribute("data-bs-toggle", "dropdown");
      navLinkDropdownToggle.setAttribute("aria-expanded", "false");
      this.el.navItemDropdown.appendChild(navLinkDropdownToggle);
      const text2 = document.createTextNode(this.name);
      navLinkDropdownToggle.appendChild(text2);
      const dropdownMenu = document.createElement("ul");
      dropdownMenu.setAttribute("class", "dropdown-menu");
      this.el.navItemDropdown.appendChild(dropdownMenu);
      this.view.application.Archetypes.forEach((typeObject) => {
        const listItem = document.createElement("li");
        dropdownMenu.appendChild(listItem);
        const dropdownItem = document.createElement("div");
        dropdownItem.setAttribute("class", "dropdown-item");
        listItem.appendChild(dropdownItem);
        const text22 = document.createTextNode(typeObject.type);
        dropdownItem.appendChild(text22);
        dropdownItem.addEventListener("click", () => {
          this.view.application.Dream.addNode(typeObject.type);
        });
      });
    }
    render(container) {
      container.appendChild(this.el.navItemDropdown);
    }
  };

  // src/application/ui/view/menu/Offcanvas.js
  var Offcanvas = class extends Component2 {
    defaults = {
      location: "start"
    };
    constructor(...args) {
      super(...args);
    }
    setup() {
      this.el.NavItem = html.li({ class: "nav-item" });
      const navLink = html.a({
        class: "nav-link",
        href: "#",
        dataBsToggle: "offcanvas",
        dataBsTarget: "#" + id(this.id),
        ariaControls: id(this.id)
      });
      this.el.NavItem.appendChild(navLink);
      const text0 = text(this.name);
      navLink.appendChild(text0);
      this.el.Offcanvas = html.div({
        id: id(this.id),
        class: `offcanvas offcanvas-${this.options.location}`,
        dataBsScroll: "true",
        dataBsBackdrop: "false",
        tabindex: "-1",
        ariaLabelledby: "offcanvasScrollingLabel"
      });
      const offcanvasHeader = html.div({ class: "offcanvas-header" });
      this.el.Offcanvas.appendChild(offcanvasHeader);
      const offcanvasTitle = html.h5({ class: "offcanvas-title", id: "offcanvasScrollingLabel" });
      offcanvasHeader.appendChild(offcanvasTitle);
      const text1 = text(this.name);
      offcanvasTitle.appendChild(text1);
      const btnClose = html.button({ type: "button", class: "btn-close", dataBsDismiss: "offcanvas", ariaLabel: "Close" });
      offcanvasHeader.appendChild(btnClose);
      const offcanvasBody = html.div({ class: "offcanvas-body" });
      this.el.Offcanvas.appendChild(offcanvasBody);
      this.view.application.Archetypes.forEach((typeObject) => {
        const p = html.p();
        offcanvasBody.appendChild(p);
        const text2 = text(typeObject.type);
        p.appendChild(text2);
        p.addEventListener("click", () => {
          this.view.application.Dream.addNode(typeObject.type);
        });
      });
      const selectedNodes = html.p({ class: "border border-info rounded p-2" });
      offcanvasBody.appendChild(selectedNodes);
      this.cleanup(this.view.application.Selection.observe("changed", ({ data }) => {
        selectedNodes.replaceChildren();
        data.forEach((item) => {
          const text2 = text(item.kind + " ");
          selectedNodes.appendChild(text2);
        });
      }));
    }
    render(container) {
      container.appendChild(this.el.NavItem);
      this.view.element.appendChild(this.el.Offcanvas);
    }
  };

  // src/application/ui/view/menu/Navbar.js
  var Navbar = class extends Component2 {
    constructor(...args) {
      super(...args);
    }
    setup() {
      this.el.Nav = document.createElement("nav");
      this.el.Nav.setAttribute("class", "navbar navbar-expand-lg bg-body-tertiary");
      const div = document.createElement("div");
      div.setAttribute("class", "container-fluid");
      this.el.Nav.appendChild(div);
      const a = document.createElement("a");
      a.setAttribute("class", "navbar-brand");
      a.setAttribute("href", "#");
      div.appendChild(a);
      const text2 = document.createTextNode(this.name);
      a.appendChild(text2);
      const button = document.createElement("button");
      button.setAttribute("class", "navbar-toggler");
      button.setAttribute("type", "button");
      button.setAttribute("data-bs-toggle", "collapse");
      button.setAttribute("data-bs-target", "#navbarSupportedContent");
      button.setAttribute("aria-controls", "navbarSupportedContent");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Toggle navigation");
      div.appendChild(button);
      const span = document.createElement("span");
      span.setAttribute("class", "navbar-toggler-icon");
      button.appendChild(span);
      const div2 = document.createElement("div");
      div2.setAttribute("class", "collapse navbar-collapse");
      div2.setAttribute("id", "navbarSupportedContent");
      div.appendChild(div2);
      this.el.navbarNavContainer = document.createElement("ul");
      this.el.navbarNavContainer.setAttribute("class", "navbar-nav me-auto mb-2 mb-lg-0");
      div2.appendChild(this.el.navbarNavContainer);
      const form = document.createElement("form");
      form.setAttribute("class", "d-flex");
      form.setAttribute("role", "search");
      div2.appendChild(form);
      const input = document.createElement("input");
      input.setAttribute("class", "form-control me-2");
      input.setAttribute("type", "search");
      input.setAttribute("placeholder", "Search");
      input.setAttribute("aria-label", "Search");
      form.appendChild(input);
      this.children.map((child) => child.setup());
    }
    render(container) {
      container.appendChild(this.el.Nav);
      const allowedClasses = [Dropdown, Offcanvas];
      this.children.filter((instance) => allowedClasses.some((allowedClass) => instance instanceof allowedClass)).map((child) => child.render(this.el.navbarNavContainer));
    }
  };

  // src/application/ui/view/Menus.js
  var Menu = class {
    el;
    #cleanup = [];
    start(view) {
      const navbar = new Navbar(view.name);
      navbar.setView(view);
      const toolbox = new Offcanvas(`Toolbox`, { location: "start" });
      navbar.add(toolbox);
      const propertiesPane = new Offcanvas(`Properties`, { location: "end" });
      navbar.add(propertiesPane);
      const debuggerOutput = new Offcanvas(`Debugger`, { location: "bottom" });
      navbar.add(debuggerOutput);
      navbar.setup();
      navbar.render(view.element);
      this.cleanup(navbar);
    }
    stop() {
      this.#cleanup.map((x) => x());
    }
    cleanup(...arg) {
      this.#cleanup.push(...arg);
    }
  };

  // src/application/ui/View.js
  var View = class extends ReactiveObject {
    #application;
    #name;
    #classPrefix = "scui-";
    #theme = "signalcraft-magenta-theme";
    #element;
    #svg;
    #scene;
    #menus;
    #panzoom;
    #transform;
    #renderers = /* @__PURE__ */ new Map();
    #unsubscribe = [];
    constructor({ name, element, application: application2 }) {
      super();
      this.#name = name;
      this.#element = element;
      this.#application = application2;
      const props = {
        id: v4_default(),
        transform: { x: 0, y: 0, scale: 1 }
      };
      Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    }
    start() {
      keyboard((e) => this.#application.Shortcuts.isDeleting(e), () => this.#application.Dream.removeSelected());
      this.#menus = this.#installMenus();
      this.#svg = this.#installCanvas();
      this.#scene = this.#installScene();
      this.#panzoom = (0, import_panzoom.default)(this.#scene, {
        smoothScroll: false,
        // this is the sluggish post  scrolling effect
        transformOrigin: { x: 0.5, y: 0.5 },
        maxZoom: 10,
        minZoom: 0.1,
        initialX: 500,
        initialY: 500,
        initialZoom: 0.5,
        beforeMouseDown: function(e) {
          if (e.target.classList.contains("panel-caption"))
            return true;
          if (e.target.classList.contains("panel-line-port"))
            return true;
          if (e.target.classList.contains("ant-trail"))
            return true;
        }
      });
      this.#panzoom.on("transform", (e) => {
        const { x, y, scale } = this.#panzoom.getTransform();
        this.transform = { x, y, scale };
      });
      this.#unsubscribe.push(this.#panzoom.dispose);
      this.application.Nodes.forEach((node) => this.#createPanel(node));
      this.application.Connectors.forEach((node) => this.#createCable(node));
      const grandCentral = {
        "Setup bgColor": (v) => this.#svg.querySelector(".background").setAttributeNS(null, "fill", v),
        "Nodes created ...": this.#createPanel,
        //   NOTE:
        "Nodes removed ...": this.#deletePanel,
        //   the node updates it self, here we only ensure it exists, or is removed as needed
        "Connectors created ...": this.#createCable,
        //   NOTE:
        "Connectors removed ...": this.#deleteCable
        //   the node updates it self, here we only ensure it exists, or is removed as needed
      };
      const unintegrate = this.application.integrate(this, grandCentral);
      this.#unsubscribe.push(unintegrate);
    }
    stop() {
      this.#unsubscribe.map((o) => o());
      this.#element.empty();
    }
    #installCanvas() {
      const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg2.setAttributeNS(null, "class", "ui-view");
      svg2.setAttributeNS(null, "width", "100%");
      svg2.setAttributeNS(null, "height", "1000");
      this.#element.appendChild(svg2);
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const gradientSpecification = {
        linearGradient: {
          background: {
            primary: ["#382737", "#3b1f2e", "#241627"],
            secondary: ["#0f181f", "#172029"]
          },
          panel: {
            primary: ["#382737", "#3b1f2e", "#241627"],
            secondary: ["#0f181f", "#172029"],
            caption: ["#0f181f", "#172029"],
            pod: ["#162b39", "#0f2f50"],
            text: ["#9f7c4d", "#c7994b"]
          },
          cable: {
            primary: ["#294666", "#1c293b"],
            secondary: ["#0f181f", "#172029"]
          },
          alert: {
            danger: ["#d07c0c", "#e78f2a", "#f2870a"],
            sucess: ["#075d39", "#097d68"]
          }
        },
        radialGradient: {
          socket: {
            primary: ["#ffbb73", "#ffbb73", "#ea3754", "#4f0f2a"],
            error: ["#dc37eb", "#4a0f4f"]
          }
        }
      };
      for (const gradientType in gradientSpecification) {
        for (const categoryName in gradientSpecification[gradientType]) {
          for (const gradientName in gradientSpecification[gradientType][categoryName]) {
            const colors = gradientSpecification[gradientType][categoryName][gradientName];
            const lineargradient2 = document.createElementNS("http://www.w3.org/2000/svg", gradientType);
            lineargradient2.setAttributeNS(null, "id", `${categoryName}-${gradientName}`);
            lineargradient2.setAttributeNS(null, "gradientTransform", `rotate(16)`);
            let index = 0;
            for (const color of colors) {
              const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
              stop3.setAttributeNS(null, "offset", `${(0, import_calculate_percent.default)(index++, colors.length - 1)}%`);
              stop3.setAttributeNS(null, "stop-color", color);
              lineargradient2.appendChild(stop3);
            }
            defs.appendChild(lineargradient2);
            svg2.appendChild(defs);
          }
        }
      }
      const lineargradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      lineargradient.setAttributeNS(null, "id", "gradient-primary");
      const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      stop.setAttributeNS(null, "offset", "0%");
      stop.setAttributeNS(null, "stop-color", "#294666");
      const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      stop2.setAttributeNS(null, "offset", "100%");
      stop2.setAttributeNS(null, "stop-color", "#1c293b");
      lineargradient.appendChild(stop);
      lineargradient.appendChild(stop2);
      defs.appendChild(lineargradient);
      {
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.setAttribute("id", "shadow-primary");
        filter.setAttribute("filterUnits", "userSpaceOnUse");
        const fedropshadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
        fedropshadow.setAttribute("dx", "1");
        fedropshadow.setAttribute("dy", "1");
        fedropshadow.setAttribute("stdDeviation", "32");
        filter.appendChild(fedropshadow);
        defs.appendChild(filter);
      }
      {
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.setAttribute("id", "socket-shadow");
        filter.setAttribute("filterUnits", "userSpaceOnUse");
        const fedropshadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
        fedropshadow.setAttribute("dx", "1");
        fedropshadow.setAttribute("dy", "1");
        fedropshadow.setAttribute("stdDeviation", "5");
        filter.appendChild(fedropshadow);
        defs.appendChild(filter);
      }
      {
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.setAttribute("id", "glow-primary");
        filter.setAttribute("filterUnits", "userSpaceOnUse");
        const fedropshadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
        fedropshadow.setAttribute("flood-color", "#e72a79");
        fedropshadow.setAttribute("dx", ".4");
        fedropshadow.setAttribute("dy", ".4");
        fedropshadow.setAttribute("stdDeviation", ".5");
        filter.appendChild(fedropshadow);
        defs.appendChild(filter);
      }
      svg2.appendChild(defs);
      return svg2;
    }
    #installMenus() {
      const menus = new Menu();
      menus.start(this);
      this.#unsubscribe.push(() => menus.stop());
    }
    #installScene() {
      const scene = document.createElementNS("http://www.w3.org/2000/svg", "g");
      scene.setAttributeNS(null, "class", "view-scene");
      scene.setAttributeNS(null, "id", "scene");
      this.#svg.appendChild(scene);
      const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect2.setAttributeNS(null, "class", "view-scene-background");
      rect2.setAttributeNS(null, "x", "0");
      rect2.setAttributeNS(null, "y", "0");
      rect2.setAttributeNS(null, "width", 11e3);
      rect2.setAttributeNS(null, "height", 8500);
      scene.appendChild(rect2);
      return scene;
    }
    #deletePanel({ item }) {
      this.#renderers.get(item.id).stop();
    }
    #createPanel({ item }) {
      const panel = new Panel();
      this.#renderers.set(item.id, panel);
      panel.start({ data: item, view: this });
    }
    #deleteCable({ item }) {
      console.log("Delete Cable Issued on ", item);
      this.#renderers.get(item.id).stop();
    }
    #createCable({ item }) {
      const cable = new Cable();
      this.#renderers.set(item.id, cable);
      cable.start({ link: item, view: this });
    }
    get application() {
      return this.#application;
    }
    get transform() {
      return this.#transform;
    }
    get element() {
      return this.#element;
    }
    get scene() {
      return this.#scene;
    }
    get theme() {
      return this.#theme;
    }
    get name() {
      return this.#name;
    }
  };

  // src/application/model/Selected.js
  var Selected = class {
    id;
    kind;
    reference;
    // NOTE: live reference to an object as serializing selected items is a strange thing to do.
    data = {};
    deleted = false;
    constructor({ id: id2, kind, reference }) {
      this.id = id2 || v4_default();
      this.kind = kind;
      this.reference = reference;
    }
  };

  // src/application/Application.js
  var Brain = class extends ReactiveObject {
    Setup;
    // Application Configuration
    Theme;
    // Color/UI Theme
    Archetypes;
    // Node Library
    Nodes;
    // Node Instances
    Connectors;
    // Port Connections, remember it is not that are connected but the ports of a node
    Views;
    // Node UI
    Dream;
    // User API
    Selection;
    // Selection
    constructor() {
      super();
      this.Archetypes = new ReactiveArray({ application: this, Item: Archetype, auto: false });
      this.Nodes = new ReactiveArray({ application: this, Item: Node, auto: true });
      this.Connectors = new ReactiveArray({ application: this, Item: Connector, auto: true });
      this.Junctions = new ReactiveArray({ application: this, Item: Junction, auto: true });
      this.Views = new ReactiveArray({ application: this, Item: View, auto: false });
      this.Setup = new ReactiveObject(this, { title: "Signalcraft Visual Programming Language System" });
      this.Theme = new MyTheme(this);
      this.Dream = new DreamInterface(this);
      this.Selection = new ReactiveArray({ application: this, Item: Selected });
      this.Shortcuts = {
        isDeleting: (e) => e.code == "Delete",
        isSelecting: (e) => e.ctrlKey
        // selecting2: e=>e.ctrlKey&&shiftKey,
      };
    }
    async start() {
      this.Views.start();
    }
    async stop() {
      this.Views.stop();
      this.Nodes.stop();
      this.Connectors.stop();
    }
    // this is a binder patterened after Backbone, not great but not terrible
    integrate(that, map) {
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          const [objectName, eventName, fluff] = key.split(" ");
          const handlerFunction = map[key];
          switch (objectName) {
            case "Setup":
              this.Setup.subscribe(eventName, handlerFunction.bind(that));
              break;
            case "Nodes":
              this.Nodes.subscribe(eventName, handlerFunction.bind(that));
              break;
            case "Connectors":
              this.Connectors.subscribe(eventName, handlerFunction.bind(that));
              break;
            default:
          }
        }
      }
    }
  };

  // src/setup.js
  var import_flattenDeep = __toESM(require_flattenDeep(), 1);
  function setup_default(application2) {
    const testTwoThree = application2.Archetypes.create({ type: "test/two-three" });
    testTwoThree.output.push({ name: "output1", generator: ({ value, string }) => {
      return string;
    } });
    testTwoThree.output.push({ name: "output2", generator: ({ value, string }) => {
      return string;
    } });
    testTwoThree.input.push({ name: "string1", type: "string", description: "a string of letters", value: "default value" });
    testTwoThree.input.push({ name: "string2", type: "string", description: "a string of letters", value: "default value" });
    testTwoThree.input.push({ name: "string3", type: "string", description: "a string of letters", value: "default value" });
    const textType = application2.Archetypes.create({ type: "text/string" });
    textType.output.push({ name: "output", generator: ({ value, string }) => {
      return string;
    } });
    textType.input.push({ name: "string", type: "string", description: "a string of letters", value: "default value" });
    const colorType = application2.Archetypes.create({ type: "text/color" });
    colorType.output.push({ name: "output", generator: () => {
      return "TODO";
    } });
    colorType.input.push({ name: "color", type: "string", description: "color" });
    colorType.input.push({ name: "model", type: "string", description: "preferred model" });
    colorType.input.push({ name: "description", type: "string", description: "description" });
    const uppercaseType = application2.Archetypes.create({ type: "text/case" });
    uppercaseType.output.push({ name: "upper", generator: () => {
      return "TODO";
    } });
    uppercaseType.output.push({ name: "lower", generator: () => {
      return "TODO";
    } });
    uppercaseType.input.push({ name: "input" });
    uppercaseType.input.push({ name: "template", type: "string", description: "string template use $input to interpolate" });
    uppercaseType.input.push({ name: "description", type: "string", description: "description" });
    const arrayJoinType = application2.Archetypes.create({ type: "array/join" });
    arrayJoinType.output.push({
      name: "output",
      generator: ({ input, separator }) => {
        return (0, import_flattenDeep.default)(input);
      }
    });
    arrayJoinType.input.push({ name: "input", type: "*", description: "data to join" });
    arrayJoinType.input.push({ name: "separator", type: "string", description: "separator to use" });
    arrayJoinType.input.push({ name: "duck", type: "string", description: "separator to use" });
  }

  // src/usage.js
  async function usage_default(api2) {
    if (1) {
      const stringA = api2.addNode("text/string", { string: "Hello" });
      const stringB = api2.addNode("text/string", { string: "World" });
      const stringC = api2.addNode("text/string", { string: "Meow!" });
      const arrayJn = api2.addNode("array/join");
      const linkA = api2.linkPorts(stringA, arrayJn);
      const linkB = api2.linkPorts(stringB, arrayJn);
      const result = await api2.execute(arrayJn);
      console.log("usage.js api.execute said: ", result);
      const actual = JSON.stringify(result);
      const expect = JSON.stringify(["Hello", "World"]);
      console.assert(actual == expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);
      const rerun = async function() {
        const result2 = await api2.execute(arrayJn);
        console.log("usage.js RERUN api.execute said: ", result2);
      };
      const app = api2.getApplication();
      app.Connectors.observe("created", rerun);
      app.Connectors.observe("removed", rerun);
    }
    if (0) {
      const stringA = api2.addNode("test/two-three", { string1: "Hello" });
    }
  }

  // src/craft.js
  var application = new Brain();
  setup_default(application);
  application.Views.create({ name: "view-1", element: document.querySelector(".signalcraft-view-1") });
  application.start();
  var api = application.Dream;
  usage_default(api);
})();
