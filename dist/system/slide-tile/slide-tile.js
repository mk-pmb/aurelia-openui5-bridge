'use strict';

System.register(['aurelia-templating', 'aurelia-dependency-injection', '../common/attributeManager', '../common/attributes'], function (_export, _context) {
  "use strict";

  var bindable, customElement, noView, inject, AttributeManager, getBooleanFromAttributeValue, _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, Ui5SlideTile;

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

  return {
    setters: [function (_aureliaTemplating) {
      bindable = _aureliaTemplating.bindable;
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_commonAttributeManager) {
      AttributeManager = _commonAttributeManager.AttributeManager;
    }, function (_commonAttributes) {
      getBooleanFromAttributeValue = _commonAttributes.getBooleanFromAttributeValue;
    }],
    execute: function () {
      _export('Ui5SlideTile', Ui5SlideTile = (_dec = customElement('ui5-slide-tile'), _dec2 = inject(Element), _dec3 = bindable(), _dec4 = bindable(), _dec(_class = _dec2(_class = (_class2 = function () {
        function Ui5SlideTile(element) {
          _classCallCheck(this, Ui5SlideTile);

          this._container = null;
          this._parent = null;

          _initDefineProp(this, 'displayTime', _descriptor, this);

          _initDefineProp(this, 'transitionTime', _descriptor2, this);

          this.element = element;
        }

        Ui5SlideTile.prototype.addChild = function addChild(child, elem) {
          var path = jQuery.makeArray($(elem).parentsUntil(this.element));
          if (path[0].localName == 'tile') this._container.addTile(child);
        };

        Ui5SlideTile.prototype.removeChild = function removeChild(child, elem) {
          var path = jQuery.makeArray($(elem).parentsUntil(this.element));
          if (path[0].localName == 'tile') this._container.removeTile(child);
        };

        Ui5SlideTile.prototype.attached = function attached() {
          this._container = new sap.m.SlideTile({
            displayTime: this.displayTime,
            transitionTime: this.transitionTime
          });
          this._container.addStyleClass('sapUiTinyMarginTop');
          this._container.addStyleClass('sapUiTinyMarginBegin');
          this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
          this._parent.addChild(this._container, this.element);
        };

        Ui5SlideTile.prototype.detached = function detached() {
          this._parent.removeChild(this._container, this.element);
        };

        Ui5SlideTile.prototype.displayTimeChanged = function displayTimeChanged(newValue) {
          if (this._container != null) {
            this._container.setDisplayTime(newValue);
          }
        };

        Ui5SlideTile.prototype.transitionTimeChanged = function transitionTimeChanged(newValue) {
          if (this._container != null) {
            this._container.setTransitionTime(newValue);
          }
        };

        return Ui5SlideTile;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'displayTime', [_dec3], {
        enumerable: true,
        initializer: function initializer() {
          return 5000;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'transitionTime', [_dec4], {
        enumerable: true,
        initializer: function initializer() {
          return 500;
        }
      })), _class2)) || _class) || _class));

      _export('Ui5SlideTile', Ui5SlideTile);
    }
  };
});