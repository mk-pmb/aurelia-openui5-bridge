import { bindable, customElement, noView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { AttributeManager } from '../common/attributeManager';
import { getBooleanFromAttributeValue } from '../common/attributes';

@customElement('ui5-button')
@inject(Element)
export class Ui5Button {
  @bindable() disabled = false;
  @bindable() floating = false;
  @bindable() large = false;
  @bindable() text = '';
  @bindable() press = null;
  @bindable() icon = null;
  @bindable() type = 'Default';
  @bindable() visible = true;
  @bindable() tooltip = null;
  @bindable() busy = false;
  @bindable() busyIndicatorDelay = 1000;
  _button = null;
  _parent = null;
  _relation = null;
  constructor(element) {
    this.attributeManager = new AttributeManager(element);
    this.element = element;
  }

  attached() {
    this._button = new sap.m.Button({
      text: this.text,
      type: this.type,
      icon: this.icon,
      enabled: !getBooleanFromAttributeValue(this.disabled),
      visible: getBooleanFromAttributeValue(this.visible),
      tooltip: this.tooltip,
      press: this.press != null ? this.press : this.defaultPress,
      busy: getBooleanFromAttributeValue(this.busy),
      busyIndicatorDelay: this.busyIndicatorDelay
    });

    if ($(this.element).closest("[ui5-container]").length > 0) {
      this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
      this._relation = this._parent.addChild(this._button, this.element);
    }
  }
  defaultPress() {

  }
  detached() {
    if (this._parent && this._parent.removeChildByRelation) {
      this._parent.removeChildByRelation(this._button, this._relation);
    }
  }
  typeChanged(newValue) {
    if (this._button !== null) {
      this._button.setType(newValue);
    }
  }
  disabledChanged(newValue) {
    if (this._button !== null) {
      this._button.setEnabled(!getBooleanFromAttributeValue(newValue));
    }

  }
  iconChanged(newValue) {
    if (this._button !== null) {
      this._button.setIcon(newValue);
    }
  }
  textChanged(newValue) {
    if (this._button !== null) {
      this._button.setText(newValue);
    }
  }
  visibleChanged(newValue) {
    if (this._button !== null) {
      this._button.setVisible(getBooleanFromAttributeValue(newValue));
    }
  }
  tooltipChanged(newValue) {
    if (this._button !== null) {
      this._button.setTooltip(newValue);
    }
  }
  pressChanged(newValue) {
    if (this._button !== null) {
      this._button.attachPress(newValue);
    }
  }
  busyChanged(newValue) {
    if (this._button !== null) {
      this._button.setBusy(getBooleanFromAttributeValue(newValue));
    }
  }
  busyIndicatorDelayChanged(newValue) {
    if (this._button !== null) {
      this._button.setBusyIndicatorDelay(newValue);
    }
  }
}
