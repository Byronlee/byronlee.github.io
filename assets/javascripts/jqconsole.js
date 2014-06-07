(function() {
  var $, Ansi, CLASS_ANSI, CLASS_BLURRED, CLASS_CURSOR, CLASS_HEADER, CLASS_INPUT, CLASS_OLD_PROMPT, CLASS_PREFIX, CLASS_PROMPT, DEFAULT_INDENT_WIDTH, DEFAULT_PROMPT_CONINUE_LABEL, DEFAULT_PROMPT_LABEL, EMPTY_DIV, EMPTY_SELECTOR, EMPTY_SPAN, ESCAPE_CHAR, ESCAPE_SYNTAX, E_KEYPRESS, JQConsole, KEY_BACKSPACE, KEY_DELETE, KEY_DOWN, KEY_END, KEY_ENTER, KEY_HOME, KEY_LEFT, KEY_PAGE_DOWN, KEY_PAGE_UP, KEY_RIGHT, KEY_TAB, KEY_UP, NEWLINE, STATE_INPUT, STATE_OUTPUT, STATE_PROMPT, spanHtml,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  $ = jQuery;

  STATE_INPUT = 0;

  STATE_OUTPUT = 1;

  STATE_PROMPT = 2;

  KEY_ENTER = 13;

  KEY_TAB = 9;

  KEY_DELETE = 46;

  KEY_BACKSPACE = 8;

  KEY_LEFT = 37;

  KEY_RIGHT = 39;

  KEY_UP = 38;

  KEY_DOWN = 40;

  KEY_HOME = 36;

  KEY_END = 35;

  KEY_PAGE_UP = 33;

  KEY_PAGE_DOWN = 34;

  CLASS_PREFIX = 'jqconsole-';

  CLASS_CURSOR = "" + CLASS_PREFIX + "cursor";

  CLASS_HEADER = "" + CLASS_PREFIX + "header";

  CLASS_PROMPT = "" + CLASS_PREFIX + "prompt";

  CLASS_OLD_PROMPT = "" + CLASS_PREFIX + "old-prompt";

  CLASS_INPUT = "" + CLASS_PREFIX + "input";

  CLASS_BLURRED = "" + CLASS_PREFIX + "blurred";

  E_KEYPRESS = 'keypress';

  EMPTY_SPAN = '<span/>';

  EMPTY_DIV = '<div/>';

  EMPTY_SELECTOR = ':empty';

  NEWLINE = '\n';

  DEFAULT_PROMPT_LABEL = '>>> ';

  DEFAULT_PROMPT_CONINUE_LABEL = '... ';

  DEFAULT_INDENT_WIDTH = 2;

  CLASS_ANSI = "" + CLASS_PREFIX + "ansi-";

  ESCAPE_CHAR = '\x1B';

  ESCAPE_SYNTAX = /\[(\d*)(?:;(\d*))*m/;

  Ansi = (function() {
    Ansi.prototype.COLORS = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

    function Ansi() {
      this.stylize = __bind(this.stylize, this);
      this._closeSpan = __bind(this._closeSpan, this);
      this._openSpan = __bind(this._openSpan, this);
      this.getClasses = __bind(this.getClasses, this);
      this._style = __bind(this._style, this);
      this._color = __bind(this._color, this);
      this._remove = __bind(this._remove, this);
      this._append = __bind(this._append, this);
      this.klasses = [];
    }

    Ansi.prototype._append = function(klass) {
      klass = "" + CLASS_ANSI + klass;
      if (this.klasses.indexOf(klass) === -1) {
        return this.klasses.push(klass);
      }
    };

    Ansi.prototype._remove = function() {
      var cls, klass, klasses, _i, _len, _results;
      klasses = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = klasses.length; _i < _len; _i++) {
        klass = klasses[_i];
        if (klass === 'fonts' || klass === 'color' || klass === 'background-color') {
          _results.push(this.klasses = (function() {
            var _j, _len1, _ref, _results1;
            _ref = this.klasses;
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              cls = _ref[_j];
              if (cls.indexOf(klass) !== CLASS_ANSI.length) {
                _results1.push(cls);
              }
            }
            return _results1;
          }).call(this));
        } else {
          klass = "" + CLASS_ANSI + klass;
          _results.push(this.klasses = (function() {
            var _j, _len1, _ref, _results1;
            _ref = this.klasses;
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              cls = _ref[_j];
              if (cls !== klass) {
                _results1.push(cls);
              }
            }
            return _results1;
          }).call(this));
        }
      }
      return _results;
    };

    Ansi.prototype._color = function(i) {
      return this.COLORS[i];
    };

    Ansi.prototype._style = function(code) {
      if (code === '') {
        code = 0;
      }
      code = parseInt(code);
      if (isNaN(code)) {
        return;
      }
      switch (code) {
        case 0:
          return this.klasses = [];
        case 1:
          return this._append('bold');
        case 2:
          return this._append('lighter');
        case 3:
          return this._append('italic');
        case 4:
          return this._append('underline');
        case 5:
          return this._append('blink');
        case 6:
          return this._append('blink-rapid');
        case 8:
          return this._append('hidden');
        case 9:
          return this._append('line-through');
        case 10:
          return this._remove('fonts');
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
          this._remove('fonts');
          return this._append("fonts-" + (code - 10));
        case 20:
          return this._append('fraktur');
        case 21:
          return this._remove('bold', 'lighter');
        case 22:
          return this._remove('bold', 'lighter');
        case 23:
          return this._remove('italic', 'fraktur');
        case 24:
          return this._remove('underline');
        case 25:
          return this._remove('blink', 'blink-rapid');
        case 28:
          return this._remove('hidden');
        case 29:
          return this._remove('line-through');
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
          this._remove('color');
          return this._append('color-' + this._color(code - 30));
        case 39:
          return this._remove('color');
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
          this._remove('background-color');
          return this._append('background-color-' + this._color(code - 40));
        case 49:
          return this._remove('background-color');
        case 51:
          return this._append('framed');
        case 53:
          return this._append('overline');
        case 54:
          return this._remove('framed');
        case 55:
          return this._remove('overline');
      }
    };

    Ansi.prototype.getClasses = function() {
      return this.klasses.join(' ');
    };

    Ansi.prototype._openSpan = function(text) {
      return "<span class=\"" + (this.getClasses()) + "\">" + text;
    };

    Ansi.prototype._closeSpan = function(text) {
      return "" + text + "</span>";
    };

    Ansi.prototype.stylize = function(text) {
      var code, d, i, _i, _len, _ref;
      text = this._openSpan(text);
      i = 0;
      while ((i = text.indexOf(ESCAPE_CHAR, i)) && i !== -1) {
        if (d = text.slice(i).match(ESCAPE_SYNTAX)) {
          _ref = d.slice(1);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            code = _ref[_i];
            this._style(code);
          }
          text = this._closeSpan(text.slice(0, i)) + this._openSpan(text.slice(i + 1 + d[0].length));
        } else {
          i++;
        }
      }
      return this._closeSpan(text);
    };

    return Ansi;

  })();

  spanHtml = function(klass, content) {
    return "<span class=\"" + klass + "\">" + (content || '') + "</span>";
  };

  JQConsole = (function() {
    function JQConsole(container, header, prompt_label, prompt_continue_label) {
      this.container = container;
      this._HideComposition = __bind(this._HideComposition, this);
      this._ShowComposition = __bind(this._ShowComposition, this);
      this._UpdateComposition = __bind(this._UpdateComposition, this);
      this._EndComposition = __bind(this._EndComposition, this);
      this._StartComposition = __bind(this._StartComposition, this);
      this._CheckComposition = __bind(this._CheckComposition, this);
      this._ProcessMatch = __bind(this._ProcessMatch, this);
      this._HandleKey = __bind(this._HandleKey, this);
      this._HandleChar = __bind(this._HandleChar, this);
      this.isMobile = !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
      this.isIos = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
      this.isAndroid = !!navigator.userAgent.match(/Android/i);
      this.$window = $(window);
      this.header = header || '';
      this.prompt_label_main = typeof prompt_label === 'string' ? prompt_label : DEFAULT_PROMPT_LABEL;
      this.prompt_label_continue = prompt_continue_label || DEFAULT_PROMPT_CONINUE_LABEL;
      this.indent_width = DEFAULT_INDENT_WIDTH;
      this.state = STATE_OUTPUT;
      this.input_queue = [];
      this.input_callback = null;
      this.multiline_callback = null;
      this.history = [];
      this.history_index = 0;
      this.history_new = '';
      this.history_active = false;
      this.shortcuts = {};
      this.$console = $('<pre class="jqconsole"/>').appendTo(this.container);
      this.$console.css({
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: 0,
        overflow: 'auto'
      });
      this.$console_focused = true;
      this.$input_container = $(EMPTY_DIV).appendTo(this.container);
      this.$input_container.css({
        position: 'relative',
        width: 1,
        height: 0,
        overflow: 'hidden'
      });
      this.$input_source = $('<textarea/>');
      this.$input_source.attr('wrap', 'off').css({
        position: 'absolute',
        width: 2
      });
      this.$input_source.appendTo(this.$input_container);
      this.$composition = $(EMPTY_DIV);
      this.$composition.addClass("" + CLASS_PREFIX + "composition");
      this.$composition.css({
        display: 'inline',
        position: 'relative'
      });
      this.matchings = {
        openings: {},
        closings: {},
        clss: []
      };
      this.ansi = new Ansi();
      this._InitPrompt();
      this._SetupEvents();
      this.Write(this.header, CLASS_HEADER);
      $(this.container).data('jqconsole', this);
    }

    JQConsole.prototype.ResetHistory = function() {
      return this.SetHistory([]);
    };

    JQConsole.prototype.ResetShortcuts = function() {
      return this.shortcuts = {};
    };

    JQConsole.prototype.ResetMatchings = function() {
      return this.matchings = {
        openings: {},
        closings: {},
        clss: []
      };
    };

    JQConsole.prototype.Reset = function() {
      if (this.state !== STATE_OUTPUT) {
        this.ClearPromptText(true);
      }
      this.state = STATE_OUTPUT;
      this.input_queue = [];
      this.input_callback = null;
      this.multiline_callback = null;
      this.ResetHistory();
      this.ResetShortcuts();
      this.ResetMatchings();
      this.$prompt.detach();
      this.$input_container.detach();
      this.$console.html('');
      this.$prompt.appendTo(this.$console);
      this.$input_container.appendTo(this.container);
      this.Write(this.header, CLASS_HEADER);
      return void 0;
    };

    JQConsole.prototype.GetHistory = function() {
      return this.history;
    };

    JQConsole.prototype.SetHistory = function(history) {
      this.history = history.slice();
      return this.history_index = this.history.length;
    };


    /*------------------------ Shortcut Methods ----------------------------- */

    JQConsole.prototype._CheckKeyCode = function(key_code) {
      if (isNaN(key_code)) {
        key_code = key_code.charCodeAt(0);
      } else {
        key_code = parseInt(key_code, 10);
      }
      if (!((0 < key_code && key_code < 256)) || isNaN(key_code)) {
        throw new Error('Key code must be a number between 0 and 256 exclusive.');
      }
      return key_code;
    };

    JQConsole.prototype._LetterCaseHelper = function(key_code, callback) {
      callback(key_code);
      if ((65 <= key_code && key_code <= 90)) {
        callback(key_code + 32);
      }
      if ((97 <= key_code && key_code <= 122)) {
        return callback(key_code - 32);
      }
    };

    JQConsole.prototype.RegisterShortcut = function(key_code, callback) {
      var addShortcut;
      key_code = this._CheckKeyCode(key_code);
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function, not ' + callback + '.');
      }
      addShortcut = (function(_this) {
        return function(key) {
          if (!(key in _this.shortcuts)) {
            _this.shortcuts[key] = [];
          }
          return _this.shortcuts[key].push(callback);
        };
      })(this);
      this._LetterCaseHelper(key_code, addShortcut);
      return void 0;
    };

    JQConsole.prototype.UnRegisterShortcut = function(key_code, handler) {
      var removeShortcut;
      key_code = this._CheckKeyCode(key_code);
      removeShortcut = (function(_this) {
        return function(key) {
          if (key in _this.shortcuts) {
            if (handler) {
              return _this.shortcuts[key].splice(_this.shortcuts[key].indexOf(handler), 1);
            } else {
              return delete _this.shortcuts[key];
            }
          }
        };
      })(this);
      this._LetterCaseHelper(key_code, removeShortcut);
      return void 0;
    };


    /*---------------------- END Shortcut Methods --------------------------- */

    JQConsole.prototype.GetColumn = function() {
      var lines;
      this.$prompt_cursor.text('');
      lines = this.$console.text().split(NEWLINE);
      this.$prompt_cursor.html('&nbsp;');
      return lines[lines.length - 1].length;
    };

    JQConsole.prototype.GetLine = function() {
      return this.$console.text().split(NEWLINE).length - 1;
    };

    JQConsole.prototype.ClearPromptText = function(clear_label) {
      if (this.state === STATE_OUTPUT) {
        throw new Error('ClearPromptText() is not allowed in output state.');
      }
      this.$prompt_before.html('');
      this.$prompt_after.html('');
      this.$prompt_label.text(clear_label ? '' : this._SelectPromptLabel(false));
      this.$prompt_left.text('');
      this.$prompt_right.text('');
      return void 0;
    };

    JQConsole.prototype.GetPromptText = function(full) {
      var after, before, current, getPromptLines, text;
      if (this.state === STATE_OUTPUT) {
        throw new Error('GetPromptText() is not allowed in output state.');
      }
      if (full) {
        this.$prompt_cursor.text('');
        text = this.$prompt.text();
        this.$prompt_cursor.html('&nbsp;');
        return text;
      } else {
        getPromptLines = function(node) {
          var buffer;
          buffer = [];
          node.children().each(function() {
            return buffer.push($(this).children().last().text());
          });
          return buffer.join(NEWLINE);
        };
        before = getPromptLines(this.$prompt_before);
        if (before) {
          before += NEWLINE;
        }
        current = this.$prompt_left.text() + this.$prompt_right.text();
        after = getPromptLines(this.$prompt_after);
        if (after) {
          after = NEWLINE + after;
        }
        return before + current + after;
      }
    };

    JQConsole.prototype.SetPromptText = function(text) {
      if (this.state === STATE_OUTPUT) {
        throw new Error('SetPromptText() is not allowed in output state.');
      }
      this.ClearPromptText(false);
      this._AppendPromptText(text);
      this._ScrollToEnd();
      return void 0;
    };

    JQConsole.prototype.SetPromptLabel = function(main_label, continue_label) {
      this.prompt_label_main = main_label;
      if (continue_label != null) {
        this.prompt_label_continue = continue_label;
      }
      return void 0;
    };

    JQConsole.prototype.Write = function(text, cls, escape) {
      var span;
      if (escape == null) {
        escape = true;
      }
      if (escape) {
        text = this.ansi.stylize($(EMPTY_SPAN).text(text).html());
      }
      span = $(EMPTY_SPAN).html(text);
      if (cls != null) {
        span.addClass(cls);
      }
      return this.Append(span);
    };

    JQConsole.prototype.Append = function(node) {
      var $node;
      $node = $(node).insertBefore(this.$prompt);
      this._ScrollToEnd();
      this.$prompt_cursor.detach().insertAfter(this.$prompt_left);
      return $node;
    };

    JQConsole.prototype.Input = function(input_callback) {
      var current_async_multiline, current_history_active, current_input_callback, current_multiline_callback;
      if (this.state === STATE_PROMPT) {
        current_input_callback = this.input_callback;
        current_multiline_callback = this.multiline_callback;
        current_history_active = this.history_active;
        current_async_multiline = this.async_multiline;
        this.AbortPrompt();
        this.input_queue.unshift((function(_this) {
          return function() {
            return _this.Prompt(current_history_active, current_input_callback, current_multiline_callback, current_async_multiline);
          };
        })(this));
      } else if (this.state !== STATE_OUTPUT) {
        this.input_queue.push((function(_this) {
          return function() {
            return _this.Input(input_callback);
          };
        })(this));
        return;
      }
      this.history_active = false;
      this.input_callback = input_callback;
      this.multiline_callback = null;
      this.state = STATE_INPUT;
      this.$prompt.attr('class', CLASS_INPUT);
      this.$prompt_label.text(this._SelectPromptLabel(false));
      this.Focus();
      this._ScrollToEnd();
      return void 0;
    };

    JQConsole.prototype.Prompt = function(history_enabled, result_callback, multiline_callback, async_multiline) {
      if (this.state !== STATE_OUTPUT) {
        this.input_queue.push((function(_this) {
          return function() {
            return _this.Prompt(history_enabled, result_callback, multiline_callback, async_multiline);
          };
        })(this));
        return;
      }
      this.history_active = history_enabled;
      this.input_callback = result_callback;
      this.multiline_callback = multiline_callback;
      this.async_multiline = async_multiline;
      this.state = STATE_PROMPT;
      this.$prompt.attr('class', CLASS_PROMPT + ' ' + this.ansi.getClasses());
      this.$prompt_label.text(this._SelectPromptLabel(false));
      this.Focus();
      this._ScrollToEnd();
      return void 0;
    };

    JQConsole.prototype.AbortPrompt = function() {
      if (this.state !== STATE_PROMPT) {
        throw new Error('Cannot abort prompt when not in prompt state.');
      }
      this.Write(this.GetPromptText(true) + NEWLINE, CLASS_OLD_PROMPT);
      this.ClearPromptText(true);
      this.state = STATE_OUTPUT;
      this.input_callback = this.multiline_callback = null;
      this._CheckInputQueue();
      return void 0;
    };

    JQConsole.prototype.Focus = function() {
      if (!this.IsDisabled()) {
        this.$input_source.focus();
      }
      return void 0;
    };

    JQConsole.prototype.SetIndentWidth = function(width) {
      return this.indent_width = width;
    };

    JQConsole.prototype.GetIndentWidth = function() {
      return this.indent_width;
    };

    JQConsole.prototype.RegisterMatching = function(open, close, cls) {
      var match_config;
      match_config = {
        opening_char: open,
        closing_char: close,
        cls: cls
      };
      this.matchings.clss.push(cls);
      this.matchings.openings[open] = match_config;
      return this.matchings.closings[close] = match_config;
    };

    JQConsole.prototype.UnRegisterMatching = function(open, close) {
      var cls;
      cls = this.matchings.openings[open].cls;
      delete this.matchings.openings[open];
      delete this.matchings.closings[close];
      return this.matchings.clss.splice(this.matchings.clss.indexOf(cls), 1);
    };

    JQConsole.prototype.Dump = function() {
      var $elems, elem;
      $elems = this.$console.find("." + CLASS_HEADER).nextUntil("." + CLASS_PROMPT);
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = $elems.length; _i < _len; _i++) {
          elem = $elems[_i];
          if ($(elem).is("." + CLASS_OLD_PROMPT)) {
            _results.push($(elem).text().replace(/^\s+/, '>>> '));
          } else {
            _results.push($(elem).text());
          }
        }
        return _results;
      })()).join(' ');
    };

    JQConsole.prototype.GetState = function() {
      if (this.state === STATE_INPUT) {
        return 'input';
      } else if (this.state === STATE_OUTPUT) {
        return 'output';
      } else {
        return 'prompt';
      }
    };

    JQConsole.prototype.Disable = function() {
      this.$input_source.attr('disabled', true);
      return this.$input_source.blur();
    };

    JQConsole.prototype.Enable = function() {
      return this.$input_source.attr('disabled', false);
    };

    JQConsole.prototype.IsDisabled = function() {
      return Boolean(this.$input_source.attr('disabled'));
    };

    JQConsole.prototype.MoveToStart = function(all_lines) {
      this._MoveTo(all_lines, true);
      return void 0;
    };

    JQConsole.prototype.MoveToEnd = function(all_lines) {
      this._MoveTo(all_lines, false);
      return void 0;
    };


    /*------------------------ Private Methods ------------------------------- */

    JQConsole.prototype._CheckInputQueue = function() {
      if (this.input_queue.length) {
        return this.input_queue.shift()();
      }
    };

    JQConsole.prototype._InitPrompt = function() {
      this.$prompt = $(spanHtml(CLASS_INPUT)).appendTo(this.$console);
      this.$prompt_before = $(EMPTY_SPAN).appendTo(this.$prompt);
      this.$prompt_current = $(EMPTY_SPAN).appendTo(this.$prompt);
      this.$prompt_after = $(EMPTY_SPAN).appendTo(this.$prompt);
      this.$prompt_label = $(EMPTY_SPAN).appendTo(this.$prompt_current);
      this.$prompt_left = $(EMPTY_SPAN).appendTo(this.$prompt_current);
      this.$prompt_right = $(EMPTY_SPAN).appendTo(this.$prompt_current);
      this.$prompt_right.css({
        position: 'relative'
      });
      this.$prompt_cursor = $(spanHtml(CLASS_CURSOR, '&nbsp;'));
      this.$prompt_cursor.insertBefore(this.$prompt_right);
      this.$prompt_cursor.css({
        color: 'transparent',
        display: 'inline',
        zIndex: 0
      });
      if (!this.isMobile) {
        return this.$prompt_cursor.css('position', 'absolute');
      }
    };

    JQConsole.prototype._SetupEvents = function() {
      var cb, paste_event;
      if (this.isMobile) {
        this.$console.click((function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.Focus();
          };
        })(this));
      } else {
        this.$console.mouseup((function(_this) {
          return function(e) {
            var fn;
            if (e.which === 2) {
              return _this.Focus();
            } else {
              fn = function() {
                if (!window.getSelection().toString()) {
                  e.preventDefault();
                  return _this.Focus();
                }
              };
              return setTimeout(fn, 0);
            }
          };
        })(this));
      }
      this.$input_source.focus((function(_this) {
        return function() {
          var hideTextInput, removeClass;
          _this._ScrollToEnd();
          _this.$console_focused = true;
          _this.$console.removeClass(CLASS_BLURRED);
          removeClass = function() {
            if (_this.$console_focused) {
              return _this.$console.removeClass(CLASS_BLURRED);
            }
          };
          setTimeout(removeClass, 100);
          hideTextInput = function() {
            if (_this.isIos && _this.$console_focused) {
              return _this.$input_source.hide();
            }
          };
          return setTimeout(hideTextInput, 500);
        };
      })(this));
      this.$input_source.blur((function(_this) {
        return function() {
          var addClass;
          _this.$console_focused = false;
          if (_this.isIos) {
            _this.$input_source.show();
          }
          addClass = function() {
            if (!_this.$console_focused) {
              return _this.$console.addClass(CLASS_BLURRED);
            }
          };
          return setTimeout(addClass, 100);
        };
      })(this));
      paste_event = $.browser.opera ? 'input' : 'paste';
      this.$input_source.bind(paste_event, (function(_this) {
        return function() {
          var handlePaste;
          handlePaste = function() {
            if (_this.in_composition) {
              return;
            }
            _this._AppendPromptText(_this.$input_source.val());
            _this.$input_source.val('');
            return _this.Focus();
          };
          return setTimeout(handlePaste, 0);
        };
      })(this));
      this.$input_source.keypress(this._HandleChar);
      this.$input_source.keydown(this._HandleKey);
      this.$input_source.keydown(this._CheckComposition);
      if ($.browser.mozilla != null) {
        this.$input_source.bind('compositionstart', this._StartComposition);
        this.$input_source.bind('compositionend', this._EndCommposition);
        this.$input_source.bind('text', this._UpdateComposition);
      }
      if ($.browser.opera != null) {
        cb = (function(_this) {
          return function() {
            if (_this.in_composition) {
              return;
            }
            if (_this.$input_source.val().length) {
              return _this._StartComposition();
            }
          };
        })(this);
        return setInterval(cb, 200);
      }
    };

    JQConsole.prototype._HandleChar = function(event) {
      var char_code;
      if (this.state === STATE_OUTPUT || event.metaKey || event.ctrlKey) {
        return true;
      }
      char_code = event.which;
      if (char_code === 8 || char_code === 9 || char_code === 13) {
        return false;
      }
      if ($.browser.mozilla) {
        if (event.keyCode || event.altKey) {
          return true;
        }
      }
      if ($.browser.opera) {
        if (event.altKey) {
          return true;
        }
      }
      this.$prompt_left.text(this.$prompt_left.text() + String.fromCharCode(char_code));
      this._ScrollToEnd();
      return false;
    };

    JQConsole.prototype._HandleKey = function(event) {
      var key;
      if (this.state === STATE_OUTPUT) {
        return true;
      }
      key = event.keyCode || event.which;
      setTimeout($.proxy(this._CheckMatchings, this), 0);
      if (event.altKey) {
        return true;
      } else if (event.ctrlKey || event.metaKey) {
        return this._HandleCtrlShortcut(key);
      } else if (event.shiftKey) {
        switch (key) {
          case KEY_ENTER:
            this._HandleEnter(true);
            break;
          case KEY_TAB:
            this._Unindent();
            break;
          case KEY_UP:
            this._MoveUp();
            break;
          case KEY_DOWN:
            this._MoveDown();
            break;
          case KEY_PAGE_UP:
            this._ScrollUp();
            break;
          case KEY_PAGE_DOWN:
            this._ScrollDown();
            break;
          default:
            return true;
        }
        return false;
      } else {
        switch (key) {
          case KEY_ENTER:
            this._HandleEnter(false);
            break;
          case KEY_TAB:
            this._Indent();
            break;
          case KEY_DELETE:
            this._Delete(false);
            break;
          case KEY_BACKSPACE:
            this._Backspace(false);
            break;
          case KEY_LEFT:
            this._MoveLeft(false);
            break;
          case KEY_RIGHT:
            this._MoveRight(false);
            break;
          case KEY_UP:
            this._HistoryPrevious();
            break;
          case KEY_DOWN:
            this._HistoryNext();
            break;
          case KEY_HOME:
            this.MoveToStart(false);
            break;
          case KEY_END:
            this.MoveToEnd(false);
            break;
          case KEY_PAGE_UP:
            this._ScrollUp();
            break;
          case KEY_PAGE_DOWN:
            this._ScrollDown();
            break;
          default:
            return true;
        }
        return false;
      }
    };

    JQConsole.prototype._HandleCtrlShortcut = function(key) {
      var handler, _i, _len, _ref;
      switch (key) {
        case KEY_DELETE:
          this._Delete(true);
          break;
        case KEY_BACKSPACE:
          this._Backspace(true);
          break;
        case KEY_LEFT:
          this._MoveLeft(true);
          break;
        case KEY_RIGHT:
          this._MoveRight(true);
          break;
        case KEY_UP:
          this._MoveUp();
          break;
        case KEY_DOWN:
          this._MoveDown();
          break;
        case KEY_END:
          this.MoveToEnd(true);
          break;
        case KEY_HOME:
          this.MoveToStart(true);
          break;
        default:
          if (key in this.shortcuts) {
            _ref = this.shortcuts[key];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              handler = _ref[_i];
              handler.call(this);
            }
            return false;
          } else {
            return true;
          }
      }
      return false;
    };

    JQConsole.prototype._HandleEnter = function(shift) {
      var continuation, text;
      if (shift) {
        return this._InsertNewLine(true);
      } else {
        text = this.GetPromptText();
        continuation = (function(_this) {
          return function(indent) {
            var callback, cls_suffix, _, _i, _ref, _results;
            if (indent !== false) {
              _this.MoveToEnd(true);
              _this._InsertNewLine(true);
              _results = [];
              for (_ = _i = 0, _ref = Math.abs(indent); 0 <= _ref ? _i < _ref : _i > _ref; _ = 0 <= _ref ? ++_i : --_i) {
                if (indent > 0) {
                  _results.push(_this._Indent());
                } else {
                  _results.push(_this._Unindent());
                }
              }
              return _results;
            } else {
              cls_suffix = _this.state === STATE_INPUT ? 'input' : 'prompt';
              _this.Write(_this.GetPromptText(true) + NEWLINE, ("" + CLASS_PREFIX + "old-") + cls_suffix);
              _this.ClearPromptText(true);
              if (_this.history_active) {
                if (!_this.history.length || _this.history[_this.history.length - 1] !== text) {
                  _this.history.push(text);
                }
                _this.history_index = _this.history.length;
              }
              _this.state = STATE_OUTPUT;
              callback = _this.input_callback;
              _this.input_callback = null;
              if (callback) {
                callback(text);
              }
              return _this._CheckInputQueue();
            }
          };
        })(this);
        if (this.multiline_callback) {
          if (this.async_multiline) {
            return this.multiline_callback(text, continuation);
          } else {
            return continuation(this.multiline_callback(text));
          }
        } else {
          return continuation(false);
        }
      }
    };

    JQConsole.prototype._GetDirectionals = function(back) {
      var $prompt_opposite, $prompt_rel_opposite, $prompt_relative, $prompt_which, MoveDirection, MoveToLimit, where_append, which_end;
      $prompt_which = back ? this.$prompt_left : this.$prompt_right;
      $prompt_opposite = back ? this.$prompt_right : this.$prompt_left;
      $prompt_relative = back ? this.$prompt_before : this.$prompt_after;
      $prompt_rel_opposite = back ? this.$prompt_after : this.$prompt_before;
      MoveToLimit = back ? $.proxy(this.MoveToStart, this) : $.proxy(this.MoveToEnd, this);
      MoveDirection = back ? $.proxy(this._MoveLeft, this) : $.proxy(this._MoveRight, this);
      which_end = back ? 'last' : 'first';
      where_append = back ? 'prependTo' : 'appendTo';
      return {
        $prompt_which: $prompt_which,
        $prompt_opposite: $prompt_opposite,
        $prompt_relative: $prompt_relative,
        $prompt_rel_opposite: $prompt_rel_opposite,
        MoveToLimit: MoveToLimit,
        MoveDirection: MoveDirection,
        which_end: which_end,
        where_append: where_append
      };
    };

    JQConsole.prototype._VerticalMove = function(up) {
      var $prompt_opposite, $prompt_relative, $prompt_which, MoveDirection, MoveToLimit, pos, text, _ref;
      _ref = this._GetDirectionals(up), $prompt_which = _ref.$prompt_which, $prompt_opposite = _ref.$prompt_opposite, $prompt_relative = _ref.$prompt_relative, MoveToLimit = _ref.MoveToLimit, MoveDirection = _ref.MoveDirection;
      if ($prompt_relative.is(EMPTY_SELECTOR)) {
        return;
      }
      pos = this.$prompt_left.text().length;
      MoveToLimit();
      MoveDirection();
      text = $prompt_which.text();
      $prompt_opposite.text(up ? text.slice(pos) : text.slice(0, pos));
      return $prompt_which.text(up ? text.slice(0, pos) : text.slice(pos));
    };

    JQConsole.prototype._MoveUp = function() {
      return this._VerticalMove(true);
    };

    JQConsole.prototype._MoveDown = function() {
      return this._VerticalMove();
    };

    JQConsole.prototype._HorizontalMove = function(whole_word, back) {
      var $opposite_line, $prompt_opposite, $prompt_rel_opposite, $prompt_relative, $prompt_which, $which_line, len, regexp, text, tmp, where_append, which_end, word, _ref;
      _ref = this._GetDirectionals(back), $prompt_which = _ref.$prompt_which, $prompt_opposite = _ref.$prompt_opposite, $prompt_relative = _ref.$prompt_relative, $prompt_rel_opposite = _ref.$prompt_rel_opposite, which_end = _ref.which_end, where_append = _ref.where_append;
      regexp = back ? /\w*\W*$/ : /^\w*\W*/;
      text = $prompt_which.text();
      if (text) {
        if (whole_word) {
          word = text.match(regexp);
          if (!word) {
            return;
          }
          word = word[0];
          tmp = $prompt_opposite.text();
          $prompt_opposite.text(back ? word + tmp : tmp + word);
          len = word.length;
          return $prompt_which.text(back ? text.slice(0, -len) : text.slice(len));
        } else {
          tmp = $prompt_opposite.text();
          $prompt_opposite.text(back ? text.slice(-1) + tmp : tmp + text[0]);
          return $prompt_which.text(back ? text.slice(0, -1) : text.slice(1));
        }
      } else if (!$prompt_relative.is(EMPTY_SELECTOR)) {
        $which_line = $(EMPTY_SPAN)[where_append]($prompt_rel_opposite);
        $which_line.append($(EMPTY_SPAN).text(this.$prompt_label.text()));
        $which_line.append($(EMPTY_SPAN).text($prompt_opposite.text()));
        $opposite_line = $prompt_relative.children()[which_end]().detach();
        this.$prompt_label.text($opposite_line.children().first().text());
        $prompt_which.text($opposite_line.children().last().text());
        return $prompt_opposite.text('');
      }
    };

    JQConsole.prototype._MoveLeft = function(whole_word) {
      return this._HorizontalMove(whole_word, true);
    };

    JQConsole.prototype._MoveRight = function(whole_word) {
      return this._HorizontalMove(whole_word);
    };

    JQConsole.prototype._MoveTo = function(all_lines, back) {
      var $prompt_opposite, $prompt_relative, $prompt_which, MoveDirection, MoveToLimit, _ref, _results;
      _ref = this._GetDirectionals(back), $prompt_which = _ref.$prompt_which, $prompt_opposite = _ref.$prompt_opposite, $prompt_relative = _ref.$prompt_relative, MoveToLimit = _ref.MoveToLimit, MoveDirection = _ref.MoveDirection;
      if (all_lines) {
        _results = [];
        while (!($prompt_relative.is(EMPTY_SELECTOR) && $prompt_which.text() === '')) {
          MoveToLimit(false);
          _results.push(MoveDirection(false));
        }
        return _results;
      } else {
        $prompt_opposite.text(this.$prompt_left.text() + this.$prompt_right.text());
        return $prompt_which.text('');
      }
    };

    JQConsole.prototype._Delete = function(whole_word) {
      var $lower_line, text, word;
      text = this.$prompt_right.text();
      if (text) {
        if (whole_word) {
          word = text.match(/^\w*\W*/);
          if (!word) {
            return;
          }
          word = word[0];
          return this.$prompt_right.text(text.slice(word.length));
        } else {
          return this.$prompt_right.text(text.slice(1));
        }
      } else if (!this.$prompt_after.is(EMPTY_SELECTOR)) {
        $lower_line = this.$prompt_after.children().first().detach();
        return this.$prompt_right.text($lower_line.children().last().text());
      }
    };

    JQConsole.prototype._Backspace = function(whole_word) {
      var $upper_line, text, word;
      setTimeout($.proxy(this._ScrollToEnd, this), 0);
      text = this.$prompt_left.text();
      if (text) {
        if (whole_word) {
          word = text.match(/\w*\W*$/);
          if (!word) {
            return;
          }
          word = word[0];
          return this.$prompt_left.text(text.slice(0, -word.length));
        } else {
          return this.$prompt_left.text(text.slice(0, -1));
        }
      } else if (!this.$prompt_before.is(EMPTY_SELECTOR)) {
        $upper_line = this.$prompt_before.children().last().detach();
        this.$prompt_label.text($upper_line.children().first().text());
        return this.$prompt_left.text($upper_line.children().last().text());
      }
    };

    JQConsole.prototype._Indent = function() {
      var _;
      return this.$prompt_left.prepend(((function() {
        var _i, _ref, _results;
        _results = [];
        for (_ = _i = 1, _ref = this.indent_width; 1 <= _ref ? _i <= _ref : _i >= _ref; _ = 1 <= _ref ? ++_i : --_i) {
          _results.push(' ');
        }
        return _results;
      }).call(this)).join(''));
    };

    JQConsole.prototype._Unindent = function() {
      var line_text, _, _i, _ref, _results;
      line_text = this.$prompt_left.text() + this.$prompt_right.text();
      _results = [];
      for (_ = _i = 1, _ref = this.indent_width; 1 <= _ref ? _i <= _ref : _i >= _ref; _ = 1 <= _ref ? ++_i : --_i) {
        if (!/^ /.test(line_text)) {
          break;
        }
        if (this.$prompt_left.text()) {
          this.$prompt_left.text(this.$prompt_left.text().slice(1));
        } else {
          this.$prompt_right.text(this.$prompt_right.text().slice(1));
        }
        _results.push(line_text = line_text.slice(1));
      }
      return _results;
    };

    JQConsole.prototype._InsertNewLine = function(indent) {
      var $old_line, match, old_prompt;
      if (indent == null) {
        indent = false;
      }
      old_prompt = this._SelectPromptLabel(!this.$prompt_before.is(EMPTY_SELECTOR));
      $old_line = $(EMPTY_SPAN).appendTo(this.$prompt_before);
      $old_line.append($(EMPTY_SPAN).text(old_prompt));
      $old_line.append($(EMPTY_SPAN).text(this.$prompt_left.text()));
      this.$prompt_label.text(this._SelectPromptLabel(true));
      if (indent && (match = this.$prompt_left.text().match(/^\s+/))) {
        this.$prompt_left.text(match[0]);
      } else {
        this.$prompt_left.text('');
      }
      return this._ScrollToEnd();
    };

    JQConsole.prototype._AppendPromptText = function(text) {
      var line, lines, _i, _len, _ref, _results;
      lines = text.split(NEWLINE);
      this.$prompt_left.text(this.$prompt_left.text() + lines[0]);
      _ref = lines.slice(1);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        this._InsertNewLine();
        _results.push(this.$prompt_left.text(line));
      }
      return _results;
    };

    JQConsole.prototype._ScrollUp = function() {
      var target;
      target = this.$console[0].scrollTop - this.$console.height();
      return this.$console.stop().animate({
        scrollTop: target
      }, 'fast');
    };

    JQConsole.prototype._ScrollDown = function() {
      var target;
      target = this.$console[0].scrollTop + this.$console.height();
      return this.$console.stop().animate({
        scrollTop: target
      }, 'fast');
    };

    JQConsole.prototype._ScrollToEnd = function() {
      var cont;
      this.$console.scrollTop(this.$console[0].scrollHeight);
      cont = (function(_this) {
        return function() {
          var doc_height, line_height, optimal_pos, pos, rel_pos, screen_left, screen_top;
          line_height = _this.$prompt_cursor.height();
          screen_top = _this.$window.scrollTop();
          screen_left = _this.$window.scrollLeft();
          doc_height = document.documentElement.clientHeight;
          pos = _this.$prompt_cursor.offset();
          rel_pos = _this.$prompt_cursor.position();
          _this.$input_container.css({
            left: rel_pos.left,
            top: rel_pos.top
          });
          optimal_pos = pos.top - (2 * line_height);
          if (_this.isMobile && (typeof orientation !== "undefined" && orientation !== null)) {
            if (screen_top < pos.top || screen_top > pos.top) {
              return _this.$window.scrollTop(optimal_pos);
            }
          } else {
            if (screen_top + doc_height < pos.top) {
              return _this.$window.scrollTop(pos.top - doc_height + line_height);
            } else if (screen_top > optimal_pos) {
              return _this.$window.scrollTop(pos.top);
            }
          }
        };
      })(this);
      return setTimeout(cont, 0);
    };

    JQConsole.prototype._SelectPromptLabel = function(continuation) {
      if (this.state === STATE_PROMPT) {
        if (continuation) {
          return ' \n' + this.prompt_label_continue;
        } else {
          return this.prompt_label_main;
        }
      } else {
        if (continuation) {
          return '\n ';
        } else {
          return ' ';
        }
      }
    };

    JQConsole.prototype._outerHTML = function($elem) {
      if (document.body.outerHTML) {
        return $elem.get(0).outerHTML;
      } else {
        return $(EMPTY_DIV).append($elem.eq(0).clone()).html();
      }
    };

    JQConsole.prototype._Wrap = function($elem, index, cls) {
      var html, text;
      text = $elem.html();
      html = text.slice(0, index) + spanHtml(cls, text[index]) + text.slice(index + 1);
      return $elem.html(html);
    };

    JQConsole.prototype._WalkCharacters = function(text, char, opposing_char, current_count, back) {
      var ch, index, read_char;
      index = back ? text.length : 0;
      text = text.split('');
      read_char = function() {
        var ret, _i, _ref, _ref1;
        if (back) {
          _ref = text, text = 2 <= _ref.length ? __slice.call(_ref, 0, _i = _ref.length - 1) : (_i = 0, []), ret = _ref[_i++];
        } else {
          _ref1 = text, ret = _ref1[0], text = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
        }
        if (ret) {
          index = index + (back ? -1 : +1);
        }
        return ret;
      };
      while (ch = read_char()) {
        if (ch === char) {
          current_count++;
        } else if (ch === opposing_char) {
          current_count--;
        }
        if (current_count === 0) {
          return {
            index: index,
            current_count: current_count
          };
        }
      }
      return {
        index: -1,
        current_count: current_count
      };
    };

    JQConsole.prototype._ProcessMatch = function(config, back, before_char) {
      var $collection, $prompt_relative, $prompt_which, char, current_count, found, index, opposing_char, text, _ref, _ref1, _ref2;
      _ref = back ? [config['closing_char'], config['opening_char']] : [config['opening_char'], config['closing_char']], char = _ref[0], opposing_char = _ref[1];
      _ref1 = this._GetDirectionals(back), $prompt_which = _ref1.$prompt_which, $prompt_relative = _ref1.$prompt_relative;
      current_count = 1;
      found = false;
      text = $prompt_which.html();
      if (!back) {
        text = text.slice(1);
      }
      if (before_char && back) {
        text = text.slice(0, -1);
      }
      _ref2 = this._WalkCharacters(text, char, opposing_char, current_count, back), index = _ref2.index, current_count = _ref2.current_count;
      if (index > -1) {
        this._Wrap($prompt_which, index, config.cls);
        found = true;
      } else {
        $collection = $prompt_relative.children();
        $collection = back ? Array.prototype.reverse.call($collection) : $collection;
        $collection.each((function(_this) {
          return function(i, elem) {
            var $elem, _ref3;
            $elem = $(elem).children().last();
            text = $elem.html();
            _ref3 = _this._WalkCharacters(text, char, opposing_char, current_count, back), index = _ref3.index, current_count = _ref3.current_count;
            if (index > -1) {
              if (!back) {
                index--;
              }
              _this._Wrap($elem, index, config.cls);
              found = true;
              return false;
            }
          };
        })(this));
      }
      return found;
    };

    JQConsole.prototype._CheckMatchings = function(before_char) {
      var cls, config, current_char, found, _i, _len, _ref;
      current_char = before_char ? this.$prompt_left.text().slice(this.$prompt_left.text().length - 1) : this.$prompt_right.text()[0];
      _ref = this.matchings.clss;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cls = _ref[_i];
        $('.' + cls, this.$console).contents().unwrap();
      }
      if (config = this.matchings.closings[current_char]) {
        found = this._ProcessMatch(config, true, before_char);
      } else if (config = this.matchings.openings[current_char]) {
        found = this._ProcessMatch(config, false, before_char);
      } else if (!before_char) {
        this._CheckMatchings(true);
      }
      if (before_char) {
        if (found) {
          return this._Wrap(this.$prompt_left, this.$prompt_left.html().length - 1, config.cls);
        }
      } else {
        if (found) {
          return this._Wrap(this.$prompt_right, 0, config.cls);
        }
      }
    };

    JQConsole.prototype._HistoryPrevious = function() {
      if (!this.history_active) {
        return;
      }
      if (this.history_index <= 0) {
        return;
      }
      if (this.history_index === this.history.length) {
        this.history_new = this.GetPromptText();
      }
      return this.SetPromptText(this.history[--this.history_index]);
    };

    JQConsole.prototype._HistoryNext = function() {
      if (!this.history_active) {
        return;
      }
      if (this.history_index >= this.history.length) {
        return;
      }
      if (this.history_index === this.history.length - 1) {
        this.history_index++;
        return this.SetPromptText(this.history_new);
      } else {
        return this.SetPromptText(this.history[++this.history_index]);
      }
    };

    JQConsole.prototype._CheckComposition = function(e) {
      var key;
      key = e.keyCode || e.which;
      if (($.browser.opera != null) && this.in_composition) {
        this._UpdateComposition();
      }
      if (key === 229) {
        if (this.in_composition) {
          return this._UpdateComposition();
        } else {
          return this._StartComposition();
        }
      }
    };

    JQConsole.prototype._StartComposition = function() {
      this.$input_source.bind(E_KEYPRESS, this._EndComposition);
      this.in_composition = true;
      this._ShowComposition();
      return setTimeout(this._UpdateComposition, 0);
    };

    JQConsole.prototype._EndComposition = function() {
      this.$input_source.unbind(E_KEYPRESS, this._EndComposition);
      this.in_composition = false;
      this._HideComposition();
      return this.$input_source.val('');
    };

    JQConsole.prototype._UpdateComposition = function(e) {
      var cb;
      cb = (function(_this) {
        return function() {
          if (!_this.in_composition) {
            return;
          }
          return _this.$composition.text(_this.$input_source.val());
        };
      })(this);
      return setTimeout(cb, 0);
    };

    JQConsole.prototype._ShowComposition = function() {
      this.$composition.css('height', this.$prompt_cursor.height());
      this.$composition.empty();
      return this.$composition.appendTo(this.$prompt_left);
    };

    JQConsole.prototype._HideComposition = function() {
      return this.$composition.detach();
    };

    return JQConsole;

  })();

  $.fn.jqconsole = function(header, prompt_main, prompt_continue) {
    return new JQConsole(this, header, prompt_main, prompt_continue);
  };

  $.fn.jqconsole.JQConsole = JQConsole;

  $.fn.jqconsole.Ansi = Ansi;

}).call(this);
