'use strict';

System.register(['aurelia-templating', 'aurelia-dependency-injection', '../common/attributeManager', '../common/attributes'], function (_export, _context) {
    "use strict";

    var bindable, customElement, noView, inject, AttributeManager, getBooleanFromAttributeValue, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, Ui5DynamicPageHeader;

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
            _export('Ui5DynamicPageHeader', Ui5DynamicPageHeader = (_dec = customElement('ui5-dynamic-page-header'), _dec2 = inject(Element), _dec3 = bindable(), _dec(_class = _dec2(_class = (_class2 = function () {
                function Ui5DynamicPageHeader(element) {
                    _classCallCheck(this, Ui5DynamicPageHeader);

                    this._header = null;
                    this._parent = null;

                    _initDefineProp(this, 'pinnable', _descriptor, this);

                    this.element = element;
                }

                Ui5DynamicPageHeader.prototype.addChild = function addChild(child, elem) {
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

                        if (elem.localName == 'content') {
                            this._header.addContent(child);
                        }
                    }
                };

                Ui5DynamicPageHeader.prototype.removeChild = function removeChild(child, elem) {
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

                        if (elem.localName == 'content') {
                            this._header.removeContent(child);
                        }
                    }
                };

                Ui5DynamicPageHeader.prototype.removeChildByRelation = function removeChildByRelation(child, relation) {
                    if (relation == 'content') {
                        this._header.removeContent(child);
                    }
                };

                Ui5DynamicPageHeader.prototype.defaultPress = function defaultPress() {};

                Ui5DynamicPageHeader.prototype.attached = function attached() {
                    var attributeManager = new AttributeManager(this.element);

                    this._header = new sap.f.DynamicPageHeader({
                        pinnable: getBooleanFromAttributeValue(this.pinnable)
                    });
                    if ($(this.element).closest("[ui5-container]").length > 0) {
                        this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
                        this._parent.addChild(this._header, this.element);
                        attributeManager.addAttributes({ "ui5-container": '' });
                    }
                };

                Ui5DynamicPageHeader.prototype.detached = function detached() {
                    this._parent.removeChild(this._header, this.element);
                };

                Ui5DynamicPageHeader.prototype.pinnableChanged = function pinnableChanged(newValue) {
                    if (this._header !== null) {
                        this._header.setPinnable(getBooleanFromAttributeValue(newValue));
                    }
                };

                return Ui5DynamicPageHeader;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'pinnable', [_dec3], {
                enumerable: true,
                initializer: function initializer() {
                    return true;
                }
            })), _class2)) || _class) || _class));

            _export('Ui5DynamicPageHeader', Ui5DynamicPageHeader);
        }
    };
});
//# sourceMappingURL=../dist/dev/dynamic-page-header/dynamic-page-header.js.map
