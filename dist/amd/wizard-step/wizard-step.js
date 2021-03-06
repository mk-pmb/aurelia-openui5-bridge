define(['exports', 'aurelia-templating', 'aurelia-dependency-injection', '../common/attributeManager', '../common/attributes'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _attributeManager, _attributes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Ui5WizardStep = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

  var Ui5WizardStep = exports.Ui5WizardStep = (_dec = (0, _aureliaTemplating.customElement)('ui5-wizard-step'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
    function Ui5WizardStep(element) {
      _classCallCheck(this, Ui5WizardStep);

      this._step = null;

      _initDefineProp(this, 'nextStep', _descriptor, this);

      _initDefineProp(this, 'subsequentSteps', _descriptor2, this);

      _initDefineProp(this, 'title', _descriptor3, this);

      _initDefineProp(this, 'icon', _descriptor4, this);

      _initDefineProp(this, 'validated', _descriptor5, this);

      _initDefineProp(this, 'complete', _descriptor6, this);

      _initDefineProp(this, 'activate', _descriptor7, this);

      this._parent = null;

      this.element = element;
    }

    Ui5WizardStep.prototype.addChild = function addChild(child, elem) {
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

        if (elem.localName == 'step') {
          this._step.addContent(child);
          return elem.localName;
        }
      }
    };

    Ui5WizardStep.prototype.removeChild = function removeChild(child, elem) {
      var path = jQuery.makeArray($(elem).parentsUntil(this.element));
      for (var _iterator2 = path, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          elem = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          elem = _i2.value;
        }

        if (elem.localName == 'step') {
          this._step.removeContent(child);
          break;
        }
      }
    };

    Ui5WizardStep.prototype.removeChildByRelation = function removeChildByRelation(child, relation) {
      if (relation === 'step' && this._step && child) {
        this._step.removeContent(child);
      }
    };

    Ui5WizardStep.prototype.defaultFunc = function defaultFunc() {};

    Ui5WizardStep.prototype.attached = function attached() {
      var attributeManager = new _attributeManager.AttributeManager(this.element);
      this._step = new sap.m.WizardStep({
        title: this.title,
        icon: this.icon,
        validated: (0, _attributes.getBooleanFromAttributeValue)(this.validated),
        complete: this.complete,
        activate: this.activate
      });
      this._parent = this.element.closest("ui5-wizard").au.controller.viewModel;
      this._parent.addChild(this._step, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    };

    Ui5WizardStep.prototype.detached = function detached() {
      this._parent.removeChild(this._step, this.element);
    };

    return Ui5WizardStep;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'nextStep', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'subsequentSteps', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'title', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'icon', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'validated', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'complete', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return this.defaultFunc;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'activate', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return this.defaultFunc;
    }
  })), _class2)) || _class) || _class);
});