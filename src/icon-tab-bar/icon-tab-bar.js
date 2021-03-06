import { bindable, customElement, noView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { AttributeManager } from '../common/attributeManager';
import { getBooleanFromAttributeValue } from '../common/attributes';

@customElement('ui5-icon-tab-bar')
@inject(Element)
export class Ui5IconTabBar {
  _tab = null;
  _parent = null;
  _relation = null;
  @bindable() showSelection = true;
  @bindable() expandable = true;
  @bindable() expanded = true;
  @bindable() selectedKey = null;
  @bindable() upperCase = false;
  @bindable() stretchContentHeight = false;
  @bindable() applyContentPadding = true;
  @bindable() backgroundDesign = 'Solid';
  @bindable() headerMode = 'Standard';
  @bindable() showOverflowSelectList = false;
  @bindable() headerBackgroundDesign = 'Solid';
  @bindable() enableTabReordering = false;
  @bindable() select = this.defaultFunc;
  constructor(element) {
    this.element = element;
  }
  get UIElement() {
    return this._tab;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = jQuery.makeArray($(elem).parentsUntil(this.element));
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.addItem(child);
        return elem.localName;
      }
    }
  }
  removeChild(child, elem) {
    var path = jQuery.makeArray($(elem).parentsUntil(this.element));
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.removeItem(child);
        break;
      }
    }
  }
  removeChildByRelation(child, relation) {
    if (relation == 'content') {
      this._tab.removeItem(child);
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._tab = new sap.m.IconTabBar({
      showSelection: getBooleanFromAttributeValue(this.showSelection),
      expandable: getBooleanFromAttributeValue(this.expandable),
      expanded: getBooleanFromAttributeValue(this.expanded),
      selectedKey: this.selectedKey,
      upperCase: getBooleanFromAttributeValue(this.upperCase),
      stretchContentHeight: getBooleanFromAttributeValue(this.stretchContentHeight),
      applyContentPadding: getBooleanFromAttributeValue(this.applyContentPadding),
      backgroundDesign: this.backgroundDesign,
      headerMode: this.headerMode,
      showOverflowSelectList: getBooleanFromAttributeValue(this.showOverflowSelectList),
      headerBackgroundDesign: this.headerBackgroundDesign,
      enableTabReordering: getBooleanFromAttributeValue(this.enableTabReordering),
      select: this.select
    });
    var that = this;
    this._tab.attachSelect((event) => {
      that.selectedKey = event.mParameters.selectedItem.mProperties.text;
    });
    if ($(this.element).closest("[ui5-container]").length > 0) {
      this._parent = $(this.element).closest("[ui5-container]")[0].au.controller.viewModel;
      if (!this._parent.UIElement || (this._parent.UIElement.sId != this._tab.sId)) {

        this._relation = this._parent.addChild(this._tab, this.element);
        attributeManager.addAttributes({ "ui5-container": '' });
      }
      else {
        this._parent = $(this.element.parentElement).closest("[ui5-container]")[0].au.controller.viewModel;
        this._relation = this._parent.addChild(this._tab, this.element);
        attributeManager.addAttributes({ "ui5-container": '' });
      }
    }
    else {
      this._tab.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if (this._parent) {
      this._parent.removeChildByRelation(this._tab, this._relation);
    }
    else {
      this._tab.destroy();
    }
  }
  showSelectionChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setShowSelection(getBooleanFromAttributeValue(newValue));
    }
  }
  expandableChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setExpandable(getBooleanFromAttributeValue(newValue));
    }
  }
  expandedChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setExpanded(getBooleanFromAttributeValue(newValue));
    }
  }
  selectedKeyChanged(newValue) {
    if (this._tab !== null) {
      if (this._tab.getSelectedKey() != newValue)
        this._tab.setSelectedKey(newValue);
    }
  }
  upperCaseChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setUpperCase(getBooleanFromAttributeValue(newValue));
    }
  }

  stretchContentHeightChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setStretchContentHeight(getBooleanFromAttributeValue(newValue));
    }
  }
  applyContentPaddingChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setApplyContentPadding(getBooleanFromAttributeValue(newValue));
    }
  }
  backgroundDesignChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setBackgroundDesign(newValue);
    }
  }
  headerModeChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setHeaderMode(newValue);
    }
  }
  showOverflowSelectListChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setShowOverflowSelectList(getBooleanFromAttributeValue(newValue));
    }
  }
  headerBackgroundDesignChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setHeaderBackgroundDesign(newValue);
    }
  }
  enableTabReorderingChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setEnableTabReordering(getBooleanFromAttributeValue(newValue));
    }
  }
  /*TODO: Add change bindings for event handlers */
}
