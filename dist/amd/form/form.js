define(['exports', 'aurelia-templating', 'aurelia-dependency-injection', '../common/attributeManager', '../common/attributes', 'aurelia-framework'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _attributeManager, _attributes, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Ui5Form = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var Ui5Form = exports.Ui5Form = (_dec = (0, _aureliaTemplating.customElement)('ui5-form'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element), _dec3 = (0, _aureliaTemplating.bindable)(), _dec4 = (0, _aureliaTemplating.bindable)(), _dec5 = (0, _aureliaTemplating.bindable)(), _dec6 = (0, _aureliaTemplating.bindable)(), _dec7 = (0, _aureliaFramework.computedFrom)('_form'), _dec(_class = _dec2(_class = (_class2 = function () {
    function Ui5Form(element) {
      _classCallCheck(this, Ui5Form);

      _initDefineProp(this, 'ui5Id', _descriptor, this);

      _initDefineProp(this, 'width', _descriptor2, this);

      _initDefineProp(this, 'editable', _descriptor3, this);

      _initDefineProp(this, 'title', _descriptor4, this);

      this._form = null;
      this._parent = null;
      this._relation = null;

      this.element = element;
    }

    Ui5Form.prototype.addChild = function addChild(child, elem) {
      var path = jQuery.makeArray($(elem).parentsUntil(this.element));
      for (var _iterator = path, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        if (_isArray) {
          if (_i >= _iterator.length) break;
          elem = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          elem = _i.value;
        }

        if (elem.localName == 'toolbar') {
          this._form.setToolbar(child);
          return elem.localName;
        }
        if (elem.localName == 'titleElement') {
          this._form.setTitle(child);
          return elem.localName;
        }
        if (elem.localName == 'layout') {
          this._form.setLayout(child);
          return elem.localName;
        }
        if (elem.localName == 'container') {
          this._form.addFormContainer(child);
          return elem.localName;
        }
      }
    };

    Ui5Form.prototype.attached = function attached() {
      var attributeManager = new _attributeManager.AttributeManager(this.element);
      var params = {
        editable: (0, _attributes.getBooleanFromAttributeValue)(this.editable),
        width: this.width,
        title: this.title
      };
      if (this.ui5Id) this._form = new sap.ui.layout.form.Form(this.ui5Id, params);else this._form = new sap.ui.layout.form.Form(params);
      this.element.removeAttribute('ui5-container');
      if ($(this.element).closest("[ui5-container]").length > 0) {
        var prevSibling = null;
        if (this.element.previousElementSibling) prevSibling = this.element.previousElementSibling.au.controller.viewModel.UIElement;
        this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
        this._relation = this._parent.addChild(this._form, this.element, prevSibling);
        attributeManager.addAttributes({ "ui5-container": '' });
      } else {
        this._form.placeAt(this.element.parentElement);
        attributeManager.addClasses("ui5-hide");
      }
    };

    Ui5Form.prototype.removeChildByRelation = function removeChildByRelation(child, relation) {
      if (relation === 'container' && this._form && child) {
        this._form.removeFormContainer(child);
      }
    };

    Ui5Form.prototype.detached = function detached() {
      if (this._parent && this._parent.removeChildByRelation) this._parent.removeChildByRelation(this._form, this._relation);
      var attributeManager = new _attributeManager.AttributeManager(this.element);
      attributeManager.removeAttributes(["ui5-container"]);
      this._form.destroy();
    };

    Ui5Form.prototype.editableChanged = function editableChanged(newValue) {
      if (this._form !== null) {
        this._form.setEditable((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    Ui5Form.prototype.widthChanged = function widthChanged(newValue) {
      if (this._form !== null) {
        this._form.setWidth(newValue);
      }
    };

    Ui5Form.prototype.titleChanged = function titleChanged(newValue) {
      if (this._form !== null) {
        this._form.setTitle(newValue);
      }
    };

    _createClass(Ui5Form, [{
      key: 'UIElement',
      get: function get() {
        return this._form;
      }
    }]);

    return Ui5Form;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'ui5Id', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'width', [_dec4], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'editable', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'title', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, 'UIElement', [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'UIElement'), _class2.prototype)), _class2)) || _class) || _class);
});