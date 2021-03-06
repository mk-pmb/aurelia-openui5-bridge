'use strict';

System.register(['aurelia-templating', 'aurelia-dependency-injection', '../common/attributeManager', '../common/attributes', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, customElement, noView, inject, AttributeManager, getBooleanFromAttributeValue, computedFrom, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, Ui5IconTabFilter;

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
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
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

      _export('Ui5IconTabFilter', Ui5IconTabFilter = (_dec = customElement('ui5-icon-tab-filter'), _dec2 = inject(Element), _dec3 = bindable(), _dec4 = bindable(), _dec5 = bindable(), _dec6 = computedFrom('_tab'), _dec(_class = _dec2(_class = (_class2 = function () {
        function Ui5IconTabFilter(element) {
          _classCallCheck(this, Ui5IconTabFilter);

          this._tab = null;
          this._parent = null;
          this._relation = null;

          _initDefineProp(this, 'text', _descriptor, this);

          _initDefineProp(this, 'tabKey', _descriptor2, this);

          _initDefineProp(this, 'design', _descriptor3, this);

          this.element = element;
        }

        Ui5IconTabFilter.prototype.defaultFunc = function defaultFunc(event) {};

        Ui5IconTabFilter.prototype.addChild = function addChild(child, elem, afterElement) {

          var path = jQuery.makeArray($(elem).parentsUntil(this.element));
          var prevChild = null;
          for (var _iterator = path, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var childElem = _ref;

            if (childElem.localName == 'content') {
              var _index = null;
              if (afterElement) _index = this._tab.indexOfContent(afterElement);
              if (_index) this._tab.insertContent(child, _index + 1);else this._tab.addContent(child);
              return childElem.localName;
            }
            prevChild = childElem;
          }
        };

        Ui5IconTabFilter.prototype.removeChild = function removeChild(child, elem) {
          var path = jQuery.makeArray($(elem).parentsUntil(this.element));
          for (var _iterator2 = path, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var childElem = _ref2;

            if (childElem.localName == 'content') {
              this._tab.removeContent(child);
              break;
            }
          }
        };

        Ui5IconTabFilter.prototype.removeChildByRelation = function removeChildByRelation(child, relation) {
          if (relation === 'content' && this._tab && child) {
            this._tab.removeContent(child);
          }
        };

        Ui5IconTabFilter.prototype.attached = function attached() {
          var attributeManager = new AttributeManager(this.element);
          this._tab = new sap.m.IconTabFilter({
            text: this.text,
            key: this.tabKey,
            design: this.design
          });

          if ($(this.element).closest("[ui5-container]").length > 0) {
            this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
            this._relation = this._parent.addChild(this._tab, this.element);
            attributeManager.addAttributes({ "ui5-container": '' });
          } else {
            this._tab.placeAt(this.element.parentElement);
            attributeManager.addAttributes({ "ui5-container": '' });
            attributeManager.addClasses("ui5-hide");
          }
        };

        Ui5IconTabFilter.prototype.detached = function detached() {
          if (this._parent) {
            this._parent.removeChildByRelation(this._tab, this._relation);
          } else {
            this._tab.destroy();
          }
        };

        Ui5IconTabFilter.prototype.tabKeyChanged = function tabKeyChanged(newValue) {
          if (this._tab !== null) {
            this._tab.setKey(newValue);
          }
        };

        Ui5IconTabFilter.prototype.textChanged = function textChanged(newValue) {
          if (this._tab !== null) {
            this._tab.setText(newValue);
          }
        };

        Ui5IconTabFilter.prototype.designChanged = function designChanged(newValue) {
          if (this._tab !== null) {
            this._tab.setDesign(newValue);
          }
        };

        _createClass(Ui5IconTabFilter, [{
          key: 'UIElement',
          get: function get() {
            return this._tab;
          }
        }]);

        return Ui5IconTabFilter;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'text', [_dec3], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'tabKey', [_dec4], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'design', [_dec5], {
        enumerable: true,
        initializer: function initializer() {
          return 'Vertical';
        }
      }), _applyDecoratedDescriptor(_class2.prototype, 'UIElement', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'UIElement'), _class2.prototype)), _class2)) || _class) || _class));

      _export('Ui5IconTabFilter', Ui5IconTabFilter);
    }
  };
});
//# sourceMappingURL=../dist/dev/icon-tab-filter/icon-tab-filter.js.map
