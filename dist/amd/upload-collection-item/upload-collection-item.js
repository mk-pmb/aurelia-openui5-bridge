define(['exports', 'aurelia-templating', 'aurelia-dependency-injection', '../common/attributeManager', '../common/attributes'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _attributeManager, _attributes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Ui5UploadCollectionItem = undefined;

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

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

  var Ui5UploadCollectionItem = exports.Ui5UploadCollectionItem = (_dec = (0, _aureliaTemplating.customElement)('ui5-upload-collection-item'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element), _dec3 = (0, _aureliaTemplating.bindable)(), _dec4 = (0, _aureliaTemplating.bindable)(), _dec5 = (0, _aureliaTemplating.bindable)(), _dec6 = (0, _aureliaTemplating.bindable)(), _dec7 = (0, _aureliaTemplating.bindable)(), _dec8 = (0, _aureliaTemplating.bindable)(), _dec9 = (0, _aureliaTemplating.bindable)(), _dec10 = (0, _aureliaTemplating.bindable)(), _dec11 = (0, _aureliaTemplating.bindable)(), _dec12 = (0, _aureliaTemplating.bindable)(), _dec13 = (0, _aureliaTemplating.bindable)(), _dec14 = (0, _aureliaTemplating.bindable)(), _dec15 = (0, _aureliaTemplating.bindable)(), _dec16 = (0, _aureliaTemplating.bindable)(), _dec(_class = _dec2(_class = (_class2 = function () {
    function Ui5UploadCollectionItem(element) {
      _classCallCheck(this, Ui5UploadCollectionItem);

      _initDefineProp(this, 'contributor', _descriptor, this);

      _initDefineProp(this, 'documentId', _descriptor2, this);

      _initDefineProp(this, 'fileName', _descriptor3, this);

      _initDefineProp(this, 'fileSize', _descriptor4, this);

      _initDefineProp(this, 'enableEdit', _descriptor5, this);

      _initDefineProp(this, 'mimeType', _descriptor6, this);

      _initDefineProp(this, 'thumbnailUrl', _descriptor7, this);

      _initDefineProp(this, 'enableDelete', _descriptor8, this);

      _initDefineProp(this, 'uploadedDate', _descriptor9, this);

      _initDefineProp(this, 'visibleEdit', _descriptor10, this);

      _initDefineProp(this, 'url', _descriptor11, this);

      _initDefineProp(this, 'visibleDelete', _descriptor12, this);

      _initDefineProp(this, 'ariaLabelForPicture', _descriptor13, this);

      _initDefineProp(this, 'selected', _descriptor14, this);

      this._upload = null;
      this._parent = null;
      this._relation = null;


      this.element = element;
    }

    Ui5UploadCollectionItem.prototype.defaultFunc = function defaultFunc(event) {};

    Ui5UploadCollectionItem.prototype.addChild = function addChild(child, elem) {
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

        if (elem.localName == 'attributes') {
          this._upload.addAttribute(child);
          return elem.localName;
        } else if (elem.localName == 'statuses') {
          this._upload.addStatus(child);
          return elem.localName;
        } else if (elem.localName == 'markers') {
          this._upload.addMarker(child);
          return elem.localName;
        }
      }
    };

    Ui5UploadCollectionItem.prototype.removeChildByRelation = function removeChildByRelation(child, relation) {
      if (relation === 'attributes' && this._upload) {
        this._upload.removeAttribute(child);
      } else if (relation === 'statuses' && this._upload) {
        this._upload.removeStatus(null);
      } else if (relation === 'markers' && this._upload) {
        this._upload.removeMarker(null);
      }
    };

    Ui5UploadCollectionItem.prototype.attached = function attached() {
      var attributeManager = new _attributeManager.AttributeManager(this.element);
      this._upload = new sap.m.UploadCollectionItem({
        contributor: this.contributor,
        documentId: this.documentId,
        fileName: this.fileName,
        fileSize: this.fileSize,
        mimeType: this.mimeType,
        thumbnailUrl: this.thumbnailUrl,
        enableDelete: (0, _attributes.getBooleanFromAttributeValue)(this.enableDelete),
        uploadedDate: this.uploadedDate,
        visibleEdit: (0, _attributes.getBooleanFromAttributeValue)(this.visibleEdit),
        url: this.url,
        visibleDelete: (0, _attributes.getBooleanFromAttributeValue)(this.visibleDelete),
        ariaLabelForPicture: this.ariaLabelForPicture
      });

      if ($(this.element).closest("[ui5-container]").length > 0) {
        this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
        this._relation = this._parent.addChild(this._upload, this.element);
        attributeManager.addAttributes({ "ui5-container": '' });
      } else {
        this._upload.placeAt(this.element.parentElement);
        attributeManager.addAttributes({ "ui5-container": '' });
        attributeManager.addClasses("ui5-hide");
      }
    };

    Ui5UploadCollectionItem.prototype.detached = function detached() {
      if (this._parent && this._parent.removeChildByRelation) {
        this._parent.removeChildByRelation(this._upload, this._relation);
      } else {
        this._upload.destroy();
      }
    };

    Ui5UploadCollectionItem.prototype.contributorChanged = function contributorChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setContributor(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.documentIdChanged = function documentIdChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setDocumentId(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.fileSizeChanged = function fileSizeChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setFileSize(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.mimeTypeChanged = function mimeTypeChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setMimeType(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.thumbnailUrlChanged = function thumbnailUrlChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setThumbnailUrl(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.enableDeleteChanged = function enableDeleteChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setEnableDelete((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    Ui5UploadCollectionItem.prototype.uploadedDateChanged = function uploadedDateChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setUploadedDate((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    Ui5UploadCollectionItem.prototype.visibleEditChanged = function visibleEditChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setVisibleEdit((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    Ui5UploadCollectionItem.prototype.urlChanged = function urlChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setUrl(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.visibleDeleteChanged = function visibleDeleteChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setVisibleDelete((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    Ui5UploadCollectionItem.prototype.ariaLabelForPictureChanged = function ariaLabelForPictureChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setAriaLabelForPicture(newValue);
      }
    };

    Ui5UploadCollectionItem.prototype.selectedChanged = function selectedChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setSelected((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    Ui5UploadCollectionItem.prototype.terminationEnabledChanged = function terminationEnabledChanged(newValue) {
      if (this._upload !== null) {
        this._upload.setterminationEnabled((0, _attributes.getBooleanFromAttributeValue)(newValue));
      }
    };

    return Ui5UploadCollectionItem;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'contributor', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'documentId', [_dec4], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'fileName', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'fileSize', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'enableEdit', [_dec7], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'mimeType', [_dec8], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'thumbnailUrl', [_dec9], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'enableDelete', [_dec10], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'uploadedDate', [_dec11], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'visibleEdit', [_dec12], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'url', [_dec13], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'visibleDelete', [_dec14], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'ariaLabelForPicture', [_dec15], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_dec16], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});