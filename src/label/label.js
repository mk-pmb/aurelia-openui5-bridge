import { bindable, customElement, noView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { AttributeManager } from '../common/attributeManager';
import { getBooleanFromAttributeValue } from '../common/attributes';

@customElement('ui5-label')
@inject(Element)

export class Ui5Label {
  _label = null;
  _parent = null;
  _relation = null;
  @bindable() ui5Id = null;
  @bindable() labelFor = null;
  @bindable() text = null;
  @bindable() required = false;
  @bindable() textAlign = "Begin";
  @bindable() textDirection = null;
  @bindable() tooltip = null;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._label = new sap.m.Label({
      text: this.text,
      labelFor: this.labelFor,
      required: getBooleanFromAttributeValue(this.required),
      textAlign: this.textAlign,
      textDirection: this.textDirection,
      tooltip: this.tooltip
    });
    if ($(this.element).closest("[ui5-container]").length > 0) {
      this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
      this._relation = this._parent.addChild(this._label, this.element);
    }
  }
  detached() {
    if (this._parent && this._parent.removeChildByRelation) {
      this._parent.removeChildByRelation(this._label, this._relation);
      this._label.destroy();
    }
  }
  textChanged(newValue) {
    if (this._label !== null) {
      this._label.setText(newValue);
    }
  }
  labelForChanged(newValue) {
    if (this._label !== null) {
      this._label.setLabelFor(newValue);
    }
  }
  requiredChanged(newValue) {
    if (this._label !== null) {
      this._label.setRequired(getBooleanFromAttributeValue(newValue));
    }
  }
  textAlignChanged(newValue) {
    if (this._label !== null) {
      this._label.setTextAlign(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._label !== null) {
      this._label.setTextDirection(newValue);
    }
  }
  tooltipChanged(newValue) {
    if (this._label !== null) {
      this._label.setTooltip(newValue);
    }
  }
}
