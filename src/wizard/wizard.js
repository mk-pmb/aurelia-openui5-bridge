import { bindable, customElement, noView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { AttributeManager } from '../common/attributeManager';
import { getBooleanFromAttributeValue } from '../common/attributes';
import { computedFrom } from 'aurelia-framework';
@customElement('ui5-wizard')
@inject(Element)
export class Ui5Wizard {
  _wizard = null;
  _parent = null;
  @bindable() width = 'auto';
  @bindable() height = '100%';
  @bindable() showNextButton = true;
  @bindable() finishButtonText = "fortfahren";
  @bindable() enableBranching = false;
  @bindable() stepActivate = this.defaultFunc;
  @bindable() complete = this.defaultFunc;

  @bindable() lastStep = false;
  defaultFunc() {

  }

  @computedFrom('_wizard')
  get UIElement() {
    return this._wizard;
  }
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = jQuery.makeArray($(elem).parentsUntil(this.element));
    if (path[0].localName == 'wizard')
      this._wizard.addStep(child);
  }
  removeChild(child, elem) {
    var path = jQuery.makeArray($(elem).parentsUntil(this.element));
    //FIXME: Dynamic step removal is not supported by openui5 yet, will be removed with the wizard itself
    //if (path[0].localName == 'wizard')
    // this._wizard.removeStep(child);
  }
  attached() {
    var params = {
      width: this.width,
      height: this.height,
      showNextButton: getBooleanFromAttributeValue(this.showNextButton),
      finishButtonText: this.finishButtonText,
      enableBranching: getBooleanFromAttributeValue(this.enableBranching),
      stepActivate: this.stepActivate,
      complete: this.complete
    };
    var that = this;
    this._wizard = new sap.m.Wizard(params);
    this._wizard.attachStepActivate((event) => {
      that.lastStep = event.mParameters.index == that._wizard.getSteps().length;
    });
    if (that._wizard.getSteps().length === 1)
      that.lastStep = true;
    this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
    this._parent.addChild(this._wizard, this.element);
  }
  detached() {
    this._parent.removeChild(this._wizard, this.element);
  }
  widthChanged(newValue) {
    if (this._wizard !== null) {
      this._wizard.setWidth(newValue);
    }
  }
  heightChanged(newValue) {
    if (this._wizard !== null) {
      this._wizard.setHeight(newValue);
    }
  }
  showNextButtonChanged(newValue) {
    if (this._wizard !== null) {
      this._wizard.setShowNextButton(getBooleanFromAttributeValue(newValue));
    }
  }
  finishButtonTextChanged(newValue) {
    if (this._wizard !== null) {
      this._wizard.setFinishButtonText(newValue);
    }
  }
  enableBranchingChanged(newValue) {
    if (this._wizard !== null) {
      this._wizard.setEnableBranching(getBooleanFromAttributeValue(newValue));
    }
  }
}
