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
    constructor({ application: application2, parent, Item, auto }) {
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
      return this.#content[Symbol.iterator]();
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
      this.#content.push(item);
      if (this.#auto && item.start)
        item.start();
      this.#notify("created", { item });
      return item;
    }
    remove(id) {
      const item = this.#content.find((item2) => item2.id === id);
      if (item) {
        if (item.stop)
          item.stop();
        item.deleted = true;
        this.#notify("removed", { item });
      }
    }
    removeDeleted() {
      this.#content = this.#content.filter((item) => !item.deleted);
    }
    find(callback) {
      if (typeof callback !== "function")
        throw new TypeError("Find needs a function.");
      return this.#content.find(callback);
    }
    id(id) {
      return this.#content.find((item) => item.id == id);
    }
    filter(callback) {
      if (typeof callback !== "function")
        throw new TypeError("Find needs a function.");
      return this.#content.filter(callback);
    }
    update(id, property, value) {
      const item = this.#content.find((item2) => item2.id === id);
      if (item && item[property] !== value) {
        const old = item[property];
        item[property] = value;
        this.#notify("updated", { item, property, value, old });
      }
    }
    #observers = {};
    #notify(eventName, eventData) {
      if (Array.isArray(this.#observers[eventName]))
        this.#observers[eventName].forEach((observer) => observer(eventData));
    }
    observe(eventName, observer) {
      this.subscribe(eventName, observer);
      observer({ data: this.#content });
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
      const id = Math.random().toString(36).substring(2);
      this.#monitors[id] = observer;
      return () => {
        delete this.#monitors[id];
      };
    }
    observe(key, observer) {
      this.subscribe(key, observer);
      observer(this[key]);
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
    addNode(type, values) {
      return this.application.Nodes.create({ type, values });
    }
    linkPorts(sourceNode, targetNode, options = { output: "output", input: "input" }) {
      const { output: outputPort, input: inputPort } = options;
      return this.application.Links.create({ sourceNode: sourceNode.id, targetNode: targetNode.id, sourcePort: sourceNode.getPort(outputPort).id, targetPort: targetNode.getPort(inputPort).id });
    }
    async execute(node, port = "output") {
      if (!node)
        throw new Error("you must specify which node to execute");
      const output2 = await node.execute(port);
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

  // src/application/model/Type.js
  var Type = class {
    id;
    type;
    // used in setting up reactive arrays in node (this could be upgraded to a real reactive object but outside of project scope atm)
    input = [];
    output = [];
    constructor({ id, type, application: application2 }) {
      this.id = id || v4_default();
      this.type = type;
    }
  };

  // src/application/model/Node.js
  var import_oneof = __toESM(require_oneof(), 1);

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
    #application;
    #unsubscribe = [];
    #values;
    Input;
    Output;
    constructor({ id, type, values, application: application2 }) {
      super();
      this.#application = application2;
      this.#values = values || {};
      if (!type)
        throw new Error("You must initialize a node with a known type, type was not specified");
      this.Input = new ReactiveArray({ application: application2, parent: this, Item: Input, auto: true });
      this.Output = new ReactiveArray({ application: application2, parent: this, Item: Output, auto: true });
      const archetype = application2.Types.find((o) => o.type == type);
      if (!archetype)
        throw new Error(`Archetype not found. Unrecognized type detected "${type}"`);
      archetype.input.forEach((o) => {
        this.Input.create(o);
      });
      archetype.output.forEach((o) => {
        this.Output.create(o);
      });
      const props = {
        id: id || v4_default(),
        type,
        backgroundColor: (0, import_oneof.default)([`url(#panel-primary)`, `url(#panel-secondary)`]),
        // `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
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
    getPort(name) {
      const inputCandidate = this.Input.find((port) => port.name == name);
      if (inputCandidate)
        return inputCandidate;
      const outputCandidate = this.Output.find((port) => port.name == name);
      if (outputCandidate)
        return outputCandidate;
      if (!output)
        throw new Error(`Port named ${name} was not found on node of type ${this.type}`);
    }
    async #upstream() {
      const response = {};
      for (const localPort of this.Input) {
        response[localPort.name] = [];
        const incomingLinks = this.#application.Links.filter((remoteLink) => remoteLink.targetPort == localPort.id);
        const nothingConnected = incomingLinks.length == 0;
        if (nothingConnected) {
          let currentValue = localPort.value;
          if (this.#values[localPort.name])
            currentValue = this.#values[localPort.name];
          response[localPort.name].push(currentValue);
        } else {
          for (const incomingLink of incomingLinks) {
            const parentNode = this.#application.Nodes.find((node) => node.id == incomingLink.sourceNode);
            const connectedPort = parentNode.Output.find((item) => item.id == incomingLink.sourcePort);
            const result = await parentNode.execute(connectedPort.name);
            response[localPort.name].push(result);
          }
        }
      }
      return response;
    }
    async execute(port) {
      const output2 = this.Output.find((item) => item.name == port);
      if (!output2)
        console.log(this);
      ;
      if (!output2)
        throw new Error(`Port named ${port} was not found on node of type ${this.type}`);
      const response = await output2.generator({ ...await this.#upstream(), value: output2.value });
      return response;
    }
  };

  // src/application/model/Link.js
  var Edge = class extends ReactiveObject {
    application;
    #unsubscribe = [];
    constructor({ application: application2, id, type, sourceNode, targetNode, sourcePort, targetPort }) {
      super();
      this.application = application2;
      const props = {
        id: id || v4_default(),
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
  };

  // src/application/ui/View.js
  var import_panzoom = __toESM(require_panzoom(), 1);
  var import_calculate_percent = __toESM(require_calculate_percent(), 1);

  // modules/domek/index.js
  var svg = new Proxy({}, {
    get: function(target, property) {
      return function(properties, text2) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", property);
        for (const key in properties) {
          if (properties.hasOwnProperty(key)) {
            el.setAttributeNS(null, key, properties[key]);
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
            el.setAttribute(key, properties[key]);
          }
        }
        if (text2)
          el.appendChild(document.createTextNode(text2));
        return el;
      };
    }
  });
  var update2 = function(el, properties) {
    for (const key in properties) {
      if (el.namespaceURI == "http://www.w3.org/2000/svg") {
        el.setAttributeNS(null, key, properties[key]);
      } else {
        el.setAttribute(key, properties[key]);
      }
    }
  };

  // src/application/ui/view/Panel.js
  var import_oneof2 = __toESM(require_oneof(), 1);

  // src/application/ui/view/ux/Component.js
  var Component = class {
    el = {};
    // container of elements
    name;
    data;
    view;
    group = svg.g();
    root = true;
    // by being added it is no longer a root container
    parent = null;
    bounds = {
      x: 0,
      y: 0,
      width: 300,
      height: 0,
      gap: 0,
      margin: 0,
      border: 0,
      padding: 0
    };
    children = [];
    constructor(name, { view } = {}) {
      this.name = name;
      this.view = view;
    }
    get #above() {
      if (this.root)
        return [this];
      const selfIndex = this.parent.children.indexOf(this);
      return [...this.parent.children.slice(0, selfIndex)];
    }
    get y() {
      if (this.root)
        return 0;
      console.log(`#above ${this.name} =`, this.#above.map((o) => o.name).join(", "), this.#above.length, this.#above);
      return 0 + this.parent.y + this.parent.bounds.margin + this.parent.bounds.border + this.parent.bounds.padding + this.#above.reduce((total, child) => total + child.height, 0) + this.parent.bounds.gap * this.#above.length;
    }
    get height() {
      return 0 + this.bounds.margin + this.bounds.border + this.bounds.padding + this.bounds.height + this.children.reduce((total, child) => total + child.height, 0) + this.bounds.gap * (this.children.length > 0 ? this.children.length - 1 : 0) + this.bounds.padding + this.bounds.border + this.bounds.margin;
    }
    add(child) {
      child.root = false;
      child.parent = this;
      child.view = this.view;
      if (!child.data)
        child.data = this.data;
      child.group = this.group;
      this.children.push(child);
      return this;
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
      Object.assign(this.bounds, data);
      return this;
    }
  };

  // src/application/ui/view/ux/Container.js
  var Container = class extends Component {
    setup() {
      this.el.Panel = svg.rect({ class: "interactive", filter: `url(#shadow-primary)`, ry: 5, width: 100, y: this.y, height: this.height, fill: this.data.backgroundColor, stroke: "black" });
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

  // src/application/ui/view/ux/Caption.js
  var Caption = class extends Component {
    setup() {
      this.el.Caption = svg.rect({ class: `caption`, filter: `url(#shadow-primary)`, ry: 5, width: 100, y: this.y, height: this.height, fill: this.data.backgroundColor, stroke: "black" });
      this.el.CaptionText = svg.text({ class: `caption-text`, y: this.y + (this.height - this.height / 5) }, this.data.type);
    }
    render() {
      this.group.appendChild(this.el.Caption);
      this.group.appendChild(this.el.CaptionText);
      this.children.map((child) => child.render());
    }
    update() {
      update2(this.el.Caption, {});
      update2(this.el.CaptionText, {});
    }
  };

  // src/application/ui/view/ux/Pod.js
  var Pod = class extends Component {
    setup() {
      this.el.Pod = svg.rect({ class: "interactive", filter: `url(#shadow-primary)`, ry: 5, width: 100, x: 5, y: this.y, height: this.height, fill: this.data.backgroundColor, stroke: "black" });
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

  // src/application/ui/view/ux/Line.js
  var Line = class extends Component {
    setup() {
      this.el.Line = svg.rect({ class: "interactive", filter: `url(#shadow-primary)`, ry: 5, width: 100, x: 10, y: this.y, height: this.height, fill: this.parent.data.backgroundColor, stroke: "black" });
      this.el.LineText = svg.text({ class: `line-text`, y: this.y + (this.height - this.height / 5) }, this.data.name);
      console.log(this.data);
      this.children.map((child) => child.setup());
    }
    render() {
      this.group.appendChild(this.el.Line);
      this.group.appendChild(this.el.LineText);
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
      container.setBounds({ border: 1 });
      container.setView(view);
      container.setData(data);
      const caption = new Caption(`caption`);
      caption.setBounds({ border: 1, height: 32 });
      container.add(caption);
      const outputPod = new Pod(`outputPod`);
      outputPod.setBounds({ gap: 2, padding: 1, border: 1 });
      container.add(outputPod);
      data.Output.forEach((data2, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({ height: 24 });
        port.setData(data2);
        outputPod.add(port);
      });
      const inputPod = new Pod(`inputPod`);
      inputPod.setBounds({ gap: 2, padding: 1, border: 1 });
      container.add(inputPod);
      data.Input.forEach((data2, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({ height: 24 });
        port.setData(data2);
        inputPod.add(port);
      });
      container.setup();
      container.render();
      console.log(container.height, 12);
      this.cleanup(container);
    }
    stop() {
      this.#cleanup.map((x) => x());
    }
    cleanup(...arg) {
      this.#cleanup.push(...arg);
    }
  };

  // src/application/ui/view/Cable.js
  var Cable = class {
    #application;
    #cleanup = [];
    #link;
    #view;
    #root;
    #name;
    #size;
    #main;
    #home;
    #padd;
    constructor() {
    }
    start({ node, scene, view }) {
    }
    start_OLD(setup) {
      this.#application = setup.link.application;
      this.#link = setup.link;
      this.#view = setup.view;
      this.#root = setup.root;
      this.#name = setup.name;
      this.#size = setup.size;
      this.#main = setup.main;
      this.#home = setup.home;
      this.#padd = setup.padd;
      const sourceNode = this.#application.Nodes.id(this.#link.sourceNode);
      const targetNode = this.#application.Nodes.id(this.#link.targetNode);
      const sourcePort = sourceNode.Output.id(this.#link.sourcePort);
      const targetPort = targetNode.Input.id(this.#link.targetPort);
      let x1 = sourceNode.x + sourcePort.x;
      let y1 = sourceNode.y + sourcePort.y;
      let x2 = targetNode.x + targetPort.x;
      let y2 = targetNode.y + targetPort.y;
      this.el = svg.line({
        class: "ant-trail",
        x1,
        y1,
        x2,
        y2,
        stroke: "white",
        fill: "transparent",
        "stroke-width": 2,
        "vector-effect": "non-scaling-stroke"
      });
      this.#cleanup.push(sourceNode.observe("x", (v) => update2(this.el, { x1: v + sourcePort.x })));
      this.#cleanup.push(sourceNode.observe("y", (v) => update2(this.el, { y1: v + sourcePort.y })));
      this.#cleanup.push(targetNode.observe("x", (v) => update2(this.el, { x2: v + targetPort.x })));
      this.#cleanup.push(targetNode.observe("y", (v) => update2(this.el, { y2: v + targetPort.y })));
      this.#cleanup.push(sourcePort.observe("x", (v) => update2(this.el, { x1: sourceNode.x + v })));
      this.#cleanup.push(sourcePort.observe("y", (v) => update2(this.el, { y1: sourceNode.y + v })));
      this.#cleanup.push(targetPort.observe("x", (v) => update2(this.el, { x2: targetNode.x + v })));
      this.#cleanup.push(targetPort.observe("y", (v) => update2(this.el, { y2: targetNode.y + v })));
    }
    stop() {
      this.el.remove();
      this.#cleanup.map((x) => x());
    }
  };

  // src/application/ui/View.js
  var View = class {
    #application;
    #name;
    #theme = "signalcraft-magenta-theme";
    #element;
    #svg;
    #scene;
    #panzoom;
    #transform;
    #renderers = /* @__PURE__ */ new Map();
    #unsubscribe = [];
    constructor({ name, element, application: application2 }) {
      this.#name = name;
      this.#element = element;
      this.#application = application2;
    }
    start() {
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
          if (e.target.classList.contains("caption"))
            return true;
          if (e.target.classList.contains("ant-trail"))
            return true;
          if (e.target.classList.contains("port"))
            return true;
        }
      });
      this.#panzoom.on("transform", (e) => {
        const { x, y, scale } = this.#panzoom.getTransform();
        this.#transform = { x, y, scale };
        const foo = document.getElementById("value-scale");
        foo.textContent = scale;
      });
      this.#unsubscribe.push(this.#panzoom.dispose);
      this.#installMenu();
      this.application.Nodes.forEach((node) => this.#createPanel(node));
      this.application.Links.forEach((node) => this.#createCable(node));
      const grandCentral = {
        "Setup bgColor": (v) => this.#svg.querySelector(".background").setAttributeNS(null, "fill", v),
        "Nodes created ...": this.#createPanel,
        //   NOTE:
        "Nodes deleted ...": this.#deletePanel,
        //   the node updates it self, here we only ensure it exists, or is removed as needed
        "Links created ...": this.#createCable,
        //   NOTE:
        "Links deleted ...": this.#deleteCable
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
    #installMenu() {
      const container = html.p({ style: "border: 1px solid gold;", class: "p-1" }, "Hello World");
      this.#element.appendChild(container);
      console.log(container);
    }
    #installScene() {
      const scene = document.createElementNS("http://www.w3.org/2000/svg", "g");
      scene.setAttributeNS(null, "id", "scene");
      this.#svg.appendChild(scene);
      const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect2.setAttributeNS(null, "class", "background");
      rect2.setAttributeNS(null, "x", "0");
      rect2.setAttributeNS(null, "y", "0");
      rect2.setAttributeNS(null, "width", 11e3);
      rect2.setAttributeNS(null, "height", 8500);
      rect2.setAttributeNS(null, "fill", "url(#background-primary)");
      scene.appendChild(rect2);
      const vertical1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      vertical1.setAttributeNS(null, "x1", "100");
      vertical1.setAttributeNS(null, "y1", "100");
      vertical1.setAttributeNS(null, "x2", "100");
      vertical1.setAttributeNS(null, "y2", "200");
      vertical1.setAttributeNS(null, "stroke", "white");
      scene.appendChild(vertical1);
      const horizontal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      horizontal1.setAttributeNS(null, "x1", "50");
      horizontal1.setAttributeNS(null, "y1", "150");
      horizontal1.setAttributeNS(null, "x2", "150");
      horizontal1.setAttributeNS(null, "y2", "150");
      horizontal1.setAttributeNS(null, "stroke", "white");
      scene.appendChild(horizontal1);
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
      this.#renderers.get(item.id).stop();
    }
    #createCable({ item }) {
      const cable = new Cable();
      this.#renderers.set(item.id, cable);
      cable.start({ link: item, view: this, scene: this.#scene, name: "cable", size: 3 });
    }
    get application() {
      return this.#application;
    }
    get transform() {
      return this.#transform;
    }
    get scene() {
      return this.#scene;
    }
    get theme() {
      return this.#theme;
    }
  };

  // src/application/Application.js
  var Brain = class extends ReactiveObject {
    Setup;
    // Application Configuration
    Theme;
    // Color/UI Theme
    Types;
    // Node Library
    Nodes;
    // Node Instances
    Links;
    // Port Connections, remember it is not that are connected but the ports of a node
    Views;
    // Node UI
    Dream;
    // User API
    constructor() {
      super();
      this.Types = new ReactiveArray({ application: this, Item: Type, auto: false });
      this.Nodes = new ReactiveArray({ application: this, Item: Node, auto: true });
      this.Links = new ReactiveArray({ application: this, Item: Edge, auto: true });
      this.Views = new ReactiveArray({ application: this, Item: View, auto: false });
      this.Setup = new ReactiveObject(this, { title: "Signalcraft Visual Programming Language System" });
      this.Theme = new MyTheme(this);
      this.Dream = new DreamInterface(this);
    }
    async start() {
      this.Views.start();
    }
    async stop() {
      this.Views.stop();
      this.Nodes.stop();
      this.Links.stop();
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
            case "Links":
              this.Links.subscribe(eventName, handlerFunction.bind(that));
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
    const testTwoThree = application2.Types.create({ type: "test/two-three" });
    testTwoThree.output.push({ name: "output1", generator: ({ value, string }) => {
      return string;
    } });
    testTwoThree.output.push({ name: "output2", generator: ({ value, string }) => {
      return string;
    } });
    testTwoThree.input.push({ name: "string1", type: "string", description: "a string of letters", value: "default value" });
    testTwoThree.input.push({ name: "string2", type: "string", description: "a string of letters", value: "default value" });
    testTwoThree.input.push({ name: "string3", type: "string", description: "a string of letters", value: "default value" });
    const textType = application2.Types.create({ type: "text/string" });
    textType.output.push({ name: "output", generator: ({ value, string }) => {
      return string;
    } });
    textType.input.push({ name: "string", type: "string", description: "a string of letters", value: "default value" });
    const colorType = application2.Types.create({ type: "text/color" });
    colorType.output.push({ name: "output", generator: () => {
      return "TODO";
    } });
    colorType.input.push({ name: "color", type: "string", description: "color" });
    colorType.input.push({ name: "model", type: "string", description: "preferred model" });
    colorType.input.push({ name: "description", type: "string", description: "description" });
    const uppercaseType = application2.Types.create({ type: "text/case" });
    uppercaseType.output.push({ name: "upper", generator: () => {
      return "TODO";
    } });
    uppercaseType.output.push({ name: "lower", generator: () => {
      return "TODO";
    } });
    uppercaseType.input.push({ name: "input" });
    uppercaseType.input.push({ name: "template", type: "string", description: "string template use $input to interpolate" });
    uppercaseType.input.push({ name: "description", type: "string", description: "description" });
    const arrayJoinType = application2.Types.create({ type: "array/join" });
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
    if (0) {
      const stringA = api2.addNode("text/string", { string: "Hello" });
      const stringB = api2.addNode("text/string", { string: "World" });
      const stringC = api2.addNode("text/string", { string: "Meow!" });
      const arrayJn = api2.addNode("array/join");
      api2.linkPorts(stringA, arrayJn);
      api2.linkPorts(stringB, arrayJn);
      const result = await api2.execute(arrayJn);
      console.log("usage.js api.execute said: ", result);
      const actual = JSON.stringify(result);
      const expect = JSON.stringify(["Hello", "World"]);
      console.assert(actual == expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);
    }
    if (1) {
      const stringA = api2.addNode("test/two-three", { string1: "Hello" });
    }
  }

  // src/craft.js
  var application = new Brain();
  setup_default(application);
  application.Views.create({ name: "view-1", element: document.querySelector(".signalcraft-view-1") });
  application.Views.create({ name: "view-2", element: document.querySelector(".signalcraft-view-2") });
  application.start();
  var api = application.Dream;
  usage_default(api);
})();
