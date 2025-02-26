(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
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

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar2.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar2.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar2.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method") && element.getAttribute("data-to")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    /**
     *
     * @param {number} timeout
     */
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    /**
     *
     */
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    /**
     *
     * @param {*} status
     * @param {*} callback
     */
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    /**
     * @private
     */
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    /**
     * @private
     */
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    /**
     * @private
     */
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    /**
     * @private
     */
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    /**
     * @private
     */
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    /**
     * @private
     */
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    /**
     * @private
     */
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(
        this.socket.onOpen(() => {
          this.rejoinTimer.reset();
          if (this.isErrored()) {
            this.rejoin();
          }
        })
      );
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    /**
     * Join the channel
     * @param {integer} timeout
     * @returns {Push}
     */
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    /**
     * Hook into channel close
     * @param {Function} callback
     */
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
     * Hook into channel errors
     * @param {Function} callback
     */
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    /**
     * Subscribes on channel events
     *
     * Subscription returns a ref counter, which can be used later to
     * unsubscribe the exact event listener
     *
     * @example
     * const ref1 = channel.on("event", do_stuff)
     * const ref2 = channel.on("event", do_other_stuff)
     * channel.off("event", ref1)
     * // Since unsubscription, do_stuff won't fire,
     * // while do_other_stuff will keep firing on the "event"
     *
     * @param {string} event
     * @param {Function} callback
     * @returns {integer} ref
     */
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    /**
     * Unsubscribes off of channel events
     *
     * Use the ref returned from a channel.on() to unsubscribe one
     * handler, or pass nothing for the ref to unsubscribe all
     * handlers for the given event.
     *
     * @example
     * // Unsubscribe the do_stuff handler
     * const ref1 = channel.on("event", do_stuff)
     * channel.off("event", ref1)
     *
     * // Unsubscribe all handlers from event
     * channel.off("event")
     *
     * @param {string} event
     * @param {integer} ref
     */
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    /**
     * @private
     */
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    /**
     * Sends a message `event` to phoenix with the payload `payload`.
     * Phoenix receives this in the `handle_in(event, payload, socket)`
     * function. if phoenix replies or it times out (default 10000ms),
     * then optionally the reply can be received.
     *
     * @example
     * channel.push("event")
     *   .receive("ok", payload => console.log("phoenix replied:", payload))
     *   .receive("error", err => console.log("phoenix errored", err))
     *   .receive("timeout", () => console.log("timed out pushing"))
     * @param {string} event
     * @param {Object} payload
     * @param {number} [timeout]
     * @returns {Push}
     */
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the `receive`
     * hook to bind to the server ack, ie:
     *
     * @example
     * channel.leave().receive("ok", () => alert("left!") )
     *
     * @param {integer} timeout
     * @returns {Push}
     */
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     * @param {string} event
     * @param {Object} payload
     * @param {integer} ref
     * @returns {Object}
     */
    onMessage(_event, payload, _ref) {
      return payload;
    }
    /**
     * @private
     */
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    /**
     * @private
     */
    joinRef() {
      return this.joinPush.ref;
    }
    /**
     * @private
     */
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /**
     * @private
     */
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    /**
     * @private
     */
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    /**
     * @private
     */
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    /**
     * @private
     */
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    /**
     * @private
     */
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    /**
     * @private
     */
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    /**
     * @private
     */
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      setTimeout(() => this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages) {
      this.awaitingBatchAck = true;
      this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
        this.awaitingBatchAck = false;
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    // private
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.primaryPassedHealthCheck = false;
      this.longPollFallbackMs = opts.longPollFallbackMs;
      this.fallbackTimer = null;
      this.sessionStore = opts.sessionStorage || global && global.sessionStorage;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      if (!this.logger && opts.debug) {
        this.logger = (kind, msg, data) => {
          console.log(`${kind}: ${msg}`, data);
        };
      }
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    /**
     * Returns the LongPoll transport reference
     */
    getLongPollTransport() {
      return LongPoll;
    }
    /**
     * Disconnects and replaces the active transport
     *
     * @param {Function} newTransport - The new transport class to instantiate
     *
     */
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    /**
     * Returns the socket protocol
     *
     * @returns {string}
     */
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
     * The fully qualified socket url
     *
     * @returns {string}
     */
    endPointURL() {
      let uri = Ajax.appendParams(
        Ajax.appendParams(this.endPoint, this.params()),
        { vsn: this.vsn }
      );
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
     * Disconnects the socket
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
     *
     * @param {Function} callback - Optional callback which is called after socket is disconnected.
     * @param {integer} code - A status code for disconnection (Optional).
     * @param {string} reason - A textual description of the reason to disconnect. (Optional)
     */
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     *
     * Passing params to connect is deprecated; pass them in the Socket constructor instead:
     * `new Socket("/socket", {params: {user_id: userToken}})`.
     */
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      if (this.longPollFallbackMs && this.transport !== LongPoll) {
        this.connectWithFallback(LongPoll, this.longPollFallbackMs);
      } else {
        this.transportConnect();
      }
    }
    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */
    log(kind, msg, data) {
      this.logger && this.logger(kind, msg, data);
    }
    /**
     * Returns true if a logger has been set on this socket.
     */
    hasLogger() {
      return this.logger !== null;
    }
    /**
     * Registers callbacks for connection open events
     *
     * @example socket.onOpen(function(){ console.info("the socket was opened") })
     *
     * @param {Function} callback
     */
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection close events
     * @param {Function} callback
     */
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection error events
     *
     * @example socket.onError(function(error){ alert("An error occurred") })
     *
     * @param {Function} callback
     */
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection message events
     * @param {Function} callback
     */
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    /**
     * Pings the server and invokes the callback with the RTT in milliseconds
     * @param {Function} callback
     *
     * Returns true if the ping was pushed or false if unable to be pushed.
     */
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    /**
     * @private
     */
    transportConnect() {
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    getSession(key) {
      return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
      this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
      clearTimeout(this.fallbackTimer);
      let established = false;
      let primaryTransport = true;
      let openRef, errorRef;
      let fallback = (reason) => {
        this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
        this.off([openRef, errorRef]);
        primaryTransport = false;
        this.replaceTransport(fallbackTransport);
        this.transportConnect();
      };
      if (this.getSession(`phx:fallback:${fallbackTransport.name}`)) {
        return fallback("memorized");
      }
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      errorRef = this.onError((reason) => {
        this.log("transport", "error", reason);
        if (primaryTransport && !established) {
          clearTimeout(this.fallbackTimer);
          fallback(reason);
        }
      });
      this.onOpen(() => {
        established = true;
        if (!primaryTransport) {
          if (!this.primaryPassedHealthCheck) {
            this.storeSession(`phx:fallback:${fallbackTransport.name}`, "true");
          }
          return this.log("transport", `established ${fallbackTransport.name} fallback`);
        }
        clearTimeout(this.fallbackTimer);
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        this.ping((rtt) => {
          this.log("transport", "connected to primary after", rtt);
          this.primaryPassedHealthCheck = true;
          clearTimeout(this.fallbackTimer);
        });
      });
      this.transportConnect();
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    /**
     * @private
     */
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    /**
     * @private
     */
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    /**
     * @private
     */
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    /**
     * @returns {string}
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    /**
     * @returns {boolean}
     */
    isConnected() {
      return this.connectionState() === "open";
    }
    /**
     * @private
     *
     * @param {Channel}
     */
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c !== channel);
    }
    /**
     * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
     *
     * @param {refs} - list of refs returned by calls to
     *                 `onOpen`, `onClose`, `onError,` and `onMessage`
     */
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    /**
     * Initiates a new channel for the given topic
     *
     * @param {string} topic
     * @param {Object} chanParams - Parameters for the channel
     * @returns {Channel}
     */
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    /**
     * @param {Object} data
     */
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    /**
     * Return the next message ref, accounting for overflows
     * @returns {string}
     */
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading",
    "phx-hook-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF_LOADING = "data-phx-ref-loading";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_REF_LOCK = "data-phx-ref-lock";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_MAGIC_ID = "data-phx-id";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_LV_HISTORY_POSITION = "phx:nav-history-position";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var PHX_RELOAD_STATUS = "__phoenix_reload_status__";
  var LOADER_TIMEOUT = 1;
  var MAX_CHILD_JOIN_ATTEMPTS = 3;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var PHX_PENDING_ATTRS = [PHX_REF_LOADING, PHX_REF_SRC, PHX_REF_LOCK];
  var DYNAMICS = "d";
  var STATIC = "s";
  var ROOT = "r";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, config, liveSocket2) {
      let { chunk_size, chunk_timeout } = config;
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunk_size;
      this.chunkTimeout = chunk_timeout;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.uploadChannel.leave();
      this.errored = true;
      clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk, this.chunkTimeout).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  function detectInvalidStreamInserts(inserts) {
    const errors = /* @__PURE__ */ new Set();
    Object.keys(inserts).forEach((id) => {
      const streamEl = document.getElementById(id);
      if (streamEl && streamEl.parentElement && streamEl.parentElement.getAttribute("phx-update") !== "stream") {
        errors.add(`The stream container with id "${streamEl.parentElement.id}" is missing the phx-update="stream" attribute. Ensure it is set for streams to work properly.`);
      }
    });
    errors.forEach((error) => console.error(error));
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`) && !el.disabled) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          window.requestAnimationFrame(() => {
            let hashEl = this.getHashTargetEl(window.location.hash);
            if (hashEl) {
              hashEl.scrollIntoView();
            } else if (meta.type === "redirect") {
              window.scroll(0, 0);
            }
          });
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value, maxAgeSeconds) {
      let expires = typeof maxAgeSeconds === "number" ? ` max-age=${maxAgeSeconds};` : "";
      document.cookie = `${name}=${value};${expires} path=/`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    deleteCookie(name) {
      document.cookie = `${name}=; max-age=-1; path=/`;
    },
    redirect(toURL, flash) {
      if (flash) {
        this.setCookie("__phoenix_flash__", flash, 60);
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    isAutoUpload(inputEl) {
      return inputEl.hasAttribute("data-phx-auto-upload");
    },
    findUploadInputs(node) {
      const formId = node.id;
      const inputsOutsideForm = this.all(document, `input[type="file"][${PHX_UPLOAD_REF}][form="${formId}"]`);
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`).concat(inputsOutsideForm);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      let wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      let isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
      let isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
      let isTargetNamedTab = e.target.hasAttribute("target") && !e.target.getAttribute("target").startsWith("_");
      return wantsNewTab || isTargetBlank || isDownload || isTargetNamedTab;
    },
    isUnloadableFormSubmit(e) {
      let isDialogSubmit = e.target && e.target.getAttribute("method") === "dialog" || e.submitter && e.submitter.getAttribute("formmethod") === "dialog";
      if (isDialogSubmit) {
        return false;
      } else {
        return !e.defaultPrevented && !this.wantsNewTab(e);
      }
    },
    isNewPageClick(e, currentLocation) {
      let href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
      let url;
      if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      if (e.target.isContentEditable) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e2) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findExistingParentCIDs(node, cids) {
      let parentCids = /* @__PURE__ */ new Set();
      let childrenCids = /* @__PURE__ */ new Set();
      cids.forEach((cid) => {
        this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node).forEach((parent) => {
          parentCids.add(cid);
          this.filterWithinSameLiveView(this.all(parent, `[${PHX_COMPONENT}]`), parent).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => childrenCids.add(childCID));
        });
      });
      childrenCids.forEach((childCid) => parentCids.delete(childCid));
      return parentCids;
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    syncPendingAttrs(fromEl, toEl) {
      if (!fromEl.hasAttribute(PHX_REF_SRC)) {
        return;
      }
      PHX_EVENT_CLASSES.forEach((className) => {
        fromEl.classList.contains(className) && toEl.classList.add(className);
      });
      PHX_PENDING_ATTRS.filter((attr) => fromEl.hasAttribute(attr)).forEach((attr) => {
        toEl.setAttribute(attr, fromEl.getAttribute(attr));
      });
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      if (titleEl) {
        let { prefix, suffix, default: defaultTitle } = titleEl.dataset;
        let isEmpty2 = typeof str !== "string" || str.trim() === "";
        if (isEmpty2 && typeof defaultTitle !== "string") {
          return;
        }
        let inner = isEmpty2 ? defaultTitle : str;
        document.title = `${prefix || ""}${inner || ""}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => {
              if (asyncFilter()) {
                callback();
              }
            });
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              const t = setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
              this.putPrivate(el, THROTTLED, t);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => {
              clearTimeout(this.private(el, THROTTLED));
              this.triggerCycle(el, DEBOUNCE_TRIGGER);
            });
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    // maintains or adds privately used hook information
    // fromEl and toEl can be the same element in the case of a newly added node
    // fromEl and toEl can be any HTML node type, so we need to check if it's an element node
    maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom) {
      if (fromEl.hasAttribute && fromEl.hasAttribute("data-phx-hook") && !toEl.hasAttribute("data-phx-hook")) {
        toEl.setAttribute("data-phx-hook", fromEl.getAttribute("data-phx-hook"));
      }
      if (toEl.hasAttribute && (toEl.hasAttribute(phxViewportTop) || toEl.hasAttribute(phxViewportBottom))) {
        toEl.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    putCustomElHook(el, hook) {
      if (el.isConnected) {
        el.setAttribute("data-phx-hook", "");
      } else {
        console.error(`
        hook attached to non-connected DOM element
        ensure you are calling createHook within your connectedCallback. ${el.outerHTML}
      `);
      }
      this.putPrivate(el, "custom-el-hook", hook);
    },
    getCustomElHook(el) {
      return this.private(el, "custom-el-hook");
    },
    isUsedInput(el) {
      return el.nodeType === Node.ELEMENT_NODE && (this.private(el, PHX_HAS_FOCUSED) || this.private(el, PHX_HAS_SUBMITTED));
    },
    resetForm(form) {
      Array.from(form.elements).forEach((input) => {
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
      });
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    isChildOfAny(el, parents) {
      return !!parents.find((parent) => parent.contains(el));
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let defaultBubble = true;
      let isUploadTarget = target.nodeName === "INPUT" && target.type === "file";
      if (isUploadTarget && name === "click") {
        defaultBubble = false;
      }
      let bubbles = opts.bubbles === void 0 ? defaultBubble : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    // merge attributes from source to target
    // if an element is ignored, we only merge data attributes
    // including removing data attributes that are no longer in the source
    mergeAttrs(target, source, opts = {}) {
      let exclude = new Set(opts.exclude || []);
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (!exclude.has(name)) {
          const sourceValue = source.getAttribute(name);
          if (target.getAttribute(name) !== sourceValue && (!isIgnored || isIgnored && name.startsWith("data-"))) {
            target.setAttribute(name, sourceValue);
          }
        } else {
          if (name === "value" && target.value === source.value) {
            target.setAttribute("value", source.getAttribute(name));
          }
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name) && !PHX_PENDING_ATTRS.includes(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (focused instanceof HTMLSelectElement) {
        focused.focus();
      }
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null && document.body.contains(el);
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode && childNode.nodeType !== Node.COMMENT_NODE) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    },
    isLocked(el) {
      return el.hasAttribute && el.hasAttribute(PHX_REF_LOCK);
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    static isPreflightInProgress(file) {
      return file._preflightInProgress === true;
    }
    static markPreflightInProgress(file) {
      file._preflightInProgress = true;
    }
    constructor(fileEl, file, view, autoUpload) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.autoUpload = autoUpload;
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    isCancelled() {
      return this._isCancelled;
    }
    cancel() {
      this.file._preflightInProgress = false;
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      if (!this.isAutoUpload()) {
        LiveUploader.clearFiles(this.fileEl);
      }
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    //private
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        LiveUploader.untrackFile(this.fileEl, this.file);
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref,
        meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class _LiveUploader {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        if (typeof file.meta === "function") {
          entry.meta = file.meta();
        }
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.updatePrivate(inputEl, "files", [], (existing) => existing.concat(newFiles));
        inputEl.value = null;
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f) && !UploadEntry.isPreflightInProgress(f));
    }
    static markPreflightInProgress(entries) {
      entries.forEach((entry) => UploadEntry.markPreflightInProgress(entry.file));
    }
    constructor(inputEl, view, onComplete) {
      this.autoUpload = dom_default.isAutoUpload(inputEl);
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(_LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view, this.autoUpload));
      _LiveUploader.markPreflightInProgress(this._entries);
      this.numEntriesInProgress = this._entries.length;
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        if (entry.isCancelled()) {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        } else {
          entry.zipPostFlight(resp);
          entry.onDone(() => {
            this.numEntriesInProgress--;
            if (this.numEntriesInProgress === 0) {
              this.onComplete();
            }
          });
        }
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        if (!entry.meta) {
          return acc;
        }
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    anyOf(instance, classes) {
      return classes.find((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex > 0 || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
    },
    attemptFocus(el, interactiveOnly) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
    }
  };
  var aria_default = ARIA;
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view().cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    },
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", (e) => {
          if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
            const nextFocus = e.target.nextElementSibling;
            aria_default.attemptFocus(nextFocus) || aria_default.focusFirst(nextFocus);
          } else {
            aria_default.focusLast(this.el);
          }
        });
        this.focusEnd.addEventListener("focus", (e) => {
          if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
            const nextFocus = e.target.previousElementSibling;
            aria_default.attemptFocus(nextFocus) || aria_default.focusLast(nextFocus);
          } else {
            aria_default.focusFirst(this.el);
          }
        });
        if (!this.el.contains(document.activeElement)) {
          this.el.addEventListener("phx:show-end", () => this.el.focus());
          if (window.getComputedStyle(this.el).display !== "none") {
            aria_default.focusFirst(this.el);
          }
        }
      }
    }
  };
  var findScrollContainer = (el) => {
    if (["HTML", "BODY"].indexOf(el.nodeName.toUpperCase()) >= 0)
      return null;
    if (["scroll", "auto"].indexOf(getComputedStyle(el).overflowY) >= 0)
      return el;
    return findScrollContainer(el.parentElement);
  };
  var scrollTop = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.scrollTop;
    } else {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  };
  var bottom = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().bottom;
    } else {
      return window.innerHeight || document.documentElement.clientHeight;
    }
  };
  var top = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().top;
    } else {
      return 0;
    }
  };
  var isAtViewportTop = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  var isAtViewportBottom = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return Math.ceil(rect.bottom) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.bottom) <= bottom(scrollContainer);
  };
  var isWithinViewport = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  Hooks.InfiniteScroll = {
    mounted() {
      this.scrollContainer = findScrollContainer(this.el);
      let scrollBefore = scrollTop(this.scrollContainer);
      let topOverran = false;
      let throttleInterval = 500;
      let pendingOp = null;
      let onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => true;
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id, _overran: true }, () => {
          pendingOp = null;
        });
      });
      let onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => firstChild.scrollIntoView({ block: "start" });
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id }, () => {
          pendingOp = null;
          window.requestAnimationFrame(() => {
            if (!isWithinViewport(firstChild, this.scrollContainer)) {
              firstChild.scrollIntoView({ block: "start" });
            }
          });
        });
      });
      let onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
        pendingOp = () => lastChild.scrollIntoView({ block: "end" });
        this.liveSocket.execJSHookPush(this.el, bottomEvent, { id: lastChild.id }, () => {
          pendingOp = null;
          window.requestAnimationFrame(() => {
            if (!isWithinViewport(lastChild, this.scrollContainer)) {
              lastChild.scrollIntoView({ block: "end" });
            }
          });
        });
      });
      this.onScroll = (_e) => {
        let scrollNow = scrollTop(this.scrollContainer);
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        let rect = this.el.getBoundingClientRect();
        let topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
        let bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
        let lastChild = this.el.lastElementChild;
        let firstChild = this.el.firstElementChild;
        let isScrollingUp = scrollNow < scrollBefore;
        let isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && isAtViewportTop(firstChild, this.scrollContainer)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && isAtViewportBottom(lastChild, this.scrollContainer)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      if (this.scrollContainer) {
        this.scrollContainer.addEventListener("scroll", this.onScroll);
      } else {
        window.addEventListener("scroll", this.onScroll);
      }
    },
    destroyed() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener("scroll", this.onScroll);
      } else {
        window.removeEventListener("scroll", this.onScroll);
      }
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        let now = Date.now();
        let remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    }
  };
  var hooks_default = Hooks;
  var ElementRef = class {
    static onUnlock(el, callback) {
      if (!dom_default.isLocked(el) && !el.closest(`[${PHX_REF_LOCK}]`)) {
        return callback();
      }
      const closestLock = el.closest(`[${PHX_REF_LOCK}]`);
      const ref = closestLock.closest(`[${PHX_REF_LOCK}]`).getAttribute(PHX_REF_LOCK);
      closestLock.addEventListener(`phx:undo-lock:${ref}`, () => {
        callback();
      }, { once: true });
    }
    constructor(el) {
      this.el = el;
      this.loadingRef = el.hasAttribute(PHX_REF_LOADING) ? parseInt(el.getAttribute(PHX_REF_LOADING), 10) : null;
      this.lockRef = el.hasAttribute(PHX_REF_LOCK) ? parseInt(el.getAttribute(PHX_REF_LOCK), 10) : null;
    }
    // public
    maybeUndo(ref, phxEvent, eachCloneCallback) {
      if (!this.isWithin(ref)) {
        return;
      }
      this.undoLocks(ref, phxEvent, eachCloneCallback);
      this.undoLoading(ref, phxEvent);
      if (this.isFullyResolvedBy(ref)) {
        this.el.removeAttribute(PHX_REF_SRC);
      }
    }
    // private
    isWithin(ref) {
      return !(this.loadingRef !== null && this.loadingRef > ref && (this.lockRef !== null && this.lockRef > ref));
    }
    // Check for cloned PHX_REF_LOCK element that has been morphed behind
    // the scenes while this element was locked in the DOM.
    // When we apply the cloned tree to the active DOM element, we must
    //
    //   1. execute pending mounted hooks for nodes now in the DOM
    //   2. undo any ref inside the cloned tree that has since been ack'd
    undoLocks(ref, phxEvent, eachCloneCallback) {
      if (!this.isLockUndoneBy(ref)) {
        return;
      }
      let clonedTree = dom_default.private(this.el, PHX_REF_LOCK);
      if (clonedTree) {
        eachCloneCallback(clonedTree);
        dom_default.deletePrivate(this.el, PHX_REF_LOCK);
      }
      this.el.removeAttribute(PHX_REF_LOCK);
      let opts = { detail: { ref, event: phxEvent }, bubbles: true, cancelable: false };
      this.el.dispatchEvent(new CustomEvent(`phx:undo-lock:${this.lockRef}`, opts));
    }
    undoLoading(ref, phxEvent) {
      if (!this.isLoadingUndoneBy(ref)) {
        if (this.canUndoLoading(ref) && this.el.classList.contains("phx-submit-loading")) {
          this.el.classList.remove("phx-change-loading");
        }
        return;
      }
      if (this.canUndoLoading(ref)) {
        this.el.removeAttribute(PHX_REF_LOADING);
        let disabledVal = this.el.getAttribute(PHX_DISABLED);
        let readOnlyVal = this.el.getAttribute(PHX_READONLY);
        if (readOnlyVal !== null) {
          this.el.readOnly = readOnlyVal === "true" ? true : false;
          this.el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          this.el.disabled = disabledVal === "true" ? true : false;
          this.el.removeAttribute(PHX_DISABLED);
        }
        let disableRestore = this.el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          this.el.innerText = disableRestore;
          this.el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let opts = { detail: { ref, event: phxEvent }, bubbles: true, cancelable: false };
        this.el.dispatchEvent(new CustomEvent(`phx:undo-loading:${this.loadingRef}`, opts));
      }
      PHX_EVENT_CLASSES.forEach((name) => {
        if (name !== "phx-submit-loading" || this.canUndoLoading(ref)) {
          dom_default.removeClass(this.el, name);
        }
      });
    }
    isLoadingUndoneBy(ref) {
      return this.loadingRef === null ? false : this.loadingRef <= ref;
    }
    isLockUndoneBy(ref) {
      return this.lockRef === null ? false : this.lockRef <= ref;
    }
    isFullyResolvedBy(ref) {
      return (this.loadingRef === null || this.loadingRef <= ref) && (this.lockRef === null || this.lockRef <= ref);
    }
    // only remove the phx-submit-loading class if we are not locked
    canUndoLoading(ref) {
      return this.lockRef === null || this.lockRef <= ref;
    }
  };
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    // We do the following to optimize append/prepend operations:
    //   1) Track ids of modified elements & of new elements
    //   2) All the modified elements are put back in the correct position in the DOM tree
    //      by storing the id of their previous sibling
    //   3) New elements are going to be put in the right place by morphdom during append.
    //      For prepend, we move them to the first position in the container
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(
              curFromNodeChild,
              fromEl,
              true
              /* skip keyed nodes */
            );
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          var beforeUpdateResult = onBeforeElUpdated(fromEl, toEl);
          if (beforeUpdateResult === false) {
            return;
          } else if (beforeUpdateResult instanceof HTMLElement) {
            fromEl = beforeUpdateResult;
            indexTree(fromEl);
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(
                              curFromNodeChild,
                              fromEl,
                              true
                              /* skip keyed nodes */
                            );
                          }
                          curFromNodeChild = matchingFromEl;
                          curFromNodeKey = getNodeKey(curFromNodeChild);
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(
                  curFromNodeChild,
                  fromEl,
                  true
                  /* skip keyed nodes */
                );
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    constructor(view, container, id, html, streams, targetCID, opts = {}) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.streamComponentRestore = {};
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
      this.withChildren = opts.withChildren || opts.undoRef || false;
      this.undoRef = opts.undoRef;
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      let phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform(isJoinPatch) {
      let { view, liveSocket: liveSocket2, html, container, targetContainer } = this;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let added = [];
      let updates = [];
      let appendPrependUpdates = [];
      let externalFormTriggered = null;
      function morph(targetContainer2, source, withChildren = this.withChildren) {
        let morphCallbacks = {
          // normally, we are running with childrenOnly, as the patch HTML for a LV
          // does not include the LV attrs (data-phx-session, etc.)
          // when we are patching a live component, we do want to patch the root element as well;
          // another case is the recursive patch of a stream item that was kept on reset (-> onBeforeNodeAdded)
          childrenOnly: targetContainer2.getAttribute(PHX_COMPONENT) === null && !withChildren,
          getNodeKey: (node) => {
            if (dom_default.isPhxDestroyed(node)) {
              return null;
            }
            if (isJoinPatch) {
              return node.id;
            }
            return node.id || node.getAttribute && node.getAttribute(PHX_MAGIC_ID);
          },
          // skip indexing from children when container is stream
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          // tell morphdom how to add a child
          addChild: (parent, child) => {
            let { ref, streamAt } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            this.setStreamRef(child, ref);
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              let lastChild = parent.lastElementChild;
              if (lastChild && !lastChild.hasAttribute(PHX_STREAM_REF)) {
                let nonStreamChild = Array.from(parent.children).find((c) => !c.hasAttribute(PHX_STREAM_REF));
                parent.insertBefore(child, nonStreamChild);
              } else {
                parent.appendChild(child);
              }
            } else if (streamAt > 0) {
              let sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
          },
          onBeforeNodeAdded: (el) => {
            dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
            this.trackBefore("added", el);
            let morphedEl = el;
            if (this.streamComponentRestore[el.id]) {
              morphedEl = this.streamComponentRestore[el.id];
              delete this.streamComponentRestore[el.id];
              morph.call(this, morphedEl, el, true);
            }
            return morphedEl;
          },
          onNodeAdded: (el) => {
            if (el.getAttribute) {
              this.maybeReOrderStream(el, true);
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [PHX_STREAM, "append", "prepend"])) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el, false);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            if (fromEl.id && fromEl.isSameNode(targetContainer2) && fromEl.id !== toEl.id) {
              morphCallbacks.onNodeDiscarded(fromEl);
              fromEl.replaceWith(toEl);
              return morphCallbacks.onNodeAdded(toEl);
            }
            dom_default.syncPendingAttrs(fromEl, toEl);
            dom_default.maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom);
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              this.maybeReOrderStream(fromEl);
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              [PHX_SESSION, PHX_STATIC, PHX_ROOT_ID].map((attr) => [attr, fromEl.getAttribute(attr), toEl.getAttribute(attr)]).forEach(([attr, fromVal, toVal]) => {
                if (toVal && fromVal !== toVal) {
                  fromEl.setAttribute(attr, toVal);
                }
              });
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: dom_default.isIgnored(fromEl, phxUpdate) });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            let focusedSelectChanged = isFocusedFormEl && this.isChangedSelect(fromEl, toEl);
            if (fromEl.hasAttribute(PHX_REF_SRC) && fromEl.getAttribute(PHX_REF_LOCK) != this.undoRef) {
              if (dom_default.isUploadInput(fromEl)) {
                dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              let isLocked = fromEl.hasAttribute(PHX_REF_LOCK);
              let clone2 = isLocked ? dom_default.private(fromEl, PHX_REF_LOCK) || fromEl.cloneNode(true) : null;
              if (clone2) {
                dom_default.putPrivate(fromEl, PHX_REF_LOCK, clone2);
                if (!isFocusedFormEl) {
                  fromEl = clone2;
                }
              }
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            if (isFocusedFormEl && fromEl.type !== "hidden" && !focusedSelectChanged) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (focusedSelectChanged) {
                fromEl.blur();
              }
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return fromEl;
            }
          }
        };
        morphdom_esm_default(targetContainer2, source, morphCallbacks);
      }
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          inserts.forEach(([key, streamAt, limit]) => {
            this.streamInserts[key] = { ref, streamAt, limit, reset };
          });
          if (reset !== void 0) {
            dom_default.all(container, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              this.removeStreamChildElement(child);
            });
          }
          deleteIds.forEach((id) => {
            let child = container.querySelector(`[id="${id}"]`);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        if (isJoinPatch) {
          dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`, (el) => {
            this.liveSocket.owner(el, (view2) => {
              if (view2 === this.view) {
                Array.from(el.children).forEach((child) => {
                  this.removeStreamChildElement(child);
                });
              }
            });
          });
        }
        morph.call(this, targetContainer, html);
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
        detectInvalidStreamInserts(this.streamInserts);
        Array.from(document.querySelectorAll("input[name=id]")).forEach((node) => {
          if (node.form) {
            console.error('Detected an input with name="id" inside a form! This will cause problems when patching the DOM.\n', node);
          }
        });
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        Object.getPrototypeOf(externalFormTriggered).submit.call(externalFormTriggered);
      }
      return true;
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfter("discarded", el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child) {
      if (this.streamInserts[child.id]) {
        this.streamComponentRestore[child.id] = child;
        child.remove();
      } else {
        if (!this.maybePendingRemove(child)) {
          child.remove();
          this.onNodeDiscarded(child);
        }
      }
    }
    getStreamInsert(el) {
      let insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    setStreamRef(el, ref) {
      dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
    }
    maybeReOrderStream(el, isNew) {
      let { ref, streamAt, reset } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      this.setStreamRef(el, ref);
      if (!reset && !isNew) {
        return;
      }
      if (!el.parentElement) {
        return;
      }
      if (streamAt === 0) {
        el.parentElement.insertBefore(el, el.parentElement.firstElementChild);
      } else if (streamAt > 0) {
        let children = Array.from(el.parentElement.children);
        let oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          el.parentElement.appendChild(el);
        } else {
          let sibling = children[streamAt];
          if (oldIndex > streamAt) {
            el.parentElement.insertBefore(el, sibling);
          } else {
            el.parentElement.insertBefore(el, sibling.nextElementSibling);
          }
        }
      }
      this.maybeLimitStream(el);
    }
    maybeLimitStream(el) {
      let { limit } = this.getStreamInsert(el);
      let children = limit !== null && Array.from(el.parentElement.children);
      if (limit && limit < 0 && children.length > limit * -1) {
        children.slice(0, children.length + limit).forEach((child) => this.removeStreamChildElement(child));
      } else if (limit && limit >= 0 && children.length > limit) {
        children.slice(limit).forEach((child) => this.removeStreamChildElement(child));
      }
    }
    transitionPendingRemoves() {
      let { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves, () => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
    }
    isChangedSelect(fromEl, toEl) {
      if (!(fromEl instanceof HTMLSelectElement) || fromEl.multiple) {
        return false;
      }
      if (fromEl.options.length !== toEl.options.length) {
        return true;
      }
      toEl.value = fromEl.value;
      return !fromEl.isEqualNode(toEl);
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
  };
  var VOID_TAGS = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var quoteChars = /* @__PURE__ */ new Set(["'", '"']);
  var modifyRoot = (html, attrs, clearInnerHTML) => {
    let i = 0;
    let insideComment = false;
    let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
    let lookahead = html.match(/^(\s*(?:<!--.*?-->\s*)*)<([^\s\/>]+)/);
    if (lookahead === null) {
      throw new Error(`malformed html ${html}`);
    }
    i = lookahead[0].length;
    beforeTag = lookahead[1];
    tag = lookahead[2];
    tagNameEndsAt = i;
    for (i; i < html.length; i++) {
      if (html.charAt(i) === ">") {
        break;
      }
      if (html.charAt(i) === "=") {
        let isId = html.slice(i - 3, i) === " id";
        i++;
        let char = html.charAt(i);
        if (quoteChars.has(char)) {
          let attrStartsAt = i;
          i++;
          for (i; i < html.length; i++) {
            if (html.charAt(i) === char) {
              break;
            }
          }
          if (isId) {
            id = html.slice(attrStartsAt + 1, i);
            break;
          }
        }
      }
    }
    let closeAt = html.length - 1;
    insideComment = false;
    while (closeAt >= beforeTag.length + tag.length) {
      let char = html.charAt(closeAt);
      if (insideComment) {
        if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
          insideComment = false;
          closeAt -= 4;
        } else {
          closeAt -= 1;
        }
      } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
        insideComment = true;
        closeAt -= 3;
      } else if (char === ">") {
        break;
      } else {
        closeAt -= 1;
      }
    }
    afterTag = html.slice(closeAt + 1, html.length);
    let attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
    if (clearInnerHTML) {
      let idAttrStr = id ? ` id="${id}"` : "";
      if (VOID_TAGS.has(tag)) {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
      } else {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
      }
    } else {
      let rest = html.slice(tagNameEndsAt, closeAt + 1);
      newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
    }
    return [newHTML, beforeTag, afterTag];
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.magicId = 0;
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      let [str, streams] = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids, true, {});
      return [str, streams];
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids, streams: /* @__PURE__ */ new Set() };
      this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
      return [output.buffer, output.streams];
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    resetRender(cid) {
      if (this.rendered[COMPONENTS][cid]) {
        this.rendered[COMPONENTS][cid].reset = true;
      }
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff, true);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        let isObjVal = isObject(val);
        if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
      if (target[ROOT]) {
        target.newRender = true;
      }
    }
    // Merges cid trees together, copying statics from source tree.
    //
    // The `pruneMagicId` is passed to control pruning the magicId of the
    // target. We must always prune the magicId when we are sharing statics
    // from another component. If not pruning, we replicate the logic from
    // mutableMerge, where we set newRender to true if there is a root
    // (effectively forcing the new version to be rendered instead of skipped)
    //
    cloneMerge(target, source, pruneMagicId) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
        } else if (val === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, {}, pruneMagicId);
        }
      }
      if (pruneMagicId) {
        delete merged.magicId;
        delete merged.newRender;
      } else if (target[ROOT]) {
        merged.newRender = true;
      }
      return merged;
    }
    componentToString(cid) {
      let [str, streams] = this.recursiveCIDToString(this.rendered[COMPONENTS], cid, null);
      let [strippedHTML, _before, _after] = modifyRoot(str, {});
      return [strippedHTML, streams];
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    // private
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    nextMagicID() {
      this.magicId++;
      return `m${this.magicId}-${this.parentViewId()}`;
    }
    // Converts rendered tree to output buffer.
    //
    // changeTracking controls if we can apply the PHX_SKIP optimization.
    // It is disabled for comprehensions since we must re-render the entire collection
    // and no individual element is tracked inside the comprehension.
    toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let isRoot = rendered[ROOT];
      let prevBuffer = output.buffer;
      if (isRoot) {
        output.buffer = "";
      }
      if (changeTracking && isRoot && !rendered.magicId) {
        rendered.newRender = true;
        rendered.magicId = this.nextMagicID();
      }
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output, changeTracking);
        output.buffer += statics[i];
      }
      if (isRoot) {
        let skip = false;
        let attrs;
        if (changeTracking || rendered.magicId) {
          skip = changeTracking && !rendered.newRender;
          attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
        } else {
          attrs = rootAttrs;
        }
        if (skip) {
          attrs[PHX_SKIP] = true;
        }
        let [newRoot, commentBefore, commentAfter] = modifyRoot(output.buffer, attrs, skip);
        rendered.newRender = false;
        output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics, [STREAM]: stream } = rendered;
      let [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          let changeTracking = false;
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output, changeTracking);
          output.buffer += statics[i];
        }
      }
      if (stream !== void 0 && (rendered[DYNAMICS].length > 0 || deleteIds.length > 0 || reset)) {
        delete rendered[STREAM];
        rendered[DYNAMICS] = [];
        output.streams.add(stream);
      }
    }
    dynamicToBuffer(rendered, templates, output, changeTracking) {
      if (typeof rendered === "number") {
        let [str, streams] = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output, changeTracking, {});
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let attrs = { [PHX_COMPONENT]: cid };
      let skip = onlyCids && !onlyCids.has(cid);
      component.newRender = !skip;
      component.magicId = `c${cid}-${this.parentViewId()}`;
      let changeTracking = !component.reset;
      let [html, streams] = this.recursiveToString(component, components, onlyCids, changeTracking, attrs);
      delete component.reset;
      return [html, streams];
    }
  };
  var focusStack = [];
  var default_transition_time = 200;
  var JS = {
    // private
    exec(e, eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, { callback: defaults && defaults.callback }];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind) {
          args = __spreadValues(__spreadValues({}, defaultArgs), args);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(view.liveSocket, sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](e, eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    // returns true if any part of the element is inside the viewport
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      return rect.right > 0 && rect.bottom > 0 && rect.left < windowWidth && rect.top < windowHeight;
    },
    // private
    // commands
    exec_exec(e, eventType, phxEvent, view, sourceEl, el, { attr, to }) {
      let nodes = to ? dom_default.all(document, to) : [sourceEl];
      nodes.forEach((node) => {
        let encodedJS = node.getAttribute(attr);
        if (!encodedJS) {
          throw new Error(`expected ${attr} to contain JS command on "${to}"`);
        }
        view.liveSocket.execJS(node, encodedJS, eventType);
      });
    },
    exec_dispatch(e, eventType, phxEvent, view, sourceEl, el, { event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(e, eventType, phxEvent, view, sourceEl, el, args) {
      let { event, data, target, page_loading, loading, value, dispatcher, callback } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      const handler = (targetView, targetCtx) => {
        if (!targetView.isConnected()) {
          return;
        }
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          let { submitter } = args;
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, submitter, pushOpts, callback);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts, callback);
        }
      };
      if (args.targetView && args.targetCtx) {
        handler(args.targetView, args.targetCtx);
      } else {
        view.withinTargets(phxTarget, handler);
      }
    },
    exec_navigate(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(e, href, replace ? "replace" : "push", null, sourceEl);
    },
    exec_patch(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(e, href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(e, eventType, phxEvent, view, sourceEl, el) {
      aria_default.attemptFocus(el);
    },
    exec_focus_first(e, eventType, phxEvent, view, sourceEl, el) {
      aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el);
    },
    exec_push_focus(e, eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => focusStack.push(el || sourceEl));
    },
    exec_pop_focus(_e, _eventType, _phxEvent, _view, _sourceEl, _el) {
      window.requestAnimationFrame(() => {
        const el = focusStack.pop();
        if (el) {
          el.focus();
        }
      });
    },
    exec_add_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view, blocking);
    },
    exec_remove_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view, blocking);
    },
    exec_toggle_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.toggleClasses(el, names, transition, time, view, blocking);
    },
    exec_toggle_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val1, val2] }) {
      this.toggleAttr(el, attr, val1, val2);
    },
    exec_transition(e, eventType, phxEvent, view, sourceEl, el, { time, transition, blocking }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view, blocking);
    },
    exec_toggle(e, eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time, blocking }) {
      this.toggle(eventType, view, el, display, ins, outs, time, blocking);
    },
    exec_show(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.show(eventType, view, el, display, transition, time, blocking);
    },
    exec_hide(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.hide(eventType, view, el, display, transition, time, blocking);
    },
    exec_set_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(e, eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    // utils for commands
    show(eventType, view, el, display, transition, time, blocking) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time, blocking);
      }
    },
    hide(eventType, view, el, display, transition, time, blocking) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time, blocking);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time, blocking) {
      time = time || default_transition_time;
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          let onEnd = () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          let onEnd = () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          };
          el.dispatchEvent(new Event("phx:show-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        }
      } else {
        if (this.isVisible(el)) {
          el.dispatchEvent(new Event("phx:hide-start"));
          dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
          el.dispatchEvent(new Event("phx:hide-end"));
        } else {
          el.dispatchEvent(new Event("phx:show-start"));
          let stickyDisplay = display || this.defaultDisplay(el);
          dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
          el.dispatchEvent(new Event("phx:show-end"));
        }
      }
    },
    toggleClasses(el, classes, transition, time, view, blocking) {
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let newAdds = classes.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let newRemoves = classes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        this.addOrRemoveClasses(el, newAdds, newRemoves, transition, time, view, blocking);
      });
    },
    toggleAttr(el, attr, val1, val2) {
      if (el.hasAttribute(attr)) {
        if (val2 !== void 0) {
          if (el.getAttribute(attr) === val1) {
            this.setOrRemoveAttrs(el, [[attr, val2]], []);
          } else {
            this.setOrRemoveAttrs(el, [[attr, val1]], []);
          }
        } else {
          this.setOrRemoveAttrs(el, [], [attr]);
        }
      } else {
        this.setOrRemoveAttrs(el, [[attr, val1]], []);
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view, blocking) {
      time = time || default_transition_time;
      let [transitionRun, transitionStart, transitionEnd] = transition || [[], [], []];
      if (transitionRun.length > 0) {
        let onStart = () => {
          this.addOrRemoveClasses(el, transitionStart, [].concat(transitionRun).concat(transitionEnd));
          window.requestAnimationFrame(() => {
            this.addOrRemoveClasses(el, transitionRun, []);
            window.requestAnimationFrame(() => this.addOrRemoveClasses(el, transitionEnd, transitionStart));
          });
        };
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transitionEnd), removes.concat(transitionRun).concat(transitionStart));
        if (blocking === false) {
          onStart();
          setTimeout(onDone, time);
        } else {
          view.transition(time, onStart, onDone);
        }
        return;
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(liveSocket2, sourceEl, { to }) {
      let defaultQuery = () => {
        if (typeof to === "string") {
          return document.querySelectorAll(to);
        } else if (to.closest) {
          let toEl = sourceEl.closest(to.closest);
          return toEl ? [toEl] : [];
        } else if (to.inner) {
          return sourceEl.querySelectorAll(to.inner);
        }
      };
      return to ? liveSocket2.jsQuerySelectorAll(sourceEl, to, defaultQuery) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    },
    transitionClasses(val) {
      if (!val) {
        return null;
      }
      let [trans, tStart, tEnd] = Array.isArray(val) ? val : [val.split(" "), [], []];
      trans = Array.isArray(trans) ? trans : trans.split(" ");
      tStart = Array.isArray(tStart) ? tStart : tStart.split(" ");
      tEnd = Array.isArray(tEnd) ? tEnd : tEnd.split(" ");
      return [trans, tStart, tEnd];
    }
  };
  var js_default = JS;
  var HOOK_ID = "hookId";
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return dom_default.private(el, HOOK_ID);
    }
    constructor(view, el, callbacks) {
      this.el = el;
      this.__attachView(view);
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      dom_default.putPrivate(this.el, HOOK_ID, this.constructor.makeID());
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __attachView(view) {
      if (view) {
        this.__view = () => view;
        this.liveSocket = view.liveSocket;
      } else {
        this.__view = () => {
          throw new Error(`hook not yet attached to a live view: ${this.el.outerHTML}`);
        };
        this.liveSocket = null;
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
      dom_default.deletePrivate(this.el, HOOK_ID);
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    /**
     * Binds the hook to JS commands.
     *
     * @param {ViewHook} hook - The ViewHook instance to bind.
     *
     * @returns {Object} An object with methods to manipulate the DOM and execute JavaScript.
     */
    js() {
      let hook = this;
      return {
        /**
         * Executes encoded JavaScript in the context of the hook element.
         *
         * @param {string} encodedJS - The encoded JavaScript string to execute.
         */
        exec(encodedJS) {
          hook.__view().liveSocket.execJS(hook.el, encodedJS, "hook");
        },
        /**
         * Shows an element.
         *
         * @param {HTMLElement} el - The element to show.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.display] - The CSS display value to set. Defaults "block".
         * @param {string} [opts.transition] - The CSS transition classes to set when showing.
         * @param {number} [opts.time] - The transition duration in milliseconds. Defaults 200.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *  Defaults `true`.
         */
        show(el, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          js_default.show("hook", owner, el, opts.display, opts.transition, opts.time, opts.blocking);
        },
        /**
         * Hides an element.
         *
         * @param {HTMLElement} el - The element to hide.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition classes to set when hiding.
         * @param {number} [opts.time] - The transition duration in milliseconds. Defaults 200.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        hide(el, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          js_default.hide("hook", owner, el, null, opts.transition, opts.time, opts.blocking);
        },
        /**
         * Toggles the visibility of an element.
         *
         * @param {HTMLElement} el - The element to toggle.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.display] - The CSS display value to set. Defaults "block".
         * @param {string} [opts.in] - The CSS transition classes for showing.
         *   Accepts either the string of classes to apply when toggling in, or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-0", "opacity-100"]
         *
         * @param {string} [opts.out] - The CSS transition classes for hiding.
         *   Accepts either string of classes to apply when toggling out, or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         *
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        toggle(el, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          opts.in = js_default.transitionClasses(opts.in);
          opts.out = js_default.transitionClasses(opts.out);
          js_default.toggle("hook", owner, el, opts.display, opts.in, opts.out, opts.time, opts.blocking);
        },
        /**
         * Adds CSS classes to an element.
         *
         * @param {HTMLElement} el - The element to add classes to.
         * @param {string|string[]} names - The class name(s) to add.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition property to set.
         *   Accepts a string of classes to apply when adding classes or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-0", "opacity-100"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        addClass(el, names, opts = {}) {
          names = Array.isArray(names) ? names : names.split(" ");
          let owner = hook.__view().liveSocket.owner(el);
          js_default.addOrRemoveClasses(el, names, [], opts.transition, opts.time, owner, opts.blocking);
        },
        /**
         * Removes CSS classes from an element.
         *
         * @param {HTMLElement} el - The element to remove classes from.
         * @param {string|string[]} names - The class name(s) to remove.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition classes to set.
         *   Accepts a string of classes to apply when removing classes or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        removeClass(el, names, opts = {}) {
          opts.transition = js_default.transitionClasses(opts.transition);
          names = Array.isArray(names) ? names : names.split(" ");
          let owner = hook.__view().liveSocket.owner(el);
          js_default.addOrRemoveClasses(el, [], names, opts.transition, opts.time, owner, opts.blocking);
        },
        /**
         * Toggles CSS classes on an element.
         *
         * @param {HTMLElement} el - The element to toggle classes on.
         * @param {string|string[]} names - The class name(s) to toggle.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition classes to set.
         *   Accepts a string of classes to apply when toggling classes or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        toggleClass(el, names, opts = {}) {
          opts.transition = js_default.transitionClasses(opts.transition);
          names = Array.isArray(names) ? names : names.split(" ");
          let owner = hook.__view().liveSocket.owner(el);
          js_default.toggleClasses(el, names, opts.transition, opts.time, owner, opts.blocking);
        },
        /**
         * Applies a CSS transition to an element.
         *
         * @param {HTMLElement} el - The element to apply the transition to.
         * @param {string|string[]} transition - The transition class(es) to apply.
         *   Accepts a string of classes to apply when transitioning or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {Object} [opts={}] - Optional settings.
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        transition(el, transition, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          js_default.addOrRemoveClasses(el, [], [], js_default.transitionClasses(transition), opts.time, owner, opts.blocking);
        },
        /**
         * Sets an attribute on an element.
         *
         * @param {HTMLElement} el - The element to set the attribute on.
         * @param {string} attr - The attribute name to set.
         * @param {string} val - The value to set for the attribute.
         */
        setAttribute(el, attr, val) {
          js_default.setOrRemoveAttrs(el, [[attr, val]], []);
        },
        /**
         * Removes an attribute from an element.
         *
         * @param {HTMLElement} el - The element to remove the attribute from.
         * @param {string} attr - The attribute name to remove.
         */
        removeAttribute(el, attr) {
          js_default.setOrRemoveAttrs(el, [], [attr]);
        },
        /**
         * Toggles an attribute on an element between two values.
         *
         * @param {HTMLElement} el - The element to toggle the attribute on.
         * @param {string} attr - The attribute name to toggle.
         * @param {string} val1 - The first value to toggle between.
         * @param {string} val2 - The second value to toggle between.
         */
        toggleAttribute(el, attr, val1, val2) {
          js_default.toggleAttr(el, attr, val1, val2);
        }
      };
    }
    pushEvent(event, payload = {}, onReply) {
      if (onReply === void 0) {
        return new Promise((resolve, reject) => {
          try {
            const ref = this.__view().pushHookEvent(this.el, null, event, payload, (reply, _ref) => resolve(reply));
            if (ref === false) {
              reject(new Error("unable to push hook event. LiveView not connected"));
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      return this.__view().pushHookEvent(this.el, null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply) {
      if (onReply === void 0) {
        return new Promise((resolve, reject) => {
          try {
            this.__view().withinTargets(phxTarget, (view, targetCtx) => {
              const ref = view.pushHookEvent(this.el, targetCtx, event, payload, (reply, _ref) => resolve(reply));
              if (ref === false) {
                reject(new Error("unable to push hook event. LiveView not connected"));
              }
            });
          } catch (error) {
            reject(error);
          }
        });
      }
      return this.__view().withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(this.el, targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view().dispatchUploads(null, name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view().withinTargets(phxTarget, (view, targetCtx) => {
        view.dispatchUploads(targetCtx, name, files);
      });
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var prependFormDataKey = (key, prefix) => {
    let isArray = key.endsWith("[]");
    let baseKey = isArray ? key.slice(0, -2) : key;
    baseKey = baseKey.replace(/([^\[\]]+)(\]?$)/, `${prefix}$1$2`);
    if (isArray) {
      baseKey += "[]";
    }
    return baseKey;
  };
  var serializeForm = (form, metadata, onlyNames = []) => {
    const _a = metadata, { submitter } = _a, meta = __objRest(_a, ["submitter"]);
    let injectedElement;
    if (submitter && submitter.name) {
      const input = document.createElement("input");
      input.type = "hidden";
      const formId = submitter.getAttribute("form");
      if (formId) {
        input.setAttribute("form", formId);
      }
      input.name = submitter.name;
      input.value = submitter.value;
      submitter.parentElement.insertBefore(input, submitter);
      injectedElement = input;
    }
    const formData = new FormData(form);
    const toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    const params = new URLSearchParams();
    let elements = Array.from(form.elements);
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        let inputs = elements.filter((input) => input.name === key);
        let isUnused = !inputs.some((input) => dom_default.private(input, PHX_HAS_FOCUSED) || dom_default.private(input, PHX_HAS_SUBMITTED));
        let hidden = inputs.every((input) => input.type === "hidden");
        if (isUnused && !(submitter && submitter.name == key) && !hidden) {
          params.append(prependFormDataKey(key, "_unused_"), "");
        }
        params.append(key, val);
      }
    }
    if (submitter && injectedElement) {
      submitter.parentElement.removeChild(injectedElement);
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class _View {
    static closestView(el) {
      let liveViewEl = el.closest(PHX_VIEW_SELECTOR);
      return liveViewEl ? dom_default.private(liveViewEl, "view") : null;
    }
    constructor(el, liveSocket2, parentView, flash, liveReferer) {
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      dom_default.putPrivate(this.el, "view", this);
      this.id = this.el.id;
      this.ref = 0;
      this.lastAckRef = null;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pendingForms = /* @__PURE__ */ new Set();
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinAttempts = 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.formsForRecovery = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        let url = this.href && this.expandURL(this.href);
        return {
          redirect: this.redirect ? url : void 0,
          url: this.redirect ? void 0 : url || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_mount_attempts"] = this.joinAttempts;
      params["_live_referer"] = liveReferer;
      this.joinAttempts++;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(
        PHX_CONNECTED_CLASS,
        PHX_LOADING_CLASS,
        PHX_ERROR_CLASS,
        PHX_CLIENT_ERROR_CLASS,
        PHX_SERVER_ERROR_CLASS
      );
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    // calls the callback with the view and target element for the given phxTarget
    // targets can be:
    //  * an element itself, then it is simply passed to liveSocket.owner;
    //  * a CID (Component ID), then we first search the component's element in the DOM
    //  * a selector, then we search the selector in the DOM and call the callback
    //    for each element found with the corresponding owner view
    withinTargets(phxTarget, callback, dom = document, viewEl) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(viewEl || this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(dom.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      callback({ diff, reply, events });
      if (typeof title === "string" || type == "mount") {
        window.requestAnimationFrame(() => dom_default.putTitle(title));
      }
    }
    onJoin(resp) {
      let { rendered, container, liveview_version } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      if (this.root === this) {
        this.formsForRecovery = this.getFormsForRecovery();
      }
      if (this.isMain() && window.history.state === null) {
        browser_default.pushState("replace", {
          type: "patch",
          id: this.id,
          position: this.liveSocket.currentHistoryPosition
        });
      }
      if (liveview_version !== this.liveSocket.version()) {
        console.error(`LiveView asset version mismatch. JavaScript version ${this.liveSocket.version()} vs. server ${liveview_version}. To avoid issues, please ensure that your assets use the same version as the server.`);
      }
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        this.joinCount++;
        this.joinAttempts = 0;
        this.maybeRecoverForms(html, () => {
          this.onJoinComplete(resp, html, streams, events);
        });
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (el) => {
        el.removeAttribute(PHX_REF_LOADING);
        el.removeAttribute(PHX_REF_SRC);
        el.removeAttribute(PHX_REF_LOCK);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        if (fromEl) {
          fromEl.setAttribute(PHX_ROOT_ID, this.root.id);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    // this is invoked for dead and live views, so we must filter by
    // by owner to ensure we aren't duplicating hooks across disconnect
    // and connected states. This also handles cases where hooks exist
    // in a root layout with a LV in the body
    execNewMounted(parent = this.el) {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      dom_default.all(parent, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
        if (this.ownsElement(hookEl)) {
          dom_default.maintainPrivateHooks(hookEl, hookEl, phxViewportTop, phxViewportBottom);
          this.maybeAddNewHook(hookEl);
        }
      });
      dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        if (this.ownsElement(hookEl)) {
          this.maybeAddNewHook(hookEl);
        }
      });
      dom_default.all(parent, `[${this.binding(PHX_MOUNTED)}]`, (el) => {
        if (this.ownsElement(el)) {
          this.maybeMounted(el);
        }
      });
    }
    applyJoinPatch(live_patch, html, streams, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false, true);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el) {
      let newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids, isJoinPatch = false) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      this.liveSocket.triggerDOM("onPatchStart", [patch.targetContainer]);
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
        let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
        dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform(isJoinPatch);
      this.afterElementsRemoved(removedEls, pruneCids);
      this.liveSocket.triggerDOM("onPatchEnd", [patch.targetContainer]);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-hook]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    maybeRecoverForms(html, callback) {
      const phxChange = this.binding("change");
      const oldForms = this.root.formsForRecovery;
      let template = document.createElement("template");
      template.innerHTML = html;
      const rootEl = template.content.firstElementChild;
      rootEl.id = this.id;
      rootEl.setAttribute(PHX_ROOT_ID, this.root.id);
      rootEl.setAttribute(PHX_SESSION, this.getSession());
      rootEl.setAttribute(PHX_STATIC, this.getStatic());
      rootEl.setAttribute(PHX_PARENT_ID, this.parent ? this.parent.id : null);
      const formsToRecover = (
        // we go over all forms in the new DOM; because this is only the HTML for the current
        // view, we can be sure that all forms are owned by this view:
        dom_default.all(template.content, "form").filter((newForm) => newForm.id && oldForms[newForm.id]).filter((newForm) => !this.pendingForms.has(newForm.id)).filter((newForm) => oldForms[newForm.id].getAttribute(phxChange) === newForm.getAttribute(phxChange)).map((newForm) => {
          return [oldForms[newForm.id], newForm];
        })
      );
      if (formsToRecover.length === 0) {
        return callback();
      }
      formsToRecover.forEach(([oldForm, newForm], i) => {
        this.pendingForms.add(newForm.id);
        this.pushFormRecovery(oldForm, newForm, template.content.firstElementChild, () => {
          this.pendingForms.delete(newForm.id);
          if (i === formsToRecover.length - 1) {
            callback();
          }
        });
      });
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      var _a;
      if (el.id === this.id) {
        return this;
      } else {
        return (_a = this.children[el.getAttribute(PHX_PARENT_ID)]) == null ? void 0 : _a[el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new _View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.pendingForms.clear();
      this.formsForRecovery = {};
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findExistingParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let [html, streams] = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff) : null;
        let [html, streams] = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let [html, streams] = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, streams, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      let hookElId = ViewHook.elementID(el);
      if (el.getAttribute && !this.ownsElement(el)) {
        return;
      }
      if (hookElId && !this.viewHooks[hookElId]) {
        let hook = dom_default.getCustomElHook(el) || logError(`no hook found for custom element: ${el.id}`);
        this.viewHooks[hookElId] = hook;
        hook.__attachView(this);
        return hook;
      } else if (hookElId || !el.getAttribute) {
        return;
      } else {
        let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
        let callbacks = this.liveSocket.getHookCallbacks(hookName);
        if (callbacks) {
          if (!el.id) {
            logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
          }
          let hook = new ViewHook(this, el, callbacks);
          this.viewHooks[ViewHook.elementID(hook.el)] = hook;
          return hook;
        } else if (hookName !== null) {
          logError(`unknown hook found for "${hookName}"`, el);
        }
      }
    }
    destroyHook(hook) {
      const hookId = ViewHook.elementID(hook.el);
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[hookId];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      let children = this.root.children[this.id] || {};
      for (let id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      let e = new CustomEvent("phx:server-navigate", { detail: { to, kind, flash } });
      this.liveSocket.historyRedirect(e, url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash, reloadToken }) {
      this.liveSocket.redirect(to, flash, reloadToken);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    joinPush() {
      this.joinPush = this.joinPush || this.channel.join();
      return this.joinPush;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.wrapPush(() => this.channel.join(), {
        ok: (resp) => this.liveSocket.requestDOMUpdate(() => this.onJoin(resp)),
        error: (error) => this.onJoinError(error),
        timeout: () => this.onJoinError({ reason: "timeout" })
      });
    }
    onJoinError(resp) {
      if (resp.reason === "reload") {
        this.log("error", () => [`failed mount with ${resp.status}. Falling back to page reload`, resp]);
        this.onRedirect({ to: this.root.href, reloadToken: resp.token });
        return;
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        this.onRedirect({ to: this.root.href });
        return;
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      if (this.isMain()) {
        this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        if (this.liveSocket.isConnected()) {
          this.liveSocket.reloadWithJitter(this);
        }
      } else {
        if (this.joinAttempts >= MAX_CHILD_JOIN_ATTEMPTS) {
          this.root.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
          this.log("error", () => [`giving up trying to mount after ${MAX_CHILD_JOIN_ATTEMPTS} tries`, resp]);
          this.destroy();
        }
        let trueChildEl = dom_default.byId(this.el.id);
        if (trueChildEl) {
          dom_default.mergeAttrs(trueChildEl, this.el);
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
          this.el = trueChildEl;
        } else {
          this.destroy();
        }
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.isMain() && this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        } else {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS]);
        }
      }
    }
    displayError(classes) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.execAll(this.binding("disconnected"));
    }
    wrapPush(callerPush, receives) {
      let latency = this.liveSocket.getLatencySim();
      let withLatency = latency ? (cb) => setTimeout(() => !this.isDestroyed() && cb(), latency) : (cb) => !this.isDestroyed() && cb();
      withLatency(() => {
        callerPush().receive("ok", (resp) => withLatency(() => receives.ok && receives.ok(resp))).receive("error", (reason) => withLatency(() => receives.error && receives.error(reason))).receive("timeout", () => withLatency(() => receives.timeout && receives.timeout()));
      });
    }
    pushWithReply(refGenerator, event, payload) {
      if (!this.isConnected()) {
        return Promise.reject({ error: "noconnection" });
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let oldJoinCount = this.joinCount;
      let onLoadingDone = function() {
      };
      if (opts.page_loading) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return new Promise((resolve, reject) => {
        this.wrapPush(() => this.channel.push(event, payload, PUSH_TIMEOUT), {
          ok: (resp) => {
            if (ref !== null) {
              this.lastAckRef = ref;
            }
            let finish = (hookReply) => {
              if (resp.redirect) {
                this.onRedirect(resp.redirect);
              }
              if (resp.live_patch) {
                this.onLivePatch(resp.live_patch);
              }
              if (resp.live_redirect) {
                this.onLiveRedirect(resp.live_redirect);
              }
              onLoadingDone();
              resolve({ resp, reply: hookReply });
            };
            if (resp.diff) {
              this.liveSocket.requestDOMUpdate(() => {
                this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                  if (ref !== null) {
                    this.undoRefs(ref, payload.event);
                  }
                  this.update(diff, events);
                  finish(reply);
                });
              });
            } else {
              if (ref !== null) {
                this.undoRefs(ref, payload.event);
              }
              finish(null);
            }
          },
          error: (reason) => reject({ error: reason }),
          timeout: () => {
            reject({ timeout: true });
            if (this.joinCount === oldJoinCount) {
              this.liveSocket.reloadWithJitter(this, () => {
                this.log("timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          }
        });
      });
    }
    undoRefs(ref, phxEvent, onlyEls) {
      if (!this.isConnected()) {
        return;
      }
      let selector = `[${PHX_REF_SRC}="${this.refSrc()}"]`;
      if (onlyEls) {
        onlyEls = new Set(onlyEls);
        dom_default.all(document, selector, (parent) => {
          if (onlyEls && !onlyEls.has(parent)) {
            return;
          }
          dom_default.all(parent, selector, (child) => this.undoElRef(child, ref, phxEvent));
          this.undoElRef(parent, ref, phxEvent);
        });
      } else {
        dom_default.all(document, selector, (el) => this.undoElRef(el, ref, phxEvent));
      }
    }
    undoElRef(el, ref, phxEvent) {
      let elRef = new ElementRef(el);
      elRef.maybeUndo(ref, phxEvent, (clonedTree) => {
        let patch = new DOMPatch(this, el, this.id, clonedTree, [], null, { undoRef: ref });
        const phxChildrenAdded = this.performPatch(patch, true);
        dom_default.all(el, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (child) => this.undoElRef(child, ref, phxEvent));
        if (phxChildrenAdded) {
          this.joinNewChildren();
        }
      });
    }
    refSrc() {
      return this.el.id;
    }
    putRef(elements, phxEvent, eventType, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        let loadingEls = dom_default.all(document, opts.loading).map((el) => {
          return { el, lock: true, loading: true };
        });
        elements = elements.concat(loadingEls);
      }
      for (let { el, lock, loading } of elements) {
        if (!lock && !loading) {
          throw new Error("putRef requires lock or loading");
        }
        el.setAttribute(PHX_REF_SRC, this.refSrc());
        if (loading) {
          el.setAttribute(PHX_REF_LOADING, newRef);
        }
        if (lock) {
          el.setAttribute(PHX_REF_LOCK, newRef);
        }
        if (!loading || opts.submitter && !(el === opts.submitter || el === opts.form)) {
          continue;
        }
        let lockCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-lock:${newRef}`, () => resolve(detail), { once: true });
        });
        let loadingCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-loading:${newRef}`, () => resolve(detail), { once: true });
        });
        el.classList.add(`phx-${eventType}-loading`);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute(PHX_DISABLED, el.getAttribute(PHX_DISABLED) || el.disabled);
          el.setAttribute("disabled", "");
        }
        let detail = {
          event: phxEvent,
          eventType,
          ref: newRef,
          isLoading: loading,
          isLocked: lock,
          lockElements: elements.filter(({ lock: lock2 }) => lock2).map(({ el: el2 }) => el2),
          loadingElements: elements.filter(({ loading: loading2 }) => loading2).map(({ el: el2 }) => el2),
          unlock: (els) => {
            els = Array.isArray(els) ? els : [els];
            this.undoRefs(newRef, phxEvent, els);
          },
          lockComplete: lockCompletePromise,
          loadingComplete: loadingCompletePromise,
          lock: (lockEl) => {
            return new Promise((resolve) => {
              if (this.isAcked(newRef)) {
                return resolve(detail);
              }
              lockEl.setAttribute(PHX_REF_LOCK, newRef);
              lockEl.setAttribute(PHX_REF_SRC, this.refSrc());
              lockEl.addEventListener(`phx:lock-stop:${newRef}`, () => resolve(detail), { once: true });
            });
          }
        };
        el.dispatchEvent(new CustomEvent("phx:push", {
          detail,
          bubbles: true,
          cancelable: false
        }));
        if (phxEvent) {
          el.dispatchEvent(new CustomEvent(`phx:push:${phxEvent}`, {
            detail,
            bubbles: true,
            cancelable: false
          }));
        }
      }
      return [newRef, elements.map(({ el }) => el), opts];
    }
    isAcked(ref) {
      return this.lastAckRef !== null && this.lastAckRef >= ref;
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([{ el, loading: true, lock: true }], event, "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }).then(({ resp: _resp, reply: hookReply }) => onReply(hookReply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply(() => this.putRef([{ el, loading: true, lock: true }], phxEvent, type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      }).then(({ reply }) => onReply && onReply(reply));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }).then(({ resp }) => onReply(resp));
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      if (!inputEl.form) {
        throw new Error("form events require the input to be inside a form");
      }
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
      let refGenerator = () => {
        return this.putRef([
          { el: inputEl, loading: true, lock: true },
          { el: inputEl.form, loading: true, lock: true }
        ], phxEvent, "change", opts);
      };
      let formData;
      let meta = this.extractMeta(inputEl.form);
      if (inputEl instanceof HTMLButtonElement) {
        meta.submitter = inputEl;
      }
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta), [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta));
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event).then(({ resp }) => {
        if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
          ElementRef.onUnlock(inputEl, () => {
            if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
              let [ref, _els] = refGenerator();
              this.undoRefs(ref, phxEvent, [inputEl.form]);
              this.uploadFiles(inputEl.form, phxEvent, targetCtx, ref, cid, (_uploads) => {
                callback && callback(resp);
                this.triggerAwaitingSubmit(inputEl.form, phxEvent);
                this.undoRefs(ref, phxEvent);
              });
            }
          });
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl, phxEvent) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl, phxEvent);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl, phxEvent) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _opts, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref, phxEvent);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, phxEvent, opts = {}) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let formElements = Array.from(formEl.elements);
      let disables = formElements.filter(filterDisables);
      let buttons = formElements.filter(filterButton).filter(filterIgnored);
      let inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled);
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly);
        input.readOnly = true;
        if (input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled);
          input.disabled = true;
        }
      });
      let formEls = disables.concat(buttons).concat(inputs).map((el) => {
        return { el, loading: true, lock: true };
      });
      let els = [{ el: formEl, loading: true, lock: false }].concat(formEls).reverse();
      return this.putRef(els, phxEvent, "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      let refGenerator = () => this.disableForm(formEl, phxEvent, __spreadProps(__spreadValues({}, opts), {
        form: formEl,
        submitter
      }));
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, phxEvent, targetCtx, ref, cid, (_uploads) => {
          if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
            return this.undoRefs(ref, phxEvent);
          }
          let meta = this.extractMeta(formEl);
          let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }).then(({ resp }) => onReply(resp));
        });
      } else if (!(formEl.hasAttribute(PHX_REF_SRC) && formEl.classList.contains("phx-submit-loading"))) {
        let meta = this.extractMeta(formEl);
        let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }).then(({ resp }) => onReply(resp));
      }
    }
    uploadFiles(formEl, phxEvent, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        if (entries.length === 0) {
          numFileInputsInProgress--;
          return;
        }
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload).then(({ resp }) => {
          this.log("upload", () => ["got preflight response", resp]);
          uploader.entries().forEach((entry) => {
            if (resp.entries && !resp.entries[entry.ref]) {
              this.handleFailedEntryPreflight(entry.ref, "failed preflight", uploader);
            }
          });
          if (resp.error || Object.keys(resp.entries).length === 0) {
            this.undoRefs(ref, phxEvent);
            let errors = resp.error || [];
            errors.map(([entry_ref, reason]) => {
              this.handleFailedEntryPreflight(entry_ref, reason, uploader);
            });
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    handleFailedEntryPreflight(uploadRef, reason, uploader) {
      if (uploader.isAutoUpload()) {
        let entry = uploader.entries().find((entry2) => entry2.ref === uploadRef.toString());
        if (entry) {
          entry.cancel();
        }
      } else {
        uploader.entries().map((entry) => entry.cancel());
      }
      this.log("upload", () => [`error for entry ${uploadRef}`, reason]);
    }
    dispatchUploads(targetCtx, name, filesOrBlobs) {
      let targetElement = this.targetCtxElement(targetCtx) || this.el;
      let inputs = dom_default.findUploadInputs(targetElement).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    targetCtxElement(targetCtx) {
      if (isCid(targetCtx)) {
        let [target] = dom_default.findComponentNodeList(this.el, targetCtx);
        return target;
      } else if (targetCtx) {
        return targetCtx;
      } else {
        return null;
      }
    }
    pushFormRecovery(oldForm, newForm, templateDom, callback) {
      const phxChange = this.binding("change");
      const phxTarget = newForm.getAttribute(this.binding("target")) || newForm;
      const phxEvent = newForm.getAttribute(this.binding(PHX_AUTO_RECOVER)) || newForm.getAttribute(this.binding("change"));
      const inputs = Array.from(oldForm.elements).filter((el) => dom_default.isFormInput(el) && el.name && !el.hasAttribute(phxChange));
      if (inputs.length === 0) {
        return;
      }
      inputs.forEach((input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2));
      let input = inputs.find((el) => el.type !== "hidden") || inputs[0];
      let pending = 0;
      this.withinTargets(phxTarget, (targetView, targetCtx) => {
        const cid = this.targetComponentID(newForm, targetCtx);
        pending++;
        let e = new CustomEvent("phx:form-recovery", { detail: { sourceElement: oldForm } });
        js_default.exec(e, "change", phxEvent, this, input, ["push", {
          _target: input.name,
          targetView,
          targetCtx,
          newCid: cid,
          callback: () => {
            pending--;
            if (pending === 0) {
              callback();
            }
          }
        }]);
      }, templateDom, templateDom);
    }
    pushLinkPatch(e, href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let loading = e.isTrusted && e.type !== "popstate";
      let refGen = targetEl ? () => this.putRef([{ el: targetEl, loading, lock: true }], null, "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      this.pushWithReply(refGen, "live_patch", { url }).then(
        ({ resp }) => {
          this.liveSocket.requestDOMUpdate(() => {
            if (resp.link_redirect) {
              this.liveSocket.replaceMain(href, null, callback, linkRef);
            } else {
              if (this.liveSocket.commitPendingLink(linkRef)) {
                this.href = href;
              }
              this.applyPendingUpdates();
              callback && callback(linkRef);
            }
          });
        },
        ({ error: _error, timeout: _timeout }) => fallback()
      );
    }
    getFormsForRecovery() {
      if (this.joinCount === 0) {
        return {};
      }
      let phxChange = this.binding("change");
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => form.cloneNode(true)).reduce((acc, form) => {
        acc[form.id] = form;
        return acc;
      }, {});
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        willDestroyCIDs.forEach((cid) => this.rendered.resetRender(cid));
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }).then(() => {
          this.liveSocket.requestDOMUpdate(() => {
            let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
              return dom_default.findComponentNodeList(this.el, cid).length === 0;
            });
            if (completelyDestroyCIDs.length > 0) {
              this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }).then(({ resp }) => {
                this.rendered.pruneCIDs(resp.cids);
              });
            }
          });
        });
      }
    }
    ownsElement(el) {
      let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      const inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.boundEventNames = /* @__PURE__ */ new Set();
      this.serverCloseRef = null;
      this.domCallbacks = Object.assign(
        {
          jsQuerySelectorAll: null,
          onPatchStart: closure2(),
          onPatchEnd: closure2(),
          onNodeAdded: closure2(),
          onBeforeElUpdated: closure2()
        },
        opts.dom || {}
      );
      this.transitions = new TransitionSet();
      this.currentHistoryPosition = parseInt(this.sessionStorage.getItem(PHX_LV_HISTORY_POSITION)) || 0;
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    // public
    version() {
      return "1.0.4";
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        this.resetReloadStatus();
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      if (this.serverCloseRef) {
        this.socket.off(this.serverCloseRef);
        this.serverCloseRef = null;
      }
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
      this.owner(el, (view) => js_default.exec(e, eventType, encodedJS, view, el));
    }
    // private
    execJSHookPush(el, phxEvent, data, callback) {
      this.withinOwners(el, (view) => {
        let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
        js_default.exec(e, "hook", phxEvent, view, el, ["push", { data, callback }]);
      });
    }
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries >= this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries >= this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinDeadView() {
      let body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        let view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => {
          var _a;
          view.execNewMounted();
          this.maybeScroll((_a = history.state) == null ? void 0 : _a.scroll);
        });
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          if (!dom_default.isPhxSticky(rootEl)) {
            view.setHref(this.getHref());
          }
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash, reloadToken) {
      if (reloadToken) {
        browser_default.setCookie(PHX_RELOAD_STATUS, reloadToken, 60);
      }
      this.unload();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      const liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      const stickies = dom_default.findPhxSticky(document) || [];
      const removeEls = dom_default.all(this.outgoingMainEl, `[${this.binding("remove")}]`).filter((el) => !dom_default.isChildOfAny(el, stickies));
      const newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves(removeEls);
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            removeEls.forEach((el) => el.remove());
            stickies.forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && callback(linkRef);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements, callback) {
      let removeAttr = this.binding("remove");
      let silenceEvents = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      elements.forEach((el) => {
        for (let event of this.boundEventNames) {
          el.addEventListener(event, silenceEvents, true);
        }
        this.execJS(el, el.getAttribute(removeAttr), "remove");
      });
      this.requestDOMUpdate(() => {
        elements.forEach((el) => {
          for (let event of this.boundEventNames) {
            el.removeEventListener(event, silenceEvents, true);
          }
        });
        callback && callback();
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      let view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      return view && callback ? callback(view) : view;
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    getActiveElement() {
      return document.activeElement;
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.serverCloseRef = this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, _phxTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (!phxTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.on("dragover", (e) => e.preventDefault());
      this.on("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      this.resetReloadStatus();
      return this.linkRef;
    }
    // anytime we are navigating or connecting, drop reload cookie in case
    // we issue the cookie but the next request was interrupted and the server never dropped it
    resetReloadStatus() {
      browser_default.deleteCookie(PHX_RELOAD_STATUS);
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      this.on("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click");
    }
    bindClick(eventName, bindingName) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (e.detail === 0)
          this.clickStartedAtTarget = e.target;
        let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
        target = closestPhxBinding(e.target, click);
        this.dispatchClickAway(e, clickStartedAtTarget);
        this.clickStartedAtTarget = null;
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          if (dom_default.isNewPageClick(e, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        if (target.hasAttribute(PHX_REF_SRC)) {
          return;
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec(e, "click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, false);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(el, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el) && js_default.isInViewport(el)) {
              js_default.exec(e, "click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, backType, id, scroll, position } = event.state || {};
        let href = window.location.href;
        let isForward = position > this.currentHistoryPosition;
        type = isForward ? type : backType || type;
        this.currentHistoryPosition = position || 0;
        this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
        dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: type === "patch", pop: true, direction: isForward ? "forward" : "backward" } });
        this.requestDOMUpdate(() => {
          const callback = () => {
            this.maybeScroll(scroll);
          };
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(event, href, null, callback);
          } else {
            this.replaceMain(href, null, callback);
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
          return;
        }
        let href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(e, href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(e, href, linkState, null, target);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          let phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(e, href, linkState, targetEl) {
      if (!this.isConnected() || !this.main.isMain()) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(e, href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      this.currentHistoryPosition++;
      this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
      browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "patch" }));
      browser_default.pushState(linkState, {
        type: "patch",
        id: this.main.id,
        position: this.currentHistoryPosition
      }, href);
      dom_default.dispatchEvent(window, "phx:navigate", { detail: { patch: true, href, pop: false, direction: "forward" } });
      this.registerNewLocation(window.location);
    }
    historyRedirect(e, href, linkState, flash, targetEl) {
      const clickLoading = targetEl && e.isTrusted && e.type !== "popstate";
      if (clickLoading) {
        targetEl.classList.add("phx-click-loading");
      }
      if (!this.isConnected() || !this.main.isMain()) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        let { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            this.currentHistoryPosition++;
            this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
            browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "redirect" }));
            browser_default.pushState(linkState, {
              type: "redirect",
              id: this.main.id,
              scroll,
              position: this.currentHistoryPosition
            }, href);
            dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: false, pop: false, direction: "forward" } });
            this.registerNewLocation(window.location);
          }
          if (clickLoading) {
            targetEl.classList.remove("phx-click-loading");
          }
          done();
        });
      });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e) => {
        let phxSubmit = e.target.getAttribute(this.binding("submit"));
        let phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              e.target.submit();
            });
          });
        }
      });
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e)) {
            this.unload();
          }
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec(e, "submit", phxEvent, view, e.target, ["push", { submitter: e.submitter }]);
        });
      });
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          if (e instanceof CustomEvent && e.target.form === void 0) {
            if (e.detail && e.detail.dispatcher) {
              throw new Error(`dispatching a custom ${type} event is only supported on input elements inside a form`);
            }
            return;
          }
          let phxChange = this.binding("change");
          let input = e.target;
          if (e.isComposing) {
            const key = `composition-listener-${type}`;
            if (!dom_default.private(input, key)) {
              dom_default.putPrivate(input, key, true);
              input.addEventListener("compositionend", () => {
                input.dispatchEvent(new Event(type, { bubbles: true }));
                dom_default.deletePrivate(input, key);
              }, { once: true });
            }
            return;
          }
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type === "change" && lastType === "input") {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              js_default.exec(e, "change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        });
      }
      this.on("reset", (e) => {
        let form = e.target;
        dom_default.resetForm(form);
        let input = Array.from(form.elements).find((el) => el.type === "reset");
        if (input) {
          window.requestAnimationFrame(() => {
            input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
          });
        }
      });
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      this.boundEventNames.add(event);
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
    jsQuerySelectorAll(sourceEl, query, defaultQuery) {
      let all = this.domCallbacks.jsQuerySelectorAll;
      return all ? all(sourceEl, query, defaultQuery) : defaultQuery();
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      let op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_topbar = __toESM(require_topbar());
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, {
    longPollFallbackMs: 2500,
    params: { _csrf_token: csrfToken }
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
  window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2FyaWEuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvaG9va3MuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZWxlbWVudF9yZWYuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tX3Bvc3RfbW9ycGhfcmVzdG9yZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9ub2RlX21vZHVsZXMvbW9ycGhkb20vZGlzdC9tb3JwaGRvbS1lc20uanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tX3BhdGNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3JlbmRlcmVkLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2pzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXdfaG9vay5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy92aWV3LmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2xpdmVfc29ja2V0LmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2luZGV4LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9qcy9hcHAuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQGxpY2Vuc2UgTUlUXG4gKiB0b3BiYXIgMi4wLjAsIDIwMjMtMDItMDRcbiAqIGh0dHBzOi8vYnV1bmd1eWVuLmdpdGh1Yi5pby90b3BiYXJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBCdXUgTmd1eWVuXG4gKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgdmFyIHZlbmRvcnMgPSBbXCJtc1wiLCBcIm1velwiLCBcIndlYmtpdFwiLCBcIm9cIl07XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fFxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgfTtcbiAgICBpZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICB2YXIgY2FudmFzLFxuICAgIGN1cnJlbnRQcm9ncmVzcyxcbiAgICBzaG93aW5nLFxuICAgIHByb2dyZXNzVGltZXJJZCA9IG51bGwsXG4gICAgZmFkZVRpbWVySWQgPSBudWxsLFxuICAgIGRlbGF5VGltZXJJZCA9IG51bGwsXG4gICAgYWRkRXZlbnQgPSBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcikgZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpIGVsZW0uYXR0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgaGFuZGxlcik7XG4gICAgICBlbHNlIGVsZW1bXCJvblwiICsgdHlwZV0gPSBoYW5kbGVyO1xuICAgIH0sXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGF1dG9SdW46IHRydWUsXG4gICAgICBiYXJUaGlja25lc3M6IDMsXG4gICAgICBiYXJDb2xvcnM6IHtcbiAgICAgICAgMDogXCJyZ2JhKDI2LCAgMTg4LCAxNTYsIC45KVwiLFxuICAgICAgICBcIi4yNVwiOiBcInJnYmEoNTIsICAxNTIsIDIxOSwgLjkpXCIsXG4gICAgICAgIFwiLjUwXCI6IFwicmdiYSgyNDEsIDE5NiwgMTUsICAuOSlcIixcbiAgICAgICAgXCIuNzVcIjogXCJyZ2JhKDIzMCwgMTI2LCAzNCwgIC45KVwiLFxuICAgICAgICBcIjEuMFwiOiBcInJnYmEoMjExLCA4NCwgIDAsICAgLjkpXCIsXG4gICAgICB9LFxuICAgICAgc2hhZG93Qmx1cjogMTAsXG4gICAgICBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsICAgMCwgICAwLCAgIC42KVwiLFxuICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgIH0sXG4gICAgcmVwYWludCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzICogNTsgLy8gbmVlZCBzcGFjZSBmb3Igc2hhZG93XG5cbiAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSBvcHRpb25zLnNoYWRvd0JsdXI7XG4gICAgICBjdHguc2hhZG93Q29sb3IgPSBvcHRpb25zLnNoYWRvd0NvbG9yO1xuXG4gICAgICB2YXIgbGluZUdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIGNhbnZhcy53aWR0aCwgMCk7XG4gICAgICBmb3IgKHZhciBzdG9wIGluIG9wdGlvbnMuYmFyQ29sb3JzKVxuICAgICAgICBsaW5lR3JhZGllbnQuYWRkQ29sb3JTdG9wKHN0b3AsIG9wdGlvbnMuYmFyQ29sb3JzW3N0b3BdKTtcbiAgICAgIGN0eC5saW5lV2lkdGggPSBvcHRpb25zLmJhclRoaWNrbmVzcztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMCwgb3B0aW9ucy5iYXJUaGlja25lc3MgLyAyKTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIE1hdGguY2VpbChjdXJyZW50UHJvZ3Jlc3MgKiBjYW52YXMud2lkdGgpLFxuICAgICAgICBvcHRpb25zLmJhclRoaWNrbmVzcyAvIDJcbiAgICAgICk7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBsaW5lR3JhZGllbnQ7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSxcbiAgICBjcmVhdGVDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgdmFyIHN0eWxlID0gY2FudmFzLnN0eWxlO1xuICAgICAgc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgICBzdHlsZS50b3AgPSBzdHlsZS5sZWZ0ID0gc3R5bGUucmlnaHQgPSBzdHlsZS5tYXJnaW4gPSBzdHlsZS5wYWRkaW5nID0gMDtcbiAgICAgIHN0eWxlLnpJbmRleCA9IDEwMDAwMTtcbiAgICAgIHN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGlmIChvcHRpb25zLmNsYXNzTmFtZSkgY2FudmFzLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgYWRkRXZlbnQod2luZG93LCBcInJlc2l6ZVwiLCByZXBhaW50KTtcbiAgICB9LFxuICAgIHRvcGJhciA9IHtcbiAgICAgIGNvbmZpZzogZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdHMpXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkgb3B0aW9uc1trZXldID0gb3B0c1trZXldO1xuICAgICAgfSxcbiAgICAgIHNob3c6IGZ1bmN0aW9uIChkZWxheSkge1xuICAgICAgICBpZiAoc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBpZiAoZGVsYXkpIHtcbiAgICAgICAgICBpZiAoZGVsYXlUaW1lcklkKSByZXR1cm47XG4gICAgICAgICAgZGVsYXlUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB0b3BiYXIuc2hvdygpLCBkZWxheSk7XG4gICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgIHNob3dpbmcgPSB0cnVlO1xuICAgICAgICAgIGlmIChmYWRlVGltZXJJZCAhPT0gbnVsbCkgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZhZGVUaW1lcklkKTtcbiAgICAgICAgICBpZiAoIWNhbnZhcykgY3JlYXRlQ2FudmFzKCk7XG4gICAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIHRvcGJhci5wcm9ncmVzcygwKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5hdXRvUnVuKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKFxuICAgICAgICAgICAgICAgIFwiK1wiICsgMC4wNSAqIE1hdGgucG93KDEgLSBNYXRoLnNxcnQoY3VycmVudFByb2dyZXNzKSwgMilcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICh0bykge1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdG8gPVxuICAgICAgICAgICAgKHRvLmluZGV4T2YoXCIrXCIpID49IDAgfHwgdG8uaW5kZXhPZihcIi1cIikgPj0gMFxuICAgICAgICAgICAgICA/IGN1cnJlbnRQcm9ncmVzc1xuICAgICAgICAgICAgICA6IDApICsgcGFyc2VGbG9hdCh0byk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2dyZXNzID0gdG8gPiAxID8gMSA6IHRvO1xuICAgICAgICByZXBhaW50KCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZGVsYXlUaW1lcklkKTtcbiAgICAgICAgZGVsYXlUaW1lcklkID0gbnVsbDtcbiAgICAgICAgaWYgKCFzaG93aW5nKSByZXR1cm47XG4gICAgICAgIHNob3dpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHByb2dyZXNzVGltZXJJZCAhPSBudWxsKSB7XG4gICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzVGltZXJJZCk7XG4gICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICBpZiAodG9wYmFyLnByb2dyZXNzKFwiKy4xXCIpID49IDEpIHtcbiAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5IC09IDAuMDU7XG4gICAgICAgICAgICBpZiAoY2FudmFzLnN0eWxlLm9wYWNpdHkgPD0gMC4wNSkge1xuICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICBmYWRlVGltZXJJZCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZmFkZVRpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICB9KSgpO1xuICAgICAgfSxcbiAgICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG9wYmFyO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0b3BiYXI7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50b3BiYXIgPSB0b3BiYXI7XG4gIH1cbn0uY2FsbCh0aGlzLCB3aW5kb3csIGRvY3VtZW50KSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIFBvbHlmaWxsRXZlbnQgPSBldmVudENvbnN0cnVjdG9yKCk7XG5cbiAgZnVuY3Rpb24gZXZlbnRDb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gd2luZG93LkN1c3RvbUV2ZW50O1xuICAgIC8vIElFPD05IFN1cHBvcnRcbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge2J1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWR9O1xuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgIHJldHVybiBldnQ7XG4gICAgfVxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gICAgcmV0dXJuIEN1c3RvbUV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRIaWRkZW5JbnB1dChuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC50eXBlID0gXCJoaWRkZW5cIjtcbiAgICBpbnB1dC5uYW1lID0gbmFtZTtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGVsZW1lbnQsIHRhcmdldE1vZGlmaWVyS2V5KSB7XG4gICAgdmFyIHRvID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRvXCIpLFxuICAgICAgICBtZXRob2QgPSBidWlsZEhpZGRlbklucHV0KFwiX21ldGhvZFwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSxcbiAgICAgICAgY3NyZiA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfY3NyZl90b2tlblwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY3NyZlwiKSksXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSxcbiAgICAgICAgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLFxuICAgICAgICB0YXJnZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcblxuICAgIGZvcm0ubWV0aG9kID0gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikgPT09IFwiZ2V0XCIpID8gXCJnZXRcIiA6IFwicG9zdFwiO1xuICAgIGZvcm0uYWN0aW9uID0gdG87XG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBpZiAodGFyZ2V0KSBmb3JtLnRhcmdldCA9IHRhcmdldDtcbiAgICBlbHNlIGlmICh0YXJnZXRNb2RpZmllcktleSkgZm9ybS50YXJnZXQgPSBcIl9ibGFua1wiO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChjc3JmKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKG1ldGhvZCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIC8vIEluc2VydCBhIGJ1dHRvbiBhbmQgY2xpY2sgaXQgaW5zdGVhZCBvZiB1c2luZyBgZm9ybS5zdWJtaXRgXG4gICAgLy8gYmVjYXVzZSB0aGUgYHN1Ym1pdGAgZnVuY3Rpb24gZG9lcyBub3QgZW1pdCBhIGBzdWJtaXRgIGV2ZW50LlxuICAgIHN1Ym1pdC50eXBlID0gXCJzdWJtaXRcIjtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdCk7XG4gICAgc3VibWl0LmNsaWNrKCk7XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcblxuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKSB7XG4gICAgICB2YXIgcGhvZW5peExpbmtFdmVudCA9IG5ldyBQb2x5ZmlsbEV2ZW50KCdwaG9lbml4LmxpbmsuY2xpY2snLCB7XG4gICAgICAgIFwiYnViYmxlc1wiOiB0cnVlLCBcImNhbmNlbGFibGVcIjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudC5kaXNwYXRjaEV2ZW50KHBob2VuaXhMaW5rRXZlbnQpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdG9cIikpIHtcbiAgICAgICAgaGFuZGxlQ2xpY2soZWxlbWVudCwgZS5tZXRhS2V5IHx8IGUuc2hpZnRLZXkpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bob2VuaXgubGluay5jbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbmZpcm1cIik7XG4gICAgaWYobWVzc2FnZSAmJiAhd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sIGZhbHNlKTtcbn0pKCk7XG4iLCAiLy8gd3JhcHMgdmFsdWUgaW4gY2xvc3VyZSBvciByZXR1cm5zIGNsb3N1cmVcbmV4cG9ydCBsZXQgY2xvc3VyZSA9ICh2YWx1ZSkgPT4ge1xuICBpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH0gZWxzZSB7XG4gICAgbGV0IGNsb3N1cmUgPSBmdW5jdGlvbiAoKXsgcmV0dXJuIHZhbHVlIH1cbiAgICByZXR1cm4gY2xvc3VyZVxuICB9XG59XG4iLCAiZXhwb3J0IGNvbnN0IGdsb2JhbFNlbGYgPSB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiBudWxsXG5leHBvcnQgY29uc3QgcGh4V2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IG51bGxcbmV4cG9ydCBjb25zdCBnbG9iYWwgPSBnbG9iYWxTZWxmIHx8IHBoeFdpbmRvdyB8fCBnbG9iYWxcbmV4cG9ydCBjb25zdCBERUZBVUxUX1ZTTiA9IFwiMi4wLjBcIlxuZXhwb3J0IGNvbnN0IFNPQ0tFVF9TVEFURVMgPSB7Y29ubmVjdGluZzogMCwgb3BlbjogMSwgY2xvc2luZzogMiwgY2xvc2VkOiAzfVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElNRU9VVCA9IDEwMDAwXG5leHBvcnQgY29uc3QgV1NfQ0xPU0VfTk9STUFMID0gMTAwMFxuZXhwb3J0IGNvbnN0IENIQU5ORUxfU1RBVEVTID0ge1xuICBjbG9zZWQ6IFwiY2xvc2VkXCIsXG4gIGVycm9yZWQ6IFwiZXJyb3JlZFwiLFxuICBqb2luZWQ6IFwiam9pbmVkXCIsXG4gIGpvaW5pbmc6IFwiam9pbmluZ1wiLFxuICBsZWF2aW5nOiBcImxlYXZpbmdcIixcbn1cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0VWRU5UUyA9IHtcbiAgY2xvc2U6IFwicGh4X2Nsb3NlXCIsXG4gIGVycm9yOiBcInBoeF9lcnJvclwiLFxuICBqb2luOiBcInBoeF9qb2luXCIsXG4gIHJlcGx5OiBcInBoeF9yZXBseVwiLFxuICBsZWF2ZTogXCJwaHhfbGVhdmVcIlxufVxuXG5leHBvcnQgY29uc3QgVFJBTlNQT1JUUyA9IHtcbiAgbG9uZ3BvbGw6IFwibG9uZ3BvbGxcIixcbiAgd2Vic29ja2V0OiBcIndlYnNvY2tldFwiXG59XG5leHBvcnQgY29uc3QgWEhSX1NUQVRFUyA9IHtcbiAgY29tcGxldGU6IDRcbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemVzIHRoZSBQdXNoXG4gKiBAcGFyYW0ge0NoYW5uZWx9IGNoYW5uZWwgLSBUaGUgQ2hhbm5lbFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50LCBmb3IgZXhhbXBsZSBgXCJwaHhfam9pblwiYFxuICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWQgLSBUaGUgcGF5bG9hZCwgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiAxMjN9YFxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgLSBUaGUgcHVzaCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdXNoIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQpe1xuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWxcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnRcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkIHx8IGZ1bmN0aW9uICgpeyByZXR1cm4ge30gfVxuICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbFxuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnJlY0hvb2tzID0gW11cbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0XG4gICAqL1xuICByZXNlbmQodGltZW91dCl7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMuc2VuZCgpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHNlbmQoKXtcbiAgICBpZih0aGlzLmhhc1JlY2VpdmVkKFwidGltZW91dFwiKSl7IHJldHVybiB9XG4gICAgdGhpcy5zdGFydFRpbWVvdXQoKVxuICAgIHRoaXMuc2VudCA9IHRydWVcbiAgICB0aGlzLmNoYW5uZWwuc29ja2V0LnB1c2goe1xuICAgICAgdG9waWM6IHRoaXMuY2hhbm5lbC50b3BpYyxcbiAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkKCksXG4gICAgICByZWY6IHRoaXMucmVmLFxuICAgICAgam9pbl9yZWY6IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gc3RhdHVzXG4gICAqIEBwYXJhbSB7Kn0gY2FsbGJhY2tcbiAgICovXG4gIHJlY2VpdmUoc3RhdHVzLCBjYWxsYmFjayl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChzdGF0dXMpKXtcbiAgICAgIGNhbGxiYWNrKHRoaXMucmVjZWl2ZWRSZXNwLnJlc3BvbnNlKVxuICAgIH1cblxuICAgIHRoaXMucmVjSG9va3MucHVzaCh7c3RhdHVzLCBjYWxsYmFja30pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVzZXQoKXtcbiAgICB0aGlzLmNhbmNlbFJlZkV2ZW50KClcbiAgICB0aGlzLnJlZiA9IG51bGxcbiAgICB0aGlzLnJlZkV2ZW50ID0gbnVsbFxuICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbFxuICAgIHRoaXMuc2VudCA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG1hdGNoUmVjZWl2ZSh7c3RhdHVzLCByZXNwb25zZSwgX3JlZn0pe1xuICAgIHRoaXMucmVjSG9va3MuZmlsdGVyKGggPT4gaC5zdGF0dXMgPT09IHN0YXR1cylcbiAgICAgIC5mb3JFYWNoKGggPT4gaC5jYWxsYmFjayhyZXNwb25zZSkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFJlZkV2ZW50KCl7XG4gICAgaWYoIXRoaXMucmVmRXZlbnQpeyByZXR1cm4gfVxuICAgIHRoaXMuY2hhbm5lbC5vZmYodGhpcy5yZWZFdmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsVGltZW91dCgpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaW1lcilcbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy50aW1lb3V0VGltZXIpeyB0aGlzLmNhbmNlbFRpbWVvdXQoKSB9XG4gICAgdGhpcy5yZWYgPSB0aGlzLmNoYW5uZWwuc29ja2V0Lm1ha2VSZWYoKVxuICAgIHRoaXMucmVmRXZlbnQgPSB0aGlzLmNoYW5uZWwucmVwbHlFdmVudE5hbWUodGhpcy5yZWYpXG5cbiAgICB0aGlzLmNoYW5uZWwub24odGhpcy5yZWZFdmVudCwgcGF5bG9hZCA9PiB7XG4gICAgICB0aGlzLmNhbmNlbFJlZkV2ZW50KClcbiAgICAgIHRoaXMuY2FuY2VsVGltZW91dCgpXG4gICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IHBheWxvYWRcbiAgICAgIHRoaXMubWF0Y2hSZWNlaXZlKHBheWxvYWQpXG4gICAgfSlcblxuICAgIHRoaXMudGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0aW1lb3V0XCIsIHt9KVxuICAgIH0sIHRoaXMudGltZW91dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFzUmVjZWl2ZWQoc3RhdHVzKXtcbiAgICByZXR1cm4gdGhpcy5yZWNlaXZlZFJlc3AgJiYgdGhpcy5yZWNlaXZlZFJlc3Auc3RhdHVzID09PSBzdGF0dXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlcihzdGF0dXMsIHJlc3BvbnNlKXtcbiAgICB0aGlzLmNoYW5uZWwudHJpZ2dlcih0aGlzLnJlZkV2ZW50LCB7c3RhdHVzLCByZXNwb25zZX0pXG4gIH1cbn1cbiIsICIvKipcbiAqXG4gKiBDcmVhdGVzIGEgdGltZXIgdGhhdCBhY2NlcHRzIGEgYHRpbWVyQ2FsY2AgZnVuY3Rpb24gdG8gcGVyZm9ybVxuICogY2FsY3VsYXRlZCB0aW1lb3V0IHJldHJpZXMsIHN1Y2ggYXMgZXhwb25lbnRpYWwgYmFja29mZi5cbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHRoaXMuY29ubmVjdCgpLCBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgNTAwMCwgMTAwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH0pXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciA1MDAwXG4gKiByZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRpbWVyQ2FsY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aW1lckNhbGMpe1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHRoaXMudGltZXJDYWxjID0gdGltZXJDYWxjXG4gICAgdGhpcy50aW1lciA9IG51bGxcbiAgICB0aGlzLnRyaWVzID0gMFxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnRyaWVzID0gMFxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgYW55IHByZXZpb3VzIHNjaGVkdWxlVGltZW91dCBhbmQgc2NoZWR1bGVzIGNhbGxiYWNrXG4gICAqL1xuICBzY2hlZHVsZVRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcblxuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJpZXMgPSB0aGlzLnRyaWVzICsgMVxuICAgICAgdGhpcy5jYWxsYmFjaygpXG4gICAgfSwgdGhpcy50aW1lckNhbGModGhpcy50cmllcyArIDEpKVxuICB9XG59XG4iLCAiaW1wb3J0IHtjbG9zdXJlfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQge1xuICBDSEFOTkVMX0VWRU5UUyxcbiAgQ0hBTk5FTF9TVEFURVMsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBQdXNoIGZyb20gXCIuL3B1c2hcIlxuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCJcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvcGljXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24pfSBwYXJhbXNcbiAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKHRvcGljLCBwYXJhbXMsIHNvY2tldCl7XG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZFxuICAgIHRoaXMudG9waWMgPSB0b3BpY1xuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShwYXJhbXMgfHwge30pXG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXRcbiAgICB0aGlzLmJpbmRpbmdzID0gW11cbiAgICB0aGlzLmJpbmRpbmdSZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gdGhpcy5zb2NrZXQudGltZW91dFxuICAgIHRoaXMuam9pbmVkT25jZSA9IGZhbHNlXG4gICAgdGhpcy5qb2luUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmpvaW4sIHRoaXMucGFyYW1zLCB0aGlzLnRpbWVvdXQpXG4gICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcyA9IFtdXG5cbiAgICB0aGlzLnJlam9pblRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9LCB0aGlzLnNvY2tldC5yZWpvaW5BZnRlck1zKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzLnB1c2godGhpcy5zb2NrZXQub25FcnJvcigoKSA9PiB0aGlzLnJlam9pblRpbWVyLnJlc2V0KCkpKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzLnB1c2godGhpcy5zb2NrZXQub25PcGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgaWYodGhpcy5pc0Vycm9yZWQoKSl7IHRoaXMucmVqb2luKCkgfVxuICAgIH0pXG4gICAgKVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcIm9rXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luZWRcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyLmZvckVhY2gocHVzaEV2ZW50ID0+IHB1c2hFdmVudC5zZW5kKCkpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXVxuICAgIH0pXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwiZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWRcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub25DbG9zZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBjbG9zZSAke3RoaXMudG9waWN9ICR7dGhpcy5qb2luUmVmKCl9YClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICAgIHRoaXMuc29ja2V0LnJlbW92ZSh0aGlzKVxuICAgIH0pXG4gICAgdGhpcy5vbkVycm9yKHJlYXNvbiA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgZXJyb3IgJHt0aGlzLnRvcGljfWAsIHJlYXNvbilcbiAgICAgIGlmKHRoaXMuaXNKb2luaW5nKCkpeyB0aGlzLmpvaW5QdXNoLnJlc2V0KCkgfVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWRcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYHRpbWVvdXQgJHt0aGlzLnRvcGljfSAoJHt0aGlzLmpvaW5SZWYoKX0pYCwgdGhpcy5qb2luUHVzaC50aW1lb3V0KVxuICAgICAgbGV0IGxlYXZlUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmxlYXZlLCBjbG9zdXJlKHt9KSwgdGhpcy50aW1lb3V0KVxuICAgICAgbGVhdmVQdXNoLnNlbmQoKVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWRcbiAgICAgIHRoaXMuam9pblB1c2gucmVzZXQoKVxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5yZXBseSwgKHBheWxvYWQsIHJlZikgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMucmVwbHlFdmVudE5hbWUocmVmKSwgcGF5bG9hZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEpvaW4gdGhlIGNoYW5uZWxcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBpZih0aGlzLmpvaW5lZE9uY2Upe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJpZWQgdG8gam9pbiBtdWx0aXBsZSB0aW1lcy4gJ2pvaW4nIGNhbiBvbmx5IGJlIGNhbGxlZCBhIHNpbmdsZSB0aW1lIHBlciBjaGFubmVsIGluc3RhbmNlXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICAgIHRoaXMuam9pbmVkT25jZSA9IHRydWVcbiAgICAgIHRoaXMucmVqb2luKClcbiAgICAgIHJldHVybiB0aGlzLmpvaW5QdXNoXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgaW50byBjaGFubmVsIGNsb3NlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkNsb3NlKGNhbGxiYWNrKXtcbiAgICB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBlcnJvcnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uRXJyb3IoY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLmVycm9yLCByZWFzb24gPT4gY2FsbGJhY2socmVhc29uKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIG9uIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFN1YnNjcmlwdGlvbiByZXR1cm5zIGEgcmVmIGNvdW50ZXIsIHdoaWNoIGNhbiBiZSB1c2VkIGxhdGVyIHRvXG4gICAqIHVuc3Vic2NyaWJlIHRoZSBleGFjdCBldmVudCBsaXN0ZW5lclxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByZWYxID0gY2hhbm5lbC5vbihcImV2ZW50XCIsIGRvX3N0dWZmKVxuICAgKiBjb25zdCByZWYyID0gY2hhbm5lbC5vbihcImV2ZW50XCIsIGRvX290aGVyX3N0dWZmKVxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIsIHJlZjEpXG4gICAqIC8vIFNpbmNlIHVuc3Vic2NyaXB0aW9uLCBkb19zdHVmZiB3b24ndCBmaXJlLFxuICAgKiAvLyB3aGlsZSBkb19vdGhlcl9zdHVmZiB3aWxsIGtlZXAgZmlyaW5nIG9uIHRoZSBcImV2ZW50XCJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHtpbnRlZ2VyfSByZWZcbiAgICovXG4gIG9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMuYmluZGluZ1JlZisrXG4gICAgdGhpcy5iaW5kaW5ncy5wdXNoKHtldmVudCwgcmVmLCBjYWxsYmFja30pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyBvZmYgb2YgY2hhbm5lbCBldmVudHNcbiAgICpcbiAgICogVXNlIHRoZSByZWYgcmV0dXJuZWQgZnJvbSBhIGNoYW5uZWwub24oKSB0byB1bnN1YnNjcmliZSBvbmVcbiAgICogaGFuZGxlciwgb3IgcGFzcyBub3RoaW5nIGZvciB0aGUgcmVmIHRvIHVuc3Vic2NyaWJlIGFsbFxuICAgKiBoYW5kbGVycyBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBVbnN1YnNjcmliZSB0aGUgZG9fc3R1ZmYgaGFuZGxlclxuICAgKiBjb25zdCByZWYxID0gY2hhbm5lbC5vbihcImV2ZW50XCIsIGRvX3N0dWZmKVxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIsIHJlZjEpXG4gICAqXG4gICAqIC8vIFVuc3Vic2NyaWJlIGFsbCBoYW5kbGVycyBmcm9tIGV2ZW50XG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIilcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvZmYoZXZlbnQsIHJlZil7XG4gICAgdGhpcy5iaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MuZmlsdGVyKChiaW5kKSA9PiB7XG4gICAgICByZXR1cm4gIShiaW5kLmV2ZW50ID09PSBldmVudCAmJiAodHlwZW9mIHJlZiA9PT0gXCJ1bmRlZmluZWRcIiB8fCByZWYgPT09IGJpbmQucmVmKSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5QdXNoKCl7IHJldHVybiB0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuaXNKb2luZWQoKSB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSBgZXZlbnRgIHRvIHBob2VuaXggd2l0aCB0aGUgcGF5bG9hZCBgcGF5bG9hZGAuXG4gICAqIFBob2VuaXggcmVjZWl2ZXMgdGhpcyBpbiB0aGUgYGhhbmRsZV9pbihldmVudCwgcGF5bG9hZCwgc29ja2V0KWBcbiAgICogZnVuY3Rpb24uIGlmIHBob2VuaXggcmVwbGllcyBvciBpdCB0aW1lcyBvdXQgKGRlZmF1bHQgMTAwMDBtcyksXG4gICAqIHRoZW4gb3B0aW9uYWxseSB0aGUgcmVwbHkgY2FuIGJlIHJlY2VpdmVkLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjaGFubmVsLnB1c2goXCJldmVudFwiKVxuICAgKiAgIC5yZWNlaXZlKFwib2tcIiwgcGF5bG9hZCA9PiBjb25zb2xlLmxvZyhcInBob2VuaXggcmVwbGllZDpcIiwgcGF5bG9hZCkpXG4gICAqICAgLnJlY2VpdmUoXCJlcnJvclwiLCBlcnIgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IGVycm9yZWRcIiwgZXJyKSlcbiAgICogICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gY29uc29sZS5sb2coXCJ0aW1lZCBvdXQgcHVzaGluZ1wiKSlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZW91dF1cbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBwdXNoKGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBwYXlsb2FkID0gcGF5bG9hZCB8fCB7fVxuICAgIGlmKCF0aGlzLmpvaW5lZE9uY2Upe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmllZCB0byBwdXNoICcke2V2ZW50fScgdG8gJyR7dGhpcy50b3BpY30nIGJlZm9yZSBqb2luaW5nLiBVc2UgY2hhbm5lbC5qb2luKCkgYmVmb3JlIHB1c2hpbmcgZXZlbnRzYClcbiAgICB9XG4gICAgbGV0IHB1c2hFdmVudCA9IG5ldyBQdXNoKHRoaXMsIGV2ZW50LCBmdW5jdGlvbiAoKXsgcmV0dXJuIHBheWxvYWQgfSwgdGltZW91dClcbiAgICBpZih0aGlzLmNhblB1c2goKSl7XG4gICAgICBwdXNoRXZlbnQuc2VuZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHB1c2hFdmVudC5zdGFydFRpbWVvdXQoKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyLnB1c2gocHVzaEV2ZW50KVxuICAgIH1cblxuICAgIHJldHVybiBwdXNoRXZlbnRcbiAgfVxuXG4gIC8qKiBMZWF2ZXMgdGhlIGNoYW5uZWxcbiAgICpcbiAgICogVW5zdWJzY3JpYmVzIGZyb20gc2VydmVyIGV2ZW50cywgYW5kXG4gICAqIGluc3RydWN0cyBjaGFubmVsIHRvIHRlcm1pbmF0ZSBvbiBzZXJ2ZXJcbiAgICpcbiAgICogVHJpZ2dlcnMgb25DbG9zZSgpIGhvb2tzXG4gICAqXG4gICAqIFRvIHJlY2VpdmUgbGVhdmUgYWNrbm93bGVkZ2VtZW50cywgdXNlIHRoZSBgcmVjZWl2ZWBcbiAgICogaG9vayB0byBiaW5kIHRvIHRoZSBzZXJ2ZXIgYWNrLCBpZTpcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5sZWF2ZSgpLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBhbGVydChcImxlZnQhXCIpIClcbiAgICpcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgbGVhdmUodGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgdGhpcy5qb2luUHVzaC5jYW5jZWxUaW1lb3V0KClcblxuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nXG4gICAgbGV0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgbGVhdmUgJHt0aGlzLnRvcGljfWApXG4gICAgICB0aGlzLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIFwibGVhdmVcIilcbiAgICB9XG4gICAgbGV0IGxlYXZlUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmxlYXZlLCBjbG9zdXJlKHt9KSwgdGltZW91dClcbiAgICBsZWF2ZVB1c2gucmVjZWl2ZShcIm9rXCIsICgpID0+IG9uQ2xvc2UoKSlcbiAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgbGVhdmVQdXNoLnNlbmQoKVxuICAgIGlmKCF0aGlzLmNhblB1c2goKSl7IGxlYXZlUHVzaC50cmlnZ2VyKFwib2tcIiwge30pIH1cblxuICAgIHJldHVybiBsZWF2ZVB1c2hcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkYWJsZSBtZXNzYWdlIGhvb2tcbiAgICpcbiAgICogUmVjZWl2ZXMgYWxsIGV2ZW50cyBmb3Igc3BlY2lhbGl6ZWQgbWVzc2FnZSBoYW5kbGluZ1xuICAgKiBiZWZvcmUgZGlzcGF0Y2hpbmcgdG8gdGhlIGNoYW5uZWwgY2FsbGJhY2tzLlxuICAgKlxuICAgKiBNdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWRcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSByZWZcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIG9uTWVzc2FnZShfZXZlbnQsIHBheWxvYWQsIF9yZWYpeyByZXR1cm4gcGF5bG9hZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5SZWYpe1xuICAgIGlmKHRoaXMudG9waWMgIT09IHRvcGljKXsgcmV0dXJuIGZhbHNlIH1cblxuICAgIGlmKGpvaW5SZWYgJiYgam9pblJlZiAhPT0gdGhpcy5qb2luUmVmKCkpe1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgXCJkcm9wcGluZyBvdXRkYXRlZCBtZXNzYWdlXCIsIHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5SZWZ9KVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBqb2luUmVmKCl7IHJldHVybiB0aGlzLmpvaW5QdXNoLnJlZiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5pc0xlYXZpbmcoKSl7IHJldHVybiB9XG4gICAgdGhpcy5zb2NrZXQubGVhdmVPcGVuVG9waWModGhpcy50b3BpYylcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmluZ1xuICAgIHRoaXMuam9pblB1c2gucmVzZW5kKHRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pblJlZil7XG4gICAgbGV0IGhhbmRsZWRQYXlsb2FkID0gdGhpcy5vbk1lc3NhZ2UoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pblJlZilcbiAgICBpZihwYXlsb2FkICYmICFoYW5kbGVkUGF5bG9hZCl7IHRocm93IG5ldyBFcnJvcihcImNoYW5uZWwgb25NZXNzYWdlIGNhbGxiYWNrcyBtdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZFwiKSB9XG5cbiAgICBsZXQgZXZlbnRCaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MuZmlsdGVyKGJpbmQgPT4gYmluZC5ldmVudCA9PT0gZXZlbnQpXG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZXZlbnRCaW5kaW5ncy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgYmluZCA9IGV2ZW50QmluZGluZ3NbaV1cbiAgICAgIGJpbmQuY2FsbGJhY2soaGFuZGxlZFBheWxvYWQsIHJlZiwgam9pblJlZiB8fCB0aGlzLmpvaW5SZWYoKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlcGx5RXZlbnROYW1lKHJlZil7IHJldHVybiBgY2hhbl9yZXBseV8ke3JlZn1gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQ2xvc2VkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNFcnJvcmVkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmVkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNKb2luaW5nKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTGVhdmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMubGVhdmluZyB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBYSFJfU1RBVEVTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuXG4gIHN0YXRpYyByZXF1ZXN0KG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgaWYoZ2xvYmFsLlhEb21haW5SZXF1ZXN0KXtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhEb21haW5SZXF1ZXN0KCkgLy8gSUU4LCBJRTlcbiAgICAgIHJldHVybiB0aGlzLnhkb21haW5SZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlcSA9IG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKSAvLyBJRTcrLCBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcbiAgICAgIHJldHVybiB0aGlzLnhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHhkb21haW5SZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLm9wZW4obWV0aG9kLCBlbmRQb2ludClcbiAgICByZXEub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5wYXJzZUpTT04ocmVxLnJlc3BvbnNlVGV4dClcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH1cbiAgICBpZihvbnRpbWVvdXQpeyByZXEub250aW1lb3V0ID0gb250aW1lb3V0IH1cblxuICAgIC8vIFdvcmsgYXJvdW5kIGJ1ZyBpbiBJRTkgdGhhdCByZXF1aXJlcyBhbiBhdHRhY2hlZCBvbnByb2dyZXNzIGhhbmRsZXJcbiAgICByZXEub25wcm9ncmVzcyA9ICgpID0+IHsgfVxuXG4gICAgcmVxLnNlbmQoYm9keSlcbiAgICByZXR1cm4gcmVxXG4gIH1cblxuICBzdGF0aWMgeGhyUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgcmVxLm9wZW4obWV0aG9kLCBlbmRQb2ludCwgdHJ1ZSlcbiAgICByZXEudGltZW91dCA9IHRpbWVvdXRcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBhY2NlcHQpXG4gICAgcmVxLm9uZXJyb3IgPSAoKSA9PiBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsKVxuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gWEhSX1NUQVRFUy5jb21wbGV0ZSAmJiBjYWxsYmFjayl7XG4gICAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH1cbiAgICBpZihvbnRpbWVvdXQpeyByZXEub250aW1lb3V0ID0gb250aW1lb3V0IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gICAgcmV0dXJuIHJlcVxuICB9XG5cbiAgc3RhdGljIHBhcnNlSlNPTihyZXNwKXtcbiAgICBpZighcmVzcCB8fCByZXNwID09PSBcIlwiKXsgcmV0dXJuIG51bGwgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3ApXG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIHBhcnNlIEpTT04gcmVzcG9uc2VcIiwgcmVzcClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHNlcmlhbGl6ZShvYmosIHBhcmVudEtleSl7XG4gICAgbGV0IHF1ZXJ5U3RyID0gW11cbiAgICBmb3IodmFyIGtleSBpbiBvYmope1xuICAgICAgaWYoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpeyBjb250aW51ZSB9XG4gICAgICBsZXQgcGFyYW1LZXkgPSBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5XG4gICAgICBsZXQgcGFyYW1WYWwgPSBvYmpba2V5XVxuICAgICAgaWYodHlwZW9mIHBhcmFtVmFsID09PSBcIm9iamVjdFwiKXtcbiAgICAgICAgcXVlcnlTdHIucHVzaCh0aGlzLnNlcmlhbGl6ZShwYXJhbVZhbCwgcGFyYW1LZXkpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlTdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQocGFyYW1LZXkpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1WYWwpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnlTdHIuam9pbihcIiZcIilcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRQYXJhbXModXJsLCBwYXJhbXMpe1xuICAgIGlmKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAwKXsgcmV0dXJuIHVybCB9XG5cbiAgICBsZXQgcHJlZml4ID0gdXJsLm1hdGNoKC9cXD8vKSA/IFwiJlwiIDogXCI/XCJcbiAgICByZXR1cm4gYCR7dXJsfSR7cHJlZml4fSR7dGhpcy5zZXJpYWxpemUocGFyYW1zKX1gXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuXG5sZXQgYXJyYXlCdWZmZXJUb0Jhc2U2NCA9IChidWZmZXIpID0+IHtcbiAgbGV0IGJpbmFyeSA9IFwiXCJcbiAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKVxuICBsZXQgbGVuID0gYnl0ZXMuYnl0ZUxlbmd0aFxuICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspeyBiaW5hcnkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkgfVxuICByZXR1cm4gYnRvYShiaW5hcnkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvbmdQb2xsIHtcblxuICBjb25zdHJ1Y3RvcihlbmRQb2ludCl7XG4gICAgdGhpcy5lbmRQb2ludCA9IG51bGxcbiAgICB0aGlzLnRva2VuID0gbnVsbFxuICAgIHRoaXMuc2tpcEhlYXJ0YmVhdCA9IHRydWVcbiAgICB0aGlzLnJlcXMgPSBuZXcgU2V0KClcbiAgICB0aGlzLmF3YWl0aW5nQmF0Y2hBY2sgPSBmYWxzZVxuICAgIHRoaXMuY3VycmVudEJhdGNoID0gbnVsbFxuICAgIHRoaXMuY3VycmVudEJhdGNoVGltZXIgPSBudWxsXG4gICAgdGhpcy5iYXRjaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5vbm9wZW4gPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbmVycm9yID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25tZXNzYWdlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25jbG9zZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLnBvbGxFbmRwb2ludCA9IHRoaXMubm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gICAgLy8gd2UgbXVzdCB3YWl0IGZvciB0aGUgY2FsbGVyIHRvIGZpbmlzaCBzZXR0aW5nIHVwIG91ciBjYWxsYmFja3MgYW5kIHRpbWVvdXQgcHJvcGVydGllc1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wb2xsKCksIDApXG4gIH1cblxuICBub3JtYWxpemVFbmRwb2ludChlbmRQb2ludCl7XG4gICAgcmV0dXJuIChlbmRQb2ludFxuICAgICAgLnJlcGxhY2UoXCJ3czovL1wiLCBcImh0dHA6Ly9cIilcbiAgICAgIC5yZXBsYWNlKFwid3NzOi8vXCIsIFwiaHR0cHM6Ly9cIilcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoLiopXFwvXCIgKyBUUkFOU1BPUlRTLndlYnNvY2tldCksIFwiJDEvXCIgKyBUUkFOU1BPUlRTLmxvbmdwb2xsKSlcbiAgfVxuXG4gIGVuZHBvaW50VVJMKCl7XG4gICAgcmV0dXJuIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMucG9sbEVuZHBvaW50LCB7dG9rZW46IHRoaXMudG9rZW59KVxuICB9XG5cbiAgY2xvc2VBbmRSZXRyeShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICB0aGlzLmNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gIH1cblxuICBvbnRpbWVvdXQoKXtcbiAgICB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpXG4gICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMDUsIFwidGltZW91dFwiLCBmYWxzZSlcbiAgfVxuXG4gIGlzQWN0aXZlKCl7IHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMub3BlbiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZyB9XG5cbiAgcG9sbCgpe1xuICAgIHRoaXMuYWpheChcIkdFVFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgbnVsbCwgKCkgPT4gdGhpcy5vbnRpbWVvdXQoKSwgcmVzcCA9PiB7XG4gICAgICBpZihyZXNwKXtcbiAgICAgICAgdmFyIHtzdGF0dXMsIHRva2VuLCBtZXNzYWdlc30gPSByZXNwXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzID0gMFxuICAgICAgfVxuXG4gICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAyMDA6XG4gICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xuICAgICAgICAgICAgLy8gVGFza3MgYXJlIHdoYXQgdGhpbmdzIGxpa2UgZXZlbnQgaGFuZGxlcnMsIHNldFRpbWVvdXQgY2FsbGJhY2tzLFxuICAgICAgICAgICAgLy8gcHJvbWlzZSByZXNvbHZlcyBhbmQgbW9yZSBhcmUgcnVuIHdpdGhpbi5cbiAgICAgICAgICAgIC8vIEluIG1vZGVybiBicm93c2VycywgdGhlcmUgYXJlIHR3byBkaWZmZXJlbnQga2luZHMgb2YgdGFza3MsXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2tzIGFuZCBtYWNyb3Rhc2tzLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhcmUgbWFpbmx5IHVzZWQgZm9yIFByb21pc2VzLCB3aGlsZSBtYWNyb3Rhc2tzIGFyZVxuICAgICAgICAgICAgLy8gdXNlZCBmb3IgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhbHdheXMgaGF2ZSBwcmlvcml0eSBvdmVyIG1hY3JvdGFza3MuIElmIHRoZSBKUyBlbmdpbmVcbiAgICAgICAgICAgIC8vIGlzIGxvb2tpbmcgZm9yIGEgdGFzayB0byBydW4sIGl0IHdpbGwgYWx3YXlzIHRyeSB0byBlbXB0eSB0aGVcbiAgICAgICAgICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBiZWZvcmUgYXR0ZW1wdGluZyB0byBydW4gYW55dGhpbmcgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIG1hY3JvdGFzayBxdWV1ZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBGb3IgdGhlIFdlYlNvY2tldCB0cmFuc3BvcnQsIG1lc3NhZ2VzIGFsd2F5cyBhcnJpdmUgaW4gdGhlaXIgb3duXG4gICAgICAgICAgICAvLyBldmVudC4gVGhpcyBtZWFucyB0aGF0IGlmIGFueSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgZnJvbSB3aXRoaW4sXG4gICAgICAgICAgICAvLyB0aGVpciBjYWxsYmFja3Mgd2lsbCBhbHdheXMgZmluaXNoIGV4ZWN1dGlvbiBieSB0aGUgdGltZSB0aGVcbiAgICAgICAgICAgIC8vIG5leHQgbWVzc2FnZSBldmVudCBoYW5kbGVyIGlzIHJ1bi5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBlbXVsYXRlIHRoaXMgYmVoYXZpb3VyLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBlYWNoXG4gICAgICAgICAgICAvLyBvbm1lc3NhZ2UgaGFuZGxlciBpcyBydW4gd2l0aGluIGl0cyBvd24gbWFjcm90YXNrLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSksIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNDAzKVxuICAgICAgICAgIHRoaXMuY2xvc2UoMTAwOCwgXCJmb3JiaWRkZW5cIiwgZmFsc2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNTAwKVxuICAgICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCA1MDApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGB1bmhhbmRsZWQgcG9sbCBzdGF0dXMgJHtzdGF0dXN9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gd2UgY29sbGVjdCBhbGwgcHVzaGVzIHdpdGhpbiB0aGUgY3VycmVudCBldmVudCBsb29wIGJ5XG4gIC8vIHNldFRpbWVvdXQgMCwgd2hpY2ggb3B0aW1pemVzIGJhY2stdG8tYmFjayBwcm9jZWR1cmFsXG4gIC8vIHB1c2hlcyBhZ2FpbnN0IGFuIGVtcHR5IGJ1ZmZlclxuXG4gIHNlbmQoYm9keSl7XG4gICAgaWYodHlwZW9mKGJvZHkpICE9PSBcInN0cmluZ1wiKXsgYm9keSA9IGFycmF5QnVmZmVyVG9CYXNlNjQoYm9keSkgfVxuICAgIGlmKHRoaXMuY3VycmVudEJhdGNoKXtcbiAgICAgIHRoaXMuY3VycmVudEJhdGNoLnB1c2goYm9keSlcbiAgICB9IGVsc2UgaWYodGhpcy5hd2FpdGluZ0JhdGNoQWNrKXtcbiAgICAgIHRoaXMuYmF0Y2hCdWZmZXIucHVzaChib2R5KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRCYXRjaCA9IFtib2R5XVxuICAgICAgdGhpcy5jdXJyZW50QmF0Y2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmJhdGNoU2VuZCh0aGlzLmN1cnJlbnRCYXRjaClcbiAgICAgICAgdGhpcy5jdXJyZW50QmF0Y2ggPSBudWxsXG4gICAgICB9LCAwKVxuICAgIH1cbiAgfVxuXG4gIGJhdGNoU2VuZChtZXNzYWdlcyl7XG4gICAgdGhpcy5hd2FpdGluZ0JhdGNoQWNrID0gdHJ1ZVxuICAgIHRoaXMuYWpheChcIlBPU1RcIiwgXCJhcHBsaWNhdGlvbi94LW5kanNvblwiLCBtZXNzYWdlcy5qb2luKFwiXFxuXCIpLCAoKSA9PiB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpLCByZXNwID0+IHtcbiAgICAgIHRoaXMuYXdhaXRpbmdCYXRjaEFjayA9IGZhbHNlXG4gICAgICBpZighcmVzcCB8fCByZXNwLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgdGhpcy5vbmVycm9yKHJlc3AgJiYgcmVzcC5zdGF0dXMpXG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCBmYWxzZSlcbiAgICAgIH0gZWxzZSBpZih0aGlzLmJhdGNoQnVmZmVyLmxlbmd0aCA+IDApe1xuICAgICAgICB0aGlzLmJhdGNoU2VuZCh0aGlzLmJhdGNoQnVmZmVyKVxuICAgICAgICB0aGlzLmJhdGNoQnVmZmVyID0gW11cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY2xvc2UoY29kZSwgcmVhc29uLCB3YXNDbGVhbil7XG4gICAgZm9yKGxldCByZXEgb2YgdGhpcy5yZXFzKXsgcmVxLmFib3J0KCkgfVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY2xvc2VkXG4gICAgbGV0IG9wdHMgPSBPYmplY3QuYXNzaWduKHtjb2RlOiAxMDAwLCByZWFzb246IHVuZGVmaW5lZCwgd2FzQ2xlYW46IHRydWV9LCB7Y29kZSwgcmVhc29uLCB3YXNDbGVhbn0pXG4gICAgdGhpcy5iYXRjaEJ1ZmZlciA9IFtdXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY3VycmVudEJhdGNoVGltZXIpXG4gICAgdGhpcy5jdXJyZW50QmF0Y2hUaW1lciA9IG51bGxcbiAgICBpZih0eXBlb2YoQ2xvc2VFdmVudCkgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgdGhpcy5vbmNsb3NlKG5ldyBDbG9zZUV2ZW50KFwiY2xvc2VcIiwgb3B0cykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25jbG9zZShvcHRzKVxuICAgIH1cbiAgfVxuXG4gIGFqYXgobWV0aG9kLCBjb250ZW50VHlwZSwgYm9keSwgb25DYWxsZXJUaW1lb3V0LCBjYWxsYmFjayl7XG4gICAgbGV0IHJlcVxuICAgIGxldCBvbnRpbWVvdXQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlcXMuZGVsZXRlKHJlcSlcbiAgICAgIG9uQ2FsbGVyVGltZW91dCgpXG4gICAgfVxuICAgIHJlcSA9IEFqYXgucmVxdWVzdChtZXRob2QsIHRoaXMuZW5kcG9pbnRVUkwoKSwgY29udGVudFR5cGUsIGJvZHksIHRoaXMudGltZW91dCwgb250aW1lb3V0LCByZXNwID0+IHtcbiAgICAgIHRoaXMucmVxcy5kZWxldGUocmVxKVxuICAgICAgaWYodGhpcy5pc0FjdGl2ZSgpKXsgY2FsbGJhY2socmVzcCkgfVxuICAgIH0pXG4gICAgdGhpcy5yZXFzLmFkZChyZXEpXG4gIH1cbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemVzIHRoZSBQcmVzZW5jZVxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gVGhlIG9wdGlvbnMsXG4gKiAgICAgICAgZm9yIGV4YW1wbGUgYHtldmVudHM6IHtzdGF0ZTogXCJzdGF0ZVwiLCBkaWZmOiBcImRpZmZcIn19YFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVzZW5jZSB7XG5cbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXZlbnRzID0gb3B0cy5ldmVudHMgfHwge3N0YXRlOiBcInByZXNlbmNlX3N0YXRlXCIsIGRpZmY6IFwicHJlc2VuY2VfZGlmZlwifVxuICAgIHRoaXMuc3RhdGUgPSB7fVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5qb2luUmVmID0gbnVsbFxuICAgIHRoaXMuY2FsbGVyID0ge1xuICAgICAgb25Kb2luOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uTGVhdmU6IGZ1bmN0aW9uICgpeyB9LFxuICAgICAgb25TeW5jOiBmdW5jdGlvbiAoKXsgfVxuICAgIH1cblxuICAgIHRoaXMuY2hhbm5lbC5vbihldmVudHMuc3RhdGUsIG5ld1N0YXRlID0+IHtcbiAgICAgIGxldCB7b25Kb2luLCBvbkxlYXZlLCBvblN5bmN9ID0gdGhpcy5jYWxsZXJcblxuICAgICAgdGhpcy5qb2luUmVmID0gdGhpcy5jaGFubmVsLmpvaW5SZWYoKVxuICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNTdGF0ZSh0aGlzLnN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKVxuXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcy5mb3JFYWNoKGRpZmYgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKVxuICAgICAgfSlcbiAgICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICAgIG9uU3luYygpXG4gICAgfSlcblxuICAgIHRoaXMuY2hhbm5lbC5vbihldmVudHMuZGlmZiwgZGlmZiA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIGlmKHRoaXMuaW5QZW5kaW5nU3luY1N0YXRlKCkpe1xuICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKGRpZmYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKVxuICAgICAgICBvblN5bmMoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkpvaW4oY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkpvaW4gPSBjYWxsYmFjayB9XG5cbiAgb25MZWF2ZShjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uTGVhdmUgPSBjYWxsYmFjayB9XG5cbiAgb25TeW5jKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25TeW5jID0gY2FsbGJhY2sgfVxuXG4gIGxpc3QoYnkpeyByZXR1cm4gUHJlc2VuY2UubGlzdCh0aGlzLnN0YXRlLCBieSkgfVxuXG4gIGluUGVuZGluZ1N5bmNTdGF0ZSgpe1xuICAgIHJldHVybiAhdGhpcy5qb2luUmVmIHx8ICh0aGlzLmpvaW5SZWYgIT09IHRoaXMuY2hhbm5lbC5qb2luUmVmKCkpXG4gIH1cblxuICAvLyBsb3dlci1sZXZlbCBwdWJsaWMgc3RhdGljIEFQSVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHN5bmMgdGhlIGxpc3Qgb2YgcHJlc2VuY2VzIG9uIHRoZSBzZXJ2ZXJcbiAgICogd2l0aCB0aGUgY2xpZW50J3Mgc3RhdGUuIEFuIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2sgY2FuXG4gICAqIGJlIHByb3ZpZGVkIHRvIHJlYWN0IHRvIGNoYW5nZXMgaW4gdGhlIGNsaWVudCdzIGxvY2FsIHByZXNlbmNlcyBhY3Jvc3NcbiAgICogZGlzY29ubmVjdHMgYW5kIHJlY29ubmVjdHMgd2l0aCB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgc3luY1N0YXRlKGN1cnJlbnRTdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSl7XG4gICAgbGV0IHN0YXRlID0gdGhpcy5jbG9uZShjdXJyZW50U3RhdGUpXG4gICAgbGV0IGpvaW5zID0ge31cbiAgICBsZXQgbGVhdmVzID0ge31cblxuICAgIHRoaXMubWFwKHN0YXRlLCAoa2V5LCBwcmVzZW5jZSkgPT4ge1xuICAgICAgaWYoIW5ld1N0YXRlW2tleV0pe1xuICAgICAgICBsZWF2ZXNba2V5XSA9IHByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLm1hcChuZXdTdGF0ZSwgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2Upe1xuICAgICAgICBsZXQgbmV3UmVmcyA9IG5ld1ByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGN1clJlZnMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgam9pbmVkTWV0YXMgPSBuZXdQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBjdXJSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIGxldCBsZWZ0TWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gbmV3UmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBpZihqb2luZWRNZXRhcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VcbiAgICAgICAgICBqb2luc1trZXldLm1ldGFzID0gam9pbmVkTWV0YXNcbiAgICAgICAgfVxuICAgICAgICBpZihsZWZ0TWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGVhdmVzW2tleV0gPSB0aGlzLmNsb25lKGN1cnJlbnRQcmVzZW5jZSlcbiAgICAgICAgICBsZWF2ZXNba2V5XS5tZXRhcyA9IGxlZnRNZXRhc1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzLnN5bmNEaWZmKHN0YXRlLCB7am9pbnM6IGpvaW5zLCBsZWF2ZXM6IGxlYXZlc30sIG9uSm9pbiwgb25MZWF2ZSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBVc2VkIHRvIHN5bmMgYSBkaWZmIG9mIHByZXNlbmNlIGpvaW4gYW5kIGxlYXZlXG4gICAqIGV2ZW50cyBmcm9tIHRoZSBzZXJ2ZXIsIGFzIHRoZXkgaGFwcGVuLiBMaWtlIGBzeW5jU3RhdGVgLCBgc3luY0RpZmZgXG4gICAqIGFjY2VwdHMgb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFja3MgdG8gcmVhY3QgdG8gYSB1c2VyXG4gICAqIGpvaW5pbmcgb3IgbGVhdmluZyBmcm9tIGEgZGV2aWNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgc3luY0RpZmYoc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSl7XG4gICAgbGV0IHtqb2lucywgbGVhdmVzfSA9IHRoaXMuY2xvbmUoZGlmZilcbiAgICBpZighb25Kb2luKXsgb25Kb2luID0gZnVuY3Rpb24gKCl7IH0gfVxuICAgIGlmKCFvbkxlYXZlKXsgb25MZWF2ZSA9IGZ1bmN0aW9uICgpeyB9IH1cblxuICAgIHRoaXMubWFwKGpvaW5zLCAoa2V5LCBuZXdQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIHN0YXRlW2tleV0gPSB0aGlzLmNsb25lKG5ld1ByZXNlbmNlKVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IGpvaW5lZFJlZnMgPSBzdGF0ZVtrZXldLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGN1ck1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IGpvaW5lZFJlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgc3RhdGVba2V5XS5tZXRhcy51bnNoaWZ0KC4uLmN1ck1ldGFzKVxuICAgICAgfVxuICAgICAgb25Kb2luKGtleSwgY3VycmVudFByZXNlbmNlLCBuZXdQcmVzZW5jZSlcbiAgICB9KVxuICAgIHRoaXMubWFwKGxlYXZlcywgKGtleSwgbGVmdFByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoIWN1cnJlbnRQcmVzZW5jZSl7IHJldHVybiB9XG4gICAgICBsZXQgcmVmc1RvUmVtb3ZlID0gbGVmdFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgIGN1cnJlbnRQcmVzZW5jZS5tZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIocCA9PiB7XG4gICAgICAgIHJldHVybiByZWZzVG9SZW1vdmUuaW5kZXhPZihwLnBoeF9yZWYpIDwgMFxuICAgICAgfSlcbiAgICAgIG9uTGVhdmUoa2V5LCBjdXJyZW50UHJlc2VuY2UsIGxlZnRQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5sZW5ndGggPT09IDApe1xuICAgICAgICBkZWxldGUgc3RhdGVba2V5XVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJlc2VuY2VzLCB3aXRoIHNlbGVjdGVkIG1ldGFkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJlc2VuY2VzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNob29zZXJcbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIGxpc3QocHJlc2VuY2VzLCBjaG9vc2VyKXtcbiAgICBpZighY2hvb3Nlcil7IGNob29zZXIgPSBmdW5jdGlvbiAoa2V5LCBwcmVzKXsgcmV0dXJuIHByZXMgfSB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXAocHJlc2VuY2VzLCAoa2V5LCBwcmVzZW5jZSkgPT4ge1xuICAgICAgcmV0dXJuIGNob29zZXIoa2V5LCBwcmVzZW5jZSlcbiAgICB9KVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIHN0YXRpYyBtYXAob2JqLCBmdW5jKXtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5tYXAoa2V5ID0+IGZ1bmMoa2V5LCBvYmpba2V5XSkpXG4gIH1cblxuICBzdGF0aWMgY2xvbmUob2JqKXsgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSkgfVxufVxuIiwgIi8qIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgZm9yIGVuY29kaW5nIGFuZCBkZWNvZGluZyBtZXNzYWdlcyAqL1xuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQge1xuICBIRUFERVJfTEVOR1RIOiAxLFxuICBNRVRBX0xFTkdUSDogNCxcbiAgS0lORFM6IHtwdXNoOiAwLCByZXBseTogMSwgYnJvYWRjYXN0OiAyfSxcblxuICBlbmNvZGUobXNnLCBjYWxsYmFjayl7XG4gICAgaWYobXNnLnBheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmJpbmFyeUVuY29kZShtc2cpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGF5bG9hZCA9IFttc2cuam9pbl9yZWYsIG1zZy5yZWYsIG1zZy50b3BpYywgbXNnLmV2ZW50LCBtc2cucGF5bG9hZF1cbiAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSlcbiAgICB9XG4gIH0sXG5cbiAgZGVjb2RlKHJhd1BheWxvYWQsIGNhbGxiYWNrKXtcbiAgICBpZihyYXdQYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlEZWNvZGUocmF3UGF5bG9hZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBbam9pbl9yZWYsIHJlZiwgdG9waWMsIGV2ZW50LCBwYXlsb2FkXSA9IEpTT04ucGFyc2UocmF3UGF5bG9hZClcbiAgICAgIHJldHVybiBjYWxsYmFjayh7am9pbl9yZWYsIHJlZiwgdG9waWMsIGV2ZW50LCBwYXlsb2FkfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGJpbmFyeUVuY29kZShtZXNzYWdlKXtcbiAgICBsZXQge2pvaW5fcmVmLCByZWYsIGV2ZW50LCB0b3BpYywgcGF5bG9hZH0gPSBtZXNzYWdlXG4gICAgbGV0IG1ldGFMZW5ndGggPSB0aGlzLk1FVEFfTEVOR1RIICsgam9pbl9yZWYubGVuZ3RoICsgcmVmLmxlbmd0aCArIHRvcGljLmxlbmd0aCArIGV2ZW50Lmxlbmd0aFxuICAgIGxldCBoZWFkZXIgPSBuZXcgQXJyYXlCdWZmZXIodGhpcy5IRUFERVJfTEVOR1RIICsgbWV0YUxlbmd0aClcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXIpXG4gICAgbGV0IG9mZnNldCA9IDBcblxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHRoaXMuS0lORFMucHVzaCkgLy8ga2luZFxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGpvaW5fcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCByZWYubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHRvcGljLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBldmVudC5sZW5ndGgpXG4gICAgQXJyYXkuZnJvbShqb2luX3JlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20ocmVmLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbSh0b3BpYywgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20oZXZlbnQsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcblxuICAgIHZhciBjb21iaW5lZCA9IG5ldyBVaW50OEFycmF5KGhlYWRlci5ieXRlTGVuZ3RoICsgcGF5bG9hZC5ieXRlTGVuZ3RoKVxuICAgIGNvbWJpbmVkLnNldChuZXcgVWludDhBcnJheShoZWFkZXIpLCAwKVxuICAgIGNvbWJpbmVkLnNldChuZXcgVWludDhBcnJheShwYXlsb2FkKSwgaGVhZGVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4gY29tYmluZWQuYnVmZmVyXG4gIH0sXG5cbiAgYmluYXJ5RGVjb2RlKGJ1ZmZlcil7XG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKVxuICAgIGxldCBraW5kID0gdmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKClcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIHRoaXMuS0lORFMucHVzaDogcmV0dXJuIHRoaXMuZGVjb2RlUHVzaChidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMucmVwbHk6IHJldHVybiB0aGlzLmRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5icm9hZGNhc3Q6IHJldHVybiB0aGlzLmRlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgam9pblJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgzKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyB0aGlzLk1FVEFfTEVOR1RIIC0gMSAvLyBwdXNoZXMgaGF2ZSBubyByZWZcbiAgICBsZXQgam9pblJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGpvaW5SZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBqb2luUmVmU2l6ZVxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgIHJldHVybiB7am9pbl9yZWY6IGpvaW5SZWYsIHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGF9XG4gIH0sXG5cbiAgZGVjb2RlUmVwbHkoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgam9pblJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IHJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCg0KVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyB0aGlzLk1FVEFfTEVOR1RIXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgcmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgcmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgcmVmU2l6ZVxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgIGxldCBwYXlsb2FkID0ge3N0YXR1czogZXZlbnQsIHJlc3BvbnNlOiBkYXRhfVxuICAgIHJldHVybiB7am9pbl9yZWY6IGpvaW5SZWYsIHJlZjogcmVmLCB0b3BpYzogdG9waWMsIGV2ZW50OiBDSEFOTkVMX0VWRU5UUy5yZXBseSwgcGF5bG9hZDogcGF5bG9hZH1cbiAgfSxcblxuICBkZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIDJcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcblxuICAgIHJldHVybiB7am9pbl9yZWY6IG51bGwsIHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGF9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBnbG9iYWwsXG4gIHBoeFdpbmRvdyxcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIERFRkFVTFRfVElNRU9VVCxcbiAgREVGQVVMVF9WU04sXG4gIFNPQ0tFVF9TVEFURVMsXG4gIFRSQU5TUE9SVFMsXG4gIFdTX0NMT1NFX05PUk1BTFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9zdXJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEFqYXggZnJvbSBcIi4vYWpheFwiXG5pbXBvcnQgQ2hhbm5lbCBmcm9tIFwiLi9jaGFubmVsXCJcbmltcG9ydCBMb25nUG9sbCBmcm9tIFwiLi9sb25ncG9sbFwiXG5pbXBvcnQgU2VyaWFsaXplciBmcm9tIFwiLi9zZXJpYWxpemVyXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKiBJbml0aWFsaXplcyB0aGUgU29ja2V0ICpcbiAqXG4gKiBGb3IgSUU4IHN1cHBvcnQgdXNlIGFuIEVTNS1zaGltIChodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3czovL2V4YW1wbGUuY29tL3NvY2tldFwiYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCJ3c3M6Ly9leGFtcGxlLmNvbVwiYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9zb2NrZXRcImAgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMudHJhbnNwb3J0XSAtIFRoZSBXZWJzb2NrZXQgVHJhbnNwb3J0LCBmb3IgZXhhbXBsZSBXZWJTb2NrZXQgb3IgUGhvZW5peC5Mb25nUG9sbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBXZWJTb2NrZXQgd2l0aCBhdXRvbWF0aWMgTG9uZ1BvbGwgZmFsbGJhY2sgaWYgV2ViU29ja2V0IGlzIG5vdCBkZWZpbmVkLlxuICogVG8gZmFsbGJhY2sgdG8gTG9uZ1BvbGwgd2hlbiBXZWJTb2NrZXQgYXR0ZW1wdHMgZmFpbCwgdXNlIGBsb25nUG9sbEZhbGxiYWNrTXM6IDI1MDBgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmxvbmdQb2xsRmFsbGJhY2tNc10gLSBUaGUgbWlsbGlzZWNvbmQgdGltZSB0byBhdHRlbXB0IHRoZSBwcmltYXJ5IHRyYW5zcG9ydFxuICogYmVmb3JlIGZhbGxpbmcgYmFjayB0byB0aGUgTG9uZ1BvbGwgdHJhbnNwb3J0LiBEaXNhYmxlZCBieSBkZWZhdWx0LlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmRlYnVnXSAtIFdoZW4gdHJ1ZSwgZW5hYmxlcyBkZWJ1ZyBsb2dnaW5nLiBEZWZhdWx0IGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmVuY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZW5jb2RlIG91dGdvaW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT04gZW5jb2Rlci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5kZWNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGRlY29kZSBpbmNvbWluZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIChwYXlsb2FkLCBjYWxsYmFjaykgPT4gY2FsbGJhY2soSlNPTi5wYXJzZShwYXlsb2FkKSlcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lb3V0XSAtIFRoZSBkZWZhdWx0IHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIHRyaWdnZXIgcHVzaCB0aW1lb3V0cy5cbiAqXG4gKiBEZWZhdWx0cyBgREVGQVVMVF9USU1FT1VUYFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmhlYXJ0YmVhdEludGVydmFsTXNdIC0gVGhlIG1pbGxpc2VjIGludGVydmFsIHRvIHNlbmQgYSBoZWFydGJlYXQgbWVzc2FnZVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlY29ubmVjdEFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbGlzZWNcbiAqIHNvY2tldCByZWNvbm5lY3QgaW50ZXJ2YWwuXG4gKlxuICogRGVmYXVsdHMgdG8gc3RlcHBlZCBiYWNrb2ZmIG9mOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVqb2luQWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsaXNlY1xuICogcmVqb2luIGludGVydmFsIGZvciBpbmRpdmlkdWFsIGNoYW5uZWxzLlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMubG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZywgaWU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24oa2luZCwgbXNnLCBkYXRhKSB7XG4gKiAgIGNvbnNvbGUubG9nKGAke2tpbmR9OiAke21zZ31gLCBkYXRhKVxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmxvbmdwb2xsZXJUaW1lb3V0XSAtIFRoZSBtYXhpbXVtIHRpbWVvdXQgb2YgYSBsb25nIHBvbGwgQUpBWCByZXF1ZXN0LlxuICpcbiAqIERlZmF1bHRzIHRvIDIwcyAoZG91YmxlIHRoZSBzZXJ2ZXIgbG9uZyBwb2xsIHRpbWVyKS5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24pfSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIHBhcmFtcyB0byBwYXNzIHdoZW4gY29ubmVjdGluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmJpbmFyeVR5cGVdIC0gVGhlIGJpbmFyeSB0eXBlIHRvIHVzZSBmb3IgYmluYXJ5IFdlYlNvY2tldCBmcmFtZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gXCJhcnJheWJ1ZmZlclwiXG4gKlxuICogQHBhcmFtIHt2c259IFtvcHRzLnZzbl0gLSBUaGUgc2VyaWFsaXplcidzIHByb3RvY29sIHZlcnNpb24gdG8gc2VuZCBvbiBjb25uZWN0LlxuICpcbiAqIERlZmF1bHRzIHRvIERFRkFVTFRfVlNOLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5zZXNzaW9uU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBQaG9lbml4IHVzZXMgc2Vzc2lvblN0b3JhZ2UgZm9yIGxvbmdwb2xsIGZhbGxiYWNrIGhpc3RvcnkuIE92ZXJyaWRpbmcgdGhlIHN0b3JlIGlzXG4gKiB1c2VmdWwgd2hlbiBQaG9lbml4IHdvbid0IGhhdmUgYWNjZXNzIHRvIGBzZXNzaW9uU3RvcmFnZWAuIEZvciBleGFtcGxlLCBUaGlzIGNvdWxkXG4gKiBoYXBwZW4gaWYgYSBzaXRlIGxvYWRzIGEgY3Jvc3MtZG9tYWluIGNoYW5uZWwgaW4gYW4gaWZyYW1lLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgICBjbGFzcyBJbk1lbW9yeVN0b3JhZ2Uge1xuICogICAgICAgY29uc3RydWN0b3IoKSB7IHRoaXMuc3RvcmFnZSA9IHt9IH1cbiAqICAgICAgIGdldEl0ZW0oa2V5TmFtZSkgeyByZXR1cm4gdGhpcy5zdG9yYWdlW2tleU5hbWVdIHx8IG51bGwgfVxuICogICAgICAgcmVtb3ZlSXRlbShrZXlOYW1lKSB7IGRlbGV0ZSB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfVxuICogICAgICAgc2V0SXRlbShrZXlOYW1lLCBrZXlWYWx1ZSkgeyB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gPSBrZXlWYWx1ZSB9XG4gKiAgICAgfVxuICpcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXQge1xuICBjb25zdHJ1Y3RvcihlbmRQb2ludCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzID0ge29wZW46IFtdLCBjbG9zZTogW10sIGVycm9yOiBbXSwgbWVzc2FnZTogW119XG4gICAgdGhpcy5jaGFubmVscyA9IFtdXG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRzLnRpbWVvdXQgfHwgREVGQVVMVF9USU1FT1VUXG4gICAgdGhpcy50cmFuc3BvcnQgPSBvcHRzLnRyYW5zcG9ydCB8fCBnbG9iYWwuV2ViU29ja2V0IHx8IExvbmdQb2xsXG4gICAgdGhpcy5wcmltYXJ5UGFzc2VkSGVhbHRoQ2hlY2sgPSBmYWxzZVxuICAgIHRoaXMubG9uZ1BvbGxGYWxsYmFja01zID0gb3B0cy5sb25nUG9sbEZhbGxiYWNrTXNcbiAgICB0aGlzLmZhbGxiYWNrVGltZXIgPSBudWxsXG4gICAgdGhpcy5zZXNzaW9uU3RvcmUgPSBvcHRzLnNlc3Npb25TdG9yYWdlIHx8IChnbG9iYWwgJiYgZ2xvYmFsLnNlc3Npb25TdG9yYWdlKVxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucyA9IDBcbiAgICB0aGlzLmRlZmF1bHRFbmNvZGVyID0gU2VyaWFsaXplci5lbmNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuZGVmYXVsdERlY29kZXIgPSBTZXJpYWxpemVyLmRlY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmJpbmFyeVR5cGUgPSBvcHRzLmJpbmFyeVR5cGUgfHwgXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy5jb25uZWN0Q2xvY2sgPSAxXG4gICAgaWYodGhpcy50cmFuc3BvcnQgIT09IExvbmdQb2xsKXtcbiAgICAgIHRoaXMuZW5jb2RlID0gb3B0cy5lbmNvZGUgfHwgdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSBvcHRzLmRlY29kZSB8fCB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5jb2RlID0gdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfVxuICAgIGxldCBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgIGlmKHBoeFdpbmRvdyAmJiBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSB0aGlzLmNvbm5lY3RDbG9ja1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBfZSA9PiB7XG4gICAgICAgIGlmKGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPT09IHRoaXMuY29ubmVjdENsb2NrKXtcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNcyB8fCAzMDAwMFxuICAgIHRoaXMucmVqb2luQWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWpvaW5BZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVqb2luQWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVjb25uZWN0QWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlY29ubmVjdEFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyIHx8IG51bGxcbiAgICBpZighdGhpcy5sb2dnZXIgJiYgb3B0cy5kZWJ1Zyl7XG4gICAgICB0aGlzLmxvZ2dlciA9IChraW5kLCBtc2csIGRhdGEpID0+IHsgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpIH1cbiAgICB9XG4gICAgdGhpcy5sb25ncG9sbGVyVGltZW91dCA9IG9wdHMubG9uZ3BvbGxlclRpbWVvdXQgfHwgMjAwMDBcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUob3B0cy5wYXJhbXMgfHwge30pXG4gICAgdGhpcy5lbmRQb2ludCA9IGAke2VuZFBvaW50fS8ke1RSQU5TUE9SVFMud2Vic29ja2V0fWBcbiAgICB0aGlzLnZzbiA9IG9wdHMudnNuIHx8IERFRkFVTFRfVlNOXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMuY29ubmVjdCgpKVxuICAgIH0sIHRoaXMucmVjb25uZWN0QWZ0ZXJNcylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBMb25nUG9sbCB0cmFuc3BvcnQgcmVmZXJlbmNlXG4gICAqL1xuICBnZXRMb25nUG9sbFRyYW5zcG9ydCgpeyByZXR1cm4gTG9uZ1BvbGwgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBhbmQgcmVwbGFjZXMgdGhlIGFjdGl2ZSB0cmFuc3BvcnRcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3VHJhbnNwb3J0IC0gVGhlIG5ldyB0cmFuc3BvcnQgY2xhc3MgdG8gaW5zdGFudGlhdGVcbiAgICpcbiAgICovXG4gIHJlcGxhY2VUcmFuc3BvcnQobmV3VHJhbnNwb3J0KXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgaWYodGhpcy5jb25uKXtcbiAgICAgIHRoaXMuY29ubi5jbG9zZSgpXG4gICAgICB0aGlzLmNvbm4gPSBudWxsXG4gICAgfVxuICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3VHJhbnNwb3J0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc29ja2V0IHByb3RvY29sXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcm90b2NvbCgpeyByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wubWF0Y2goL15odHRwcy8pID8gXCJ3c3NcIiA6IFwid3NcIiB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdWxseSBxdWFsaWZpZWQgc29ja2V0IHVybFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZW5kUG9pbnRVUkwoKXtcbiAgICBsZXQgdXJpID0gQWpheC5hcHBlbmRQYXJhbXMoXG4gICAgICBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLmVuZFBvaW50LCB0aGlzLnBhcmFtcygpKSwge3ZzbjogdGhpcy52c259KVxuICAgIGlmKHVyaS5jaGFyQXQoMCkgIT09IFwiL1wiKXsgcmV0dXJuIHVyaSB9XG4gICAgaWYodXJpLmNoYXJBdCgxKSA9PT0gXCIvXCIpeyByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfToke3VyaX1gIH1cblxuICAgIHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9Oi8vJHtsb2NhdGlvbi5ob3N0fSR7dXJpfWBcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0XG4gICAqXG4gICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2xvc2VFdmVudCNTdGF0dXNfY29kZXMgZm9yIHZhbGlkIHN0YXR1cyBjb2Rlcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgc29ja2V0IGlzIGRpc2Nvbm5lY3RlZC5cbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBjb2RlIC0gQSBzdGF0dXMgY29kZSBmb3IgZGlzY29ubmVjdGlvbiAoT3B0aW9uYWwpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uIC0gQSB0ZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHRoZSByZWFzb24gdG8gZGlzY29ubmVjdC4gKE9wdGlvbmFsKVxuICAgKi9cbiAgZGlzY29ubmVjdChjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy50ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1zIHRvIHNlbmQgd2hlbiBjb25uZWN0aW5nLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IHVzZXJUb2tlbn1gXG4gICAqXG4gICAqIFBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZDsgcGFzcyB0aGVtIGluIHRoZSBTb2NrZXQgY29uc3RydWN0b3IgaW5zdGVhZDpcbiAgICogYG5ldyBTb2NrZXQoXCIvc29ja2V0XCIsIHtwYXJhbXM6IHt1c2VyX2lkOiB1c2VyVG9rZW59fSlgLlxuICAgKi9cbiAgY29ubmVjdChwYXJhbXMpe1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpXG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zKVxuICAgIH1cbiAgICBpZih0aGlzLmNvbm4peyByZXR1cm4gfVxuICAgIGlmKHRoaXMubG9uZ1BvbGxGYWxsYmFja01zICYmIHRoaXMudHJhbnNwb3J0ICE9PSBMb25nUG9sbCl7XG4gICAgICB0aGlzLmNvbm5lY3RXaXRoRmFsbGJhY2soTG9uZ1BvbGwsIHRoaXMubG9uZ1BvbGxGYWxsYmFja01zKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydENvbm5lY3QoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSBtZXNzYWdlLiBPdmVycmlkZSBgdGhpcy5sb2dnZXJgIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLiBub29wcyBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBraW5kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIGxvZyhraW5kLCBtc2csIGRhdGEpeyB0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgbG9nZ2VyIGhhcyBiZWVuIHNldCBvbiB0aGlzIHNvY2tldC5cbiAgICovXG4gIGhhc0xvZ2dlcigpeyByZXR1cm4gdGhpcy5sb2dnZXIgIT09IG51bGwgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG9wZW4gZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXsgY29uc29sZS5pbmZvKFwidGhlIHNvY2tldCB3YXMgb3BlbmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk9wZW4oY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBjbG9zZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gZXJyb3IgZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbkVycm9yKGZ1bmN0aW9uKGVycm9yKXsgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBtZXNzYWdlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25NZXNzYWdlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFBpbmdzIHRoZSBzZXJ2ZXIgYW5kIGludm9rZXMgdGhlIGNhbGxiYWNrIHdpdGggdGhlIFJUVCBpbiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwaW5nIHdhcyBwdXNoZWQgb3IgZmFsc2UgaWYgdW5hYmxlIHRvIGJlIHB1c2hlZC5cbiAgICovXG4gIHBpbmcoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gZmFsc2UgfVxuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiByZWZ9KVxuICAgIGxldCBvbk1zZ1JlZiA9IHRoaXMub25NZXNzYWdlKG1zZyA9PiB7XG4gICAgICBpZihtc2cucmVmID09PSByZWYpe1xuICAgICAgICB0aGlzLm9mZihbb25Nc2dSZWZdKVxuICAgICAgICBjYWxsYmFjayhEYXRlLm5vdygpIC0gc3RhcnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICB0cmFuc3BvcnRDb25uZWN0KCl7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kUG9pbnRVUkwoKSlcbiAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZVxuICAgIHRoaXMuY29ubi50aW1lb3V0ID0gdGhpcy5sb25ncG9sbGVyVGltZW91dFxuICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLm9uQ29ubk9wZW4oKVxuICAgIHRoaXMuY29ubi5vbmVycm9yID0gZXJyb3IgPT4gdGhpcy5vbkNvbm5FcnJvcihlcnJvcilcbiAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5NZXNzYWdlKGV2ZW50KVxuICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5DbG9zZShldmVudClcbiAgfVxuXG4gIGdldFNlc3Npb24oa2V5KXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JlICYmIHRoaXMuc2Vzc2lvblN0b3JlLmdldEl0ZW0oa2V5KSB9XG5cbiAgc3RvcmVTZXNzaW9uKGtleSwgdmFsKXsgdGhpcy5zZXNzaW9uU3RvcmUgJiYgdGhpcy5zZXNzaW9uU3RvcmUuc2V0SXRlbShrZXksIHZhbCkgfVxuXG4gIGNvbm5lY3RXaXRoRmFsbGJhY2soZmFsbGJhY2tUcmFuc3BvcnQsIGZhbGxiYWNrVGhyZXNob2xkID0gMjUwMCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmFsbGJhY2tUaW1lcilcbiAgICBsZXQgZXN0YWJsaXNoZWQgPSBmYWxzZVxuICAgIGxldCBwcmltYXJ5VHJhbnNwb3J0ID0gdHJ1ZVxuICAgIGxldCBvcGVuUmVmLCBlcnJvclJlZlxuICAgIGxldCBmYWxsYmFjayA9IChyZWFzb24pID0+IHtcbiAgICAgIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGBmYWxsaW5nIGJhY2sgdG8gJHtmYWxsYmFja1RyYW5zcG9ydC5uYW1lfS4uLmAsIHJlYXNvbilcbiAgICAgIHRoaXMub2ZmKFtvcGVuUmVmLCBlcnJvclJlZl0pXG4gICAgICBwcmltYXJ5VHJhbnNwb3J0ID0gZmFsc2VcbiAgICAgIHRoaXMucmVwbGFjZVRyYW5zcG9ydChmYWxsYmFja1RyYW5zcG9ydClcbiAgICAgIHRoaXMudHJhbnNwb3J0Q29ubmVjdCgpXG4gICAgfVxuICAgIGlmKHRoaXMuZ2V0U2Vzc2lvbihgcGh4OmZhbGxiYWNrOiR7ZmFsbGJhY2tUcmFuc3BvcnQubmFtZX1gKSl7IHJldHVybiBmYWxsYmFjayhcIm1lbW9yaXplZFwiKSB9XG5cbiAgICB0aGlzLmZhbGxiYWNrVGltZXIgPSBzZXRUaW1lb3V0KGZhbGxiYWNrLCBmYWxsYmFja1RocmVzaG9sZClcblxuICAgIGVycm9yUmVmID0gdGhpcy5vbkVycm9yKHJlYXNvbiA9PiB7XG4gICAgICB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImVycm9yXCIsIHJlYXNvbilcbiAgICAgIGlmKHByaW1hcnlUcmFuc3BvcnQgJiYgIWVzdGFibGlzaGVkKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmFsbGJhY2tUaW1lcilcbiAgICAgICAgZmFsbGJhY2socmVhc29uKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5vbk9wZW4oKCkgPT4ge1xuICAgICAgZXN0YWJsaXNoZWQgPSB0cnVlXG4gICAgICBpZighcHJpbWFyeVRyYW5zcG9ydCl7XG4gICAgICAgIC8vIG9ubHkgbWVtb3JpemUgTFAgaWYgd2UgbmV2ZXIgY29ubmVjdGVkIHRvIHByaW1hcnlcbiAgICAgICAgaWYoIXRoaXMucHJpbWFyeVBhc3NlZEhlYWx0aENoZWNrKXsgdGhpcy5zdG9yZVNlc3Npb24oYHBoeDpmYWxsYmFjazoke2ZhbGxiYWNrVHJhbnNwb3J0Lm5hbWV9YCwgXCJ0cnVlXCIpIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGBlc3RhYmxpc2hlZCAke2ZhbGxiYWNrVHJhbnNwb3J0Lm5hbWV9IGZhbGxiYWNrYClcbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlJ3ZlIGVzdGFibGlzaGVkIHByaW1hcnksIGdpdmUgdGhlIGZhbGxiYWNrIGEgbmV3IHBlcmlvZCB0byBhdHRlbXB0IHBpbmdcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgICB0aGlzLmZhbGxiYWNrVGltZXIgPSBzZXRUaW1lb3V0KGZhbGxiYWNrLCBmYWxsYmFja1RocmVzaG9sZClcbiAgICAgIHRoaXMucGluZyhydHQgPT4ge1xuICAgICAgICB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImNvbm5lY3RlZCB0byBwcmltYXJ5IGFmdGVyXCIsIHJ0dClcbiAgICAgICAgdGhpcy5wcmltYXJ5UGFzc2VkSGVhbHRoQ2hlY2sgPSB0cnVlXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy50cmFuc3BvcnRDb25uZWN0KClcbiAgfVxuXG4gIGNsZWFySGVhcnRiZWF0cygpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVyKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcilcbiAgfVxuXG4gIG9uQ29ubk9wZW4oKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgJHt0aGlzLnRyYW5zcG9ydC5uYW1lfSBjb25uZWN0ZWQgdG8gJHt0aGlzLmVuZFBvaW50VVJMKCl9YClcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucysrXG4gICAgdGhpcy5mbHVzaFNlbmRCdWZmZXIoKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMucmVzZXRIZWFydGJlYXQoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgaGVhcnRiZWF0VGltZW91dCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXsgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJoZWFydGJlYXQgdGltZW91dC4gQXR0ZW1wdGluZyB0byByZS1lc3RhYmxpc2ggY29ubmVjdGlvblwiKSB9XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5yZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSwgV1NfQ0xPU0VfTk9STUFMLCBcImhlYXJ0YmVhdCB0aW1lb3V0XCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnNraXBIZWFydGJlYXQpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0cygpXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZW5kSGVhcnRiZWF0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIHRlYXJkb3duKGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIGlmKCF0aGlzLmNvbm4pe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLndhaXRGb3JCdWZmZXJEb25lKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgIGlmKGNvZGUpeyB0aGlzLmNvbm4uY2xvc2UoY29kZSwgcmVhc29uIHx8IFwiXCIpIH0gZWxzZSB7IHRoaXMuY29ubi5jbG9zZSgpIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy53YWl0Rm9yU29ja2V0Q2xvc2VkKCgpID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmNvbm4ub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbmVycm9yID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgd2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCAhdGhpcy5jb25uLmJ1ZmZlcmVkQW1vdW50KXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgd2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8IHRoaXMuY29ubi5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNsb3NlZCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgb25Db25uQ2xvc2UoZXZlbnQpe1xuICAgIGxldCBjbG9zZUNvZGUgPSBldmVudCAmJiBldmVudC5jb2RlXG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJjbG9zZVwiLCBldmVudClcbiAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICBpZighdGhpcy5jbG9zZVdhc0NsZWFuICYmIGNsb3NlQ29kZSAhPT0gMTAwMCl7XG4gICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpXG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjayhldmVudCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uQ29ubkVycm9yKGVycm9yKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBlcnJvcilcbiAgICBsZXQgdHJhbnNwb3J0QmVmb3JlID0gdGhpcy50cmFuc3BvcnRcbiAgICBsZXQgZXN0YWJsaXNoZWRCZWZvcmUgPSB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnNcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRyYW5zcG9ydEJlZm9yZSwgZXN0YWJsaXNoZWRCZWZvcmUpXG4gICAgfSlcbiAgICBpZih0cmFuc3BvcnRCZWZvcmUgPT09IHRoaXMudHJhbnNwb3J0IHx8IGVzdGFibGlzaGVkQmVmb3JlID4gMCl7XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlckNoYW5FcnJvcigpe1xuICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGlmKCEoY2hhbm5lbC5pc0Vycm9yZWQoKSB8fCBjaGFubmVsLmlzTGVhdmluZygpIHx8IGNoYW5uZWwuaXNDbG9zZWQoKSkpe1xuICAgICAgICBjaGFubmVsLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29ubmVjdGlvblN0YXRlKCl7XG4gICAgc3dpdGNoKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4ucmVhZHlTdGF0ZSl7XG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzogcmV0dXJuIFwiY29ubmVjdGluZ1wiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMub3BlbjogcmV0dXJuIFwib3BlblwiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY2xvc2luZzogcmV0dXJuIFwiY2xvc2luZ1wiXG4gICAgICBkZWZhdWx0OiByZXR1cm4gXCJjbG9zZWRcIlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSgpID09PSBcIm9wZW5cIiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hhbm5lbH1cbiAgICovXG4gIHJlbW92ZShjaGFubmVsKXtcbiAgICB0aGlzLm9mZihjaGFubmVsLnN0YXRlQ2hhbmdlUmVmcylcbiAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoYyA9PiBjICE9PSBjaGFubmVsKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWAgcmVnaXN0cmF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtyZWZzfSAtIGxpc3Qgb2YgcmVmcyByZXR1cm5lZCBieSBjYWxscyB0b1xuICAgKiAgICAgICAgICAgICAgICAgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWBcbiAgICovXG4gIG9mZihyZWZzKXtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzKXtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XS5maWx0ZXIoKFtyZWZdKSA9PiB7XG4gICAgICAgIHJldHVybiByZWZzLmluZGV4T2YocmVmKSA9PT0gLTFcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBhIG5ldyBjaGFubmVsIGZvciB0aGUgZ2l2ZW4gdG9waWNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvcGljXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFuUGFyYW1zIC0gUGFyYW1ldGVycyBmb3IgdGhlIGNoYW5uZWxcbiAgICogQHJldHVybnMge0NoYW5uZWx9XG4gICAqL1xuICBjaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zID0ge30pe1xuICAgIGxldCBjaGFuID0gbmV3IENoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMsIHRoaXMpXG4gICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW4pXG4gICAgcmV0dXJuIGNoYW5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgKi9cbiAgcHVzaChkYXRhKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IGRhdGFcbiAgICAgIHRoaXMubG9nKFwicHVzaFwiLCBgJHt0b3BpY30gJHtldmVudH0gKCR7am9pbl9yZWZ9LCAke3JlZn0pYCwgcGF5bG9hZClcbiAgICB9XG5cbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKCgpID0+IHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG1lc3NhZ2UgcmVmLCBhY2NvdW50aW5nIGZvciBvdmVyZmxvd3NcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIG1ha2VSZWYoKXtcbiAgICBsZXQgbmV3UmVmID0gdGhpcy5yZWYgKyAxXG4gICAgaWYobmV3UmVmID09PSB0aGlzLnJlZil7IHRoaXMucmVmID0gMCB9IGVsc2UgeyB0aGlzLnJlZiA9IG5ld1JlZiB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWYudG9TdHJpbmcoKVxuICB9XG5cbiAgc2VuZEhlYXJ0YmVhdCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiAmJiAhdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmfSlcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGZsdXNoU2VuZEJ1ZmZlcigpe1xuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKVxuICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB9XG4gIH1cblxuICBvbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2Upe1xuICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgbXNnID0+IHtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IG1zZ1xuICAgICAgaWYocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBDT05TRUNVVElWRV9SRUxPQURTID0gXCJjb25zZWN1dGl2ZS1yZWxvYWRzXCJcbmV4cG9ydCBjb25zdCBNQVhfUkVMT0FEUyA9IDEwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NSU4gPSA1MDAwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NQVggPSAxMDAwMFxuZXhwb3J0IGNvbnN0IEZBSUxTQUZFX0pJVFRFUiA9IDMwMDAwXG5leHBvcnQgY29uc3QgUEhYX0VWRU5UX0NMQVNTRVMgPSBbXG4gIFwicGh4LWNsaWNrLWxvYWRpbmdcIiwgXCJwaHgtY2hhbmdlLWxvYWRpbmdcIiwgXCJwaHgtc3VibWl0LWxvYWRpbmdcIixcbiAgXCJwaHgta2V5ZG93bi1sb2FkaW5nXCIsIFwicGh4LWtleXVwLWxvYWRpbmdcIiwgXCJwaHgtYmx1ci1sb2FkaW5nXCIsIFwicGh4LWZvY3VzLWxvYWRpbmdcIixcbiAgXCJwaHgtaG9vay1sb2FkaW5nXCJcbl1cbmV4cG9ydCBjb25zdCBQSFhfQ09NUE9ORU5UID0gXCJkYXRhLXBoeC1jb21wb25lbnRcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0xJTksgPSBcImRhdGEtcGh4LWxpbmtcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUkFDS19TVEFUSUMgPSBcInRyYWNrLXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX0xJTktfU1RBVEUgPSBcImRhdGEtcGh4LWxpbmstc3RhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUZfTE9BRElORyA9IFwiZGF0YS1waHgtcmVmLWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUZfU1JDID0gXCJkYXRhLXBoeC1yZWYtc3JjXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVGX0xPQ0sgPSBcImRhdGEtcGh4LXJlZi1sb2NrXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfVVBMT0FEUyA9IFwidHJhY2stdXBsb2Fkc1wiXG5leHBvcnQgY29uc3QgUEhYX1VQTE9BRF9SRUYgPSBcImRhdGEtcGh4LXVwbG9hZC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUkVGTElHSFRFRF9SRUZTID0gXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRE9ORV9SRUZTID0gXCJkYXRhLXBoeC1kb25lLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9EUk9QX1RBUkdFVCA9IFwiZHJvcC10YXJnZXRcIlxuZXhwb3J0IGNvbnN0IFBIWF9BQ1RJVkVfRU5UUllfUkVGUyA9IFwiZGF0YS1waHgtYWN0aXZlLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCA9IFwicGh4OmxpdmUtZmlsZTp1cGRhdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0tJUCA9IFwiZGF0YS1waHgtc2tpcFwiXG5leHBvcnQgY29uc3QgUEhYX01BR0lDX0lEID0gXCJkYXRhLXBoeC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX1BSVU5FID0gXCJkYXRhLXBoeC1wcnVuZVwiXG5leHBvcnQgY29uc3QgUEhYX0NPTk5FQ1RFRF9DTEFTUyA9IFwicGh4LWNvbm5lY3RlZFwiXG5leHBvcnQgY29uc3QgUEhYX0xPQURJTkdfQ0xBU1MgPSBcInBoeC1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfRVJST1JfQ0xBU1MgPSBcInBoeC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyA9IFwicGh4LWNsaWVudC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1NFUlZFUl9FUlJPUl9DTEFTUyA9IFwicGh4LXNlcnZlci1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1BBUkVOVF9JRCA9IFwiZGF0YS1waHgtcGFyZW50LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfTUFJTiA9IFwiZGF0YS1waHgtbWFpblwiXG5leHBvcnQgY29uc3QgUEhYX1JPT1RfSUQgPSBcImRhdGEtcGh4LXJvb3QtaWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9WSUVXUE9SVF9UT1AgPSBcInZpZXdwb3J0LXRvcFwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdQT1JUX0JPVFRPTSA9IFwidmlld3BvcnQtYm90dG9tXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJJR0dFUl9BQ1RJT04gPSBcInRyaWdnZXItYWN0aW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfSEFTX0ZPQ1VTRUQgPSBcInBoeC1oYXMtZm9jdXNlZFwiXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0lOUFVUUyA9IFtcInRleHRcIiwgXCJ0ZXh0YXJlYVwiLCBcIm51bWJlclwiLCBcImVtYWlsXCIsIFwicGFzc3dvcmRcIiwgXCJzZWFyY2hcIiwgXCJ0ZWxcIiwgXCJ1cmxcIiwgXCJkYXRlXCIsIFwidGltZVwiLCBcImRhdGV0aW1lLWxvY2FsXCIsIFwiY29sb3JcIiwgXCJyYW5nZVwiXVxuZXhwb3J0IGNvbnN0IENIRUNLQUJMRV9JTlBVVFMgPSBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdXG5leHBvcnQgY29uc3QgUEhYX0hBU19TVUJNSVRURUQgPSBcInBoeC1oYXMtc3VibWl0dGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0VTU0lPTiA9IFwiZGF0YS1waHgtc2Vzc2lvblwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdfU0VMRUNUT1IgPSBgWyR7UEhYX1NFU1NJT059XWBcbmV4cG9ydCBjb25zdCBQSFhfU1RJQ0tZID0gXCJkYXRhLXBoeC1zdGlja3lcIlxuZXhwb3J0IGNvbnN0IFBIWF9TVEFUSUMgPSBcImRhdGEtcGh4LXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX1JFQURPTkxZID0gXCJkYXRhLXBoeC1yZWFkb25seVwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVEID0gXCJkYXRhLXBoeC1kaXNhYmxlZFwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVfV0lUSCA9IFwiZGlzYWJsZS13aXRoXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUgPSBcImRhdGEtcGh4LWRpc2FibGUtd2l0aC1yZXN0b3JlXCJcbmV4cG9ydCBjb25zdCBQSFhfSE9PSyA9IFwiaG9va1wiXG5leHBvcnQgY29uc3QgUEhYX0RFQk9VTkNFID0gXCJkZWJvdW5jZVwiXG5leHBvcnQgY29uc3QgUEhYX1RIUk9UVExFID0gXCJ0aHJvdHRsZVwiXG5leHBvcnQgY29uc3QgUEhYX1VQREFURSA9IFwidXBkYXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfU1RSRUFNID0gXCJzdHJlYW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9TVFJFQU1fUkVGID0gXCJkYXRhLXBoeC1zdHJlYW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9LRVkgPSBcImtleVwiXG5leHBvcnQgY29uc3QgUEhYX1BSSVZBVEUgPSBcInBoeFByaXZhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9BVVRPX1JFQ09WRVIgPSBcImF1dG8tcmVjb3ZlclwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0RFQlVHID0gXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9QUk9GSUxFID0gXCJwaHg6bGl2ZS1zb2NrZXQ6cHJvZmlsaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfTEFURU5DWV9TSU0gPSBcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0hJU1RPUllfUE9TSVRJT04gPSBcInBoeDpuYXYtaGlzdG9yeS1wb3NpdGlvblwiXG5leHBvcnQgY29uc3QgUEhYX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiXG5leHBvcnQgY29uc3QgUEhYX01PVU5URUQgPSBcIm1vdW50ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUxPQURfU1RBVFVTID0gXCJfX3Bob2VuaXhfcmVsb2FkX3N0YXR1c19fXCJcbmV4cG9ydCBjb25zdCBMT0FERVJfVElNRU9VVCA9IDFcbmV4cG9ydCBjb25zdCBNQVhfQ0hJTERfSk9JTl9BVFRFTVBUUyA9IDNcbmV4cG9ydCBjb25zdCBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUID0gMjAwXG5leHBvcnQgY29uc3QgQklORElOR19QUkVGSVggPSBcInBoeC1cIlxuZXhwb3J0IGNvbnN0IFBVU0hfVElNRU9VVCA9IDMwMDAwXG5leHBvcnQgY29uc3QgTElOS19IRUFERVIgPSBcIngtcmVxdWVzdGVkLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFJFU1BPTlNFX1VSTF9IRUFERVIgPSBcIngtcmVzcG9uc2UtdXJsXCJcbmV4cG9ydCBjb25zdCBERUJPVU5DRV9UUklHR0VSID0gXCJkZWJvdW5jZS10cmlnZ2VyXCJcbmV4cG9ydCBjb25zdCBUSFJPVFRMRUQgPSBcInRocm90dGxlZFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfUFJFVl9LRVkgPSBcImRlYm91bmNlLXByZXYta2V5XCJcbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgZGVib3VuY2U6IDMwMCxcbiAgdGhyb3R0bGU6IDMwMFxufVxuZXhwb3J0IGNvbnN0IFBIWF9QRU5ESU5HX0FUVFJTID0gW1BIWF9SRUZfTE9BRElORywgUEhYX1JFRl9TUkMsIFBIWF9SRUZfTE9DS11cbi8vIFJlbmRlcmVkXG5leHBvcnQgY29uc3QgRFlOQU1JQ1MgPSBcImRcIlxuZXhwb3J0IGNvbnN0IFNUQVRJQyA9IFwic1wiXG5leHBvcnQgY29uc3QgUk9PVCA9IFwiclwiXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UUyA9IFwiY1wiXG5leHBvcnQgY29uc3QgRVZFTlRTID0gXCJlXCJcbmV4cG9ydCBjb25zdCBSRVBMWSA9IFwiclwiXG5leHBvcnQgY29uc3QgVElUTEUgPSBcInRcIlxuZXhwb3J0IGNvbnN0IFRFTVBMQVRFUyA9IFwicFwiXG5leHBvcnQgY29uc3QgU1RSRUFNID0gXCJzdHJlYW1cIlxuIiwgImltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlVcGxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBjb25maWcsIGxpdmVTb2NrZXQpe1xuICAgIGxldCB7Y2h1bmtfc2l6ZSwgY2h1bmtfdGltZW91dH0gPSBjb25maWdcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSBsaXZlU29ja2V0XG4gICAgdGhpcy5lbnRyeSA9IGVudHJ5XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5jaHVua1NpemUgPSBjaHVua19zaXplXG4gICAgdGhpcy5jaHVua1RpbWVvdXQgPSBjaHVua190aW1lb3V0XG4gICAgdGhpcy5jaHVua1RpbWVyID0gbnVsbFxuICAgIHRoaXMuZXJyb3JlZCA9IGZhbHNlXG4gICAgdGhpcy51cGxvYWRDaGFubmVsID0gbGl2ZVNvY2tldC5jaGFubmVsKGBsdnU6JHtlbnRyeS5yZWZ9YCwge3Rva2VuOiBlbnRyeS5tZXRhZGF0YSgpfSlcbiAgfVxuXG4gIGVycm9yKHJlYXNvbil7XG4gICAgaWYodGhpcy5lcnJvcmVkKXsgcmV0dXJuIH1cbiAgICB0aGlzLnVwbG9hZENoYW5uZWwubGVhdmUoKVxuICAgIHRoaXMuZXJyb3JlZCA9IHRydWVcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jaHVua1RpbWVyKVxuICAgIHRoaXMuZW50cnkuZXJyb3IocmVhc29uKVxuICB9XG5cbiAgdXBsb2FkKCl7XG4gICAgdGhpcy51cGxvYWRDaGFubmVsLm9uRXJyb3IocmVhc29uID0+IHRoaXMuZXJyb3IocmVhc29uKSlcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwuam9pbigpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIF9kYXRhID0+IHRoaXMucmVhZE5leHRDaHVuaygpKVxuICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICB9XG5cbiAgaXNEb25lKCl7IHJldHVybiB0aGlzLm9mZnNldCA+PSB0aGlzLmVudHJ5LmZpbGUuc2l6ZSB9XG5cbiAgcmVhZE5leHRDaHVuaygpe1xuICAgIGxldCByZWFkZXIgPSBuZXcgd2luZG93LkZpbGVSZWFkZXIoKVxuICAgIGxldCBibG9iID0gdGhpcy5lbnRyeS5maWxlLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLmNodW5rU2l6ZSArIHRoaXMub2Zmc2V0KVxuICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgaWYoZS50YXJnZXQuZXJyb3IgPT09IG51bGwpe1xuICAgICAgICB0aGlzLm9mZnNldCArPSBlLnRhcmdldC5yZXN1bHQuYnl0ZUxlbmd0aFxuICAgICAgICB0aGlzLnB1c2hDaHVuayhlLnRhcmdldC5yZXN1bHQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9nRXJyb3IoXCJSZWFkIGVycm9yOiBcIiArIGUudGFyZ2V0LmVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgfVxuXG4gIHB1c2hDaHVuayhjaHVuayl7XG4gICAgaWYoIXRoaXMudXBsb2FkQ2hhbm5lbC5pc0pvaW5lZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnVwbG9hZENoYW5uZWwucHVzaChcImNodW5rXCIsIGNodW5rLCB0aGlzLmNodW5rVGltZW91dClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmVudHJ5LnByb2dyZXNzKCh0aGlzLm9mZnNldCAvIHRoaXMuZW50cnkuZmlsZS5zaXplKSAqIDEwMClcbiAgICAgICAgaWYoIXRoaXMuaXNEb25lKCkpe1xuICAgICAgICAgIHRoaXMuY2h1bmtUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZWFkTmV4dENodW5rKCksIHRoaXMubGl2ZVNvY2tldC5nZXRMYXRlbmN5U2ltKCkgfHwgMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgKHtyZWFzb259KSA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfVklFV19TRUxFQ1RPUlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgRW50cnlVcGxvYWRlciBmcm9tIFwiLi9lbnRyeV91cGxvYWRlclwiXG5cbmV4cG9ydCBsZXQgbG9nRXJyb3IgPSAobXNnLCBvYmopID0+IGNvbnNvbGUuZXJyb3IgJiYgY29uc29sZS5lcnJvcihtc2csIG9iailcblxuZXhwb3J0IGxldCBpc0NpZCA9IChjaWQpID0+IHtcbiAgbGV0IHR5cGUgPSB0eXBlb2YoY2lkKVxuICByZXR1cm4gdHlwZSA9PT0gXCJudW1iZXJcIiB8fCAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAvXigwfFsxLTldXFxkKikkLy50ZXN0KGNpZCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3REdXBsaWNhdGVJZHMoKXtcbiAgbGV0IGlkcyA9IG5ldyBTZXQoKVxuICBsZXQgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKltpZF1cIilcbiAgZm9yKGxldCBpID0gMCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIGlmKGlkcy5oYXMoZWxlbXNbaV0uaWQpKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYE11bHRpcGxlIElEcyBkZXRlY3RlZDogJHtlbGVtc1tpXS5pZH0uIEVuc3VyZSB1bmlxdWUgZWxlbWVudCBpZHMuYClcbiAgICB9IGVsc2Uge1xuICAgICAgaWRzLmFkZChlbGVtc1tpXS5pZClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEludmFsaWRTdHJlYW1JbnNlcnRzKGluc2VydHMpe1xuICBjb25zdCBlcnJvcnMgPSBuZXcgU2V0KClcbiAgT2JqZWN0LmtleXMoaW5zZXJ0cykuZm9yRWFjaCgoaWQpID0+IHtcbiAgICBjb25zdCBzdHJlYW1FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICAgIGlmKHN0cmVhbUVsICYmIHN0cmVhbUVsLnBhcmVudEVsZW1lbnQgJiYgc3RyZWFtRWwucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJwaHgtdXBkYXRlXCIpICE9PSBcInN0cmVhbVwiKXtcbiAgICAgIGVycm9ycy5hZGQoYFRoZSBzdHJlYW0gY29udGFpbmVyIHdpdGggaWQgXCIke3N0cmVhbUVsLnBhcmVudEVsZW1lbnQuaWR9XCIgaXMgbWlzc2luZyB0aGUgcGh4LXVwZGF0ZT1cInN0cmVhbVwiIGF0dHJpYnV0ZS4gRW5zdXJlIGl0IGlzIHNldCBmb3Igc3RyZWFtcyB0byB3b3JrIHByb3Blcmx5LmApXG4gICAgfVxuICB9KVxuICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcbn1cblxuZXhwb3J0IGxldCBkZWJ1ZyA9ICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4ge1xuICBpZih2aWV3LmxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICB9XG59XG5cbi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIgPyB2YWwgOiBmdW5jdGlvbiAoKXsgcmV0dXJuIHZhbCB9XG5cbmV4cG9ydCBsZXQgY2xvbmUgPSAob2JqKSA9PiB7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cblxuZXhwb3J0IGxldCBjbG9zZXN0UGh4QmluZGluZyA9IChlbCwgYmluZGluZywgYm9yZGVyRWwpID0+IHtcbiAgZG8ge1xuICAgIGlmKGVsLm1hdGNoZXMoYFske2JpbmRpbmd9XWApICYmICFlbC5kaXNhYmxlZCl7IHJldHVybiBlbCB9XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGVcbiAgfSB3aGlsZShlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiAhKChib3JkZXJFbCAmJiBib3JkZXJFbC5pc1NhbWVOb2RlKGVsKSkgfHwgZWwubWF0Y2hlcyhQSFhfVklFV19TRUxFQ1RPUikpKVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgbGV0IGlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIShvYmogaW5zdGFuY2VvZiBBcnJheSlcbn1cblxuZXhwb3J0IGxldCBpc0VxdWFsT2JqID0gKG9iajEsIG9iajIpID0+IEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKVxuXG5leHBvcnQgbGV0IGlzRW1wdHkgPSAob2JqKSA9PiB7XG4gIGZvcihsZXQgeCBpbiBvYmopeyByZXR1cm4gZmFsc2UgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgbGV0IG1heWJlID0gKGVsLCBjYWxsYmFjaykgPT4gZWwgJiYgY2FsbGJhY2soZWwpXG5cbmV4cG9ydCBsZXQgY2hhbm5lbFVwbG9hZGVyID0gZnVuY3Rpb24gKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpe1xuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGxldCBlbnRyeVVwbG9hZGVyID0gbmV3IEVudHJ5VXBsb2FkZXIoZW50cnksIHJlc3AuY29uZmlnLCBsaXZlU29ja2V0KVxuICAgIGVudHJ5VXBsb2FkZXIudXBsb2FkKClcbiAgfSlcbn1cbiIsICJsZXQgQnJvd3NlciA9IHtcbiAgY2FuUHVzaFN0YXRlKCl7IHJldHVybiAodHlwZW9mIChoaXN0b3J5LnB1c2hTdGF0ZSkgIT09IFwidW5kZWZpbmVkXCIpIH0sXG5cbiAgZHJvcExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KSlcbiAgfSxcblxuICB1cGRhdGVMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5LCBpbml0aWFsLCBmdW5jKXtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0TG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSlcbiAgICBsZXQga2V5ID0gdGhpcy5sb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSlcbiAgICBsZXQgbmV3VmFsID0gY3VycmVudCA9PT0gbnVsbCA/IGluaXRpYWwgOiBmdW5jKGN1cnJlbnQpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShuZXdWYWwpKVxuICAgIHJldHVybiBuZXdWYWxcbiAgfSxcblxuICBnZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KXtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KSkpXG4gIH0sXG5cbiAgdXBkYXRlQ3VycmVudFN0YXRlKGNhbGxiYWNrKXtcbiAgICBpZighdGhpcy5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoY2FsbGJhY2soaGlzdG9yeS5zdGF0ZSB8fCB7fSksIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICB9LFxuXG4gIHB1c2hTdGF0ZShraW5kLCBtZXRhLCB0byl7XG4gICAgaWYodGhpcy5jYW5QdXNoU3RhdGUoKSl7XG4gICAgICBpZih0byAhPT0gd2luZG93LmxvY2F0aW9uLmhyZWYpe1xuICAgICAgICBpZihtZXRhLnR5cGUgPT0gXCJyZWRpcmVjdFwiICYmIG1ldGEuc2Nyb2xsKXtcbiAgICAgICAgICAvLyBJZiB3ZSdyZSByZWRpcmVjdGluZyBzdG9yZSB0aGUgY3VycmVudCBzY3JvbGxZIGZvciB0aGUgY3VycmVudCBoaXN0b3J5IHN0YXRlLlxuICAgICAgICAgIGxldCBjdXJyZW50U3RhdGUgPSBoaXN0b3J5LnN0YXRlIHx8IHt9XG4gICAgICAgICAgY3VycmVudFN0YXRlLnNjcm9sbCA9IG1ldGEuc2Nyb2xsXG4gICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoY3VycmVudFN0YXRlLCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBtZXRhLnNjcm9sbCAvLyBPbmx5IHN0b3JlIHRoZSBzY3JvbGwgaW4gdGhlIHJlZGlyZWN0IGNhc2UuXG4gICAgICAgIGhpc3Rvcnlba2luZCArIFwiU3RhdGVcIl0obWV0YSwgXCJcIiwgdG8gfHwgbnVsbCkgLy8gSUUgd2lsbCBjb2VyY2UgdW5kZWZpbmVkIHRvIHN0cmluZ1xuXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgbmF2aWdhdGUsIHdlJ2QgY2FsbCBwdXNoU3RhdGUgaW1tZWRpYXRlbHkgYmVmb3JlIHBhdGNoaW5nIHRoZSBET00sXG4gICAgICAgIC8vIGp1bXBpbmcgYmFjayB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLCBlZmZlY3RpdmVseSBpZ25vcmluZyB0aGUgc2Nyb2xsSW50b1ZpZXc7XG4gICAgICAgIC8vIHRoZXJlZm9yZSB3ZSB3YWl0IGZvciB0aGUgbmV4dCBmcmFtZSAoYWZ0ZXIgdGhlIERPTSBwYXRjaCkgYW5kIG9ubHkgdGhlbiB0cnlcbiAgICAgICAgLy8gdG8gc2Nyb2xsIHRvIHRoZSBoYXNoRWxcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgbGV0IGhhc2hFbCA9IHRoaXMuZ2V0SGFzaFRhcmdldEVsKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICBcbiAgICAgICAgICBpZihoYXNoRWwpe1xuICAgICAgICAgICAgaGFzaEVsLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgICB9IGVsc2UgaWYobWV0YS50eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZWRpcmVjdCh0bylcbiAgICB9XG4gIH0sXG5cbiAgc2V0Q29va2llKG5hbWUsIHZhbHVlLCBtYXhBZ2VTZWNvbmRzKXtcbiAgICBsZXQgZXhwaXJlcyA9IHR5cGVvZihtYXhBZ2VTZWNvbmRzKSA9PT0gXCJudW1iZXJcIiA/IGAgbWF4LWFnZT0ke21heEFnZVNlY29uZHN9O2AgOiBcIlwiXG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX07JHtleHBpcmVzfSBwYXRoPS9gXG4gIH0sXG5cbiAgZ2V0Q29va2llKG5hbWUpe1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xccyopJHtuYW1lfVxccypcXD1cXHMqKFteO10qKS4qJCl8Xi4qJGApLCBcIiQxXCIpXG4gIH0sXG5cbiAgZGVsZXRlQ29va2llKG5hbWUpe1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PTsgbWF4LWFnZT0tMTsgcGF0aD0vYFxuICB9LFxuXG4gIHJlZGlyZWN0KHRvVVJMLCBmbGFzaCl7XG4gICAgaWYoZmxhc2gpeyB0aGlzLnNldENvb2tpZShcIl9fcGhvZW5peF9mbGFzaF9fXCIsIGZsYXNoLCA2MCkgfVxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRvVVJMXG4gIH0sXG5cbiAgbG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpeyByZXR1cm4gYCR7bmFtZXNwYWNlfS0ke3N1YmtleX1gIH0sXG5cbiAgZ2V0SGFzaFRhcmdldEVsKG1heWJlSGFzaCl7XG4gICAgbGV0IGhhc2ggPSBtYXliZUhhc2gudG9TdHJpbmcoKS5zdWJzdHJpbmcoMSlcbiAgICBpZihoYXNoID09PSBcIlwiKXsgcmV0dXJuIH1cbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCkgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYVtuYW1lPVwiJHtoYXNofVwiXWApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnJvd3NlclxuIiwgImltcG9ydCB7XG4gIENIRUNLQUJMRV9JTlBVVFMsXG4gIERFQk9VTkNFX1BSRVZfS0VZLFxuICBERUJPVU5DRV9UUklHR0VSLFxuICBGT0NVU0FCTEVfSU5QVVRTLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfTUFJTixcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BSSVZBVEUsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUkVGX0xPQ0ssXG4gIFBIWF9QRU5ESU5HX0FUVFJTLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX1NUSUNLWSxcbiAgUEhYX0VWRU5UX0NMQVNTRVMsXG4gIFRIUk9UVExFRCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgbG9nRXJyb3Jcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5sZXQgRE9NID0ge1xuICBieUlkKGlkKXsgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSB8fCBsb2dFcnJvcihgbm8gaWQgZm91bmQgZm9yICR7aWR9YCkgfSxcblxuICByZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKXtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICBpZihlbC5jbGFzc0xpc3QubGVuZ3RoID09PSAwKXsgZWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIikgfVxuICB9LFxuXG4gIGFsbChub2RlLCBxdWVyeSwgY2FsbGJhY2spe1xuICAgIGlmKCFub2RlKXsgcmV0dXJuIFtdIH1cbiAgICBsZXQgYXJyYXkgPSBBcnJheS5mcm9tKG5vZGUucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gYXJyYXkuZm9yRWFjaChjYWxsYmFjaykgOiBhcnJheVxuICB9LFxuXG4gIGNoaWxkTm9kZUxlbmd0aChodG1sKXtcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuY2hpbGRFbGVtZW50Q291bnRcbiAgfSxcblxuICBpc1VwbG9hZElucHV0KGVsKXsgcmV0dXJuIGVsLnR5cGUgPT09IFwiZmlsZVwiICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRikgIT09IG51bGwgfSxcblxuICBpc0F1dG9VcGxvYWQoaW5wdXRFbCl7IHJldHVybiBpbnB1dEVsLmhhc0F0dHJpYnV0ZShcImRhdGEtcGh4LWF1dG8tdXBsb2FkXCIpIH0sXG5cbiAgZmluZFVwbG9hZElucHV0cyhub2RlKXtcbiAgICBjb25zdCBmb3JtSWQgPSBub2RlLmlkXG4gICAgY29uc3QgaW5wdXRzT3V0c2lkZUZvcm0gPSB0aGlzLmFsbChkb2N1bWVudCwgYGlucHV0W3R5cGU9XCJmaWxlXCJdWyR7UEhYX1VQTE9BRF9SRUZ9XVtmb3JtPVwiJHtmb3JtSWR9XCJdYClcbiAgICByZXR1cm4gdGhpcy5hbGwobm9kZSwgYGlucHV0W3R5cGU9XCJmaWxlXCJdWyR7UEhYX1VQTE9BRF9SRUZ9XWApLmNvbmNhdChpbnB1dHNPdXRzaWRlRm9ybSlcbiAgfSxcblxuICBmaW5kQ29tcG9uZW50Tm9kZUxpc3Qobm9kZSwgY2lkKXtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdYCksIG5vZGUpXG4gIH0sXG5cbiAgaXNQaHhEZXN0cm95ZWQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuaWQgJiYgRE9NLnByaXZhdGUobm9kZSwgXCJkZXN0cm95ZWRcIikgPyB0cnVlIDogZmFsc2VcbiAgfSxcblxuICB3YW50c05ld1RhYihlKXtcbiAgICBsZXQgd2FudHNOZXdUYWIgPSBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLm1ldGFLZXkgfHwgKGUuYnV0dG9uICYmIGUuYnV0dG9uID09PSAxKVxuICAgIGxldCBpc0Rvd25sb2FkID0gKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgJiYgZS50YXJnZXQuaGFzQXR0cmlidXRlKFwiZG93bmxvYWRcIikpXG4gICAgbGV0IGlzVGFyZ2V0QmxhbmsgPSBlLnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJ0YXJnZXRcIikgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpLnRvTG93ZXJDYXNlKCkgPT09IFwiX2JsYW5rXCJcbiAgICBsZXQgaXNUYXJnZXROYW1lZFRhYiA9IGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcInRhcmdldFwiKSAmJiAhZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpLnN0YXJ0c1dpdGgoXCJfXCIpXG4gICAgcmV0dXJuIHdhbnRzTmV3VGFiIHx8IGlzVGFyZ2V0QmxhbmsgfHwgaXNEb3dubG9hZCB8fCBpc1RhcmdldE5hbWVkVGFiXG4gIH0sXG5cbiAgaXNVbmxvYWRhYmxlRm9ybVN1Ym1pdChlKXtcbiAgICAvLyBJZ25vcmUgZm9ybSBzdWJtaXNzaW9ucyBpbnRlbmRlZCB0byBjbG9zZSBhIG5hdGl2ZSA8ZGlhbG9nPiBlbGVtZW50XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L2RpYWxvZyN1c2FnZV9ub3Rlc1xuICAgIGxldCBpc0RpYWxvZ1N1Ym1pdCA9IChlLnRhcmdldCAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJtZXRob2RcIikgPT09IFwiZGlhbG9nXCIpIHx8XG4gICAgICAoZS5zdWJtaXR0ZXIgJiYgZS5zdWJtaXR0ZXIuZ2V0QXR0cmlidXRlKFwiZm9ybW1ldGhvZFwiKSA9PT0gXCJkaWFsb2dcIilcblxuICAgIGlmKGlzRGlhbG9nU3VibWl0KXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIWUuZGVmYXVsdFByZXZlbnRlZCAmJiAhdGhpcy53YW50c05ld1RhYihlKVxuICAgIH1cbiAgfSxcblxuICBpc05ld1BhZ2VDbGljayhlLCBjdXJyZW50TG9jYXRpb24pe1xuICAgIGxldCBocmVmID0gZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikgOiBudWxsXG4gICAgbGV0IHVybFxuXG4gICAgaWYoZS5kZWZhdWx0UHJldmVudGVkIHx8IGhyZWYgPT09IG51bGwgfHwgdGhpcy53YW50c05ld1RhYihlKSl7IHJldHVybiBmYWxzZSB9XG4gICAgaWYoaHJlZi5zdGFydHNXaXRoKFwibWFpbHRvOlwiKSB8fCBocmVmLnN0YXJ0c1dpdGgoXCJ0ZWw6XCIpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZihlLnRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSl7IHJldHVybiBmYWxzZSB9XG5cbiAgICB0cnkge1xuICAgICAgdXJsID0gbmV3IFVSTChocmVmKVxuICAgIH0gY2F0Y2gge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdXJsID0gbmV3IFVSTChocmVmLCBjdXJyZW50TG9jYXRpb24pXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gYmFkIFVSTCwgZmFsbGJhY2sgdG8gbGV0IGJyb3dzZXIgdHJ5IGl0IGFzIGV4dGVybmFsXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYodXJsLmhvc3QgPT09IGN1cnJlbnRMb2NhdGlvbi5ob3N0ICYmIHVybC5wcm90b2NvbCA9PT0gY3VycmVudExvY2F0aW9uLnByb3RvY29sKXtcbiAgICAgIGlmKHVybC5wYXRobmFtZSA9PT0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lICYmIHVybC5zZWFyY2ggPT09IGN1cnJlbnRMb2NhdGlvbi5zZWFyY2gpe1xuICAgICAgICByZXR1cm4gdXJsLmhhc2ggPT09IFwiXCIgJiYgIXVybC5ocmVmLmVuZHNXaXRoKFwiI1wiKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdXJsLnByb3RvY29sLnN0YXJ0c1dpdGgoXCJodHRwXCIpXG4gIH0sXG5cbiAgbWFya1BoeENoaWxkRGVzdHJveWVkKGVsKXtcbiAgICBpZih0aGlzLmlzUGh4Q2hpbGQoZWwpKXsgZWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCBcIlwiKSB9XG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBcImRlc3Ryb3llZFwiLCB0cnVlKVxuICB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQoaHRtbCwgcGFyZW50SWQpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGhpcy5maW5kUGh4Q2hpbGRyZW4odGVtcGxhdGUuY29udGVudCwgcGFyZW50SWQpXG4gIH0sXG5cbiAgaXNJZ25vcmVkKGVsLCBwaHhVcGRhdGUpe1xuICAgIHJldHVybiAoZWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkgfHwgZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtdXBkYXRlXCIpKSA9PT0gXCJpZ25vcmVcIlxuICB9LFxuXG4gIGlzUGh4VXBkYXRlKGVsLCBwaHhVcGRhdGUsIHVwZGF0ZVR5cGVzKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIHVwZGF0ZVR5cGVzLmluZGV4T2YoZWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkpID49IDBcbiAgfSxcblxuICBmaW5kUGh4U3RpY2t5KGVsKXsgcmV0dXJuIHRoaXMuYWxsKGVsLCBgWyR7UEhYX1NUSUNLWX1dYCkgfSxcblxuICBmaW5kUGh4Q2hpbGRyZW4oZWwsIHBhcmVudElkKXtcbiAgICByZXR1cm4gdGhpcy5hbGwoZWwsIGAke1BIWF9WSUVXX1NFTEVDVE9SfVske1BIWF9QQVJFTlRfSUR9PVwiJHtwYXJlbnRJZH1cIl1gKVxuICB9LFxuXG4gIGZpbmRFeGlzdGluZ1BhcmVudENJRHMobm9kZSwgY2lkcyl7XG4gICAgLy8gd2Ugb25seSB3YW50IHRvIGZpbmQgcGFyZW50cyB0aGF0IGV4aXN0IG9uIHRoZSBwYWdlXG4gICAgLy8gaWYgYSBjaWQgaXMgbm90IG9uIHRoZSBwYWdlLCB0aGUgb25seSB3YXkgaXQgY2FuIGJlIGFkZGVkIGJhY2sgdG8gdGhlIHBhZ2VcbiAgICAvLyBpcyBpZiBhIHBhcmVudCBhZGRzIGl0IGJhY2ssIHRoZXJlZm9yZSBpZiBhIGNpZCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgcGFnZSxcbiAgICAvLyB3ZSBzaG91bGQgbm90IHRyeSB0byByZW5kZXIgaXQgYnkgaXRzZWxmIChiZWNhdXNlIGl0IHdvdWxkIGJlIHJlbmRlcmVkIHR3aWNlLFxuICAgIC8vIG9uZSBieSB0aGUgcGFyZW50LCBhbmQgYSBzZWNvbmQgdGltZSBieSBpdHNlbGYpXG4gICAgbGV0IHBhcmVudENpZHMgPSBuZXcgU2V0KClcbiAgICBsZXQgY2hpbGRyZW5DaWRzID0gbmV3IFNldCgpXG5cbiAgICBjaWRzLmZvckVhY2goY2lkID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KHRoaXMuYWxsKG5vZGUsIGBbJHtQSFhfQ09NUE9ORU5UfT1cIiR7Y2lkfVwiXWApLCBub2RlKS5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgICAgIHBhcmVudENpZHMuYWRkKGNpZClcbiAgICAgICAgdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwocGFyZW50LCBgWyR7UEhYX0NPTVBPTkVOVH1dYCksIHBhcmVudClcbiAgICAgICAgICAubWFwKGVsID0+IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSkpXG4gICAgICAgICAgLmZvckVhY2goY2hpbGRDSUQgPT4gY2hpbGRyZW5DaWRzLmFkZChjaGlsZENJRCkpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBjaGlsZHJlbkNpZHMuZm9yRWFjaChjaGlsZENpZCA9PiBwYXJlbnRDaWRzLmRlbGV0ZShjaGlsZENpZCkpXG5cbiAgICByZXR1cm4gcGFyZW50Q2lkc1xuICB9LFxuXG4gIGZpbHRlcldpdGhpblNhbWVMaXZlVmlldyhub2RlcywgcGFyZW50KXtcbiAgICBpZihwYXJlbnQucXVlcnlTZWxlY3RvcihQSFhfVklFV19TRUxFQ1RPUikpe1xuICAgICAgcmV0dXJuIG5vZGVzLmZpbHRlcihlbCA9PiB0aGlzLndpdGhpblNhbWVMaXZlVmlldyhlbCwgcGFyZW50KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGVzXG4gICAgfVxuICB9LFxuXG4gIHdpdGhpblNhbWVMaXZlVmlldyhub2RlLCBwYXJlbnQpe1xuICAgIHdoaWxlKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpe1xuICAgICAgaWYobm9kZS5pc1NhbWVOb2RlKHBhcmVudCkpeyByZXR1cm4gdHJ1ZSB9XG4gICAgICBpZihub2RlLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgIT09IG51bGwpeyByZXR1cm4gZmFsc2UgfVxuICAgIH1cbiAgfSxcblxuICBwcml2YXRlKGVsLCBrZXkpeyByZXR1cm4gZWxbUEhYX1BSSVZBVEVdICYmIGVsW1BIWF9QUklWQVRFXVtrZXldIH0sXG5cbiAgZGVsZXRlUHJpdmF0ZShlbCwga2V5KXsgZWxbUEhYX1BSSVZBVEVdICYmIGRlbGV0ZSAoZWxbUEhYX1BSSVZBVEVdW2tleV0pIH0sXG5cbiAgcHV0UHJpdmF0ZShlbCwga2V5LCB2YWx1ZSl7XG4gICAgaWYoIWVsW1BIWF9QUklWQVRFXSl7IGVsW1BIWF9QUklWQVRFXSA9IHt9IH1cbiAgICBlbFtQSFhfUFJJVkFURV1ba2V5XSA9IHZhbHVlXG4gIH0sXG5cbiAgdXBkYXRlUHJpdmF0ZShlbCwga2V5LCBkZWZhdWx0VmFsLCB1cGRhdGVGdW5jKXtcbiAgICBsZXQgZXhpc3RpbmcgPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZihleGlzdGluZyA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB1cGRhdGVGdW5jKGRlZmF1bHRWYWwpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdXBkYXRlRnVuYyhleGlzdGluZykpXG4gICAgfVxuICB9LFxuXG4gIHN5bmNQZW5kaW5nQXR0cnMoZnJvbUVsLCB0b0VsKXtcbiAgICBpZighZnJvbUVsLmhhc0F0dHJpYnV0ZShQSFhfUkVGX1NSQykpeyByZXR1cm4gfVxuICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgIGZyb21FbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSAmJiB0b0VsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgIH0pXG4gICAgUEhYX1BFTkRJTkdfQVRUUlMuZmlsdGVyKGF0dHIgPT4gZnJvbUVsLmhhc0F0dHJpYnV0ZShhdHRyKSkuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgIHRvRWwuc2V0QXR0cmlidXRlKGF0dHIsIGZyb21FbC5nZXRBdHRyaWJ1dGUoYXR0cikpXG4gICAgfSlcbiAgfSxcblxuICBjb3B5UHJpdmF0ZXModGFyZ2V0LCBzb3VyY2Upe1xuICAgIGlmKHNvdXJjZVtQSFhfUFJJVkFURV0pe1xuICAgICAgdGFyZ2V0W1BIWF9QUklWQVRFXSA9IHNvdXJjZVtQSFhfUFJJVkFURV1cbiAgICB9XG4gIH0sXG5cbiAgcHV0VGl0bGUoc3RyKXtcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKVxuICAgIGlmKHRpdGxlRWwpe1xuICAgICAgbGV0IHtwcmVmaXgsIHN1ZmZpeCwgZGVmYXVsdDogZGVmYXVsdFRpdGxlfSA9IHRpdGxlRWwuZGF0YXNldFxuICAgICAgbGV0IGlzRW1wdHkgPSB0eXBlb2Yoc3RyKSAhPT0gXCJzdHJpbmdcIiB8fCBzdHIudHJpbSgpID09PSBcIlwiXG4gICAgICBpZihpc0VtcHR5ICYmIHR5cGVvZihkZWZhdWx0VGl0bGUpICE9PSBcInN0cmluZ1wiKXsgcmV0dXJuIH1cblxuICAgICAgbGV0IGlubmVyID0gaXNFbXB0eSA/IGRlZmF1bHRUaXRsZSA6IHN0clxuICAgICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwcmVmaXggfHwgXCJcIn0ke2lubmVyIHx8IFwiXCJ9JHtzdWZmaXggfHwgXCJcIn1gXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gc3RyXG4gICAgfVxuICB9LFxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgcGh4RGVib3VuY2UsIGRlZmF1bHREZWJvdW5jZSwgcGh4VGhyb3R0bGUsIGRlZmF1bHRUaHJvdHRsZSwgYXN5bmNGaWx0ZXIsIGNhbGxiYWNrKXtcbiAgICBsZXQgZGVib3VuY2UgPSBlbC5nZXRBdHRyaWJ1dGUocGh4RGVib3VuY2UpXG4gICAgbGV0IHRocm90dGxlID0gZWwuZ2V0QXR0cmlidXRlKHBoeFRocm90dGxlKVxuXG4gICAgaWYoZGVib3VuY2UgPT09IFwiXCIpeyBkZWJvdW5jZSA9IGRlZmF1bHREZWJvdW5jZSB9XG4gICAgaWYodGhyb3R0bGUgPT09IFwiXCIpeyB0aHJvdHRsZSA9IGRlZmF1bHRUaHJvdHRsZSB9XG4gICAgbGV0IHZhbHVlID0gZGVib3VuY2UgfHwgdGhyb3R0bGVcbiAgICBzd2l0Y2godmFsdWUpe1xuICAgICAgY2FzZSBudWxsOiByZXR1cm4gY2FsbGJhY2soKVxuXG4gICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICBpZih0aGlzLm9uY2UoZWwsIFwiZGVib3VuY2UtYmx1clwiKSl7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IGNhbGxiYWNrKCkgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCB0aW1lb3V0ID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgIGxldCB0cmlnZ2VyID0gKCkgPT4gdGhyb3R0bGUgPyB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRCkgOiBjYWxsYmFjaygpXG4gICAgICAgIGxldCBjdXJyZW50Q3ljbGUgPSB0aGlzLmluY0N5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCB0cmlnZ2VyKVxuICAgICAgICBpZihpc05hTih0aW1lb3V0KSl7IHJldHVybiBsb2dFcnJvcihgaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogJHt2YWx1ZX1gKSB9XG4gICAgICAgIGlmKHRocm90dGxlKXtcbiAgICAgICAgICBsZXQgbmV3S2V5RG93biA9IGZhbHNlXG4gICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpe1xuICAgICAgICAgICAgbGV0IHByZXZLZXkgPSB0aGlzLnByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSwgZXZlbnQua2V5KVxuICAgICAgICAgICAgbmV3S2V5RG93biA9IHByZXZLZXkgIT09IGV2ZW50LmtleVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFuZXdLZXlEb3duICYmIHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZihhc3luY0ZpbHRlcigpKXsgdGhpcy50cmlnZ2VyQ3ljbGUoZWwsIERFQk9VTkNFX1RSSUdHRVIpIH1cbiAgICAgICAgICAgIH0sIHRpbWVvdXQpXG4gICAgICAgICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFRIUk9UVExFRCwgdClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZihhc3luY0ZpbHRlcigpKXsgdGhpcy50cmlnZ2VyQ3ljbGUoZWwsIERFQk9VTkNFX1RSSUdHRVIsIGN1cnJlbnRDeWNsZSkgfVxuICAgICAgICAgIH0sIHRpbWVvdXQpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm9ybSA9IGVsLmZvcm1cbiAgICAgICAgaWYoZm9ybSAmJiB0aGlzLm9uY2UoZm9ybSwgXCJiaW5kLWRlYm91bmNlXCIpKXtcbiAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgQXJyYXkuZnJvbSgobmV3IEZvcm1EYXRhKGZvcm0pKS5lbnRyaWVzKCksIChbbmFtZV0pID0+IHtcbiAgICAgICAgICAgICAgbGV0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7bmFtZX1cIl1gKVxuICAgICAgICAgICAgICB0aGlzLmluY0N5Y2xlKGlucHV0LCBERUJPVU5DRV9UUklHR0VSKVxuICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVByaXZhdGUoaW5wdXQsIFRIUk9UVExFRClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm9uY2UoZWwsIFwiYmluZC1kZWJvdW5jZVwiKSl7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gYmVjYXVzZSB3ZSB0cmlnZ2VyIHRoZSBjYWxsYmFjayBoZXJlLFxuICAgICAgICAgICAgLy8gd2UgYWxzbyBjbGVhciB0aGUgdGhyb3R0bGUgdGltZW91dCB0byBwcmV2ZW50IHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgLy8gZnJvbSBiZWluZyBjYWxsZWQgYWdhaW4gYWZ0ZXIgdGhlIHRpbWVvdXQgZmlyZXNcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnByaXZhdGUoZWwsIFRIUk9UVExFRCkpXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRyaWdnZXJDeWNsZShlbCwga2V5LCBjdXJyZW50Q3ljbGUpe1xuICAgIGxldCBbY3ljbGUsIHRyaWdnZXJdID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpXG4gICAgaWYoIWN1cnJlbnRDeWNsZSl7IGN1cnJlbnRDeWNsZSA9IGN5Y2xlIH1cbiAgICBpZihjdXJyZW50Q3ljbGUgPT09IGN5Y2xlKXtcbiAgICAgIHRoaXMuaW5jQ3ljbGUoZWwsIGtleSlcbiAgICAgIHRyaWdnZXIoKVxuICAgIH1cbiAgfSxcblxuICBvbmNlKGVsLCBrZXkpe1xuICAgIGlmKHRoaXMucHJpdmF0ZShlbCwga2V5KSA9PT0gdHJ1ZSl7IHJldHVybiBmYWxzZSB9XG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIHRydWUpXG4gICAgcmV0dXJuIHRydWVcbiAgfSxcblxuICBpbmNDeWNsZShlbCwga2V5LCB0cmlnZ2VyID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIGxldCBbY3VycmVudEN5Y2xlXSA9IHRoaXMucHJpdmF0ZShlbCwga2V5KSB8fCBbMCwgdHJpZ2dlcl1cbiAgICBjdXJyZW50Q3ljbGUrK1xuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCBbY3VycmVudEN5Y2xlLCB0cmlnZ2VyXSlcbiAgICByZXR1cm4gY3VycmVudEN5Y2xlXG4gIH0sXG5cbiAgLy8gbWFpbnRhaW5zIG9yIGFkZHMgcHJpdmF0ZWx5IHVzZWQgaG9vayBpbmZvcm1hdGlvblxuICAvLyBmcm9tRWwgYW5kIHRvRWwgY2FuIGJlIHRoZSBzYW1lIGVsZW1lbnQgaW4gdGhlIGNhc2Ugb2YgYSBuZXdseSBhZGRlZCBub2RlXG4gIC8vIGZyb21FbCBhbmQgdG9FbCBjYW4gYmUgYW55IEhUTUwgbm9kZSB0eXBlLCBzbyB3ZSBuZWVkIHRvIGNoZWNrIGlmIGl0J3MgYW4gZWxlbWVudCBub2RlXG4gIG1haW50YWluUHJpdmF0ZUhvb2tzKGZyb21FbCwgdG9FbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKXtcbiAgICAvLyBtYWludGFpbiB0aGUgaG9va3MgY3JlYXRlZCB3aXRoIGNyZWF0ZUhvb2tcbiAgICBpZihmcm9tRWwuaGFzQXR0cmlidXRlICYmIGZyb21FbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXBoeC1ob29rXCIpICYmICF0b0VsLmhhc0F0dHJpYnV0ZShcImRhdGEtcGh4LWhvb2tcIikpe1xuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1ob29rXCIsIGZyb21FbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1ob29rXCIpKVxuICAgIH1cbiAgICAvLyBhZGQgaG9va3MgdG8gZWxlbWVudHMgd2l0aCB2aWV3cG9ydCBhdHRyaWJ1dGVzXG4gICAgaWYodG9FbC5oYXNBdHRyaWJ1dGUgJiYgKHRvRWwuaGFzQXR0cmlidXRlKHBoeFZpZXdwb3J0VG9wKSB8fCB0b0VsLmhhc0F0dHJpYnV0ZShwaHhWaWV3cG9ydEJvdHRvbSkpKXtcbiAgICAgIHRvRWwuc2V0QXR0cmlidXRlKFwiZGF0YS1waHgtaG9va1wiLCBcIlBob2VuaXguSW5maW5pdGVTY3JvbGxcIilcbiAgICB9XG4gIH0sXG5cbiAgcHV0Q3VzdG9tRWxIb29rKGVsLCBob29rKXtcbiAgICBpZihlbC5pc0Nvbm5lY3RlZCl7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1ob29rXCIsIFwiXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFxuICAgICAgICBob29rIGF0dGFjaGVkIHRvIG5vbi1jb25uZWN0ZWQgRE9NIGVsZW1lbnRcbiAgICAgICAgZW5zdXJlIHlvdSBhcmUgY2FsbGluZyBjcmVhdGVIb29rIHdpdGhpbiB5b3VyIGNvbm5lY3RlZENhbGxiYWNrLiAke2VsLm91dGVySFRNTH1cbiAgICAgIGApXG4gICAgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwgXCJjdXN0b20tZWwtaG9va1wiLCBob29rKVxuICB9LFxuXG4gIGdldEN1c3RvbUVsSG9vayhlbCl7IHJldHVybiB0aGlzLnByaXZhdGUoZWwsIFwiY3VzdG9tLWVsLWhvb2tcIikgfSxcblxuICBpc1VzZWRJbnB1dChlbCl7XG4gICAgcmV0dXJuIChlbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiZcbiAgICAgICh0aGlzLnByaXZhdGUoZWwsIFBIWF9IQVNfRk9DVVNFRCkgfHwgdGhpcy5wcml2YXRlKGVsLCBQSFhfSEFTX1NVQk1JVFRFRCkpKVxuICB9LFxuXG4gIHJlc2V0Rm9ybShmb3JtKXtcbiAgICBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpXG4gICAgICB0aGlzLmRlbGV0ZVByaXZhdGUoaW5wdXQsIFBIWF9IQVNfU1VCTUlUVEVEKVxuICAgIH0pXG4gIH0sXG5cbiAgaXNQaHhDaGlsZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRClcbiAgfSxcblxuICBpc1BoeFN0aWNreShub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NUSUNLWSkgIT09IG51bGxcbiAgfSxcblxuICBpc0NoaWxkT2ZBbnkoZWwsIHBhcmVudHMpe1xuICAgIHJldHVybiAhIXBhcmVudHMuZmluZChwYXJlbnQgPT4gcGFyZW50LmNvbnRhaW5zKGVsKSlcbiAgfSxcblxuICBmaXJzdFBoeENoaWxkKGVsKXtcbiAgICByZXR1cm4gdGhpcy5pc1BoeENoaWxkKGVsKSA/IGVsIDogdGhpcy5hbGwoZWwsIGBbJHtQSFhfUEFSRU5UX0lEfV1gKVswXVxuICB9LFxuXG4gIGRpc3BhdGNoRXZlbnQodGFyZ2V0LCBuYW1lLCBvcHRzID0ge30pe1xuICAgIGxldCBkZWZhdWx0QnViYmxlID0gdHJ1ZVxuICAgIGxldCBpc1VwbG9hZFRhcmdldCA9IHRhcmdldC5ub2RlTmFtZSA9PT0gXCJJTlBVVFwiICYmIHRhcmdldC50eXBlID09PSBcImZpbGVcIlxuICAgIGlmKGlzVXBsb2FkVGFyZ2V0ICYmIG5hbWUgPT09IFwiY2xpY2tcIil7XG4gICAgICBkZWZhdWx0QnViYmxlID0gZmFsc2VcbiAgICB9XG4gICAgbGV0IGJ1YmJsZXMgPSBvcHRzLmJ1YmJsZXMgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRCdWJibGUgOiAhIW9wdHMuYnViYmxlc1xuICAgIGxldCBldmVudE9wdHMgPSB7YnViYmxlczogYnViYmxlcywgY2FuY2VsYWJsZTogdHJ1ZSwgZGV0YWlsOiBvcHRzLmRldGFpbCB8fCB7fX1cbiAgICBsZXQgZXZlbnQgPSBuYW1lID09PSBcImNsaWNrXCIgPyBuZXcgTW91c2VFdmVudChcImNsaWNrXCIsIGV2ZW50T3B0cykgOiBuZXcgQ3VzdG9tRXZlbnQobmFtZSwgZXZlbnRPcHRzKVxuICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9LFxuXG4gIGNsb25lTm9kZShub2RlLCBodG1sKXtcbiAgICBpZih0eXBlb2YgKGh0bWwpID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgIHJldHVybiBub2RlLmNsb25lTm9kZSh0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2xvbmVkID0gbm9kZS5jbG9uZU5vZGUoZmFsc2UpXG4gICAgICBjbG9uZWQuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgcmV0dXJuIGNsb25lZFxuICAgIH1cbiAgfSxcblxuICAvLyBtZXJnZSBhdHRyaWJ1dGVzIGZyb20gc291cmNlIHRvIHRhcmdldFxuICAvLyBpZiBhbiBlbGVtZW50IGlzIGlnbm9yZWQsIHdlIG9ubHkgbWVyZ2UgZGF0YSBhdHRyaWJ1dGVzXG4gIC8vIGluY2x1ZGluZyByZW1vdmluZyBkYXRhIGF0dHJpYnV0ZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBzb3VyY2VcbiAgbWVyZ2VBdHRycyh0YXJnZXQsIHNvdXJjZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXhjbHVkZSA9IG5ldyBTZXQob3B0cy5leGNsdWRlIHx8IFtdKVxuICAgIGxldCBpc0lnbm9yZWQgPSBvcHRzLmlzSWdub3JlZFxuICAgIGxldCBzb3VyY2VBdHRycyA9IHNvdXJjZS5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gc291cmNlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSBzb3VyY2VBdHRyc1tpXS5uYW1lXG4gICAgICBpZighZXhjbHVkZS5oYXMobmFtZSkpe1xuICAgICAgICBjb25zdCBzb3VyY2VWYWx1ZSA9IHNvdXJjZS5nZXRBdHRyaWJ1dGUobmFtZSlcbiAgICAgICAgaWYodGFyZ2V0LmdldEF0dHJpYnV0ZShuYW1lKSAhPT0gc291cmNlVmFsdWUgJiYgKCFpc0lnbm9yZWQgfHwgKGlzSWdub3JlZCAmJiBuYW1lLnN0YXJ0c1dpdGgoXCJkYXRhLVwiKSkpKXtcbiAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKG5hbWUsIHNvdXJjZVZhbHVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBleGNsdWRlIHRoZSB2YWx1ZSBmcm9tIGJlaW5nIG1lcmdlZCBvbiBmb2N1c2VkIGlucHV0cywgYmVjYXVzZSB0aGVcbiAgICAgICAgLy8gdXNlcidzIGlucHV0IHNob3VsZCBhbHdheXMgd2luLlxuICAgICAgICAvLyBXZSBjYW4gc3RpbGwgYXNzaWduIGl0IGFzIGxvbmcgYXMgdGhlIHZhbHVlIHByb3BlcnR5IGlzIHRoZSBzYW1lLCB0aG91Z2guXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgYSBzaXR1YXRpb24gd2hlcmUgdGhlIHVwZGF0ZWQgaG9vayBpcyBub3QgYmVpbmcgdHJpZ2dlcmVkXG4gICAgICAgIC8vIHdoZW4gYW4gaW5wdXQgaXMgYmFjayBpbiBpdHMgXCJvcmlnaW5hbCBzdGF0ZVwiLCBiZWNhdXNlIHRoZSBhdHRyaWJ1dGVcbiAgICAgICAgLy8gd2FzIG5ldmVyIGNoYW5nZWQsIHNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peF9saXZlX3ZpZXcvaXNzdWVzLzIxNjNcbiAgICAgICAgaWYobmFtZSA9PT0gXCJ2YWx1ZVwiICYmIHRhcmdldC52YWx1ZSA9PT0gc291cmNlLnZhbHVlKXtcbiAgICAgICAgICAvLyBhY3R1YWxseSBzZXQgdGhlIHZhbHVlIGF0dHJpYnV0ZSB0byBzeW5jIGl0IHdpdGggdGhlIHZhbHVlIHByb3BlcnR5XG4gICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNvdXJjZS5nZXRBdHRyaWJ1dGUobmFtZSkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGFyZ2V0QXR0cnMgPSB0YXJnZXQuYXR0cmlidXRlc1xuICAgIGZvcihsZXQgaSA9IHRhcmdldEF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgIGxldCBuYW1lID0gdGFyZ2V0QXR0cnNbaV0ubmFtZVxuICAgICAgaWYoaXNJZ25vcmVkKXtcbiAgICAgICAgaWYobmFtZS5zdGFydHNXaXRoKFwiZGF0YS1cIikgJiYgIXNvdXJjZS5oYXNBdHRyaWJ1dGUobmFtZSkgJiYgIVBIWF9QRU5ESU5HX0FUVFJTLmluY2x1ZGVzKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXJnZUZvY3VzZWRJbnB1dCh0YXJnZXQsIHNvdXJjZSl7XG4gICAgLy8gc2tpcCBzZWxlY3RzIGJlY2F1c2UgRkYgd2lsbCByZXNldCBoaWdobGlnaHRlZCBpbmRleCBmb3IgYW55IHNldEF0dHJpYnV0ZVxuICAgIGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpKXsgRE9NLm1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIHtleGNsdWRlOiBbXCJ2YWx1ZVwiXX0pIH1cblxuICAgIGlmKHNvdXJjZS5yZWFkT25seSl7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgdHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcInJlYWRvbmx5XCIpXG4gICAgfVxuICB9LFxuXG4gIGhhc1NlbGVjdGlvblJhbmdlKGVsKXtcbiAgICByZXR1cm4gZWwuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgKGVsLnR5cGUgPT09IFwidGV4dFwiIHx8IGVsLnR5cGUgPT09IFwidGV4dGFyZWFcIilcbiAgfSxcblxuICByZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCl7XG4gICAgaWYoZm9jdXNlZCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KXsgZm9jdXNlZC5mb2N1cygpIH1cbiAgICBpZighRE9NLmlzVGV4dHVhbElucHV0KGZvY3VzZWQpKXsgcmV0dXJuIH1cblxuICAgIGxldCB3YXNGb2N1c2VkID0gZm9jdXNlZC5tYXRjaGVzKFwiOmZvY3VzXCIpXG4gICAgaWYoIXdhc0ZvY3VzZWQpeyBmb2N1c2VkLmZvY3VzKCkgfVxuICAgIGlmKHRoaXMuaGFzU2VsZWN0aW9uUmFuZ2UoZm9jdXNlZCkpe1xuICAgICAgZm9jdXNlZC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgIH1cbiAgfSxcblxuICBpc0Zvcm1JbnB1dChlbCl7IHJldHVybiAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYSkkL2kudGVzdChlbC50YWdOYW1lKSAmJiBlbC50eXBlICE9PSBcImJ1dHRvblwiIH0sXG5cbiAgc3luY0F0dHJzVG9Qcm9wcyhlbCl7XG4gICAgaWYoZWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCkpID49IDApe1xuICAgICAgZWwuY2hlY2tlZCA9IGVsLmdldEF0dHJpYnV0ZShcImNoZWNrZWRcIikgIT09IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgaXNUZXh0dWFsSW5wdXQoZWwpeyByZXR1cm4gRk9DVVNBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUpID49IDAgfSxcblxuICBpc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUocGh4VHJpZ2dlckV4dGVybmFsKSAhPT0gbnVsbCAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKVxuICB9LFxuXG4gIGNsZWFuQ2hpbGROb2Rlcyhjb250YWluZXIsIHBoeFVwZGF0ZSl7XG4gICAgaWYoRE9NLmlzUGh4VXBkYXRlKGNvbnRhaW5lciwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICBsZXQgdG9SZW1vdmUgPSBbXVxuICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICBpZighY2hpbGROb2RlLmlkKXtcbiAgICAgICAgICAvLyBTa2lwIHdhcm5pbmcgaWYgaXQncyBhbiBlbXB0eSB0ZXh0IG5vZGUgKGUuZy4gYSBuZXctbGluZSlcbiAgICAgICAgICBsZXQgaXNFbXB0eVRleHROb2RlID0gY2hpbGROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBjaGlsZE5vZGUubm9kZVZhbHVlLnRyaW0oKSA9PT0gXCJcIlxuICAgICAgICAgIGlmKCFpc0VtcHR5VGV4dE5vZGUgJiYgY2hpbGROb2RlLm5vZGVUeXBlICE9PSBOb2RlLkNPTU1FTlRfTk9ERSl7XG4gICAgICAgICAgICBsb2dFcnJvcihcIm9ubHkgSFRNTCBlbGVtZW50IHRhZ3Mgd2l0aCBhbiBpZCBhcmUgYWxsb3dlZCBpbnNpZGUgY29udGFpbmVycyB3aXRoIHBoeC11cGRhdGUuXFxuXFxuXCIgK1xuICAgICAgICAgICAgICBgcmVtb3ZpbmcgaWxsZWdhbCBub2RlOiBcIiR7KGNoaWxkTm9kZS5vdXRlckhUTUwgfHwgY2hpbGROb2RlLm5vZGVWYWx1ZSkudHJpbSgpfVwiXFxuXFxuYClcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9SZW1vdmUucHVzaChjaGlsZE5vZGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0b1JlbW92ZS5mb3JFYWNoKGNoaWxkTm9kZSA9PiBjaGlsZE5vZGUucmVtb3ZlKCkpXG4gICAgfVxuICB9LFxuXG4gIHJlcGxhY2VSb290Q29udGFpbmVyKGNvbnRhaW5lciwgdGFnTmFtZSwgYXR0cnMpe1xuICAgIGxldCByZXRhaW5lZEF0dHJzID0gbmV3IFNldChbXCJpZFwiLCBQSFhfU0VTU0lPTiwgUEhYX1NUQVRJQywgUEhYX01BSU4sIFBIWF9ST09UX0lEXSlcbiAgICBpZihjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0YWdOYW1lLnRvTG93ZXJDYXNlKCkpe1xuICAgICAgQXJyYXkuZnJvbShjb250YWluZXIuYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihhdHRyID0+ICFyZXRhaW5lZEF0dHJzLmhhcyhhdHRyLm5hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHIgPT4gY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpKVxuXG4gICAgICBPYmplY3Qua2V5cyhhdHRycylcbiAgICAgICAgLmZpbHRlcihuYW1lID0+ICFyZXRhaW5lZEF0dHJzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuXG4gICAgICByZXR1cm4gY29udGFpbmVyXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSlcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyc1thdHRyXSkpXG4gICAgICByZXRhaW5lZEF0dHJzLmZvckVhY2goYXR0ciA9PiBuZXdDb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoYXR0cikpKVxuICAgICAgbmV3Q29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRhaW5lci5pbm5lckhUTUxcbiAgICAgIGNvbnRhaW5lci5yZXBsYWNlV2l0aChuZXdDb250YWluZXIpXG4gICAgICByZXR1cm4gbmV3Q29udGFpbmVyXG4gICAgfVxuICB9LFxuXG4gIGdldFN0aWNreShlbCwgbmFtZSwgZGVmYXVsdFZhbCl7XG4gICAgbGV0IG9wID0gKERPTS5wcml2YXRlKGVsLCBcInN0aWNreVwiKSB8fCBbXSkuZmluZCgoW2V4aXN0aW5nTmFtZSxdKSA9PiBuYW1lID09PSBleGlzdGluZ05hbWUpXG4gICAgaWYob3Ape1xuICAgICAgbGV0IFtfbmFtZSwgX29wLCBzdGFzaGVkUmVzdWx0XSA9IG9wXG4gICAgICByZXR1cm4gc3Rhc2hlZFJlc3VsdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZW9mKGRlZmF1bHRWYWwpID09PSBcImZ1bmN0aW9uXCIgPyBkZWZhdWx0VmFsKCkgOiBkZWZhdWx0VmFsXG4gICAgfVxuICB9LFxuXG4gIGRlbGV0ZVN0aWNreShlbCwgbmFtZSl7XG4gICAgdGhpcy51cGRhdGVQcml2YXRlKGVsLCBcInN0aWNreVwiLCBbXSwgb3BzID0+IHtcbiAgICAgIHJldHVybiBvcHMuZmlsdGVyKChbZXhpc3RpbmdOYW1lLCBfXSkgPT4gZXhpc3RpbmdOYW1lICE9PSBuYW1lKVxuICAgIH0pXG4gIH0sXG5cbiAgcHV0U3RpY2t5KGVsLCBuYW1lLCBvcCl7XG4gICAgbGV0IHN0YXNoZWRSZXN1bHQgPSBvcChlbClcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgbGV0IGV4aXN0aW5nSW5kZXggPSBvcHMuZmluZEluZGV4KChbZXhpc3RpbmdOYW1lLF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICAgIGlmKGV4aXN0aW5nSW5kZXggPj0gMCl7XG4gICAgICAgIG9wc1tleGlzdGluZ0luZGV4XSA9IFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wcy5wdXNoKFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gb3BzXG4gICAgfSlcbiAgfSxcblxuICBhcHBseVN0aWNreU9wZXJhdGlvbnMoZWwpe1xuICAgIGxldCBvcHMgPSBET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIilcbiAgICBpZighb3BzKXsgcmV0dXJuIH1cblxuICAgIG9wcy5mb3JFYWNoKChbbmFtZSwgb3AsIF9zdGFzaGVkXSkgPT4gdGhpcy5wdXRTdGlja3koZWwsIG5hbWUsIG9wKSlcbiAgfSxcblxuICBpc0xvY2tlZChlbCl7XG4gICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZSAmJiBlbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9MT0NLKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERPTVxuIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjaGFubmVsVXBsb2FkZXIsXG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkRW50cnkge1xuICBzdGF0aWMgaXNBY3RpdmUoZmlsZUVsLCBmaWxlKXtcbiAgICBsZXQgaXNOZXcgPSBmaWxlLl9waHhSZWYgPT09IHVuZGVmaW5lZFxuICAgIGxldCBhY3RpdmVSZWZzID0gZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGxldCBpc0FjdGl2ZSA9IGFjdGl2ZVJlZnMuaW5kZXhPZihMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKSkgPj0gMFxuICAgIHJldHVybiBmaWxlLnNpemUgPiAwICYmIChpc05ldyB8fCBpc0FjdGl2ZSlcbiAgfVxuXG4gIHN0YXRpYyBpc1ByZWZsaWdodGVkKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IHByZWZsaWdodGVkUmVmcyA9IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGxldCBpc1ByZWZsaWdodGVkID0gcHJlZmxpZ2h0ZWRSZWZzLmluZGV4T2YoTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSkpID49IDBcbiAgICByZXR1cm4gaXNQcmVmbGlnaHRlZCAmJiB0aGlzLmlzQWN0aXZlKGZpbGVFbCwgZmlsZSlcbiAgfVxuXG4gIHN0YXRpYyBpc1ByZWZsaWdodEluUHJvZ3Jlc3MoZmlsZSl7XG4gICAgcmV0dXJuIGZpbGUuX3ByZWZsaWdodEluUHJvZ3Jlc3MgPT09IHRydWVcbiAgfVxuXG4gIHN0YXRpYyBtYXJrUHJlZmxpZ2h0SW5Qcm9ncmVzcyhmaWxlKXtcbiAgICBmaWxlLl9wcmVmbGlnaHRJblByb2dyZXNzID0gdHJ1ZVxuICB9XG5cbiAgY29uc3RydWN0b3IoZmlsZUVsLCBmaWxlLCB2aWV3LCBhdXRvVXBsb2FkKXtcbiAgICB0aGlzLnJlZiA9IExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpXG4gICAgdGhpcy5maWxlRWwgPSBmaWxlRWxcbiAgICB0aGlzLmZpbGUgPSBmaWxlXG4gICAgdGhpcy52aWV3ID0gdmlld1xuICAgIHRoaXMubWV0YSA9IG51bGxcbiAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IGZhbHNlXG4gICAgdGhpcy5faXNEb25lID0gZmFsc2VcbiAgICB0aGlzLl9wcm9ncmVzcyA9IDBcbiAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gLTFcbiAgICB0aGlzLl9vbkRvbmUgPSBmdW5jdGlvbigpeyB9XG4gICAgdGhpcy5fb25FbFVwZGF0ZWQgPSB0aGlzLm9uRWxVcGRhdGVkLmJpbmQodGhpcylcbiAgICB0aGlzLmZpbGVFbC5hZGRFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgdGhpcy5hdXRvVXBsb2FkID0gYXV0b1VwbG9hZFxuICB9XG5cbiAgbWV0YWRhdGEoKXsgcmV0dXJuIHRoaXMubWV0YSB9XG5cbiAgcHJvZ3Jlc3MocHJvZ3Jlc3Mpe1xuICAgIHRoaXMuX3Byb2dyZXNzID0gTWF0aC5mbG9vcihwcm9ncmVzcylcbiAgICBpZih0aGlzLl9wcm9ncmVzcyA+IHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQpe1xuICAgICAgaWYodGhpcy5fcHJvZ3Jlc3MgPj0gMTAwKXtcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3MgPSAxMDBcbiAgICAgICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IDEwMFxuICAgICAgICB0aGlzLl9pc0RvbmUgPSB0cnVlXG4gICAgICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwgMTAwLCAoKSA9PiB7XG4gICAgICAgICAgTGl2ZVVwbG9hZGVyLnVudHJhY2tGaWxlKHRoaXMuZmlsZUVsLCB0aGlzLmZpbGUpXG4gICAgICAgICAgdGhpcy5fb25Eb25lKClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSB0aGlzLl9wcm9ncmVzc1xuICAgICAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIHRoaXMuX3Byb2dyZXNzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzQ2FuY2VsbGVkKCl7IHJldHVybiB0aGlzLl9pc0NhbmNlbGxlZCB9XG5cbiAgY2FuY2VsKCl7XG4gICAgdGhpcy5maWxlLl9wcmVmbGlnaHRJblByb2dyZXNzID0gZmFsc2VcbiAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWVcbiAgICB0aGlzLl9pc0RvbmUgPSB0cnVlXG4gICAgdGhpcy5fb25Eb25lKClcbiAgfVxuXG4gIGlzRG9uZSgpeyByZXR1cm4gdGhpcy5faXNEb25lIH1cblxuICBlcnJvcihyZWFzb24gPSBcImZhaWxlZFwiKXtcbiAgICB0aGlzLmZpbGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCB7ZXJyb3I6IHJlYXNvbn0pXG4gICAgaWYoIXRoaXMuaXNBdXRvVXBsb2FkKCkpeyBMaXZlVXBsb2FkZXIuY2xlYXJGaWxlcyh0aGlzLmZpbGVFbCkgfVxuICB9XG5cbiAgaXNBdXRvVXBsb2FkKCl7IHJldHVybiB0aGlzLmF1dG9VcGxvYWQgfVxuXG4gIC8vcHJpdmF0ZVxuXG4gIG9uRG9uZShjYWxsYmFjayl7XG4gICAgdGhpcy5fb25Eb25lID0gKCkgPT4ge1xuICAgICAgdGhpcy5maWxlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIG9uRWxVcGRhdGVkKCl7XG4gICAgbGV0IGFjdGl2ZVJlZnMgPSB0aGlzLmZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBpZihhY3RpdmVSZWZzLmluZGV4T2YodGhpcy5yZWYpID09PSAtMSl7XG4gICAgICBMaXZlVXBsb2FkZXIudW50cmFja0ZpbGUodGhpcy5maWxlRWwsIHRoaXMuZmlsZSlcbiAgICAgIHRoaXMuY2FuY2VsKClcbiAgICB9XG4gIH1cblxuICB0b1ByZWZsaWdodFBheWxvYWQoKXtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdF9tb2RpZmllZDogdGhpcy5maWxlLmxhc3RNb2RpZmllZCxcbiAgICAgIG5hbWU6IHRoaXMuZmlsZS5uYW1lLFxuICAgICAgcmVsYXRpdmVfcGF0aDogdGhpcy5maWxlLndlYmtpdFJlbGF0aXZlUGF0aCxcbiAgICAgIHNpemU6IHRoaXMuZmlsZS5zaXplLFxuICAgICAgdHlwZTogdGhpcy5maWxlLnR5cGUsXG4gICAgICByZWY6IHRoaXMucmVmLFxuICAgICAgbWV0YTogdHlwZW9mKHRoaXMuZmlsZS5tZXRhKSA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5maWxlLm1ldGEoKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHVwbG9hZGVyKHVwbG9hZGVycyl7XG4gICAgaWYodGhpcy5tZXRhLnVwbG9hZGVyKXtcbiAgICAgIGxldCBjYWxsYmFjayA9IHVwbG9hZGVyc1t0aGlzLm1ldGEudXBsb2FkZXJdIHx8IGxvZ0Vycm9yKGBubyB1cGxvYWRlciBjb25maWd1cmVkIGZvciAke3RoaXMubWV0YS51cGxvYWRlcn1gKVxuICAgICAgcmV0dXJuIHtuYW1lOiB0aGlzLm1ldGEudXBsb2FkZXIsIGNhbGxiYWNrOiBjYWxsYmFja31cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtuYW1lOiBcImNoYW5uZWxcIiwgY2FsbGJhY2s6IGNoYW5uZWxVcGxvYWRlcn1cbiAgICB9XG4gIH1cblxuICB6aXBQb3N0RmxpZ2h0KHJlc3Ape1xuICAgIHRoaXMubWV0YSA9IHJlc3AuZW50cmllc1t0aGlzLnJlZl1cbiAgICBpZighdGhpcy5tZXRhKXsgbG9nRXJyb3IoYG5vIHByZWZsaWdodCB1cGxvYWQgcmVzcG9uc2UgcmV0dXJuZWQgd2l0aCByZWYgJHt0aGlzLnJlZn1gLCB7aW5wdXQ6IHRoaXMuZmlsZUVsLCByZXNwb25zZTogcmVzcH0pIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9ET05FX1JFRlMsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTLFxuICBQSFhfVVBMT0FEX1JFRlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBVcGxvYWRFbnRyeSBmcm9tIFwiLi91cGxvYWRfZW50cnlcIlxuXG5sZXQgbGl2ZVVwbG9hZGVyRmlsZVJlZiA9IDBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGl2ZVVwbG9hZGVyIHtcbiAgc3RhdGljIGdlbkZpbGVSZWYoZmlsZSl7XG4gICAgbGV0IHJlZiA9IGZpbGUuX3BoeFJlZlxuICAgIGlmKHJlZiAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiByZWZcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5fcGh4UmVmID0gKGxpdmVVcGxvYWRlckZpbGVSZWYrKykudG9TdHJpbmcoKVxuICAgICAgcmV0dXJuIGZpbGUuX3BoeFJlZlxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRFbnRyeURhdGFVUkwoaW5wdXRFbCwgcmVmLCBjYWxsYmFjayl7XG4gICAgbGV0IGZpbGUgPSB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmZpbmQoZmlsZSA9PiB0aGlzLmdlbkZpbGVSZWYoZmlsZSkgPT09IHJlZilcbiAgICBjYWxsYmFjayhVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpKVxuICB9XG5cbiAgc3RhdGljIGhhc1VwbG9hZHNJblByb2dyZXNzKGZvcm1FbCl7XG4gICAgbGV0IGFjdGl2ZSA9IDBcbiAgICBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaWYoaW5wdXQuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKSAhPT0gaW5wdXQuZ2V0QXR0cmlidXRlKFBIWF9ET05FX1JFRlMpKXtcbiAgICAgICAgYWN0aXZlKytcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBhY3RpdmUgPiAwXG4gIH1cblxuICBzdGF0aWMgc2VyaWFsaXplVXBsb2FkcyhpbnB1dEVsKXtcbiAgICBsZXQgZmlsZXMgPSB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpXG4gICAgbGV0IGZpbGVEYXRhID0ge31cbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge3BhdGg6IGlucHV0RWwubmFtZX1cbiAgICAgIGxldCB1cGxvYWRSZWYgPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRilcbiAgICAgIGZpbGVEYXRhW3VwbG9hZFJlZl0gPSBmaWxlRGF0YVt1cGxvYWRSZWZdIHx8IFtdXG4gICAgICBlbnRyeS5yZWYgPSB0aGlzLmdlbkZpbGVSZWYoZmlsZSlcbiAgICAgIGVudHJ5Lmxhc3RfbW9kaWZpZWQgPSBmaWxlLmxhc3RNb2RpZmllZFxuICAgICAgZW50cnkubmFtZSA9IGZpbGUubmFtZSB8fCBlbnRyeS5yZWZcbiAgICAgIGVudHJ5LnJlbGF0aXZlX3BhdGggPSBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aFxuICAgICAgZW50cnkudHlwZSA9IGZpbGUudHlwZVxuICAgICAgZW50cnkuc2l6ZSA9IGZpbGUuc2l6ZVxuICAgICAgaWYodHlwZW9mKGZpbGUubWV0YSkgPT09IFwiZnVuY3Rpb25cIil7IGVudHJ5Lm1ldGEgPSBmaWxlLm1ldGEoKSB9XG4gICAgICBmaWxlRGF0YVt1cGxvYWRSZWZdLnB1c2goZW50cnkpXG4gICAgfSlcbiAgICByZXR1cm4gZmlsZURhdGFcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckZpbGVzKGlucHV0RWwpe1xuICAgIGlucHV0RWwudmFsdWUgPSBudWxsXG4gICAgaW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpXG4gICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBbXSlcbiAgfVxuXG4gIHN0YXRpYyB1bnRyYWNrRmlsZShpbnB1dEVsLCBmaWxlKXtcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIERPTS5wcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIikuZmlsdGVyKGYgPT4gIU9iamVjdC5pcyhmLCBmaWxlKSkpXG4gIH1cblxuICBzdGF0aWMgdHJhY2tGaWxlcyhpbnB1dEVsLCBmaWxlcywgZGF0YVRyYW5zZmVyKXtcbiAgICBpZihpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpICE9PSBudWxsKXtcbiAgICAgIGxldCBuZXdGaWxlcyA9IGZpbGVzLmZpbHRlcihmaWxlID0+ICF0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmZpbmQoZiA9PiBPYmplY3QuaXMoZiwgZmlsZSkpKVxuICAgICAgRE9NLnVwZGF0ZVByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBbXSwgKGV4aXN0aW5nKSA9PiBleGlzdGluZy5jb25jYXQobmV3RmlsZXMpKVxuICAgICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVzZXQgaW5wdXRFbCBmaWxlcyB0byBhbGlnbiBvdXRwdXQgd2l0aCBwcm9ncmFtbWF0aWMgY2hhbmdlcyAoaS5lLiBkcmFnIGFuZCBkcm9wKVxuICAgICAgaWYoZGF0YVRyYW5zZmVyICYmIGRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGggPiAwKXsgaW5wdXRFbC5maWxlcyA9IGRhdGFUcmFuc2Zlci5maWxlcyB9XG4gICAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlSW5wdXRzKGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGVsID0+IGVsLmZpbGVzICYmIHRoaXMuYWN0aXZlRmlsZXMoZWwpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgYWN0aXZlRmlsZXMoaW5wdXQpe1xuICAgIHJldHVybiAoRE9NLnByaXZhdGUoaW5wdXQsIFwiZmlsZXNcIikgfHwgW10pLmZpbHRlcihmID0+IFVwbG9hZEVudHJ5LmlzQWN0aXZlKGlucHV0LCBmKSlcbiAgfVxuXG4gIHN0YXRpYyBpbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpe1xuICAgIGxldCBmaWxlSW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKVxuICAgIHJldHVybiBBcnJheS5mcm9tKGZpbGVJbnB1dHMpLmZpbHRlcihpbnB1dCA9PiB0aGlzLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXQpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCl7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsZXMoaW5wdXQpLmZpbHRlcihmID0+ICFVcGxvYWRFbnRyeS5pc1ByZWZsaWdodGVkKGlucHV0LCBmKSAmJiAhVXBsb2FkRW50cnkuaXNQcmVmbGlnaHRJblByb2dyZXNzKGYpKVxuICB9XG5cbiAgc3RhdGljIG1hcmtQcmVmbGlnaHRJblByb2dyZXNzKGVudHJpZXMpe1xuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiBVcGxvYWRFbnRyeS5tYXJrUHJlZmxpZ2h0SW5Qcm9ncmVzcyhlbnRyeS5maWxlKSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlucHV0RWwsIHZpZXcsIG9uQ29tcGxldGUpe1xuICAgIHRoaXMuYXV0b1VwbG9hZCA9IERPTS5pc0F1dG9VcGxvYWQoaW5wdXRFbClcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5vbkNvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgQXJyYXkuZnJvbShMaXZlVXBsb2FkZXIuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dEVsKSB8fCBbXSlcbiAgICAgICAgLm1hcChmaWxlID0+IG5ldyBVcGxvYWRFbnRyeShpbnB1dEVsLCBmaWxlLCB2aWV3LCB0aGlzLmF1dG9VcGxvYWQpKVxuXG4gICAgLy8gcHJldmVudCBzZW5kaW5nIGR1cGxpY2F0ZSBwcmVmbGlnaHQgcmVxdWVzdHNcbiAgICBMaXZlVXBsb2FkZXIubWFya1ByZWZsaWdodEluUHJvZ3Jlc3ModGhpcy5fZW50cmllcylcblxuICAgIHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aFxuICB9XG5cbiAgaXNBdXRvVXBsb2FkKCl7IHJldHVybiB0aGlzLmF1dG9VcGxvYWQgfVxuXG4gIGVudHJpZXMoKXsgcmV0dXJuIHRoaXMuX2VudHJpZXMgfVxuXG4gIGluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgdGhpcy5fZW50cmllcy5tYXAoZW50cnkgPT4ge1xuICAgICAgICBpZihlbnRyeS5pc0NhbmNlbGxlZCgpKXtcbiAgICAgICAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzLS1cbiAgICAgICAgICBpZih0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID09PSAwKXsgdGhpcy5vbkNvbXBsZXRlKCkgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudHJ5LnppcFBvc3RGbGlnaHQocmVzcClcbiAgICAgICAgICBlbnRyeS5vbkRvbmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcy0tXG4gICAgICAgICAgICBpZih0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID09PSAwKXsgdGhpcy5vbkNvbXBsZXRlKCkgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVudHJ5XG4gICAgICB9KVxuXG4gICAgbGV0IGdyb3VwZWRFbnRyaWVzID0gdGhpcy5fZW50cmllcy5yZWR1Y2UoKGFjYywgZW50cnkpID0+IHtcbiAgICAgIGlmKCFlbnRyeS5tZXRhKXsgcmV0dXJuIGFjYyB9XG4gICAgICBsZXQge25hbWUsIGNhbGxiYWNrfSA9IGVudHJ5LnVwbG9hZGVyKGxpdmVTb2NrZXQudXBsb2FkZXJzKVxuICAgICAgYWNjW25hbWVdID0gYWNjW25hbWVdIHx8IHtjYWxsYmFjazogY2FsbGJhY2ssIGVudHJpZXM6IFtdfVxuICAgICAgYWNjW25hbWVdLmVudHJpZXMucHVzaChlbnRyeSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCB7fSlcblxuICAgIGZvcihsZXQgbmFtZSBpbiBncm91cGVkRW50cmllcyl7XG4gICAgICBsZXQge2NhbGxiYWNrLCBlbnRyaWVzfSA9IGdyb3VwZWRFbnRyaWVzW25hbWVdXG4gICAgICBjYWxsYmFjayhlbnRyaWVzLCBvbkVycm9yLCByZXNwLCBsaXZlU29ja2V0KVxuICAgIH1cbiAgfVxufVxuIiwgImxldCBBUklBID0ge1xuICBhbnlPZihpbnN0YW5jZSwgY2xhc3Nlcyl7IHJldHVybiBjbGFzc2VzLmZpbmQobmFtZSA9PiBpbnN0YW5jZSBpbnN0YW5jZW9mIG5hbWUpIH0sXG5cbiAgaXNGb2N1c2FibGUoZWwsIGludGVyYWN0aXZlT25seSl7XG4gICAgcmV0dXJuIChcbiAgICAgIChlbCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50ICYmIGVsLnJlbCAhPT0gXCJpZ25vcmVcIikgfHxcbiAgICAgIChlbCBpbnN0YW5jZW9mIEhUTUxBcmVhRWxlbWVudCAmJiBlbC5ocmVmICE9PSB1bmRlZmluZWQpIHx8XG4gICAgICAoIWVsLmRpc2FibGVkICYmICh0aGlzLmFueU9mKGVsLCBbSFRNTElucHV0RWxlbWVudCwgSFRNTFNlbGVjdEVsZW1lbnQsIEhUTUxUZXh0QXJlYUVsZW1lbnQsIEhUTUxCdXR0b25FbGVtZW50XSkpKSB8fFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHx8XG4gICAgICAoZWwudGFiSW5kZXggPiAwIHx8ICghaW50ZXJhY3RpdmVPbmx5ICYmIGVsLmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpICE9PSBudWxsICYmIGVsLmdldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpICE9PSBcInRydWVcIikpXG4gICAgKVxuICB9LFxuXG4gIGF0dGVtcHRGb2N1cyhlbCwgaW50ZXJhY3RpdmVPbmx5KXtcbiAgICBpZih0aGlzLmlzRm9jdXNhYmxlKGVsLCBpbnRlcmFjdGl2ZU9ubHkpKXsgdHJ5IHsgZWwuZm9jdXMoKSB9IGNhdGNoIHt9IH1cbiAgICByZXR1cm4gISFkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShlbClcbiAgfSxcblxuICBmb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpe1xuICAgIGxldCBjaGlsZCA9IGVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgd2hpbGUoY2hpbGQpe1xuICAgICAgaWYodGhpcy5hdHRlbXB0Rm9jdXMoY2hpbGQsIHRydWUpIHx8IHRoaXMuZm9jdXNGaXJzdEludGVyYWN0aXZlKGNoaWxkLCB0cnVlKSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRFbGVtZW50U2libGluZ1xuICAgIH1cbiAgfSxcblxuICBmb2N1c0ZpcnN0KGVsKXtcbiAgICBsZXQgY2hpbGQgPSBlbC5maXJzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzRmlyc3QoY2hpbGQpKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNoaWxkID0gY2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9LFxuXG4gIGZvY3VzTGFzdChlbCl7XG4gICAgbGV0IGNoaWxkID0gZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzTGFzdChjaGlsZCkpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBBUklBXG4iLCAiaW1wb3J0IHtcbiAgUEhYX0FDVElWRV9FTlRSWV9SRUZTLFxuICBQSFhfTElWRV9GSUxFX1VQREFURUQsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTLFxuICBQSFhfVVBMT0FEX1JFRlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IEFSSUEgZnJvbSBcIi4vYXJpYVwiXG5cbmxldCBIb29rcyA9IHtcbiAgTGl2ZUZpbGVVcGxvYWQ6IHtcbiAgICBhY3RpdmVSZWZzKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpIH0sXG5cbiAgICBwcmVmbGlnaHRlZFJlZnMoKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKSB9LFxuXG4gICAgbW91bnRlZCgpeyB0aGlzLnByZWZsaWdodGVkV2FzID0gdGhpcy5wcmVmbGlnaHRlZFJlZnMoKSB9LFxuXG4gICAgdXBkYXRlZCgpe1xuICAgICAgbGV0IG5ld1ByZWZsaWdodHMgPSB0aGlzLnByZWZsaWdodGVkUmVmcygpXG4gICAgICBpZih0aGlzLnByZWZsaWdodGVkV2FzICE9PSBuZXdQcmVmbGlnaHRzKXtcbiAgICAgICAgdGhpcy5wcmVmbGlnaHRlZFdhcyA9IG5ld1ByZWZsaWdodHNcbiAgICAgICAgaWYobmV3UHJlZmxpZ2h0cyA9PT0gXCJcIil7XG4gICAgICAgICAgdGhpcy5fX3ZpZXcoKS5jYW5jZWxTdWJtaXQodGhpcy5lbC5mb3JtKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuYWN0aXZlUmVmcygpID09PSBcIlwiKXsgdGhpcy5lbC52YWx1ZSA9IG51bGwgfVxuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChQSFhfTElWRV9GSUxFX1VQREFURUQpKVxuICAgIH1cbiAgfSxcblxuICBMaXZlSW1nUHJldmlldzoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMucmVmID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1lbnRyeS1yZWZcIilcbiAgICAgIHRoaXMuaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSlcbiAgICAgIExpdmVVcGxvYWRlci5nZXRFbnRyeURhdGFVUkwodGhpcy5pbnB1dEVsLCB0aGlzLnJlZiwgdXJsID0+IHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcbiAgICAgICAgdGhpcy5lbC5zcmMgPSB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95ZWQoKXtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpXG4gICAgfVxuICB9LFxuICBGb2N1c1dyYXA6IHtcbiAgICBtb3VudGVkKCl7XG4gICAgICB0aGlzLmZvY3VzU3RhcnQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICB0aGlzLmZvY3VzRW5kID0gdGhpcy5lbC5sYXN0RWxlbWVudENoaWxkXG4gICAgICB0aGlzLmZvY3VzU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIChlKSA9PiB7XG4gICAgICAgIGlmKCFlLnJlbGF0ZWRUYXJnZXQgfHwgIXRoaXMuZWwuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSl7IFxuICAgICAgICAgIC8vIEhhbmRsZSBmb2N1cyBlbnRlcmluZyBmcm9tIG91dHNpZGUgKGUuZy4gVGFiIHdoZW4gYm9keSBpcyBmb2N1c2VkKVxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zNjM2XG4gICAgICAgICAgY29uc3QgbmV4dEZvY3VzID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgICAgICAgQVJJQS5hdHRlbXB0Rm9jdXMobmV4dEZvY3VzKSB8fCBBUklBLmZvY3VzRmlyc3QobmV4dEZvY3VzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFSSUEuZm9jdXNMYXN0KHRoaXMuZWwpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmZvY3VzRW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoZSkgPT4ge1xuICAgICAgICBpZighZS5yZWxhdGVkVGFyZ2V0IHx8ICF0aGlzLmVsLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpeyBcbiAgICAgICAgICAvLyBIYW5kbGUgZm9jdXMgZW50ZXJpbmcgZnJvbSBvdXRzaWRlIChlLmcuIFNoaWZ0K1RhYiB3aGVuIGJvZHkgaXMgZm9jdXNlZClcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4X2xpdmVfdmlldy9pc3N1ZXMvMzYzNlxuICAgICAgICAgIGNvbnN0IG5leHRGb2N1cyA9IGUudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICBBUklBLmF0dGVtcHRGb2N1cyhuZXh0Rm9jdXMpIHx8IEFSSUEuZm9jdXNMYXN0KG5leHRGb2N1cylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBUklBLmZvY3VzRmlyc3QodGhpcy5lbClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC8vIG9ubHkgdHJ5IHRvIGNoYW5nZSB0aGUgZm9jdXMgaWYgaXQgaXMgbm90IGFscmVhZHkgaW5zaWRlXG4gICAgICBpZighdGhpcy5lbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSl7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpzaG93LWVuZFwiLCAoKSA9PiB0aGlzLmVsLmZvY3VzKCkpXG4gICAgICAgIGlmKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpLmRpc3BsYXkgIT09IFwibm9uZVwiKXtcbiAgICAgICAgICBBUklBLmZvY3VzRmlyc3QodGhpcy5lbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5sZXQgZmluZFNjcm9sbENvbnRhaW5lciA9IChlbCkgPT4ge1xuICAvLyB0aGUgc2Nyb2xsIGV2ZW50IHdvbid0IGJlIGZpcmVkIG9uIHRoZSBodG1sL2JvZHkgZWxlbWVudCBldmVuIGlmIG92ZXJmbG93IGlzIHNldFxuICAvLyB0aGVyZWZvcmUgd2UgcmV0dXJuIG51bGwgdG8gaW5zdGVhZCBsaXN0ZW4gZm9yIHNjcm9sbCBldmVudHMgb24gZG9jdW1lbnRcbiAgaWYoW1wiSFRNTFwiLCBcIkJPRFlcIl0uaW5kZXhPZihlbC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSA+PSAwKSByZXR1cm4gbnVsbFxuICBpZihbXCJzY3JvbGxcIiwgXCJhdXRvXCJdLmluZGV4T2YoZ2V0Q29tcHV0ZWRTdHlsZShlbCkub3ZlcmZsb3dZKSA+PSAwKSByZXR1cm4gZWxcbiAgcmV0dXJuIGZpbmRTY3JvbGxDb250YWluZXIoZWwucGFyZW50RWxlbWVudClcbn1cblxubGV0IHNjcm9sbFRvcCA9IChzY3JvbGxDb250YWluZXIpID0+IHtcbiAgaWYoc2Nyb2xsQ29udGFpbmVyKXtcbiAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gIH1cbn1cblxubGV0IGJvdHRvbSA9IChzY3JvbGxDb250YWluZXIpID0+IHtcbiAgaWYoc2Nyb2xsQ29udGFpbmVyKXtcbiAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbVxuICB9IGVsc2Uge1xuICAgIC8vIHdoZW4gd2UgaGF2ZSBubyBjb250YWluZXIsIHRoZSB3aG9sZSBwYWdlIHNjcm9sbHMsXG4gICAgLy8gdGhlcmVmb3JlIHRoZSBib3R0b20gY29vcmRpbmF0ZSBpcyB0aGUgdmlld3BvcnQgaGVpZ2h0XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gIH1cbn1cblxubGV0IHRvcCA9IChzY3JvbGxDb250YWluZXIpID0+IHtcbiAgaWYoc2Nyb2xsQ29udGFpbmVyKXtcbiAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICB9IGVsc2Uge1xuICAgIC8vIHdoZW4gd2UgaGF2ZSBubyBjb250YWluZXIgdGhlIHdob2xlIHBhZ2Ugc2Nyb2xscyxcbiAgICAvLyB0aGVyZWZvcmUgdGhlIHRvcCBjb29yZGluYXRlIGlzIDBcbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmxldCBpc0F0Vmlld3BvcnRUb3AgPSAoZWwsIHNjcm9sbENvbnRhaW5lcikgPT4ge1xuICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHJldHVybiBNYXRoLmNlaWwocmVjdC50b3ApID49IHRvcChzY3JvbGxDb250YWluZXIpICYmIE1hdGguY2VpbChyZWN0LmxlZnQpID49IDAgJiYgTWF0aC5mbG9vcihyZWN0LnRvcCkgPD0gYm90dG9tKHNjcm9sbENvbnRhaW5lcilcbn1cblxubGV0IGlzQXRWaWV3cG9ydEJvdHRvbSA9IChlbCwgc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIE1hdGguY2VpbChyZWN0LmJvdHRvbSkgPj0gdG9wKHNjcm9sbENvbnRhaW5lcikgJiYgTWF0aC5jZWlsKHJlY3QubGVmdCkgPj0gMCAmJiBNYXRoLmZsb29yKHJlY3QuYm90dG9tKSA8PSBib3R0b20oc2Nyb2xsQ29udGFpbmVyKVxufVxuXG5sZXQgaXNXaXRoaW5WaWV3cG9ydCA9IChlbCwgc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIE1hdGguY2VpbChyZWN0LnRvcCkgPj0gdG9wKHNjcm9sbENvbnRhaW5lcikgJiYgTWF0aC5jZWlsKHJlY3QubGVmdCkgPj0gMCAmJiBNYXRoLmZsb29yKHJlY3QudG9wKSA8PSBib3R0b20oc2Nyb2xsQ29udGFpbmVyKVxufVxuXG5Ib29rcy5JbmZpbml0ZVNjcm9sbCA9IHtcbiAgbW91bnRlZCgpe1xuICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gZmluZFNjcm9sbENvbnRhaW5lcih0aGlzLmVsKVxuICAgIGxldCBzY3JvbGxCZWZvcmUgPSBzY3JvbGxUb3AodGhpcy5zY3JvbGxDb250YWluZXIpXG4gICAgbGV0IHRvcE92ZXJyYW4gPSBmYWxzZVxuICAgIGxldCB0aHJvdHRsZUludGVydmFsID0gNTAwXG4gICAgbGV0IHBlbmRpbmdPcCA9IG51bGxcblxuICAgIGxldCBvblRvcE92ZXJydW4gPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsICh0b3BFdmVudCwgZmlyc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gdHJ1ZVxuICAgICAgdGhpcy5saXZlU29ja2V0LmV4ZWNKU0hvb2tQdXNoKHRoaXMuZWwsIHRvcEV2ZW50LCB7aWQ6IGZpcnN0Q2hpbGQuaWQsIF9vdmVycmFuOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBwZW5kaW5nT3AgPSBudWxsXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBsZXQgb25GaXJzdENoaWxkQXRUb3AgPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsICh0b3BFdmVudCwgZmlyc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTSG9va1B1c2godGhpcy5lbCwgdG9wRXZlbnQsIHtpZDogZmlyc3RDaGlsZC5pZH0sICgpID0+IHtcbiAgICAgICAgcGVuZGluZ09wID0gbnVsbFxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgRE9NIGlzIHBhdGNoZWQgYnkgd2FpdGluZyBmb3IgdGhlIG5leHQgdGlja1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBpZighaXNXaXRoaW5WaWV3cG9ydChmaXJzdENoaWxkLCB0aGlzLnNjcm9sbENvbnRhaW5lcikpe1xuICAgICAgICAgICAgZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgbGV0IG9uTGFzdENoaWxkQXRCb3R0b20gPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsIChib3R0b21FdmVudCwgbGFzdENoaWxkKSA9PiB7XG4gICAgICBwZW5kaW5nT3AgPSAoKSA9PiBsYXN0Q2hpbGQuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImVuZFwifSlcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5leGVjSlNIb29rUHVzaCh0aGlzLmVsLCBib3R0b21FdmVudCwge2lkOiBsYXN0Q2hpbGQuaWR9LCAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdPcCA9IG51bGxcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIERPTSBpcyBwYXRjaGVkIGJ5IHdhaXRpbmcgZm9yIHRoZSBuZXh0IHRpY2tcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgaWYoIWlzV2l0aGluVmlld3BvcnQobGFzdENoaWxkLCB0aGlzLnNjcm9sbENvbnRhaW5lcikpe1xuICAgICAgICAgICAgbGFzdENoaWxkLnNjcm9sbEludG9WaWV3KHtibG9jazogXCJlbmRcIn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5vblNjcm9sbCA9IChfZSkgPT4ge1xuICAgICAgbGV0IHNjcm9sbE5vdyA9IHNjcm9sbFRvcCh0aGlzLnNjcm9sbENvbnRhaW5lcilcblxuICAgICAgaWYocGVuZGluZ09wKXtcbiAgICAgICAgc2Nyb2xsQmVmb3JlID0gc2Nyb2xsTm93XG4gICAgICAgIHJldHVybiBwZW5kaW5nT3AoKVxuICAgICAgfVxuICAgICAgbGV0IHJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBsZXQgdG9wRXZlbnQgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSh0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhcInZpZXdwb3J0LXRvcFwiKSlcbiAgICAgIGxldCBib3R0b21FdmVudCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFwidmlld3BvcnQtYm90dG9tXCIpKVxuICAgICAgbGV0IGxhc3RDaGlsZCA9IHRoaXMuZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgbGV0IGZpcnN0Q2hpbGQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICBsZXQgaXNTY3JvbGxpbmdVcCA9IHNjcm9sbE5vdyA8IHNjcm9sbEJlZm9yZVxuICAgICAgbGV0IGlzU2Nyb2xsaW5nRG93biA9IHNjcm9sbE5vdyA+IHNjcm9sbEJlZm9yZVxuXG4gICAgICAvLyBlbCBvdmVycmFuIHdoaWxlIHNjcm9sbGluZyB1cFxuICAgICAgaWYoaXNTY3JvbGxpbmdVcCAmJiB0b3BFdmVudCAmJiAhdG9wT3ZlcnJhbiAmJiByZWN0LnRvcCA+PSAwKXtcbiAgICAgICAgdG9wT3ZlcnJhbiA9IHRydWVcbiAgICAgICAgb25Ub3BPdmVycnVuKHRvcEV2ZW50LCBmaXJzdENoaWxkKVxuICAgICAgfSBlbHNlIGlmKGlzU2Nyb2xsaW5nRG93biAmJiB0b3BPdmVycmFuICYmIHJlY3QudG9wIDw9IDApe1xuICAgICAgICB0b3BPdmVycmFuID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYodG9wRXZlbnQgJiYgaXNTY3JvbGxpbmdVcCAmJiBpc0F0Vmlld3BvcnRUb3AoZmlyc3RDaGlsZCwgdGhpcy5zY3JvbGxDb250YWluZXIpKXtcbiAgICAgICAgb25GaXJzdENoaWxkQXRUb3AodG9wRXZlbnQsIGZpcnN0Q2hpbGQpXG4gICAgICB9IGVsc2UgaWYoYm90dG9tRXZlbnQgJiYgaXNTY3JvbGxpbmdEb3duICYmIGlzQXRWaWV3cG9ydEJvdHRvbShsYXN0Q2hpbGQsIHRoaXMuc2Nyb2xsQ29udGFpbmVyKSl7XG4gICAgICAgIG9uTGFzdENoaWxkQXRCb3R0b20oYm90dG9tRXZlbnQsIGxhc3RDaGlsZClcbiAgICAgIH1cbiAgICAgIHNjcm9sbEJlZm9yZSA9IHNjcm9sbE5vd1xuICAgIH1cblxuICAgIGlmKHRoaXMuc2Nyb2xsQ29udGFpbmVyKXtcbiAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgICB9XG4gIH0sXG4gIFxuICBkZXN0cm95ZWQoKXtcbiAgICBpZih0aGlzLnNjcm9sbENvbnRhaW5lcil7XG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpXG4gICAgfVxuICB9LFxuXG4gIHRocm90dGxlKGludGVydmFsLCBjYWxsYmFjayl7XG4gICAgbGV0IGxhc3RDYWxsQXQgPSAwXG4gICAgbGV0IHRpbWVyXG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpXG4gICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGludGVydmFsIC0gKG5vdyAtIGxhc3RDYWxsQXQpXG5cbiAgICAgIGlmKHJlbWFpbmluZ1RpbWUgPD0gMCB8fCByZW1haW5pbmdUaW1lID4gaW50ZXJ2YWwpe1xuICAgICAgICBpZih0aW1lcil7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGxhc3RDYWxsQXQgPSBub3dcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICAgIH0gZWxzZSBpZighdGltZXIpe1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxhc3RDYWxsQXQgPSBEYXRlLm5vdygpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICAgICAgfSwgcmVtYWluaW5nVGltZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEhvb2tzXG4iLCAiaW1wb3J0IHtcbiAgUEhYX1JFRl9MT0FESU5HLFxuICBQSFhfUkVGX0xPQ0ssXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfRVZFTlRfQ0xBU1NFUyxcbiAgUEhYX0RJU0FCTEVELFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRVxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRSZWYge1xuICBzdGF0aWMgb25VbmxvY2soZWwsIGNhbGxiYWNrKXtcbiAgICBpZighRE9NLmlzTG9ja2VkKGVsKSAmJiAhZWwuY2xvc2VzdChgWyR7UEhYX1JFRl9MT0NLfV1gKSl7IHJldHVybiBjYWxsYmFjaygpIH1cbiAgICBjb25zdCBjbG9zZXN0TG9jayA9IGVsLmNsb3Nlc3QoYFske1BIWF9SRUZfTE9DS31dYClcbiAgICBjb25zdCByZWYgPSBjbG9zZXN0TG9jay5jbG9zZXN0KGBbJHtQSFhfUkVGX0xPQ0t9XWApLmdldEF0dHJpYnV0ZShQSFhfUkVGX0xPQ0spXG4gICAgY2xvc2VzdExvY2suYWRkRXZlbnRMaXN0ZW5lcihgcGh4OnVuZG8tbG9jazoke3JlZn1gLCAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfSwge29uY2U6IHRydWV9KVxuICB9XG5cbiAgY29uc3RydWN0b3IoZWwpe1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMubG9hZGluZ1JlZiA9IGVsLmhhc0F0dHJpYnV0ZShQSFhfUkVGX0xPQURJTkcpID8gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKFBIWF9SRUZfTE9BRElORyksIDEwKSA6IG51bGxcbiAgICB0aGlzLmxvY2tSZWYgPSBlbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9MT0NLKSA/IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfUkVGX0xPQ0spLCAxMCkgOiBudWxsXG4gIH1cblxuICAvLyBwdWJsaWNcblxuICBtYXliZVVuZG8ocmVmLCBwaHhFdmVudCwgZWFjaENsb25lQ2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmlzV2l0aGluKHJlZikpeyByZXR1cm4gfVxuXG4gICAgLy8gdW5kbyBsb2NrcyBhbmQgYXBwbHkgY2xvbmVzXG4gICAgdGhpcy51bmRvTG9ja3MocmVmLCBwaHhFdmVudCwgZWFjaENsb25lQ2FsbGJhY2spXG5cbiAgICAvLyB1bmRvIGxvYWRpbmcgc3RhdGVzXG4gICAgdGhpcy51bmRvTG9hZGluZyhyZWYsIHBoeEV2ZW50KVxuXG4gICAgLy8gY2xlYW4gdXAgaWYgZnVsbHkgcmVzb2x2ZWRcbiAgICBpZih0aGlzLmlzRnVsbHlSZXNvbHZlZEJ5KHJlZikpeyB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQykgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGlzV2l0aGluKHJlZil7XG4gICAgcmV0dXJuICEoKHRoaXMubG9hZGluZ1JlZiAhPT0gbnVsbCAmJiB0aGlzLmxvYWRpbmdSZWYgPiByZWYpICYmICh0aGlzLmxvY2tSZWYgIT09IG51bGwgJiYgdGhpcy5sb2NrUmVmID4gcmVmKSlcbiAgfVxuXG4gIC8vIENoZWNrIGZvciBjbG9uZWQgUEhYX1JFRl9MT0NLIGVsZW1lbnQgdGhhdCBoYXMgYmVlbiBtb3JwaGVkIGJlaGluZFxuICAvLyB0aGUgc2NlbmVzIHdoaWxlIHRoaXMgZWxlbWVudCB3YXMgbG9ja2VkIGluIHRoZSBET00uXG4gIC8vIFdoZW4gd2UgYXBwbHkgdGhlIGNsb25lZCB0cmVlIHRvIHRoZSBhY3RpdmUgRE9NIGVsZW1lbnQsIHdlIG11c3RcbiAgLy9cbiAgLy8gICAxLiBleGVjdXRlIHBlbmRpbmcgbW91bnRlZCBob29rcyBmb3Igbm9kZXMgbm93IGluIHRoZSBET01cbiAgLy8gICAyLiB1bmRvIGFueSByZWYgaW5zaWRlIHRoZSBjbG9uZWQgdHJlZSB0aGF0IGhhcyBzaW5jZSBiZWVuIGFjaydkXG4gIHVuZG9Mb2NrcyhyZWYsIHBoeEV2ZW50LCBlYWNoQ2xvbmVDYWxsYmFjayl7XG4gICAgaWYoIXRoaXMuaXNMb2NrVW5kb25lQnkocmVmKSl7IHJldHVybiB9XG5cbiAgICBsZXQgY2xvbmVkVHJlZSA9IERPTS5wcml2YXRlKHRoaXMuZWwsIFBIWF9SRUZfTE9DSylcbiAgICBpZihjbG9uZWRUcmVlKXtcbiAgICAgIGVhY2hDbG9uZUNhbGxiYWNrKGNsb25lZFRyZWUpXG4gICAgICBET00uZGVsZXRlUHJpdmF0ZSh0aGlzLmVsLCBQSFhfUkVGX0xPQ0spXG4gICAgfVxuICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfTE9DSylcblxuICAgIGxldCBvcHRzID0ge2RldGFpbDoge3JlZjogcmVmLCBldmVudDogcGh4RXZlbnR9LCBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZX1cbiAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGBwaHg6dW5kby1sb2NrOiR7dGhpcy5sb2NrUmVmfWAsIG9wdHMpKVxuICB9XG5cbiAgdW5kb0xvYWRpbmcocmVmLCBwaHhFdmVudCl7XG4gICAgaWYoIXRoaXMuaXNMb2FkaW5nVW5kb25lQnkocmVmKSl7XG4gICAgICBpZih0aGlzLmNhblVuZG9Mb2FkaW5nKHJlZikgJiYgdGhpcy5lbC5jbGFzc0xpc3QuY29udGFpbnMoXCJwaHgtc3VibWl0LWxvYWRpbmdcIikpe1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJwaHgtY2hhbmdlLWxvYWRpbmdcIilcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmKHRoaXMuY2FuVW5kb0xvYWRpbmcocmVmKSl7XG4gICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX0xPQURJTkcpXG4gICAgICBsZXQgZGlzYWJsZWRWYWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICBsZXQgcmVhZE9ubHlWYWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpXG4gICAgICAvLyByZXN0b3JlIGlucHV0c1xuICAgICAgaWYocmVhZE9ubHlWYWwgIT09IG51bGwpe1xuICAgICAgICB0aGlzLmVsLnJlYWRPbmx5ID0gcmVhZE9ubHlWYWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUFET05MWSlcbiAgICAgIH1cbiAgICAgIGlmKGRpc2FibGVkVmFsICE9PSBudWxsKXtcbiAgICAgICAgdGhpcy5lbC5kaXNhYmxlZCA9IGRpc2FibGVkVmFsID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZVxuICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICB9XG4gICAgICAvLyByZXN0b3JlIGRpc2FibGVzXG4gICAgICBsZXQgZGlzYWJsZVJlc3RvcmUgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpXG4gICAgICBpZihkaXNhYmxlUmVzdG9yZSAhPT0gbnVsbCl7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVJlc3RvcmVcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKVxuICAgICAgfVxuXG4gICAgICBsZXQgb3B0cyA9IHtkZXRhaWw6IHtyZWY6IHJlZiwgZXZlbnQ6IHBoeEV2ZW50fSwgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2V9XG4gICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGBwaHg6dW5kby1sb2FkaW5nOiR7dGhpcy5sb2FkaW5nUmVmfWAsIG9wdHMpKVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBjbGFzc2VzXG4gICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGlmKG5hbWUgIT09IFwicGh4LXN1Ym1pdC1sb2FkaW5nXCIgfHwgdGhpcy5jYW5VbmRvTG9hZGluZyhyZWYpKXtcbiAgICAgICAgRE9NLnJlbW92ZUNsYXNzKHRoaXMuZWwsIG5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzTG9hZGluZ1VuZG9uZUJ5KHJlZil7IHJldHVybiB0aGlzLmxvYWRpbmdSZWYgPT09IG51bGwgPyBmYWxzZSA6IHRoaXMubG9hZGluZ1JlZiA8PSByZWYgfVxuICBpc0xvY2tVbmRvbmVCeShyZWYpeyByZXR1cm4gdGhpcy5sb2NrUmVmID09PSBudWxsID8gZmFsc2UgOiB0aGlzLmxvY2tSZWYgPD0gcmVmIH1cblxuICBpc0Z1bGx5UmVzb2x2ZWRCeShyZWYpe1xuICAgIHJldHVybiAodGhpcy5sb2FkaW5nUmVmID09PSBudWxsIHx8IHRoaXMubG9hZGluZ1JlZiA8PSByZWYpICYmICh0aGlzLmxvY2tSZWYgPT09IG51bGwgfHwgdGhpcy5sb2NrUmVmIDw9IHJlZilcbiAgfVxuXG4gIC8vIG9ubHkgcmVtb3ZlIHRoZSBwaHgtc3VibWl0LWxvYWRpbmcgY2xhc3MgaWYgd2UgYXJlIG5vdCBsb2NrZWRcbiAgY2FuVW5kb0xvYWRpbmcocmVmKXsgcmV0dXJuIHRoaXMubG9ja1JlZiA9PT0gbnVsbCB8fCB0aGlzLmxvY2tSZWYgPD0gcmVmIH1cbn1cbiIsICJpbXBvcnQge1xuICBtYXliZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUG9zdE1vcnBoUmVzdG9yZXIge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJCZWZvcmUsIGNvbnRhaW5lckFmdGVyLCB1cGRhdGVUeXBlKXtcbiAgICBsZXQgaWRzQmVmb3JlID0gbmV3IFNldCgpXG4gICAgbGV0IGlkc0FmdGVyID0gbmV3IFNldChbLi4uY29udGFpbmVyQWZ0ZXIuY2hpbGRyZW5dLm1hcChjaGlsZCA9PiBjaGlsZC5pZCkpXG5cbiAgICBsZXQgZWxlbWVudHNUb01vZGlmeSA9IFtdXG5cbiAgICBBcnJheS5mcm9tKGNvbnRhaW5lckJlZm9yZS5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZihjaGlsZC5pZCl7IC8vIGFsbCBvZiBvdXIgY2hpbGRyZW4gc2hvdWxkIGJlIGVsZW1lbnRzIHdpdGggaWRzXG4gICAgICAgIGlkc0JlZm9yZS5hZGQoY2hpbGQuaWQpXG4gICAgICAgIGlmKGlkc0FmdGVyLmhhcyhjaGlsZC5pZCkpe1xuICAgICAgICAgIGxldCBwcmV2aW91c0VsZW1lbnRJZCA9IGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5pZFxuICAgICAgICAgIGVsZW1lbnRzVG9Nb2RpZnkucHVzaCh7ZWxlbWVudElkOiBjaGlsZC5pZCwgcHJldmlvdXNFbGVtZW50SWQ6IHByZXZpb3VzRWxlbWVudElkfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmNvbnRhaW5lcklkID0gY29udGFpbmVyQWZ0ZXIuaWRcbiAgICB0aGlzLnVwZGF0ZVR5cGUgPSB1cGRhdGVUeXBlXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5ID0gZWxlbWVudHNUb01vZGlmeVxuICAgIHRoaXMuZWxlbWVudElkc1RvQWRkID0gWy4uLmlkc0FmdGVyXS5maWx0ZXIoaWQgPT4gIWlkc0JlZm9yZS5oYXMoaWQpKVxuICB9XG5cbiAgLy8gV2UgZG8gdGhlIGZvbGxvd2luZyB0byBvcHRpbWl6ZSBhcHBlbmQvcHJlcGVuZCBvcGVyYXRpb25zOlxuICAvLyAgIDEpIFRyYWNrIGlkcyBvZiBtb2RpZmllZCBlbGVtZW50cyAmIG9mIG5ldyBlbGVtZW50c1xuICAvLyAgIDIpIEFsbCB0aGUgbW9kaWZpZWQgZWxlbWVudHMgYXJlIHB1dCBiYWNrIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIGluIHRoZSBET00gdHJlZVxuICAvLyAgICAgIGJ5IHN0b3JpbmcgdGhlIGlkIG9mIHRoZWlyIHByZXZpb3VzIHNpYmxpbmdcbiAgLy8gICAzKSBOZXcgZWxlbWVudHMgYXJlIGdvaW5nIHRvIGJlIHB1dCBpbiB0aGUgcmlnaHQgcGxhY2UgYnkgbW9ycGhkb20gZHVyaW5nIGFwcGVuZC5cbiAgLy8gICAgICBGb3IgcHJlcGVuZCwgd2UgbW92ZSB0aGVtIHRvIHRoZSBmaXJzdCBwb3NpdGlvbiBpbiB0aGUgY29udGFpbmVyXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQgY29udGFpbmVyID0gRE9NLmJ5SWQodGhpcy5jb250YWluZXJJZClcbiAgICB0aGlzLmVsZW1lbnRzVG9Nb2RpZnkuZm9yRWFjaChlbGVtZW50VG9Nb2RpZnkgPT4ge1xuICAgICAgaWYoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKXtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKSwgcHJldmlvdXNFbGVtID0+IHtcbiAgICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNJblJpZ2h0UGxhY2UgPSBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkID09IHByZXZpb3VzRWxlbS5pZFxuICAgICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGVsZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09IG51bGxcbiAgICAgICAgICBpZighaXNJblJpZ2h0UGxhY2Upe1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWxlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmKHRoaXMudXBkYXRlVHlwZSA9PSBcInByZXBlbmRcIil7XG4gICAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChlbGVtSWQgPT4ge1xuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpLCBlbGVtID0+IGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsICJ2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgdG9Ob2RlQXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgLy8gZG9jdW1lbnQtZnJhZ21lbnRzIGRvbnQgaGF2ZSBhdHRyaWJ1dGVzIHNvIGxldHMgbm90IGRvIGFueXRoaW5nXG4gICAgaWYgKHRvTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSB8fCBmcm9tTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50XG4gICAgZm9yICh2YXIgaSA9IHRvTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGF0dHIgPSB0b05vZGVBdHRyc1tpXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcbiAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIucHJlZml4ID09PSAneG1sbnMnKXtcbiAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7IC8vIEl0J3Mgbm90IGFsbG93ZWQgdG8gc2V0IGFuIGF0dHJpYnV0ZSB3aXRoIHRoZSBYTUxOUyBuYW1lc3BhY2Ugd2l0aG91dCBzcGVjaWZ5aW5nIHRoZSBgeG1sbnNgIHByZWZpeFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgZXh0cmEgYXR0cmlidXRlcyBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgRE9NIGVsZW1lbnQgdGhhdFxuICAgIC8vIHdlcmVuJ3QgZm91bmQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgIHZhciBmcm9tTm9kZUF0dHJzID0gZnJvbU5vZGUuYXR0cmlidXRlcztcblxuICAgIGZvciAodmFyIGQgPSBmcm9tTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGQgPj0gMDsgZC0tKSB7XG4gICAgICAgIGF0dHIgPSBmcm9tTm9kZUF0dHJzW2RdO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuXG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHJhbmdlOyAvLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgTlNfWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5cbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZG9jdW1lbnQ7XG52YXIgSEFTX1RFTVBMQVRFX1NVUFBPUlQgPSAhIWRvYyAmJiAnY29udGVudCcgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG52YXIgSEFTX1JBTkdFX1NVUFBPUlQgPSAhIWRvYyAmJiBkb2MuY3JlYXRlUmFuZ2UgJiYgJ2NyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCcgaW4gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cikge1xuICAgIHZhciB0ZW1wbGF0ZSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cikge1xuICAgIHZhciBmcmFnbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gc3RyO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYWJvdXQgdGhlIHNhbWVcbiAqIHZhciBodG1sID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdHIsICd0ZXh0L2h0bWwnKTtcbiAqIHJldHVybiBodG1sLmJvZHkuZmlyc3RDaGlsZDtcbiAqXG4gKiBAbWV0aG9kIHRvRWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiB0b0VsZW1lbnQoc3RyKSB7XG4gICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICBpZiAoSEFTX1RFTVBMQVRFX1NVUFBPUlQpIHtcbiAgICAgIC8vIGF2b2lkIHJlc3RyaWN0aW9ucyBvbiBjb250ZW50IGZvciB0aGluZ3MgbGlrZSBgPHRyPjx0aD5IaTwvdGg+PC90cj5gIHdoaWNoXG4gICAgICAvLyBjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQgZG9lc24ndCBzdXBwb3J0XG4gICAgICAvLyA8dGVtcGxhdGU+IHN1cHBvcnQgbm90IGF2YWlsYWJsZSBpbiBJRVxuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cik7XG4gICAgfSBlbHNlIGlmIChIQVNfUkFOR0VfU1VQUE9SVCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVJhbmdlKHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVdyYXAoc3RyKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogTk9URTogV2UgZG9uJ3QgYm90aGVyIGNoZWNraW5nIGBuYW1lc3BhY2VVUklgIGJlY2F1c2UgeW91IHdpbGwgbmV2ZXIgZmluZCB0d28gSFRNTCBlbGVtZW50cyB3aXRoIHRoZSBzYW1lXG4gKiAgICAgICBub2RlTmFtZSBhbmQgZGlmZmVyZW50IG5hbWVzcGFjZSBVUklzLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiIFRoZSB0YXJnZXQgZWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZU5vZGVOYW1lcyhmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgZnJvbU5vZGVOYW1lID0gZnJvbUVsLm5vZGVOYW1lO1xuICAgIHZhciB0b05vZGVOYW1lID0gdG9FbC5ub2RlTmFtZTtcbiAgICB2YXIgZnJvbUNvZGVTdGFydCwgdG9Db2RlU3RhcnQ7XG5cbiAgICBpZiAoZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZyb21Db2RlU3RhcnQgPSBmcm9tTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcbiAgICB0b0NvZGVTdGFydCA9IHRvTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcblxuICAgIC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIHZpcnR1YWwgRE9NIG5vZGUgb3IgU1ZHIG5vZGUgdGhlbiB3ZSBtYXlcbiAgICAvLyBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgdGFnIG5hbWUgYmVmb3JlIGNvbXBhcmluZy4gTm9ybWFsIEhUTUwgZWxlbWVudHMgdGhhdCBhcmVcbiAgICAvLyBpbiB0aGUgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcbiAgICAvLyBhcmUgY29udmVydGVkIHRvIHVwcGVyIGNhc2VcbiAgICBpZiAoZnJvbUNvZGVTdGFydCA8PSA5MCAmJiB0b0NvZGVTdGFydCA+PSA5NykgeyAvLyBmcm9tIGlzIHVwcGVyIGFuZCB0byBpcyBsb3dlclxuICAgICAgICByZXR1cm4gZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmICh0b0NvZGVTdGFydCA8PSA5MCAmJiBmcm9tQ29kZVN0YXJ0ID49IDk3KSB7IC8vIHRvIGlzIHVwcGVyIGFuZCBmcm9tIGlzIGxvd2VyXG4gICAgICAgIHJldHVybiB0b05vZGVOYW1lID09PSBmcm9tTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBOU19YSFRNTCA/XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50KG5hbWUpIDpcbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgY2hpbGRyZW4gb2Ygb25lIERPTSBlbGVtZW50IHRvIGFub3RoZXIgRE9NIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIHRvRWwuYXBwZW5kQ2hpbGQoY3VyQ2hpbGQpO1xuICAgICAgICBjdXJDaGlsZCA9IG5leHRDaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIHRvRWw7XG59XG5cbmZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCBuYW1lKSB7XG4gICAgaWYgKGZyb21FbFtuYW1lXSAhPT0gdG9FbFtuYW1lXSkge1xuICAgICAgICBmcm9tRWxbbmFtZV0gPSB0b0VsW25hbWVdO1xuICAgICAgICBpZiAoZnJvbUVsW25hbWVdKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGZyb21FbC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgcGFyZW50TmFtZSA9IHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdTRUxFQ1QnICYmICFwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuICAgICAgICAgICAgICAgIGlmIChmcm9tRWwuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpICYmICF0b0VsLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIE1TIEVkZ2UgYnVnIHdoZXJlIHRoZSAnc2VsZWN0ZWQnIGF0dHJpYnV0ZSBjYW4gb25seSBiZVxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmVkIGlmIHNldCB0byBhIG5vbi1lbXB0eSB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTIwODc2NzkvXG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVzZXQgc2VsZWN0IGVsZW1lbnQncyBzZWxlY3RlZEluZGV4IHRvIC0xLCBvdGhlcndpc2Ugc2V0dGluZ1xuICAgICAgICAgICAgICAgIC8vIGZyb21FbC5zZWxlY3RlZCB1c2luZyB0aGUgc3luY0Jvb2xlYW5BdHRyUHJvcCBiZWxvdyBoYXMgbm8gZWZmZWN0LlxuICAgICAgICAgICAgICAgIC8vIFRoZSBjb3JyZWN0IHNlbGVjdGVkSW5kZXggd2lsbCBiZSBzZXQgaW4gdGhlIFNFTEVDVCBzcGVjaWFsIGhhbmRsZXIgYmVsb3cuXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdzZWxlY3RlZCcpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgaXMgc3BlY2lhbCBmb3IgdGhlIDxpbnB1dD4gZWxlbWVudCBzaW5jZSBpdCBzZXRzXG4gICAgICogdGhlIGluaXRpYWwgdmFsdWUuIENoYW5naW5nIHRoZSBcInZhbHVlXCIgYXR0cmlidXRlIHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gICAgICogXCJ2YWx1ZVwiIHByb3BlcnR5IHdpbGwgaGF2ZSBubyBlZmZlY3Qgc2luY2UgaXQgaXMgb25seSB1c2VkIHRvIHRoZSBzZXQgdGhlXG4gICAgICogaW5pdGlhbCB2YWx1ZS4gIFNpbWlsYXIgZm9yIHRoZSBcImNoZWNrZWRcIiBhdHRyaWJ1dGUsIGFuZCBcImRpc2FibGVkXCIuXG4gICAgICovXG4gICAgSU5QVVQ6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2NoZWNrZWQnKTtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIE5lZWRlZCBmb3IgSUUuIEFwcGFyZW50bHkgSUUgc2V0cyB0aGUgcGxhY2Vob2xkZXIgYXMgdGhlXG4gICAgICAgICAgICAvLyBub2RlIHZhbHVlIGFuZCB2aXNlIHZlcnNhLiBUaGlzIGlnbm9yZXMgYW4gZW1wdHkgdXBkYXRlLlxuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PSBuZXdWYWx1ZSB8fCAoIW5ld1ZhbHVlICYmIG9sZFZhbHVlID09IGZyb21FbC5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFNFTEVDVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGlmICghdG9FbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGxvb3AgdGhyb3VnaCBjaGlsZHJlbiBvZiBmcm9tRWwsIG5vdCB0b0VsIHNpbmNlIG5vZGVzIGNhbiBiZSBtb3ZlZFxuICAgICAgICAgICAgLy8gZnJvbSB0b0VsIHRvIGZyb21FbCBkaXJlY3RseSB3aGVuIG1vcnBoaW5nLlxuICAgICAgICAgICAgLy8gQXQgdGhlIHRpbWUgdGhpcyBzcGVjaWFsIGhhbmRsZXIgaXMgaW52b2tlZCwgYWxsIGNoaWxkcmVuIGhhdmUgYWxyZWFkeSBiZWVuIG1vcnBoZWRcbiAgICAgICAgICAgIC8vIGFuZCBhcHBlbmRlZCB0byAvIHJlbW92ZWQgZnJvbSBmcm9tRWwsIHNvIHVzaW5nIGZyb21FbCBoZXJlIGlzIHNhZmUgYW5kIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBvcHRncm91cDtcbiAgICAgICAgICAgIHZhciBub2RlTmFtZTtcbiAgICAgICAgICAgIHdoaWxlKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBjdXJDaGlsZC5ub2RlTmFtZSAmJiBjdXJDaGlsZC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3VyQ2hpbGQgJiYgb3B0Z3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gb3B0Z3JvdXAubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZyb21FbC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSA9IDExO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXROb2RlS2V5KG5vZGUpIHtcbiAgaWYgKG5vZGUpIHtcbiAgICByZXR1cm4gKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpKSB8fCBub2RlLmlkO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRvTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdIVE1MJyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICB0b05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICB0b05vZGUuaW5uZXJIVE1MID0gdG9Ob2RlSHRtbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvTm9kZSA9IHRvRWxlbWVudCh0b05vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodG9Ob2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEpIHtcbiAgICAgIHRvTm9kZSA9IHRvTm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG5cbiAgICB2YXIgZ2V0Tm9kZUtleSA9IG9wdGlvbnMuZ2V0Tm9kZUtleSB8fCBkZWZhdWx0R2V0Tm9kZUtleTtcbiAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uTm9kZUFkZGVkID0gb3B0aW9ucy5vbk5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25FbFVwZGF0ZWQgPSBvcHRpb25zLm9uRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25Ob2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgc2tpcEZyb21DaGlsZHJlbiA9IG9wdGlvbnMuc2tpcEZyb21DaGlsZHJlbiB8fCBub29wO1xuICAgIHZhciBhZGRDaGlsZCA9IG9wdGlvbnMuYWRkQ2hpbGQgfHwgZnVuY3Rpb24ocGFyZW50LCBjaGlsZCl7IHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpOyB9O1xuICAgIHZhciBjaGlsZHJlbk9ubHkgPSBvcHRpb25zLmNoaWxkcmVuT25seSA9PT0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgYXMgYSBsb29rdXAgdG8gcXVpY2tseSBmaW5kIGFsbCBrZXllZCBlbGVtZW50cyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgdmFyIGZyb21Ob2Rlc0xvb2t1cCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIGtleWVkUmVtb3ZhbExpc3QgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGFkZEtleWVkUmVtb3ZhbChrZXkpIHtcbiAgICAgIGtleWVkUmVtb3ZhbExpc3QucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cbiAgICAgICAgICB2YXIga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKHNraXBLZXllZE5vZGVzICYmIChrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKSkpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBza2lwcGluZyBrZXllZCBub2RlcyB0aGVuIHdlIGFkZCB0aGUga2V5XG4gICAgICAgICAgICAvLyB0byBhIGxpc3Qgc28gdGhhdCBpdCBjYW4gYmUgaGFuZGxlZCBhdCB0aGUgdmVyeSBlbmQuXG4gICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoa2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gT25seSByZXBvcnQgdGhlIG5vZGUgYXMgZGlzY2FyZGVkIGlmIGl0IGlzIG5vdCBrZXllZC4gV2UgZG8gdGhpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyBhdCB0aGUgZW5kIHdlIGxvb3AgdGhyb3VnaCBhbGwga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlIHVubWF0Y2hlZFxuICAgICAgICAgICAgLy8gYW5kIHRoZW4gZGlzY2FyZCB0aGVtIGluIG9uZSBmaW5hbCBwYXNzLlxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgIGlmIChjdXJDaGlsZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKGN1ckNoaWxkLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVtb3ZlcyBhIERPTSBub2RlIG91dCBvZiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgKlxuICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmVcbiAgICAqIEBwYXJhbSAge05vZGV9IHBhcmVudE5vZGUgVGhlIG5vZGVzIHBhcmVudFxuICAgICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcEtleWVkTm9kZXMgSWYgdHJ1ZSB0aGVuIGVsZW1lbnRzIHdpdGgga2V5cyB3aWxsIGJlIHNraXBwZWQgYW5kIG5vdCBkaXNjYXJkZWQuXG4gICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUsIHBhcmVudE5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICBpZiAob25CZWZvcmVOb2RlRGlzY2FyZGVkKG5vZGUpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKTtcbiAgICB9XG5cbiAgICAvLyAvLyBUcmVlV2Fsa2VyIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShyb290KSB7XG4gICAgLy8gICAgIHZhciB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICAvLyAgICAgICAgIHJvb3QsXG4gICAgLy8gICAgICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgLy9cbiAgICAvLyAgICAgdmFyIGVsO1xuICAgIC8vICAgICB3aGlsZSgoZWwgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIC8vIE5vZGVJdGVyYXRvciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgLy8gICAgIHZhciBub2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgIC8vICAgICB2YXIgZWw7XG4gICAgLy8gICAgIHdoaWxlKChlbCA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEpIHtcbiAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBjdXJDaGlsZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBXYWxrIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgaW5kZXhUcmVlKGN1ckNoaWxkKTtcblxuICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleFRyZWUoZnJvbU5vZGUpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTm9kZUFkZGVkKGVsKSB7XG4gICAgICBvbk5vZGVBZGRlZChlbCk7XG5cbiAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHVubWF0Y2hlZEZyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtrZXldO1xuICAgICAgICAgIC8vIGlmIHdlIGZpbmQgYSBkdXBsaWNhdGUgI2lkIG5vZGUgaW4gY2FjaGUsIHJlcGxhY2UgYGVsYCB3aXRoIGNhY2hlIHZhbHVlXG4gICAgICAgICAgLy8gYW5kIG1vcnBoIGl0IHRvIHRoZSBjaGlsZCBub2RlLlxuICAgICAgICAgIGlmICh1bm1hdGNoZWRGcm9tRWwgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJDaGlsZCwgdW5tYXRjaGVkRnJvbUVsKSkge1xuICAgICAgICAgICAgY3VyQ2hpbGQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICBtb3JwaEVsKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZWN1cnNpdmVseSBjYWxsIGZvciBjdXJDaGlsZCBhbmQgaXQncyBjaGlsZHJlbiB0byBzZWUgaWYgd2UgZmluZCBzb21ldGhpbmcgaW5cbiAgICAgICAgICAvLyBmcm9tTm9kZXNMb29rdXBcbiAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAoKGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKSkpIHtcbiAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICB9XG4gICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9ycGhFbChmcm9tRWwsIHRvRWwsIGNoaWxkcmVuT25seSkge1xuICAgICAgdmFyIHRvRWxLZXkgPSBnZXROb2RlS2V5KHRvRWwpO1xuXG4gICAgICBpZiAodG9FbEtleSkge1xuICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgIC8vIERPTSBzbyBjbGVhciBpdCBvdXQgb2YgdGhlIHNhdmVkIGVsZW1lbnRzIGNvbGxlY3Rpb25cbiAgICAgICAgZGVsZXRlIGZyb21Ob2Rlc0xvb2t1cFt0b0VsS2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgdmFyIGJlZm9yZVVwZGF0ZVJlc3VsdCA9IG9uQmVmb3JlRWxVcGRhdGVkKGZyb21FbCwgdG9FbCk7XG4gICAgICAgIGlmIChiZWZvcmVVcGRhdGVSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGJlZm9yZVVwZGF0ZVJlc3VsdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgZnJvbUVsID0gYmVmb3JlVXBkYXRlUmVzdWx0O1xuICAgICAgICAgIC8vIHJlaW5kZXggdGhlIG5ldyBmcm9tRWwgaW4gY2FzZSBpdCdzIG5vdCBpbiB0aGUgc2FtZVxuICAgICAgICAgIC8vIHRyZWUgYXMgdGhlIG9yaWdpbmFsIGZyb21FbFxuICAgICAgICAgIC8vIChQaG9lbml4IExpdmVWaWV3IHNvbWV0aW1lcyByZXR1cm5zIGEgY2xvbmVkIHRyZWUsXG4gICAgICAgICAgLy8gIGJ1dCBrZXllZCBsb29rdXBzIHdvdWxkIHN0aWxsIHBvaW50IHRvIHRoZSBvcmlnaW5hbCB0cmVlKVxuICAgICAgICAgIGluZGV4VHJlZShmcm9tRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIGF0dHJpYnV0ZXMgb24gb3JpZ2luYWwgRE9NIGVsZW1lbnQgZmlyc3RcbiAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICBvbkVsVXBkYXRlZChmcm9tRWwpO1xuXG4gICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tRWwubm9kZU5hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BlY2lhbEVsSGFuZGxlcnMuVEVYVEFSRUEoZnJvbUVsLCB0b0VsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JwaENoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgICAgdmFyIHNraXBGcm9tID0gc2tpcEZyb21DaGlsZHJlbihmcm9tRWwsIHRvRWwpO1xuICAgICAgdmFyIGN1clRvTm9kZUNoaWxkID0gdG9FbC5maXJzdENoaWxkO1xuICAgICAgdmFyIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgIHZhciBjdXJUb05vZGVLZXk7XG4gICAgICB2YXIgY3VyRnJvbU5vZGVLZXk7XG5cbiAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICB2YXIgdG9OZXh0U2libGluZztcbiAgICAgIHZhciBtYXRjaGluZ0Zyb21FbDtcblxuICAgICAgLy8gd2FsayB0aGUgY2hpbGRyZW5cbiAgICAgIG91dGVyOiB3aGlsZSAoY3VyVG9Ob2RlQ2hpbGQpIHtcbiAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICBjdXJUb05vZGVLZXkgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAvLyB3YWxrIHRoZSBmcm9tTm9kZSBjaGlsZHJlbiBhbGwgdGhlIHdheSB0aHJvdWdoXG4gICAgICAgIHdoaWxlICghc2tpcEZyb20gJiYgY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZSAmJiBjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIGlmIHRoZSBjdXJGcm9tTm9kZUNoaWxkIGRvZXNudCBoYXZlIGEgbWF0Y2ggd2l0aCB0aGUgY3VyVG9Ob2RlQ2hpbGRcbiAgICAgICAgICB2YXIgaXNDb21wYXRpYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBFbGVtZW50IG5vZGVzXG5cbiAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSB0YXJnZXQgbm9kZSBoYXMgYSBrZXkgc28gd2Ugd2FudCB0byBtYXRjaCBpdCB1cCB3aXRoIHRoZSBjb3JyZWN0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWVcbiAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICE9PSBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGtleSBzb1xuICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgY2hlY2sgb3VyIGxvb2t1cCB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgLy8gRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyb21OZXh0U2libGluZyA9PT0gbWF0Y2hpbmdGcm9tRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBlbGVtZW50IHJlbW92YWxzLiBUbyBhdm9pZCByZW1vdmluZyB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAvLyBET00gbm9kZSBvdXQgb2YgdGhlIHRyZWUgKHNpbmNlIHRoYXQgY2FuIGJyZWFrIENTUyB0cmFuc2l0aW9ucywgZXRjLiksXG4gICAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2lsbCBpbnN0ZWFkIGRpc2NhcmQgdGhlIGN1cnJlbnQgbm9kZSBhbmQgd2FpdCB1bnRpbCB0aGUgbmV4dFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBtYXRjaCB1cCB0aGUga2V5ZWQgdGFyZ2V0IGVsZW1lbnQgd2l0aCBpdHMgbWF0Y2hpbmdcbiAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBtYXRjaGluZyBrZXllZCBlbGVtZW50IHNvbWV3aGVyZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgbW92ZSB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgaW50byB0aGUgY3VycmVudCBwb3NpdGlvbiBhbmQgbW9ycGhcbiAgICAgICAgICAgICAgICAgICAgICAvLyBpdC5cblxuICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFdlIHVzZSBpbnNlcnRCZWZvcmUgaW5zdGVhZCBvZiByZXBsYWNlQ2hpbGQgYmVjYXVzZSB3ZSB3YW50IHRvIGdvIHRocm91Z2hcbiAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYHJlbW92ZU5vZGUoKWAgZnVuY3Rpb24gZm9yIHRoZSBub2RlIHRoYXQgaXMgYmVpbmcgZGlzY2FyZGVkIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwgbGlmZWN5Y2xlIGhvb2tzIGFyZSBjb3JyZWN0bHkgaW52b2tlZFxuICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5pbnNlcnRCZWZvcmUobWF0Y2hpbmdGcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gbWF0Y2hpbmdGcm9tRWw7XG4gICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9kZXMgYXJlIG5vdCBjb21wYXRpYmxlIHNpbmNlIHRoZSBcInRvXCIgbm9kZSBoYXMgYSBrZXkgYW5kIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vIG1hdGNoaW5nIGtleWVkIG5vZGUgaW4gdGhlIHNvdXJjZSB0cmVlXG4gICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBvcmlnaW5hbCBoYXMgYSBrZXlcbiAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGlzQ29tcGF0aWJsZSAhPT0gZmFsc2UgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBjdXJGcm9tTm9kZVR5cGUgPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBTaW1wbHkgdXBkYXRlIG5vZGVWYWx1ZSBvbiB0aGUgb3JpZ2luYWwgbm9kZSB0b1xuICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlICE9PSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgLy8gQWR2YW5jZSBib3RoIHRoZSBcInRvXCIgY2hpbGQgYW5kIHRoZSBcImZyb21cIiBjaGlsZCBzaW5jZSB3ZSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICAvLyBOb3RoaW5nIGVsc2UgdG8gZG8gYXMgd2UgYWxyZWFkeSByZWN1cnNpdmVseSBjYWxsZWQgbW9ycGhDaGlsZHJlbiBhYm92ZVxuICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET00gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGFcbiAgICAgICAgICAvLyBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NLiBIb3dldmVyLCB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIGZyb20gbm9kZSBpcyBub3Qga2V5ZWRcbiAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAvLyB0YXJnZXQgdHJlZSBhbmQgd2UgZG9uJ3Qgd2FudCB0byBkaXNjYXJkIGl0IGp1c3QgeWV0IHNpbmNlIGl0IHN0aWxsIG1pZ2h0IGZpbmQgYVxuICAgICAgICAgIC8vIGhvbWUgaW4gdGhlIGZpbmFsIERPTSB0cmVlLiBBZnRlciBldmVyeXRoaW5nIGlzIGRvbmUgd2Ugd2lsbCByZW1vdmUgYW55IGtleWVkIG5vZGVzXG4gICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgfSAvLyBFTkQ6IHdoaWxlKGN1ckZyb21Ob2RlQ2hpbGQpIHt9XG5cbiAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0b1wiIG5vZGVcbiAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICYmIChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSAmJiBjb21wYXJlTm9kZU5hbWVzKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAvLyBNT1JQSFxuICAgICAgICAgIGlmKCFza2lwRnJvbSl7IGFkZENoaWxkKGZyb21FbCwgbWF0Y2hpbmdGcm9tRWwpOyB9XG4gICAgICAgICAgbW9ycGhFbChtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCA9IG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZShmcm9tRWwub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkQ2hpbGQoZnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgIH1cblxuICAgICAgY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KTtcblxuICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgc3BlY2lhbEVsSGFuZGxlcihmcm9tRWwsIHRvRWwpO1xuICAgICAgfVxuICAgIH0gLy8gRU5EOiBtb3JwaENoaWxkcmVuKC4uLilcblxuICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IG1vcnBoZWROb2RlVHlwZSkge1xuICAgICAgICAgIGlmIChtb3JwaGVkTm9kZS5ub2RlVmFsdWUgIT09IHRvTm9kZS5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlLm5vZGVWYWx1ZSA9IHRvTm9kZS5ub2RlVmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgIC8vIFRoZSBcInRvIG5vZGVcIiB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgXCJmcm9tIG5vZGVcIiBzbyB3ZSBoYWQgdG9cbiAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9Ob2RlLmlzU2FtZU5vZGUgJiYgdG9Ob2RlLmlzU2FtZU5vZGUobW9ycGhlZE5vZGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBjaGlsZHJlbk9ubHkpO1xuXG4gICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgLy8gcmVtb3ZlZC4gV2Ugb25seSBkbyB0aGUgcmVtb3ZhbCBpZiB3ZSBrbm93IHRoYXQgdGhlIGtleWVkIG5vZGVcbiAgICAgIC8vIG5ldmVyIGZvdW5kIGEgbWF0Y2guIFdoZW4gYSBrZXllZCBub2RlIGlzIG1hdGNoZWQgdXAgd2UgcmVtb3ZlXG4gICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgLy8gaWYgYSBrZXllZCBub2RlIGhhcyBiZWVuIG1hdGNoZWQgdXAgb3Igbm90XG4gICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1rZXllZFJlbW92YWxMaXN0Lmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgIHZhciBlbFRvUmVtb3ZlID0gZnJvbU5vZGVzTG9va3VwW2tleWVkUmVtb3ZhbExpc3RbaV1dO1xuICAgICAgICAgIGlmIChlbFRvUmVtb3ZlKSB7XG4gICAgICAgICAgICByZW1vdmVOb2RlKGVsVG9SZW1vdmUsIGVsVG9SZW1vdmUucGFyZW50Tm9kZSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgIG1vcnBoZWROb2RlID0gbW9ycGhlZE5vZGUuYWN0dWFsaXplKGZyb21Ob2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgLy8gcmVwbGFjZSB0aGUgb2xkIERPTSBub2RlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS4gVGhpcyBpcyBvbmx5XG4gICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgIGZyb21Ob2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1vcnBoZWROb2RlLCBmcm9tTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICB9O1xufVxuXG52YXIgbW9ycGhkb20gPSBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vcnBoZG9tO1xuIiwgImltcG9ydCB7XG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9QUlVORSxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU0tJUCxcbiAgUEhYX01BR0lDX0lELFxuICBQSFhfU1RBVElDLFxuICBQSFhfVFJJR0dFUl9BQ1RJT04sXG4gIFBIWF9VUERBVEUsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUkVGX0xPQ0ssXG4gIFBIWF9TVFJFQU0sXG4gIFBIWF9TVFJFQU1fUkVGLFxuICBQSFhfVklFV1BPUlRfVE9QLFxuICBQSFhfVklFV1BPUlRfQk9UVE9NLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBkZXRlY3REdXBsaWNhdGVJZHMsXG4gIGRldGVjdEludmFsaWRTdHJlYW1JbnNlcnRzLFxuICBpc0NpZFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBET01Qb3N0TW9ycGhSZXN0b3JlciBmcm9tIFwiLi9kb21fcG9zdF9tb3JwaF9yZXN0b3JlclwiXG5pbXBvcnQgbW9ycGhkb20gZnJvbSBcIm1vcnBoZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUGF0Y2gge1xuICBjb25zdHJ1Y3Rvcih2aWV3LCBjb250YWluZXIsIGlkLCBodG1sLCBzdHJlYW1zLCB0YXJnZXRDSUQsIG9wdHM9e30pe1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSB2aWV3LmxpdmVTb2NrZXRcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuaWQgPSBpZFxuICAgIHRoaXMucm9vdElEID0gdmlldy5yb290LmlkXG4gICAgdGhpcy5odG1sID0gaHRtbFxuICAgIHRoaXMuc3RyZWFtcyA9IHN0cmVhbXNcbiAgICB0aGlzLnN0cmVhbUluc2VydHMgPSB7fVxuICAgIHRoaXMuc3RyZWFtQ29tcG9uZW50UmVzdG9yZSA9IHt9XG4gICAgdGhpcy50YXJnZXRDSUQgPSB0YXJnZXRDSURcbiAgICB0aGlzLmNpZFBhdGNoID0gaXNDaWQodGhpcy50YXJnZXRDSUQpXG4gICAgdGhpcy5wZW5kaW5nUmVtb3ZlcyA9IFtdXG4gICAgdGhpcy5waHhSZW1vdmUgPSB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhcInJlbW92ZVwiKVxuICAgIHRoaXMudGFyZ2V0Q29udGFpbmVyID0gdGhpcy5pc0NJRFBhdGNoKCkgPyB0aGlzLnRhcmdldENJRENvbnRhaW5lcihodG1sKSA6IGNvbnRhaW5lclxuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgYmVmb3JlYWRkZWQ6IFtdLCBiZWZvcmV1cGRhdGVkOiBbXSwgYmVmb3JlcGh4Q2hpbGRBZGRlZDogW10sXG4gICAgICBhZnRlcmFkZGVkOiBbXSwgYWZ0ZXJ1cGRhdGVkOiBbXSwgYWZ0ZXJkaXNjYXJkZWQ6IFtdLCBhZnRlcnBoeENoaWxkQWRkZWQ6IFtdLFxuICAgICAgYWZ0ZXJ0cmFuc2l0aW9uc0Rpc2NhcmRlZDogW11cbiAgICB9XG4gICAgdGhpcy53aXRoQ2hpbGRyZW4gPSBvcHRzLndpdGhDaGlsZHJlbiB8fCBvcHRzLnVuZG9SZWYgfHwgZmFsc2VcbiAgICB0aGlzLnVuZG9SZWYgPSBvcHRzLnVuZG9SZWZcbiAgfVxuXG4gIGJlZm9yZShraW5kLCBjYWxsYmFjayl7IHRoaXMuY2FsbGJhY2tzW2BiZWZvcmUke2tpbmR9YF0ucHVzaChjYWxsYmFjaykgfVxuICBhZnRlcihraW5kLCBjYWxsYmFjayl7IHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG5cbiAgdHJhY2tCZWZvcmUoa2luZCwgLi4uYXJncyl7XG4gICAgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgdHJhY2tBZnRlcihraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYWZ0ZXIke2tpbmR9YF0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSlcbiAgfVxuXG4gIG1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKCl7XG4gICAgbGV0IHBoeFVwZGF0ZSA9IHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9VUERBVEUpXG4gICAgRE9NLmFsbCh0aGlzLmNvbnRhaW5lciwgYFske3BoeFVwZGF0ZX09YXBwZW5kXSA+ICosIFske3BoeFVwZGF0ZX09cHJlcGVuZF0gPiAqYCwgZWwgPT4ge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9QUlVORSwgXCJcIilcbiAgICB9KVxuICB9XG5cbiAgcGVyZm9ybShpc0pvaW5QYXRjaCl7XG4gICAgbGV0IHt2aWV3LCBsaXZlU29ja2V0LCBodG1sLCBjb250YWluZXIsIHRhcmdldENvbnRhaW5lcn0gPSB0aGlzXG4gICAgaWYodGhpcy5pc0NJRFBhdGNoKCkgJiYgIXRhcmdldENvbnRhaW5lcil7IHJldHVybiB9XG5cbiAgICBsZXQgZm9jdXNlZCA9IGxpdmVTb2NrZXQuZ2V0QWN0aXZlRWxlbWVudCgpXG4gICAgbGV0IHtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kfSA9IGZvY3VzZWQgJiYgRE9NLmhhc1NlbGVjdGlvblJhbmdlKGZvY3VzZWQpID8gZm9jdXNlZCA6IHt9XG4gICAgbGV0IHBoeFVwZGF0ZSA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVVBEQVRFKVxuICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgIGxldCBwaHhWaWV3cG9ydEJvdHRvbSA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVklFV1BPUlRfQk9UVE9NKVxuICAgIGxldCBwaHhUcmlnZ2VyRXh0ZXJuYWwgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1RSSUdHRVJfQUNUSU9OKVxuICAgIGxldCBhZGRlZCA9IFtdXG4gICAgbGV0IHVwZGF0ZXMgPSBbXVxuICAgIGxldCBhcHBlbmRQcmVwZW5kVXBkYXRlcyA9IFtdXG5cbiAgICBsZXQgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gbW9ycGgodGFyZ2V0Q29udGFpbmVyLCBzb3VyY2UsIHdpdGhDaGlsZHJlbj10aGlzLndpdGhDaGlsZHJlbil7XG4gICAgICBsZXQgbW9ycGhDYWxsYmFja3MgPSB7XG4gICAgICAgIC8vIG5vcm1hbGx5LCB3ZSBhcmUgcnVubmluZyB3aXRoIGNoaWxkcmVuT25seSwgYXMgdGhlIHBhdGNoIEhUTUwgZm9yIGEgTFZcbiAgICAgICAgLy8gZG9lcyBub3QgaW5jbHVkZSB0aGUgTFYgYXR0cnMgKGRhdGEtcGh4LXNlc3Npb24sIGV0Yy4pXG4gICAgICAgIC8vIHdoZW4gd2UgYXJlIHBhdGNoaW5nIGEgbGl2ZSBjb21wb25lbnQsIHdlIGRvIHdhbnQgdG8gcGF0Y2ggdGhlIHJvb3QgZWxlbWVudCBhcyB3ZWxsO1xuICAgICAgICAvLyBhbm90aGVyIGNhc2UgaXMgdGhlIHJlY3Vyc2l2ZSBwYXRjaCBvZiBhIHN0cmVhbSBpdGVtIHRoYXQgd2FzIGtlcHQgb24gcmVzZXQgKC0+IG9uQmVmb3JlTm9kZUFkZGVkKVxuICAgICAgICBjaGlsZHJlbk9ubHk6IHRhcmdldENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgPT09IG51bGwgJiYgIXdpdGhDaGlsZHJlbixcbiAgICAgICAgZ2V0Tm9kZUtleTogKG5vZGUpID0+IHtcbiAgICAgICAgICBpZihET00uaXNQaHhEZXN0cm95ZWQobm9kZSkpeyByZXR1cm4gbnVsbCB9XG4gICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGpvaW4gcGF0Y2gsIHRoZW4gYnkgZGVmaW5pdGlvbiB0aGVyZSB3YXMgbm8gUEhYX01BR0lDX0lELlxuICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IHRvIHJlZHVjZSB0aGUgYW1vdW50IG9mIGVsZW1lbnRzIG1vcnBoZG9tIGRpc2NhcmRzLlxuICAgICAgICAgIGlmKGlzSm9pblBhdGNoKXsgcmV0dXJuIG5vZGUuaWQgfVxuICAgICAgICAgIHJldHVybiBub2RlLmlkIHx8IChub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZShQSFhfTUFHSUNfSUQpKVxuICAgICAgICB9LFxuICAgICAgICAvLyBza2lwIGluZGV4aW5nIGZyb20gY2hpbGRyZW4gd2hlbiBjb250YWluZXIgaXMgc3RyZWFtXG4gICAgICAgIHNraXBGcm9tQ2hpbGRyZW46IChmcm9tKSA9PiB7IHJldHVybiBmcm9tLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpID09PSBQSFhfU1RSRUFNIH0sXG4gICAgICAgIC8vIHRlbGwgbW9ycGhkb20gaG93IHRvIGFkZCBhIGNoaWxkXG4gICAgICAgIGFkZENoaWxkOiAocGFyZW50LCBjaGlsZCkgPT4ge1xuICAgICAgICAgIGxldCB7cmVmLCBzdHJlYW1BdH0gPSB0aGlzLmdldFN0cmVhbUluc2VydChjaGlsZClcbiAgICAgICAgICBpZihyZWYgPT09IHVuZGVmaW5lZCl7IHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpIH1cblxuICAgICAgICAgIHRoaXMuc2V0U3RyZWFtUmVmKGNoaWxkLCByZWYpXG5cbiAgICAgICAgICAvLyBzdHJlYW1pbmdcbiAgICAgICAgICBpZihzdHJlYW1BdCA9PT0gMCl7XG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBjaGlsZClcbiAgICAgICAgICB9IGVsc2UgaWYoc3RyZWFtQXQgPT09IC0xKXtcbiAgICAgICAgICAgIGxldCBsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgICAgICAgaWYobGFzdENoaWxkICYmICFsYXN0Q2hpbGQuaGFzQXR0cmlidXRlKFBIWF9TVFJFQU1fUkVGKSl7XG4gICAgICAgICAgICAgIGxldCBub25TdHJlYW1DaGlsZCA9IEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKS5maW5kKGMgPT4gIWMuaGFzQXR0cmlidXRlKFBIWF9TVFJFQU1fUkVGKSlcbiAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbm9uU3RyZWFtQ2hpbGQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmKHN0cmVhbUF0ID4gMCl7XG4gICAgICAgICAgICBsZXQgc2libGluZyA9IEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKVtzdHJlYW1BdF1cbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIHNpYmxpbmcpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZU5vZGVBZGRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgRE9NLm1haW50YWluUHJpdmF0ZUhvb2tzKGVsLCBlbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKVxuICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJhZGRlZFwiLCBlbClcblxuICAgICAgICAgIGxldCBtb3JwaGVkRWwgPSBlbFxuICAgICAgICAgIC8vIHRoaXMgaXMgYSBzdHJlYW0gaXRlbSB0aGF0IHdhcyBrZXB0IG9uIHJlc2V0LCByZWN1cnNpdmVseSBtb3JwaCBpdFxuICAgICAgICAgIGlmKHRoaXMuc3RyZWFtQ29tcG9uZW50UmVzdG9yZVtlbC5pZF0pe1xuICAgICAgICAgICAgbW9ycGhlZEVsID0gdGhpcy5zdHJlYW1Db21wb25lbnRSZXN0b3JlW2VsLmlkXVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RyZWFtQ29tcG9uZW50UmVzdG9yZVtlbC5pZF1cbiAgICAgICAgICAgIG1vcnBoLmNhbGwodGhpcywgbW9ycGhlZEVsLCBlbCwgdHJ1ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbW9ycGhlZEVsXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUpeyB0aGlzLm1heWJlUmVPcmRlclN0cmVhbShlbCwgdHJ1ZSkgfVxuXG4gICAgICAgICAgLy8gaGFjayB0byBmaXggU2FmYXJpIGhhbmRsaW5nIG9mIGltZyBzcmNzZXQgYW5kIHZpZGVvIHRhZ3NcbiAgICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgJiYgZWwuc3Jjc2V0KXtcbiAgICAgICAgICAgIGVsLnNyY3NldCA9IGVsLnNyY3NldFxuICAgICAgICAgIH0gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQgJiYgZWwuYXV0b3BsYXkpe1xuICAgICAgICAgICAgZWwucGxheSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKERPTS5pc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCkpe1xuICAgICAgICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gZWxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKChET00uaXNQaHhDaGlsZChlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbCkpIHx8IERPTS5pc1BoeFN0aWNreShlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbC5wYXJlbnROb2RlKSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRlZC5wdXNoKGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQ6IChlbCkgPT4gdGhpcy5vbk5vZGVEaXNjYXJkZWQoZWwpLFxuICAgICAgICBvbkJlZm9yZU5vZGVEaXNjYXJkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1BSVU5FKSAhPT0gbnVsbCl7IHJldHVybiB0cnVlIH1cbiAgICAgICAgICBpZihlbC5wYXJlbnRFbGVtZW50ICE9PSBudWxsICYmIGVsLmlkICYmXG4gICAgICAgICAgICBET00uaXNQaHhVcGRhdGUoZWwucGFyZW50RWxlbWVudCwgcGh4VXBkYXRlLCBbUEhYX1NUUkVBTSwgXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodGhpcy5tYXliZVBlbmRpbmdSZW1vdmUoZWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKGVsKSl7IHJldHVybiBmYWxzZSB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBvbkVsVXBkYXRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVzLnB1c2goZWwpXG4gICAgICAgICAgdGhpcy5tYXliZVJlT3JkZXJTdHJlYW0oZWwsIGZhbHNlKVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUVsVXBkYXRlZDogKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHdlIGFyZSBwYXRjaGluZyB0aGUgcm9vdCB0YXJnZXQgY29udGFpbmVyIGFuZCB0aGUgaWQgaGFzIGNoYW5nZWQsIHRyZWF0IGl0IGFzIGEgbmV3IG5vZGVcbiAgICAgICAgICAvLyBieSByZXBsYWNpbmcgdGhlIGZyb21FbCB3aXRoIHRoZSB0b0VsLCB3aGljaCBlbnN1cmVzIGhvb2tzIGFyZSB0b3JuIGRvd24gYW5kIHJlLWNyZWF0ZWRcbiAgICAgICAgICBpZihmcm9tRWwuaWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUodGFyZ2V0Q29udGFpbmVyKSAmJiBmcm9tRWwuaWQgIT09IHRvRWwuaWQpe1xuICAgICAgICAgICAgbW9ycGhDYWxsYmFja3Mub25Ob2RlRGlzY2FyZGVkKGZyb21FbClcbiAgICAgICAgICAgIGZyb21FbC5yZXBsYWNlV2l0aCh0b0VsKVxuICAgICAgICAgICAgcmV0dXJuIG1vcnBoQ2FsbGJhY2tzLm9uTm9kZUFkZGVkKHRvRWwpXG4gICAgICAgICAgfVxuICAgICAgICAgIERPTS5zeW5jUGVuZGluZ0F0dHJzKGZyb21FbCwgdG9FbClcbiAgICAgICAgICBET00ubWFpbnRhaW5Qcml2YXRlSG9va3MoZnJvbUVsLCB0b0VsLCBwaHhWaWV3cG9ydFRvcCwgcGh4Vmlld3BvcnRCb3R0b20pXG4gICAgICAgICAgRE9NLmNsZWFuQ2hpbGROb2Rlcyh0b0VsLCBwaHhVcGRhdGUpXG4gICAgICAgICAgaWYodGhpcy5za2lwQ0lEU2libGluZyh0b0VsKSl7XG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgbGl2ZSBjb21wb25lbnQgdXNlZCBpbiBhIHN0cmVhbSwgd2UgbWF5IG5lZWQgdG8gcmVvcmRlciBpdFxuICAgICAgICAgICAgdGhpcy5tYXliZVJlT3JkZXJTdHJlYW0oZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKERPTS5pc1BoeFN0aWNreShmcm9tRWwpKXtcbiAgICAgICAgICAgIFtQSFhfU0VTU0lPTiwgUEhYX1NUQVRJQywgUEhYX1JPT1RfSURdXG4gICAgICAgICAgICAgIC5tYXAoYXR0ciA9PiBbYXR0ciwgZnJvbUVsLmdldEF0dHJpYnV0ZShhdHRyKSwgdG9FbC5nZXRBdHRyaWJ1dGUoYXR0cildKVxuICAgICAgICAgICAgICAuZm9yRWFjaCgoW2F0dHIsIGZyb21WYWwsIHRvVmFsXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRvVmFsICYmIGZyb21WYWwgIT09IHRvVmFsKXsgZnJvbUVsLnNldEF0dHJpYnV0ZShhdHRyLCB0b1ZhbCkgfVxuICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoRE9NLmlzSWdub3JlZChmcm9tRWwsIHBoeFVwZGF0ZSkgfHwgKGZyb21FbC5mb3JtICYmIGZyb21FbC5mb3JtLmlzU2FtZU5vZGUoZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkKSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiBET00uaXNJZ25vcmVkKGZyb21FbCwgcGh4VXBkYXRlKX0pXG4gICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZnJvbUVsLnR5cGUgPT09IFwibnVtYmVyXCIgJiYgKGZyb21FbC52YWxpZGl0eSAmJiBmcm9tRWwudmFsaWRpdHkuYmFkSW5wdXQpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBoYXMgUEhYX1JFRl9TUkMsIGl0IGlzIGxvYWRpbmcgb3IgbG9ja2VkIGFuZCBhd2FpdGluZyBhbiBhY2suXG4gICAgICAgICAgLy8gSWYgaXQncyBsb2NrZWQsIHdlIGNsb25lIHRoZSBmcm9tRWwgdHJlZSBhbmQgaW5zdHJ1Y3QgbW9ycGhkb20gdG8gdXNlXG4gICAgICAgICAgLy8gdGhlIGNsb25lZCB0cmVlIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIG1vcnBoIGZvciB0aGlzIGJyYW5jaCBmcm9tIGhlcmUgb24gb3V0LlxuICAgICAgICAgIC8vIFdlIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGNsb25lZCB0cmVlIGluIHRoZSBlbGVtZW50J3MgcHJpdmF0ZSBkYXRhLCBhbmRcbiAgICAgICAgICAvLyBvbiBhY2sgKHZpZXcudW5kb1JlZnMpLCB3ZSBtb3JwaCB0aGUgY2xvbmVkIHRyZWUgd2l0aCB0aGUgdHJ1ZSBmcm9tRWwgaW4gdGhlIERPTSB0b1xuICAgICAgICAgIC8vIGFwcGx5IGFueSBjaGFuZ2VzIHRoYXQgaGFwcGVuZWQgd2hpbGUgdGhlIGVsZW1lbnQgd2FzIGxvY2tlZC5cbiAgICAgICAgICBsZXQgaXNGb2N1c2VkRm9ybUVsID0gZm9jdXNlZCAmJiBmcm9tRWwuaXNTYW1lTm9kZShmb2N1c2VkKSAmJiBET00uaXNGb3JtSW5wdXQoZnJvbUVsKVxuICAgICAgICAgIGxldCBmb2N1c2VkU2VsZWN0Q2hhbmdlZCA9IGlzRm9jdXNlZEZvcm1FbCAmJiB0aGlzLmlzQ2hhbmdlZFNlbGVjdChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgLy8gb25seSBwZXJmb3JtIHRoZSBjbG9uZSBzdGVwIGlmIHRoaXMgaXMgbm90IGEgcGF0Y2ggdGhhdCB1bmxvY2tzXG4gICAgICAgICAgaWYoZnJvbUVsLmhhc0F0dHJpYnV0ZShQSFhfUkVGX1NSQykgJiYgZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfUkVGX0xPQ0spICE9IHRoaXMudW5kb1JlZil7XG4gICAgICAgICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXtcbiAgICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSlcbiAgICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICBsZXQgaXNMb2NrZWQgPSBmcm9tRWwuaGFzQXR0cmlidXRlKFBIWF9SRUZfTE9DSylcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IGlzTG9ja2VkID8gRE9NLnByaXZhdGUoZnJvbUVsLCBQSFhfUkVGX0xPQ0spIHx8IGZyb21FbC5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsXG4gICAgICAgICAgICBpZihjbG9uZSl7XG4gICAgICAgICAgICAgIERPTS5wdXRQcml2YXRlKGZyb21FbCwgUEhYX1JFRl9MT0NLLCBjbG9uZSlcbiAgICAgICAgICAgICAgaWYoIWlzRm9jdXNlZEZvcm1FbCl7XG4gICAgICAgICAgICAgICAgZnJvbUVsID0gY2xvbmVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgICAgICAgaWYoRE9NLmlzUGh4Q2hpbGQodG9FbCkpe1xuICAgICAgICAgICAgbGV0IHByZXZTZXNzaW9uID0gZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTilcbiAgICAgICAgICAgIERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2V4Y2x1ZGU6IFtQSFhfU1RBVElDXX0pXG4gICAgICAgICAgICBpZihwcmV2U2Vzc2lvbiAhPT0gXCJcIil7IGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIHByZXZTZXNzaW9uKSB9XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3RJRClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaW5wdXQgaGFuZGxpbmdcbiAgICAgICAgICBET00uY29weVByaXZhdGVzKHRvRWwsIGZyb21FbClcblxuICAgICAgICAgIC8vIHNraXAgcGF0Y2hpbmcgZm9jdXNlZCBpbnB1dHMgdW5sZXNzIGZvY3VzIGlzIGEgc2VsZWN0IHRoYXQgaGFzIGNoYW5nZWQgb3B0aW9uc1xuICAgICAgICAgIGlmKGlzRm9jdXNlZEZvcm1FbCAmJiBmcm9tRWwudHlwZSAhPT0gXCJoaWRkZW5cIiAmJiAhZm9jdXNlZFNlbGVjdENoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKGZyb21FbClcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBibHVyIGZvY3VzZWQgc2VsZWN0IGlmIGl0IGNoYW5nZWQgc28gbmF0aXZlIFVJIGlzIHVwZGF0ZWQgKGllIHNhZmFyaSB3b24ndCB1cGRhdGUgdmlzaWJsZSBvcHRpb25zKVxuICAgICAgICAgICAgaWYoZm9jdXNlZFNlbGVjdENoYW5nZWQpeyBmcm9tRWwuYmx1cigpIH1cbiAgICAgICAgICAgIGlmKERPTS5pc1BoeFVwZGF0ZSh0b0VsLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIl0pKXtcbiAgICAgICAgICAgICAgYXBwZW5kUHJlcGVuZFVwZGF0ZXMucHVzaChuZXcgRE9NUG9zdE1vcnBoUmVzdG9yZXIoZnJvbUVsLCB0b0VsLCB0b0VsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRE9NLnN5bmNBdHRyc1RvUHJvcHModG9FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnModG9FbClcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIHJldHVybiBmcm9tRWxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1vcnBoZG9tKHRhcmdldENvbnRhaW5lciwgc291cmNlLCBtb3JwaENhbGxiYWNrcylcbiAgICB9XG5cbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgY29udGFpbmVyKVxuICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGNvbnRhaW5lciwgY29udGFpbmVyKVxuXG4gICAgbGl2ZVNvY2tldC50aW1lKFwibW9ycGhkb21cIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdHJlYW1zLmZvckVhY2goKFtyZWYsIGluc2VydHMsIGRlbGV0ZUlkcywgcmVzZXRdKSA9PiB7XG4gICAgICAgIGluc2VydHMuZm9yRWFjaCgoW2tleSwgc3RyZWFtQXQsIGxpbWl0XSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RyZWFtSW5zZXJ0c1trZXldID0ge3JlZiwgc3RyZWFtQXQsIGxpbWl0LCByZXNldH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYocmVzZXQgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgRE9NLmFsbChjb250YWluZXIsIGBbJHtQSFhfU1RSRUFNX1JFRn09XCIke3JlZn1cIl1gLCBjaGlsZCA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZUlkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICBsZXQgY2hpbGQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtpZH1cIl1gKVxuICAgICAgICAgIGlmKGNoaWxkKXsgdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQoY2hpbGQpIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIC8vIGNsZWFyIHN0cmVhbSBpdGVtcyBmcm9tIHRoZSBkZWFkIHJlbmRlciBpZiB0aGV5IGFyZSBub3QgaW5zZXJ0ZWQgYWdhaW5cbiAgICAgIGlmKGlzSm9pblBhdGNoKXtcbiAgICAgICAgRE9NLmFsbCh0aGlzLmNvbnRhaW5lciwgYFske3BoeFVwZGF0ZX09JHtQSFhfU1RSRUFNfV1gLCBlbCA9PiB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRvIG9ubHkgcmVtb3ZlIGVsZW1lbnRzIG93bmVkIGJ5IHRoZSBjdXJyZW50IHZpZXdcbiAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peF9saXZlX3ZpZXcvaXNzdWVzLzMwNDdcbiAgICAgICAgICB0aGlzLmxpdmVTb2NrZXQub3duZXIoZWwsICh2aWV3KSA9PiB7XG4gICAgICAgICAgICBpZih2aWV3ID09PSB0aGlzLnZpZXcpe1xuICAgICAgICAgICAgICBBcnJheS5mcm9tKGVsLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBtb3JwaC5jYWxsKHRoaXMsIHRhcmdldENvbnRhaW5lciwgaHRtbClcbiAgICB9KVxuXG4gICAgaWYobGl2ZVNvY2tldC5pc0RlYnVnRW5hYmxlZCgpKXtcbiAgICAgIGRldGVjdER1cGxpY2F0ZUlkcygpXG4gICAgICBkZXRlY3RJbnZhbGlkU3RyZWFtSW5zZXJ0cyh0aGlzLnN0cmVhbUluc2VydHMpXG4gICAgICAvLyB3YXJuIGlmIHRoZXJlIGFyZSBhbnkgaW5wdXRzIG5hbWVkIFwiaWRcIlxuICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZT1pZF1cIikpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIGlmKG5vZGUuZm9ybSl7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkRldGVjdGVkIGFuIGlucHV0IHdpdGggbmFtZT1cXFwiaWRcXFwiIGluc2lkZSBhIGZvcm0hIFRoaXMgd2lsbCBjYXVzZSBwcm9ibGVtcyB3aGVuIHBhdGNoaW5nIHRoZSBET00uXFxuXCIsIG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYoYXBwZW5kUHJlcGVuZFVwZGF0ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsaXZlU29ja2V0LnRpbWUoXCJwb3N0LW1vcnBoIGFwcGVuZC9wcmVwZW5kIHJlc3RvcmF0aW9uXCIsICgpID0+IHtcbiAgICAgICAgYXBwZW5kUHJlcGVuZFVwZGF0ZXMuZm9yRWFjaCh1cGRhdGUgPT4gdXBkYXRlLnBlcmZvcm0oKSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgbGl2ZVNvY2tldC5zaWxlbmNlRXZlbnRzKCgpID0+IERPTS5yZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkpXG4gICAgRE9NLmRpc3BhdGNoRXZlbnQoZG9jdW1lbnQsIFwicGh4OnVwZGF0ZVwiKVxuICAgIGFkZGVkLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwiYWRkZWRcIiwgZWwpKVxuICAgIHVwZGF0ZXMuZm9yRWFjaChlbCA9PiB0aGlzLnRyYWNrQWZ0ZXIoXCJ1cGRhdGVkXCIsIGVsKSlcblxuICAgIHRoaXMudHJhbnNpdGlvblBlbmRpbmdSZW1vdmVzKClcblxuICAgIGlmKGV4dGVybmFsRm9ybVRyaWdnZXJlZCl7XG4gICAgICBsaXZlU29ja2V0LnVubG9hZCgpXG4gICAgICAvLyB1c2UgcHJvdG90eXBlJ3Mgc3VibWl0IGluIGNhc2UgdGhlcmUncyBhIGZvcm0gY29udHJvbCB3aXRoIG5hbWUgb3IgaWQgb2YgXCJzdWJtaXRcIlxuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxGb3JtRWxlbWVudC9zdWJtaXRcbiAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihleHRlcm5hbEZvcm1UcmlnZ2VyZWQpLnN1Ym1pdC5jYWxsKGV4dGVybmFsRm9ybVRyaWdnZXJlZClcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG9uTm9kZURpc2NhcmRlZChlbCl7XG4gICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICBpZihET00uaXNQaHhDaGlsZChlbCkgfHwgRE9NLmlzUGh4U3RpY2t5KGVsKSl7IHRoaXMubGl2ZVNvY2tldC5kZXN0cm95Vmlld0J5RWwoZWwpIH1cbiAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJkaXNjYXJkZWRcIiwgZWwpXG4gIH1cblxuICBtYXliZVBlbmRpbmdSZW1vdmUobm9kZSl7XG4gICAgaWYobm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5waHhSZW1vdmUpICE9PSBudWxsKXtcbiAgICAgIHRoaXMucGVuZGluZ1JlbW92ZXMucHVzaChub2RlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKXtcbiAgICAvLyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBub2RlIGlmIGl0IGlzIGFjdHVhbGx5IHJlLWFkZGVkIGluIHRoZSBzYW1lIHBhdGNoXG4gICAgLy8gd2UgZG8gTk9UIHdhbnQgdG8gZXhlY3V0ZSBwaHgtcmVtb3ZlLCB3ZSBkbyBOT1Qgd2FudCB0byBjYWxsIG9uTm9kZURpc2NhcmRlZFxuICAgIGlmKHRoaXMuc3RyZWFtSW5zZXJ0c1tjaGlsZC5pZF0pe1xuICAgICAgdGhpcy5zdHJlYW1Db21wb25lbnRSZXN0b3JlW2NoaWxkLmlkXSA9IGNoaWxkXG4gICAgICBjaGlsZC5yZW1vdmUoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvbmx5IHJlbW92ZSB0aGUgZWxlbWVudCBub3cgaWYgaXQgaGFzIG5vIHBoeC1yZW1vdmUgYmluZGluZ1xuICAgICAgaWYoIXRoaXMubWF5YmVQZW5kaW5nUmVtb3ZlKGNoaWxkKSl7XG4gICAgICAgIGNoaWxkLnJlbW92ZSgpXG4gICAgICAgIHRoaXMub25Ob2RlRGlzY2FyZGVkKGNoaWxkKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN0cmVhbUluc2VydChlbCl7XG4gICAgbGV0IGluc2VydCA9IGVsLmlkID8gdGhpcy5zdHJlYW1JbnNlcnRzW2VsLmlkXSA6IHt9XG4gICAgcmV0dXJuIGluc2VydCB8fCB7fVxuICB9XG5cbiAgc2V0U3RyZWFtUmVmKGVsLCByZWYpe1xuICAgIERPTS5wdXRTdGlja3koZWwsIFBIWF9TVFJFQU1fUkVGLCBlbCA9PiBlbC5zZXRBdHRyaWJ1dGUoUEhYX1NUUkVBTV9SRUYsIHJlZikpXG4gIH1cblxuICBtYXliZVJlT3JkZXJTdHJlYW0oZWwsIGlzTmV3KXtcbiAgICBsZXQge3JlZiwgc3RyZWFtQXQsIHJlc2V0fSA9IHRoaXMuZ2V0U3RyZWFtSW5zZXJ0KGVsKVxuICAgIGlmKHN0cmVhbUF0ID09PSB1bmRlZmluZWQpeyByZXR1cm4gfVxuXG4gICAgLy8gd2UgbmVlZCB0byBzZXQgdGhlIFBIWF9TVFJFQU1fUkVGIGhlcmUgYXMgd2VsbCBhcyBhZGRDaGlsZCBpcyBpbnZva2VkIG9ubHkgZm9yIHBhcmVudHNcbiAgICB0aGlzLnNldFN0cmVhbVJlZihlbCwgcmVmKVxuXG4gICAgaWYoIXJlc2V0ICYmICFpc05ldyl7XG4gICAgICAvLyB3ZSBvbmx5IHJlb3JkZXIgaWYgdGhlIGVsZW1lbnQgaXMgbmV3IG9yIGl0J3MgYSBzdHJlYW0gcmVzZXRcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHRoZSBlbGVtZW50IGhhcyBhIHBhcmVudCBlbGVtZW50O1xuICAgIC8vIGl0IGRvZXNuJ3QgaWYgd2UgYXJlIGN1cnJlbnRseSByZWN1cnNpdmVseSBtb3JwaGluZyAocmVzdG9yaW5nIGEgc2F2ZWQgc3RyZWFtIGNoaWxkKVxuICAgIC8vIGJlY2F1c2UgdGhlIGVsZW1lbnQgaXMgbm90IHlldCBhZGRlZCB0byB0aGUgcmVhbCBkb207XG4gICAgLy8gcmVvcmRlcmluZyBkb2VzIG5vdCBtYWtlIHNlbnNlIGluIHRoYXQgY2FzZSBhbnl3YXlcbiAgICBpZighZWwucGFyZW50RWxlbWVudCl7IHJldHVybiB9XG5cbiAgICBpZihzdHJlYW1BdCA9PT0gMCl7XG4gICAgICBlbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShlbCwgZWwucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZClcbiAgICB9IGVsc2UgaWYoc3RyZWFtQXQgPiAwKXtcbiAgICAgIGxldCBjaGlsZHJlbiA9IEFycmF5LmZyb20oZWwucGFyZW50RWxlbWVudC5jaGlsZHJlbilcbiAgICAgIGxldCBvbGRJbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoZWwpXG4gICAgICBpZihzdHJlYW1BdCA+PSBjaGlsZHJlbi5sZW5ndGggLSAxKXtcbiAgICAgICAgZWwucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzaWJsaW5nID0gY2hpbGRyZW5bc3RyZWFtQXRdXG4gICAgICAgIGlmKG9sZEluZGV4ID4gc3RyZWFtQXQpe1xuICAgICAgICAgIGVsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGVsLCBzaWJsaW5nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGVsLCBzaWJsaW5nLm5leHRFbGVtZW50U2libGluZylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWF5YmVMaW1pdFN0cmVhbShlbClcbiAgfVxuXG4gIG1heWJlTGltaXRTdHJlYW0oZWwpe1xuICAgIGxldCB7bGltaXR9ID0gdGhpcy5nZXRTdHJlYW1JbnNlcnQoZWwpXG4gICAgbGV0IGNoaWxkcmVuID0gbGltaXQgIT09IG51bGwgJiYgQXJyYXkuZnJvbShlbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgIGlmKGxpbWl0ICYmIGxpbWl0IDwgMCAmJiBjaGlsZHJlbi5sZW5ndGggPiBsaW1pdCAqIC0xKXtcbiAgICAgIGNoaWxkcmVuLnNsaWNlKDAsIGNoaWxkcmVuLmxlbmd0aCArIGxpbWl0KS5mb3JFYWNoKGNoaWxkID0+IHRoaXMucmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKSlcbiAgICB9IGVsc2UgaWYobGltaXQgJiYgbGltaXQgPj0gMCAmJiBjaGlsZHJlbi5sZW5ndGggPiBsaW1pdCl7XG4gICAgICBjaGlsZHJlbi5zbGljZShsaW1pdCkuZm9yRWFjaChjaGlsZCA9PiB0aGlzLnJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZCkpXG4gICAgfVxuICB9XG5cbiAgdHJhbnNpdGlvblBlbmRpbmdSZW1vdmVzKCl7XG4gICAgbGV0IHtwZW5kaW5nUmVtb3ZlcywgbGl2ZVNvY2tldH0gPSB0aGlzXG4gICAgaWYocGVuZGluZ1JlbW92ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsaXZlU29ja2V0LnRyYW5zaXRpb25SZW1vdmVzKHBlbmRpbmdSZW1vdmVzLCAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdSZW1vdmVzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGxldCBjaGlsZCA9IERPTS5maXJzdFBoeENoaWxkKGVsKVxuICAgICAgICAgIGlmKGNoaWxkKXsgbGl2ZVNvY2tldC5kZXN0cm95Vmlld0J5RWwoY2hpbGQpIH1cbiAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJ0cmFuc2l0aW9uc0Rpc2NhcmRlZFwiLCBwZW5kaW5nUmVtb3ZlcylcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaXNDaGFuZ2VkU2VsZWN0KGZyb21FbCwgdG9FbCl7XG4gICAgaWYoIShmcm9tRWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkgfHwgZnJvbUVsLm11bHRpcGxlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZihmcm9tRWwub3B0aW9ucy5sZW5ndGggIT09IHRvRWwub3B0aW9ucy5sZW5ndGgpeyByZXR1cm4gdHJ1ZSB9XG5cbiAgICAvLyBrZWVwIHRoZSBjdXJyZW50IHZhbHVlXG4gICAgdG9FbC52YWx1ZSA9IGZyb21FbC52YWx1ZVxuXG4gICAgLy8gaW4gZ2VuZXJhbCB3ZSBoYXZlIHRvIGJlIHZlcnkgY2FyZWZ1bCB3aXRoIHVzaW5nIGlzRXF1YWxOb2RlIGFzIGl0IGRvZXMgbm90IGEgcmVsaWFibGVcbiAgICAvLyBET00gdHJlZSBlcXVhbGl0eSBjaGVjaywgYnV0IGZvciBzZWxlY3Rpb24gYXR0cmlidXRlcyBhbmQgb3B0aW9ucyBpdCB3b3JrcyBmaW5lXG4gICAgcmV0dXJuICFmcm9tRWwuaXNFcXVhbE5vZGUodG9FbClcbiAgfVxuXG4gIGlzQ0lEUGF0Y2goKXsgcmV0dXJuIHRoaXMuY2lkUGF0Y2ggfVxuXG4gIHNraXBDSURTaWJsaW5nKGVsKXtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGVsLmhhc0F0dHJpYnV0ZShQSFhfU0tJUClcbiAgfVxuXG4gIHRhcmdldENJRENvbnRhaW5lcihodG1sKXtcbiAgICBpZighdGhpcy5pc0NJRFBhdGNoKCkpeyByZXR1cm4gfVxuICAgIGxldCBbZmlyc3QsIC4uLnJlc3RdID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmNvbnRhaW5lciwgdGhpcy50YXJnZXRDSUQpXG4gICAgaWYocmVzdC5sZW5ndGggPT09IDAgJiYgRE9NLmNoaWxkTm9kZUxlbmd0aChodG1sKSA9PT0gMSl7XG4gICAgICByZXR1cm4gZmlyc3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZpcnN0ICYmIGZpcnN0LnBhcmVudE5vZGVcbiAgICB9XG4gIH1cblxuICBpbmRleE9mKHBhcmVudCwgY2hpbGQpeyByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmluZGV4T2YoY2hpbGQpIH1cbn1cbiIsICJpbXBvcnQge1xuICBDT01QT05FTlRTLFxuICBEWU5BTUlDUyxcbiAgVEVNUExBVEVTLFxuICBFVkVOVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9TS0lQLFxuICBQSFhfTUFHSUNfSUQsXG4gIFJFUExZLFxuICBTVEFUSUMsXG4gIFRJVExFLFxuICBTVFJFQU0sXG4gIFJPT1QsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGlzT2JqZWN0LFxuICBsb2dFcnJvcixcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuY29uc3QgVk9JRF9UQUdTID0gbmV3IFNldChbXG4gIFwiYXJlYVwiLFxuICBcImJhc2VcIixcbiAgXCJiclwiLFxuICBcImNvbFwiLFxuICBcImNvbW1hbmRcIixcbiAgXCJlbWJlZFwiLFxuICBcImhyXCIsXG4gIFwiaW1nXCIsXG4gIFwiaW5wdXRcIixcbiAgXCJrZXlnZW5cIixcbiAgXCJsaW5rXCIsXG4gIFwibWV0YVwiLFxuICBcInBhcmFtXCIsXG4gIFwic291cmNlXCIsXG4gIFwidHJhY2tcIixcbiAgXCJ3YnJcIlxuXSlcbmNvbnN0IHF1b3RlQ2hhcnMgPSBuZXcgU2V0KFtcIidcIiwgXCJcXFwiXCJdKVxuXG5leHBvcnQgbGV0IG1vZGlmeVJvb3QgPSAoaHRtbCwgYXR0cnMsIGNsZWFySW5uZXJIVE1MKSA9PiB7XG4gIGxldCBpID0gMFxuICBsZXQgaW5zaWRlQ29tbWVudCA9IGZhbHNlXG4gIGxldCBiZWZvcmVUYWcsIGFmdGVyVGFnLCB0YWcsIHRhZ05hbWVFbmRzQXQsIGlkLCBuZXdIVE1MXG5cbiAgbGV0IGxvb2thaGVhZCA9IGh0bWwubWF0Y2goL14oXFxzKig/OjwhLS0uKj8tLT5cXHMqKSopPChbXlxcc1xcLz5dKykvKVxuICBpZihsb29rYWhlYWQgPT09IG51bGwpeyB0aHJvdyBuZXcgRXJyb3IoYG1hbGZvcm1lZCBodG1sICR7aHRtbH1gKSB9XG5cbiAgaSA9IGxvb2thaGVhZFswXS5sZW5ndGhcbiAgYmVmb3JlVGFnID0gbG9va2FoZWFkWzFdXG4gIHRhZyA9IGxvb2thaGVhZFsyXVxuICB0YWdOYW1lRW5kc0F0ID0gaVxuXG4gIC8vIFNjYW4gdGhlIG9wZW5pbmcgdGFnIGZvciBpZCwgaWYgdGhlcmUgaXMgYW55XG4gIGZvcihpOyBpIDwgaHRtbC5sZW5ndGg7IGkrKyl7XG4gICAgaWYoaHRtbC5jaGFyQXQoaSkgPT09IFwiPlwiICl7IGJyZWFrIH1cbiAgICBpZihodG1sLmNoYXJBdChpKSA9PT0gXCI9XCIpe1xuICAgICAgbGV0IGlzSWQgPSBodG1sLnNsaWNlKGkgLSAzLCBpKSA9PT0gXCIgaWRcIlxuICAgICAgaSsrXG4gICAgICBsZXQgY2hhciA9IGh0bWwuY2hhckF0KGkpXG4gICAgICBpZihxdW90ZUNoYXJzLmhhcyhjaGFyKSl7XG4gICAgICAgIGxldCBhdHRyU3RhcnRzQXQgPSBpXG4gICAgICAgIGkrK1xuICAgICAgICBmb3IoaTsgaSA8IGh0bWwubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGlmKGh0bWwuY2hhckF0KGkpID09PSBjaGFyKXsgYnJlYWsgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGlzSWQpe1xuICAgICAgICAgIGlkID0gaHRtbC5zbGljZShhdHRyU3RhcnRzQXQgKyAxLCBpKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgY2xvc2VBdCA9IGh0bWwubGVuZ3RoIC0gMVxuICBpbnNpZGVDb21tZW50ID0gZmFsc2VcbiAgd2hpbGUoY2xvc2VBdCA+PSBiZWZvcmVUYWcubGVuZ3RoICsgdGFnLmxlbmd0aCl7XG4gICAgbGV0IGNoYXIgPSBodG1sLmNoYXJBdChjbG9zZUF0KVxuICAgIGlmKGluc2lkZUNvbW1lbnQpe1xuICAgICAgaWYoY2hhciA9PT0gXCItXCIgJiYgaHRtbC5zbGljZShjbG9zZUF0IC0gMywgY2xvc2VBdCkgPT09IFwiPCEtXCIpe1xuICAgICAgICBpbnNpZGVDb21tZW50ID0gZmFsc2VcbiAgICAgICAgY2xvc2VBdCAtPSA0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbG9zZUF0IC09IDFcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoY2hhciA9PT0gXCI+XCIgJiYgaHRtbC5zbGljZShjbG9zZUF0IC0gMiwgY2xvc2VBdCkgPT09IFwiLS1cIil7XG4gICAgICBpbnNpZGVDb21tZW50ID0gdHJ1ZVxuICAgICAgY2xvc2VBdCAtPSAzXG4gICAgfSBlbHNlIGlmKGNoYXIgPT09IFwiPlwiKXtcbiAgICAgIGJyZWFrXG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlQXQgLT0gMVxuICAgIH1cbiAgfVxuICBhZnRlclRhZyA9IGh0bWwuc2xpY2UoY2xvc2VBdCArIDEsIGh0bWwubGVuZ3RoKVxuXG4gIGxldCBhdHRyc1N0ciA9XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpXG4gICAgICAubWFwKGF0dHIgPT4gYXR0cnNbYXR0cl0gPT09IHRydWUgPyBhdHRyIDogYCR7YXR0cn09XCIke2F0dHJzW2F0dHJdfVwiYClcbiAgICAgIC5qb2luKFwiIFwiKVxuXG4gIGlmKGNsZWFySW5uZXJIVE1MKXtcbiAgICAvLyBLZWVwIHRoZSBpZCBpZiBhbnlcbiAgICBsZXQgaWRBdHRyU3RyID0gaWQgPyBgIGlkPVwiJHtpZH1cImAgOiBcIlwiXG4gICAgaWYoVk9JRF9UQUdTLmhhcyh0YWcpKXtcbiAgICAgIG5ld0hUTUwgPSBgPCR7dGFnfSR7aWRBdHRyU3RyfSR7YXR0cnNTdHIgPT09IFwiXCIgPyBcIlwiIDogXCIgXCJ9JHthdHRyc1N0cn0vPmBcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3SFRNTCA9IGA8JHt0YWd9JHtpZEF0dHJTdHJ9JHthdHRyc1N0ciA9PT0gXCJcIiA/IFwiXCIgOiBcIiBcIn0ke2F0dHJzU3RyfT48LyR7dGFnfT5gXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCByZXN0ID0gaHRtbC5zbGljZSh0YWdOYW1lRW5kc0F0LCBjbG9zZUF0ICsgMSlcbiAgICBuZXdIVE1MID0gYDwke3RhZ30ke2F0dHJzU3RyID09PSBcIlwiID8gXCJcIiA6IFwiIFwifSR7YXR0cnNTdHJ9JHtyZXN0fWBcbiAgfVxuXG4gIHJldHVybiBbbmV3SFRNTCwgYmVmb3JlVGFnLCBhZnRlclRhZ11cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZWQge1xuICBzdGF0aWMgZXh0cmFjdChkaWZmKXtcbiAgICBsZXQge1tSRVBMWV06IHJlcGx5LCBbRVZFTlRTXTogZXZlbnRzLCBbVElUTEVdOiB0aXRsZX0gPSBkaWZmXG4gICAgZGVsZXRlIGRpZmZbUkVQTFldXG4gICAgZGVsZXRlIGRpZmZbRVZFTlRTXVxuICAgIGRlbGV0ZSBkaWZmW1RJVExFXVxuICAgIHJldHVybiB7ZGlmZiwgdGl0bGUsIHJlcGx5OiByZXBseSB8fCBudWxsLCBldmVudHM6IGV2ZW50cyB8fCBbXX1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXdJZCwgcmVuZGVyZWQpe1xuICAgIHRoaXMudmlld0lkID0gdmlld0lkXG4gICAgdGhpcy5yZW5kZXJlZCA9IHt9XG4gICAgdGhpcy5tYWdpY0lkID0gMFxuICAgIHRoaXMubWVyZ2VEaWZmKHJlbmRlcmVkKVxuICB9XG5cbiAgcGFyZW50Vmlld0lkKCl7IHJldHVybiB0aGlzLnZpZXdJZCB9XG5cbiAgdG9TdHJpbmcob25seUNpZHMpe1xuICAgIGxldCBbc3RyLCBzdHJlYW1zXSA9IHRoaXMucmVjdXJzaXZlVG9TdHJpbmcodGhpcy5yZW5kZXJlZCwgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMsIHRydWUsIHt9KVxuICAgIHJldHVybiBbc3RyLCBzdHJlYW1zXVxuICB9XG5cbiAgcmVjdXJzaXZlVG9TdHJpbmcocmVuZGVyZWQsIGNvbXBvbmVudHMgPSByZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMsIGNoYW5nZVRyYWNraW5nLCByb290QXR0cnMpe1xuICAgIG9ubHlDaWRzID0gb25seUNpZHMgPyBuZXcgU2V0KG9ubHlDaWRzKSA6IG51bGxcbiAgICBsZXQgb3V0cHV0ID0ge2J1ZmZlcjogXCJcIiwgY29tcG9uZW50czogY29tcG9uZW50cywgb25seUNpZHM6IG9ubHlDaWRzLCBzdHJlYW1zOiBuZXcgU2V0KCl9XG4gICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgbnVsbCwgb3V0cHV0LCBjaGFuZ2VUcmFja2luZywgcm9vdEF0dHJzKVxuICAgIHJldHVybiBbb3V0cHV0LmJ1ZmZlciwgb3V0cHV0LnN0cmVhbXNdXG4gIH1cblxuICBjb21wb25lbnRDSURzKGRpZmYpeyByZXR1cm4gT2JqZWN0LmtleXMoZGlmZltDT01QT05FTlRTXSB8fCB7fSkubWFwKGkgPT4gcGFyc2VJbnQoaSkpIH1cblxuICBpc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpe1xuICAgIGlmKCFkaWZmW0NPTVBPTkVOVFNdKXsgcmV0dXJuIGZhbHNlIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGlmZikubGVuZ3RoID09PSAxXG4gIH1cblxuICBnZXRDb21wb25lbnQoZGlmZiwgY2lkKXsgcmV0dXJuIGRpZmZbQ09NUE9ORU5UU11bY2lkXSB9XG5cbiAgcmVzZXRSZW5kZXIoY2lkKXtcbiAgICAvLyB3ZSBhcmUgcmFjaW5nIGEgY29tcG9uZW50IGRlc3Ryb3ksIGl0IGNvdWxkIG5vdCBleGlzdCwgc29cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB3ZSBkb24ndCB0cnkgdG8gc2V0IHJlc2V0IG9uIHVuZGVmaW5lZFxuICAgIGlmKHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11bY2lkXSl7XG4gICAgICB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdW2NpZF0ucmVzZXQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgbWVyZ2VEaWZmKGRpZmYpe1xuICAgIGxldCBuZXdjID0gZGlmZltDT01QT05FTlRTXVxuICAgIGxldCBjYWNoZSA9IHt9XG4gICAgZGVsZXRlIGRpZmZbQ09NUE9ORU5UU11cbiAgICB0aGlzLnJlbmRlcmVkID0gdGhpcy5tdXRhYmxlTWVyZ2UodGhpcy5yZW5kZXJlZCwgZGlmZilcbiAgICB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSB8fCB7fVxuXG4gICAgaWYobmV3Yyl7XG4gICAgICBsZXQgb2xkYyA9IHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7XG4gICAgICAgIG5ld2NbY2lkXSA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChjaWQsIG5ld2NbY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgY2lkIGluIG5ld2MpeyBvbGRjW2NpZF0gPSBuZXdjW2NpZF0gfVxuICAgICAgZGlmZltDT01QT05FTlRTXSA9IG5ld2NcbiAgICB9XG4gIH1cblxuICBjYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgY2RpZmYsIG9sZGMsIG5ld2MsIGNhY2hlKXtcbiAgICBpZihjYWNoZVtjaWRdKXtcbiAgICAgIHJldHVybiBjYWNoZVtjaWRdXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZGlmZiwgc3RhdCwgc2NpZCA9IGNkaWZmW1NUQVRJQ11cblxuICAgICAgaWYoaXNDaWQoc2NpZCkpe1xuICAgICAgICBsZXQgdGRpZmZcblxuICAgICAgICBpZihzY2lkID4gMCl7XG4gICAgICAgICAgdGRpZmYgPSB0aGlzLmNhY2hlZEZpbmRDb21wb25lbnQoc2NpZCwgbmV3Y1tzY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGRpZmYgPSBvbGRjWy1zY2lkXVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdCA9IHRkaWZmW1NUQVRJQ11cbiAgICAgICAgbmRpZmYgPSB0aGlzLmNsb25lTWVyZ2UodGRpZmYsIGNkaWZmLCB0cnVlKVxuICAgICAgICBuZGlmZltTVEFUSUNdID0gc3RhdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmRpZmYgPSBjZGlmZltTVEFUSUNdICE9PSB1bmRlZmluZWQgfHwgb2xkY1tjaWRdID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgIGNkaWZmIDogdGhpcy5jbG9uZU1lcmdlKG9sZGNbY2lkXSwgY2RpZmYsIGZhbHNlKVxuICAgICAgfVxuXG4gICAgICBjYWNoZVtjaWRdID0gbmRpZmZcbiAgICAgIHJldHVybiBuZGlmZlxuICAgIH1cbiAgfVxuXG4gIG11dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1NUQVRJQ10gIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gc291cmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2UpXG4gICAgICByZXR1cm4gdGFyZ2V0XG4gICAgfVxuICB9XG5cbiAgZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgbGV0IGlzT2JqVmFsID0gaXNPYmplY3QodmFsKVxuICAgICAgaWYoaXNPYmpWYWwgJiYgdmFsW1NUQVRJQ10gPT09IHVuZGVmaW5lZCAmJiBpc09iamVjdCh0YXJnZXRWYWwpKXtcbiAgICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRhcmdldFtST09UXSl7XG4gICAgICB0YXJnZXQubmV3UmVuZGVyID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIE1lcmdlcyBjaWQgdHJlZXMgdG9nZXRoZXIsIGNvcHlpbmcgc3RhdGljcyBmcm9tIHNvdXJjZSB0cmVlLlxuICAvL1xuICAvLyBUaGUgYHBydW5lTWFnaWNJZGAgaXMgcGFzc2VkIHRvIGNvbnRyb2wgcHJ1bmluZyB0aGUgbWFnaWNJZCBvZiB0aGVcbiAgLy8gdGFyZ2V0LiBXZSBtdXN0IGFsd2F5cyBwcnVuZSB0aGUgbWFnaWNJZCB3aGVuIHdlIGFyZSBzaGFyaW5nIHN0YXRpY3NcbiAgLy8gZnJvbSBhbm90aGVyIGNvbXBvbmVudC4gSWYgbm90IHBydW5pbmcsIHdlIHJlcGxpY2F0ZSB0aGUgbG9naWMgZnJvbVxuICAvLyBtdXRhYmxlTWVyZ2UsIHdoZXJlIHdlIHNldCBuZXdSZW5kZXIgdG8gdHJ1ZSBpZiB0aGVyZSBpcyBhIHJvb3RcbiAgLy8gKGVmZmVjdGl2ZWx5IGZvcmNpbmcgdGhlIG5ldyB2ZXJzaW9uIHRvIGJlIHJlbmRlcmVkIGluc3RlYWQgb2Ygc2tpcHBlZClcbiAgLy9cbiAgY2xvbmVNZXJnZSh0YXJnZXQsIHNvdXJjZSwgcHJ1bmVNYWdpY0lkKXtcbiAgICBsZXQgbWVyZ2VkID0gey4uLnRhcmdldCwgLi4uc291cmNlfVxuICAgIGZvcihsZXQga2V5IGluIG1lcmdlZCl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuY2xvbmVNZXJnZSh0YXJnZXRWYWwsIHZhbCwgcHJ1bmVNYWdpY0lkKVxuICAgICAgfSBlbHNlIGlmKHZhbCA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuY2xvbmVNZXJnZSh0YXJnZXRWYWwsIHt9LCBwcnVuZU1hZ2ljSWQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHBydW5lTWFnaWNJZCl7XG4gICAgICBkZWxldGUgbWVyZ2VkLm1hZ2ljSWRcbiAgICAgIGRlbGV0ZSBtZXJnZWQubmV3UmVuZGVyXG4gICAgfSBlbHNlIGlmKHRhcmdldFtST09UXSl7XG4gICAgICBtZXJnZWQubmV3UmVuZGVyID0gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkXG4gIH1cblxuICBjb21wb25lbnRUb1N0cmluZyhjaWQpe1xuICAgIGxldCBbc3RyLCBzdHJlYW1zXSA9IHRoaXMucmVjdXJzaXZlQ0lEVG9TdHJpbmcodGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgY2lkLCBudWxsKVxuICAgIGxldCBbc3RyaXBwZWRIVE1MLCBfYmVmb3JlLCBfYWZ0ZXJdID0gbW9kaWZ5Um9vdChzdHIsIHt9KVxuICAgIHJldHVybiBbc3RyaXBwZWRIVE1MLCBzdHJlYW1zXVxuICB9XG5cbiAgcHJ1bmVDSURzKGNpZHMpe1xuICAgIGNpZHMuZm9yRWFjaChjaWQgPT4gZGVsZXRlIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11bY2lkXSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBnZXQoKXsgcmV0dXJuIHRoaXMucmVuZGVyZWQgfVxuXG4gIGlzTmV3RmluZ2VycHJpbnQoZGlmZiA9IHt9KXsgcmV0dXJuICEhZGlmZltTVEFUSUNdIH1cblxuICB0ZW1wbGF0ZVN0YXRpYyhwYXJ0LCB0ZW1wbGF0ZXMpe1xuICAgIGlmKHR5cGVvZiAocGFydCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgcmV0dXJuIHRlbXBsYXRlc1twYXJ0XVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFydFxuICAgIH1cbiAgfVxuXG4gIG5leHRNYWdpY0lEKCl7XG4gICAgdGhpcy5tYWdpY0lkKytcbiAgICByZXR1cm4gYG0ke3RoaXMubWFnaWNJZH0tJHt0aGlzLnBhcmVudFZpZXdJZCgpfWBcbiAgfVxuXG4gIC8vIENvbnZlcnRzIHJlbmRlcmVkIHRyZWUgdG8gb3V0cHV0IGJ1ZmZlci5cbiAgLy9cbiAgLy8gY2hhbmdlVHJhY2tpbmcgY29udHJvbHMgaWYgd2UgY2FuIGFwcGx5IHRoZSBQSFhfU0tJUCBvcHRpbWl6YXRpb24uXG4gIC8vIEl0IGlzIGRpc2FibGVkIGZvciBjb21wcmVoZW5zaW9ucyBzaW5jZSB3ZSBtdXN0IHJlLXJlbmRlciB0aGUgZW50aXJlIGNvbGxlY3Rpb25cbiAgLy8gYW5kIG5vIGluZGl2aWR1YWwgZWxlbWVudCBpcyB0cmFja2VkIGluc2lkZSB0aGUgY29tcHJlaGVuc2lvbi5cbiAgdG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0LCBjaGFuZ2VUcmFja2luZywgcm9vdEF0dHJzID0ge30pe1xuICAgIGlmKHJlbmRlcmVkW0RZTkFNSUNTXSl7IHJldHVybiB0aGlzLmNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpIH1cbiAgICBsZXQge1tTVEFUSUNdOiBzdGF0aWNzfSA9IHJlbmRlcmVkXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuICAgIGxldCBpc1Jvb3QgPSByZW5kZXJlZFtST09UXVxuICAgIGxldCBwcmV2QnVmZmVyID0gb3V0cHV0LmJ1ZmZlclxuICAgIGlmKGlzUm9vdCl7IG91dHB1dC5idWZmZXIgPSBcIlwiIH1cblxuICAgIC8vIHRoaXMgY29uZGl0aW9uIGlzIGNhbGxlZCB3aGVuIGZpcnN0IHJlbmRlcmluZyBhbiBvcHRpbWl6YWJsZSBmdW5jdGlvbiBjb21wb25lbnQuXG4gICAgLy8gTEMgaGF2ZSB0aGVpciBtYWdpY0lkIHByZXZpb3VzbHkgc2V0XG4gICAgaWYoY2hhbmdlVHJhY2tpbmcgJiYgaXNSb290ICYmICFyZW5kZXJlZC5tYWdpY0lkKXtcbiAgICAgIHJlbmRlcmVkLm5ld1JlbmRlciA9IHRydWVcbiAgICAgIHJlbmRlcmVkLm1hZ2ljSWQgPSB0aGlzLm5leHRNYWdpY0lEKClcbiAgICB9XG5cbiAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbMF1cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICB0aGlzLmR5bmFtaWNUb0J1ZmZlcihyZW5kZXJlZFtpIC0gMV0sIHRlbXBsYXRlcywgb3V0cHV0LCBjaGFuZ2VUcmFja2luZylcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgIH1cblxuICAgIC8vIEFwcGxpZXMgdGhlIHJvb3QgdGFnIFwic2tpcFwiIG9wdGltaXphdGlvbiBpZiBzdXBwb3J0ZWQsIHdoaWNoIGNsZWFyc1xuICAgIC8vIHRoZSByb290IHRhZyBhdHRyaWJ1dGVzIGFuZCBpbm5lckhUTUwsIGFuZCBvbmx5IG1haW50YWlucyB0aGUgbWFnaWNJZC5cbiAgICAvLyBXZSBjYW4gb25seSBza2lwIHdoZW4gY2hhbmdlVHJhY2tpbmcgaXMgc3VwcG9ydGVkIChvdXRzaWRlIG9mIGEgY29tcHJlaGVuc2lvbiksXG4gICAgLy8gYW5kIHdoZW4gdGhlIHJvb3QgZWxlbWVudCBoYXNuJ3QgZXhwZXJpZW5jZWQgYW4gdW5yZW5kZXJlZCBtZXJnZSAobmV3UmVuZGVyIHRydWUpLlxuICAgIGlmKGlzUm9vdCl7XG4gICAgICBsZXQgc2tpcCA9IGZhbHNlXG4gICAgICBsZXQgYXR0cnNcbiAgICAgIC8vIFdoZW4gYSBMQyBpcyByZS1hZGRlZCB0byB0aGUgcGFnZSwgd2UgbmVlZCB0byByZS1yZW5kZXIgdGhlIGVudGlyZSBMQyB0cmVlLFxuICAgICAgLy8gdGhlcmVmb3JlIGNoYW5nZVRyYWNraW5nIGlzIGZhbHNlOyBob3dldmVyLCB3ZSBuZWVkIHRvIGtlZXAgYWxsIHRoZSBtYWdpY0lkc1xuICAgICAgLy8gZnJvbSBhbnkgZnVuY3Rpb24gY29tcG9uZW50IHNvIHRoZSBuZXh0IHRpbWUgdGhlIExDIGlzIHVwZGF0ZWQsIHdlIGNhbiBhcHBseVxuICAgICAgLy8gdGhlIHNraXAgb3B0aW1pemF0aW9uXG4gICAgICBpZihjaGFuZ2VUcmFja2luZyB8fCByZW5kZXJlZC5tYWdpY0lkKXtcbiAgICAgICAgc2tpcCA9IGNoYW5nZVRyYWNraW5nICYmICFyZW5kZXJlZC5uZXdSZW5kZXJcbiAgICAgICAgYXR0cnMgPSB7W1BIWF9NQUdJQ19JRF06IHJlbmRlcmVkLm1hZ2ljSWQsIC4uLnJvb3RBdHRyc31cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dHJzID0gcm9vdEF0dHJzXG4gICAgICB9XG4gICAgICBpZihza2lwKXsgYXR0cnNbUEhYX1NLSVBdID0gdHJ1ZSB9XG4gICAgICBsZXQgW25ld1Jvb3QsIGNvbW1lbnRCZWZvcmUsIGNvbW1lbnRBZnRlcl0gPSBtb2RpZnlSb290KG91dHB1dC5idWZmZXIsIGF0dHJzLCBza2lwKVxuICAgICAgcmVuZGVyZWQubmV3UmVuZGVyID0gZmFsc2VcbiAgICAgIG91dHB1dC5idWZmZXIgPSBwcmV2QnVmZmVyICsgY29tbWVudEJlZm9yZSArIG5ld1Jvb3QgKyBjb21tZW50QWZ0ZXJcbiAgICB9XG4gIH1cblxuICBjb21wcmVoZW5zaW9uVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KXtcbiAgICBsZXQge1tEWU5BTUlDU106IGR5bmFtaWNzLCBbU1RBVElDXTogc3RhdGljcywgW1NUUkVBTV06IHN0cmVhbX0gPSByZW5kZXJlZFxuICAgIGxldCBbX3JlZiwgX2luc2VydHMsIGRlbGV0ZUlkcywgcmVzZXRdID0gc3RyZWFtIHx8IFtudWxsLCB7fSwgW10sIG51bGxdXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuICAgIGxldCBjb21wVGVtcGxhdGVzID0gdGVtcGxhdGVzIHx8IHJlbmRlcmVkW1RFTVBMQVRFU11cbiAgICBmb3IobGV0IGQgPSAwOyBkIDwgZHluYW1pY3MubGVuZ3RoOyBkKyspe1xuICAgICAgbGV0IGR5bmFtaWMgPSBkeW5hbWljc1tkXVxuICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzWzBdXG4gICAgICBmb3IobGV0IGkgPSAxOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIC8vIEluc2lkZSBhIGNvbXByZWhlbnNpb24sIHdlIGRvbid0IHRyYWNrIGhvdyBkeW5hbWljcyBjaGFuZ2VcbiAgICAgICAgLy8gb3ZlciB0aW1lIChhbmQgZmVhdHVyZXMgbGlrZSBzdHJlYW1zIHdvdWxkIG1ha2UgdGhhdCBpbXBvc3NpYmxlXG4gICAgICAgIC8vIHVubGVzcyB3ZSBtb3ZlIHRoZSBzdHJlYW0gZGlmZmluZyBhd2F5IGZyb20gbW9ycGhkb20pLFxuICAgICAgICAvLyBzbyB3ZSBjYW4ndCBwZXJmb3JtIHJvb3QgY2hhbmdlIHRyYWNraW5nLlxuICAgICAgICBsZXQgY2hhbmdlVHJhY2tpbmcgPSBmYWxzZVxuICAgICAgICB0aGlzLmR5bmFtaWNUb0J1ZmZlcihkeW5hbWljW2kgLSAxXSwgY29tcFRlbXBsYXRlcywgb3V0cHV0LCBjaGFuZ2VUcmFja2luZylcbiAgICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzW2ldXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoc3RyZWFtICE9PSB1bmRlZmluZWQgJiYgKHJlbmRlcmVkW0RZTkFNSUNTXS5sZW5ndGggPiAwIHx8IGRlbGV0ZUlkcy5sZW5ndGggPiAwIHx8IHJlc2V0KSl7XG4gICAgICBkZWxldGUgcmVuZGVyZWRbU1RSRUFNXVxuICAgICAgcmVuZGVyZWRbRFlOQU1JQ1NdID0gW11cbiAgICAgIG91dHB1dC5zdHJlYW1zLmFkZChzdHJlYW0pXG4gICAgfVxuICB9XG5cbiAgZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCwgY2hhbmdlVHJhY2tpbmcpe1xuICAgIGlmKHR5cGVvZiAocmVuZGVyZWQpID09PSBcIm51bWJlclwiKXtcbiAgICAgIGxldCBbc3RyLCBzdHJlYW1zXSA9IHRoaXMucmVjdXJzaXZlQ0lEVG9TdHJpbmcob3V0cHV0LmNvbXBvbmVudHMsIHJlbmRlcmVkLCBvdXRwdXQub25seUNpZHMpXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0clxuICAgICAgb3V0cHV0LnN0cmVhbXMgPSBuZXcgU2V0KFsuLi5vdXRwdXQuc3RyZWFtcywgLi4uc3RyZWFtc10pXG4gICAgfSBlbHNlIGlmKGlzT2JqZWN0KHJlbmRlcmVkKSl7XG4gICAgICB0aGlzLnRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCwgY2hhbmdlVHJhY2tpbmcsIHt9KVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHJlbmRlcmVkXG4gICAgfVxuICB9XG5cbiAgcmVjdXJzaXZlQ0lEVG9TdHJpbmcoY29tcG9uZW50cywgY2lkLCBvbmx5Q2lkcyl7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbY2lkXSB8fCBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvciBDSUQgJHtjaWR9YCwgY29tcG9uZW50cylcbiAgICBsZXQgYXR0cnMgPSB7W1BIWF9DT01QT05FTlRdOiBjaWR9XG4gICAgbGV0IHNraXAgPSBvbmx5Q2lkcyAmJiAhb25seUNpZHMuaGFzKGNpZClcbiAgICAvLyBUd28gb3B0aW1pemF0aW9uIHBhdGhzIGFwcGx5IGhlcmU6XG4gICAgLy9cbiAgICAvLyAgIDEuIFRoZSBvbmx5Q2lkcyBvcHRpbWl6YXRpb24gd29ya3MgYnkgdGhlIHNlcnZlciBkaWZmIHRlbGxpbmcgdXMgb25seSBzcGVjaWZpY1xuICAgIC8vICAgICBjaWQncyBoYXZlIGNoYW5nZWQuIFRoaXMgYWxsb3dzIHVzIHRvIHNraXAgcmVuZGVyaW5nIGFueSBjb21wb25lbnQgdGhhdCBoYXNuJ3QgY2hhbmdlZCxcbiAgICAvLyAgICAgd2hpY2ggdWx0aW1hdGVseSBzZXRzIFBIWF9TS0lQIHJvb3QgYXR0cmlidXRlIGFuZCBhdm9pZHMgcmVuZGVyaW5nIHRoZSBpbm5lckhUTUwuXG4gICAgLy9cbiAgICAvLyAgIDIuIFRoZSByb290IFBIWF9TS0lQIG9wdGltaXphdGlvbiBnZW5lcmFsaXplcyB0byBhbGwgSEVFeCBmdW5jdGlvbiBjb21wb25lbnRzLCBhbmRcbiAgICAvLyAgICAgd29ya3MgaW4gdGhlIHNhbWUgUEhYX1NLSVAgYXR0cmlidXRlIGZhc2hpb24gYXMgMSwgYnV0IHRoZSBuZXdSZW5kZXIgdHJhY2tpbmcgaXMgZG9uZVxuICAgIC8vICAgICBhdCB0aGUgZ2VuZXJhbCBkaWZmIG1lcmdlIGxldmVsLiBJZiB3ZSBtZXJnZSBhIGRpZmYgd2l0aCBuZXcgZHluYW1pY3MsIHdlIG5lY2Vzc2FyaWx5IGhhdmVcbiAgICAvLyAgICAgZXhwZXJpZW5jZWQgYSBjaGFuZ2Ugd2hpY2ggbXVzdCBiZSBhIG5ld1JlbmRlciwgYW5kIHRodXMgd2UgY2FuJ3Qgc2tpcCB0aGUgcmVuZGVyLlxuICAgIC8vXG4gICAgLy8gQm90aCBvcHRpbWl6YXRpb24gZmxvd3MgYXBwbHkgaGVyZS4gbmV3UmVuZGVyIGlzIHNldCBiYXNlZCBvbiB0aGUgb25seUNpZHMgb3B0aW1pemF0aW9uLCBhbmRcbiAgICAvLyB3ZSB0cmFjayBhIGRldGVybWluaXN0aWMgbWFnaWNJZCBiYXNlZCBvbiB0aGUgY2lkLlxuICAgIC8vXG4gICAgLy8gY2hhbmdlVHJhY2tpbmcgaXMgYWJvdXQgdGhlIGVudGlyZSB0cmVlXG4gICAgLy8gbmV3UmVuZGVyIGlzIGFib3V0IHRoZSBjdXJyZW50IHJvb3QgaW4gdGhlIHRyZWVcbiAgICAvL1xuICAgIC8vIEJ5IGRlZmF1bHQgY2hhbmdlVHJhY2tpbmcgaXMgZW5hYmxlZCwgYnV0IHdlIHNwZWNpYWwgY2FzZSB0aGUgZmxvdyB3aGVyZSB0aGUgY2xpZW50IGlzIHBydW5pbmdcbiAgICAvLyBjaWRzIGFuZCB0aGUgc2VydmVyIGFkZHMgdGhlIGNvbXBvbmVudCBiYWNrLiBJbiBzdWNoIGNhc2VzLCB3ZSBleHBsaWNpdGx5IGRpc2FibGUgY2hhbmdlVHJhY2tpbmdcbiAgICAvLyB3aXRoIHJlc2V0UmVuZGVyIGZvciB0aGlzIGNpZCwgdGhlbiByZS1lbmFibGUgaXQgYWZ0ZXIgdGhlIHJlY3Vyc2l2ZSBjYWxsIHRvIHNraXAgdGhlIG9wdGltaXphdGlvblxuICAgIC8vIGZvciB0aGUgZW50aXJlIGNvbXBvbmVudCB0cmVlLlxuICAgIGNvbXBvbmVudC5uZXdSZW5kZXIgPSAhc2tpcFxuICAgIGNvbXBvbmVudC5tYWdpY0lkID0gYGMke2NpZH0tJHt0aGlzLnBhcmVudFZpZXdJZCgpfWBcbiAgICAvLyBlbmFibGUgY2hhbmdlIHRyYWNraW5nIGFzIGxvbmcgYXMgdGhlIGNvbXBvbmVudCBoYXNuJ3QgYmVlbiByZXNldFxuICAgIGxldCBjaGFuZ2VUcmFja2luZyA9ICFjb21wb25lbnQucmVzZXRcbiAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZWN1cnNpdmVUb1N0cmluZyhjb21wb25lbnQsIGNvbXBvbmVudHMsIG9ubHlDaWRzLCBjaGFuZ2VUcmFja2luZywgYXR0cnMpXG4gICAgLy8gZGlzYWJsZSByZXNldCBhZnRlciB3ZSd2ZSByZW5kZXJlZFxuICAgIGRlbGV0ZSBjb21wb25lbnQucmVzZXRcblxuICAgIHJldHVybiBbaHRtbCwgc3RyZWFtc11cbiAgfVxufVxuIiwgImltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBBUklBIGZyb20gXCIuL2FyaWFcIlxuXG5sZXQgZm9jdXNTdGFjayA9IFtdXG5sZXQgZGVmYXVsdF90cmFuc2l0aW9uX3RpbWUgPSAyMDBcblxubGV0IEpTID0ge1xuICAvLyBwcml2YXRlXG4gIGV4ZWMoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGRlZmF1bHRzKXtcbiAgICBsZXQgW2RlZmF1bHRLaW5kLCBkZWZhdWx0QXJnc10gPSBkZWZhdWx0cyB8fCBbbnVsbCwge2NhbGxiYWNrOiBkZWZhdWx0cyAmJiBkZWZhdWx0cy5jYWxsYmFja31dXG4gICAgbGV0IGNvbW1hbmRzID0gcGh4RXZlbnQuY2hhckF0KDApID09PSBcIltcIiA/XG4gICAgICBKU09OLnBhcnNlKHBoeEV2ZW50KSA6IFtbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXV1cblxuICAgIGNvbW1hbmRzLmZvckVhY2goKFtraW5kLCBhcmdzXSkgPT4ge1xuICAgICAgaWYoa2luZCA9PT0gZGVmYXVsdEtpbmQpe1xuICAgICAgICAvLyBhbHdheXMgcHJlZmVyIHRoZSBhcmdzLCBidXQga2VlcCBleGlzdGluZyBrZXlzIGZyb20gdGhlIGRlZmF1bHRBcmdzXG4gICAgICAgIGFyZ3MgPSB7Li4uZGVmYXVsdEFyZ3MsIC4uLmFyZ3N9XG4gICAgICAgIGFyZ3MuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrIHx8IGRlZmF1bHRBcmdzLmNhbGxiYWNrXG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclRvRWxzKHZpZXcubGl2ZVNvY2tldCwgc291cmNlRWwsIGFyZ3MpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB0aGlzW2BleGVjXyR7a2luZH1gXShlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIGFyZ3MpXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgaXNWaXNpYmxlKGVsKXtcbiAgICByZXR1cm4gISEoZWwub2Zmc2V0V2lkdGggfHwgZWwub2Zmc2V0SGVpZ2h0IHx8IGVsLmdldENsaWVudFJlY3RzKCkubGVuZ3RoID4gMClcbiAgfSxcblxuICAvLyByZXR1cm5zIHRydWUgaWYgYW55IHBhcnQgb2YgdGhlIGVsZW1lbnQgaXMgaW5zaWRlIHRoZSB2aWV3cG9ydFxuICBpc0luVmlld3BvcnQoZWwpe1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcblxuICAgIHJldHVybiAoXG4gICAgICByZWN0LnJpZ2h0ID4gMCAmJlxuICAgICAgcmVjdC5ib3R0b20gPiAwICYmXG4gICAgICByZWN0LmxlZnQgPCB3aW5kb3dXaWR0aCAmJlxuICAgICAgcmVjdC50b3AgPCB3aW5kb3dIZWlnaHRcbiAgICApXG4gIH0sXG5cbiAgLy8gcHJpdmF0ZVxuXG4gIC8vIGNvbW1hbmRzXG5cbiAgZXhlY19leGVjKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2F0dHIsIHRvfSl7XG4gICAgbGV0IG5vZGVzID0gdG8gPyBET00uYWxsKGRvY3VtZW50LCB0bykgOiBbc291cmNlRWxdXG4gICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGxldCBlbmNvZGVkSlMgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyKVxuICAgICAgaWYoIWVuY29kZWRKUyl7IHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgJHthdHRyfSB0byBjb250YWluIEpTIGNvbW1hbmQgb24gXCIke3RvfVwiYCkgfVxuICAgICAgdmlldy5saXZlU29ja2V0LmV4ZWNKUyhub2RlLCBlbmNvZGVkSlMsIGV2ZW50VHlwZSlcbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfZGlzcGF0Y2goZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZXZlbnQsIGRldGFpbCwgYnViYmxlc30pe1xuICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fVxuICAgIGRldGFpbC5kaXNwYXRjaGVyID0gc291cmNlRWxcbiAgICBET00uZGlzcGF0Y2hFdmVudChlbCwgZXZlbnQsIHtkZXRhaWwsIGJ1YmJsZXN9KVxuICB9LFxuXG4gIGV4ZWNfcHVzaChlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIGFyZ3Mpe1xuICAgIGxldCB7ZXZlbnQsIGRhdGEsIHRhcmdldCwgcGFnZV9sb2FkaW5nLCBsb2FkaW5nLCB2YWx1ZSwgZGlzcGF0Y2hlciwgY2FsbGJhY2t9ID0gYXJnc1xuICAgIGxldCBwdXNoT3B0cyA9IHtsb2FkaW5nLCB2YWx1ZSwgdGFyZ2V0LCBwYWdlX2xvYWRpbmc6ICEhcGFnZV9sb2FkaW5nfVxuICAgIGxldCB0YXJnZXRTcmMgPSBldmVudFR5cGUgPT09IFwiY2hhbmdlXCIgJiYgZGlzcGF0Y2hlciA/IGRpc3BhdGNoZXIgOiBzb3VyY2VFbFxuICAgIGxldCBwaHhUYXJnZXQgPSB0YXJnZXQgfHwgdGFyZ2V0U3JjLmdldEF0dHJpYnV0ZSh2aWV3LmJpbmRpbmcoXCJ0YXJnZXRcIikpIHx8IHRhcmdldFNyY1xuICAgIGNvbnN0IGhhbmRsZXIgPSAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBpZighdGFyZ2V0Vmlldy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJjaGFuZ2VcIil7XG4gICAgICAgIGxldCB7bmV3Q2lkLCBfdGFyZ2V0fSA9IGFyZ3NcbiAgICAgICAgX3RhcmdldCA9IF90YXJnZXQgfHwgKERPTS5pc0Zvcm1JbnB1dChzb3VyY2VFbCkgPyBzb3VyY2VFbC5uYW1lIDogdW5kZWZpbmVkKVxuICAgICAgICBpZihfdGFyZ2V0KXsgcHVzaE9wdHMuX3RhcmdldCA9IF90YXJnZXQgfVxuICAgICAgICB0YXJnZXRWaWV3LnB1c2hJbnB1dChzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBuZXdDaWQsIGV2ZW50IHx8IHBoeEV2ZW50LCBwdXNoT3B0cywgY2FsbGJhY2spXG4gICAgICB9IGVsc2UgaWYoZXZlbnRUeXBlID09PSBcInN1Ym1pdFwiKXtcbiAgICAgICAgbGV0IHtzdWJtaXR0ZXJ9ID0gYXJnc1xuICAgICAgICB0YXJnZXRWaWV3LnN1Ym1pdEZvcm0oc291cmNlRWwsIHRhcmdldEN0eCwgZXZlbnQgfHwgcGh4RXZlbnQsIHN1Ym1pdHRlciwgcHVzaE9wdHMsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Vmlldy5wdXNoRXZlbnQoZXZlbnRUeXBlLCBzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBldmVudCB8fCBwaHhFdmVudCwgZGF0YSwgcHVzaE9wdHMsIGNhbGxiYWNrKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBpbiBjYXNlIG9mIGZvcm1SZWNvdmVyeSwgdGFyZ2V0VmlldyBhbmQgdGFyZ2V0Q3R4IGFyZSBwYXNzZWQgYXMgYXJndW1lbnRcbiAgICAvLyBhcyB0aGV5IGFyZSBsb29rZWQgdXAgaW4gYSB0ZW1wbGF0ZSBlbGVtZW50LCBub3QgdGhlIHJlYWwgRE9NXG4gICAgaWYoYXJncy50YXJnZXRWaWV3ICYmIGFyZ3MudGFyZ2V0Q3R4KXtcbiAgICAgIGhhbmRsZXIoYXJncy50YXJnZXRWaWV3LCBhcmdzLnRhcmdldEN0eClcbiAgICB9IGVsc2Uge1xuICAgICAgdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgaGFuZGxlcilcbiAgICB9XG4gIH0sXG5cbiAgZXhlY19uYXZpZ2F0ZShlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtocmVmLCByZXBsYWNlfSl7XG4gICAgdmlldy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdChlLCBocmVmLCByZXBsYWNlID8gXCJyZXBsYWNlXCIgOiBcInB1c2hcIiwgbnVsbCwgc291cmNlRWwpXG4gIH0sXG5cbiAgZXhlY19wYXRjaChlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtocmVmLCByZXBsYWNlfSl7XG4gICAgdmlldy5saXZlU29ja2V0LnB1c2hIaXN0b3J5UGF0Y2goZSwgaHJlZiwgcmVwbGFjZSA/IFwicmVwbGFjZVwiIDogXCJwdXNoXCIsIHNvdXJjZUVsKVxuICB9LFxuXG4gIGV4ZWNfZm9jdXMoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICBBUklBLmF0dGVtcHRGb2N1cyhlbClcbiAgfSxcblxuICBleGVjX2ZvY3VzX2ZpcnN0KGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCl7XG4gICAgQVJJQS5mb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpIHx8IEFSSUEuZm9jdXNGaXJzdChlbClcbiAgfSxcblxuICBleGVjX3B1c2hfZm9jdXMoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGZvY3VzU3RhY2sucHVzaChlbCB8fCBzb3VyY2VFbCkpXG4gIH0sXG5cbiAgZXhlY19wb3BfZm9jdXMoX2UsIF9ldmVudFR5cGUsIF9waHhFdmVudCwgX3ZpZXcsIF9zb3VyY2VFbCwgX2VsKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZm9jdXNTdGFjay5wb3AoKVxuICAgICAgaWYoZWwpeyBlbC5mb2N1cygpIH1cbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfYWRkX2NsYXNzKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBuYW1lcywgW10sIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2NsYXNzKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlX2NsYXNzKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NlcyhlbCwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlX2F0dHIoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cjogW2F0dHIsIHZhbDEsIHZhbDJdfSl7XG4gICAgdGhpcy50b2dnbGVBdHRyKGVsLCBhdHRyLCB2YWwxLCB2YWwyKVxuICB9LFxuXG4gIGV4ZWNfdHJhbnNpdGlvbihlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0aW1lLCB0cmFuc2l0aW9uLCBibG9ja2luZ30pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgW10sIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIGlucywgb3V0cywgdGltZSwgYmxvY2tpbmd9KXtcbiAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfc2hvdyhlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMuc2hvdyhldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZylcbiAgfSxcblxuICBleGVjX2hpZGUoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmd9KXtcbiAgICB0aGlzLmhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmcpXG4gIH0sXG5cbiAgZXhlY19zZXRfYXR0cihlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHthdHRyOiBbYXR0ciwgdmFsXX0pe1xuICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW1thdHRyLCB2YWxdXSwgW10pXG4gIH0sXG5cbiAgZXhlY19yZW1vdmVfYXR0cihlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHthdHRyfSl7XG4gICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbXSwgW2F0dHJdKVxuICB9LFxuXG4gIC8vIHV0aWxzIGZvciBjb21tYW5kc1xuXG4gIHNob3coZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmcpe1xuICAgIGlmKCF0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgbnVsbCwgdGltZSwgYmxvY2tpbmcpXG4gICAgfVxuICB9LFxuXG4gIGhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmcpe1xuICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBudWxsLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZylcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIGlucywgb3V0cywgdGltZSwgYmxvY2tpbmcpe1xuICAgIHRpbWUgPSB0aW1lIHx8IGRlZmF1bHRfdHJhbnNpdGlvbl90aW1lXG4gICAgbGV0IFtpbkNsYXNzZXMsIGluU3RhcnRDbGFzc2VzLCBpbkVuZENsYXNzZXNdID0gaW5zIHx8IFtbXSwgW10sIFtdXVxuICAgIGxldCBbb3V0Q2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzLCBvdXRFbmRDbGFzc2VzXSA9IG91dHMgfHwgW1tdLCBbXSwgW11dXG4gICAgaWYoaW5DbGFzc2VzLmxlbmd0aCA+IDAgfHwgb3V0Q2xhc3Nlcy5sZW5ndGggPiAwKXtcbiAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRTdGFydENsYXNzZXMsIGluQ2xhc3Nlcy5jb25jYXQoaW5TdGFydENsYXNzZXMpLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dENsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0RW5kQ2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGxldCBvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIG91dENsYXNzZXMuY29uY2F0KG91dEVuZENsYXNzZXMpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtZW5kXCIpKVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtc3RhcnRcIikpXG4gICAgICAgIGlmKGJsb2NraW5nID09PSBmYWxzZSl7XG4gICAgICAgICAgb25TdGFydCgpXG4gICAgICAgICAgc2V0VGltZW91dChvbkVuZCwgdGltZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25FbmQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJyZW1vdmVcIil7IHJldHVybiB9XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpblN0YXJ0Q2xhc3Nlcywgb3V0Q2xhc3Nlcy5jb25jYXQob3V0U3RhcnRDbGFzc2VzKS5jb25jYXQob3V0RW5kQ2xhc3NlcykpXG4gICAgICAgICAgbGV0IHN0aWNreURpc3BsYXkgPSBkaXNwbGF5IHx8IHRoaXMuZGVmYXVsdERpc3BsYXkoZWwpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gc3RpY2t5RGlzcGxheSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpbkNsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5FbmRDbGFzc2VzLCBpblN0YXJ0Q2xhc3NlcykpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBsZXQgb25FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBpbkNsYXNzZXMuY29uY2F0KGluRW5kQ2xhc3NlcykpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1lbmRcIikpXG4gICAgICAgIH1cbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1zdGFydFwiKSlcbiAgICAgICAgaWYoYmxvY2tpbmcgPT09IGZhbHNlKXtcbiAgICAgICAgICBvblN0YXJ0KClcbiAgICAgICAgICBzZXRUaW1lb3V0KG9uRW5kLCB0aW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkVuZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLXN0YXJ0XCIpKVxuICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIilcbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1lbmRcIikpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LXN0YXJ0XCIpKVxuICAgICAgICBsZXQgc3RpY2t5RGlzcGxheSA9IGRpc3BsYXkgfHwgdGhpcy5kZWZhdWx0RGlzcGxheShlbClcbiAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gc3RpY2t5RGlzcGxheSlcbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1lbmRcIikpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRvZ2dsZUNsYXNzZXMoZWwsIGNsYXNzZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBbcHJldkFkZHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiY2xhc3Nlc1wiLCBbW10sIFtdXSlcbiAgICAgIGxldCBuZXdBZGRzID0gY2xhc3Nlcy5maWx0ZXIobmFtZSA9PiBwcmV2QWRkcy5pbmRleE9mKG5hbWUpIDwgMCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IG5ld1JlbW92ZXMgPSBjbGFzc2VzLmZpbHRlcihuYW1lID0+IHByZXZSZW1vdmVzLmluZGV4T2YobmFtZSkgPCAwICYmIGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSlcbiAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBuZXdBZGRzLCBuZXdSZW1vdmVzLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3LCBibG9ja2luZylcbiAgICB9KVxuICB9LFxuXG4gIHRvZ2dsZUF0dHIoZWwsIGF0dHIsIHZhbDEsIHZhbDIpe1xuICAgIGlmKGVsLmhhc0F0dHJpYnV0ZShhdHRyKSl7XG4gICAgICBpZih2YWwyICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAvLyB0b2dnbGUgYmV0d2VlbiB2YWwxIGFuZCB2YWwyXG4gICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZShhdHRyKSA9PT0gdmFsMSl7XG4gICAgICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbDJdXSwgW10pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbDFdXSwgW10pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSBhdHRyXG4gICAgICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW10sIFthdHRyXSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbDFdXSwgW10pXG4gICAgfVxuICB9LFxuXG4gIGFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgYWRkcywgcmVtb3ZlcywgdHJhbnNpdGlvbiwgdGltZSwgdmlldywgYmxvY2tpbmcpe1xuICAgIHRpbWUgPSB0aW1lIHx8IGRlZmF1bHRfdHJhbnNpdGlvbl90aW1lXG4gICAgbGV0IFt0cmFuc2l0aW9uUnVuLCB0cmFuc2l0aW9uU3RhcnQsIHRyYW5zaXRpb25FbmRdID0gdHJhbnNpdGlvbiB8fCBbW10sIFtdLCBbXV1cbiAgICBpZih0cmFuc2l0aW9uUnVuLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uU3RhcnQsIFtdLmNvbmNhdCh0cmFuc2l0aW9uUnVuKS5jb25jYXQodHJhbnNpdGlvbkVuZCkpXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uUnVuLCBbXSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uRW5kLCB0cmFuc2l0aW9uU3RhcnQpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgbGV0IG9uRG9uZSA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLmNvbmNhdCh0cmFuc2l0aW9uRW5kKSwgcmVtb3Zlcy5jb25jYXQodHJhbnNpdGlvblJ1bikuY29uY2F0KHRyYW5zaXRpb25TdGFydCkpXG4gICAgICBpZihibG9ja2luZyA9PT0gZmFsc2Upe1xuICAgICAgICBvblN0YXJ0KClcbiAgICAgICAgc2V0VGltZW91dChvbkRvbmUsIHRpbWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBsZXQgW3ByZXZBZGRzLCBwcmV2UmVtb3Zlc10gPSBET00uZ2V0U3RpY2t5KGVsLCBcImNsYXNzZXNcIiwgW1tdLCBbXV0pXG4gICAgICBsZXQga2VlcEFkZHMgPSBhZGRzLmZpbHRlcihuYW1lID0+IHByZXZBZGRzLmluZGV4T2YobmFtZSkgPCAwICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQga2VlcFJlbW92ZXMgPSByZW1vdmVzLmZpbHRlcihuYW1lID0+IHByZXZSZW1vdmVzLmluZGV4T2YobmFtZSkgPCAwICYmIGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSlcbiAgICAgIGxldCBuZXdBZGRzID0gcHJldkFkZHMuZmlsdGVyKG5hbWUgPT4gcmVtb3Zlcy5pbmRleE9mKG5hbWUpIDwgMCkuY29uY2F0KGtlZXBBZGRzKVxuICAgICAgbGV0IG5ld1JlbW92ZXMgPSBwcmV2UmVtb3Zlcy5maWx0ZXIobmFtZSA9PiBhZGRzLmluZGV4T2YobmFtZSkgPCAwKS5jb25jYXQoa2VlcFJlbW92ZXMpXG5cbiAgICAgIERPTS5wdXRTdGlja3koZWwsIFwiY2xhc3Nlc1wiLCBjdXJyZW50RWwgPT4ge1xuICAgICAgICBjdXJyZW50RWwuY2xhc3NMaXN0LnJlbW92ZSguLi5uZXdSZW1vdmVzKVxuICAgICAgICBjdXJyZW50RWwuY2xhc3NMaXN0LmFkZCguLi5uZXdBZGRzKVxuICAgICAgICByZXR1cm4gW25ld0FkZHMsIG5ld1JlbW92ZXNdXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgc2V0T3JSZW1vdmVBdHRycyhlbCwgc2V0cywgcmVtb3Zlcyl7XG4gICAgbGV0IFtwcmV2U2V0cywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJhdHRyc1wiLCBbW10sIFtdXSlcblxuICAgIGxldCBhbHRlcmVkQXR0cnMgPSBzZXRzLm1hcCgoW2F0dHIsIF92YWxdKSA9PiBhdHRyKS5jb25jYXQocmVtb3ZlcylcbiAgICBsZXQgbmV3U2V0cyA9IHByZXZTZXRzLmZpbHRlcigoW2F0dHIsIF92YWxdKSA9PiAhYWx0ZXJlZEF0dHJzLmluY2x1ZGVzKGF0dHIpKS5jb25jYXQoc2V0cylcbiAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcigoYXR0cikgPT4gIWFsdGVyZWRBdHRycy5pbmNsdWRlcyhhdHRyKSkuY29uY2F0KHJlbW92ZXMpXG5cbiAgICBET00ucHV0U3RpY2t5KGVsLCBcImF0dHJzXCIsIGN1cnJlbnRFbCA9PiB7XG4gICAgICBuZXdSZW1vdmVzLmZvckVhY2goYXR0ciA9PiBjdXJyZW50RWwucmVtb3ZlQXR0cmlidXRlKGF0dHIpKVxuICAgICAgbmV3U2V0cy5mb3JFYWNoKChbYXR0ciwgdmFsXSkgPT4gY3VycmVudEVsLnNldEF0dHJpYnV0ZShhdHRyLCB2YWwpKVxuICAgICAgcmV0dXJuIFtuZXdTZXRzLCBuZXdSZW1vdmVzXVxuICAgIH0pXG4gIH0sXG5cbiAgaGFzQWxsQ2xhc3NlcyhlbCwgY2xhc3Nlcyl7IHJldHVybiBjbGFzc2VzLmV2ZXJ5KG5hbWUgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKSB9LFxuXG4gIGlzVG9nZ2xlZE91dChlbCwgb3V0Q2xhc3Nlcyl7XG4gICAgcmV0dXJuICF0aGlzLmlzVmlzaWJsZShlbCkgfHwgdGhpcy5oYXNBbGxDbGFzc2VzKGVsLCBvdXRDbGFzc2VzKVxuICB9LFxuXG4gIGZpbHRlclRvRWxzKGxpdmVTb2NrZXQsIHNvdXJjZUVsLCB7dG99KXtcbiAgICBsZXQgZGVmYXVsdFF1ZXJ5ID0gKCkgPT4ge1xuICAgICAgaWYodHlwZW9mKHRvKSA9PT0gXCJzdHJpbmdcIil7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRvKVxuICAgICAgfSBlbHNlIGlmKHRvLmNsb3Nlc3Qpe1xuICAgICAgICBsZXQgdG9FbCA9IHNvdXJjZUVsLmNsb3Nlc3QodG8uY2xvc2VzdClcbiAgICAgICAgcmV0dXJuIHRvRWwgPyBbdG9FbF0gOiBbXVxuICAgICAgfSBlbHNlIGlmKHRvLmlubmVyKXtcbiAgICAgICAgcmV0dXJuIHNvdXJjZUVsLnF1ZXJ5U2VsZWN0b3JBbGwodG8uaW5uZXIpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0byA/IGxpdmVTb2NrZXQuanNRdWVyeVNlbGVjdG9yQWxsKHNvdXJjZUVsLCB0bywgZGVmYXVsdFF1ZXJ5KSA6IFtzb3VyY2VFbF1cbiAgfSxcblxuICBkZWZhdWx0RGlzcGxheShlbCl7XG4gICAgcmV0dXJuIHt0cjogXCJ0YWJsZS1yb3dcIiwgdGQ6IFwidGFibGUtY2VsbFwifVtlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCldIHx8IFwiYmxvY2tcIlxuICB9LFxuXG4gIHRyYW5zaXRpb25DbGFzc2VzKHZhbCl7XG4gICAgaWYoIXZhbCl7IHJldHVybiBudWxsIH1cblxuICAgIGxldCBbdHJhbnMsIHRTdGFydCwgdEVuZF0gPSBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbdmFsLnNwbGl0KFwiIFwiKSwgW10sIFtdXVxuICAgIHRyYW5zID0gQXJyYXkuaXNBcnJheSh0cmFucykgPyB0cmFucyA6IHRyYW5zLnNwbGl0KFwiIFwiKVxuICAgIHRTdGFydCA9IEFycmF5LmlzQXJyYXkodFN0YXJ0KSA/IHRTdGFydCA6IHRTdGFydC5zcGxpdChcIiBcIilcbiAgICB0RW5kID0gQXJyYXkuaXNBcnJheSh0RW5kKSA/IHRFbmQgOiB0RW5kLnNwbGl0KFwiIFwiKVxuICAgIHJldHVybiBbdHJhbnMsIHRTdGFydCwgdEVuZF1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBKU1xuIiwgImltcG9ydCBKUyBmcm9tIFwiLi9qc1wiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmNvbnN0IEhPT0tfSUQgPSBcImhvb2tJZFwiXG5cbmxldCB2aWV3SG9va0lEID0gMVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0hvb2sge1xuICBzdGF0aWMgbWFrZUlEKCl7IHJldHVybiB2aWV3SG9va0lEKysgfVxuICBzdGF0aWMgZWxlbWVudElEKGVsKXsgcmV0dXJuIERPTS5wcml2YXRlKGVsLCBIT09LX0lEKSB9XG5cbiAgY29uc3RydWN0b3IodmlldywgZWwsIGNhbGxiYWNrcyl7XG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5fX2F0dGFjaFZpZXcodmlldylcbiAgICB0aGlzLl9fY2FsbGJhY2tzID0gY2FsbGJhY2tzXG4gICAgdGhpcy5fX2xpc3RlbmVycyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgRE9NLnB1dFByaXZhdGUodGhpcy5lbCwgSE9PS19JRCwgdGhpcy5jb25zdHJ1Y3Rvci5tYWtlSUQoKSlcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLl9fY2FsbGJhY2tzKXsgdGhpc1trZXldID0gdGhpcy5fX2NhbGxiYWNrc1trZXldIH1cbiAgfVxuXG4gIF9fYXR0YWNoVmlldyh2aWV3KXtcbiAgICBpZih2aWV3KXtcbiAgICAgIHRoaXMuX192aWV3ID0gKCkgPT4gdmlld1xuICAgICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX192aWV3ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGhvb2sgbm90IHlldCBhdHRhY2hlZCB0byBhIGxpdmUgdmlldzogJHt0aGlzLmVsLm91dGVySFRNTH1gKVxuICAgICAgfVxuICAgICAgdGhpcy5saXZlU29ja2V0ID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIF9fbW91bnRlZCgpeyB0aGlzLm1vdW50ZWQgJiYgdGhpcy5tb3VudGVkKCkgfVxuICBfX3VwZGF0ZWQoKXsgdGhpcy51cGRhdGVkICYmIHRoaXMudXBkYXRlZCgpIH1cbiAgX19iZWZvcmVVcGRhdGUoKXsgdGhpcy5iZWZvcmVVcGRhdGUgJiYgdGhpcy5iZWZvcmVVcGRhdGUoKSB9XG4gIF9fZGVzdHJveWVkKCl7XG4gICAgdGhpcy5kZXN0cm95ZWQgJiYgdGhpcy5kZXN0cm95ZWQoKVxuICAgIERPTS5kZWxldGVQcml2YXRlKHRoaXMuZWwsIEhPT0tfSUQpIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zNDk2XG4gIH1cbiAgX19yZWNvbm5lY3RlZCgpe1xuICAgIGlmKHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCl7XG4gICAgICB0aGlzLl9faXNEaXNjb25uZWN0ZWQgPSBmYWxzZVxuICAgICAgdGhpcy5yZWNvbm5lY3RlZCAmJiB0aGlzLnJlY29ubmVjdGVkKClcbiAgICB9XG4gIH1cbiAgX19kaXNjb25uZWN0ZWQoKXtcbiAgICB0aGlzLl9faXNEaXNjb25uZWN0ZWQgPSB0cnVlXG4gICAgdGhpcy5kaXNjb25uZWN0ZWQgJiYgdGhpcy5kaXNjb25uZWN0ZWQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIHRoZSBob29rIHRvIEpTIGNvbW1hbmRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZpZXdIb29rfSBob29rIC0gVGhlIFZpZXdIb29rIGluc3RhbmNlIHRvIGJpbmQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIG1ldGhvZHMgdG8gbWFuaXB1bGF0ZSB0aGUgRE9NIGFuZCBleGVjdXRlIEphdmFTY3JpcHQuXG4gICAqL1xuICBqcygpe1xuICAgIGxldCBob29rID0gdGhpc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8qKlxuICAgICAgICogRXhlY3V0ZXMgZW5jb2RlZCBKYXZhU2NyaXB0IGluIHRoZSBjb250ZXh0IG9mIHRoZSBob29rIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGVuY29kZWRKUyAtIFRoZSBlbmNvZGVkIEphdmFTY3JpcHQgc3RyaW5nIHRvIGV4ZWN1dGUuXG4gICAgICAgKi9cbiAgICAgIGV4ZWMoZW5jb2RlZEpTKXtcbiAgICAgICAgaG9vay5fX3ZpZXcoKS5saXZlU29ja2V0LmV4ZWNKUyhob29rLmVsLCBlbmNvZGVkSlMsIFwiaG9va1wiKVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBTaG93cyBhbiBlbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gc2hvdy5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5kaXNwbGF5XSAtIFRoZSBDU1MgZGlzcGxheSB2YWx1ZSB0byBzZXQuIERlZmF1bHRzIFwiYmxvY2tcIi5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy50cmFuc2l0aW9uXSAtIFRoZSBDU1MgdHJhbnNpdGlvbiBjbGFzc2VzIHRvIHNldCB3aGVuIHNob3dpbmcuXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZV0gLSBUaGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuIERlZmF1bHRzIDIwMC5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuYmxvY2tpbmddIC0gVGhlIGJvb2xlYW4gZmxhZyB0byBibG9jayB0aGUgVUkgZHVyaW5nIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICogIERlZmF1bHRzIGB0cnVlYC5cbiAgICAgICAqL1xuICAgICAgc2hvdyhlbCwgb3B0cyA9IHt9KXtcbiAgICAgICAgbGV0IG93bmVyID0gaG9vay5fX3ZpZXcoKS5saXZlU29ja2V0Lm93bmVyKGVsKVxuICAgICAgICBKUy5zaG93KFwiaG9va1wiLCBvd25lciwgZWwsIG9wdHMuZGlzcGxheSwgb3B0cy50cmFuc2l0aW9uLCBvcHRzLnRpbWUsIG9wdHMuYmxvY2tpbmcpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEhpZGVzIGFuIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byBoaWRlLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLnRyYW5zaXRpb25dIC0gVGhlIENTUyB0cmFuc2l0aW9uIGNsYXNzZXMgdG8gc2V0IHdoZW4gaGlkaW5nLlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVdIC0gVGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLiBEZWZhdWx0cyAyMDAuXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmJsb2NraW5nXSAtIFRoZSBib29sZWFuIGZsYWcgdG8gYmxvY2sgdGhlIFVJIGR1cmluZyB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAqICAgRGVmYXVsdHMgYHRydWVgLlxuICAgICAgICovXG4gICAgICBoaWRlKGVsLCBvcHRzID0ge30pe1xuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIEpTLmhpZGUoXCJob29rXCIsIG93bmVyLCBlbCwgbnVsbCwgb3B0cy50cmFuc2l0aW9uLCBvcHRzLnRpbWUsIG9wdHMuYmxvY2tpbmcpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgYW4gZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIHRvZ2dsZS5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5kaXNwbGF5XSAtIFRoZSBDU1MgZGlzcGxheSB2YWx1ZSB0byBzZXQuIERlZmF1bHRzIFwiYmxvY2tcIi5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5pbl0gLSBUaGUgQ1NTIHRyYW5zaXRpb24gY2xhc3NlcyBmb3Igc2hvd2luZy5cbiAgICAgICAqICAgQWNjZXB0cyBlaXRoZXIgdGhlIHN0cmluZyBvZiBjbGFzc2VzIHRvIGFwcGx5IHdoZW4gdG9nZ2xpbmcgaW4sIG9yXG4gICAgICAgKiAgIGEgMy10dXBsZSBjb250YWluaW5nIHRoZSB0cmFuc2l0aW9uIGNsYXNzLCB0aGUgY2xhc3MgdG8gYXBwbHlcbiAgICAgICAqICAgdG8gc3RhcnQgdGhlIHRyYW5zaXRpb24sIGFuZCB0aGUgZW5kaW5nIHRyYW5zaXRpb24gY2xhc3MsIHN1Y2ggYXM6XG4gICAgICAgKlxuICAgICAgICogICAgICAgW1wiZWFzZS1vdXQgZHVyYXRpb24tMzAwXCIsIFwib3BhY2l0eS0wXCIsIFwib3BhY2l0eS0xMDBcIl1cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMub3V0XSAtIFRoZSBDU1MgdHJhbnNpdGlvbiBjbGFzc2VzIGZvciBoaWRpbmcuXG4gICAgICAgKiAgIEFjY2VwdHMgZWl0aGVyIHN0cmluZyBvZiBjbGFzc2VzIHRvIGFwcGx5IHdoZW4gdG9nZ2xpbmcgb3V0LCBvclxuICAgICAgICogICBhIDMtdHVwbGUgY29udGFpbmluZyB0aGUgdHJhbnNpdGlvbiBjbGFzcywgdGhlIGNsYXNzIHRvIGFwcGx5XG4gICAgICAgKiAgIHRvIHN0YXJ0IHRoZSB0cmFuc2l0aW9uLCBhbmQgdGhlIGVuZGluZyB0cmFuc2l0aW9uIGNsYXNzLCBzdWNoIGFzOlxuICAgICAgICpcbiAgICAgICAqICAgICAgIFtcImVhc2Utb3V0IGR1cmF0aW9uLTMwMFwiLCBcIm9wYWNpdHktMTAwXCIsIFwib3BhY2l0eS0wXCJdXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVdIC0gVGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuYmxvY2tpbmddIC0gVGhlIGJvb2xlYW4gZmxhZyB0byBibG9jayB0aGUgVUkgZHVyaW5nIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICogICBEZWZhdWx0cyBgdHJ1ZWAuXG4gICAgICAgKi9cbiAgICAgIHRvZ2dsZShlbCwgb3B0cyA9IHt9KXtcbiAgICAgICAgbGV0IG93bmVyID0gaG9vay5fX3ZpZXcoKS5saXZlU29ja2V0Lm93bmVyKGVsKVxuICAgICAgICBvcHRzLmluID0gSlMudHJhbnNpdGlvbkNsYXNzZXMob3B0cy5pbilcbiAgICAgICAgb3B0cy5vdXQgPSBKUy50cmFuc2l0aW9uQ2xhc3NlcyhvcHRzLm91dClcbiAgICAgICAgSlMudG9nZ2xlKFwiaG9va1wiLCBvd25lciwgZWwsIG9wdHMuZGlzcGxheSwgb3B0cy5pbiwgb3B0cy5vdXQsIG9wdHMudGltZSwgb3B0cy5ibG9ja2luZylcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkcyBDU1MgY2xhc3NlcyB0byBhbiBlbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gYWRkIGNsYXNzZXMgdG8uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gbmFtZXMgLSBUaGUgY2xhc3MgbmFtZShzKSB0byBhZGQuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dIC0gT3B0aW9uYWwgc2V0dGluZ3MuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMudHJhbnNpdGlvbl0gLSBUaGUgQ1NTIHRyYW5zaXRpb24gcHJvcGVydHkgdG8gc2V0LlxuICAgICAgICogICBBY2NlcHRzIGEgc3RyaW5nIG9mIGNsYXNzZXMgdG8gYXBwbHkgd2hlbiBhZGRpbmcgY2xhc3NlcyBvclxuICAgICAgICogICBhIDMtdHVwbGUgY29udGFpbmluZyB0aGUgdHJhbnNpdGlvbiBjbGFzcywgdGhlIGNsYXNzIHRvIGFwcGx5XG4gICAgICAgKiAgIHRvIHN0YXJ0IHRoZSB0cmFuc2l0aW9uLCBhbmQgdGhlIGVuZGluZyB0cmFuc2l0aW9uIGNsYXNzLCBzdWNoIGFzOlxuICAgICAgICpcbiAgICAgICAqICAgICAgIFtcImVhc2Utb3V0IGR1cmF0aW9uLTMwMFwiLCBcIm9wYWNpdHktMFwiLCBcIm9wYWNpdHktMTAwXCJdXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVdIC0gVGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ibG9ja2luZ10gLSBUaGUgYm9vbGVhbiBmbGFnIHRvIGJsb2NrIHRoZSBVSSBkdXJpbmcgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgKiAgIERlZmF1bHRzIGB0cnVlYC5cbiAgICAgICAqL1xuICAgICAgYWRkQ2xhc3MoZWwsIG5hbWVzLCBvcHRzID0ge30pe1xuICAgICAgICBuYW1lcyA9IEFycmF5LmlzQXJyYXkobmFtZXMpID8gbmFtZXMgOiBuYW1lcy5zcGxpdChcIiBcIilcbiAgICAgICAgbGV0IG93bmVyID0gaG9vay5fX3ZpZXcoKS5saXZlU29ja2V0Lm93bmVyKGVsKVxuICAgICAgICBKUy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG5hbWVzLCBbXSwgb3B0cy50cmFuc2l0aW9uLCBvcHRzLnRpbWUsIG93bmVyLCBvcHRzLmJsb2NraW5nKVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZW1vdmVzIENTUyBjbGFzc2VzIGZyb20gYW4gZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIHJlbW92ZSBjbGFzc2VzIGZyb20uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gbmFtZXMgLSBUaGUgY2xhc3MgbmFtZShzKSB0byByZW1vdmUuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dIC0gT3B0aW9uYWwgc2V0dGluZ3MuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMudHJhbnNpdGlvbl0gLSBUaGUgQ1NTIHRyYW5zaXRpb24gY2xhc3NlcyB0byBzZXQuXG4gICAgICAgKiAgIEFjY2VwdHMgYSBzdHJpbmcgb2YgY2xhc3NlcyB0byBhcHBseSB3aGVuIHJlbW92aW5nIGNsYXNzZXMgb3JcbiAgICAgICAqICAgYSAzLXR1cGxlIGNvbnRhaW5pbmcgdGhlIHRyYW5zaXRpb24gY2xhc3MsIHRoZSBjbGFzcyB0byBhcHBseVxuICAgICAgICogICB0byBzdGFydCB0aGUgdHJhbnNpdGlvbiwgYW5kIHRoZSBlbmRpbmcgdHJhbnNpdGlvbiBjbGFzcywgc3VjaCBhczpcbiAgICAgICAqXG4gICAgICAgKiAgICAgICBbXCJlYXNlLW91dCBkdXJhdGlvbi0zMDBcIiwgXCJvcGFjaXR5LTEwMFwiLCBcIm9wYWNpdHktMFwiXVxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lXSAtIFRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuYmxvY2tpbmddIC0gVGhlIGJvb2xlYW4gZmxhZyB0byBibG9jayB0aGUgVUkgZHVyaW5nIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICogICBEZWZhdWx0cyBgdHJ1ZWAuXG4gICAgICAgKi9cbiAgICAgIHJlbW92ZUNsYXNzKGVsLCBuYW1lcywgb3B0cyA9IHt9KXtcbiAgICAgICAgb3B0cy50cmFuc2l0aW9uID0gSlMudHJhbnNpdGlvbkNsYXNzZXMob3B0cy50cmFuc2l0aW9uKVxuICAgICAgICBuYW1lcyA9IEFycmF5LmlzQXJyYXkobmFtZXMpID8gbmFtZXMgOiBuYW1lcy5zcGxpdChcIiBcIilcbiAgICAgICAgbGV0IG93bmVyID0gaG9vay5fX3ZpZXcoKS5saXZlU29ja2V0Lm93bmVyKGVsKVxuICAgICAgICBKUy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBuYW1lcywgb3B0cy50cmFuc2l0aW9uLCBvcHRzLnRpbWUsIG93bmVyLCBvcHRzLmJsb2NraW5nKVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUb2dnbGVzIENTUyBjbGFzc2VzIG9uIGFuIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byB0b2dnbGUgY2xhc3NlcyBvbi5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBuYW1lcyAtIFRoZSBjbGFzcyBuYW1lKHMpIHRvIHRvZ2dsZS5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy50cmFuc2l0aW9uXSAtIFRoZSBDU1MgdHJhbnNpdGlvbiBjbGFzc2VzIHRvIHNldC5cbiAgICAgICAqICAgQWNjZXB0cyBhIHN0cmluZyBvZiBjbGFzc2VzIHRvIGFwcGx5IHdoZW4gdG9nZ2xpbmcgY2xhc3NlcyBvclxuICAgICAgICogICBhIDMtdHVwbGUgY29udGFpbmluZyB0aGUgdHJhbnNpdGlvbiBjbGFzcywgdGhlIGNsYXNzIHRvIGFwcGx5XG4gICAgICAgKiAgIHRvIHN0YXJ0IHRoZSB0cmFuc2l0aW9uLCBhbmQgdGhlIGVuZGluZyB0cmFuc2l0aW9uIGNsYXNzLCBzdWNoIGFzOlxuICAgICAgICpcbiAgICAgICAqICAgICAgIFtcImVhc2Utb3V0IGR1cmF0aW9uLTMwMFwiLCBcIm9wYWNpdHktMTAwXCIsIFwib3BhY2l0eS0wXCJdXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVdIC0gVGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ibG9ja2luZ10gLSBUaGUgYm9vbGVhbiBmbGFnIHRvIGJsb2NrIHRoZSBVSSBkdXJpbmcgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgKiAgIERlZmF1bHRzIGB0cnVlYC5cbiAgICAgICAqL1xuICAgICAgdG9nZ2xlQ2xhc3MoZWwsIG5hbWVzLCBvcHRzID0ge30pe1xuICAgICAgICBvcHRzLnRyYW5zaXRpb24gPSBKUy50cmFuc2l0aW9uQ2xhc3NlcyhvcHRzLnRyYW5zaXRpb24pXG4gICAgICAgIG5hbWVzID0gQXJyYXkuaXNBcnJheShuYW1lcykgPyBuYW1lcyA6IG5hbWVzLnNwbGl0KFwiIFwiKVxuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIEpTLnRvZ2dsZUNsYXNzZXMoZWwsIG5hbWVzLCBvcHRzLnRyYW5zaXRpb24sIG9wdHMudGltZSwgb3duZXIsIG9wdHMuYmxvY2tpbmcpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEFwcGxpZXMgYSBDU1MgdHJhbnNpdGlvbiB0byBhbiBlbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gYXBwbHkgdGhlIHRyYW5zaXRpb24gdG8uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gdHJhbnNpdGlvbiAtIFRoZSB0cmFuc2l0aW9uIGNsYXNzKGVzKSB0byBhcHBseS5cbiAgICAgICAqICAgQWNjZXB0cyBhIHN0cmluZyBvZiBjbGFzc2VzIHRvIGFwcGx5IHdoZW4gdHJhbnNpdGlvbmluZyBvclxuICAgICAgICogICBhIDMtdHVwbGUgY29udGFpbmluZyB0aGUgdHJhbnNpdGlvbiBjbGFzcywgdGhlIGNsYXNzIHRvIGFwcGx5XG4gICAgICAgKiAgIHRvIHN0YXJ0IHRoZSB0cmFuc2l0aW9uLCBhbmQgdGhlIGVuZGluZyB0cmFuc2l0aW9uIGNsYXNzLCBzdWNoIGFzOlxuICAgICAgICpcbiAgICAgICAqICAgICAgIFtcImVhc2Utb3V0IGR1cmF0aW9uLTMwMFwiLCBcIm9wYWNpdHktMTAwXCIsIFwib3BhY2l0eS0wXCJdXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVdIC0gVGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ibG9ja2luZ10gLSBUaGUgYm9vbGVhbiBmbGFnIHRvIGJsb2NrIHRoZSBVSSBkdXJpbmcgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgKiAgIERlZmF1bHRzIGB0cnVlYC5cbiAgICAgICAqL1xuICAgICAgdHJhbnNpdGlvbihlbCwgdHJhbnNpdGlvbiwgb3B0cyA9IHt9KXtcbiAgICAgICAgbGV0IG93bmVyID0gaG9vay5fX3ZpZXcoKS5saXZlU29ja2V0Lm93bmVyKGVsKVxuICAgICAgICBKUy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBbXSwgSlMudHJhbnNpdGlvbkNsYXNzZXModHJhbnNpdGlvbiksIG9wdHMudGltZSwgb3duZXIsIG9wdHMuYmxvY2tpbmcpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFNldHMgYW4gYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byBzZXQgdGhlIGF0dHJpYnV0ZSBvbi5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIC0gVGhlIGF0dHJpYnV0ZSBuYW1lIHRvIHNldC5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0IGZvciB0aGUgYXR0cmlidXRlLlxuICAgICAgICovXG4gICAgICBzZXRBdHRyaWJ1dGUoZWwsIGF0dHIsIHZhbCl7IEpTLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsXV0sIFtdKSB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gYW4gZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIHJlbW92ZSB0aGUgYXR0cmlidXRlIGZyb20uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0ciAtIFRoZSBhdHRyaWJ1dGUgbmFtZSB0byByZW1vdmUuXG4gICAgICAgKi9cbiAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbCwgYXR0cil7IEpTLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtdLCBbYXR0cl0pIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCBiZXR3ZWVuIHR3byB2YWx1ZXMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byB0b2dnbGUgdGhlIGF0dHJpYnV0ZSBvbi5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIC0gVGhlIGF0dHJpYnV0ZSBuYW1lIHRvIHRvZ2dsZS5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWwxIC0gVGhlIGZpcnN0IHZhbHVlIHRvIHRvZ2dsZSBiZXR3ZWVuLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbDIgLSBUaGUgc2Vjb25kIHZhbHVlIHRvIHRvZ2dsZSBiZXR3ZWVuLlxuICAgICAgICovXG4gICAgICB0b2dnbGVBdHRyaWJ1dGUoZWwsIGF0dHIsIHZhbDEsIHZhbDIpeyBKUy50b2dnbGVBdHRyKGVsLCBhdHRyLCB2YWwxLCB2YWwyKSB9LFxuICAgIH1cbiAgfVxuXG4gIHB1c2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5KXtcbiAgICBpZihvblJlcGx5ID09PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZWYgPSB0aGlzLl9fdmlldygpLnB1c2hIb29rRXZlbnQodGhpcy5lbCwgbnVsbCwgZXZlbnQsIHBheWxvYWQsIChyZXBseSwgX3JlZikgPT4gcmVzb2x2ZShyZXBseSkpXG4gICAgICAgICAgaWYocmVmID09PSBmYWxzZSl7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwidW5hYmxlIHRvIHB1c2ggaG9vayBldmVudC4gTGl2ZVZpZXcgbm90IGNvbm5lY3RlZFwiKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9fdmlldygpLnB1c2hIb29rRXZlbnQodGhpcy5lbCwgbnVsbCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpXG4gIH1cblxuICBwdXNoRXZlbnRUbyhwaHhUYXJnZXQsIGV2ZW50LCBwYXlsb2FkID0ge30sIG9uUmVwbHkpe1xuICAgIGlmKG9uUmVwbHkgPT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX192aWV3KCkud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IHZpZXcucHVzaEhvb2tFdmVudCh0aGlzLmVsLCB0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCAocmVwbHksIF9yZWYpID0+IHJlc29sdmUocmVwbHkpKVxuICAgICAgICAgICAgaWYocmVmID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJ1bmFibGUgdG8gcHVzaCBob29rIGV2ZW50LiBMaXZlVmlldyBub3QgY29ubmVjdGVkXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9fdmlldygpLndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICByZXR1cm4gdmlldy5wdXNoSG9va0V2ZW50KHRoaXMuZWwsIHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZUV2ZW50KGV2ZW50LCBjYWxsYmFjayl7XG4gICAgbGV0IGNhbGxiYWNrUmVmID0gKGN1c3RvbUV2ZW50LCBieXBhc3MpID0+IGJ5cGFzcyA/IGV2ZW50IDogY2FsbGJhY2soY3VzdG9tRXZlbnQuZGV0YWlsKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGBwaHg6JHtldmVudH1gLCBjYWxsYmFja1JlZilcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmFkZChjYWxsYmFja1JlZilcbiAgICByZXR1cm4gY2FsbGJhY2tSZWZcbiAgfVxuXG4gIHJlbW92ZUhhbmRsZUV2ZW50KGNhbGxiYWNrUmVmKXtcbiAgICBsZXQgZXZlbnQgPSBjYWxsYmFja1JlZihudWxsLCB0cnVlKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGBwaHg6JHtldmVudH1gLCBjYWxsYmFja1JlZilcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFja1JlZilcbiAgfVxuXG4gIHVwbG9hZChuYW1lLCBmaWxlcyl7XG4gICAgcmV0dXJuIHRoaXMuX192aWV3KCkuZGlzcGF0Y2hVcGxvYWRzKG51bGwsIG5hbWUsIGZpbGVzKVxuICB9XG5cbiAgdXBsb2FkVG8ocGh4VGFyZ2V0LCBuYW1lLCBmaWxlcyl7XG4gICAgcmV0dXJuIHRoaXMuX192aWV3KCkud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHZpZXcuZGlzcGF0Y2hVcGxvYWRzKHRhcmdldEN0eCwgbmFtZSwgZmlsZXMpXG4gICAgfSlcbiAgfVxuXG4gIF9fY2xlYW51cF9fKCl7XG4gICAgdGhpcy5fX2xpc3RlbmVycy5mb3JFYWNoKGNhbGxiYWNrUmVmID0+IHRoaXMucmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpKVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCxcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgQ09OU0VDVVRJVkVfUkVMT0FEUyxcbiAgUEhYX0FVVE9fUkVDT1ZFUixcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLFxuICBQSFhfRElTQUJMRUQsXG4gIFBIWF9MT0FESU5HX0NMQVNTLFxuICBQSFhfRVJST1JfQ0xBU1MsXG4gIFBIWF9DTElFTlRfRVJST1JfQ0xBU1MsXG4gIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1MsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0hBU19TVUJNSVRURUQsXG4gIFBIWF9IT09LLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfUFJPR1JFU1MsXG4gIFBIWF9SRUFET05MWSxcbiAgUEhYX1JFRl9MT0FESU5HLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JFRl9MT0NLLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUkFDS19TVEFUSUMsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9NQUlOLFxuICBQSFhfTU9VTlRFRCxcbiAgUFVTSF9USU1FT1VULFxuICBQSFhfVklFV1BPUlRfVE9QLFxuICBQSFhfVklFV1BPUlRfQk9UVE9NLFxuICBNQVhfQ0hJTERfSk9JTl9BVFRFTVBUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9uZSxcbiAgY2xvc2VzdFBoeEJpbmRpbmcsXG4gIGlzRW1wdHksXG4gIGlzRXF1YWxPYmosXG4gIGxvZ0Vycm9yLFxuICBtYXliZSxcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRWxlbWVudFJlZiBmcm9tIFwiLi9lbGVtZW50X3JlZlwiXG5pbXBvcnQgRE9NUGF0Y2ggZnJvbSBcIi4vZG9tX3BhdGNoXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgUmVuZGVyZWQgZnJvbSBcIi4vcmVuZGVyZWRcIlxuaW1wb3J0IFZpZXdIb29rIGZyb20gXCIuL3ZpZXdfaG9va1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5leHBvcnQgbGV0IHByZXBlbmRGb3JtRGF0YUtleSA9IChrZXksIHByZWZpeCkgPT4ge1xuICBsZXQgaXNBcnJheSA9IGtleS5lbmRzV2l0aChcIltdXCIpXG4gIC8vIFJlbW92ZSB0aGUgXCJbXVwiIGlmIGl0J3MgYW4gYXJyYXlcbiAgbGV0IGJhc2VLZXkgPSBpc0FycmF5ID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleVxuICAvLyBSZXBsYWNlIGxhc3Qgb2NjdXJyZW5jZSBvZiBrZXkgYmVmb3JlIGEgY2xvc2luZyBicmFja2V0IG9yIHRoZSBlbmQgd2l0aCBrZXkgcGx1cyBzdWZmaXhcbiAgYmFzZUtleSA9IGJhc2VLZXkucmVwbGFjZSgvKFteXFxbXFxdXSspKFxcXT8kKS8sIGAke3ByZWZpeH0kMSQyYClcbiAgLy8gQWRkIGJhY2sgdGhlIFwiW11cIiBpZiBpdCB3YXMgYW4gYXJyYXlcbiAgaWYoaXNBcnJheSl7IGJhc2VLZXkgKz0gXCJbXVwiIH1cbiAgcmV0dXJuIGJhc2VLZXlcbn1cblxubGV0IHNlcmlhbGl6ZUZvcm0gPSAoZm9ybSwgbWV0YWRhdGEsIG9ubHlOYW1lcyA9IFtdKSA9PiB7XG4gIGNvbnN0IHtzdWJtaXR0ZXIsIC4uLm1ldGF9ID0gbWV0YWRhdGFcblxuICAvLyBXZSBtdXN0IGluamVjdCB0aGUgc3VibWl0dGVyIGluIHRoZSBvcmRlciB0aGF0IGl0IGV4aXN0cyBpbiB0aGUgRE9NXG4gIC8vIHJlbGF0aXZlIHRvIG90aGVyIGlucHV0cy4gRm9yIGV4YW1wbGUsIGZvciBjaGVja2JveCBncm91cHMsIHRoZSBvcmRlciBtdXN0IGJlIG1haW50YWluZWQuXG4gIGxldCBpbmplY3RlZEVsZW1lbnRcbiAgaWYoc3VibWl0dGVyICYmIHN1Ym1pdHRlci5uYW1lKXtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiXG4gICAgLy8gc2V0IHRoZSBmb3JtIGF0dHJpYnV0ZSBpZiB0aGUgc3VibWl0dGVyIGhhcyBvbmU7XG4gICAgLy8gdGhpcyBjYW4gaGFwcGVuIGlmIHRoZSBlbGVtZW50IGlzIG91dHNpZGUgdGhlIGFjdHVhbCBmb3JtIGVsZW1lbnRcbiAgICBjb25zdCBmb3JtSWQgPSBzdWJtaXR0ZXIuZ2V0QXR0cmlidXRlKFwiZm9ybVwiKVxuICAgIGlmKGZvcm1JZCl7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJmb3JtXCIsIGZvcm1JZClcbiAgICB9XG4gICAgaW5wdXQubmFtZSA9IHN1Ym1pdHRlci5uYW1lXG4gICAgaW5wdXQudmFsdWUgPSBzdWJtaXR0ZXIudmFsdWVcbiAgICBzdWJtaXR0ZXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoaW5wdXQsIHN1Ym1pdHRlcilcbiAgICBpbmplY3RlZEVsZW1lbnQgPSBpbnB1dFxuICB9XG5cbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcbiAgY29uc3QgdG9SZW1vdmUgPSBbXVxuXG4gIGZvcm1EYXRhLmZvckVhY2goKHZhbCwga2V5LCBfaW5kZXgpID0+IHtcbiAgICBpZih2YWwgaW5zdGFuY2VvZiBGaWxlKXsgdG9SZW1vdmUucHVzaChrZXkpIH1cbiAgfSlcblxuICAvLyBDbGVhbnVwIGFmdGVyIGJ1aWxkaW5nIGZpbGVEYXRhXG4gIHRvUmVtb3ZlLmZvckVhY2goa2V5ID0+IGZvcm1EYXRhLmRlbGV0ZShrZXkpKVxuXG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuXG4gIGxldCBlbGVtZW50cyA9IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cylcbiAgZm9yKGxldCBba2V5LCB2YWxdIG9mIGZvcm1EYXRhLmVudHJpZXMoKSl7XG4gICAgaWYob25seU5hbWVzLmxlbmd0aCA9PT0gMCB8fCBvbmx5TmFtZXMuaW5kZXhPZihrZXkpID49IDApe1xuICAgICAgbGV0IGlucHV0cyA9IGVsZW1lbnRzLmZpbHRlcihpbnB1dCA9PiBpbnB1dC5uYW1lID09PSBrZXkpXG4gICAgICBsZXQgaXNVbnVzZWQgPSAhaW5wdXRzLnNvbWUoaW5wdXQgPT4gKERPTS5wcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpIHx8IERPTS5wcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRCkpKVxuICAgICAgbGV0IGhpZGRlbiA9IGlucHV0cy5ldmVyeShpbnB1dCA9PiBpbnB1dC50eXBlID09PSBcImhpZGRlblwiKVxuICAgICAgaWYoaXNVbnVzZWQgJiYgIShzdWJtaXR0ZXIgJiYgc3VibWl0dGVyLm5hbWUgPT0ga2V5KSAmJiAhaGlkZGVuKXtcbiAgICAgICAgcGFyYW1zLmFwcGVuZChwcmVwZW5kRm9ybURhdGFLZXkoa2V5LCBcIl91bnVzZWRfXCIpLCBcIlwiKVxuICAgICAgfVxuICAgICAgcGFyYW1zLmFwcGVuZChrZXksIHZhbClcbiAgICB9XG4gIH1cblxuICAvLyByZW1vdmUgdGhlIGluamVjdGVkIGVsZW1lbnQgYWdhaW5cbiAgLy8gKGl0IHdvdWxkIGJlIHJlbW92ZWQgYnkgdGhlIG5leHQgZG9tIHBhdGNoIGFueXdheSwgYnV0IHRoaXMgaXMgY2xlYW5lcilcbiAgaWYoc3VibWl0dGVyICYmIGluamVjdGVkRWxlbWVudCl7XG4gICAgc3VibWl0dGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoaW5qZWN0ZWRFbGVtZW50KVxuICB9XG5cbiAgZm9yKGxldCBtZXRhS2V5IGluIG1ldGEpeyBwYXJhbXMuYXBwZW5kKG1ldGFLZXksIG1ldGFbbWV0YUtleV0pIH1cblxuICByZXR1cm4gcGFyYW1zLnRvU3RyaW5nKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIHN0YXRpYyBjbG9zZXN0VmlldyhlbCl7XG4gICAgbGV0IGxpdmVWaWV3RWwgPSBlbC5jbG9zZXN0KFBIWF9WSUVXX1NFTEVDVE9SKVxuICAgIHJldHVybiBsaXZlVmlld0VsID8gRE9NLnByaXZhdGUobGl2ZVZpZXdFbCwgXCJ2aWV3XCIpIDogbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IoZWwsIGxpdmVTb2NrZXQsIHBhcmVudFZpZXcsIGZsYXNoLCBsaXZlUmVmZXJlcil7XG4gICAgdGhpcy5pc0RlYWQgPSBmYWxzZVxuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmZsYXNoID0gZmxhc2hcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFZpZXdcbiAgICB0aGlzLnJvb3QgPSBwYXJlbnRWaWV3ID8gcGFyZW50Vmlldy5yb290IDogdGhpc1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIERPTS5wdXRQcml2YXRlKHRoaXMuZWwsIFwidmlld1wiLCB0aGlzKVxuICAgIHRoaXMuaWQgPSB0aGlzLmVsLmlkXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy5sYXN0QWNrUmVmID0gbnVsbFxuICAgIHRoaXMuY2hpbGRKb2lucyA9IDBcbiAgICB0aGlzLmxvYWRlclRpbWVyID0gbnVsbFxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLnBlbmRpbmdGb3JtcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMucmVkaXJlY3QgPSBmYWxzZVxuICAgIHRoaXMuaHJlZiA9IG51bGxcbiAgICB0aGlzLmpvaW5Db3VudCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuam9pbkNvdW50IC0gMSA6IDBcbiAgICB0aGlzLmpvaW5BdHRlbXB0cyA9IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2VcbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9IGZ1bmN0aW9uKG9uRG9uZSl7IG9uRG9uZSAmJiBvbkRvbmUoKSB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbigpeyB9XG4gICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IHRoaXMucGFyZW50ID8gbnVsbCA6IFtdXG4gICAgdGhpcy52aWV3SG9va3MgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5mb3Jtc0ZvclJlY292ZXJ5ID0ge31cbiAgICB0aGlzLmNoYW5uZWwgPSB0aGlzLmxpdmVTb2NrZXQuY2hhbm5lbChgbHY6JHt0aGlzLmlkfWAsICgpID0+IHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmhyZWYgJiYgdGhpcy5leHBhbmRVUkwodGhpcy5ocmVmKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVkaXJlY3Q6IHRoaXMucmVkaXJlY3QgPyB1cmwgOiB1bmRlZmluZWQsXG4gICAgICAgIHVybDogdGhpcy5yZWRpcmVjdCA/IHVuZGVmaW5lZCA6IHVybCB8fCB1bmRlZmluZWQsXG4gICAgICAgIHBhcmFtczogdGhpcy5jb25uZWN0UGFyYW1zKGxpdmVSZWZlcmVyKSxcbiAgICAgICAgc2Vzc2lvbjogdGhpcy5nZXRTZXNzaW9uKCksXG4gICAgICAgIHN0YXRpYzogdGhpcy5nZXRTdGF0aWMoKSxcbiAgICAgICAgZmxhc2g6IHRoaXMuZmxhc2gsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNldEhyZWYoaHJlZil7IHRoaXMuaHJlZiA9IGhyZWYgfVxuXG4gIHNldFJlZGlyZWN0KGhyZWYpe1xuICAgIHRoaXMucmVkaXJlY3QgPSB0cnVlXG4gICAgdGhpcy5ocmVmID0gaHJlZlxuICB9XG5cbiAgaXNNYWluKCl7IHJldHVybiB0aGlzLmVsLmhhc0F0dHJpYnV0ZShQSFhfTUFJTikgfVxuXG4gIGNvbm5lY3RQYXJhbXMobGl2ZVJlZmVyZXIpe1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmxpdmVTb2NrZXQucGFyYW1zKHRoaXMuZWwpXG4gICAgbGV0IG1hbmlmZXN0ID1cbiAgICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX1RSQUNLX1NUQVRJQyl9XWApXG4gICAgICAgIC5tYXAobm9kZSA9PiBub2RlLnNyYyB8fCBub2RlLmhyZWYpLmZpbHRlcih1cmwgPT4gdHlwZW9mICh1cmwpID09PSBcInN0cmluZ1wiKVxuXG4gICAgaWYobWFuaWZlc3QubGVuZ3RoID4gMCl7IHBhcmFtc1tcIl90cmFja19zdGF0aWNcIl0gPSBtYW5pZmVzdCB9XG4gICAgcGFyYW1zW1wiX21vdW50c1wiXSA9IHRoaXMuam9pbkNvdW50XG4gICAgcGFyYW1zW1wiX21vdW50X2F0dGVtcHRzXCJdID0gdGhpcy5qb2luQXR0ZW1wdHNcbiAgICBwYXJhbXNbXCJfbGl2ZV9yZWZlcmVyXCJdID0gbGl2ZVJlZmVyZXJcbiAgICB0aGlzLmpvaW5BdHRlbXB0cysrXG5cbiAgICByZXR1cm4gcGFyYW1zXG4gIH1cblxuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5jaGFubmVsLmNhblB1c2goKSB9XG5cbiAgZ2V0U2Vzc2lvbigpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pIH1cblxuICBnZXRTdGF0aWMoKXtcbiAgICBsZXQgdmFsID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQylcbiAgICByZXR1cm4gdmFsID09PSBcIlwiID8gbnVsbCA6IHZhbFxuICB9XG5cbiAgZGVzdHJveShjYWxsYmFjayA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlXG4gICAgZGVsZXRlIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVxuICAgIGlmKHRoaXMucGFyZW50KXsgZGVsZXRlIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLnBhcmVudC5pZF1bdGhpcy5pZF0gfVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGxldCBvbkZpbmlzaGVkID0gKCkgPT4ge1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLnZpZXdIb29rcyl7XG4gICAgICAgIHRoaXMuZGVzdHJveUhvb2sodGhpcy52aWV3SG9va3NbaWRdKVxuICAgICAgfVxuICAgIH1cblxuICAgIERPTS5tYXJrUGh4Q2hpbGREZXN0cm95ZWQodGhpcy5lbClcblxuICAgIHRoaXMubG9nKFwiZGVzdHJveWVkXCIsICgpID0+IFtcInRoZSBjaGlsZCBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhcmVudFwiXSlcbiAgICB0aGlzLmNoYW5uZWwubGVhdmUoKVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCBvbkZpbmlzaGVkKVxuICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCBvbkZpbmlzaGVkKVxuICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsIG9uRmluaXNoZWQpXG4gIH1cblxuICBzZXRDb250YWluZXJDbGFzc2VzKC4uLmNsYXNzZXMpe1xuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIFBIWF9DT05ORUNURURfQ0xBU1MsXG4gICAgICBQSFhfTE9BRElOR19DTEFTUyxcbiAgICAgIFBIWF9FUlJPUl9DTEFTUyxcbiAgICAgIFBIWF9DTElFTlRfRVJST1JfQ0xBU1MsXG4gICAgICBQSFhfU0VSVkVSX0VSUk9SX0NMQVNTXG4gICAgKVxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICB9XG5cbiAgc2hvd0xvYWRlcih0aW1lb3V0KXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICBpZih0aW1lb3V0KXtcbiAgICAgIHRoaXMubG9hZGVyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2hvd0xvYWRlcigpLCB0aW1lb3V0KVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXsgdGhpcy52aWV3SG9va3NbaWRdLl9fZGlzY29ubmVjdGVkKCkgfVxuICAgICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9MT0FESU5HX0NMQVNTKVxuICAgIH1cbiAgfVxuXG4gIGV4ZWNBbGwoYmluZGluZyl7XG4gICAgRE9NLmFsbCh0aGlzLmVsLCBgWyR7YmluZGluZ31dYCwgZWwgPT4gdGhpcy5saXZlU29ja2V0LmV4ZWNKUyhlbCwgZWwuZ2V0QXR0cmlidXRlKGJpbmRpbmcpKSlcbiAgfVxuXG4gIGhpZGVMb2FkZXIoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0NPTk5FQ1RFRF9DTEFTUylcbiAgICB0aGlzLmV4ZWNBbGwodGhpcy5iaW5kaW5nKFwiY29ubmVjdGVkXCIpKVxuICB9XG5cbiAgdHJpZ2dlclJlY29ubmVjdGVkKCl7XG4gICAgZm9yKGxldCBpZCBpbiB0aGlzLnZpZXdIb29rcyl7IHRoaXMudmlld0hvb2tzW2lkXS5fX3JlY29ubmVjdGVkKCkgfVxuICB9XG5cbiAgbG9nKGtpbmQsIG1zZ0NhbGxiYWNrKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQubG9nKHRoaXMsIGtpbmQsIG1zZ0NhbGxiYWNrKVxuICB9XG5cbiAgdHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUgPSBmdW5jdGlvbigpe30pe1xuICAgIHRoaXMubGl2ZVNvY2tldC50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfVxuXG4gIC8vIGNhbGxzIHRoZSBjYWxsYmFjayB3aXRoIHRoZSB2aWV3IGFuZCB0YXJnZXQgZWxlbWVudCBmb3IgdGhlIGdpdmVuIHBoeFRhcmdldFxuICAvLyB0YXJnZXRzIGNhbiBiZTpcbiAgLy8gICogYW4gZWxlbWVudCBpdHNlbGYsIHRoZW4gaXQgaXMgc2ltcGx5IHBhc3NlZCB0byBsaXZlU29ja2V0Lm93bmVyO1xuICAvLyAgKiBhIENJRCAoQ29tcG9uZW50IElEKSwgdGhlbiB3ZSBmaXJzdCBzZWFyY2ggdGhlIGNvbXBvbmVudCdzIGVsZW1lbnQgaW4gdGhlIERPTVxuICAvLyAgKiBhIHNlbGVjdG9yLCB0aGVuIHdlIHNlYXJjaCB0aGUgc2VsZWN0b3IgaW4gdGhlIERPTSBhbmQgY2FsbCB0aGUgY2FsbGJhY2tcbiAgLy8gICAgZm9yIGVhY2ggZWxlbWVudCBmb3VuZCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIG93bmVyIHZpZXdcbiAgd2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIGNhbGxiYWNrLCBkb20gPSBkb2N1bWVudCwgdmlld0VsKXtcbiAgICAvLyBpbiB0aGUgZm9ybSByZWNvdmVyeSBjYXNlIHdlIHNlYXJjaCBpbiBhIHRlbXBsYXRlIGZyYWdtZW50IGluc3RlYWQgb2ZcbiAgICAvLyB0aGUgcmVhbCBkb20sIHRoZXJlZm9yZSB3ZSBvcHRpb25hbGx5IHBhc3MgZG9tIGFuZCB2aWV3RWxcblxuICAgIGlmKHBoeFRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHBoeFRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5vd25lcihwaHhUYXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgcGh4VGFyZ2V0KSlcbiAgICB9XG5cbiAgICBpZihpc0NpZChwaHhUYXJnZXQpKXtcbiAgICAgIGxldCB0YXJnZXRzID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh2aWV3RWwgfHwgdGhpcy5lbCwgcGh4VGFyZ2V0KVxuICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPT09IDApe1xuICAgICAgICBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvdW5kIG1hdGNoaW5nIHBoeC10YXJnZXQgb2YgJHtwaHhUYXJnZXR9YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMsIHBhcnNlSW50KHBoeFRhcmdldCkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXJnZXRzID0gQXJyYXkuZnJvbShkb20ucXVlcnlTZWxlY3RvckFsbChwaHhUYXJnZXQpKVxuICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPT09IDApeyBsb2dFcnJvcihgbm90aGluZyBmb3VuZCBtYXRjaGluZyB0aGUgcGh4LXRhcmdldCBzZWxlY3RvciBcIiR7cGh4VGFyZ2V0fVwiYCkgfVxuICAgICAgdGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB0aGlzLmxpdmVTb2NrZXQub3duZXIodGFyZ2V0LCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIHRhcmdldCkpKVxuICAgIH1cbiAgfVxuXG4gIGFwcGx5RGlmZih0eXBlLCByYXdEaWZmLCBjYWxsYmFjayl7XG4gICAgdGhpcy5sb2codHlwZSwgKCkgPT4gW1wiXCIsIGNsb25lKHJhd0RpZmYpXSlcbiAgICBsZXQge2RpZmYsIHJlcGx5LCBldmVudHMsIHRpdGxlfSA9IFJlbmRlcmVkLmV4dHJhY3QocmF3RGlmZilcbiAgICBjYWxsYmFjayh7ZGlmZiwgcmVwbHksIGV2ZW50c30pXG4gICAgaWYodHlwZW9mIHRpdGxlID09PSBcInN0cmluZ1wiIHx8IHR5cGUgPT0gXCJtb3VudFwiKXsgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBET00ucHV0VGl0bGUodGl0bGUpKSB9XG4gIH1cblxuICBvbkpvaW4ocmVzcCl7XG4gICAgbGV0IHtyZW5kZXJlZCwgY29udGFpbmVyLCBsaXZldmlld192ZXJzaW9ufSA9IHJlc3BcbiAgICBpZihjb250YWluZXIpe1xuICAgICAgbGV0IFt0YWcsIGF0dHJzXSA9IGNvbnRhaW5lclxuICAgICAgdGhpcy5lbCA9IERPTS5yZXBsYWNlUm9vdENvbnRhaW5lcih0aGlzLmVsLCB0YWcsIGF0dHJzKVxuICAgIH1cbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5qb2luUGVuZGluZyA9IHRydWVcbiAgICB0aGlzLmZsYXNoID0gbnVsbFxuICAgIGlmKHRoaXMucm9vdCA9PT0gdGhpcyl7XG4gICAgICB0aGlzLmZvcm1zRm9yUmVjb3ZlcnkgPSB0aGlzLmdldEZvcm1zRm9yUmVjb3ZlcnkoKVxuICAgIH1cbiAgICBpZih0aGlzLmlzTWFpbigpICYmIHdpbmRvdy5oaXN0b3J5LnN0YXRlID09PSBudWxsKXtcbiAgICAgIC8vIHNldCBpbml0aWFsIGhpc3RvcnkgZW50cnkgaWYgdGhpcyBpcyB0aGUgZmlyc3QgcGFnZSBsb2FkIChubyBoaXN0b3J5KVxuICAgICAgQnJvd3Nlci5wdXNoU3RhdGUoXCJyZXBsYWNlXCIsIHtcbiAgICAgICAgdHlwZTogXCJwYXRjaFwiLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgcG9zaXRpb246IHRoaXMubGl2ZVNvY2tldC5jdXJyZW50SGlzdG9yeVBvc2l0aW9uXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmKGxpdmV2aWV3X3ZlcnNpb24gIT09IHRoaXMubGl2ZVNvY2tldC52ZXJzaW9uKCkpe1xuICAgICAgY29uc29sZS5lcnJvcihgTGl2ZVZpZXcgYXNzZXQgdmVyc2lvbiBtaXNtYXRjaC4gSmF2YVNjcmlwdCB2ZXJzaW9uICR7dGhpcy5saXZlU29ja2V0LnZlcnNpb24oKX0gdnMuIHNlcnZlciAke2xpdmV2aWV3X3ZlcnNpb259LiBUbyBhdm9pZCBpc3N1ZXMsIHBsZWFzZSBlbnN1cmUgdGhhdCB5b3VyIGFzc2V0cyB1c2UgdGhlIHNhbWUgdmVyc2lvbiBhcyB0aGUgc2VydmVyLmApXG4gICAgfVxuXG4gICAgQnJvd3Nlci5kcm9wTG9jYWwodGhpcy5saXZlU29ja2V0LmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTKVxuICAgIHRoaXMuYXBwbHlEaWZmKFwibW91bnRcIiwgcmVuZGVyZWQsICh7ZGlmZiwgZXZlbnRzfSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IG5ldyBSZW5kZXJlZCh0aGlzLmlkLCBkaWZmKVxuICAgICAgbGV0IFtodG1sLCBzdHJlYW1zXSA9IHRoaXMucmVuZGVyQ29udGFpbmVyKG51bGwsIFwiam9pblwiKVxuICAgICAgdGhpcy5kcm9wUGVuZGluZ1JlZnMoKVxuICAgICAgdGhpcy5qb2luQ291bnQrK1xuICAgICAgdGhpcy5qb2luQXR0ZW1wdHMgPSAwXG5cbiAgICAgIHRoaXMubWF5YmVSZWNvdmVyRm9ybXMoaHRtbCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGRyb3BQZW5kaW5nUmVmcygpe1xuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMucmVmU3JjKCl9XCJdYCwgZWwgPT4ge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfTE9BRElORylcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQylcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX0xPQ0spXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkNvbXBsZXRlKHtsaXZlX3BhdGNofSwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKXtcbiAgICAvLyBJbiBvcmRlciB0byBwcm92aWRlIGEgYmV0dGVyIGV4cGVyaWVuY2UsIHdlIHdhbnQgdG8gam9pblxuICAgIC8vIGFsbCBMaXZlVmlld3MgZmlyc3QgYW5kIG9ubHkgdGhlbiBhcHBseSB0aGVpciBwYXRjaGVzLlxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSB8fCAodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LmlzSm9pblBlbmRpbmcoKSkpe1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKVxuICAgIH1cblxuICAgIC8vIE9uZSBkb3duc2lkZSBvZiB0aGlzIGFwcHJvYWNoIGlzIHRoYXQgd2UgbmVlZCB0byBmaW5kIHBoeENoaWxkcmVuXG4gICAgLy8gaW4gdGhlIGh0bWwgZnJhZ21lbnQsIGluc3RlYWQgb2YgZGlyZWN0bHkgb24gdGhlIERPTS4gVGhlIGZyYWdtZW50XG4gICAgLy8gYWxzbyBkb2VzIG5vdCBpbmNsdWRlIFBIWF9TVEFUSUMsIHNvIHdlIG5lZWQgdG8gY29weSBpdCBvdmVyIGZyb21cbiAgICAvLyB0aGUgRE9NLlxuICAgIGxldCBuZXdDaGlsZHJlbiA9IERPTS5maW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHRoaXMuaWQpLmZpbHRlcih0b0VsID0+IHtcbiAgICAgIGxldCBmcm9tRWwgPSB0b0VsLmlkICYmIHRoaXMuZWwucXVlcnlTZWxlY3RvcihgW2lkPVwiJHt0b0VsLmlkfVwiXWApXG4gICAgICBsZXQgcGh4U3RhdGljID0gZnJvbUVsICYmIGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQylcbiAgICAgIGlmKHBoeFN0YXRpYyl7IHRvRWwuc2V0QXR0cmlidXRlKFBIWF9TVEFUSUMsIHBoeFN0YXRpYykgfVxuICAgICAgLy8gc2V0IFBIWF9ST09UX0lEIHRvIHByZXZlbnQgZXZlbnRzIGZyb20gYmVpbmcgZGlzcGF0Y2hlZCB0byB0aGUgcm9vdCB2aWV3XG4gICAgICAvLyB3aGlsZSB0aGUgY2hpbGQgam9pbiBpcyBzdGlsbCBwZW5kaW5nXG4gICAgICBpZihmcm9tRWwpeyBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpIH1cbiAgICAgIHJldHVybiB0aGlzLmpvaW5DaGlsZCh0b0VsKVxuICAgIH0pXG5cbiAgICBpZihuZXdDaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgaWYodGhpcy5wYXJlbnQpe1xuICAgICAgICB0aGlzLnJvb3QucGVuZGluZ0pvaW5PcHMucHVzaChbdGhpcywgKCkgPT4gdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXSlcbiAgICAgICAgdGhpcy5wYXJlbnQuYWNrSm9pbih0aGlzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpXG4gICAgICAgIHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvb3QucGVuZGluZ0pvaW5PcHMucHVzaChbdGhpcywgKCkgPT4gdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXSlcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUcnVlRG9jRWwoKXtcbiAgICB0aGlzLmVsID0gRE9NLmJ5SWQodGhpcy5pZClcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCwgdGhpcy5yb290LmlkKVxuICB9XG5cbiAgLy8gdGhpcyBpcyBpbnZva2VkIGZvciBkZWFkIGFuZCBsaXZlIHZpZXdzLCBzbyB3ZSBtdXN0IGZpbHRlciBieVxuICAvLyBieSBvd25lciB0byBlbnN1cmUgd2UgYXJlbid0IGR1cGxpY2F0aW5nIGhvb2tzIGFjcm9zcyBkaXNjb25uZWN0XG4gIC8vIGFuZCBjb25uZWN0ZWQgc3RhdGVzLiBUaGlzIGFsc28gaGFuZGxlcyBjYXNlcyB3aGVyZSBob29rcyBleGlzdFxuICAvLyBpbiBhIHJvb3QgbGF5b3V0IHdpdGggYSBMViBpbiB0aGUgYm9keVxuICBleGVjTmV3TW91bnRlZChwYXJlbnQgPSB0aGlzLmVsKXtcbiAgICBsZXQgcGh4Vmlld3BvcnRUb3AgPSB0aGlzLmJpbmRpbmcoUEhYX1ZJRVdQT1JUX1RPUClcbiAgICBsZXQgcGh4Vmlld3BvcnRCb3R0b20gPSB0aGlzLmJpbmRpbmcoUEhYX1ZJRVdQT1JUX0JPVFRPTSlcbiAgICBET00uYWxsKHBhcmVudCwgYFske3BoeFZpZXdwb3J0VG9wfV0sIFske3BoeFZpZXdwb3J0Qm90dG9tfV1gLCBob29rRWwgPT4ge1xuICAgICAgaWYodGhpcy5vd25zRWxlbWVudChob29rRWwpKXtcbiAgICAgICAgRE9NLm1haW50YWluUHJpdmF0ZUhvb2tzKGhvb2tFbCwgaG9va0VsLCBwaHhWaWV3cG9ydFRvcCwgcGh4Vmlld3BvcnRCb3R0b20pXG4gICAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGhvb2tFbClcbiAgICAgIH1cbiAgICB9KVxuICAgIERPTS5hbGwocGFyZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9IT09LKX1dLCBbZGF0YS1waHgtJHtQSFhfSE9PS31dYCwgaG9va0VsID0+IHtcbiAgICAgIGlmKHRoaXMub3duc0VsZW1lbnQoaG9va0VsKSl7XG4gICAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGhvb2tFbClcbiAgICAgIH1cbiAgICB9KVxuICAgIERPTS5hbGwocGFyZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9NT1VOVEVEKX1dYCwgZWwgPT4ge1xuICAgICAgaWYodGhpcy5vd25zRWxlbWVudChlbCkpe1xuICAgICAgICB0aGlzLm1heWJlTW91bnRlZChlbClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKXtcbiAgICB0aGlzLmF0dGFjaFRydWVEb2NFbCgpXG4gICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIHN0cmVhbXMsIG51bGwpXG4gICAgcGF0Y2gubWFya1BydW5hYmxlQ29udGVudEZvclJlbW92YWwoKVxuICAgIHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCBmYWxzZSwgdHJ1ZSlcbiAgICB0aGlzLmpvaW5OZXdDaGlsZHJlbigpXG4gICAgdGhpcy5leGVjTmV3TW91bnRlZCgpXG5cbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gZmFsc2VcbiAgICB0aGlzLmxpdmVTb2NrZXQuZGlzcGF0Y2hFdmVudHMoZXZlbnRzKVxuICAgIHRoaXMuYXBwbHlQZW5kaW5nVXBkYXRlcygpXG5cbiAgICBpZihsaXZlX3BhdGNoKXtcbiAgICAgIGxldCB7a2luZCwgdG99ID0gbGl2ZV9wYXRjaFxuICAgICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlQYXRjaCh0bywga2luZClcbiAgICB9XG4gICAgdGhpcy5oaWRlTG9hZGVyKClcbiAgICBpZih0aGlzLmpvaW5Db3VudCA+IDEpeyB0aGlzLnRyaWdnZXJSZWNvbm5lY3RlZCgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjaygpXG4gIH1cblxuICB0cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpe1xuICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25CZWZvcmVFbFVwZGF0ZWRcIiwgW2Zyb21FbCwgdG9FbF0pXG4gICAgbGV0IGhvb2sgPSB0aGlzLmdldEhvb2soZnJvbUVsKVxuICAgIGxldCBpc0lnbm9yZWQgPSBob29rICYmIERPTS5pc0lnbm9yZWQoZnJvbUVsLCB0aGlzLmJpbmRpbmcoUEhYX1VQREFURSkpXG4gICAgaWYoaG9vayAmJiAhZnJvbUVsLmlzRXF1YWxOb2RlKHRvRWwpICYmICEoaXNJZ25vcmVkICYmIGlzRXF1YWxPYmooZnJvbUVsLmRhdGFzZXQsIHRvRWwuZGF0YXNldCkpKXtcbiAgICAgIGhvb2suX19iZWZvcmVVcGRhdGUoKVxuICAgICAgcmV0dXJuIGhvb2tcbiAgICB9XG4gIH1cblxuICBtYXliZU1vdW50ZWQoZWwpe1xuICAgIGxldCBwaHhNb3VudGVkID0gZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfTU9VTlRFRCkpXG4gICAgbGV0IGhhc0JlZW5JbnZva2VkID0gcGh4TW91bnRlZCAmJiBET00ucHJpdmF0ZShlbCwgXCJtb3VudGVkXCIpXG4gICAgaWYocGh4TW91bnRlZCAmJiAhaGFzQmVlbkludm9rZWQpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LmV4ZWNKUyhlbCwgcGh4TW91bnRlZClcbiAgICAgIERPTS5wdXRQcml2YXRlKGVsLCBcIm1vdW50ZWRcIiwgdHJ1ZSlcbiAgICB9XG4gIH1cblxuICBtYXliZUFkZE5ld0hvb2soZWwpe1xuICAgIGxldCBuZXdIb29rID0gdGhpcy5hZGRIb29rKGVsKVxuICAgIGlmKG5ld0hvb2speyBuZXdIb29rLl9fbW91bnRlZCgpIH1cbiAgfVxuXG4gIHBlcmZvcm1QYXRjaChwYXRjaCwgcHJ1bmVDaWRzLCBpc0pvaW5QYXRjaCA9IGZhbHNlKXtcbiAgICBsZXQgcmVtb3ZlZEVscyA9IFtdXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuICAgIGxldCB1cGRhdGVkSG9va0lkcyA9IG5ldyBTZXQoKVxuXG4gICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvblBhdGNoU3RhcnRcIiwgW3BhdGNoLnRhcmdldENvbnRhaW5lcl0pXG5cbiAgICBwYXRjaC5hZnRlcihcImFkZGVkXCIsIGVsID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25Ob2RlQWRkZWRcIiwgW2VsXSlcbiAgICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgICAgbGV0IHBoeFZpZXdwb3J0Qm90dG9tID0gdGhpcy5iaW5kaW5nKFBIWF9WSUVXUE9SVF9CT1RUT00pXG4gICAgICBET00ubWFpbnRhaW5Qcml2YXRlSG9va3MoZWwsIGVsLCBwaHhWaWV3cG9ydFRvcCwgcGh4Vmlld3BvcnRCb3R0b20pXG4gICAgICB0aGlzLm1heWJlQWRkTmV3SG9vayhlbClcbiAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSl7IHRoaXMubWF5YmVNb3VudGVkKGVsKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwicGh4Q2hpbGRBZGRlZFwiLCBlbCA9PiB7XG4gICAgICBpZihET00uaXNQaHhTdGlja3koZWwpKXtcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LmpvaW5Sb290Vmlld3MoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGh4Q2hpbGRyZW5BZGRlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYmVmb3JlKFwidXBkYXRlZFwiLCAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICBsZXQgaG9vayA9IHRoaXMudHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZnJvbUVsLCB0b0VsKVxuICAgICAgaWYoaG9vayl7IHVwZGF0ZWRIb29rSWRzLmFkZChmcm9tRWwuaWQpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJ1cGRhdGVkXCIsIGVsID0+IHtcbiAgICAgIGlmKHVwZGF0ZWRIb29rSWRzLmhhcyhlbC5pZCkpeyB0aGlzLmdldEhvb2soZWwpLl9fdXBkYXRlZCgpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJkaXNjYXJkZWRcIiwgKGVsKSA9PiB7XG4gICAgICBpZihlbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpeyByZW1vdmVkRWxzLnB1c2goZWwpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJ0cmFuc2l0aW9uc0Rpc2NhcmRlZFwiLCBlbHMgPT4gdGhpcy5hZnRlckVsZW1lbnRzUmVtb3ZlZChlbHMsIHBydW5lQ2lkcykpXG4gICAgcGF0Y2gucGVyZm9ybShpc0pvaW5QYXRjaClcbiAgICB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKHJlbW92ZWRFbHMsIHBydW5lQ2lkcylcblxuICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25QYXRjaEVuZFwiLCBbcGF0Y2gudGFyZ2V0Q29udGFpbmVyXSlcbiAgICByZXR1cm4gcGh4Q2hpbGRyZW5BZGRlZFxuICB9XG5cbiAgYWZ0ZXJFbGVtZW50c1JlbW92ZWQoZWxlbWVudHMsIHBydW5lQ2lkcyl7XG4gICAgbGV0IGRlc3Ryb3llZENJRHMgPSBbXVxuICAgIGVsZW1lbnRzLmZvckVhY2gocGFyZW50ID0+IHtcbiAgICAgIGxldCBjb21wb25lbnRzID0gRE9NLmFsbChwYXJlbnQsIGBbJHtQSFhfQ09NUE9ORU5UfV1gKVxuICAgICAgbGV0IGhvb2tzID0gRE9NLmFsbChwYXJlbnQsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX0hPT0spfV0sIFtkYXRhLXBoeC1ob29rXWApXG4gICAgICBjb21wb25lbnRzLmNvbmNhdChwYXJlbnQpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBsZXQgY2lkID0gdGhpcy5jb21wb25lbnRJRChlbClcbiAgICAgICAgaWYoaXNDaWQoY2lkKSAmJiBkZXN0cm95ZWRDSURzLmluZGV4T2YoY2lkKSA9PT0gLTEpeyBkZXN0cm95ZWRDSURzLnB1c2goY2lkKSB9XG4gICAgICB9KVxuICAgICAgaG9va3MuY29uY2F0KHBhcmVudCkuZm9yRWFjaChob29rRWwgPT4ge1xuICAgICAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhob29rRWwpXG4gICAgICAgIGhvb2sgJiYgdGhpcy5kZXN0cm95SG9vayhob29rKVxuICAgICAgfSlcbiAgICB9KVxuICAgIC8vIFdlIHNob3VsZCBub3QgcHJ1bmVDaWRzIG9uIGpvaW5zLiBPdGhlcndpc2UsIGluIGNhc2Ugb2ZcbiAgICAvLyByZWpvaW5zLCB3ZSBtYXkgbm90aWZ5IGNpZHMgdGhhdCBubyBsb25nZXIgYmVsb25nIHRvIHRoZVxuICAgIC8vIGN1cnJlbnQgTGl2ZVZpZXcgdG8gYmUgcmVtb3ZlZC5cbiAgICBpZihwcnVuZUNpZHMpe1xuICAgICAgdGhpcy5tYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGRlc3Ryb3llZENJRHMpXG4gICAgfVxuICB9XG5cbiAgam9pbk5ld0NoaWxkcmVuKCl7XG4gICAgRE9NLmZpbmRQaHhDaGlsZHJlbih0aGlzLmVsLCB0aGlzLmlkKS5mb3JFYWNoKGVsID0+IHRoaXMuam9pbkNoaWxkKGVsKSlcbiAgfVxuXG4gIG1heWJlUmVjb3ZlckZvcm1zKGh0bWwsIGNhbGxiYWNrKXtcbiAgICBjb25zdCBwaHhDaGFuZ2UgPSB0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIilcbiAgICBjb25zdCBvbGRGb3JtcyA9IHRoaXMucm9vdC5mb3Jtc0ZvclJlY292ZXJ5XG4gICAgLy8gU28gd2h5IGRvIHdlIGNyZWF0ZSBhIHRlbXBsYXRlIGVsZW1lbnQgaGVyZT9cbiAgICAvLyBPbmUgd2F5IHRvIHJlY292ZXIgZm9ybXMgd291bGQgYmUgdG8gaW1tZWRpYXRlbHkgYXBwbHkgdGhlIG1vdW50XG4gICAgLy8gcGF0Y2ggYW5kIHRoZW4gYWZ0ZXJ3YXJkcyByZWNvdmVyIHRoZSBmb3Jtcy4gSG93ZXZlciwgdGhpcyB3b3VsZFxuICAgIC8vIGNhdXNlIGEgZmxpY2tlciwgYmVjYXVzZSB0aGUgbW91bnQgcGF0Y2ggd291bGQgcmVtb3ZlIHRoZSBmb3JtIGNvbnRlbnRcbiAgICAvLyB1bnRpbCBpdCBpcyByZXN0b3JlZC4gVGhlcmVmb3JlIExWIGRlY2lkZWQgdG8gZG8gZm9ybSByZWNvdmVyeSB3aXRoIHRoZVxuICAgIC8vIHJhdyBIVE1MIGJlZm9yZSBpdCBpcyBhcHBsaWVkIGFuZCBkZWxheSB0aGUgbW91bnQgcGF0Y2ggdW50aWwgdGhlIGZvcm1cbiAgICAvLyByZWNvdmVyeSBldmVudHMgYXJlIGRvbmUuXG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIC8vIGJlY2F1c2Ugd2Ugd29yayB3aXRoIGEgdGVtcGxhdGUgZWxlbWVudCwgd2UgbXVzdCBtYW51YWxseSBjb3B5IHRoZSBhdHRyaWJ1dGVzXG4gICAgLy8gb3RoZXJ3aXNlIHRoZSBvd25lciAvIHRhcmdldCBoZWxwZXJzIGRvbid0IHdvcmsgcHJvcGVybHlcbiAgICBjb25zdCByb290RWwgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkXG4gICAgcm9vdEVsLmlkID0gdGhpcy5pZFxuICAgIHJvb3RFbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdC5pZClcbiAgICByb290RWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCB0aGlzLmdldFNlc3Npb24oKSlcbiAgICByb290RWwuc2V0QXR0cmlidXRlKFBIWF9TVEFUSUMsIHRoaXMuZ2V0U3RhdGljKCkpXG4gICAgcm9vdEVsLnNldEF0dHJpYnV0ZShQSFhfUEFSRU5UX0lELCB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmlkIDogbnVsbClcblxuICAgIC8vIHdlIGdvIG92ZXIgYWxsIGZvcm0gZWxlbWVudHMgaW4gdGhlIG5ldyBIVE1MIGZvciB0aGUgTFZcbiAgICAvLyBhbmQgbG9vayBmb3Igb2xkIGZvcm1zIGluIHRoZSBgZm9ybXNGb3JSZWNvdmVyeWAgb2JqZWN0O1xuICAgIC8vIHRoZSBmb3Jtc0ZvclJlY292ZXJ5IGNhbiBhbHNvIGNvbnRhaW4gZm9ybXMgZnJvbSBjaGlsZCB2aWV3c1xuICAgIGNvbnN0IGZvcm1zVG9SZWNvdmVyID1cbiAgICAgIC8vIHdlIGdvIG92ZXIgYWxsIGZvcm1zIGluIHRoZSBuZXcgRE9NOyBiZWNhdXNlIHRoaXMgaXMgb25seSB0aGUgSFRNTCBmb3IgdGhlIGN1cnJlbnRcbiAgICAgIC8vIHZpZXcsIHdlIGNhbiBiZSBzdXJlIHRoYXQgYWxsIGZvcm1zIGFyZSBvd25lZCBieSB0aGlzIHZpZXc6XG4gICAgICBET00uYWxsKHRlbXBsYXRlLmNvbnRlbnQsIFwiZm9ybVwiKVxuICAgICAgICAvLyBvbmx5IHJlY292ZXIgZm9ybXMgdGhhdCBoYXZlIGFuIGlkIGFuZCBhcmUgaW4gdGhlIG9sZCBET01cbiAgICAgICAgLmZpbHRlcihuZXdGb3JtID0+IG5ld0Zvcm0uaWQgJiYgb2xkRm9ybXNbbmV3Rm9ybS5pZF0pXG4gICAgICAgIC8vIGFiYW5kb24gZm9ybXMgd2UgYWxyZWFkeSB0cmllZCB0byByZWNvdmVyIHRvIHByZXZlbnQgbG9vcGluZyBhIGZhaWxlZCBzdGF0ZVxuICAgICAgICAuZmlsdGVyKG5ld0Zvcm0gPT4gIXRoaXMucGVuZGluZ0Zvcm1zLmhhcyhuZXdGb3JtLmlkKSlcbiAgICAgICAgLy8gb25seSByZWNvdmVyIGlmIHRoZSBmb3JtIGhhcyB0aGUgc2FtZSBwaHgtY2hhbmdlIHZhbHVlXG4gICAgICAgIC5maWx0ZXIobmV3Rm9ybSA9PiBvbGRGb3Jtc1tuZXdGb3JtLmlkXS5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKSA9PT0gbmV3Rm9ybS5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKSlcbiAgICAgICAgLm1hcChuZXdGb3JtID0+IHtcbiAgICAgICAgICByZXR1cm4gW29sZEZvcm1zW25ld0Zvcm0uaWRdLCBuZXdGb3JtXVxuICAgICAgICB9KVxuXG4gICAgaWYoZm9ybXNUb1JlY292ZXIubGVuZ3RoID09PSAwKXtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgZm9ybXNUb1JlY292ZXIuZm9yRWFjaCgoW29sZEZvcm0sIG5ld0Zvcm1dLCBpKSA9PiB7XG4gICAgICB0aGlzLnBlbmRpbmdGb3Jtcy5hZGQobmV3Rm9ybS5pZClcbiAgICAgIC8vIGl0IGlzIGltcG9ydGFudCB0byB1c2UgdGhlIGZpcnN0RWxlbWVudENoaWxkIG9mIHRoZSB0ZW1wbGF0ZSBjb250ZW50XG4gICAgICAvLyBiZWNhdXNlIHdoZW4gdHJhdmVyc2luZyBhIGRvY3VtZW50RnJhZ21lbnQgdXNpbmcgcGFyZW50Tm9kZSwgd2Ugd29uJ3QgZXZlciBhcnJpdmUgYXRcbiAgICAgIC8vIHRoZSBmcmFnbWVudDsgYXMgdGhlIHRlbXBsYXRlIGlzIGFsd2F5cyBhIExpdmVWaWV3LCB3ZSBjYW4gYmUgc3VyZSB0aGF0IHRoZXJlIGlzIG9ubHlcbiAgICAgIC8vIG9uZSBjaGlsZCBvbiB0aGUgcm9vdCBsZXZlbFxuICAgICAgdGhpcy5wdXNoRm9ybVJlY292ZXJ5KG9sZEZvcm0sIG5ld0Zvcm0sIHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQsICgpID0+IHtcbiAgICAgICAgdGhpcy5wZW5kaW5nRm9ybXMuZGVsZXRlKG5ld0Zvcm0uaWQpXG4gICAgICAgIC8vIHdlIG9ubHkgY2FsbCB0aGUgY2FsbGJhY2sgb25jZSBhbGwgZm9ybXMgaGF2ZSBiZWVuIHJlY292ZXJlZFxuICAgICAgICBpZihpID09PSBmb3Jtc1RvUmVjb3Zlci5sZW5ndGggLSAxKXtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGdldENoaWxkQnlJZChpZCl7IHJldHVybiB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1baWRdIH1cblxuICBnZXREZXNjZW5kZW50QnlFbChlbCl7XG4gICAgaWYoZWwuaWQgPT09IHRoaXMuaWQpe1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpXT8uW2VsLmlkXVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lEZXNjZW5kZW50KGlkKXtcbiAgICBmb3IobGV0IHBhcmVudElkIGluIHRoaXMucm9vdC5jaGlsZHJlbil7XG4gICAgICBmb3IobGV0IGNoaWxkSWQgaW4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXSl7XG4gICAgICAgIGlmKGNoaWxkSWQgPT09IGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlbltwYXJlbnRJZF1bY2hpbGRJZF0uZGVzdHJveSgpIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBqb2luQ2hpbGQoZWwpe1xuICAgIGxldCBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRCeUlkKGVsLmlkKVxuICAgIGlmKCFjaGlsZCl7XG4gICAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLmxpdmVTb2NrZXQsIHRoaXMpXG4gICAgICB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1bdmlldy5pZF0gPSB2aWV3XG4gICAgICB2aWV3LmpvaW4oKVxuICAgICAgdGhpcy5jaGlsZEpvaW5zKytcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaXNKb2luUGVuZGluZygpeyByZXR1cm4gdGhpcy5qb2luUGVuZGluZyB9XG5cbiAgYWNrSm9pbihfY2hpbGQpe1xuICAgIHRoaXMuY2hpbGRKb2lucy0tXG5cbiAgICBpZih0aGlzLmNoaWxkSm9pbnMgPT09IDApe1xuICAgICAgaWYodGhpcy5wYXJlbnQpe1xuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpe1xuICAgIC8vIHdlIGNhbiBjbGVhciBwZW5kaW5nIGZvcm0gcmVjb3ZlcmllcyBub3cgdGhhdCB3ZSd2ZSBqb2luZWQuXG4gICAgLy8gVGhleSBlaXRoZXIgYWxsIHJlc29sdmVkIG9yIHdlcmUgYWJhbmRvbmVkXG4gICAgdGhpcy5wZW5kaW5nRm9ybXMuY2xlYXIoKVxuICAgIC8vIHdlIGNhbiBhbHNvIGNsZWFyIHRoZSBmb3Jtc0ZvclJlY292ZXJ5IG9iamVjdCB0byBub3Qga2VlcCBvbGQgZm9ybSBlbGVtZW50cyBhcm91bmRcbiAgICB0aGlzLmZvcm1zRm9yUmVjb3ZlcnkgPSB7fVxuICAgIHRoaXMuam9pbkNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZ0pvaW5PcHMuZm9yRWFjaCgoW3ZpZXcsIG9wXSkgPT4ge1xuICAgICAgICBpZighdmlldy5pc0Rlc3Ryb3llZCgpKXsgb3AoKSB9XG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IFtdXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZShkaWZmLCBldmVudHMpe1xuICAgIGlmKHRoaXMuaXNKb2luUGVuZGluZygpIHx8ICh0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSAmJiB0aGlzLnJvb3QuaXNNYWluKCkpKXtcbiAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKHtkaWZmLCBldmVudHN9KVxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZWQubWVyZ2VEaWZmKGRpZmYpXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuXG4gICAgLy8gV2hlbiB0aGUgZGlmZiBvbmx5IGNvbnRhaW5zIGNvbXBvbmVudCBkaWZmcywgdGhlbiB3YWxrIGNvbXBvbmVudHNcbiAgICAvLyBhbmQgcGF0Y2ggb25seSB0aGUgcGFyZW50IGNvbXBvbmVudCBjb250YWluZXJzIGZvdW5kIGluIHRoZSBkaWZmLlxuICAgIC8vIE90aGVyd2lzZSwgcGF0Y2ggZW50aXJlIExWIGNvbnRhaW5lci5cbiAgICBpZih0aGlzLnJlbmRlcmVkLmlzQ29tcG9uZW50T25seURpZmYoZGlmZikpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRpbWUoXCJjb21wb25lbnQgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgcGFyZW50Q2lkcyA9IERPTS5maW5kRXhpc3RpbmdQYXJlbnRDSURzKHRoaXMuZWwsIHRoaXMucmVuZGVyZWQuY29tcG9uZW50Q0lEcyhkaWZmKSlcbiAgICAgICAgcGFyZW50Q2lkcy5mb3JFYWNoKHBhcmVudENJRCA9PiB7XG4gICAgICAgICAgaWYodGhpcy5jb21wb25lbnRQYXRjaCh0aGlzLnJlbmRlcmVkLmdldENvbXBvbmVudChkaWZmLCBwYXJlbnRDSUQpLCBwYXJlbnRDSUQpKXsgcGh4Q2hpbGRyZW5BZGRlZCA9IHRydWUgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYoIWlzRW1wdHkoZGlmZikpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRpbWUoXCJmdWxsIHBhdGNoIGNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgICAgbGV0IFtodG1sLCBzdHJlYW1zXSA9IHRoaXMucmVuZGVyQ29udGFpbmVyKGRpZmYsIFwidXBkYXRlXCIpXG4gICAgICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBzdHJlYW1zLCBudWxsKVxuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMubGl2ZVNvY2tldC5kaXNwYXRjaEV2ZW50cyhldmVudHMpXG4gICAgaWYocGh4Q2hpbGRyZW5BZGRlZCl7IHRoaXMuam9pbk5ld0NoaWxkcmVuKCkgfVxuICB9XG5cbiAgcmVuZGVyQ29udGFpbmVyKGRpZmYsIGtpbmQpe1xuICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQudGltZShgdG9TdHJpbmcgZGlmZiAoJHtraW5kfSlgLCAoKSA9PiB7XG4gICAgICBsZXQgdGFnID0gdGhpcy5lbC50YWdOYW1lXG4gICAgICAvLyBEb24ndCBza2lwIGFueSBjb21wb25lbnQgaW4gdGhlIGRpZmYgbm9yIGFueSBtYXJrZWQgYXMgcHJ1bmVkXG4gICAgICAvLyAoYXMgdGhleSBtYXkgaGF2ZSBiZWVuIGFkZGVkIGJhY2spXG4gICAgICBsZXQgY2lkcyA9IGRpZmYgPyB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudENJRHMoZGlmZikgOiBudWxsXG4gICAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJlZC50b1N0cmluZyhjaWRzKVxuICAgICAgcmV0dXJuIFtgPCR7dGFnfT4ke2h0bWx9PC8ke3RhZ30+YCwgc3RyZWFtc11cbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50UGF0Y2goZGlmZiwgY2lkKXtcbiAgICBpZihpc0VtcHR5KGRpZmYpKSByZXR1cm4gZmFsc2VcbiAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRUb1N0cmluZyhjaWQpXG4gICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIHN0cmVhbXMsIGNpZClcbiAgICBsZXQgY2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgIHJldHVybiBjaGlsZHJlbkFkZGVkXG4gIH1cblxuICBnZXRIb29rKGVsKXsgcmV0dXJuIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChlbCldIH1cblxuICBhZGRIb29rKGVsKXtcbiAgICBsZXQgaG9va0VsSWQgPSBWaWV3SG9vay5lbGVtZW50SUQoZWwpXG5cbiAgICAvLyBvbmx5IGV2ZXIgdHJ5IHRvIGFkZCBob29rcyB0byBlbGVtZW50cyBvd25lZCBieSB0aGlzIHZpZXdcbiAgICBpZihlbC5nZXRBdHRyaWJ1dGUgJiYgIXRoaXMub3duc0VsZW1lbnQoZWwpKXsgcmV0dXJuIH1cblxuICAgIGlmKGhvb2tFbElkICYmICF0aGlzLnZpZXdIb29rc1tob29rRWxJZF0pe1xuICAgICAgLy8gaG9vayBjcmVhdGVkLCBidXQgbm90IGF0dGFjaGVkIChjcmVhdGVIb29rIGZvciB3ZWIgY29tcG9uZW50KVxuICAgICAgbGV0IGhvb2sgPSBET00uZ2V0Q3VzdG9tRWxIb29rKGVsKSB8fCBsb2dFcnJvcihgbm8gaG9vayBmb3VuZCBmb3IgY3VzdG9tIGVsZW1lbnQ6ICR7ZWwuaWR9YClcbiAgICAgIHRoaXMudmlld0hvb2tzW2hvb2tFbElkXSA9IGhvb2tcbiAgICAgIGhvb2suX19hdHRhY2hWaWV3KHRoaXMpXG4gICAgICByZXR1cm4gaG9va1xuICAgIH1cbiAgICBlbHNlIGlmKGhvb2tFbElkIHx8ICFlbC5nZXRBdHRyaWJ1dGUpe1xuICAgICAgLy8gbm8gaG9vayBmb3VuZFxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5ldyBob29rIGZvdW5kIHdpdGggcGh4LWhvb2sgYXR0cmlidXRlXG4gICAgICBsZXQgaG9va05hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoYGRhdGEtcGh4LSR7UEhYX0hPT0t9YCkgfHwgZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfSE9PSykpXG4gICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5saXZlU29ja2V0LmdldEhvb2tDYWxsYmFja3MoaG9va05hbWUpXG5cbiAgICAgIGlmKGNhbGxiYWNrcyl7XG4gICAgICAgIGlmKCFlbC5pZCl7IGxvZ0Vycm9yKGBubyBET00gSUQgZm9yIGhvb2sgXCIke2hvb2tOYW1lfVwiLiBIb29rcyByZXF1aXJlIGEgdW5pcXVlIElEIG9uIGVhY2ggZWxlbWVudC5gLCBlbCkgfVxuICAgICAgICBsZXQgaG9vayA9IG5ldyBWaWV3SG9vayh0aGlzLCBlbCwgY2FsbGJhY2tzKVxuICAgICAgICB0aGlzLnZpZXdIb29rc1tWaWV3SG9vay5lbGVtZW50SUQoaG9vay5lbCldID0gaG9va1xuICAgICAgICByZXR1cm4gaG9va1xuICAgICAgfSBlbHNlIGlmKGhvb2tOYW1lICE9PSBudWxsKXtcbiAgICAgICAgbG9nRXJyb3IoYHVua25vd24gaG9vayBmb3VuZCBmb3IgXCIke2hvb2tOYW1lfVwiYCwgZWwpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveUhvb2soaG9vayl7XG4gICAgLy8gX19kZXN0cm95ZWQgY2xlYXJzIHRoZSBlbGVtZW50SUQgZnJvbSB0aGUgaG9vaywgdGhlcmVmb3JlXG4gICAgLy8gd2UgbmVlZCB0byBnZXQgaXQgYmVmb3JlIGNhbGxpbmcgX19kZXN0cm95ZWRcbiAgICBjb25zdCBob29rSWQgPSBWaWV3SG9vay5lbGVtZW50SUQoaG9vay5lbClcbiAgICBob29rLl9fZGVzdHJveWVkKClcbiAgICBob29rLl9fY2xlYW51cF9fKClcbiAgICBkZWxldGUgdGhpcy52aWV3SG9va3NbaG9va0lkXVxuICB9XG5cbiAgYXBwbHlQZW5kaW5nVXBkYXRlcygpe1xuICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmVhY2hDaGlsZChjaGlsZCA9PiBjaGlsZC5hcHBseVBlbmRpbmdVcGRhdGVzKCkpXG4gIH1cblxuICBlYWNoQ2hpbGQoY2FsbGJhY2spe1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSB8fCB7fVxuICAgIGZvcihsZXQgaWQgaW4gY2hpbGRyZW4peyBjYWxsYmFjayh0aGlzLmdldENoaWxkQnlJZChpZCkpIH1cbiAgfVxuXG4gIG9uQ2hhbm5lbChldmVudCwgY2Ipe1xuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiBjYihyZXNwKV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiBjYihyZXNwKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYmluZENoYW5uZWwoKXtcbiAgICAvLyBUaGUgZGlmZiBldmVudCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgcmVndWxhciB1cGRhdGUgb3BlcmF0aW9ucy5cbiAgICAvLyBBbGwgb3RoZXIgb3BlcmF0aW9ucyBhcmUgcXVldWVkIHRvIGJlIGFwcGxpZWQgb25seSBhZnRlciBqb2luLlxuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBcImRpZmZcIiwgKHJhd0RpZmYpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmF3RGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMub25DaGFubmVsKFwicmVkaXJlY3RcIiwgKHt0bywgZmxhc2h9KSA9PiB0aGlzLm9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0pKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9wYXRjaFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUGF0Y2gocmVkaXIpKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9yZWRpcmVjdFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUmVkaXJlY3QocmVkaXIpKVxuICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLm9uRXJyb3IocmVhc29uKSlcbiAgICB0aGlzLmNoYW5uZWwub25DbG9zZShyZWFzb24gPT4gdGhpcy5vbkNsb3NlKHJlYXNvbikpXG4gIH1cblxuICBkZXN0cm95QWxsQ2hpbGRyZW4oKXsgdGhpcy5lYWNoQ2hpbGQoY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKSB9XG5cbiAgb25MaXZlUmVkaXJlY3QocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmQsIGZsYXNofSA9IHJlZGlyXG4gICAgbGV0IHVybCA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIGxldCBlID0gbmV3IEN1c3RvbUV2ZW50KFwicGh4OnNlcnZlci1uYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7dG8sIGtpbmQsIGZsYXNofX0pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdChlLCB1cmwsIGtpbmQsIGZsYXNoKVxuICB9XG5cbiAgb25MaXZlUGF0Y2gocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmR9ID0gcmVkaXJcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmV4cGFuZFVSTCh0bylcbiAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICB9XG5cbiAgZXhwYW5kVVJMKHRvKXtcbiAgICByZXR1cm4gdG8uc3RhcnRzV2l0aChcIi9cIikgPyBgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7dG99YCA6IHRvXG4gIH1cblxuICBvblJlZGlyZWN0KHt0bywgZmxhc2gsIHJlbG9hZFRva2VufSl7IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh0bywgZmxhc2gsIHJlbG9hZFRva2VuKSB9XG5cbiAgaXNEZXN0cm95ZWQoKXsgcmV0dXJuIHRoaXMuZGVzdHJveWVkIH1cblxuICBqb2luRGVhZCgpeyB0aGlzLmlzRGVhZCA9IHRydWUgfVxuXG4gIGpvaW5QdXNoKCl7XG4gICAgdGhpcy5qb2luUHVzaCA9IHRoaXMuam9pblB1c2ggfHwgdGhpcy5jaGFubmVsLmpvaW4oKVxuICAgIHJldHVybiB0aGlzLmpvaW5QdXNoXG4gIH1cblxuICBqb2luKGNhbGxiYWNrKXtcbiAgICB0aGlzLnNob3dMb2FkZXIodGhpcy5saXZlU29ja2V0LmxvYWRlclRpbWVvdXQpXG4gICAgdGhpcy5iaW5kQ2hhbm5lbCgpXG4gICAgaWYodGhpcy5pc01haW4oKSl7XG4gICAgICB0aGlzLnN0b3BDYWxsYmFjayA9IHRoaXMubGl2ZVNvY2tldC53aXRoUGFnZUxvYWRpbmcoe3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiaW5pdGlhbFwifSlcbiAgICB9XG4gICAgdGhpcy5qb2luQ2FsbGJhY2sgPSAob25Eb25lKSA9PiB7XG4gICAgICBvbkRvbmUgPSBvbkRvbmUgfHwgZnVuY3Rpb24oKXt9XG4gICAgICBjYWxsYmFjayA/IGNhbGxiYWNrKHRoaXMuam9pbkNvdW50LCBvbkRvbmUpIDogb25Eb25lKClcbiAgICB9XG5cbiAgICB0aGlzLndyYXBQdXNoKCgpID0+IHRoaXMuY2hhbm5lbC5qb2luKCksIHtcbiAgICAgIG9rOiAocmVzcCkgPT4gdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5vbkpvaW4ocmVzcCkpLFxuICAgICAgZXJyb3I6IChlcnJvcikgPT4gdGhpcy5vbkpvaW5FcnJvcihlcnJvciksXG4gICAgICB0aW1lb3V0OiAoKSA9PiB0aGlzLm9uSm9pbkVycm9yKHtyZWFzb246IFwidGltZW91dFwifSlcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luRXJyb3IocmVzcCl7XG4gICAgaWYocmVzcC5yZWFzb24gPT09IFwicmVsb2FkXCIpe1xuICAgICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbYGZhaWxlZCBtb3VudCB3aXRoICR7cmVzcC5zdGF0dXN9LiBGYWxsaW5nIGJhY2sgdG8gcGFnZSByZWxvYWRgLCByZXNwXSlcbiAgICAgIHRoaXMub25SZWRpcmVjdCh7dG86IHRoaXMucm9vdC5ocmVmLCByZWxvYWRUb2tlbjogcmVzcC50b2tlbn0pXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYocmVzcC5yZWFzb24gPT09IFwidW5hdXRob3JpemVkXCIgfHwgcmVzcC5yZWFzb24gPT09IFwic3RhbGVcIil7XG4gICAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYXV0aG9yaXplZCBsaXZlX3JlZGlyZWN0LiBGYWxsaW5nIGJhY2sgdG8gcGFnZSByZXF1ZXN0XCIsIHJlc3BdKVxuICAgICAgdGhpcy5vblJlZGlyZWN0KHt0bzogdGhpcy5yb290LmhyZWZ9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKHJlc3AucmVkaXJlY3QgfHwgcmVzcC5saXZlX3JlZGlyZWN0KXtcbiAgICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5jaGFubmVsLmxlYXZlKClcbiAgICB9XG4gICAgaWYocmVzcC5yZWRpcmVjdCl7IHJldHVybiB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHJldHVybiB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlc3AubGl2ZV9yZWRpcmVjdCkgfVxuICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hYmxlIHRvIGpvaW5cIiwgcmVzcF0pXG4gICAgaWYodGhpcy5pc01haW4oKSl7XG4gICAgICB0aGlzLmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX1NFUlZFUl9FUlJPUl9DTEFTU10pXG4gICAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5qb2luQXR0ZW1wdHMgPj0gTUFYX0NISUxEX0pPSU5fQVRURU1QVFMpe1xuICAgICAgICAvLyBwdXQgdGhlIHJvb3QgcmV2aWV3IGludG8gcGVybWFuZW50IGVycm9yIHN0YXRlLCBidXQgZG9uJ3QgZGVzdHJveSBpdCBhcyBpdCBjYW4gcmVtYWluIGFjdGl2ZVxuICAgICAgICB0aGlzLnJvb3QuZGlzcGxheUVycm9yKFtQSFhfTE9BRElOR19DTEFTUywgUEhYX0VSUk9SX0NMQVNTLCBQSFhfU0VSVkVSX0VSUk9SX0NMQVNTXSlcbiAgICAgICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbYGdpdmluZyB1cCB0cnlpbmcgdG8gbW91bnQgYWZ0ZXIgJHtNQVhfQ0hJTERfSk9JTl9BVFRFTVBUU30gdHJpZXNgLCByZXNwXSlcbiAgICAgICAgdGhpcy5kZXN0cm95KClcbiAgICAgIH1cbiAgICAgIGxldCB0cnVlQ2hpbGRFbCA9IERPTS5ieUlkKHRoaXMuZWwuaWQpXG4gICAgICBpZih0cnVlQ2hpbGRFbCl7XG4gICAgICAgIERPTS5tZXJnZUF0dHJzKHRydWVDaGlsZEVsLCB0aGlzLmVsKVxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX1NFUlZFUl9FUlJPUl9DTEFTU10pXG4gICAgICAgIHRoaXMuZWwgPSB0cnVlQ2hpbGRFbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkNsb3NlKHJlYXNvbil7XG4gICAgaWYodGhpcy5pc0Rlc3Ryb3llZCgpKXsgcmV0dXJuIH1cbiAgICBpZih0aGlzLmlzTWFpbigpICYmIHRoaXMubGl2ZVNvY2tldC5oYXNQZW5kaW5nTGluaygpICYmIHJlYXNvbiAhPT0gXCJsZWF2ZVwiKXtcbiAgICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQucmVsb2FkV2l0aEppdHRlcih0aGlzKVxuICAgIH1cbiAgICB0aGlzLmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgdGhpcy5saXZlU29ja2V0LmRyb3BBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gYmUgbnVsbCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpeyBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKSB9XG4gICAgaWYodGhpcy5saXZlU29ja2V0LmlzVW5sb2FkZWQoKSl7XG4gICAgICB0aGlzLnNob3dMb2FkZXIoQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVClcbiAgICB9XG4gIH1cblxuICBvbkVycm9yKHJlYXNvbil7XG4gICAgdGhpcy5vbkNsb3NlKHJlYXNvbilcbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widmlldyBjcmFzaGVkXCIsIHJlYXNvbl0pIH1cbiAgICBpZighdGhpcy5saXZlU29ja2V0LmlzVW5sb2FkZWQoKSl7XG4gICAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNDb25uZWN0ZWQoKSl7XG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yKFtQSFhfTE9BRElOR19DTEFTUywgUEhYX0VSUk9SX0NMQVNTLCBQSFhfU0VSVkVSX0VSUk9SX0NMQVNTXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yKFtQSFhfTE9BRElOR19DTEFTUywgUEhYX0VSUk9SX0NMQVNTLCBQSFhfQ0xJRU5UX0VSUk9SX0NMQVNTXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNwbGF5RXJyb3IoY2xhc3Nlcyl7XG4gICAgaWYodGhpcy5pc01haW4oKSl7IERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIHtkZXRhaWw6IHt0bzogdGhpcy5ocmVmLCBraW5kOiBcImVycm9yXCJ9fSkgfVxuICAgIHRoaXMuc2hvd0xvYWRlcigpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKC4uLmNsYXNzZXMpXG4gICAgdGhpcy5leGVjQWxsKHRoaXMuYmluZGluZyhcImRpc2Nvbm5lY3RlZFwiKSlcbiAgfVxuXG4gIHdyYXBQdXNoKGNhbGxlclB1c2gsIHJlY2VpdmVzKXtcbiAgICBsZXQgbGF0ZW5jeSA9IHRoaXMubGl2ZVNvY2tldC5nZXRMYXRlbmN5U2ltKClcbiAgICBsZXQgd2l0aExhdGVuY3kgPSBsYXRlbmN5ID9cbiAgICAgIChjYikgPT4gc2V0VGltZW91dCgoKSA9PiAhdGhpcy5pc0Rlc3Ryb3llZCgpICYmIGNiKCksIGxhdGVuY3kpIDpcbiAgICAgIChjYikgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiBjYigpXG5cbiAgICB3aXRoTGF0ZW5jeSgoKSA9PiB7XG4gICAgICBjYWxsZXJQdXNoKClcbiAgICAgICAgLnJlY2VpdmUoXCJva1wiLCByZXNwID0+IHdpdGhMYXRlbmN5KCgpID0+IHJlY2VpdmVzLm9rICYmIHJlY2VpdmVzLm9rKHJlc3ApKSlcbiAgICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZWFzb24gPT4gd2l0aExhdGVuY3koKCkgPT4gcmVjZWl2ZXMuZXJyb3IgJiYgcmVjZWl2ZXMuZXJyb3IocmVhc29uKSkpXG4gICAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB3aXRoTGF0ZW5jeSgoKSA9PiByZWNlaXZlcy50aW1lb3V0ICYmIHJlY2VpdmVzLnRpbWVvdXQoKSkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBldmVudCwgcGF5bG9hZCl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiBQcm9taXNlLnJlamVjdCh7ZXJyb3I6IFwibm9jb25uZWN0aW9uXCJ9KSB9XG5cbiAgICBsZXQgW3JlZiwgW2VsXSwgb3B0c10gPSByZWZHZW5lcmF0b3IgPyByZWZHZW5lcmF0b3IoKSA6IFtudWxsLCBbXSwge31dXG4gICAgbGV0IG9sZEpvaW5Db3VudCA9IHRoaXMuam9pbkNvdW50XG4gICAgbGV0IG9uTG9hZGluZ0RvbmUgPSBmdW5jdGlvbigpe31cbiAgICBpZihvcHRzLnBhZ2VfbG9hZGluZyl7XG4gICAgICBvbkxvYWRpbmdEb25lID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7a2luZDogXCJlbGVtZW50XCIsIHRhcmdldDogZWx9KVxuICAgIH1cblxuICAgIGlmKHR5cGVvZiAocGF5bG9hZC5jaWQpICE9PSBcIm51bWJlclwiKXsgZGVsZXRlIHBheWxvYWQuY2lkIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLndyYXBQdXNoKCgpID0+IHRoaXMuY2hhbm5lbC5wdXNoKGV2ZW50LCBwYXlsb2FkLCBQVVNIX1RJTUVPVVQpLCB7XG4gICAgICAgIG9rOiAocmVzcCkgPT4ge1xuICAgICAgICAgIGlmKHJlZiAhPT0gbnVsbCl7IHRoaXMubGFzdEFja1JlZiA9IHJlZiB9XG4gICAgICAgICAgbGV0IGZpbmlzaCA9IChob29rUmVwbHkpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3AucmVkaXJlY3QpeyB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgICAgICAgICAgaWYocmVzcC5saXZlX3BhdGNoKXsgdGhpcy5vbkxpdmVQYXRjaChyZXNwLmxpdmVfcGF0Y2gpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgICBvbkxvYWRpbmdEb25lKClcbiAgICAgICAgICAgIHJlc29sdmUoe3Jlc3A6IHJlc3AsIHJlcGx5OiBob29rUmVwbHl9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXNwLmRpZmYpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFwcGx5RGlmZihcInVwZGF0ZVwiLCByZXNwLmRpZmYsICh7ZGlmZiwgcmVwbHksIGV2ZW50c30pID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZWYgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYsIHBheWxvYWQuZXZlbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRpZmYsIGV2ZW50cylcbiAgICAgICAgICAgICAgICBmaW5pc2gocmVwbHkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZiwgcGF5bG9hZC5ldmVudCkgfVxuICAgICAgICAgICAgZmluaXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHJlYXNvbikgPT4gcmVqZWN0KHtlcnJvcjogcmVhc29ufSksXG4gICAgICAgIHRpbWVvdXQ6ICgpID0+IHtcbiAgICAgICAgICByZWplY3Qoe3RpbWVvdXQ6IHRydWV9KVxuICAgICAgICAgIGlmKHRoaXMuam9pbkNvdW50ID09PSBvbGRKb2luQ291bnQpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcywgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZyhcInRpbWVvdXRcIiwgKCkgPT4gW1wicmVjZWl2ZWQgdGltZW91dCB3aGlsZSBjb21tdW5pY2F0aW5nIHdpdGggc2VydmVyLiBGYWxsaW5nIGJhY2sgdG8gaGFyZCByZWZyZXNoIGZvciByZWNvdmVyeVwiXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB1bmRvUmVmcyhyZWYsIHBoeEV2ZW50LCBvbmx5RWxzKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH0gLy8gZXhpdCBpZiBleHRlcm5hbCBmb3JtIHRyaWdnZXJlZFxuICAgIGxldCBzZWxlY3RvciA9IGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMucmVmU3JjKCl9XCJdYFxuXG4gICAgaWYob25seUVscyl7XG4gICAgICBvbmx5RWxzID0gbmV3IFNldChvbmx5RWxzKVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgc2VsZWN0b3IsIHBhcmVudCA9PiB7XG4gICAgICAgIGlmKG9ubHlFbHMgJiYgIW9ubHlFbHMuaGFzKHBhcmVudCkpeyByZXR1cm4gfVxuICAgICAgICAvLyB1bmRvIGFueSBjaGlsZCByZWZzIHdpdGhpbiBwYXJlbnQgZmlyc3RcbiAgICAgICAgRE9NLmFsbChwYXJlbnQsIHNlbGVjdG9yLCBjaGlsZCA9PiB0aGlzLnVuZG9FbFJlZihjaGlsZCwgcmVmLCBwaHhFdmVudCkpXG4gICAgICAgIHRoaXMudW5kb0VsUmVmKHBhcmVudCwgcmVmLCBwaHhFdmVudClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIERPTS5hbGwoZG9jdW1lbnQsIHNlbGVjdG9yLCBlbCA9PiB0aGlzLnVuZG9FbFJlZihlbCwgcmVmLCBwaHhFdmVudCkpXG4gICAgfVxuICB9XG5cbiAgdW5kb0VsUmVmKGVsLCByZWYsIHBoeEV2ZW50KXtcbiAgICBsZXQgZWxSZWYgPSBuZXcgRWxlbWVudFJlZihlbClcblxuICAgIGVsUmVmLm1heWJlVW5kbyhyZWYsIHBoeEV2ZW50LCBjbG9uZWRUcmVlID0+IHtcbiAgICAgIC8vIHdlIG5lZWQgdG8gcGVyZm9ybSBhIGZ1bGwgcGF0Y2ggb24gdW5sb2NrZWQgZWxlbWVudHNcbiAgICAgIC8vIHRvIHBlcmZvcm0gYWxsIHRoZSBuZWNlc3NhcnkgbG9naWMgKGxpa2UgY2FsbGluZyB1cGRhdGVkIGZvciBob29rcywgZXRjLilcbiAgICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCBlbCwgdGhpcy5pZCwgY2xvbmVkVHJlZSwgW10sIG51bGwsIHt1bmRvUmVmOiByZWZ9KVxuICAgICAgY29uc3QgcGh4Q2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgICAgRE9NLmFsbChlbCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5yZWZTcmMoKX1cIl1gLCBjaGlsZCA9PiB0aGlzLnVuZG9FbFJlZihjaGlsZCwgcmVmLCBwaHhFdmVudCkpXG4gICAgICBpZihwaHhDaGlsZHJlbkFkZGVkKXsgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKSB9XG4gICAgfSlcbiAgfVxuXG4gIHJlZlNyYygpeyByZXR1cm4gdGhpcy5lbC5pZCB9XG5cbiAgcHV0UmVmKGVsZW1lbnRzLCBwaHhFdmVudCwgZXZlbnRUeXBlLCBvcHRzID0ge30pe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZisrXG4gICAgbGV0IGRpc2FibGVXaXRoID0gdGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgaWYob3B0cy5sb2FkaW5nKXtcbiAgICAgIGxldCBsb2FkaW5nRWxzID0gRE9NLmFsbChkb2N1bWVudCwgb3B0cy5sb2FkaW5nKS5tYXAoZWwgPT4ge1xuICAgICAgICByZXR1cm4ge2VsLCBsb2NrOiB0cnVlLCBsb2FkaW5nOiB0cnVlfVxuICAgICAgfSlcbiAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KGxvYWRpbmdFbHMpXG4gICAgfVxuXG4gICAgZm9yKGxldCB7ZWwsIGxvY2ssIGxvYWRpbmd9IG9mIGVsZW1lbnRzKXtcbiAgICAgIGlmKCFsb2NrICYmICFsb2FkaW5nKXsgdGhyb3cgbmV3IEVycm9yKFwicHV0UmVmIHJlcXVpcmVzIGxvY2sgb3IgbG9hZGluZ1wiKSB9XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHRoaXMucmVmU3JjKCkpXG4gICAgICBpZihsb2FkaW5nKXsgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfTE9BRElORywgbmV3UmVmKSB9XG4gICAgICBpZihsb2NrKXsgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfTE9DSywgbmV3UmVmKSB9XG5cbiAgICAgIGlmKCFsb2FkaW5nIHx8IChvcHRzLnN1Ym1pdHRlciAmJiAhKGVsID09PSBvcHRzLnN1Ym1pdHRlciB8fCBlbCA9PT0gb3B0cy5mb3JtKSkpeyBjb250aW51ZSB9XG5cbiAgICAgIGxldCBsb2NrQ29tcGxldGVQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoYHBoeDp1bmRvLWxvY2s6JHtuZXdSZWZ9YCwgKCkgPT4gcmVzb2x2ZShkZXRhaWwpLCB7b25jZTogdHJ1ZX0pXG4gICAgICB9KVxuXG4gICAgICBsZXQgbG9hZGluZ0NvbXBsZXRlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGBwaHg6dW5kby1sb2FkaW5nOiR7bmV3UmVmfWAsICgpID0+IHJlc29sdmUoZGV0YWlsKSwge29uY2U6IHRydWV9KVxuICAgICAgfSlcblxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgcGh4LSR7ZXZlbnRUeXBlfS1sb2FkaW5nYClcbiAgICAgIGxldCBkaXNhYmxlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aClcbiAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBudWxsKXtcbiAgICAgICAgaWYoIWVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpKXtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLCBlbC5pbm5lclRleHQpXG4gICAgICAgIH1cbiAgICAgICAgaWYoZGlzYWJsZVRleHQgIT09IFwiXCIpeyBlbC5pbm5lclRleHQgPSBkaXNhYmxlVGV4dCB9XG4gICAgICAgIC8vIFBIWF9ESVNBQkxFRCBjb3VsZCBoYXZlIGFscmVhZHkgYmVlbiBzZXQgaW4gZGlzYWJsZUZvcm1cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCkgfHwgZWwuZGlzYWJsZWQpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpXG4gICAgICB9XG5cbiAgICAgIGxldCBkZXRhaWwgPSB7XG4gICAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUsXG4gICAgICAgIHJlZjogbmV3UmVmLFxuICAgICAgICBpc0xvYWRpbmc6IGxvYWRpbmcsXG4gICAgICAgIGlzTG9ja2VkOiBsb2NrLFxuICAgICAgICBsb2NrRWxlbWVudHM6IGVsZW1lbnRzLmZpbHRlcigoe2xvY2t9KSA9PiBsb2NrKS5tYXAoKHtlbH0pID0+IGVsKSxcbiAgICAgICAgbG9hZGluZ0VsZW1lbnRzOiBlbGVtZW50cy5maWx0ZXIoKHtsb2FkaW5nfSkgPT4gbG9hZGluZykubWFwKCh7ZWx9KSA9PiBlbCksXG4gICAgICAgIHVubG9jazogKGVscykgPT4ge1xuICAgICAgICAgIGVscyA9IEFycmF5LmlzQXJyYXkoZWxzKSA/IGVscyA6IFtlbHNdXG4gICAgICAgICAgdGhpcy51bmRvUmVmcyhuZXdSZWYsIHBoeEV2ZW50LCBlbHMpXG4gICAgICAgIH0sXG4gICAgICAgIGxvY2tDb21wbGV0ZTogbG9ja0NvbXBsZXRlUHJvbWlzZSxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBsb2FkaW5nQ29tcGxldGVQcm9taXNlLFxuICAgICAgICBsb2NrOiAobG9ja0VsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5pc0Fja2VkKG5ld1JlZikpeyByZXR1cm4gcmVzb2x2ZShkZXRhaWwpIH1cbiAgICAgICAgICAgIGxvY2tFbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9MT0NLLCBuZXdSZWYpXG4gICAgICAgICAgICBsb2NrRWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfU1JDLCB0aGlzLnJlZlNyYygpKVxuICAgICAgICAgICAgbG9ja0VsLmFkZEV2ZW50TGlzdGVuZXIoYHBoeDpsb2NrLXN0b3A6JHtuZXdSZWZ9YCwgKCkgPT4gcmVzb2x2ZShkZXRhaWwpLCB7b25jZTogdHJ1ZX0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJwaHg6cHVzaFwiLCB7XG4gICAgICAgIGRldGFpbDogZGV0YWlsLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZVxuICAgICAgfSkpXG4gICAgICBpZihwaHhFdmVudCl7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGBwaHg6cHVzaDoke3BoeEV2ZW50fWAsIHtcbiAgICAgICAgICBkZXRhaWw6IGRldGFpbCxcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW25ld1JlZiwgZWxlbWVudHMubWFwKCh7ZWx9KSA9PiBlbCksIG9wdHNdXG4gIH1cblxuICBpc0Fja2VkKHJlZil7IHJldHVybiB0aGlzLmxhc3RBY2tSZWYgIT09IG51bGwgJiYgdGhpcy5sYXN0QWNrUmVmID49IHJlZiB9XG5cbiAgY29tcG9uZW50SUQoZWwpe1xuICAgIGxldCBjaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpXG4gICAgcmV0dXJuIGNpZCA/IHBhcnNlSW50KGNpZCkgOiBudWxsXG4gIH1cblxuICB0YXJnZXRDb21wb25lbnRJRCh0YXJnZXQsIHRhcmdldEN0eCwgb3B0cyA9IHt9KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXsgcmV0dXJuIHRhcmdldEN0eCB9XG5cbiAgICBsZXQgY2lkT3JTZWxlY3RvciA9IG9wdHMudGFyZ2V0IHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKVxuICAgIGlmKGlzQ2lkKGNpZE9yU2VsZWN0b3IpKXtcbiAgICAgIHJldHVybiBwYXJzZUludChjaWRPclNlbGVjdG9yKVxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHggJiYgKGNpZE9yU2VsZWN0b3IgIT09IG51bGwgfHwgb3B0cy50YXJnZXQpKXtcbiAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eCl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7XG4gICAgICByZXR1cm4gdGFyZ2V0Q3R4XG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCl7XG4gICAgICByZXR1cm4gbWF5YmUodGFyZ2V0Q3R4LmNsb3Nlc3QoYFske1BIWF9DT01QT05FTlR9XWApLCBlbCA9PiB0aGlzLm93bnNFbGVtZW50KGVsKSAmJiB0aGlzLmNvbXBvbmVudElEKGVsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoSG9va0V2ZW50KGVsLCB0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMubG9nKFwiaG9va1wiLCAoKSA9PiBbXCJ1bmFibGUgdG8gcHVzaCBob29rIGV2ZW50LiBMaXZlVmlldyBub3QgY29ubmVjdGVkXCIsIGV2ZW50LCBwYXlsb2FkXSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBsZXQgW3JlZiwgZWxzLCBvcHRzXSA9IHRoaXMucHV0UmVmKFt7ZWwsIGxvYWRpbmc6IHRydWUsIGxvY2s6IHRydWV9XSwgZXZlbnQsIFwiaG9va1wiKVxuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiBbcmVmLCBlbHMsIG9wdHNdLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IFwiaG9va1wiLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdmFsdWU6IHBheWxvYWQsXG4gICAgICBjaWQ6IHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9KS50aGVuKCh7cmVzcDogX3Jlc3AsIHJlcGx5OiBob29rUmVwbHl9KSA9PiBvblJlcGx5KGhvb2tSZXBseSwgcmVmKSlcblxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIGV4dHJhY3RNZXRhKGVsLCBtZXRhLCB2YWx1ZSl7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuYmluZGluZyhcInZhbHVlLVwiKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGxldCBuYW1lID0gZWwuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgICBpZihuYW1lLnN0YXJ0c1dpdGgocHJlZml4KSl7IG1ldGFbbmFtZS5yZXBsYWNlKHByZWZpeCwgXCJcIildID0gZWwuZ2V0QXR0cmlidXRlKG5hbWUpIH1cbiAgICB9XG4gICAgaWYoZWwudmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKGVsIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBtZXRhLnZhbHVlID0gZWwudmFsdWVcblxuICAgICAgaWYoZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlKSA+PSAwICYmICFlbC5jaGVja2VkKXtcbiAgICAgICAgZGVsZXRlIG1ldGEudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodmFsdWUpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgZm9yKGxldCBrZXkgaW4gdmFsdWUpeyBtZXRhW2tleV0gPSB2YWx1ZVtrZXldIH1cbiAgICB9XG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG4gIHB1c2hFdmVudCh0eXBlLCBlbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgbWV0YSwgb3B0cyA9IHt9LCBvblJlcGx5KXtcbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkoKCkgPT4gdGhpcy5wdXRSZWYoW3tlbCwgbG9hZGluZzogdHJ1ZSwgbG9jazogdHJ1ZX1dLCBwaHhFdmVudCwgdHlwZSwgb3B0cyksIFwiZXZlbnRcIiwge1xuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiB0aGlzLmV4dHJhY3RNZXRhKGVsLCBtZXRhLCBvcHRzLnZhbHVlKSxcbiAgICAgIGNpZDogdGhpcy50YXJnZXRDb21wb25lbnRJRChlbCwgdGFyZ2V0Q3R4LCBvcHRzKVxuICAgIH0pLnRoZW4oKHtyZXBseX0pID0+IG9uUmVwbHkgJiYgb25SZXBseShyZXBseSkpXG4gIH1cblxuICBwdXNoRmlsZVByb2dyZXNzKGZpbGVFbCwgZW50cnlSZWYsIHByb2dyZXNzLCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZmlsZUVsLmZvcm0sICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHZpZXcucHVzaFdpdGhSZXBseShudWxsLCBcInByb2dyZXNzXCIsIHtcbiAgICAgICAgZXZlbnQ6IGZpbGVFbC5nZXRBdHRyaWJ1dGUodmlldy5iaW5kaW5nKFBIWF9QUk9HUkVTUykpLFxuICAgICAgICByZWY6IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpLFxuICAgICAgICBlbnRyeV9yZWY6IGVudHJ5UmVmLFxuICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgIGNpZDogdmlldy50YXJnZXRDb21wb25lbnRJRChmaWxlRWwuZm9ybSwgdGFyZ2V0Q3R4KVxuICAgICAgfSkudGhlbigoe3Jlc3B9KSA9PiBvblJlcGx5KHJlc3ApKVxuICAgIH0pXG4gIH1cblxuICBwdXNoSW5wdXQoaW5wdXRFbCwgdGFyZ2V0Q3R4LCBmb3JjZUNpZCwgcGh4RXZlbnQsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZighaW5wdXRFbC5mb3JtKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImZvcm0gZXZlbnRzIHJlcXVpcmUgdGhlIGlucHV0IHRvIGJlIGluc2lkZSBhIGZvcm1cIilcbiAgICB9XG5cbiAgICBsZXQgdXBsb2Fkc1xuICAgIGxldCBjaWQgPSBpc0NpZChmb3JjZUNpZCkgPyBmb3JjZUNpZCA6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoaW5wdXRFbC5mb3JtLCB0YXJnZXRDdHgsIG9wdHMpXG4gICAgbGV0IHJlZkdlbmVyYXRvciA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnB1dFJlZihbXG4gICAgICAgIHtlbDogaW5wdXRFbCwgbG9hZGluZzogdHJ1ZSwgbG9jazogdHJ1ZX0sXG4gICAgICAgIHtlbDogaW5wdXRFbC5mb3JtLCBsb2FkaW5nOiB0cnVlLCBsb2NrOiB0cnVlfVxuICAgICAgXSwgcGh4RXZlbnQsIFwiY2hhbmdlXCIsIG9wdHMpXG4gICAgfVxuICAgIGxldCBmb3JtRGF0YVxuICAgIGxldCBtZXRhICA9IHRoaXMuZXh0cmFjdE1ldGEoaW5wdXRFbC5mb3JtKVxuICAgIGlmKGlucHV0RWwgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCl7IG1ldGEuc3VibWl0dGVyID0gaW5wdXRFbCB9XG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKSl7XG4gICAgICBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCB7X3RhcmdldDogb3B0cy5fdGFyZ2V0LCAuLi5tZXRhfSwgW2lucHV0RWwubmFtZV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBvcHRzLl90YXJnZXQsIC4uLm1ldGF9KVxuICAgIH1cbiAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcblxuICAgIGxldCBldmVudCA9IHtcbiAgICAgIHR5cGU6IFwiZm9ybVwiLFxuICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgdXBsb2FkczogdXBsb2FkcyxcbiAgICAgIGNpZDogY2lkXG4gICAgfVxuICAgIHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIFwiZXZlbnRcIiwgZXZlbnQpLnRoZW4oKHtyZXNwfSkgPT4ge1xuICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoaW5wdXRFbCkgJiYgRE9NLmlzQXV0b1VwbG9hZChpbnB1dEVsKSl7XG4gICAgICAgIC8vIHRoZSBlbGVtZW50IGNvdWxkIGJlIGluc2lkZSBhIGxvY2tlZCBwYXJlbnQgZm9yIG90aGVyIHVucmVsYXRlZCBjaGFuZ2VzO1xuICAgICAgICAvLyB3ZSBjYW4gb25seSBzdGFydCB1cGxvYWRzIHdoZW4gdGhlIHRyZWUgaXMgdW5sb2NrZWQgYW5kIHRoZVxuICAgICAgICAvLyBuZWNlc3NhcnkgZGF0YSBhdHRyaWJ1dGVzIGFyZSBzZXQgaW4gdGhlIHJlYWwgRE9NXG4gICAgICAgIEVsZW1lbnRSZWYub25VbmxvY2soaW5wdXRFbCwgKCkgPT4ge1xuICAgICAgICAgIGlmKExpdmVVcGxvYWRlci5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0RWwpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgICAgICAgIHRoaXMudW5kb1JlZnMocmVmLCBwaHhFdmVudCwgW2lucHV0RWwuZm9ybV0pXG4gICAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGlucHV0RWwuZm9ybSwgcGh4RXZlbnQsIHRhcmdldEN0eCwgcmVmLCBjaWQsIChfdXBsb2FkcykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJBd2FpdGluZ1N1Ym1pdChpbnB1dEVsLmZvcm0sIHBoeEV2ZW50KVxuICAgICAgICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZiwgcGh4RXZlbnQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwsIHBoeEV2ZW50KXtcbiAgICBsZXQgYXdhaXRpbmdTdWJtaXQgPSB0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpXG4gICAgaWYoYXdhaXRpbmdTdWJtaXQpe1xuICAgICAgbGV0IFtfZWwsIF9yZWYsIF9vcHRzLCBjYWxsYmFja10gPSBhd2FpdGluZ1N1Ym1pdFxuICAgICAgdGhpcy5jYW5jZWxTdWJtaXQoZm9ybUVsLCBwaHhFdmVudClcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBnZXRTY2hlZHVsZWRTdWJtaXQoZm9ybUVsKXtcbiAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0cy5maW5kKChbZWwsIF9yZWYsIF9vcHRzLCBfY2FsbGJhY2tdKSA9PiBlbC5pc1NhbWVOb2RlKGZvcm1FbCkpXG4gIH1cblxuICBzY2hlZHVsZVN1Ym1pdChmb3JtRWwsIHJlZiwgb3B0cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCkpeyByZXR1cm4gdHJ1ZSB9XG4gICAgdGhpcy5mb3JtU3VibWl0cy5wdXNoKFtmb3JtRWwsIHJlZiwgb3B0cywgY2FsbGJhY2tdKVxuICB9XG5cbiAgY2FuY2VsU3VibWl0KGZvcm1FbCwgcGh4RXZlbnQpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSB0aGlzLmZvcm1TdWJtaXRzLmZpbHRlcigoW2VsLCByZWYsIF9vcHRzLCBfY2FsbGJhY2tdKSA9PiB7XG4gICAgICBpZihlbC5pc1NhbWVOb2RlKGZvcm1FbCkpe1xuICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZiwgcGh4RXZlbnQpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZGlzYWJsZUZvcm0oZm9ybUVsLCBwaHhFdmVudCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZmlsdGVySWdub3JlZCA9IGVsID0+IHtcbiAgICAgIGxldCB1c2VySWdub3JlZCA9IGNsb3Nlc3RQaHhCaW5kaW5nKGVsLCBgJHt0aGlzLmJpbmRpbmcoUEhYX1VQREFURSl9PWlnbm9yZWAsIGVsLmZvcm0pXG4gICAgICByZXR1cm4gISh1c2VySWdub3JlZCB8fCBjbG9zZXN0UGh4QmluZGluZyhlbCwgXCJkYXRhLXBoeC11cGRhdGU9aWdub3JlXCIsIGVsLmZvcm0pKVxuICAgIH1cbiAgICBsZXQgZmlsdGVyRGlzYWJsZXMgPSBlbCA9PiB7XG4gICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfRElTQUJMRV9XSVRIKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsID0+IGVsLnRhZ05hbWUgPT0gXCJCVVRUT05cIlxuXG4gICAgbGV0IGZpbHRlcklucHV0ID0gZWwgPT4gW1wiSU5QVVRcIiwgXCJURVhUQVJFQVwiLCBcIlNFTEVDVFwiXS5pbmNsdWRlcyhlbC50YWdOYW1lKVxuXG4gICAgbGV0IGZvcm1FbGVtZW50cyA9IEFycmF5LmZyb20oZm9ybUVsLmVsZW1lbnRzKVxuICAgIGxldCBkaXNhYmxlcyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVyRGlzYWJsZXMpXG4gICAgbGV0IGJ1dHRvbnMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckJ1dHRvbikuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG4gICAgbGV0IGlucHV0cyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVySW5wdXQpLmZpbHRlcihmaWx0ZXJJZ25vcmVkKVxuXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgYnV0dG9uLmRpc2FibGVkKVxuICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxuICAgIH0pXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSwgaW5wdXQucmVhZE9ubHkpXG4gICAgICBpbnB1dC5yZWFkT25seSA9IHRydWVcbiAgICAgIGlmKGlucHV0LmZpbGVzKXtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgaW5wdXQuZGlzYWJsZWQpXG4gICAgICAgIGlucHV0LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgbGV0IGZvcm1FbHMgPSBkaXNhYmxlcy5jb25jYXQoYnV0dG9ucykuY29uY2F0KGlucHV0cykubWFwKGVsID0+IHtcbiAgICAgIHJldHVybiB7ZWwsIGxvYWRpbmc6IHRydWUsIGxvY2s6IHRydWV9XG4gICAgfSlcblxuICAgIC8vIHdlIHJldmVyc2UgdGhlIG9yZGVyIHNvIGZvcm0gY2hpbGRyZW4gYXJlIGFscmVhZHkgbG9ja2VkIGJ5IHRoZSB0aW1lXG4gICAgLy8gdGhlIGZvcm0gaXMgbG9ja2VkXG4gICAgbGV0IGVscyA9IFt7ZWw6IGZvcm1FbCwgbG9hZGluZzogdHJ1ZSwgbG9jazogZmFsc2V9XS5jb25jYXQoZm9ybUVscykucmV2ZXJzZSgpXG4gICAgcmV0dXJuIHRoaXMucHV0UmVmKGVscywgcGh4RXZlbnQsIFwic3VibWl0XCIsIG9wdHMpXG4gIH1cblxuICBwdXNoRm9ybVN1Ym1pdChmb3JtRWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIHN1Ym1pdHRlciwgb3B0cywgb25SZXBseSl7XG4gICAgbGV0IHJlZkdlbmVyYXRvciA9ICgpID0+IHRoaXMuZGlzYWJsZUZvcm0oZm9ybUVsLCBwaHhFdmVudCwge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZvcm06IGZvcm1FbCxcbiAgICAgIHN1Ym1pdHRlcjogc3VibWl0dGVyXG4gICAgfSlcbiAgICBsZXQgY2lkID0gdGhpcy50YXJnZXRDb21wb25lbnRJRChmb3JtRWwsIHRhcmdldEN0eClcbiAgICBpZihMaXZlVXBsb2FkZXIuaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKSl7XG4gICAgICBsZXQgW3JlZiwgX2Vsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHB1c2ggPSAoKSA9PiB0aGlzLnB1c2hGb3JtU3VibWl0KGZvcm1FbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgc3VibWl0dGVyLCBvcHRzLCBvblJlcGx5KVxuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIHB1c2gpXG4gICAgfSBlbHNlIGlmKExpdmVVcGxvYWRlci5pbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IFtyZWYsIGVsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHByb3h5UmVmR2VuID0gKCkgPT4gW3JlZiwgZWxzLCBvcHRzXVxuICAgICAgdGhpcy51cGxvYWRGaWxlcyhmb3JtRWwsIHBoeEV2ZW50LCB0YXJnZXRDdHgsIHJlZiwgY2lkLCAoX3VwbG9hZHMpID0+IHtcbiAgICAgICAgLy8gaWYgd2Ugc3RpbGwgaGF2aW5nIHBlbmRpbmcgcHJlZmxpZ2h0cyBpdCBtZWFucyB3ZSBoYXZlIGludmFsaWQgZW50cmllc1xuICAgICAgICAvLyBhbmQgdGhlIHBoeC1zdWJtaXQgY2Fubm90IGJlIGNvbXBsZXRlZFxuICAgICAgICBpZihMaXZlVXBsb2FkZXIuaW5wdXRzQXdhaXRpbmdQcmVmbGlnaHQoZm9ybUVsKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bmRvUmVmcyhyZWYsIHBoeEV2ZW50KVxuICAgICAgICB9XG4gICAgICAgIGxldCBtZXRhID0gdGhpcy5leHRyYWN0TWV0YShmb3JtRWwpXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oZm9ybUVsLCB7c3VibWl0dGVyLCAuLi5tZXRhfSlcbiAgICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHByb3h5UmVmR2VuLCBcImV2ZW50XCIsIHtcbiAgICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICAgIGNpZDogY2lkXG4gICAgICAgIH0pLnRoZW4oKHtyZXNwfSkgPT4gb25SZXBseShyZXNwKSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmKCEoZm9ybUVsLmhhc0F0dHJpYnV0ZShQSFhfUkVGX1NSQykgJiYgZm9ybUVsLmNsYXNzTGlzdC5jb250YWlucyhcInBoeC1zdWJtaXQtbG9hZGluZ1wiKSkpe1xuICAgICAgbGV0IG1ldGEgPSB0aGlzLmV4dHJhY3RNZXRhKGZvcm1FbClcbiAgICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oZm9ybUVsLCB7c3VibWl0dGVyLCAuLi5tZXRhfSlcbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIFwiZXZlbnRcIiwge1xuICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICB2YWx1ZTogZm9ybURhdGEsXG4gICAgICAgIGNpZDogY2lkXG4gICAgICB9KS50aGVuKCh7cmVzcH0pID0+IG9uUmVwbHkocmVzcCkpXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkRmlsZXMoZm9ybUVsLCBwaHhFdmVudCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgb25Db21wbGV0ZSl7XG4gICAgbGV0IGpvaW5Db3VudEF0VXBsb2FkID0gdGhpcy5qb2luQ291bnRcbiAgICBsZXQgaW5wdXRFbHMgPSBMaXZlVXBsb2FkZXIuYWN0aXZlRmlsZUlucHV0cyhmb3JtRWwpXG4gICAgbGV0IG51bUZpbGVJbnB1dHNJblByb2dyZXNzID0gaW5wdXRFbHMubGVuZ3RoXG5cbiAgICAvLyBnZXQgZWFjaCBmaWxlIGlucHV0XG4gICAgaW5wdXRFbHMuZm9yRWFjaChpbnB1dEVsID0+IHtcbiAgICAgIGxldCB1cGxvYWRlciA9IG5ldyBMaXZlVXBsb2FkZXIoaW5wdXRFbCwgdGhpcywgKCkgPT4ge1xuICAgICAgICBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcy0tXG4gICAgICAgIGlmKG51bUZpbGVJbnB1dHNJblByb2dyZXNzID09PSAwKXsgb25Db21wbGV0ZSgpIH1cbiAgICAgIH0pXG5cbiAgICAgIGxldCBlbnRyaWVzID0gdXBsb2FkZXIuZW50cmllcygpLm1hcChlbnRyeSA9PiBlbnRyeS50b1ByZWZsaWdodFBheWxvYWQoKSlcblxuICAgICAgaWYoZW50cmllcy5sZW5ndGggPT09IDApe1xuICAgICAgICBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcy0tXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgcmVmOiBpbnB1dEVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRiksXG4gICAgICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgICAgIGNpZDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wic2VuZGluZyBwcmVmbGlnaHQgcmVxdWVzdFwiLCBwYXlsb2FkXSlcblxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiYWxsb3dfdXBsb2FkXCIsIHBheWxvYWQpLnRoZW4oKHtyZXNwfSkgPT4ge1xuICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbXCJnb3QgcHJlZmxpZ2h0IHJlc3BvbnNlXCIsIHJlc3BdKVxuICAgICAgICAvLyB0aGUgcHJlZmxpZ2h0IHdpbGwgcmVqZWN0IGVudHJpZXMgYmV5b25kIHRoZSBtYXggZW50cmllc1xuICAgICAgICAvLyBzbyB3ZSBlcnJvciBhbmQgY2FuY2VsIGVudHJpZXMgb24gdGhlIGNsaWVudCB0aGF0IGFyZSBtaXNzaW5nIGZyb20gdGhlIHJlc3BvbnNlXG4gICAgICAgIHVwbG9hZGVyLmVudHJpZXMoKS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICBpZihyZXNwLmVudHJpZXMgJiYgIXJlc3AuZW50cmllc1tlbnRyeS5yZWZdKXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFpbGVkRW50cnlQcmVmbGlnaHQoZW50cnkucmVmLCBcImZhaWxlZCBwcmVmbGlnaHRcIiwgdXBsb2FkZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyBmb3IgYXV0byB1cGxvYWRzLCB3ZSBtYXkgaGF2ZSBhbiBlbXB0eSBlbnRyaWVzIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlclxuICAgICAgICAvLyBmb3IgZm9ybSBzdWJtaXRzIHRoYXQgY29udGFpbiBpbnZhbGlkIGVudHJpZXNcbiAgICAgICAgaWYocmVzcC5lcnJvciB8fCBPYmplY3Qua2V5cyhyZXNwLmVudHJpZXMpLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYsIHBoeEV2ZW50KVxuICAgICAgICAgIGxldCBlcnJvcnMgPSByZXNwLmVycm9yIHx8IFtdXG4gICAgICAgICAgZXJyb3JzLm1hcCgoW2VudHJ5X3JlZiwgcmVhc29uXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVGYWlsZWRFbnRyeVByZWZsaWdodChlbnRyeV9yZWYsIHJlYXNvbiwgdXBsb2FkZXIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgb25FcnJvciA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLm9uRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gam9pbkNvdW50QXRVcGxvYWQpeyBjYWxsYmFjaygpIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHVwbG9hZGVyLmluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIHRoaXMubGl2ZVNvY2tldClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlRmFpbGVkRW50cnlQcmVmbGlnaHQodXBsb2FkUmVmLCByZWFzb24sIHVwbG9hZGVyKXtcbiAgICBpZih1cGxvYWRlci5pc0F1dG9VcGxvYWQoKSl7XG4gICAgICAvLyB1cGxvYWRSZWYgbWF5IGJlIHRvcCBsZXZlbCB1cGxvYWQgY29uZmlnIHJlZiBvciBlbnRyeSByZWZcbiAgICAgIGxldCBlbnRyeSA9IHVwbG9hZGVyLmVudHJpZXMoKS5maW5kKGVudHJ5ID0+IGVudHJ5LnJlZiA9PT0gdXBsb2FkUmVmLnRvU3RyaW5nKCkpXG4gICAgICBpZihlbnRyeSl7IGVudHJ5LmNhbmNlbCgpIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXBsb2FkZXIuZW50cmllcygpLm1hcChlbnRyeSA9PiBlbnRyeS5jYW5jZWwoKSlcbiAgICB9XG4gICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW2BlcnJvciBmb3IgZW50cnkgJHt1cGxvYWRSZWZ9YCwgcmVhc29uXSlcbiAgfVxuXG4gIGRpc3BhdGNoVXBsb2Fkcyh0YXJnZXRDdHgsIG5hbWUsIGZpbGVzT3JCbG9icyl7XG4gICAgbGV0IHRhcmdldEVsZW1lbnQgPSB0aGlzLnRhcmdldEN0eEVsZW1lbnQodGFyZ2V0Q3R4KSB8fCB0aGlzLmVsXG4gICAgbGV0IGlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKHRhcmdldEVsZW1lbnQpLmZpbHRlcihlbCA9PiBlbC5uYW1lID09PSBuYW1lKVxuICAgIGlmKGlucHV0cy5sZW5ndGggPT09IDApeyBsb2dFcnJvcihgbm8gbGl2ZSBmaWxlIGlucHV0cyBmb3VuZCBtYXRjaGluZyB0aGUgbmFtZSBcIiR7bmFtZX1cImApIH1cbiAgICBlbHNlIGlmKGlucHV0cy5sZW5ndGggPiAxKXsgbG9nRXJyb3IoYGR1cGxpY2F0ZSBsaXZlIGZpbGUgaW5wdXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBuYW1lIFwiJHtuYW1lfVwiYCkgfVxuICAgIGVsc2UgeyBET00uZGlzcGF0Y2hFdmVudChpbnB1dHNbMF0sIFBIWF9UUkFDS19VUExPQURTLCB7ZGV0YWlsOiB7ZmlsZXM6IGZpbGVzT3JCbG9ic319KSB9XG4gIH1cblxuICB0YXJnZXRDdHhFbGVtZW50KHRhcmdldEN0eCl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7XG4gICAgICBsZXQgW3RhcmdldF0gPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIHRhcmdldEN0eClcbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9IGVsc2UgaWYodGFyZ2V0Q3R4KXtcbiAgICAgIHJldHVybiB0YXJnZXRDdHhcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoRm9ybVJlY292ZXJ5KG9sZEZvcm0sIG5ld0Zvcm0sIHRlbXBsYXRlRG9tLCBjYWxsYmFjayl7XG4gICAgLy8gd2UgYXJlIG9ubHkgcmVjb3ZlcmluZyBmb3JtcyBpbnNpZGUgdGhlIGN1cnJlbnQgdmlldywgdGhlcmVmb3JlIGl0IGlzIHNhZmUgdG9cbiAgICAvLyBza2lwIHdpdGhpbk93bmVycyBoZXJlIGFuZCBhbHdheXMgdXNlIHRoaXMgd2hlbiByZWZlcnJpbmcgdG8gdGhlIHZpZXdcbiAgICBjb25zdCBwaHhDaGFuZ2UgPSB0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIilcbiAgICBjb25zdCBwaHhUYXJnZXQgPSBuZXdGb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJ0YXJnZXRcIikpIHx8IG5ld0Zvcm1cbiAgICBjb25zdCBwaHhFdmVudCA9IG5ld0Zvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfQVVUT19SRUNPVkVSKSkgfHwgbmV3Rm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKVxuICAgIGNvbnN0IGlucHV0cyA9IEFycmF5LmZyb20ob2xkRm9ybS5lbGVtZW50cykuZmlsdGVyKGVsID0+IERPTS5pc0Zvcm1JbnB1dChlbCkgJiYgZWwubmFtZSAmJiAhZWwuaGFzQXR0cmlidXRlKHBoeENoYW5nZSkpXG4gICAgaWYoaW5wdXRzLmxlbmd0aCA9PT0gMCl7IHJldHVybiB9XG5cbiAgICAvLyB3ZSBtdXN0IGNsZWFyIHRyYWNrZWQgdXBsb2FkcyBiZWZvcmUgcmVjb3ZlcnkgYXMgdGhleSBubyBsb25nZXIgaGF2ZSB2YWxpZCByZWZzXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuaGFzQXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAmJiBMaXZlVXBsb2FkZXIuY2xlYXJGaWxlcyhpbnB1dCkpXG4gICAgLy8gcHVzaElucHV0IGFzc3VtZXMgdGhhdCB0aGVyZSBpcyBhIHNvdXJjZSBlbGVtZW50IHRoYXQgaW5pdGlhdGVkIHRoZSBjaGFuZ2U7XG4gICAgLy8gYmVjYXVzZSB0aGlzIGlzIG5vdCB0aGUgY2FzZSB3aGVuIHdlIHJlY292ZXIgZm9ybXMsIHdlIHByb3ZpZGUgdGhlIGZpcnN0IGlucHV0IHdlIGZpbmRcbiAgICBsZXQgaW5wdXQgPSBpbnB1dHMuZmluZChlbCA9PiBlbC50eXBlICE9PSBcImhpZGRlblwiKSB8fCBpbnB1dHNbMF1cblxuICAgIC8vIGluIHRoZSBjYXNlIHRoYXQgdGhlcmUgYXJlIG11bHRpcGxlIHRhcmdldHMsIHdlIGNvdW50IHRoZSBudW1iZXIgb2YgcGVuZGluZyByZWNvdmVyeSBldmVudHNcbiAgICAvLyBhbmQgb25seSBjYWxsIHRoZSBjYWxsYmFjayBvbmNlIGFsbCBldmVudHMgaGF2ZSBiZWVuIHByb2Nlc3NlZFxuICAgIGxldCBwZW5kaW5nID0gMFxuICAgIC8vIHdpdGhpblRhcmdldHMocGh4VGFyZ2V0LCBjYWxsYmFjaywgZG9tLCB2aWV3RWwpXG4gICAgdGhpcy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHRhcmdldFZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgY29uc3QgY2lkID0gdGhpcy50YXJnZXRDb21wb25lbnRJRChuZXdGb3JtLCB0YXJnZXRDdHgpXG4gICAgICBwZW5kaW5nKytcbiAgICAgIGxldCBlID0gbmV3IEN1c3RvbUV2ZW50KFwicGh4OmZvcm0tcmVjb3ZlcnlcIiwge2RldGFpbDoge3NvdXJjZUVsZW1lbnQ6IG9sZEZvcm19fSlcbiAgICAgIEpTLmV4ZWMoZSwgXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHRoaXMsIGlucHV0LCBbXCJwdXNoXCIsIHtcbiAgICAgICAgX3RhcmdldDogaW5wdXQubmFtZSxcbiAgICAgICAgdGFyZ2V0VmlldyxcbiAgICAgICAgdGFyZ2V0Q3R4LFxuICAgICAgICBuZXdDaWQ6IGNpZCxcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICBwZW5kaW5nLS1cbiAgICAgICAgICBpZihwZW5kaW5nID09PSAwKXsgY2FsbGJhY2soKSB9XG4gICAgICAgIH1cbiAgICAgIH1dKVxuICAgIH0sIHRlbXBsYXRlRG9tLCB0ZW1wbGF0ZURvbSlcbiAgfVxuXG4gIHB1c2hMaW5rUGF0Y2goZSwgaHJlZiwgdGFyZ2V0RWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgbGlua1JlZiA9IHRoaXMubGl2ZVNvY2tldC5zZXRQZW5kaW5nTGluayhocmVmKVxuICAgIC8vIG9ubHkgYWRkIGxvYWRpbmcgc3RhdGVzIGlmIGV2ZW50IGlzIHRydXN0ZWQgKGl0IHdhcyB0cmlnZ2VyZWQgYnkgdXNlciwgc3VjaCBhcyBjbGljaykgYW5kXG4gICAgLy8gaXQncyBub3QgYSBmb3J3YXJkL2JhY2sgbmF2aWdhdGlvbiBmcm9tIHBvcHN0YXRlXG4gICAgbGV0IGxvYWRpbmcgPSBlLmlzVHJ1c3RlZCAmJiBlLnR5cGUgIT09IFwicG9wc3RhdGVcIlxuICAgIGxldCByZWZHZW4gPSB0YXJnZXRFbCA/ICgpID0+IHRoaXMucHV0UmVmKFt7ZWw6IHRhcmdldEVsLCBsb2FkaW5nOiBsb2FkaW5nLCBsb2NrOiB0cnVlfV0sIG51bGwsIFwiY2xpY2tcIikgOiBudWxsXG4gICAgbGV0IGZhbGxiYWNrID0gKCkgPT4gdGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGxldCB1cmwgPSBocmVmLnN0YXJ0c1dpdGgoXCIvXCIpID8gYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke2xvY2F0aW9uLmhvc3R9JHtocmVmfWAgOiBocmVmXG5cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuLCBcImxpdmVfcGF0Y2hcIiwge3VybH0pLnRoZW4oXG4gICAgICAoe3Jlc3B9KSA9PiB7XG4gICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICBpZihyZXNwLmxpbmtfcmVkaXJlY3Qpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcGxhY2VNYWluKGhyZWYsIG51bGwsIGNhbGxiYWNrLCBsaW5rUmVmKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih0aGlzLmxpdmVTb2NrZXQuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICAgICAgICB0aGlzLmhyZWYgPSBocmVmXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobGlua1JlZilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgKHtlcnJvcjogX2Vycm9yLCB0aW1lb3V0OiBfdGltZW91dH0pID0+IGZhbGxiYWNrKClcbiAgICApXG4gIH1cblxuICBnZXRGb3Jtc0ZvclJlY292ZXJ5KCl7XG4gICAgaWYodGhpcy5qb2luQ291bnQgPT09IDApeyByZXR1cm4ge30gfVxuXG4gICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuXG4gICAgcmV0dXJuIERPTS5hbGwodGhpcy5lbCwgYGZvcm1bJHtwaHhDaGFuZ2V9XWApXG4gICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5pZClcbiAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmVsZW1lbnRzLmxlbmd0aCA+IDApXG4gICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSAhPT0gXCJpZ25vcmVcIilcbiAgICAgIC5tYXAoZm9ybSA9PiBmb3JtLmNsb25lTm9kZSh0cnVlKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgZm9ybSkgPT4ge1xuICAgICAgICBhY2NbZm9ybS5pZF0gPSBmb3JtXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sIHt9KVxuICB9XG5cbiAgbWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZChkZXN0cm95ZWRDSURzKXtcbiAgICBsZXQgd2lsbERlc3Ryb3lDSURzID0gZGVzdHJveWVkQ0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgfSlcblxuICAgIGlmKHdpbGxEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgIC8vIHdlIG11c3QgcmVzZXQgdGhlIHJlbmRlciBjaGFuZ2UgdHJhY2tpbmcgZm9yIGNpZHMgdGhhdFxuICAgICAgLy8gY291bGQgYmUgYWRkZWQgYmFjayBmcm9tIHRoZSBzZXJ2ZXIgc28gd2UgZG9uJ3Qgc2tpcCB0aGVtXG4gICAgICB3aWxsRGVzdHJveUNJRHMuZm9yRWFjaChjaWQgPT4gdGhpcy5yZW5kZXJlZC5yZXNldFJlbmRlcihjaWQpKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX3dpbGxfZGVzdHJveVwiLCB7Y2lkczogd2lsbERlc3Ryb3lDSURzfSkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIHdlIG11c3Qgd2FpdCBmb3IgcGVuZGluZyB0cmFuc2l0aW9ucyB0byBjb21wbGV0ZSBiZWZvcmUgZGV0ZXJtaW5pbmdcbiAgICAgICAgLy8gaWYgdGhlIGNpZHMgd2VyZSBhZGRlZCBiYWNrIHRvIHRoZSBET00gaW4gdGhlIG1lYW50aW1lICgjMzEzOSlcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgIC8vIFNlZSBpZiBhbnkgb2YgdGhlIGNpZHMgd2Ugd2FudGVkIHRvIGRlc3Ryb3kgd2VyZSBhZGRlZCBiYWNrLFxuICAgICAgICAgIC8vIGlmIHRoZXkgd2VyZSBhZGRlZCBiYWNrLCB3ZSBkb24ndCBhY3R1YWxseSBkZXN0cm95IHRoZW0uXG4gICAgICAgICAgbGV0IGNvbXBsZXRlbHlEZXN0cm95Q0lEcyA9IHdpbGxEZXN0cm95Q0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGlmKGNvbXBsZXRlbHlEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImNpZHNfZGVzdHJveWVkXCIsIHtjaWRzOiBjb21wbGV0ZWx5RGVzdHJveUNJRHN9KS50aGVuKCh7cmVzcH0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZC5wcnVuZUNJRHMocmVzcC5jaWRzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG93bnNFbGVtZW50KGVsKXtcbiAgICBsZXQgcGFyZW50Vmlld0VsID0gZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpID09PSB0aGlzLmlkIHx8XG4gICAgICAocGFyZW50Vmlld0VsICYmIHBhcmVudFZpZXdFbC5pZCA9PT0gdGhpcy5pZCkgfHxcbiAgICAgICghcGFyZW50Vmlld0VsICYmIHRoaXMuaXNEZWFkKVxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMgPSB7fSl7XG4gICAgRE9NLnB1dFByaXZhdGUoZm9ybSwgUEhYX0hBU19TVUJNSVRURUQsIHRydWUpXG4gICAgY29uc3QgaW5wdXRzID0gQXJyYXkuZnJvbShmb3JtLmVsZW1lbnRzKVxuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSkpXG4gICAgdGhpcy5saXZlU29ja2V0LmJsdXJBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMsICgpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKClcbiAgICB9KVxuICB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKGtpbmQpIH1cbn1cbiIsICIvKiogSW5pdGlhbGl6ZXMgdGhlIExpdmVTb2NrZXRcbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3c3M6Ly9leGFtcGxlLmNvbS9saXZlXCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9saXZlXCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtQaG9lbml4LlNvY2tldH0gc29ja2V0IC0gdGhlIHJlcXVpcmVkIFBob2VuaXggU29ja2V0IGNsYXNzIGltcG9ydGVkIGZyb20gXCJwaG9lbml4XCIuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICogICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAqICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbi4gT3V0c2lkZSBvZiBrZXlzIGxpc3RlZCBiZWxvdywgYWxsXG4gKiBjb25maWd1cmF0aW9uIGlzIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgUGhvZW5peCBTb2NrZXQgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGVmYXVsdHNdIC0gVGhlIG9wdGlvbmFsIGRlZmF1bHRzIHRvIHVzZSBmb3IgdmFyaW91cyBiaW5kaW5ncyxcbiAqIHN1Y2ggYXMgYHBoeC1kZWJvdW5jZWAuIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcga2V5czpcbiAqXG4gKiAgIC0gZGVib3VuY2UgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LWRlYm91bmNlIHRpbWUuIERlZmF1bHRzIDMwMFxuICogICAtIHRocm90dGxlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC10aHJvdHRsZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBwYXNzaW5nIGNvbm5lY3QgcGFyYW1zLlxuICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIExpdmVWaWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKGVsKSA9PiB7dmlldzogZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1teS12aWV3LW5hbWVcIiwgdG9rZW46IHdpbmRvdy5teVRva2VufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5kaW5nUHJlZml4XSAtIFRoZSBvcHRpb25hbCBwcmVmaXggdG8gdXNlIGZvciBhbGwgcGh4IERPTSBhbm5vdGF0aW9ucy5cbiAqIERlZmF1bHRzIHRvIFwicGh4LVwiLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmhvb2tzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IGhvb2sgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnVwbG9hZGVyc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyB1cGxvYWRlciBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmxvYWRlclRpbWVvdXRdIC0gVGhlIG9wdGlvbmFsIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhcHBseVxuICogbG9hZGluZyBzdGF0ZXMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLm1heFJlbG9hZHNdIC0gVGhlIG1heGltdW0gcmVsb2FkcyBiZWZvcmUgZW50ZXJpbmcgZmFpbHNhZmUgbW9kZS5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMucmVsb2FkSml0dGVyTWluXSAtIFRoZSBtaW5pbXVtIHRpbWUgYmV0d2VlbiBub3JtYWwgcmVsb2FkIGF0dGVtcHRzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5yZWxvYWRKaXR0ZXJNYXhdIC0gVGhlIG1heGltdW0gdGltZSBiZXR3ZWVuIG5vcm1hbCByZWxvYWQgYXR0ZW1wdHMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmZhaWxzYWZlSml0dGVyXSAtIFRoZSB0aW1lIGJldHdlZW4gcmVsb2FkIGF0dGVtcHRzIGluIGZhaWxzYWZlIG1vZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy52aWV3TG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0byBsb2cgZGVidWcgaW5mb3JtYXRpb24uIEZvciBleGFtcGxlOlxuICpcbiAqICAgICAodmlldywga2luZCwgbXNnLCBvYmopID0+IGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubWV0YWRhdGFdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBtYXBwaW5nIGV2ZW50IG5hbWVzIHRvIGZ1bmN0aW9ucyBmb3JcbiAqIHBvcHVsYXRpbmcgZXZlbnQgbWV0YWRhdGEuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBtZXRhZGF0YToge1xuICogICAgICAgY2xpY2s6IChlLCBlbCkgPT4ge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgZGV0YWlsOiBlLmRldGFpbCB8fCAxLFxuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgICAga2V5ZG93bjogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAga2V5OiBlLmtleSxcbiAqICAgICAgICAgICBjdHJsS2V5OiBlLmN0cmxLZXksXG4gKiAgICAgICAgICAgbWV0YUtleTogZS5tZXRhS2V5LFxuICogICAgICAgICAgIHNoaWZ0S2V5OiBlLnNoaWZ0S2V5XG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuc2Vzc2lvblN0b3JhZ2VdIC0gQW4gb3B0aW9uYWwgU3RvcmFnZSBjb21wYXRpYmxlIG9iamVjdFxuICogVXNlZnVsIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYHNlc3Npb25TdG9yYWdlYC4gIEZvciBleGFtcGxlLCBUaGlzIGNvdWxkXG4gKiBoYXBwZW4gaWYgYSBzaXRlIGxvYWRzIGEgY3Jvc3MtZG9tYWluIExpdmVWaWV3IGluIGFuIGlmcmFtZS4gIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICAgIGNsYXNzIEluTWVtb3J5U3RvcmFnZSB7XG4gKiAgICAgICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5zdG9yYWdlID0ge30gfVxuICogICAgICAgZ2V0SXRlbShrZXlOYW1lKSB7IHJldHVybiB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfHwgbnVsbCB9XG4gKiAgICAgICByZW1vdmVJdGVtKGtleU5hbWUpIHsgZGVsZXRlIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB9XG4gKiAgICAgICBzZXRJdGVtKGtleU5hbWUsIGtleVZhbHVlKSB7IHRoaXMuc3RvcmFnZVtrZXlOYW1lXSA9IGtleVZhbHVlIH1cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmxvY2FsU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgZm9yIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYGxvY2FsU3RvcmFnZWAuXG4gKiBTZWUgYG9wdHMuc2Vzc2lvblN0b3JhZ2VgIGZvciBleGFtcGxlcy5cbiovXG5cbmltcG9ydCB7XG4gIEJJTkRJTkdfUFJFRklYLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBERUZBVUxUUyxcbiAgRkFJTFNBRkVfSklUVEVSLFxuICBMT0FERVJfVElNRU9VVCxcbiAgTUFYX1JFTE9BRFMsXG4gIFBIWF9ERUJPVU5DRSxcbiAgUEhYX0RST1BfVEFSR0VULFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9LRVksXG4gIFBIWF9MSU5LX1NUQVRFLFxuICBQSFhfTElWRV9MSU5LLFxuICBQSFhfTFZfREVCVUcsXG4gIFBIWF9MVl9MQVRFTkNZX1NJTSxcbiAgUEhYX0xWX1BST0ZJTEUsXG4gIFBIWF9MVl9ISVNUT1JZX1BPU0lUSU9OLFxuICBQSFhfTUFJTixcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfVEhST1RUTEUsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfU0VTU0lPTixcbiAgUkVMT0FEX0pJVFRFUl9NSU4sXG4gIFJFTE9BRF9KSVRURVJfTUFYLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JFTE9BRF9TVEFUVVNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQnJvd3NlciBmcm9tIFwiLi9icm93c2VyXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBIb29rcyBmcm9tIFwiLi9ob29rc1wiXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5leHBvcnQgbGV0IGlzVXNlZElucHV0ID0gKGVsKSA9PiBET00uaXNVc2VkSW5wdXQoZWwpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih1cmwsIHBoeFNvY2tldCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnVubG9hZGVkID0gZmFsc2VcbiAgICBpZighcGh4U29ja2V0IHx8IHBoeFNvY2tldC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICBhIHBob2VuaXggU29ja2V0IG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB0aGUgTGl2ZVNvY2tldCBjb25zdHJ1Y3Rvci4gRm9yIGV4YW1wbGU6XG5cbiAgICAgICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICAgICAgICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAgICAgICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAgICAgIGApXG4gICAgfVxuICAgIHRoaXMuc29ja2V0ID0gbmV3IHBoeFNvY2tldCh1cmwsIG9wdHMpXG4gICAgdGhpcy5iaW5kaW5nUHJlZml4ID0gb3B0cy5iaW5kaW5nUHJlZml4IHx8IEJJTkRJTkdfUFJFRklYXG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnZpZXdMb2dnZXIgPSBvcHRzLnZpZXdMb2dnZXJcbiAgICB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzID0gb3B0cy5tZXRhZGF0YSB8fCB7fVxuICAgIHRoaXMuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKGNsb25lKERFRkFVTFRTKSwgb3B0cy5kZWZhdWx0cyB8fCB7fSlcbiAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICAgIHRoaXMubWFpbiA9IG51bGxcbiAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gbnVsbFxuICAgIHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBudWxsXG4gICAgdGhpcy5saW5rUmVmID0gMVxuICAgIHRoaXMucm9vdHMgPSB7fVxuICAgIHRoaXMuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGNsb25lKHdpbmRvdy5sb2NhdGlvbilcbiAgICB0aGlzLmhvb2tzID0gb3B0cy5ob29rcyB8fCB7fVxuICAgIHRoaXMudXBsb2FkZXJzID0gb3B0cy51cGxvYWRlcnMgfHwge31cbiAgICB0aGlzLmxvYWRlclRpbWVvdXQgPSBvcHRzLmxvYWRlclRpbWVvdXQgfHwgTE9BREVSX1RJTUVPVVRcbiAgICB0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLm1heFJlbG9hZHMgPSBvcHRzLm1heFJlbG9hZHMgfHwgTUFYX1JFTE9BRFNcbiAgICB0aGlzLnJlbG9hZEppdHRlck1pbiA9IG9wdHMucmVsb2FkSml0dGVyTWluIHx8IFJFTE9BRF9KSVRURVJfTUlOXG4gICAgdGhpcy5yZWxvYWRKaXR0ZXJNYXggPSBvcHRzLnJlbG9hZEppdHRlck1heCB8fCBSRUxPQURfSklUVEVSX01BWFxuICAgIHRoaXMuZmFpbHNhZmVKaXR0ZXIgPSBvcHRzLmZhaWxzYWZlSml0dGVyIHx8IEZBSUxTQUZFX0pJVFRFUlxuICAgIHRoaXMubG9jYWxTdG9yYWdlID0gb3B0cy5sb2NhbFN0b3JhZ2UgfHwgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2UgPSBvcHRzLnNlc3Npb25TdG9yYWdlIHx8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZVxuICAgIHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyA9IGZhbHNlXG4gICAgdGhpcy5ib3VuZEV2ZW50TmFtZXMgPSBuZXcgU2V0KClcbiAgICB0aGlzLnNlcnZlckNsb3NlUmVmID0gbnVsbFxuICAgIHRoaXMuZG9tQ2FsbGJhY2tzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBqc1F1ZXJ5U2VsZWN0b3JBbGw6IG51bGwsXG4gICAgICBvblBhdGNoU3RhcnQ6IGNsb3N1cmUoKSxcbiAgICAgIG9uUGF0Y2hFbmQ6IGNsb3N1cmUoKSxcbiAgICAgIG9uTm9kZUFkZGVkOiBjbG9zdXJlKCksXG4gICAgICBvbkJlZm9yZUVsVXBkYXRlZDogY2xvc3VyZSgpfSxcbiAgICBvcHRzLmRvbSB8fCB7fSlcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFRyYW5zaXRpb25TZXQoKVxuICAgIHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvbiA9IHBhcnNlSW50KHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfSElTVE9SWV9QT1NJVElPTikpIHx8IDBcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgIHRoaXMudW5sb2FkZWQgPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgaWYodGhpcy5pc1VubG9hZGVkKCkpe1xuICAgICAgICAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZSBhbmQgYnJvd3NlciBkb2VzIG5vdCBlbWl0IFwicGFnZXNob3dcIlxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gcHVibGljXG5cbiAgdmVyc2lvbigpeyByZXR1cm4gTFZfVlNOIH1cblxuICBpc1Byb2ZpbGVFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX1BST0ZJTEUpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0VuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfREVCVUcpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0Rpc2FibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJmYWxzZVwiIH1cblxuICBlbmFibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcInRydWVcIikgfVxuXG4gIGVuYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX1BST0ZJTEUsIFwidHJ1ZVwiKSB9XG5cbiAgZGlzYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwiZmFsc2VcIikgfVxuXG4gIGRpc2FibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9QUk9GSUxFKSB9XG5cbiAgZW5hYmxlTGF0ZW5jeVNpbSh1cHBlckJvdW5kTXMpe1xuICAgIHRoaXMuZW5hYmxlRGVidWcoKVxuICAgIGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0sIHVwcGVyQm91bmRNcylcbiAgfVxuXG4gIGRpc2FibGVMYXRlbmN5U2ltKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfTEFURU5DWV9TSU0pIH1cblxuICBnZXRMYXRlbmN5U2ltKCl7XG4gICAgbGV0IHN0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0pXG4gICAgcmV0dXJuIHN0ciA/IHBhcnNlSW50KHN0cikgOiBudWxsXG4gIH1cblxuICBnZXRTb2NrZXQoKXsgcmV0dXJuIHRoaXMuc29ja2V0IH1cblxuICBjb25uZWN0KCl7XG4gICAgLy8gZW5hYmxlIGRlYnVnIGJ5IGRlZmF1bHQgaWYgb24gbG9jYWxob3N0IGFuZCBub3QgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiAmJiAhdGhpcy5pc0RlYnVnRGlzYWJsZWQoKSl7IHRoaXMuZW5hYmxlRGVidWcoKSB9XG4gICAgbGV0IGRvQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRSZWxvYWRTdGF0dXMoKVxuICAgICAgaWYodGhpcy5qb2luUm9vdFZpZXdzKCkpe1xuICAgICAgICB0aGlzLmJpbmRUb3BMZXZlbEV2ZW50cygpXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuICAgICAgfSBlbHNlIGlmKHRoaXMubWFpbil7XG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoe2RlYWQ6IHRydWV9KVxuICAgICAgfVxuICAgICAgdGhpcy5qb2luRGVhZFZpZXcoKVxuICAgIH1cbiAgICBpZihbXCJjb21wbGV0ZVwiLCBcImxvYWRlZFwiLCBcImludGVyYWN0aXZlXCJdLmluZGV4T2YoZG9jdW1lbnQucmVhZHlTdGF0ZSkgPj0gMCl7XG4gICAgICBkb0Nvbm5lY3QoKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBkb0Nvbm5lY3QoKSlcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0KGNhbGxiYWNrKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgLy8gcmVtb3ZlIHRoZSBzb2NrZXQgY2xvc2UgbGlzdGVuZXIgdG8gYXZvaWQgdHJ5aW5nIHRvIGhhbmRsZVxuICAgIC8vIGEgc2VydmVyIGNsb3NlIGV2ZW50IHdoZW4gaXQgaXMgYWN0dWFsbHkgY2F1c2VkIGJ5IHVzIGRpc2Nvbm5lY3RpbmdcbiAgICBpZih0aGlzLnNlcnZlckNsb3NlUmVmKXtcbiAgICAgIHRoaXMuc29ja2V0Lm9mZih0aGlzLnNlcnZlckNsb3NlUmVmKVxuICAgICAgdGhpcy5zZXJ2ZXJDbG9zZVJlZiA9IG51bGxcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdChjYWxsYmFjaylcbiAgfVxuXG4gIHJlcGxhY2VUcmFuc3BvcnQodHJhbnNwb3J0KXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5zb2NrZXQucmVwbGFjZVRyYW5zcG9ydCh0cmFuc3BvcnQpXG4gICAgdGhpcy5jb25uZWN0KClcbiAgfVxuXG4gIGV4ZWNKUyhlbCwgZW5jb2RlZEpTLCBldmVudFR5cGUgPSBudWxsKXtcbiAgICBsZXQgZSA9IG5ldyBDdXN0b21FdmVudChcInBoeDpleGVjXCIsIHtkZXRhaWw6IHtzb3VyY2VFbGVtZW50OiBlbH19KVxuICAgIHRoaXMub3duZXIoZWwsIHZpZXcgPT4gSlMuZXhlYyhlLCBldmVudFR5cGUsIGVuY29kZWRKUywgdmlldywgZWwpKVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGV4ZWNKU0hvb2tQdXNoKGVsLCBwaHhFdmVudCwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgIGxldCBlID0gbmV3IEN1c3RvbUV2ZW50KFwicGh4OmV4ZWNcIiwge2RldGFpbDoge3NvdXJjZUVsZW1lbnQ6IGVsfX0pXG4gICAgICBKUy5leGVjKGUsIFwiaG9va1wiLCBwaHhFdmVudCwgdmlldywgZWwsIFtcInB1c2hcIiwge2RhdGEsIGNhbGxiYWNrfV0pXG4gICAgfSlcbiAgfVxuXG4gIHVubG9hZCgpe1xuICAgIGlmKHRoaXMudW5sb2FkZWQpeyByZXR1cm4gfVxuICAgIGlmKHRoaXMubWFpbiAmJiB0aGlzLmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxvZyh0aGlzLm1haW4sIFwic29ja2V0XCIsICgpID0+IFtcImRpc2Nvbm5lY3QgZm9yIHBhZ2UgbmF2XCJdKSB9XG4gICAgdGhpcy51bmxvYWRlZCA9IHRydWVcbiAgICB0aGlzLmRlc3Ryb3lBbGxWaWV3cygpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgfVxuXG4gIHRyaWdnZXJET00oa2luZCwgYXJncyl7IHRoaXMuZG9tQ2FsbGJhY2tzW2tpbmRdKC4uLmFyZ3MpIH1cblxuICB0aW1lKG5hbWUsIGZ1bmMpe1xuICAgIGlmKCF0aGlzLmlzUHJvZmlsZUVuYWJsZWQoKSB8fCAhY29uc29sZS50aW1lKXsgcmV0dXJuIGZ1bmMoKSB9XG4gICAgY29uc29sZS50aW1lKG5hbWUpXG4gICAgbGV0IHJlc3VsdCA9IGZ1bmMoKVxuICAgIGNvbnNvbGUudGltZUVuZChuYW1lKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGxvZyh2aWV3LCBraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgaWYodGhpcy52aWV3TG9nZ2VyKXtcbiAgICAgIGxldCBbbXNnLCBvYmpdID0gbXNnQ2FsbGJhY2soKVxuICAgICAgdGhpcy52aWV3TG9nZ2VyKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH0gZWxzZSBpZih0aGlzLmlzRGVidWdFbmFibGVkKCkpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICBkZWJ1Zyh2aWV3LCBraW5kLCBtc2csIG9iailcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RE9NVXBkYXRlKGNhbGxiYWNrKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmFmdGVyKGNhbGxiYWNrKVxuICB9XG5cbiAgdHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUgPSBmdW5jdGlvbigpe30pe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICBvbkNoYW5uZWwoY2hhbm5lbCwgZXZlbnQsIGNiKXtcbiAgICBjaGFubmVsLm9uKGV2ZW50LCBkYXRhID0+IHtcbiAgICAgIGxldCBsYXRlbmN5ID0gdGhpcy5nZXRMYXRlbmN5U2ltKClcbiAgICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgICAgY2IoZGF0YSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2IoZGF0YSksIGxhdGVuY3kpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJlbG9hZFdpdGhKaXR0ZXIodmlldywgbG9nKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICBsZXQgbWluTXMgPSB0aGlzLnJlbG9hZEppdHRlck1pblxuICAgIGxldCBtYXhNcyA9IHRoaXMucmVsb2FkSml0dGVyTWF4XG4gICAgbGV0IGFmdGVyTXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4TXMgLSBtaW5NcyArIDEpKSArIG1pbk1zXG4gICAgbGV0IHRyaWVzID0gQnJvd3Nlci51cGRhdGVMb2NhbCh0aGlzLmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTLCAwLCBjb3VudCA9PiBjb3VudCArIDEpXG4gICAgaWYodHJpZXMgPj0gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgIGFmdGVyTXMgPSB0aGlzLmZhaWxzYWZlSml0dGVyXG4gICAgfVxuICAgIHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpZiB2aWV3IGhhcyByZWNvdmVyZWQsIHN1Y2ggYXMgdHJhbnNwb3J0IHJlcGxhY2VkLCB0aGVuIGNhbmNlbFxuICAgICAgaWYodmlldy5pc0Rlc3Ryb3llZCgpIHx8IHZpZXcuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgICB2aWV3LmRlc3Ryb3koKVxuICAgICAgbG9nID8gbG9nKCkgOiB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BlbmNvdW50ZXJlZCAke3RyaWVzfSBjb25zZWN1dGl2ZSByZWxvYWRzYF0pXG4gICAgICBpZih0cmllcyA+PSB0aGlzLm1heFJlbG9hZHMpe1xuICAgICAgICB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BleGNlZWRlZCAke3RoaXMubWF4UmVsb2Fkc30gY29uc2VjdXRpdmUgcmVsb2Fkcy4gRW50ZXJpbmcgZmFpbHNhZmUgbW9kZWBdKVxuICAgICAgfVxuICAgICAgaWYodGhpcy5oYXNQZW5kaW5nTGluaygpKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgYWZ0ZXJNcylcbiAgfVxuXG4gIGdldEhvb2tDYWxsYmFja3MobmFtZSl7XG4gICAgcmV0dXJuIG5hbWUgJiYgbmFtZS5zdGFydHNXaXRoKFwiUGhvZW5peC5cIikgPyBIb29rc1tuYW1lLnNwbGl0KFwiLlwiKVsxXV0gOiB0aGlzLmhvb2tzW25hbWVdXG4gIH1cblxuICBpc1VubG9hZGVkKCl7IHJldHVybiB0aGlzLnVubG9hZGVkIH1cblxuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSB9XG5cbiAgZ2V0QmluZGluZ1ByZWZpeCgpeyByZXR1cm4gdGhpcy5iaW5kaW5nUHJlZml4IH1cblxuICBiaW5kaW5nKGtpbmQpeyByZXR1cm4gYCR7dGhpcy5nZXRCaW5kaW5nUHJlZml4KCl9JHtraW5kfWAgfVxuXG4gIGNoYW5uZWwodG9waWMsIHBhcmFtcyl7IHJldHVybiB0aGlzLnNvY2tldC5jaGFubmVsKHRvcGljLCBwYXJhbXMpIH1cblxuICBqb2luRGVhZFZpZXcoKXtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHlcbiAgICBpZihib2R5ICYmICF0aGlzLmlzUGh4Vmlldyhib2R5KSAmJiAhdGhpcy5pc1BoeFZpZXcoZG9jdW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpKXtcbiAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhib2R5KVxuICAgICAgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKVxuICAgICAgdmlldy5qb2luRGVhZCgpXG4gICAgICBpZighdGhpcy5tYWluKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdmlldy5leGVjTmV3TW91bnRlZCgpXG4gICAgICAgIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uIHdoZW4gbmF2aWdhdGluZyBmcm9tIGFuIGV4dGVybmFsIC8gbm9uLWxpdmUgcGFnZVxuICAgICAgICB0aGlzLm1heWJlU2Nyb2xsKGhpc3Rvcnkuc3RhdGU/LnNjcm9sbClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgam9pblJvb3RWaWV3cygpe1xuICAgIGxldCByb290c0ZvdW5kID0gZmFsc2VcbiAgICBET00uYWxsKGRvY3VtZW50LCBgJHtQSFhfVklFV19TRUxFQ1RPUn06bm90KFske1BIWF9QQVJFTlRfSUR9XSlgLCByb290RWwgPT4ge1xuICAgICAgaWYoIXRoaXMuZ2V0Um9vdEJ5SWQocm9vdEVsLmlkKSl7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhyb290RWwpXG4gICAgICAgIC8vIHN0aWNraWVzIGNhbm5vdCBiZSBtb3VudGVkIGF0IHRoZSByb3V0ZXIgYW5kIHRoZXJlZm9yZSBzaG91bGQgbm90XG4gICAgICAgIC8vIGdldCBhIGhyZWYgc2V0IG9uIHRoZW1cbiAgICAgICAgaWYoIURPTS5pc1BoeFN0aWNreShyb290RWwpKXsgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKSB9XG4gICAgICAgIHZpZXcuam9pbigpXG4gICAgICAgIGlmKHJvb3RFbC5oYXNBdHRyaWJ1dGUoUEhYX01BSU4pKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB9XG4gICAgICByb290c0ZvdW5kID0gdHJ1ZVxuICAgIH0pXG4gICAgcmV0dXJuIHJvb3RzRm91bmRcbiAgfVxuXG4gIHJlZGlyZWN0KHRvLCBmbGFzaCwgcmVsb2FkVG9rZW4pe1xuICAgIGlmKHJlbG9hZFRva2VuKXsgQnJvd3Nlci5zZXRDb29raWUoUEhYX1JFTE9BRF9TVEFUVVMsIHJlbG9hZFRva2VuLCA2MCkgfVxuICAgIHRoaXMudW5sb2FkKClcbiAgICBCcm93c2VyLnJlZGlyZWN0KHRvLCBmbGFzaClcbiAgfVxuXG4gIHJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCBjYWxsYmFjayA9IG51bGwsIGxpbmtSZWYgPSB0aGlzLnNldFBlbmRpbmdMaW5rKGhyZWYpKXtcbiAgICBjb25zdCBsaXZlUmVmZXJlciA9IHRoaXMuY3VycmVudExvY2F0aW9uLmhyZWZcbiAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gdGhpcy5vdXRnb2luZ01haW5FbCB8fCB0aGlzLm1haW4uZWxcblxuICAgIGNvbnN0IHN0aWNraWVzID0gRE9NLmZpbmRQaHhTdGlja3koZG9jdW1lbnQpIHx8IFtdXG4gICAgY29uc3QgcmVtb3ZlRWxzID0gRE9NLmFsbCh0aGlzLm91dGdvaW5nTWFpbkVsLCBgWyR7dGhpcy5iaW5kaW5nKFwicmVtb3ZlXCIpfV1gKVxuICAgICAgLmZpbHRlcihlbCA9PiAhRE9NLmlzQ2hpbGRPZkFueShlbCwgc3RpY2tpZXMpKVxuXG4gICAgY29uc3QgbmV3TWFpbkVsID0gRE9NLmNsb25lTm9kZSh0aGlzLm91dGdvaW5nTWFpbkVsLCBcIlwiKVxuICAgIHRoaXMubWFpbi5zaG93TG9hZGVyKHRoaXMubG9hZGVyVGltZW91dClcbiAgICB0aGlzLm1haW4uZGVzdHJveSgpXG5cbiAgICB0aGlzLm1haW4gPSB0aGlzLm5ld1Jvb3RWaWV3KG5ld01haW5FbCwgZmxhc2gsIGxpdmVSZWZlcmVyKVxuICAgIHRoaXMubWFpbi5zZXRSZWRpcmVjdChocmVmKVxuICAgIHRoaXMudHJhbnNpdGlvblJlbW92ZXMocmVtb3ZlRWxzKVxuICAgIHRoaXMubWFpbi5qb2luKChqb2luQ291bnQsIG9uRG9uZSkgPT4ge1xuICAgICAgaWYoam9pbkNvdW50ID09PSAxICYmIHRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSBwaHgtcmVtb3ZlIGVscyByaWdodCBiZWZvcmUgd2UgcmVwbGFjZSB0aGUgbWFpbiBlbGVtZW50XG4gICAgICAgICAgcmVtb3ZlRWxzLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpXG4gICAgICAgICAgc3RpY2tpZXMuZm9yRWFjaChlbCA9PiBuZXdNYWluRWwuYXBwZW5kQ2hpbGQoZWwpKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwucmVwbGFjZVdpdGgobmV3TWFpbkVsKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobGlua1JlZilcbiAgICAgICAgICBvbkRvbmUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB0cmFuc2l0aW9uUmVtb3ZlcyhlbGVtZW50cywgY2FsbGJhY2spe1xuICAgIGxldCByZW1vdmVBdHRyID0gdGhpcy5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgbGV0IHNpbGVuY2VFdmVudHMgPSAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgLy8gcHJldmVudCBhbGwgbGlzdGVuZXJzIHdlIGNhcmUgYWJvdXQgZnJvbSBidWJibGluZyB0byB3aW5kb3dcbiAgICAgIC8vIHNpbmNlIHdlIGFyZSByZW1vdmluZyB0aGUgZWxlbWVudFxuICAgICAgZm9yKGxldCBldmVudCBvZiB0aGlzLmJvdW5kRXZlbnROYW1lcyl7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHNpbGVuY2VFdmVudHMsIHRydWUpXG4gICAgICB9XG4gICAgICB0aGlzLmV4ZWNKUyhlbCwgZWwuZ2V0QXR0cmlidXRlKHJlbW92ZUF0dHIpLCBcInJlbW92ZVwiKVxuICAgIH0pXG4gICAgLy8gcmVtb3ZlIHRoZSBzaWxlbmNlZCBsaXN0ZW5lcnMgd2hlbiB0cmFuc2l0aW9ucyBhcmUgZG9uZSBpbmNhc2UgdGhlIGVsZW1lbnQgaXMgcmUtdXNlZFxuICAgIC8vIGFuZCBjYWxsIGNhbGxlcidzIGNhbGxiYWNrIGFzIHNvb24gYXMgd2UgYXJlIGRvbmUgd2l0aCB0cmFuc2l0aW9uc1xuICAgIHRoaXMucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZm9yKGxldCBldmVudCBvZiB0aGlzLmJvdW5kRXZlbnROYW1lcyl7XG4gICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgc2lsZW5jZUV2ZW50cywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9KVxuICB9XG5cbiAgaXNQaHhWaWV3KGVsKXsgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsIH1cblxuICBuZXdSb290VmlldyhlbCwgZmxhc2gsIGxpdmVSZWZlcmVyKXtcbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLCBudWxsLCBmbGFzaCwgbGl2ZVJlZmVyZXIpXG4gICAgdGhpcy5yb290c1t2aWV3LmlkXSA9IHZpZXdcbiAgICByZXR1cm4gdmlld1xuICB9XG5cbiAgb3duZXIoY2hpbGRFbCwgY2FsbGJhY2spe1xuICAgIGxldCB2aWV3ID0gbWF5YmUoY2hpbGRFbC5jbG9zZXN0KFBIWF9WSUVXX1NFTEVDVE9SKSwgZWwgPT4gdGhpcy5nZXRWaWV3QnlFbChlbCkpIHx8IHRoaXMubWFpblxuICAgIHJldHVybiB2aWV3ICYmIGNhbGxiYWNrID8gY2FsbGJhY2sodmlldykgOiB2aWV3XG4gIH1cblxuICB3aXRoaW5Pd25lcnMoY2hpbGRFbCwgY2FsbGJhY2spe1xuICAgIHRoaXMub3duZXIoY2hpbGRFbCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCBjaGlsZEVsKSlcbiAgfVxuXG4gIGdldFZpZXdCeUVsKGVsKXtcbiAgICBsZXQgcm9vdElkID0gZWwuZ2V0QXR0cmlidXRlKFBIWF9ST09UX0lEKVxuICAgIHJldHVybiBtYXliZSh0aGlzLmdldFJvb3RCeUlkKHJvb3RJZCksIHJvb3QgPT4gcm9vdC5nZXREZXNjZW5kZW50QnlFbChlbCkpXG4gIH1cblxuICBnZXRSb290QnlJZChpZCl7IHJldHVybiB0aGlzLnJvb3RzW2lkXSB9XG5cbiAgZGVzdHJveUFsbFZpZXdzKCl7XG4gICAgZm9yKGxldCBpZCBpbiB0aGlzLnJvb3RzKXtcbiAgICAgIHRoaXMucm9vdHNbaWRdLmRlc3Ryb3koKVxuICAgICAgZGVsZXRlIHRoaXMucm9vdHNbaWRdXG4gICAgfVxuICAgIHRoaXMubWFpbiA9IG51bGxcbiAgfVxuXG4gIGRlc3Ryb3lWaWV3QnlFbChlbCl7XG4gICAgbGV0IHJvb3QgPSB0aGlzLmdldFJvb3RCeUlkKGVsLmdldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCkpXG4gICAgaWYocm9vdCAmJiByb290LmlkID09PSBlbC5pZCl7XG4gICAgICByb290LmRlc3Ryb3koKVxuICAgICAgZGVsZXRlIHRoaXMucm9vdHNbcm9vdC5pZF1cbiAgICB9IGVsc2UgaWYocm9vdCl7XG4gICAgICByb290LmRlc3Ryb3lEZXNjZW5kZW50KGVsLmlkKVxuICAgIH1cbiAgfVxuXG4gIGdldEFjdGl2ZUVsZW1lbnQoKXtcbiAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICB9XG5cbiAgZHJvcEFjdGl2ZUVsZW1lbnQodmlldyl7XG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICYmIHZpZXcub3duc0VsZW1lbnQodGhpcy5wcmV2QWN0aXZlKSl7XG4gICAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZVByZXZpb3VzbHlBY3RpdmVGb2N1cygpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB0aGlzLnByZXZBY3RpdmUgIT09IGRvY3VtZW50LmJvZHkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICBibHVyQWN0aXZlRWxlbWVudCgpe1xuICAgIHRoaXMucHJldkFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlRWxlbWVudCgpXG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXsgdGhpcy5wcmV2QWN0aXZlLmJsdXIoKSB9XG4gIH1cblxuICBiaW5kVG9wTGV2ZWxFdmVudHMoe2RlYWR9ID0ge30pe1xuICAgIGlmKHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyl7IHJldHVybiB9XG5cbiAgICB0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMgPSB0cnVlXG4gICAgLy8gZW50ZXIgZmFpbHNhZmUgcmVsb2FkIGlmIHNlcnZlciBoYXMgZ29uZSBhd2F5IGludGVudGlvbmFsbHksIHN1Y2ggYXMgXCJkaXNjb25uZWN0XCIgYnJvYWRjYXN0XG4gICAgdGhpcy5zZXJ2ZXJDbG9zZVJlZiA9IHRoaXMuc29ja2V0Lm9uQ2xvc2UoZXZlbnQgPT4ge1xuICAgICAgLy8gZmFpbHNhZmUgcmVsb2FkIGlmIG5vcm1hbCBjbG9zdXJlIGFuZCB3ZSBzdGlsbCBoYXZlIGEgbWFpbiBMVlxuICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuY29kZSA9PT0gMTAwMCAmJiB0aGlzLm1haW4peyByZXR1cm4gdGhpcy5yZWxvYWRXaXRoSml0dGVyKHRoaXMubWFpbikgfVxuICAgIH0pXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCl7IH0pIC8vIGVuc3VyZSBhbGwgY2xpY2sgZXZlbnRzIGJ1YmJsZSBmb3IgbW9iaWxlIFNhZmFyaVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgZSA9PiB7XG4gICAgICBpZihlLnBlcnNpc3RlZCl7IC8vIHJlbG9hZCBwYWdlIGlmIGJlaW5nIHJlc3RvcmVkIGZyb20gYmFjay9mb3J3YXJkIGNhY2hlXG4gICAgICAgIHRoaXMuZ2V0U29ja2V0KCkuZGlzY29ubmVjdCgpXG4gICAgICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogd2luZG93LmxvY2F0aW9uLmhyZWYsIGtpbmQ6IFwicmVkaXJlY3RcIn0pXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0sIHRydWUpXG4gICAgaWYoIWRlYWQpeyB0aGlzLmJpbmROYXYoKSB9XG4gICAgdGhpcy5iaW5kQ2xpY2tzKClcbiAgICBpZighZGVhZCl7IHRoaXMuYmluZEZvcm1zKCkgfVxuICAgIHRoaXMuYmluZCh7a2V5dXA6IFwia2V5dXBcIiwga2V5ZG93bjogXCJrZXlkb3duXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBfcGh4VGFyZ2V0KSA9PiB7XG4gICAgICBsZXQgbWF0Y2hLZXkgPSB0YXJnZXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9LRVkpKVxuICAgICAgbGV0IHByZXNzZWRLZXkgPSBlLmtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpIC8vIGNocm9tZSBjbGlja2VkIGF1dG9jb21wbGV0ZXMgc2VuZCBhIGtleWRvd24gd2l0aG91dCBrZXlcbiAgICAgIGlmKG1hdGNoS2V5ICYmIG1hdGNoS2V5LnRvTG93ZXJDYXNlKCkgIT09IHByZXNzZWRLZXkpeyByZXR1cm4gfVxuXG4gICAgICBsZXQgZGF0YSA9IHtrZXk6IGUua2V5LCAuLi50aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbCl9XG4gICAgICBKUy5leGVjKGUsIHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImZvY3Vzb3V0XCIsIGZvY3VzOiBcImZvY3VzaW5cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIHBoeFRhcmdldCkgPT4ge1xuICAgICAgaWYoIXBoeFRhcmdldCl7XG4gICAgICAgIGxldCBkYXRhID0ge2tleTogZS5rZXksIC4uLnRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKX1cbiAgICAgICAgSlMuZXhlYyhlLCB0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuYmluZCh7Ymx1cjogXCJibHVyXCIsIGZvY3VzOiBcImZvY3VzXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBwaHhUYXJnZXQpID0+IHtcbiAgICAgIC8vIGJsdXIgYW5kIGZvY3VzIGFyZSB0cmlnZ2VyZWQgb24gZG9jdW1lbnQgYW5kIHdpbmRvdy4gRGlzY2FyZCBvbmUgdG8gYXZvaWQgZHVwc1xuICAgICAgaWYocGh4VGFyZ2V0ID09PSBcIndpbmRvd1wiKXtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbClcbiAgICAgICAgSlMuZXhlYyhlLCB0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMub24oXCJkcmFnb3ZlclwiLCBlID0+IGUucHJldmVudERlZmF1bHQoKSlcbiAgICB0aGlzLm9uKFwiZHJvcFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgbGV0IGRyb3BUYXJnZXRJZCA9IG1heWJlKGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCB0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSksIHRydWVUYXJnZXQgPT4ge1xuICAgICAgICByZXR1cm4gdHJ1ZVRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9EUk9QX1RBUkdFVCkpXG4gICAgICB9KVxuICAgICAgbGV0IGRyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0SWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJvcFRhcmdldElkKVxuICAgICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlci5maWxlcyB8fCBbXSlcbiAgICAgIGlmKCFkcm9wVGFyZ2V0IHx8IGRyb3BUYXJnZXQuZGlzYWJsZWQgfHwgZmlsZXMubGVuZ3RoID09PSAwIHx8ICEoZHJvcFRhcmdldC5maWxlcyBpbnN0YW5jZW9mIEZpbGVMaXN0KSl7IHJldHVybiB9XG5cbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKGRyb3BUYXJnZXQsIGZpbGVzLCBlLmRhdGFUcmFuc2ZlcilcbiAgICAgIGRyb3BUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gICAgdGhpcy5vbihQSFhfVFJBQ0tfVVBMT0FEUywgZSA9PiB7XG4gICAgICBsZXQgdXBsb2FkVGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgIGlmKCFET00uaXNVcGxvYWRJbnB1dCh1cGxvYWRUYXJnZXQpKXsgcmV0dXJuIH1cbiAgICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZS5kZXRhaWwuZmlsZXMgfHwgW10pLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBGaWxlIHx8IGYgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXModXBsb2FkVGFyZ2V0LCBmaWxlcylcbiAgICAgIHVwbG9hZFRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpXG4gICAgfSlcbiAgfVxuXG4gIGV2ZW50TWV0YShldmVudE5hbWUsIGUsIHRhcmdldEVsKXtcbiAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzW2V2ZW50TmFtZV1cbiAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhlLCB0YXJnZXRFbCkgOiB7fVxuICB9XG5cbiAgc2V0UGVuZGluZ0xpbmsoaHJlZil7XG4gICAgdGhpcy5saW5rUmVmKytcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gaHJlZlxuICAgIHRoaXMucmVzZXRSZWxvYWRTdGF0dXMoKVxuICAgIHJldHVybiB0aGlzLmxpbmtSZWZcbiAgfVxuXG4gIC8vIGFueXRpbWUgd2UgYXJlIG5hdmlnYXRpbmcgb3IgY29ubmVjdGluZywgZHJvcCByZWxvYWQgY29va2llIGluIGNhc2VcbiAgLy8gd2UgaXNzdWUgdGhlIGNvb2tpZSBidXQgdGhlIG5leHQgcmVxdWVzdCB3YXMgaW50ZXJydXB0ZWQgYW5kIHRoZSBzZXJ2ZXIgbmV2ZXIgZHJvcHBlZCBpdFxuICByZXNldFJlbG9hZFN0YXR1cygpeyBCcm93c2VyLmRlbGV0ZUNvb2tpZShQSFhfUkVMT0FEX1NUQVRVUykgfVxuXG4gIGNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpe1xuICAgIGlmKHRoaXMubGlua1JlZiAhPT0gbGlua1JlZil7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ocmVmID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgZ2V0SHJlZigpeyByZXR1cm4gdGhpcy5ocmVmIH1cblxuICBoYXNQZW5kaW5nTGluaygpeyByZXR1cm4gISF0aGlzLnBlbmRpbmdMaW5rIH1cblxuICBiaW5kKGV2ZW50cywgY2FsbGJhY2spe1xuICAgIGZvcihsZXQgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgIGxldCBicm93c2VyRXZlbnROYW1lID0gZXZlbnRzW2V2ZW50XVxuXG4gICAgICB0aGlzLm9uKGJyb3dzZXJFdmVudE5hbWUsIGUgPT4ge1xuICAgICAgICBsZXQgYmluZGluZyA9IHRoaXMuYmluZGluZyhldmVudClcbiAgICAgICAgbGV0IHdpbmRvd0JpbmRpbmcgPSB0aGlzLmJpbmRpbmcoYHdpbmRvdy0ke2V2ZW50fWApXG4gICAgICAgIGxldCB0YXJnZXRQaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoYmluZGluZylcbiAgICAgICAgaWYodGFyZ2V0UGh4RXZlbnQpe1xuICAgICAgICAgIHRoaXMuZGVib3VuY2UoZS50YXJnZXQsIGUsIGJyb3dzZXJFdmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZSwgZXZlbnQsIHZpZXcsIGUudGFyZ2V0LCB0YXJnZXRQaHhFdmVudCwgbnVsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7d2luZG93QmluZGluZ31dYCwgZWwgPT4ge1xuICAgICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHdpbmRvd0JpbmRpbmcpXG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlKGVsLCBlLCBicm93c2VyRXZlbnROYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZWwsIHBoeEV2ZW50LCBcIndpbmRvd1wiKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGJpbmRDbGlja3MoKXtcbiAgICB0aGlzLm9uKFwibW91c2Vkb3duXCIsIGUgPT4gdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IGUudGFyZ2V0KVxuICAgIHRoaXMuYmluZENsaWNrKFwiY2xpY2tcIiwgXCJjbGlja1wiKVxuICB9XG5cbiAgYmluZENsaWNrKGV2ZW50TmFtZSwgYmluZGluZ05hbWUpe1xuICAgIGxldCBjbGljayA9IHRoaXMuYmluZGluZyhiaW5kaW5nTmFtZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGUgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IG51bGxcbiAgICAgIC8vIGEgc3ludGhldGljIGNsaWNrIGV2ZW50IChkZXRhaWwgMCkgd2lsbCBub3QgaGF2ZSBjYXVzZWQgYSBtb3VzZWRvd24gZXZlbnQsXG4gICAgICAvLyB0aGVyZWZvcmUgdGhlIGNsaWNrU3RhcnRlZEF0VGFyZ2V0IGlzIHN0YWxlXG4gICAgICBpZihlLmRldGFpbCA9PT0gMCkgdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IGUudGFyZ2V0XG4gICAgICBsZXQgY2xpY2tTdGFydGVkQXRUYXJnZXQgPSB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0IHx8IGUudGFyZ2V0XG4gICAgICAvLyB3aGVuIHNlYXJjaGluZyB0aGUgdGFyZ2V0IGZvciB0aGUgY2xpY2sgZXZlbnQsIHdlIGFsd2F5cyB3YW50IHRvXG4gICAgICAvLyB1c2UgdGhlIGFjdHVhbCBldmVudCB0YXJnZXQsIHNlZSAjMzM3MlxuICAgICAgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIGNsaWNrKVxuICAgICAgdGhpcy5kaXNwYXRjaENsaWNrQXdheShlLCBjbGlja1N0YXJ0ZWRBdFRhcmdldClcbiAgICAgIHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBudWxsXG4gICAgICBsZXQgcGh4RXZlbnQgPSB0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShjbGljaylcbiAgICAgIGlmKCFwaHhFdmVudCl7XG4gICAgICAgIGlmKERPTS5pc05ld1BhZ2VDbGljayhlLCB3aW5kb3cubG9jYXRpb24pKXsgdGhpcy51bmxvYWQoKSB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZih0YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIpeyBlLnByZXZlbnREZWZhdWx0KCkgfVxuXG4gICAgICAvLyBub29wIGlmIHdlIGFyZSBpbiB0aGUgbWlkZGxlIG9mIGF3YWl0aW5nIGFuIGFjayBmb3IgdGhpcyBlbCBhbHJlYWR5XG4gICAgICBpZih0YXJnZXQuaGFzQXR0cmlidXRlKFBIWF9SRUZfU1JDKSl7IHJldHVybiB9XG5cbiAgICAgIHRoaXMuZGVib3VuY2UodGFyZ2V0LCBlLCBcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy53aXRoaW5Pd25lcnModGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICBKUy5leGVjKGUsIFwiY2xpY2tcIiwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldCwgW1wicHVzaFwiLCB7ZGF0YTogdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCB0YXJnZXQpfV0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICB9XG5cbiAgZGlzcGF0Y2hDbGlja0F3YXkoZSwgY2xpY2tTdGFydGVkQXQpe1xuICAgIGxldCBwaHhDbGlja0F3YXkgPSB0aGlzLmJpbmRpbmcoXCJjbGljay1hd2F5XCIpXG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske3BoeENsaWNrQXdheX1dYCwgZWwgPT4ge1xuICAgICAgaWYoIShlbC5pc1NhbWVOb2RlKGNsaWNrU3RhcnRlZEF0KSB8fCBlbC5jb250YWlucyhjbGlja1N0YXJ0ZWRBdCkpKXtcbiAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZWwsIHZpZXcgPT4ge1xuICAgICAgICAgIGxldCBwaHhFdmVudCA9IGVsLmdldEF0dHJpYnV0ZShwaHhDbGlja0F3YXkpXG4gICAgICAgICAgaWYoSlMuaXNWaXNpYmxlKGVsKSAmJiBKUy5pc0luVmlld3BvcnQoZWwpKXtcbiAgICAgICAgICAgIEpTLmV4ZWMoZSwgXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgZWwsIFtcInB1c2hcIiwge2RhdGE6IHRoaXMuZXZlbnRNZXRhKFwiY2xpY2tcIiwgZSwgZS50YXJnZXQpfV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBiaW5kTmF2KCl7XG4gICAgaWYoIUJyb3dzZXIuY2FuUHVzaFN0YXRlKCkpeyByZXR1cm4gfVxuICAgIGlmKGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24peyBoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gXCJtYW51YWxcIiB9XG4gICAgbGV0IHNjcm9sbFRpbWVyID0gbnVsbFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIF9lID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lcilcbiAgICAgIHNjcm9sbFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlID0+IE9iamVjdC5hc3NpZ24oc3RhdGUsIHtzY3JvbGw6IHdpbmRvdy5zY3JvbGxZfSkpXG4gICAgICB9LCAxMDApXG4gICAgfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGV2ZW50ID0+IHtcbiAgICAgIGlmKCF0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKSl7IHJldHVybiB9XG4gICAgICBsZXQge3R5cGUsIGJhY2tUeXBlLCBpZCwgc2Nyb2xsLCBwb3NpdGlvbn0gPSBldmVudC5zdGF0ZSB8fCB7fVxuICAgICAgbGV0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgICAvLyBDb21wYXJlIHBvc2l0aW9ucyB0byBkZXRlcm1pbmUgZGlyZWN0aW9uXG4gICAgICBsZXQgaXNGb3J3YXJkID0gcG9zaXRpb24gPiB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb25cblxuICAgICAgdHlwZSA9IGlzRm9yd2FyZCA/IHR5cGUgOiAoYmFja1R5cGUgfHwgdHlwZSlcblxuICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDBcbiAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfSElTVE9SWV9QT1NJVElPTiwgdGhpcy5jdXJyZW50SGlzdG9yeVBvc2l0aW9uLnRvU3RyaW5nKCkpXG5cbiAgICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6bmF2aWdhdGVcIiwge2RldGFpbDoge2hyZWYsIHBhdGNoOiB0eXBlID09PSBcInBhdGNoXCIsIHBvcDogdHJ1ZSwgZGlyZWN0aW9uOiBpc0ZvcndhcmQgPyBcImZvcndhcmRcIiA6IFwiYmFja3dhcmRcIn19KVxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7IHRoaXMubWF5YmVTY3JvbGwoc2Nyb2xsKSB9XG4gICAgICAgIGlmKHRoaXMubWFpbi5pc0Nvbm5lY3RlZCgpICYmICh0eXBlID09PSBcInBhdGNoXCIgJiYgaWQgPT09IHRoaXMubWFpbi5pZCkpe1xuICAgICAgICAgIHRoaXMubWFpbi5wdXNoTGlua1BhdGNoKGV2ZW50LCBocmVmLCBudWxsLCBjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIG51bGwsIGNhbGxiYWNrKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgdHlwZSA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSVZFX0xJTkspXG4gICAgICBpZighdHlwZSB8fCAhdGhpcy5pc0Nvbm5lY3RlZCgpIHx8ICF0aGlzLm1haW4gfHwgRE9NLndhbnRzTmV3VGFiKGUpKXsgcmV0dXJuIH1cblxuICAgICAgLy8gV2hlbiB3cmFwcGluZyBhbiBTVkcgZWxlbWVudCBpbiBhbiBhbmNob3IgdGFnLCB0aGUgaHJlZiBjYW4gYmUgYW4gU1ZHQW5pbWF0ZWRTdHJpbmdcbiAgICAgIGxldCBocmVmID0gdGFyZ2V0LmhyZWYgaW5zdGFuY2VvZiBTVkdBbmltYXRlZFN0cmluZyA/IHRhcmdldC5ocmVmLmJhc2VWYWwgOiB0YXJnZXQuaHJlZlxuXG4gICAgICBsZXQgbGlua1N0YXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShQSFhfTElOS19TVEFURSlcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSAvLyBkbyBub3QgYnViYmxlIGNsaWNrIHRvIHJlZ3VsYXIgcGh4LWNsaWNrIGJpbmRpbmdzXG4gICAgICBpZih0aGlzLnBlbmRpbmdMaW5rID09PSBocmVmKXsgcmV0dXJuIH1cblxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYodHlwZSA9PT0gXCJwYXRjaFwiKXtcbiAgICAgICAgICB0aGlzLnB1c2hIaXN0b3J5UGF0Y2goZSwgaHJlZiwgbGlua1N0YXRlLCB0YXJnZXQpXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgIHRoaXMuaGlzdG9yeVJlZGlyZWN0KGUsIGhyZWYsIGxpbmtTdGF0ZSwgbnVsbCwgdGFyZ2V0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgJHtQSFhfTElWRV9MSU5LfSB0byBiZSBcInBhdGNoXCIgb3IgXCJyZWRpcmVjdFwiLCBnb3Q6ICR7dHlwZX1gKVxuICAgICAgICB9XG4gICAgICAgIGxldCBwaHhDbGljayA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2xpY2tcIikpXG4gICAgICAgIGlmKHBoeENsaWNrKXtcbiAgICAgICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5leGVjSlModGFyZ2V0LCBwaHhDbGljaywgXCJjbGlja1wiKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIG1heWJlU2Nyb2xsKHNjcm9sbCl7XG4gICAgaWYodHlwZW9mKHNjcm9sbCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbClcbiAgICAgIH0pIC8vIHRoZSBib2R5IG5lZWRzIHRvIHJlbmRlciBiZWZvcmUgd2Ugc2Nyb2xsLlxuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSl7XG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBgcGh4OiR7ZXZlbnR9YCwge2RldGFpbDogcGF5bG9hZH0pXG4gIH1cblxuICBkaXNwYXRjaEV2ZW50cyhldmVudHMpe1xuICAgIGV2ZW50cy5mb3JFYWNoKChbZXZlbnQsIHBheWxvYWRdKSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQpKVxuICB9XG5cbiAgd2l0aFBhZ2VMb2FkaW5nKGluZm8sIGNhbGxiYWNrKXtcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7ZGV0YWlsOiBpbmZvfSlcbiAgICBsZXQgZG9uZSA9ICgpID0+IERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0b3BcIiwge2RldGFpbDogaW5mb30pXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZG9uZSkgOiBkb25lXG4gIH1cblxuICBwdXNoSGlzdG9yeVBhdGNoKGUsIGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0RWwpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkgfHwgIXRoaXMubWFpbi5pc01haW4oKSl7IHJldHVybiBCcm93c2VyLnJlZGlyZWN0KGhyZWYpIH1cblxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChlLCBocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgLy8gSW5jcmVtZW50IHBvc2l0aW9uIGZvciBuZXcgc3RhdGVcbiAgICB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb24rK1xuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfSElTVE9SWV9QT1NJVElPTiwgdGhpcy5jdXJyZW50SGlzdG9yeVBvc2l0aW9uLnRvU3RyaW5nKCkpXG5cbiAgICAvLyBzdG9yZSB0aGUgdHlwZSBmb3IgYmFjayBuYXZpZ2F0aW9uXG4gICAgQnJvd3Nlci51cGRhdGVDdXJyZW50U3RhdGUoKHN0YXRlKSA9PiAoey4uLnN0YXRlLCBiYWNrVHlwZTogXCJwYXRjaFwifSkpXG5cbiAgICBCcm93c2VyLnB1c2hTdGF0ZShsaW5rU3RhdGUsIHtcbiAgICAgIHR5cGU6IFwicGF0Y2hcIixcbiAgICAgIGlkOiB0aGlzLm1haW4uaWQsXG4gICAgICBwb3NpdGlvbjogdGhpcy5jdXJyZW50SGlzdG9yeVBvc2l0aW9uXG4gICAgfSwgaHJlZilcblxuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6bmF2aWdhdGVcIiwge2RldGFpbDoge3BhdGNoOiB0cnVlLCBocmVmLCBwb3A6IGZhbHNlLCBkaXJlY3Rpb246IFwiZm9yd2FyZFwifX0pXG4gICAgdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbilcbiAgfVxuXG4gIGhpc3RvcnlSZWRpcmVjdChlLCBocmVmLCBsaW5rU3RhdGUsIGZsYXNoLCB0YXJnZXRFbCl7XG4gICAgY29uc3QgY2xpY2tMb2FkaW5nID0gdGFyZ2V0RWwgJiYgZS5pc1RydXN0ZWQgJiYgZS50eXBlICE9PSBcInBvcHN0YXRlXCJcbiAgICBpZihjbGlja0xvYWRpbmcpeyB0YXJnZXRFbC5jbGFzc0xpc3QuYWRkKFwicGh4LWNsaWNrLWxvYWRpbmdcIikgfVxuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkgfHwgIXRoaXMubWFpbi5pc01haW4oKSl7IHJldHVybiBCcm93c2VyLnJlZGlyZWN0KGhyZWYsIGZsYXNoKSB9XG5cbiAgICAvLyBjb252ZXJ0IHRvIGZ1bGwgaHJlZiBpZiBvbmx5IHBhdGggcHJlZml4XG4gICAgaWYoL15cXC8kfF5cXC9bXlxcL10rLiokLy50ZXN0KGhyZWYpKXtcbiAgICAgIGxldCB7cHJvdG9jb2wsIGhvc3R9ID0gd2luZG93LmxvY2F0aW9uXG4gICAgICBocmVmID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3R9JHtocmVmfWBcbiAgICB9XG4gICAgbGV0IHNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZXG4gICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiBocmVmLCBraW5kOiBcInJlZGlyZWN0XCJ9LCBkb25lID0+IHtcbiAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgZmxhc2gsIChsaW5rUmVmKSA9PiB7XG4gICAgICAgIGlmKGxpbmtSZWYgPT09IHRoaXMubGlua1JlZil7XG4gICAgICAgICAgLy8gSW5jcmVtZW50IHBvc2l0aW9uIGZvciBuZXcgc3RhdGVcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb24rK1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfSElTVE9SWV9QT1NJVElPTiwgdGhpcy5jdXJyZW50SGlzdG9yeVBvc2l0aW9uLnRvU3RyaW5nKCkpXG5cbiAgICAgICAgICAvLyBzdG9yZSB0aGUgdHlwZSBmb3IgYmFjayBuYXZpZ2F0aW9uXG4gICAgICAgICAgQnJvd3Nlci51cGRhdGVDdXJyZW50U3RhdGUoKHN0YXRlKSA9PiAoey4uLnN0YXRlLCBiYWNrVHlwZTogXCJyZWRpcmVjdFwifSkpXG5cbiAgICAgICAgICBCcm93c2VyLnB1c2hTdGF0ZShsaW5rU3RhdGUsIHtcbiAgICAgICAgICAgIHR5cGU6IFwicmVkaXJlY3RcIixcbiAgICAgICAgICAgIGlkOiB0aGlzLm1haW4uaWQsXG4gICAgICAgICAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb25cbiAgICAgICAgICB9LCBocmVmKVxuXG4gICAgICAgICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpuYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7aHJlZiwgcGF0Y2g6IGZhbHNlLCBwb3A6IGZhbHNlLCBkaXJlY3Rpb246IFwiZm9yd2FyZFwifX0pXG4gICAgICAgICAgdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbilcbiAgICAgICAgfVxuICAgICAgICAvLyBleHBsaWNpdGx5IHVuZG8gY2xpY2stbG9hZGluZyBjbGFzc1xuICAgICAgICAvLyAoaW4gY2FzZSBpdCBvcmlnaW5hdGVkIGluIGEgc3RpY2t5IGxpdmUgdmlldywgb3RoZXJ3aXNlIGl0IHdvdWxkIGJlIHJlbW92ZWQgYW55d2F5KVxuICAgICAgICBpZihjbGlja0xvYWRpbmcpeyB0YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKFwicGh4LWNsaWNrLWxvYWRpbmdcIikgfVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlZ2lzdGVyTmV3TG9jYXRpb24obmV3TG9jYXRpb24pe1xuICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxuICAgIGlmKHBhdGhuYW1lICsgc2VhcmNoID09PSBuZXdMb2NhdGlvbi5wYXRobmFtZSArIG5ld0xvY2F0aW9uLnNlYXJjaCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZShuZXdMb2NhdGlvbilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgYmluZEZvcm1zKCl7XG4gICAgbGV0IGl0ZXJhdGlvbnMgPSAwXG4gICAgbGV0IGV4dGVybmFsRm9ybVN1Ym1pdHRlZCA9IGZhbHNlXG5cbiAgICAvLyBkaXNhYmxlIGZvcm1zIG9uIHN1Ym1pdCB0aGF0IHRyYWNrIHBoeC1jaGFuZ2UgYnV0IHBlcmZvcm0gZXh0ZXJuYWwgc3VibWl0XG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhTdWJtaXQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwic3VibWl0XCIpKVxuICAgICAgbGV0IHBoeENoYW5nZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG4gICAgICBpZighZXh0ZXJuYWxGb3JtU3VibWl0dGVkICYmIHBoeENoYW5nZSAmJiAhcGh4U3VibWl0KXtcbiAgICAgICAgZXh0ZXJuYWxGb3JtU3VibWl0dGVkID0gdHJ1ZVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZS50YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIHZpZXcuZGlzYWJsZUZvcm0oZS50YXJnZXQpXG4gICAgICAgICAgLy8gc2FmYXJpIG5lZWRzIG5leHQgdGlja1xuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgaWYoRE9NLmlzVW5sb2FkYWJsZUZvcm1TdWJtaXQoZSkpeyB0aGlzLnVubG9hZCgpIH1cbiAgICAgICAgICAgIGUudGFyZ2V0LnN1Ym1pdCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBpZighcGh4RXZlbnQpe1xuICAgICAgICBpZihET00uaXNVbmxvYWRhYmxlRm9ybVN1Ym1pdChlKSl7IHRoaXMudW5sb2FkKCkgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS50YXJnZXQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgIEpTLmV4ZWMoZSwgXCJzdWJtaXRcIiwgcGh4RXZlbnQsIHZpZXcsIGUudGFyZ2V0LCBbXCJwdXNoXCIsIHtzdWJtaXR0ZXI6IGUuc3VibWl0dGVyfV0pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBmb3IobGV0IHR5cGUgb2YgW1wiY2hhbmdlXCIsIFwiaW5wdXRcIl0pe1xuICAgICAgdGhpcy5vbih0eXBlLCBlID0+IHtcbiAgICAgICAgaWYoZSBpbnN0YW5jZW9mIEN1c3RvbUV2ZW50ICYmIGUudGFyZ2V0LmZvcm0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgLy8gdGhyb3cgb24gaW52YWxpZCBKUy5kaXNwYXRjaCB0YXJnZXQgYW5kIG5vb3AgaWYgQ3VzdG9tRXZlbnQgdHJpZ2dlcmVkIG91dHNpZGUgSlMuZGlzcGF0Y2hcbiAgICAgICAgICBpZihlLmRldGFpbCAmJiBlLmRldGFpbC5kaXNwYXRjaGVyKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzcGF0Y2hpbmcgYSBjdXN0b20gJHt0eXBlfSBldmVudCBpcyBvbmx5IHN1cHBvcnRlZCBvbiBpbnB1dCBlbGVtZW50cyBpbnNpZGUgYSBmb3JtYClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldFxuICAgICAgICAvLyBkbyBub3QgZmlyZSBwaHgtY2hhbmdlIGlmIHdlIGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgY29tcG9zaXRpb24gc2Vzc2lvblxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9pc0NvbXBvc2luZ1xuICAgICAgICAvLyBTYWZhcmkgaGFzIGlzc3VlcyBpZiB0aGUgaW5wdXQgaXMgdXBkYXRlZCB3aGlsZSBjb21wb3NpbmdcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zMzIyXG4gICAgICAgIGlmKGUuaXNDb21wb3Npbmcpe1xuICAgICAgICAgIGNvbnN0IGtleSA9IGBjb21wb3NpdGlvbi1saXN0ZW5lci0ke3R5cGV9YFxuICAgICAgICAgIGlmKCFET00ucHJpdmF0ZShpbnB1dCwga2V5KSl7XG4gICAgICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwga2V5LCB0cnVlKVxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBvc2l0aW9uZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gdHJpZ2dlciBhIG5ldyBpbnB1dC9jaGFuZ2UgZXZlbnRcbiAgICAgICAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQodHlwZSwge2J1YmJsZXM6IHRydWV9KSlcbiAgICAgICAgICAgICAgRE9NLmRlbGV0ZVByaXZhdGUoaW5wdXQsIGtleSlcbiAgICAgICAgICAgIH0sIHtvbmNlOiB0cnVlfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlucHV0RXZlbnQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKVxuICAgICAgICBsZXQgZm9ybUV2ZW50ID0gaW5wdXQuZm9ybSAmJiBpbnB1dC5mb3JtLmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpXG4gICAgICAgIGxldCBwaHhFdmVudCA9IGlucHV0RXZlbnQgfHwgZm9ybUV2ZW50XG4gICAgICAgIGlmKCFwaHhFdmVudCl7IHJldHVybiB9XG4gICAgICAgIGlmKGlucHV0LnR5cGUgPT09IFwibnVtYmVyXCIgJiYgaW5wdXQudmFsaWRpdHkgJiYgaW5wdXQudmFsaWRpdHkuYmFkSW5wdXQpeyByZXR1cm4gfVxuXG4gICAgICAgIGxldCBkaXNwYXRjaGVyID0gaW5wdXRFdmVudCA/IGlucHV0IDogaW5wdXQuZm9ybVxuICAgICAgICBsZXQgY3VycmVudEl0ZXJhdGlvbnMgPSBpdGVyYXRpb25zXG4gICAgICAgIGl0ZXJhdGlvbnMrK1xuICAgICAgICBsZXQge2F0OiBhdCwgdHlwZTogbGFzdFR5cGV9ID0gRE9NLnByaXZhdGUoaW5wdXQsIFwicHJldi1pdGVyYXRpb25cIikgfHwge31cbiAgICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIGFsd2F5cyBmaXJlIGF0IGxlYXN0IG9uZSBcImlucHV0XCIgZXZlbnQgYmVmb3JlIGV2ZXJ5IFwiY2hhbmdlXCJcbiAgICAgICAgLy8gSWdub3JlIFwiY2hhbmdlXCIgZXZlbnRzLCB1bmxlc3MgdGhlcmUgd2FzIG5vIHByaW9yIFwiaW5wdXRcIiBldmVudC5cbiAgICAgICAgLy8gVGhpcyBjb3VsZCBoYXBwZW4gaWYgdXNlciBjb2RlIHRyaWdnZXJzIGEgXCJjaGFuZ2VcIiBldmVudCwgb3IgaWYgdGhlIGJyb3dzZXIgaXMgbm9uLWNvbmZvcm1pbmcuXG4gICAgICAgIGlmKGF0ID09PSBjdXJyZW50SXRlcmF0aW9ucyAtIDEgJiYgdHlwZSA9PT0gXCJjaGFuZ2VcIiAmJiBsYXN0VHlwZSA9PT0gXCJpbnB1dFwiKXsgcmV0dXJuIH1cblxuICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiLCB7YXQ6IGN1cnJlbnRJdGVyYXRpb25zLCB0eXBlOiB0eXBlfSlcblxuICAgICAgICB0aGlzLmRlYm91bmNlKGlucHV0LCBlLCB0eXBlLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZGlzcGF0Y2hlciwgdmlldyA9PiB7XG4gICAgICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VELCB0cnVlKVxuICAgICAgICAgICAgSlMuZXhlYyhlLCBcImNoYW5nZVwiLCBwaHhFdmVudCwgdmlldywgaW5wdXQsIFtcInB1c2hcIiwge190YXJnZXQ6IGUudGFyZ2V0Lm5hbWUsIGRpc3BhdGNoZXI6IGRpc3BhdGNoZXJ9XSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5vbihcInJlc2V0XCIsIChlKSA9PiB7XG4gICAgICBsZXQgZm9ybSA9IGUudGFyZ2V0XG4gICAgICBET00ucmVzZXRGb3JtKGZvcm0pXG4gICAgICBsZXQgaW5wdXQgPSBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpLmZpbmQoZWwgPT4gZWwudHlwZSA9PT0gXCJyZXNldFwiKVxuICAgICAgaWYoaW5wdXQpe1xuICAgICAgICAvLyB3YWl0IHVudGlsIG5leHQgdGljayB0byBnZXQgdXBkYXRlZCBpbnB1dCB2YWx1ZVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZX0pKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIGV2ZW50VHlwZSwgY2FsbGJhY2spe1xuICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJibHVyXCIgfHwgZXZlbnRUeXBlID09PSBcImZvY3Vzb3V0XCIpeyByZXR1cm4gY2FsbGJhY2soKSB9XG5cbiAgICBsZXQgcGh4RGVib3VuY2UgPSB0aGlzLmJpbmRpbmcoUEhYX0RFQk9VTkNFKVxuICAgIGxldCBwaHhUaHJvdHRsZSA9IHRoaXMuYmluZGluZyhQSFhfVEhST1RUTEUpXG4gICAgbGV0IGRlZmF1bHREZWJvdW5jZSA9IHRoaXMuZGVmYXVsdHMuZGVib3VuY2UudG9TdHJpbmcoKVxuICAgIGxldCBkZWZhdWx0VGhyb3R0bGUgPSB0aGlzLmRlZmF1bHRzLnRocm90dGxlLnRvU3RyaW5nKClcblxuICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgIGxldCBhc3luY0ZpbHRlciA9ICgpID0+ICF2aWV3LmlzRGVzdHJveWVkKCkgJiYgZG9jdW1lbnQuYm9keS5jb250YWlucyhlbClcbiAgICAgIERPTS5kZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGFzeW5jRmlsdGVyLCAoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHNpbGVuY2VFdmVudHMoY2FsbGJhY2spe1xuICAgIHRoaXMuc2lsZW5jZWQgPSB0cnVlXG4gICAgY2FsbGJhY2soKVxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICB9XG5cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICB0aGlzLmJvdW5kRXZlbnROYW1lcy5hZGQoZXZlbnQpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGUgPT4ge1xuICAgICAgaWYoIXRoaXMuc2lsZW5jZWQpeyBjYWxsYmFjayhlKSB9XG4gICAgfSlcbiAgfVxuXG4gIGpzUXVlcnlTZWxlY3RvckFsbChzb3VyY2VFbCwgcXVlcnksIGRlZmF1bHRRdWVyeSl7XG4gICAgbGV0IGFsbCA9IHRoaXMuZG9tQ2FsbGJhY2tzLmpzUXVlcnlTZWxlY3RvckFsbFxuICAgIHJldHVybiBhbGwgPyBhbGwoc291cmNlRWwsIHF1ZXJ5LCBkZWZhdWx0UXVlcnkpIDogZGVmYXVsdFF1ZXJ5KClcbiAgfVxufVxuXG5jbGFzcyBUcmFuc2l0aW9uU2V0IHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFNldCgpXG4gICAgdGhpcy5wZW5kaW5nT3BzID0gW11cbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5mb3JFYWNoKHRpbWVyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVsZXRlKHRpbWVyKVxuICAgIH0pXG4gICAgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKVxuICB9XG5cbiAgYWZ0ZXIoY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuc2l6ZSgpID09PSAwKXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXNoUGVuZGluZ09wKGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIGFkZFRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKXtcbiAgICBvblN0YXJ0KClcbiAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVsZXRlKHRpbWVyKVxuICAgICAgb25Eb25lKClcbiAgICAgIHRoaXMuZmx1c2hQZW5kaW5nT3BzKClcbiAgICB9LCB0aW1lKVxuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkKHRpbWVyKVxuICB9XG5cbiAgcHVzaFBlbmRpbmdPcChvcCl7IHRoaXMucGVuZGluZ09wcy5wdXNoKG9wKSB9XG5cbiAgc2l6ZSgpeyByZXR1cm4gdGhpcy50cmFuc2l0aW9ucy5zaXplIH1cblxuICBmbHVzaFBlbmRpbmdPcHMoKXtcbiAgICBpZih0aGlzLnNpemUoKSA+IDApeyByZXR1cm4gfVxuICAgIGxldCBvcCA9IHRoaXMucGVuZGluZ09wcy5zaGlmdCgpXG4gICAgaWYob3Ape1xuICAgICAgb3AoKVxuICAgICAgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKVxuICAgIH1cbiAgfVxufVxuIiwgIi8qXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUGhvZW5peCBMaXZlVmlldyBKYXZhU2NyaXB0IENsaWVudFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuU2VlIHRoZSBoZXhkb2NzIGF0IGBodHRwczovL2hleGRvY3MucG0vcGhvZW5peF9saXZlX3ZpZXdgIGZvciBkb2N1bWVudGF0aW9uLlxuXG4qL1xuXG5pbXBvcnQgTGl2ZVNvY2tldCwge2lzVXNlZElucHV0fSBmcm9tIFwiLi9saXZlX3NvY2tldFwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgVmlld0hvb2sgZnJvbSBcIi4vdmlld19ob29rXCJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIlxuXG4vKiogQ3JlYXRlcyBhIFZpZXdIb29rIGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBhbmQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGhvb2suXG4gKiBAcGFyYW0ge09iamVjdH0gW2NhbGxiYWNrc10gLSBUaGUgbGlzdCBvZiBob29rIGNhbGxiYWNrcywgc3VjaCBhcyBtb3VudGVkLFxuICogICB1cGRhdGVkLCBkZXN0cm95ZWQsIGV0Yy5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICogICBjb25uZWN0ZWRDYWxsYmFjaygpe1xuICogICAgIGxldCBvbkxpdmVWaWV3TW91bnRlZCA9ICgpID0+IHRoaXMuaG9vay5wdXNoRXZlbnQoLi4uKSlcbiAqICAgICB0aGlzLmhvb2sgPSBjcmVhdGVIb29rKHRoaXMsIHttb3VudGVkOiBvbkxpdmVWaWV3TW91bnRlZH0pXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiAqTm90ZSo6IGBjcmVhdGVIb29rYCBtdXN0IGJlIGNhbGxlZCBmcm9tIHRoZSBgY29ubmVjdGVkQ2FsbGJhY2tgIGxpZmVjeWNsZVxuICogd2hpY2ggaXMgdHJpZ2dlcmVkIGFmdGVyIHRoZSBlbGVtZW50IGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBET00uIElmIHlvdSB0cnlcbiAqIHRvIGNhbGwgYGNyZWF0ZUhvb2tgIGZyb20gdGhlIGNvbnN0cnVjdG9yLCBhbiBlcnJvciB3aWxsIGJlIGxvZ2dlZC5cbiAqXG4gKiBAcmV0dXJucyB7Vmlld0hvb2t9IFJldHVybnMgdGhlIFZpZXdIb29rIGluc3RhbmNlIGZvciB0aGUgY3VzdG9tIGVsZW1lbnQuXG4gKi9cbmxldCBjcmVhdGVIb29rID0gKGVsLCBjYWxsYmFja3MgPSB7fSkgPT4ge1xuICBsZXQgZXhpc3RpbmdIb29rID0gRE9NLmdldEN1c3RvbUVsSG9vayhlbClcbiAgaWYoZXhpc3RpbmdIb29rKXsgcmV0dXJuIGV4aXN0aW5nSG9vayB9XG5cbiAgbGV0IGhvb2sgPSBuZXcgVmlld0hvb2soVmlldy5jbG9zZXN0VmlldyhlbCksIGVsLCBjYWxsYmFja3MpXG4gIERPTS5wdXRDdXN0b21FbEhvb2soZWwsIGhvb2spXG4gIHJldHVybiBob29rXG59XG5cbmV4cG9ydCB7XG4gIExpdmVTb2NrZXQsXG4gIGlzVXNlZElucHV0LFxuICBjcmVhdGVIb29rXG59XG4iLCAiLy8gSWYgeW91IHdhbnQgdG8gdXNlIFBob2VuaXggY2hhbm5lbHMsIHJ1biBgbWl4IGhlbHAgcGh4Lmdlbi5jaGFubmVsYFxuLy8gdG8gZ2V0IHN0YXJ0ZWQgYW5kIHRoZW4gdW5jb21tZW50IHRoZSBsaW5lIGJlbG93LlxuLy8gaW1wb3J0IFwiLi91c2VyX3NvY2tldC5qc1wiXG5cbi8vIFlvdSBjYW4gaW5jbHVkZSBkZXBlbmRlbmNpZXMgaW4gdHdvIHdheXMuXG4vL1xuLy8gVGhlIHNpbXBsZXN0IG9wdGlvbiBpcyB0byBwdXQgdGhlbSBpbiBhc3NldHMvdmVuZG9yIGFuZFxuLy8gaW1wb3J0IHRoZW0gdXNpbmcgcmVsYXRpdmUgcGF0aHM6XG4vL1xuLy8gICAgIGltcG9ydCBcIi4uL3ZlbmRvci9zb21lLXBhY2thZ2UuanNcIlxuLy9cbi8vIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gYG5wbSBpbnN0YWxsIHNvbWUtcGFja2FnZSAtLXByZWZpeCBhc3NldHNgIGFuZCBpbXBvcnRcbi8vIHRoZW0gdXNpbmcgYSBwYXRoIHN0YXJ0aW5nIHdpdGggdGhlIHBhY2thZ2UgbmFtZTpcbi8vXG4vLyAgICAgaW1wb3J0IFwic29tZS1wYWNrYWdlXCJcbi8vXG5cbi8vIEluY2x1ZGUgcGhvZW5peF9odG1sIHRvIGhhbmRsZSBtZXRob2Q9UFVUL0RFTEVURSBpbiBmb3JtcyBhbmQgYnV0dG9ucy5cbmltcG9ydCBcInBob2VuaXhfaHRtbFwiXG4vLyBFc3RhYmxpc2ggUGhvZW5peCBTb2NrZXQgYW5kIExpdmVWaWV3IGNvbmZpZ3VyYXRpb24uXG5pbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuaW1wb3J0IHRvcGJhciBmcm9tIFwiLi4vdmVuZG9yL3RvcGJhclwiXG5cbmxldCBjc3JmVG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPSdjc3JmLXRva2VuJ11cIikuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKVxubGV0IGxpdmVTb2NrZXQgPSBuZXcgTGl2ZVNvY2tldChcIi9saXZlXCIsIFNvY2tldCwge1xuICBsb25nUG9sbEZhbGxiYWNrTXM6IDI1MDAsXG4gIHBhcmFtczoge19jc3JmX3Rva2VuOiBjc3JmVG9rZW59XG59KVxuXG4vLyBTaG93IHByb2dyZXNzIGJhciBvbiBsaXZlIG5hdmlnYXRpb24gYW5kIGZvcm0gc3VibWl0c1xudG9wYmFyLmNvbmZpZyh7YmFyQ29sb3JzOiB7MDogXCIjMjlkXCJ9LCBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4zKVwifSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCBfaW5mbyA9PiB0b3BiYXIuc2hvdygzMDApKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0b3BcIiwgX2luZm8gPT4gdG9wYmFyLmhpZGUoKSlcblxuLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxubGl2ZVNvY2tldC5jb25uZWN0KClcblxuLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbndpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFJLFdBQVcsU0FBUyxRQUFRO0FBQUEsSUFDL0Msb0JBQW9CO0FBQUEsSUFDcEIsUUFBUSxFQUFDLGFBQWEsVUFBUztBQUFBLEVBQ2pDLENBQUM7QUFHRCxnQkFBQUMsUUFBTyxPQUFPLEVBQUMsV0FBVyxFQUFDLEdBQUcsT0FBTSxHQUFHLGFBQWEsb0JBQW1CLENBQUM7QUFDeEUsU0FBTyxpQkFBaUIsMEJBQTBCLFdBQVMsY0FBQUEsUUFBTyxLQUFLLEdBQUcsQ0FBQztBQUMzRSxTQUFPLGlCQUFpQix5QkFBeUIsV0FBUyxjQUFBQSxRQUFPLEtBQUssQ0FBQztBQUd2RSxhQUFXLFFBQVE7QUFNbkIsU0FBTyxhQUFhOyIsCiAgIm5hbWVzIjogWyJ3aW5kb3ciLCAiZG9jdW1lbnQiLCAidG9wYmFyIiwgIkN1c3RvbUV2ZW50IiwgImNsb3N1cmUiLCAibGl2ZVNvY2tldCIsICJjbG9zdXJlIiwgImUiLCAiaXNFbXB0eSIsICJmaWxlIiwgIm1vcnBoQXR0cnMiLCAibW9ycGhkb20iLCAiY2hpbGRyZW5Pbmx5IiwgInRhcmdldENvbnRhaW5lciIsICJjbG9uZSIsICJ2aWV3IiwgImVsIiwgImxvY2siLCAibG9hZGluZyIsICJlbnRyeSIsICJpbnB1dCIsICJjbG9zdXJlIiwgInRvcGJhciJdCn0K
