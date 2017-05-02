import {PLATFORM} from 'aurelia-pal';
import {bindable,customElement,noView,customAttribute,children,inlineView} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {bindingMode,observable,ObserverLocator} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';
import {getLogger} from 'aurelia-logging';
import {EventAggregator} from 'aurelia-event-aggregator';

export class ClickCounter {
  count = 0;

  increment() {
    this.count++;
  }
}

/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  useGlobalResources: boolean = true;
  useScrollfirePatch: boolean = false;
  globalResources = [];

  useAll(): ConfigBuilder {
    return this
      .usePage()
      .useBar()
      .useContainer()
      .useHtml()
      .useButton()
      .useTiles()
      .useGrid()
      .useText()
      .useWizard()
      .useForm()
      .useLabel()
      .useInput()
      .useDatePicker()
      .useTitle()
      .useLayoutData()
      .useSelect()
      .useTable()
      .useTabs()
      .useLayout()
  }

  usePage(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./page/page'));
    this.globalResources.push(PLATFORM.moduleName('./shell/shell'));
    return this;
  }
  useBar(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./bar/bar'));
    this.globalResources.push(PLATFORM.moduleName('./overflow-toolbar/overflow-toolbar'));
    this.globalResources.push(PLATFORM.moduleName('./toolbar-spacer/toolbar-spacer'));
    return this;
  }
  useContainer(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./container/container'));
    return this;
  }
  useHtml(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./html/html'));
    return this;
  }
  useButton(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./button/button'));
    return this;
  }
  useGrid(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./grid/grid'));
    return this;
  }
  useWizard(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./wizard/wizard'));
    this.globalResources.push(PLATFORM.moduleName('./wizard-step/wizard-step'));
    return this;
  }
  useText(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./text/text'));
    return this;
  }

  useTiles(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./generic-tile/generic-tile'));
    this.globalResources.push(PLATFORM.moduleName('./tile-container/tile-container'));
    this.globalResources.push(PLATFORM.moduleName('./tile-content/tile-content'));
    this.globalResources.push(PLATFORM.moduleName('./standard-tile/standard-tile'));
    this.globalResources.push(PLATFORM.moduleName('./image-content/image-content'));
    this.globalResources.push(PLATFORM.moduleName('./numeric-content/numeric-content'));
    this.globalResources.push(PLATFORM.moduleName('./feed-content/feed-content'));
    this.globalResources.push(PLATFORM.moduleName('./slide-tile/slide-tile'));
    return this;
  }
  useForm(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./simple-form/simple-form'));
    this.globalResources.push(PLATFORM.moduleName('./form/form'));
    this.globalResources.push(PLATFORM.moduleName('./form-container/form-container'));
    this.globalResources.push(PLATFORM.moduleName('./form-element/form-element'));
    this.globalResources.push(PLATFORM.moduleName('./responsive-grid-layout/responsive-grid-layout'));
    return this;
  }
  useLabel(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./label/label'));
    return this;
  }
  useInput(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./input/input'));
    return this;
  }
  useDatePicker(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./date-picker/date-picker'));
    return this;
  }
  useTitle(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./title/title'));
    this.globalResources.push(PLATFORM.moduleName('./m-title/m-title'));
    return this;
  }
  useLayoutData(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./grid-data/grid-data'));
    return this;
  }
  useLayout(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./vertical-layout/vertical-layout'));
    return this;
  }
  useSelect(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./select/select'));
    this.globalResources.push(PLATFORM.moduleName('./list-item/list-item'));
    return this;
  }
  useTable(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./table/table'));
    this.globalResources.push(PLATFORM.moduleName('./column/column'));
    this.globalResources.push(PLATFORM.moduleName('./column-list-item/column-list-item'));
    this.globalResources.push(PLATFORM.moduleName('./object-identifier/object-identifier'));
    this.globalResources.push(PLATFORM.moduleName('./object-number/object-number'));
    return this;
  }
  useTabs(): ConfigBuilder {
    this.globalResources.push(PLATFORM.moduleName('./tab-container/tab-container'));
    this.globalResources.push(PLATFORM.moduleName('./tab-container-item/tab-container-item'));
    this.globalResources.push(PLATFORM.moduleName('./icon-tab-bar/icon-tab-bar'));
    this.globalResources.push(PLATFORM.moduleName('./icon-tab-filter/icon-tab-filter'));
    
    return this;
  }

  /**
  * Don't globalize any resources
  * Allows you to import yourself via <require></require>
  */
  withoutGlobalResources(): ConfigBuilder {
    this.useGlobalResources = false;
    return this;
  }

  withScrollfirePatch(): ConfigBuilder {
    this.useScrollfirePatch = true;
    return this;
  }
}



function applyPolyfills() {
  polyfillElementClosest();
}

export function configure(aurelia, configCallback) {
  applyPolyfills();
  let builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

  if (builder.useGlobalResources) {
    aurelia.globalResources(builder.globalResources);
  }
  if (builder.useScrollfirePatch) {
    new ScrollfirePatch().patch();
  }
}



@customElement('ui5-bar')
@inject(Element)
export class Ui5Bar {
   _bar = null;

  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'content-left')
      this._bar.addContentLeft(child);
    if (path[0].localName == 'content-middle')
      this._bar.addContentMiddle(child);
    if (path[0].localName == 'content-right')
      this._bar.addContentRight(child);
  }
  attached() {

    this._bar = new sap.m.Bar();
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._bar,this.element);

  }
}

// taken from: https://github.com/heruan/aurelia-breadcrumbs

@customElement('md-breadcrumbs')
@inject(Element, Router)
export class MdBreadcrumbs {
  @bindable() router;

  constructor(element, router) {
    this.element = element;
    this.aureliaRouter = router;
    // this._childRouter = router;
    // while (router.parent) {
    //   router = router.parent;
    // }
    // this.router = router;
  }

  bind() {
    if (!this.router) {
      this.router = this.aureliaRouter;
    }
    let router = this.router;
    this._childRouter = router;
    while (router.parent) {
      router = router.parent;
    }
    this.router = router;
  }

  routerChanged() {
    // console.log('[breadcrumbs]', this.router);
  }

  navigate(navigationInstruction) {
    this._childRouter.navigateToRoute(navigationInstruction.config.name);
    // this.router.navigate(navigationInstruction.config.name);
  }
}

export class InstructionFilterValueConverter {
  toView(navigationInstructions) {
    return navigationInstructions.filter(i => {
      let result = false;
      if (i.config.title) {
        result = true;
      }
      return result;
    });
  }
}

@customAttribute('md-badge')
@inject(Element)
export class MdBadge {
  @bindable() isNew = false;
  @bindable() caption = null;

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    let classes = [
      'badge'
    ];

    if (getBooleanFromAttributeValue(this.isNew)) {
      classes.push('new');
    }

    if (this.caption !== null) {
      this.attributeManager.addAttributes({ 'data-badge-caption': this.caption });
    }

    this.attributeManager.addClasses(classes);
  }

  detached() {
    this.attributeManager.removeClasses(['badge', 'new']);
    this.attributeManager.removeAttributes(['data-badge-caption']);
  }

  newChanged(newValue) {
    if (getBooleanFromAttributeValue(newValue)) {
      this.attributeManager.addClasses('new');
    } else {
      this.attributeManager.removeClasses('new');
    }
  }

  captionChanged(newValue) {
    if (newValue !== null) {
      this.attributeManager.addAttributes({ 'data-badge-caption': newValue });
    } else {
      this.attributeManager.removeAttributes(['data-badge-caption']);
    }
  }
}

@customElement('ui5-button')
@inject(Element)
export class Ui5Button {
  @bindable() disabled = false;
  @bindable() floating = false;
  @bindable() large = false;
  @bindable() text = '';
  @bindable() press = null;
  @bindable() icon = null;
  _button = null;
  constructor(element) {
    this.attributeManager = new AttributeManager(element);
    this.element = element;
  }

  attached() {
    this._button = new sap.m.Button({
      text: this.text,
      icon: this.icon,
      enabled: !getBooleanFromAttributeValue(this.disabled),
      press: this.press != null ? this.press : this.defaultPress
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._button, this.element);
    }
  }
  defaultPress() {

  }
  detached() {

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
  pressChanged(newValue) {
    if (this._button !== null) {
      this._button.attachPress(newValue);
    }
  }
}

@customAttribute('md-box')
@inject(Element)
export class MdBox {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) caption;
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.attributeManager.addClasses('materialboxed');
    if (this.caption) {
      this.attributeManager.addAttributes({ 'data-caption': this.caption });
    }
    // FIXME:0 throws "Uncaught TypeError: Cannot read property 'css' of undefined", but so does the original
    $(this.element).materialbox();
  }

  detached() {
    this.attributeManager.removeAttributes('data-caption');
    this.attributeManager.removeClasses('materialboxed');
  }
}

@customElement('md-card')
@inject(Element)
export class MdCard {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdHorizontal;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdImage = null;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdReveal = false;
  @bindable({
    defaultBindingMode: bindingMode.oneWay
  }) mdSize = '';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdTitle;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.mdHorizontal = getBooleanFromAttributeValue(this.mdHorizontal);
    this.mdReveal = getBooleanFromAttributeValue(this.mdReveal);
  }
}

@customAttribute('md-char-counter')
@inject(Element)
export class MdCharCounter {
  @bindable() length = 120;

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.length = parseInt(this.length, 10);

    // attach to input element explicitly, so this counter can be used on
    // containers (or custom elements like md-input)
    if (this.element.tagName.toUpperCase() === 'INPUT') {
      this.attributeManager.addAttributes({ 'length': this.length });
      $(this.element).characterCounter();
    } else {
      $(this.element).find('input').each((i, el) => { $(el).attr('length', this.length); });
      $(this.element).find('input').characterCounter();
    }
  }

  detached() {
    this.attributeManager.removeAttributes(['length']);
  }
}

// @customElement('md-carousel-item')
@inject(Element)
export class MdCarouselItem {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdHref = '';
  @bindable({
    defaultBindingMode: bindingMode.oneWay
  }) mdImage = '';

  constructor(element) {
    this.element = element;
  }

  attached() { }
}

@customElement('md-carousel')
@inject(Element, TaskQueue)
export class MdCarousel {
  @bindable() mdIndicators = true;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdSlider = false;
  @children('md-carousel-item') items = [];

  constructor(element, taskQueue) {
    this.element = element;
    this.taskQueue = taskQueue;
  }

  attached() {
    if (getBooleanFromAttributeValue(this.mdSlider)) {
      this.element.classList.add('carousel-slider');
    }

    // workaround for: https://github.com/Dogfalo/materialize/issues/2741
    // if (getBooleanFromAttributeValue(this.mdSlider)) {
    //   $(this.element).carousel({full_width: true});
    // } else {
    //   $(this.element).carousel();
    // }
    this.refresh();
  }

  itemsChanged(newValue) {
    this.refresh();
  }

  refresh() {
    if (this.items.length > 0) {
      let options = {
        full_width: getBooleanFromAttributeValue(this.mdSlider),
        fullWidth: getBooleanFromAttributeValue(this.mdSlider),
        indicators: this.mdIndicators
      };

      this.taskQueue.queueTask(() => {
        $(this.element).carousel(options);
      });
    }
  }
}

@customAttribute('md-autocomplete')
@inject(Element)
export class MdAutoComplete {
  input = null;
  @bindable() values = {};

  constructor(element) {
    this.element = element;
  }

  attached() {
    if (this.element.tagName.toLowerCase() === 'input') {
      this.input = this.element;
    } else if (this.element.tagName.toLowerCase() === 'md-input') {
      this.input = this.element.au.controller.viewModel.input;
    } else {
      throw new Error('md-autocomplete must be attached to either an input or md-input element');
    }
    this.refresh();
  }

  detached() {
    // remove .autocomplete-content children
    $(this.input).siblings('.autocomplete-content').off('click');
    $(this.input).siblings('.autocomplete-content').remove();
  }

  refresh() {
    this.detached();
    $(this.input).autocomplete({
      data: this.values
    });
    // $('.autocomplete-content', this.element).on('click', () => {
    //   fireEvent(this.input, 'change');
    // });
    $(this.input).siblings('.autocomplete-content').on('click', () => {
      fireEvent(this.input, 'change');
    });
  }

  valuesChanged(newValue) {
    this.refresh();
  }
}

// @customElement('md-checkbox')
@inject(Element)
export class MdCheckbox {
  static id = 0;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdChecked;
  @bindable() mdDisabled;
  @bindable() mdFilledIn;
  @bindable() mdMatcher;
  @bindable() mdModel;

  constructor(element) {
    this.element = element;
    this.controlId = `md-checkbox-${MdCheckbox.id++}`;
    // this.handleChange = this.handleChange.bind(this);
  }

  attached() {
    this.attributeManager = new AttributeManager(this.checkbox);
    if (getBooleanFromAttributeValue(this.mdFilledIn)) {
      this.attributeManager.addClasses('filled-in');
    }
    if (this.mdChecked === null) {
      this.checkbox.indeterminate = true;
    } else {
      this.checkbox.indeterminate = false;
    }
    if (getBooleanFromAttributeValue(this.mdDisabled)) {
      this.checkbox.disabled = true;
    }
    // this.checkbox.checked = getBooleanFromAttributeValue(this.mdChecked);
    // this.checkbox.addEventListener('change', this.handleChange);
  }

  // blur() {
  //   fireEvent(this.element, 'blur');
  // }

  detached() {
    this.attributeManager.removeClasses(['filled-in', 'disabled']);
    // this.checkbox.removeEventListener('change', this.handleChange);
  }

  // handleChange() {
  //   this.mdChecked = this.checkbox.checked;
  //   fireEvent(this.element, 'blur');
  // }

  // mdCheckedChanged(newValue) {
  //   // if (this.checkbox) {
  //   //   this.checkbox.checked = !!newValue;
  //   // }
  //   fireEvent(this.element, 'blur');
  // }

  mdDisabledChanged(newValue) {
    if (this.checkbox) {
      this.checkbox.disabled = !!newValue;
    }
  }
}

@customElement('md-chip')
@inject(Element)
export class MdChip {
  @bindable() mdClose = false;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.mdClose = getBooleanFromAttributeValue(this.mdClose);
  }

  close() {
    this.element.parentElement.removeChild(this.element);
  }
}

@customAttribute('md-chips')
@inject(Element)
export class MdChips {
  @bindable() autocompleteData = {};
  @bindable({ defaultBindingMode: bindingMode.twoWay }) data = [];
  @bindable() placeholder = '';
  @bindable() secondaryPlaceholder = '';

  constructor(element) {
    this.element = element;
    this.log = getLogger('md-chips');

    this.onChipAdd = this.onChipAdd.bind(this);
    this.onChipDelete = this.onChipDelete.bind(this);
    this.onChipSelect = this.onChipSelect.bind(this);
  }

  attached() {
    let options = {
      autocompleteData: this.autocompleteData,
      data: this.data,
      placeholder: this.placeholder,
      secondaryPlaceholder: this.secondaryPlaceholder
    };
    $(this.element).material_chip(options);
    $(this.element).on('chip.add', this.onChipAdd);
    $(this.element).on('chip.delete', this.onChipDelete);
    $(this.element).on('chip.select', this.onChipSelect);
  }

  detached() {
    //
  }

  onChipAdd(e, chip) {
    this.data = $(this.element).material_chip('data');
    fireEvent(this.element, 'change', { operation: 'add', target: chip, data: this.data });
  }
  onChipDelete(e, chip) {
    this.data = $(this.element).material_chip('data');
    fireEvent(this.element, 'change', { operation: 'delete', target: chip, data: this.data });
  }
  onChipSelect(e, chip) {
    fireEvent(this.element, 'selected', { target: chip });
  }
}

@customElement('md-collection-header')
@inject(Element)
export class MdCollectionHeader {
  constructor(element) {
    this.element = element;
  }
}

@customElement('md-collection-item')
export class MdCollectionItem { }

@customElement('md-collection')
@inject(Element)
export class MdCollection {
  constructor(element) {
    this.element = element;
  }

  attached() {
    let header = this.element.querySelector('md-collection-header');
    if (header) {
      this.anchor.classList.add('with-header');
    }
  }

  getSelected() {
    let items = [].slice.call(this.element.querySelectorAll('md-collection-selector'));
    return items.filter(i => i.au['md-collection-selector'].viewModel.isSelected)
      .map(i => i.au['md-collection-selector'].viewModel.item);
  }

  clearSelection() {
    let items = [].slice.call(this.element.querySelectorAll('md-collection-selector'));
    items.forEach(i => i.au['md-collection-selector'].viewModel.isSelected = false);
  }

  selectAll() {
    let items = [].slice.call(this.element.querySelectorAll('md-collection-selector'));
    items.forEach(i => {
      let vm = i.au['md-collection-selector'].viewModel;
      vm.isSelected = !vm.mdDisabled;
    });
  }
}

@customElement('md-collection-selector')
@inject(Element)
export class MdlListSelector {
  @bindable() item;
  @bindable() mdDisabled = false;
  @observable() isSelected = false;

  constructor(element) {
    this.element = element;
  }

  isSelectedChanged(newValue) {
    fireMaterializeEvent(this.element, 'selection-changed', { item: this.item, isSelected: this.isSelected });
  }

  mdDisabledChanged(newValue) {
    this.mdDisabled = getBooleanFromAttributeValue(newValue);
  }
}

@customElement('ui5-column')
@inject(Element)

export class Ui5Column {
  _column = null;
  @bindable() ui5Id = null;
  @bindable() width;
  @bindable() hAlign = 'Begin';
  @bindable() vAlign = 'Inherit';
  @bindable() styleClass = null;
  @bindable() visible = true;
  @bindable() minScreenWidth = null;
  @bindable() demandPopin = false;
  @bindable() popinHAlign = null;
  @bindable() popinDisplay = null;
  @bindable() mergeDuplicates = false;
  @bindable() mergeFunctionName = 'getText';
  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      width: this.width,
      hAlign: this.hAlign,
      vAlign: this.vAlign,
      styleClass: this.styleClass,
      visible: getBooleanFromAttributeValue(this.visible),
      minScreenWidth: this.minScreenWidth,
      demandPopin: getBooleanFromAttributeValue(this.demandPopin),
      popinDisplay: this.popinDisplay,
      popinHAlign: this.popinHAlign,
      mergeDuplicates: getBooleanFromAttributeValue(this.mergeDuplicates),
      mergeFunctionName: this.mergeFunctionName
    };
    if (this.ui5Id)
      this._column = new sap.m.Column(this.ui5Id, params);
    else
      this._column = new sap.m.Column(params);
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._column, this.element);
    attributeManager.addAttributes({ "ui5-container": '' });

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'header')
      { this._column.setHeader(child); break; }
      if (elem.localName == 'footer')
      { this._column.setFooter(child); break; }
      if (elem.localName == 'content')
      { this._column.addDependent(child); break; }
    }
  }
  widthChanged(newValue) {
    if (this._column !== null) {
      this._column.setWidth(newValue);
    }
  }
  hAlignChanged(newValue) {
    if (this._column !== null) {
      this._column.setHAlign(newValue);
    }
  }
  vAlignChanged(newValue) {
    if (this._column !== null) {
      this._column.setVAlign(newValue);
    }
  }
  styleClassChanged(newValue) {
    if (controlName !== null) {
      controlName.setStyleClass(newValue);
    }
  }
  visibleChanged(newValue) {
    if (controlName !== null) {
      controlName.setVisible(getBooleanFromAttributeValue(newValue));
    }
  }
  minScreenWidthChanged(newValue) {
    if (controlName !== null) {
      controlName.setMinScreenWidth(newValue);
    }
  }

  demandPopinChanged(newValue) {
    if (controlName !== null) {
      controlName.setDemandPopin(getBooleanFromAttributeValue(newValue));
    }
  }
  popinDisplayChanged(newValue) {
    if (controlName !== null) {
      controlName.setPopinDisplay(newValue);
    }
  }
  popinHAlignChanged(newValue) {
    if (controlName !== null) {
      controlName.setPopinHAlign(newValue);
    }
  }
  mergeDuplicatesChanged(newValue) {
    if (controlName !== null) {
      controlName.setMergeDuplicates(getBooleanFromAttributeValue(newValue));
    }
  }
  mergeFunctionNameChanged(newValue) {
    if (controlName !== null) {
      controlName.setMergeFunctionName(newValue);
    }
  }

}

@customElement('ui5-column-list-item')
@inject(Element)

export class Ui5ColumnListItem {
  _item = null;

  @bindable() vAlign = 'Inherit';
 

  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    
    this._item = new sap.m.ColumnListItem({
      vAlign: this.vAlign,
    });
    attributeManager.addAttributes({ "ui5-container": '' });      
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._item, this.element);
  }
  addChild(child, elem) {
     var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'cell')
      { this._item.addCell(child); break; }
    }
  }
  vAlignChanged(newValue) {
    if (this._item !== null) {
      this._item.setVAlign(newValue);
    }
  }


}

/**
 * Adds css classes to a given element only if these classes are not already
 * present. Keeps a record of css classes which actually have been added.
 * This way, they can also be removed in a way which keeps the original classes
 * set by the user.
 * Most useful in attached() and detached() handlers.
 */
export class AttributeManager {
  _colorClasses = [
    'accent',
    'primary'
  ];
  addedClasses = [];
  addedAttributes = {};

  constructor(element) {
    this.element = element;
  }

  addAttributes(attrs) {
    let keys = Object.keys(attrs);
    keys.forEach(k => {
      if (!this.element.getAttribute(k)) {
        this.addedAttributes[k] = attrs[k];
        this.element.setAttribute(k, attrs[k]);
      } else if (this.element.getAttribute(k) !== attrs[k]) {
        this.element.setAttribute(k, attrs[k]);
      }
    });
  }

  removeAttributes(attrs) {
    if (typeof attrs === 'string') {
      attrs = [attrs];
    }
    attrs.forEach(a => {
      if (this.element.getAttribute(a) && !!this.addedAttributes[a]) {
        this.element.removeAttribute(a);
        this.addedAttributes[a] = null;
        delete this.addedAttributes[a];
      }
    });
  }

  addClasses(classes) {
    if (typeof classes === 'string') {
      classes = [classes];
    }
    classes.forEach(c => {
      let classListHasColor = this._colorClasses.filter(cc => this.element.classList.contains(cc)).length > 0;
      if (this._colorClasses.indexOf(c) > -1 && classListHasColor) {
        //
      } else {
        if (!this.element.classList.contains(c)) {
          this.addedClasses.push(c);
          this.element.classList.add(c);
        }
      }
    });
  }

  removeClasses(classes) {
    if (typeof classes === 'string') {
      classes = [classes];
    }
    classes.forEach(c => {
      if (this.element.classList.contains(c) && this.addedClasses.indexOf(c) > -1) {
        this.element.classList.remove(c);
        this.addedClasses.splice(this.addedClasses.indexOf(c), 1);
      }
    });
  }
}

export function getBooleanFromAttributeValue(value) {
  return (value === true || value === 'true');
}
export const constants = {
  eventPrefix: 'md-on-',
  bindablePrefix: 'md-'
};

/**
* Fire DOM event on an element
* @param element The Element which the DOM event will be fired on
* @param name The Event's name
* @param data Addition data to attach to an event
*/
export function fireEvent(element: Element, name: string, data? = {}) {
  let event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

/**
* Fire DOM event on an element with the md-on prefix
* @param element The Element which the DOM event will be fired on
* @param name The Event's name, without md-on prefix
* @param data Addition data to attach to an event
*/
export function fireMaterializeEvent(element: Element, name: string, data? = {}) {
  return fireEvent(element, `${constants.eventPrefix}${name}`, data);
}


/**
* Initialize the plugin and respond with a promise
*/
export function initialize() {
  new Promise(resolve => sap.ui.getCore().attachInit(() => {
    new sap.m.BusyIndicator().placeAt("indicator");
    resolve();
  }));
}

// https://github.com/jonathantneal/closest/blob/master/closest.js
export function polyfillElementClosest() {
  if (typeof Element.prototype.matches !== 'function') {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
      let element = this;
      let elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      let index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }
      return Boolean(elements[index]);
    };
  }

  if (typeof Element.prototype.closest !== 'function') {
    Element.prototype.closest = function closest(selector) {
      let element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }
      return null;
    };
  }
}

@customAttribute('ui5-container')
@inject(Element)
export class Ui5Container {
 
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
  
  }

  detached() {
    
  }

}

@customElement('ui5-date-picker')
@inject(Element)

export class Ui5DatePicker extends Ui5InputBase {
  _picker = null;
  @bindable() ui5Id = null;

  @bindable() displayFormat = null;
  @bindable() valueFormat = null;
  @bindable() dateValue = null;
  @bindable() displayFormatType = null;
  @bindable() secondaryCalendarType = 'Gregorian';
  @bindable() minDate = null;
  @bindable() maxDate = null;

  @bindable() specialDates = [];


  /*Inherited from InputBase */
  @bindable() value = null;
  @bindable() width = null;
  @bindable() enabled = true;
  @bindable() valueState = 'None';
  @bindable() name = null;
  @bindable() placeholder = null;
  @bindable() editable = true;
  @bindable() valueStateText = null;
  @bindable() showValueStateMessage = true;
  @bindable() textAlign = 'Initial';
  @bindable() textDirection = 'Inherit';
  @bindable() required = false;

  @bindable() change = this.defaultFunc;
  get UIElement() {
    return this._picker;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    super.addChild(child, elem);

  }
  constructor(element) {
    super(element);
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      displayFormat: this.displayFormat,
      valueFormat: this.valueFormat,
      dateValue: this.dateValue,
      displayFormatType: this.displayFormatType,
      secondaryCalendarType: this.secondaryCalendarType,
      minDate: this.minDate,
      maxDate: this.maxDate,
      specialDates: this.specialDates,
      /*inherited from InputBase*/
      value: this.value,
      width: this.width,
      enabled: getBooleanFromAttributeValue(this.enabled),
      valueState: this.valueState,
      name: this.value,
      placeholder: this.placeholder,
      editable: getBooleanFromAttributeValue(this.editable),
      valueStateText: this.valueStateText,
      showValueStateMessage: getBooleanFromAttributeValue(this.showValueStateMessage),
      textAlign: this.textAlign,
      textDirection: this.textDirection,
      required: getBooleanFromAttributeValue(this.required),
      change: this.change
      /*inherited from InputBase*/
    };
    if (this.ui5Id)
      this._picker = new sap.m.DatePicker(this.ui5Id, params);
    else
      this._picker = new sap.m.DatePicker(params);
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._picker, this.element);
    attributeManager.addAttributes({ "ui5-layout": '' });
    var that = this;
    this._picker.attachChange((event) => {
      that.value = event.mParameters.value;
    });

    this._picker.addEventDelegate(this.element);
    super.attached();
  }
  displayFormatChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setDisplayFormat(newValue);
    }
  }
  valueFormatChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValueFormat(newValue);
    }
  }
  dateValueChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setDateValue(newValue);
    }
  }
  displayFormatTypeChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setDisplayFormatType(newValue);
    }
  }

  secondaryCalendarTypeChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setSecondaryCalendarType(newValue);
    }
  }
  minDateChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setMinDate(newValue);
    }
  }
  
  specialDatesChanged(newValue) {
    //TODO: Need to add and remove values separately
    if (this._picker !== null) {
      this._picker.setSpecialDates(newValue);
    }
  }
  
  /*valueChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValue(newValue);
    }
  }
  widthChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setWidth(newValue);
    }
  }
  enabledChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setEnabled(getBooleanFromAttributeValue(newValue));
    }
  }
  valueStateChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValueState(newValue);
    }
  }
  nameChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setName(newValue);
    }
  }
  placeholderChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setPlaceholder(newValue);
    }
  }
  editableChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setEditable(getBooleanFromAttributeValue(newValue));
    }
  }
  valueStateTextChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValueStateText(newValue);
    }
  }
  showValueStateMessageChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setShowValueStateMessage(getBooleanFromAttributeValue(newValue));
    }
  }
  textAlignChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setTextAlign(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setTextDirection(newValue);
    }
  }
  requiredChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setRequired(getBooleanFromAttributeValue(newValue));
    }
  }
  changeChanged(newValue) {
    if (this._picker !== null) {
      this._picker.attachChange(newValue);
    }
  }*/
}

export class Ui5Control extends Ui5Element {
    addChild(child, elem) {
        super.addChild(child,elem);
    }
    attached()
    {
        super.attached();
    }
}
@customElement('md-dropdown')
@inject(Element)
export class MdDropdownElement {
  static id = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) alignment = 'left';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) belowOrigin = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) constrainWidth = true;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) gutter = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) hover = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdTitle;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) inDuration = 300;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) outDuration = 225;

  constructor(element) {
    this.element = element;
    this.controlId = `md-dropdown-${MdDropdown.id++}`;
  }
  attached() {
    $(this.element).dropdown({
      alignment: this.alignment,
      belowOrigin: getBooleanFromAttributeValue(this.belowOrigin),
      constrain_width: getBooleanFromAttributeValue(this.constrainWidth),
      gutter: parseInt(this.gutter, 10),
      hover: getBooleanFromAttributeValue(this.hover),
      inDuration: parseInt(this.inDuration, 10),
      outDuration: parseInt(this.outDuration, 10)
    });
  }
}

export function applyMaterializeDropdownFix() {
  $.fn.dropdown = function(options) {
    let defaults = {
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    };

    // Open dropdown.
    if (options === 'open') {
      this.each(function() {
        $(this).trigger('open');
      });
      return false;
    }

    // Close dropdown.
    if (options === 'close') {
      this.each(function() {
        $(this).trigger('close');
      });
      return false;
    }

    this.each(function() {
      let origin = $(this);
      let currentOptions = $.extend({}, defaults, options);
      let isFocused = false;

      // Dropdown menu
      let activates = $('#' + origin.attr('data-activates'));

      function updateOptions() {
        if (origin.data('induration') !== undefined) {
          currentOptions.inDuration = origin.data('induration');
        }
        if (origin.data('outduration') !== undefined) {
          currentOptions.outDuration = origin.data('outduration');
        }
        if (origin.data('constrainwidth') !== undefined) {
          currentOptions.constrain_width = origin.data('constrainwidth');
        }
        if (origin.data('hover') !== undefined) {
          currentOptions.hover = origin.data('hover');
        }
        if (origin.data('gutter') !== undefined) {
          currentOptions.gutter = origin.data('gutter');
        }
        if (origin.data('beloworigin') !== undefined) {
          currentOptions.belowOrigin = origin.data('beloworigin');
        }
        if (origin.data('alignment') !== undefined) {
          currentOptions.alignment = origin.data('alignment');
        }
        if (origin.data('stoppropagation') !== undefined) {
          currentOptions.stopPropagation = origin.data('stoppropagation');
        }
      }

      updateOptions();

      // Attach dropdown to its activator
      origin.after(activates);

      /*
        Helper function to position and resize dropdown.
        Used in hover and click handler.
      */
      function placeDropdown(eventType) {
        // Check for simultaneous focus and click events.
        if (eventType === 'focus') {
          isFocused = true;
        }

        // Check html data attributes
        updateOptions();

        // Set Dropdown state
        activates.addClass('active');
        origin.addClass('active');

        // Constrain width
        if (currentOptions.constrain_width === true) {
          activates.css('width', origin.outerWidth());
        } else {
          activates.css('white-space', 'nowrap');
        }

        // Offscreen detection
        let windowHeight = window.innerHeight;
        let originHeight = origin.innerHeight();
        let offsetLeft = origin.offset().left;
        let offsetTop = origin.offset().top - $(window).scrollTop();
        let currAlignment = currentOptions.alignment;
        let gutterSpacing = 0;
        let leftPosition = 0;

        // Below Origin
        let verticalOffset = 0;
        if (currentOptions.belowOrigin === true) {
          verticalOffset = originHeight;
        }

        // Check for scrolling positioned container.
        let scrollYOffset = 0;
        let scrollXOffset = 0;
        let wrapper = origin.parent();
        if (!wrapper.is('body')) {
          if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
            scrollYOffset = wrapper[0].scrollTop;
          }
          if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
            scrollXOffset = wrapper[0].scrollLeft;
          }
        }


        if (offsetLeft + activates.innerWidth() > $(window).width()) {
          // Dropdown goes past screen on right, force right alignment
          currAlignment = 'right';
        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
          // Dropdown goes past screen on left, force left alignment
          currAlignment = 'left';
        }
        // Vertical bottom offscreen detection
        if (offsetTop + activates.innerHeight() > windowHeight) {
          // If going upwards still goes offscreen, just crop height of dropdown.
          if (offsetTop + originHeight - activates.innerHeight() < 0) {
            let adjustedHeight = windowHeight - offsetTop - verticalOffset;
            activates.css('max-height', adjustedHeight);
          } else {
            // Flow upwards.
            if (!verticalOffset) {
              verticalOffset += originHeight;
            }
            verticalOffset -= activates.innerHeight();
          }
        }

        // Handle edge alignment
        if (currAlignment === 'left') {
          gutterSpacing = currentOptions.gutter;
          leftPosition = origin.position().left + gutterSpacing;
        } else if (currAlignment === 'right') {
          let offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
          gutterSpacing = -currentOptions.gutter;
          leftPosition =  offsetRight + gutterSpacing;
        }

        // Position dropdown
        activates.css({
          position: 'absolute',
          top: origin.position().top + verticalOffset + scrollYOffset,
          left: leftPosition + scrollXOffset
        });


        // Show dropdown
        activates.stop(true, true).css('opacity', 0)
          .slideDown({
            queue: false,
            duration: currentOptions.inDuration,
            easing: 'easeOutCubic',
            complete: function() {
              $(this).css('height', '');
            }
          })
          .animate( {opacity: 1}, {queue: false, duration: currentOptions.inDuration, easing: 'easeOutSine'});
      }

      function hideDropdown() {
        // Check for simultaneous focus and click events.
        isFocused = false;
        activates.fadeOut(currentOptions.outDuration);
        activates.removeClass('active');
        origin.removeClass('active');
        setTimeout(function() { activates.css('max-height', ''); }, currentOptions.outDuration);
      }

      // Hover
      if (currentOptions.hover) {
        let open = false;
        origin.unbind('click.' + origin.attr('id'));
        // Hover handler to show dropdown
        origin.on('mouseenter', function(e) { // Mouse over
          if (open === false) {
            placeDropdown();
            open = true;
          }
        });
        origin.on('mouseleave', function(e) {
          // If hover on origin then to something other than dropdown content, then close
          let toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
          if(!$(toEl).closest('.dropdown-content').is(activates)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        activates.on('mouseleave', function(e) { // Mouse out
          let toEl = e.toElement || e.relatedTarget;
          if(!$(toEl).closest('.dropdown-button').is(origin)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        // Click
      } else {
        // Click handler to show dropdown
        origin.unbind('click.' + origin.attr('id'));
        origin.bind('click.' + origin.attr('id'), function(e) {
          if (!isFocused) {
            if ( origin[0] === e.currentTarget &&
                 !origin.hasClass('active') &&
                 ($(e.target).closest('.dropdown-content').length === 0)) {
              e.preventDefault(); // Prevents button click from moving window
              if (currentOptions.stopPropagation) {
                e.stopPropagation();
              }
              placeDropdown('click');
            } else if (origin.hasClass('active')) {
              // If origin is clicked and menu is open, close menu
              hideDropdown();
              $(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
            }
            // If menu open, add click close handler to document
            if (activates.hasClass('active')) {
              $(document).bind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'), function(e2) {
                if (!activates.is(e2.target) && !origin.is(e2.target) && (!origin.find(e2.target).length) ) {
                  hideDropdown();
                  $(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
                }
              });
            }
          }
        });
      } // End else

      // Listen to open and close event - useful for select component
      origin.on('open', function(e, eventType) {
        placeDropdown(eventType);
      });
      origin.on('close', hideDropdown);
    });
  }; // End dropdown plugin

  $(document).ready(function() {
    $('.dropdown-button').dropdown();
  });
}

@customAttribute('md-dropdown')
@inject(Element)
export class MdDropdown {
  static elementId = 0;

  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) activates = '';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) ref = null;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) alignment = 'left';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) belowOrigin = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) constrainWidth = true;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) gutter = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) hover = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdTitle;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) inDuration = 300;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) outDuration = 225;

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.handleActivateElement();
    this.contentAttributeManager = new AttributeManager(document.getElementById(this.activates));

    this.attributeManager.addClasses('dropdown-button');
    this.contentAttributeManager.addClasses('dropdown-content');
    // this.attributeManager.addAttributes({ 'data-activates': this.activates });

    $(this.element).dropdown({
      alignment: this.alignment,
      belowOrigin: getBooleanFromAttributeValue(this.belowOrigin),
      constrain_width: getBooleanFromAttributeValue(this.constrainWidth),
      constrainWidth: getBooleanFromAttributeValue(this.constrainWidth),
      gutter: parseInt(this.gutter, 10),
      hover: getBooleanFromAttributeValue(this.hover),
      inDuration: parseInt(this.inDuration, 10),
      outDuration: parseInt(this.outDuration, 10)
    });
  }

  detached() {
    this.attributeManager.removeAttributes('data-activates');
    this.attributeManager.removeClasses('dropdown-button');
    this.contentAttributeManager.removeClasses('dropdown-content');
  }

  handleActivateElement() {
    if (this.ref) {
      let id = this.ref.getAttribute('id');
      if (!id) {
        id = `md-dropdown-${MdDropdown.elementId++}`;
        this.ref.setAttribute('id', id);
        this.activates = id;
      }
      this.id = MdDropdown.elementId++;
    }
    this.attributeManager.addAttributes({ 'data-activates': this.activates });
  }
}

export class Ui5Element {
    addChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'layout')
            this._input.setLayoutData(child);
    }
    attached()
    {
        
    }
}
@customElement('md-fab')
@inject(Element)
export class MdFab {
  @bindable() mdFixed = false;
  @bindable() mdLarge = false;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.mdFixed = getBooleanFromAttributeValue(this.mdFixed);
    this.mdLarge = getBooleanFromAttributeValue(this.mdLarge);
  }
}

@customElement('ui5-feed-content')
@inject(Element)
export class Ui5FeedContent {
    _content = null;
    @bindable() value = null;
    @bindable() contentText = null;
    @bindable() subheader = null;
    @bindable() valueColor  = null;
    constructor(element) {
        this.element = element;
    }
    attached() {
        this._content = new sap.m.FeedContent({
            value: this.value,
            contentText: this.contentText,
            subheader: this.subheader,
            valueColor: this.valueColor
        });
        $(this.element).parents("ui5-tile-content")[0].au.controller.viewModel.addChild(this._content, this.element);
    }
    detached() {
        $(this.element).parents("ui5-tile-content")[0].au.controller.viewModel.removeChild(this._content, this.element);
    }
    valueChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setValue(newValue);
        }
    }
    valueColorChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setValueColor(newValue);
        }
    }
    contentTextChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setContentText(newValue);
        }
    }
    subheaderChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setSubheader(newValue);
        }
    }
    
}

@customElement('md-file')
@inject(Element)
export class MdFileInput {
  @bindable() mdCaption = 'File';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdMultiple = false;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdLabelValue;
  @bindable() disabled = false;
  files = [];

  _suspendUpdate = false;

  constructor(element) {
    this.element = element;
    this.handleChangeFromNativeInput = this.handleChangeFromNativeInput.bind(this);
  }

  attached() {
    this.mdMultiple = getBooleanFromAttributeValue(this.mdMultiple);
    $(this.filePath).on('change', this.handleChangeFromNativeInput);
  }

  detached() {
    $(this.element).off('change', this.handleChangeFromNativeInput);
  }

  handleChangeFromNativeInput() {
    if (!this._suspendUpdate) {
      this._suspendUpdate = true;
      fireEvent(this.filePath, 'change', { files: this.files });
      fireMaterializeEvent(this.filePath, 'change', { files: this.files });
      this._suspendUpdate = false;
    }
  }
}

@customElement('ui5-form')
@inject(Element)
export class Ui5Form {
  @bindable() ui5Id = null;
  @bindable() width = null;
  @bindable() editable = true;
  @bindable() title = null;
  _form = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'toolbar') {
        this._form.setToolbar(child);
        break;
      }
      if (elem.localName == 'titleElement') {
        this._form.setTitle(child);
        break;
      }
      if (elem.localName == 'layout') {
        this._form.setLayout(child);
        break;
      }
      if (elem.localName == 'container') {
        this._form.addFormContainer(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      editable: getBooleanFromAttributeValue(this.editable),
      width: this.width,
      title: this.title
    };
    if (this.uiId5)
      this._form = new sap.ui.layout.form.Form(this.ui5Id, params);
    else
      this._form = new sap.ui.layout.form.Form(params);

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._form, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._form.placeAt(this.element.parentElement);
      attributeManager.addClasses("ui5-hide");
    }
  }

  editableChanged(newValue) {
    if (this._form !== null) {
      this._form.setEditable(getBooleanFromAttributeValue(newValue));
    }
  }

  widthChanged(newValue) {
    if (this._form !== null) {
      this._form.setWidth(newValue);
    }
  }
  titleChanged(newValue) {
    if (this._form !== null) {
      this._form.setTitle(newValue);
    }
  }

}

@customAttribute('md-footer')
@inject(Element)
export class MdFooter {
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  bind() {
    this.attributeManager.addClasses('page-footer');
  }

  unbind() {
    this.attributeManager.removeClasses('page-footer');
  }
}

@customElement('ui5-form-container')
@inject(Element)
export class Ui5FormContainer {
  @bindable() ui5Id = null;
  @bindable() title = null;
  //TODO: expanded, visible, expandable
  _form = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'toolbar')
        this._form.setToolbar(child);
      if (elem.localName == 'titleElement')
        this._form.setTitle(child);
        if (elem.localName == 'element')
        this._form.addFormElement(child);
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      title: this.title,
    };
    if (this.uiId5)
      this._form = new sap.ui.layout.form.FormContainer(this.ui5Id, params);
    else
      this._form = new sap.ui.layout.form.FormContainer(params);

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._form, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._form.placeAt(this.element.parentElement);
      attributeManager.addClasses("ui5-hide");
    }
  }
  titleChanged(newValue) {
    if (this._form !== null) {
      this._form.setTitle(newValue);
    }
  }
 

}

@customElement('ui5-form-element')
@inject(Element)
export class Ui5FormElement {
  @bindable() ui5Id = null;
  //TODO: expanded, visible, expandable
  _form = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'label')
      {
        this._form.setLabel(child);
        break;
      }
      if (elem.localName == 'field')
      {
        this._form.addField(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
    };
    if (this.uiId5)
      this._form = new sap.ui.layout.form.FormElement(this.ui5Id, params);
    else
      this._form = new sap.ui.layout.form.FormElement(params);

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._form, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._form.placeAt(this.element.parentElement);
      attributeManager.addClasses("ui5-hide");
    }
  }
  titleChanged(newValue) {
    if (this._form !== null) {
      this._form.setTitle(newValue);
    }
  }
 

}

@customElement('ui5-generic-tile')
@inject(Element)
export class Ui5GenericTile {
    _tile = null;
    @bindable() mode = "content";
    @bindable() header = null;
    @bindable() subheader = null;
    @bindable() press = null;
    @bindable() frameType = null;
    constructor(element) {
        this.element = element;
    }
    addChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'content')
            this._tile.addTileContent(child);
    }
    removeChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'content')
            this._tile.removeTileContent(child);
    }
    defaultPress() {

    }
    attached() {
        this._tile = new sap.m.GenericTile(
            {
                header: this.header,
                subheader: this.subheader,
                press: this.press != null ? this.press : this.defaultPress,
                frameType : this.frameType
            }
        );
        this._tile.addStyleClass('sapUiTinyMarginTop');
        this._tile.addStyleClass('sapUiTinyMarginBegin');
        
        $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._tile, this.element);
    }
    detached() {
        $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._tile, this.element);
    }
    headerChanged(newValue) {
        if (this._tile != null) {
            this._tile.setHeader(newValue);
        }
    }
    subheaderChanged(newValue) {
        if (this._tile != null) {
            this._tile.setSubheader(newValue);
        }
    }
    pressChanged(newValue) {
        if (this._tile !== null) {
            this._tile.attachPress(newValue);
        }
    }
    frameTypeChanged(newValue) {
        if (this._tile !== null) {
            this._tile.setFrameType(newValue);
        }
    }
}

@customElement('ui5-grid-data')
@inject(Element)

export class Ui5GridData {
   _gridData = null;
   @bindable() id = null;
   @bindable() span = null;
  
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._gridData = new sap.ui.layout.GridData({
      span : this.span,
    
    }); 
    $(this.element).parents("[ui5-layout]")[0].au.controller.viewModel.addChild(this._gridData,this.element);  
  }
   spanChanged(newValue) {
    if (this._gridData !== null) {
      this._gridData.setSpan(newValue);
    }
  }
  
}

@customElement('ui5-html')
@inject(Element)

export class Ui5Html {
   _html = null;

  constructor(element) {
    this.element = element;
  }

  attached() {

    this._html = new sap.ui.core.HTML(); 
    this._html.setContent(this.content.innerHTML);
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._html,this.element);  
  }
}

@customElement('ui5-icon-tab-bar')
@inject(Element)
export class Ui5IconTabBar {
  _tab = null;
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
  constructor(element) {
    this.element = element;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.addItem(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.removeItem(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._tab = new sap.m.IconTabBar({
      showSelection: getBooleanFromAttributeValue(this.showSelection),
      expandable: getBooleanFromAttributeValue(this.expandable),
      expanded: getBooleanFromAttributeValue(this.expanded),
      selectedKey:this.selectedKey,
      upperCase: getBooleanFromAttributeValue(this.upperCase),
      stretchContentHeight: getBooleanFromAttributeValue(this.stretchContentHeight),
      applyContentPadding: getBooleanFromAttributeValue(this.applyContentPadding),
      backgroundDesign: this.backgroundDesign,
      headerMode:this.headerMode,
      showOverflowSelectList: getBooleanFromAttributeValue(this.showOverflowSelectList),
      headerBackgroundDesign: this.headerBackgroundDesign,
      enableTabReordering: getBooleanFromAttributeValue (this.enableTabReordering)
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._tab, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._tab.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._tab, this.element);
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

@customElement('ui5-icon-tab-filter')
@inject(Element)
export class Ui5IconTabFilter {
  _tab = null;
  @bindable() text = null;
  constructor(element) {
    this.element = element;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.addContent(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.removeContent(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._tab = new sap.m.IconTabFilter({
      text: this.text,
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._tab, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._tab.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._tab, this.element);
    }
    else {
      this._tab.destroy();
    }
  }
  textChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setText(newValue);
    }
  }
  /*TODO: Add change bindings for event handlers */
}

@customElement('ui5-image-content')
@inject(Element)
export class Ui5ImageContent {
    _content = null;
    @bindable() src = null;
    constructor(element) {
        this.element = element;
    }
    attached() {
        this._content = new sap.m.ImageContent({
            src: this.src,
        });
        $(this.element).parents("ui5-tile-content")[0].au.controller.viewModel.addChild(this._content, this.element);
    }
    detached() {
        $(this.element).parents("ui5-tile-content")[0].au.controller.viewModel.removeChild(this._content, this.element);
    }
    srcChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setSrc(newValue);
        }
    }
    
}

@customElement('ui5-input')
@inject(Element)

export class Ui5Input extends Ui5InputBase {
  _input = null;
  @bindable() ui5Id = null;
  @bindable() type = 'Text';
  @bindable() maxLength = 0;
  @bindable() dateFormat = 'YYYY-MM-DD';
  @bindable() showValueHelp = false;
  @bindable() showSuggestion = false;
  @bindable() valueHelpOnly = false;
  @bindable() filterSuggests = true;
  @bindable() maxSuggestionWidth = null;
  @bindable() showTableSuggestionValueHelp = true;
  @bindable() description = null;
  @bindable() fieldWidth = '50%';
  @bindable() valueLiveUpdate = false;
  @bindable() selectedKey = '';
  @bindable() textFormatMode = 'Value';
  @bindable() textFormatter = '';
  @bindable() suggestionRowValidator = '';

  @bindable() suggestionItems = [];
  @bindable() suggestionColumns = [];
  @bindable() suggestionRows = [];
  @bindable() selectedItem = null;
  @bindable() selectedRow = null;

  @bindable() liveChange = this.defaultFunc;
  @bindable() valueHelpRequest = this.defaultFunc;
  @bindable() suggest = this.defaultFunc;
  @bindable() suggestionItemSelected = this.defaultFunc;
  @bindable() submit = this.defaultFunc;

  @bindable() value = null;
  @bindable() width = null;
  @bindable() enabled = true;
  @bindable() valueState = 'None';
  @bindable() name = null;
  @bindable() placeholder = null;
  @bindable() editable = true;
  @bindable() valueStateText = null;
  @bindable() showValueStateMessage = true;
  @bindable() textAlign = 'Initial';
  @bindable() textDirection = 'Inherit';
  @bindable() required = false;

  @bindable() change = this.defaultFunc;
  get UIElement() {
    return this._input;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    super.addChild(child, elem);
    for(elem of path)
    {
      if(elem.localName=='suggestion-item'){
        this._input.addSuggestionItem(child);
        break;
      }
      else if(elem.localName=='suggestion-row'){
        this._input.addSuggestionRow(child);
        break;
      }
    }
  }
  constructor(element) {
    super(element);
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      type: this.type,
      maxLength: this.maxLength,
      dateFormat: this.dateFormat,
      showValueHelp: getBooleanFromAttributeValue(this.showValueHelp),
      showSuggestion: getBooleanFromAttributeValue(this.showSuggestion),
      valueHelpOnly: getBooleanFromAttributeValue(this.valueHelpOnly),
      filterSuggests: getBooleanFromAttributeValue(this.filterSuggests),
      maxSuggestionWidth: this.maxSuggestionWidth,
      showTableSuggestionValueHelp: getBooleanFromAttributeValue(this.showTableSuggestionValueHelp),
      description: this.description,
      fieldWidth: this.fieldWidth,
      valueLiveUpdate: getBooleanFromAttributeValue(this.valueLiveUpdate),
      selectedKey: this.selectedKey,
      textFormatMode: this.textFormatMode,
      suggestionRowValidator: this.suggestionRowValidator,
      suggestionItems: this.suggestionItems,
      suggestionColumns: this.suggestionColumns,
      suggestionRows: this.suggestionRows,
      selectedItem: this.selectedItem,
      selectedRow: this.selectedRow,
      liveChange: this.liveChange,
      suggest: this.suggest,
      valueHelpRequest: this.valueHelpRequest,      
      suggestionItemSelected: this.suggestionItemSelected,
      submit: this.submit,
      value: this.value,
      width: this.width,
      enabled: getBooleanFromAttributeValue(this.enabled),
      valueState: this.valueState,
      name: this.value,
      placeholder: this.placeholder,
      editable: getBooleanFromAttributeValue(this.editable),
      valueStateText: this.valueStateText,
      showValueStateMessage: getBooleanFromAttributeValue(this.showValueStateMessage),
      textAlign: this.textAlign,
      textDirection: this.textDirection,
      required: getBooleanFromAttributeValue(this.required),
      change: this.change
    };
    if (this.ui5Id)
      this._input = new sap.m.Input(this.ui5Id, params);
    else
      this._input = new sap.m.Input(params);
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._input, this.element);
    attributeManager.addAttributes({ "ui5-layout": '' });
    attributeManager.addAttributes({ "ui5-container": '' });
    var that = this;
    this._input.attachChange((event) => {
      that.value = event.mParameters.value;
    });
    this._input.attachLiveChange((event) => {
      if (getBooleanFromAttributeValue(that.valueLiveUpdate)) {
        that.value = event.mParameters.value;
      }
    });
    this._input.addEventDelegate(this.element);
    super.attached();
  }
  typeChanged(newValue) {
    if (this._input !== null) {
      this._input.setType(newValue);
    }
  }
  maxLengthChanged(newValue) {
    if (this._input !== null) {
      this._input.setMaxLength(newValue);
    }
  }
  dateFormatChanged(newValue) {
    if (this._input !== null) {
      this._input.setDateFormat(newValue);
    }
  }
  showValueHelpChanged(newValue) {
    if (this._input !== null) {
      this._input.setShowValueHelp(getBooleanFromAttributeValue(newValue));
    }
  }
  showSuggestionChanged(newValue) {
    if (this._input !== null) {
      this._input.setShowSuggestion(getBooleanFromAttributeValue(newValue));
    }
  }
  valueHelpOnlyChanged(newValue) {
    if (this._input !== null) {
      this._input.setValueHelpOnly(getBooleanFromAttributeValue(newValue));
    }
  }
  filterSuggestsChanged(newValue) {
    if (this._input !== null) {
      this._input.setFilterSuggests(getBooleanFromAttributeValue(newValue));
    }
  }
  maxSuggestionWidthChanged(newValue) {
    if (this._input !== null) {
      this._input.setMaxSuggestionWidth(newValue);
    }
  }
  showTableSuggestionValueHelpChanged(newValue) {
    if (this._input !== null) {
      this._input.setTableSuggestionValueHelp(getBooleanFromAttributeValue(newValue));
    }
  }
  descriptionChanged(newValue) {
    if (this._input !== null) {
      this._input.setDescription(newValue);
    }
  }
  fieldWidthChanged(newValue) {
    if (this._input !== null) {
      this._input.setFieldWidth(newValue);
    }
  }
  valueLiveUpdateChanged(newValue) {
    if (this._input !== null) {
      this._input.setValueLiveUpdate(getBooleanFromAttributeValue(newValue));
    }
  }
  selectedKeyChanged(newValue) {
    if (this._input !== null) {
      this._input.setSelectedKey(newValue);
    }
  }
  textFormatModeChanged(newValue) {
    if (this._input !== null) {
      this._input.setTextFormatMode(newValue);
    }
  }
  textFormatterChanged(newValue) {
    if (this._input !== null) {
      this._input.setTextFormatter(newValue);
    }
  }
  suggestionRowValidatorChanged(newValue) {
    if (this._input !== null) {
      this._input.setSuggestionsRowValidator(newValue);
    }
  }
  suggestionItemsChanged(newValue) {
    //TODO: Need to add and remove values separately
    if (this._input !== null) {
      this._input.setSuggestionsItems(newValue);
    }
  }
  suggestionColumnsChanged(newValue) {
    //TODO: Need to add and remove values separately
    if (this._input !== null) {
      this._input.setSuggestionsRowValidator(newValue);
    }
  }
  suggestionRowsChanged(newValue) {
    //TODO: Need to add and remove values separately
    if (this._input !== null) {
      this._input.setSuggestionsRowValidator(newValue);
    }
  }
  selectedItemChanged(newValue) {
    if (this._input !== null) {
      this._input.setSelectedItem(newValue);
    }
  }
  selectedRowChanged(newValue) {
    if (this._input !== null) {
      this._input.setSelectedRow(newValue);
    }
  }
  liveChangeChanged(newValue) {
    if (this._input !== null) {
      this._input.attachLiveChange(newValue);
    }
  }
  valueHelpRequestChanged(newValue) {
    if (this._input !== null) {
      this._input.attachValueHelpRequest(newValue);
    }
  }
  suggestChanged(newValue) {
    if (this._input !== null) {
      this._input.attachSuggest(newValue);
    }
  }
  suggestionItemSelectedChanged(newValue) {
    if (this._input !== null) {
      this._input.attachSuggestionItemSelected(newValue);
    }
  }
  submitChanged(newValue) {
    if (this._input !== null) {
      this._input.attachSubmit(newValue);
    }
  }
  valueChanged(newValue) {
    if (this._input !== null) {
      this._input.setValue(newValue);
    }
  }
  widthChanged(newValue) {
    if (this._input !== null) {
      this._input.setWidth(newValue);
    }
  }
  enabledChanged(newValue) {
    if (this._input !== null) {
      this._input.setEnabled(getBooleanFromAttributeValue(newValue));
    }
  }
  valueStateChanged(newValue) {
    if (this._input !== null) {
      this._input.setValueState(newValue);
    }
  }
  nameChanged(newValue) {
    if (this._input !== null) {
      this._input.setName(newValue);
    }
  }
  placeholderChanged(newValue) {
    if (this._input !== null) {
      this._input.setPlaceholder(newValue);
    }
  }
  editableChanged(newValue) {
    if (this._input !== null) {
      this._input.setEditable(getBooleanFromAttributeValue(newValue));
    }
  }
  valueStateTextChanged(newValue) {
    if (this._input !== null) {
      this._input.setValueStateText(newValue);
    }
  }
  showValueStateMessageChanged(newValue) {
    if (this._input !== null) {
      this._input.setShowValueStateMessage(getBooleanFromAttributeValue(newValue));
    }
  }
  textAlignChanged(newValue) {
    if (this._input !== null) {
      this._input.setTextAlign(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._input !== null) {
      this._input.setTextDirection(newValue);
    }
  }
  requiredChanged(newValue) {
    if (this._input !== null) {
      this._input.setRequired(getBooleanFromAttributeValue(newValue));
    }
  }
  changeChanged(newValue) {
    if (this._input !== null) {
      this._input.attachChange(newValue);
    }
  }
}

@customElement('ui5-input-base')
@inject(Element)

export class Ui5InputBase extends Ui5Control {
  _picker = null;

  @bindable() value = null;
  @bindable() width = null;
  @bindable() enabled = true;
  @bindable() valueState = 'None';
  @bindable() name = null;
  @bindable() placeholder = null;
  @bindable() editable = true;
  @bindable() valueStateText = null;
  @bindable() showValueStateMessage = true;
  @bindable() textAlign = 'Initial';
  @bindable() textDirection = 'Inherit';
  @bindable() required = false;

  @bindable() change = this.defaultFunc;

  constructor(element) {
    super(element);
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    super.attached();
  }
  addChild(child, elem) {
    super.addChild(child, elem);
  }
  valueChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValue(newValue);
    }
  }
  widthChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setWidth(newValue);
    }
  }
  enabledChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setEnabled(getBooleanFromAttributeValue(newValue));
    }
  }
  valueStateChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValueState(newValue);
    }
  }
  nameChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setName(newValue);
    }
  }
  placeholderChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setPlaceholder(newValue);
    }
  }
  editableChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setEditable(getBooleanFromAttributeValue(newValue));
    }
  }
  valueStateTextChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setValueStateText(newValue);
    }
  }
  showValueStateMessageChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setShowValueStateMessage(getBooleanFromAttributeValue(newValue));
    }
  }
  textAlignChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setTextAlign(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setTextDirection(newValue);
    }
  }
  requiredChanged(newValue) {
    if (this._picker !== null) {
      this._picker.setRequired(getBooleanFromAttributeValue(newValue));
    }
  }
  changeChanged(newValue) {
    if (this._picker !== null) {
      this._picker.attachChange(newValue);
    }
  }
}

@customElement('ui5-item')
@inject(Element)

export class Ui5Item{
  _item = null;

  @bindable() key = null;
  @bindable() enabled = true;
  @bindable() text =null;
  @bindable() textDirection = null;
  
  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
  }
  addChild(child, elem) {
  }
  keyChanged(newValue) {
    if (this._item !== null) {
      this._item.setKey(newValue);
    }
  }
  enabledChanged(newValue) {
    if (this._item !== null) {
      this._item.setEnabled(getBooleanFromAttributeValue(newValue));
    }
  }
  textChanged(newValue) {
    if (this._item !== null) {
      this._item.setText(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._item !== null) {
      this._item.setTextDirection(newValue);
    }
  }
  
}

@customElement('ui5-label')
@inject(Element)

export class Ui5Label {
   _label = null;
   @bindable() ui5Id = null;
   @bindable() labelFor = null;
   @bindable() text = null;
   @bindable() required = false;
   @bindable() textAlign = "Begin";
   @bindable() textDirection = null;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._label = new sap.m.Label({
      text : this.text,
      labelFor: this.labelFor,
      required : getBooleanFromAttributeValue(this.required),
      textAlign : this.textAlign,  
      textDirection : this.textDirection
    }); 
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._label,this.element);  
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
}

@customElement('ui5-list-item')
@inject(Element)

export class Ui5ListItem {
  _item = null;

  @bindable() icon = null;
  @bindable() additionalText = null;
  /* inherited from list item*/
  @bindable() key = null;
  @bindable() enabled = true;
  @bindable() text = null;
  @bindable() textDirection = null;
  /* inherited from list item*/

  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    this._item = new sap.ui.core.ListItem({
      text: this.text,
      icon: this.icon,
      enabled: getBooleanFromAttributeValue(this.enabled),
      additionalText: this.additionalText,
      textDirection: this.textDirection,
      key: this.key
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._item, this.element);
  }
  addChild(child, elem) {
  }
  iconChanged(newValue) {
    if (this._item !== null) {
      this._item.setIcon(newValue);
    }
  }
  additionalTextChanged(newValue) {
    if (this._item !== null) {
      this._item.setAdditionalText(newValue);
    }
  }
   keyChanged(newValue) {
     if (this._item !== null) {
       this._item.setKey(newValue);
     }
   }
   enabledChanged(newValue) {
     if (this._item !== null) {
       this._item.setEnabled(getBooleanFromAttributeValue(newValue));
     }
   }
   textChanged(newValue) {
     if (this._item !== null) {
       this._item.setText(newValue);
     }
   }
   textDirectionChanged(newValue) {
     if (this._item !== null) {
       this._item.setTextDirection(newValue);
     }
   }

}

@customElement('ui5-message-strip')
@inject(Element)

export class Ui5MessageStrip {
  _text = null;
  @bindable ui5Id = null;
  @bindable text = null;
  @bindable wrapping = true;
  @bindable textAlign = "Begin";
  @bindable maxLines = null;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._text = new sap.m.Text({
      text: this.text,
      wrapping: getBooleanFromAttributeValue(this.wrapping),
      textAlign: this.textAlign,
      maxLines: this.maxLines
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._text, this.element);
  }
  textChanged(newValue) {
    if (this._text != null) {
      this._text.setText(newValue);
    }
  }
}

@customElement('ui5-m-title')
@inject(Element)

export class Ui5MTitle {
  _title = null;
  @bindable() text = null;
  @bindable() icon = null;
  @bindable() level = 'Auto';
  @bindable() emphasized = false;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._title = new sap.m.Title({
      text: this.text,
      icon: this.icon,
      emphasized: getBooleanFromAttributeValue(this.emphasized),
      level: this.level,
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._title, this.element);
  }
  textChanged(newValue) {
    if (this._title != null) {
      this._title.setText(newValue);
    }
  }
  iconChanged(newValue) {
    if (this._title != null) {
      this._title.setIcon(newValue);
    }
  }
   levelChanged(newValue) {
    if (this._title != null) {
      this._title.setLevel(newValue);
    }
  }
   emphasizedChanged(newValue) {
    if (this._title != null) {
      this._title.setEmphasized(getBooleanFromAttributeValue(newValue));
    }
  }
}

@customElement('ui5-grid')
@inject(Element)
export class Ui5Grid {
    _grid = null;
    @bindable() defaultSpan = null;
    constructor(element) {
        this.element = element;
    }
    addChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'content')
            this._grid.addContent(child);
    }
    removeChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'content')
            this._grid.removeContent(child);
    }
    defaultPress() {

    }
    attached() {
        this._grid = new sap.ui.layout.Grid(
            {
                defaultSpan: this.defaultSpan,
            }
        );
        $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._grid, this.element);
    }
    detached() {
        $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._grid, this.element);
    }
    defaultSpanChanged(newValue) {
        if (this._grid != null) {
            this._grid.setDefaultSpan(newValue);
        }
    }
    
}

@customAttribute('md-modal-trigger')
@inject(Element)
export class MdModalTrigger {
  @bindable() dismissible = true;

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
    this.onComplete = this.onComplete.bind(this);
  }

  attached() {
    this.attributeManager.addClasses('modal-trigger');
    $(this.element).leanModal({
      complete: this.onComplete,
      dismissible: getBooleanFromAttributeValue(this.dismissible)
    });
  }

  detached() {
    this.attributeManager.removeClasses('modal-trigger');
  }

  onComplete() {
    fireMaterializeEvent(this.element, 'modal-complete');
  }
}

@customAttribute('md-modal')
@inject(Element)
export class MdModal {
  @bindable() dismissible = true;
  @bindable() opacity = 0.5; // Opacity of modal background
  @bindable() inDuration = 300; // Transition in duration
  @bindable() outDuration = 200; // Transition out duration
  @bindable() startingTop = '4%'; // Starting top style attribute
  @bindable() endingTop = '10%'; // Ending top style attribute

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
    this.onComplete = this.onComplete.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  attached() {
    this.attributeManager.addClasses('modal');
    $(this.element).modal({
      complete: this.onComplete,
      dismissible: getBooleanFromAttributeValue(this.dismissible),
      endingTop: this.endingTop,
      inDuration: parseInt(this.inDuration, 10),
      opacity: parseFloat(this.opacity),
      outDuration: parseInt(this.outDuration, 10),
      ready: this.onReady,
      startingTop: this.startingTop
    });
  }

  detached() {
    this.attributeManager.removeClasses('modal');
  }

  onComplete() {
    fireMaterializeEvent(this.element, 'modal-complete');
  }

  onReady(modal, trigger) {
    fireMaterializeEvent(this.element, 'modal-ready', { modal, trigger });
  }

  open() {
    $(this.element).modal('open');
  }

  close() {
    $(this.element).modal('close');
  }
}

@customElement('md-navbar')
@inject(Element)
export class MdNavbar {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdFixed;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdAutoHeight;
  fixedAttributeManager;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.fixedAttributeManager = new AttributeManager(this.fixedAnchor);
    this.navAttributeManager = new AttributeManager(this.nav);
    if (getBooleanFromAttributeValue(this.mdFixed)) {
      this.fixedAttributeManager.addClasses('navbar-fixed');
    }
    if (getBooleanFromAttributeValue(this.mdAutoHeight)) {
      this.navAttributeManager.addClasses('md-auto-height');
    }
  }

  detached() {
    if (getBooleanFromAttributeValue(this.mdFixed)) {
      this.fixedAttributeManager.removeClasses('navbar-fixed');
    }
    if (getBooleanFromAttributeValue(this.mdAutoHeight)) {
      this.navAttributeManager.addClasses('md-auto-height');
    }
  }
}

@customElement('ui5-numeric-content')
@inject(Element)
export class Ui5NumericContent {
    _content = null;
    @bindable() icon = null;
    @bindable() value = null;
    @bindable() indicator = null;
    @bindable() scale = null;
    @bindable() valueColor = null;
    constructor(element) {
        this.element = element;
    }
    attached() {
        this._content = new sap.m.NumericContent({
            icon: this.icon,
            value: this.value,
            indicator: this.indicator,
            scale : this.scale,
            valueColor : this.valueColor
        });
        $(this.element).parents("ui5-tile-content")[0].au.controller.viewModel.addChild(this._content, this.element);
    }
    detached() {
        $(this.element).parents("ui5-tile-content")[0].au.controller.viewModel.removeChild(this._content, this.element);
    }
    iconChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setIcon(newValue);
        }
    }
    valueChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setValue(newValue);
        }
    }
    indicatorChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setIndicator(newValue);
        }
    }
    scaleChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setScale(newValue);
        }
    }
    valueColorChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setValueColor(newValue);
        }
    }
    
}

@customElement('ui5-object-number')
@inject(Element)

export class Ui5ObjectNumber {
  _number = null;
  @bindable ui5Id = null;
  @bindable() number = null;
  @bindable() numberUnit = null;
  @bindable() emphasized = null;
  @bindable() state = null;
  @bindable() unit = null;
  @bindable() textDirection = 'Inherit';
  @bindable() textAlign = 'Begin';

  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {

    this._number = new sap.m.ObjectNumber({
      number: this.number != null ? this.number : this.element.innerText.trim(),
      numberUnit : this.numberUnit,
      emphasized: getBooleanFromAttributeValue(this.emphasized),
      state: this.state,
      unit:this.unit,
      textDirection: this.textDirection,
      textAlign: this.textAlign
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._number, this.element);
  }
  numberChanged(newValue) {
    if (this._number != null) {
      this._number.setNumber(newValue);
    }
  }
  numberUnitChanged(newValue) {
    if (this._number !== null) {
      this._number.setNumberUnit(newValue);
    }
  }
  emphasizedChanged(newValue) {
    if (this._number !== null) {
      this._number.setEmphasized(getBooleanFromAttributeValue(newValue));
    }
  }
  stateChanged(newValue) {
    if (this._number !== null) {
      this._number.setState(newValue);
    }
  }
  unitChanged(newValue) {
    if (this._number !== null) {
      this._number.setUnit(newValue);
    }
  }
  textAlignChanged(newValue) {
    if (this._number !== null) {
      this._number.setTextAlign(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._number !== null) {
      this._number.setTextDirection(newValue);
    }
  }
}

@customElement('ui5-object-identifier')
@inject(Element)

export class Ui5ObjectIdentifier {
  _text = null;
  @bindable ui5Id = null;
  @bindable text = null;
  @bindable() title = null;
  @bindable() visible = true;
  @bindable() titleActive = false;
  @bindable() textDirection = 'Inherit';
  @bindable() titlePress = this.defaultFunc;

  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {

    this._text = new sap.m.ObjectIdentifier({
      text: this.text != null ? this.text : this.element.innerText.trim(),
      title : this.title,
      visible: getBooleanFromAttributeValue(this.visible),
      titleActive: getBooleanFromAttributeValue(this.titleActive),
      textDirection: this.textDirection,
      titlePress: this.titlePress
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._text, this.element);
  }
  textChanged(newValue) {
    if (this._text != null) {
      this._text.setText(newValue);
    }
  }
  titleChanged(newValue) {
    if (this._text !== null) {
      this._text.setTitle(newValue);
    }
  }
  visibleChanged(newValue) {
    if (this._text !== null) {
      this._text.setVisible(getBooleanFromAttributeValue(newValue));
    }
  }
  titleActiveChanged(newValue) {
    if (this._text !== null) {
      this._text.setTitleActive(getBooleanFromAttributeValue(newValue));
    }
  }
  textDirectionChanged(newValue) {
    if (this._text !== null) {
      this._text.setTextDirection(newValue);
    }
  }
}

@customElement('ui5-overflow-toolbar')
@inject(Element)
export class Ui5OverflowToolbar {
  _bar = null;

  @bindable() width = null;
  @bindable() active = false;
  @bindable() enabled = true;
  @bindable() height = null;
  @bindable() design = null;
  @bindable() press = this.defaultFunc;
  constructor(element) {
    this.element = element;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._bar.addContent(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._bar.removeContent(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._bar = new sap.m.OverflowToolbar({
      width: this.width,
      enabled: getBooleanFromAttributeValue(this.enabled),
      active: getBooleanFromAttributeValue(this.active),
      height: this.height,
      design: this.design,
      press: this.press
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._bar, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._bar.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._bar, this.element);
    }
    else {
      this._bar.destroy();
    }
  }
  widthChanged(newValue) {
    if (this._bar !== null) {
      this._bar.setWidth(newValue);
    }
  }
  enabledChanged(newValue) {
    if (this._bar !== null) {
      this._bar.setEnabled(getBooleanFromAttributeValue(newValue));
    }
  }
  activeChanged(newValue) {
    if (this._bar !== null) {
      this._bar.setActive(getBooleanFromAttributeValue(newValue));
    }
  }
  heightChanged(newValue) {
    if (this._bar !== null) {
      this._bar.setHeight(newValue);
    }
  }
  designChanged(newValue) {
    if (this._bar !== null) {
      this._bar.setDesign(newValue);
    }
  }
  pressChanged(newValue) {
    if (this._bar !== null) {
      this._bar.setPress(newValue);
    }
  }
}

@customElement('md-pagination')
@inject(Element)
export class MdPagination {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdActivePage = 1;
  @bindable({
    defaultBindingMode: bindingMode.oneWay
  }) mdPages = 5;
  @bindable({
    defaultBindingMode: bindingMode.oneWay
  }) mdVisiblePageLinks = 15;
  @bindable({
    defaultBindingMode: bindingMode.oneWay
  }) mdPageLinks = [];
  @bindable() mdShowFirstLast = true;
  @bindable() mdShowPrevNext = true;
  @bindable() mdShowPageLinks = true;

  // local variables to stop Changed events when parsing to int
  numberOfLinks = 15;
  pages = 5;

  constructor(element) {
    this.element = element;
  }

  bind() {
    // attached() throws unhandled exceptions
    this.pages = parseInt(this.mdPages, 10);
    // We don't want mdVisiblePageLinks to be greater than mdPages
    this.numberOfLinks = Math.min(parseInt(this.mdVisiblePageLinks, 10), this.pages);
    this.mdShowFirstLast = getBooleanFromAttributeValue(this.mdShowFirstLast);
    this.mdShowPrevNext = getBooleanFromAttributeValue(this.mdShowPrevNext);
    this.mdPageLinks = this.generatePageLinks();
  }

  setActivePage(page) {
    this.mdActivePage = parseInt(page, 10);
    this.mdPageLinks = this.generatePageLinks();
    fireMaterializeEvent(this.element, 'page-changed', this.mdActivePage);
  }

  setFirstPage() {
    if (this.mdActivePage > 1) {
      this.setActivePage(1);
    }
  }

  setLastPage() {
    if (this.mdActivePage < this.pages) {
      this.setActivePage(this.pages);
    }
  }

  setPreviousPage() {
    if (this.mdActivePage > 1) {
      this.setActivePage(this.mdActivePage - 1);
    }
  }

  setNextPage() {
    if (this.mdActivePage < this.pages) {
      this.setActivePage(this.mdActivePage + 1);
    }
  }

  mdPagesChanged() {
    this.pages = parseInt(this.mdPages, 10);
    this.numberOfLinks = Math.min(parseInt(this.mdVisiblePageLinks, 10), this.pages);
    this.setActivePage(1);
  }

  mdVisiblePageLinksChanged() {
    this.numberOfLinks = Math.min(parseInt(this.mdVisiblePageLinks, 10), this.pages);
    this.mdPageLinks = this.generatePageLinks();
  }

  generatePageLinks() {
    let midPoint = parseInt((this.numberOfLinks / 2), 10);
    let start = Math.max(this.mdActivePage - midPoint, 0);
    // respect visible links
    if (start + midPoint * 2 > this.pages) start = this.pages - midPoint * 2;
    let end = Math.min(start + this.numberOfLinks, this.pages);

    let list = [];
    for (let i = start; i < end; i++) {
      list.push(i);
    }

    return list;
  }
}

@customAttribute('md-parallax')
@inject(Element)
export class MdParallax {
  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.element).parallax();
  }

  detached() {
    // destroy handler not available
  }
}

@customElement('md-progress')
@inject(Element)
export class MdProgress {
  @bindable() mdColor = null;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdPixelSize = null;
  @bindable() mdSize = 'big';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdType = 'linear';
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdValue = null;

  constructor(element) {
    this.element = element;
  }

  // mdValueChanged(newValue, oldValue) {
  //   console.log('mdValueChanged, newValue:', JSON.stringify(newValue), 'oldValue:', JSON.stringify(oldValue));
  // }

  bind() {
    // This disables property changed callbacks for any bindable properties during initialization
    // Prevents mdPixelSize getting cleared by the mdSizeChanged event during binding
  }

  attached() {
    this.mdPixelSizeChanged(this.mdPixelSize);
  }

  mdSizeChanged(newValue) {
    this.mdPixelSize = null;
  }

  mdPixelSizeChanged(newValue) {
    if (this.wrapper) {
      newValue = (newValue === null || newValue === '' || isNaN(newValue)) ? '' : `${newValue}px`;
      this.wrapper.style.height = newValue;
      this.wrapper.style.width = newValue;
    }
  }
}

@customAttribute('md-pushpin')
@inject(Element)
export class MdPushpin {
  @bindable() bottom = Infinity;
  @bindable() offset = 0;
  @bindable() top = 0;

  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.element).pushpin({
      bottom: (this.bottom === Infinity ? Infinity : parseInt(this.bottom, 10)),
      offset: parseInt(this.offset, 10),
      top: parseInt(this.top, 10)
    });
  }

  detached() {
    // destroy handler not available
  }
}

@customElement('md-radio')
@inject(Element)
export class MdRadio {
  static id = 0;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdChecked;
  @bindable() mdDisabled = false;
  @bindable() mdGap = false;
  @bindable() mdModel;
  @bindable() mdName = '';
  @bindable() mdValue = '';

  constructor(element) {
    this.element = element;
    this.controlId = `md-radio-${MdRadio.id++}`;
    // this.handleChange = this.handleChange.bind(this);
  }

  attached() {
    this.attributeManager = new AttributeManager(this.radio);
    if (getBooleanFromAttributeValue(this.mdGap)) {
      this.attributeManager.addClasses('with-gap');
    }
    if (getBooleanFromAttributeValue(this.mdDisabled)) {
      this.radio.disabled = true;
    }
    // this.radio.checked = getBooleanFromAttributeValue(this.mdChecked);
    // this.radio.addEventListener('change', this.handleChange);
  }

  detached() {
    this.attributeManager.removeClasses(['with-gap', 'disabled']);
    // this.radio.removeEventListener('change', this.handleChange);
  }

  // handleChange() {
  //   this.mdChecked = this.radio.checked;
  // }

  // mdCheckedChanged(newValue) {
  //   if (this.radio) {
  //     this.radio.checked = !!newValue;
  //   }
  // }

  mdDisabledChanged(newValue) {
    if (this.radio) {
      this.radio.disabled = !!newValue;
    }
  }
}

@customElement('md-range')
@inject(Element)
export class MdRange {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdMin = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdMax = 100;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdStep = 1;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdValue = 0;

  constructor(element) {
    this.element = element;
    this.log = getLogger('md-range');
  }
}

@customElement('ui5-page')
@inject(Element)
export class Ui5Page {
  @bindable() title = '';
  @bindable() showHeader = true;
  @bindable() showFooter = true;
  @bindable() showNavButton = false;
  _page = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'subheader')
      this._page.setSubHeader(child);
    if (path[0].localName == 'content')
      this._page.addContent(child);
    if (path[0].localName == 'footer')
      this._page.setFooter(child);
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'subheader')
      this._page.setSubHeader(child);
    if (path[0].localName == 'content')
      this._page.removeContent(child);
    if (path[0].localName == 'footer')
      this._page.setFooter(child);
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var page = new sap.m.Page({
      title: this.title,
      showHeader: getBooleanFromAttributeValue(this.showHeader),
      showFooter: getBooleanFromAttributeValue(this.showFooter),
      showNavButton: getBooleanFromAttributeValue(this.showNavButton)
    });
    this._page = page;

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._page, this.element);
       attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._page.placeAt(this.element.parentElement);
       attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached()
  {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._page, this.element);
    }
    else {
      this._page.destroy();
    }
  }
  titleChanged(newValue) {
    if (this._page !== null) {
      this._page.setTitle(newValue);
    }
  }
  showHeaderChanged(newValue) {
    if (this._page !== null) {
      this._page.setShowHeader(getBooleanFromAttributeValue(newValue));
    }
  }
  showFooterChanged(newValue) {
    if (this._page !== null) {
      this._page.setShowFooter(getBooleanFromAttributeValue(newValue));
    }
  }
  showNavButtonChanged(newValue) {
    if (this._page !== null) {
      this._page.setShowNavButton(getBooleanFromAttributeValue(newValue));
    }
  }
}

@customElement('ui5-responsive-grid-layout')
@inject(Element)
export class Ui5ResponsiveGridLayout {
  @bindable() ui5Id = null;

  @bindable() labelSpanXL = -1;
  @bindable() labelSpanL = 4;
  @bindable() labelSpanM = 2;
  @bindable() labelSpanS = 12;
  @bindable() adjustLabelSpan = true;
  @bindable() emptySpanXL = -1;
  @bindable() emptySpanL = 0;
  @bindable() emptySpanM = 0;
  @bindable() emptySpanS = 0;
  @bindable() singleContainerFullSize = false;
  @bindable() breakpointXL = 1440;
  @bindable() breakpointL = 1024;
  @bindable() breakpointM = 600;

  _form = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
   
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
     
      labelSpanXL: parseInt(this.labelSpanXL),
      labelSpanL: parseInt(this.labelSpanL),
      labelSpanM: parseInt(this.labelSpanM),
      labelSpanS: parseInt(this.labelSpanS),
      adjustLabelSpan: getBooleanFromAttributeValue(this.adjustLabelSpan),
      emptySpanXL: parseInt(this.emptySpanXL),
      emptySpanL: parseInt(this.emptySpanL),
      emptySpanM: parseInt(this.emptySpanM),
      emptySpanS: parseInt(this.emptySpanS),
      singleContainerFullSize: getBooleanFromAttributeValue(this.singleContainerFullSize),
      breakpointXL: parseInt(this.breakpointXL),
      breakpointL: parseInt(this.breakpointL),
      breakpointM: parseInt(this.breakpointM),

    };
    if (this.uiId5)
      this._form = new sap.ui.layout.form.ResponsiveGridLayout(this.ui5Id, params);
    else
      this._form = new sap.ui.layout.form.ResponsiveGridLayout(params);

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._form, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._form.placeAt(this.element.parentElement);
      attributeManager.addClasses("ui5-hide");
    }
  }
 

}

/* eslint no-new-func:0 */
export class ScrollfirePatch {
  static patched = false;

  patch() {
    if (!ScrollfirePatch.patched) {
      ScrollfirePatch.patched = true;

      window.Materialize.scrollFire = function(options) {
        let didScroll = false;
        window.addEventListener('scroll', function() {
          didScroll = true;
        });

        // Rate limit to 100ms
        setInterval(function() {
          if (didScroll) {
            didScroll = false;

            let windowScroll = window.pageYOffset + window.innerHeight;
            for (let i = 0; i < options.length; i++) {
              // Get options from each line
              let value = options[i];
              let selector = value.selector;
              let offset = value.offset;
              let callback = value.callback;

              let currentElement = document.querySelector(selector);
              if ( currentElement !== null) {
                let elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

                if (windowScroll > (elementOffset + offset)) {
                  if (value.done !== true) {
                    if (typeof(callback) === 'string') {
                      let callbackFunc = new Function(callback);
                      callbackFunc();
                    } else if (typeof(callback) === 'function') {
                      callback();
                    }
                    value.done = true;
                  }
                }
              }
            }
          }
        }, 100);
      };
    }
  }
}

@customAttribute('md-scrollfire-target')
@inject(Element)
export class MdScrollfireTarget {
  @bindable() callback = null;
  @bindable() offset = 0;
  constructor(element) {
    this.element = element;
  }
}

@customAttribute('md-scrollfire')
@inject(Element)
export class MdScrollfire {
  targetId = 0;
  constructor(element) {
    this.element = element;
    this.log = getLogger('md-scrollfire');
  }

  attached() {
    let targets = $('[md-scrollfire-target]', this.element);
    if (targets.length > 0) {
      this.log.debug('targets', targets);
      let self = this;
      let options = [];
      targets.each((i, el) => {
        let target = $(el);
        if (!target.attr('id')) {
          target.attr('id', `md-scrollfire-target-${self.targetId++}`);
        }
        options.push({
          selector: '#' + target.attr('id'),
          callback: target.get(0).au['md-scrollfire-target'].viewModel.callback,
          offset: parseInt(target.get(0).au['md-scrollfire-target'].viewModel.offset, 10)
        });
      });
      if (options.length > 0) {
        this.log.debug('configuring scrollFire with these options:', options);
        Materialize.scrollFire(options);
      }
    }
  }
}

@customAttribute('md-collapsible')
@bindable({ name: 'accordion', defaultValue: false })
@bindable({ name: 'popout', defaultValue: false })
@bindable({ name: 'onOpen' })
@bindable({ name: 'onClose' })
@inject(Element, EventAggregator)
export class MdCollapsible {
  constructor(element, eventAggregator) {
    this.element = element;
    this.eventAggregator = eventAggregator;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.attributeManager.addClasses('collapsible');
    if (getBooleanFromAttributeValue(this.popout)) {
      this.attributeManager.addClasses('popout');
    }
    this.refresh();
  }

  detached() {
    this.attributeManager.removeClasses(['collapsible', 'popout']);
    this.attributeManager.removeAttributes(['data-collapsible']);
  }

  refresh() {
    let accordion = getBooleanFromAttributeValue(this.accordion);
    let dataCollapsibleAttributeValue = accordion ? 'accordion' : 'expandable';

    this.attributeManager.addAttributes({ 'data-collapsible': dataCollapsibleAttributeValue });

    $(this.element).collapsible({
      accordion,
      onOpen: this.buildCollapsibleOpenCloseCallbackHandler(this.onOpen),
      onClose: this.buildCollapsibleOpenCloseCallbackHandler(this.onClose)
    });
  }

  accordionChanged() {
    this.refresh();
  }

  buildCollapsibleOpenCloseCallbackHandler(handler) {
    return typeof(handler) === 'function' ?
     (targetElementJquery) => {
       let targetElement = targetElementJquery[0];

       handler(targetElement);
     } : null;
  }
}

@customAttribute('md-scrollspy')
@inject(Element)
export class MdScrollSpy {
  @bindable() target;
  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.target, this.element).scrollSpy();
  }

  detached() {
    // destroy handler not available
  }
}

/* eslint-disable */
// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeBlendConvert(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    // if(!this.sbcRip)this.sbcRip=function(d){
    let sbcRip=function(d){
        var l=d.length,RGB=new Object();
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            switch(l){case 8:case 6:case 3:case 2:case 1:return null;} //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
        }
        return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}
/* eslint-enable */

export class DarkenValueConverter {
  toView(value, steps) {
    return shadeBlendConvert(-0.3 * parseFloat(steps, 10), value);
  }
}

export class LightenValueConverter {
  toView(value, steps) {
    return shadeBlendConvert(0.3 * parseFloat(steps, 10), value);
  }
}

export class MdColors {
  @bindable() mdPrimaryColor;
  @bindable() mdAccentColor;
  @bindable() mdErrorColor = '#F44336';
  @bindable() mdSuccessColor;
}

@customElement('ui5-select')
@inject(Element)

export class Ui5Select {
  _select = null;
  @bindable() ui5Id = null;

  @bindable() name = null;
  @bindable() width = null;
  @bindable() maxWidth = null;
  @bindable() enabled = true;
  @bindable() selectedKey = null;
  @bindable() selectedItemId = null;
  @bindable() icon = null;
  @bindable() type = null;
  @bindable() autoAdjustWidth = false;
  @bindable() valueState = null;
  @bindable() valueStateText = null;
  @bindable() showSecondaryValues = false;
  @bindable() forceSelection = true;

  @bindable() items = [];

  @bindable() selectedItem = null;

  @bindable() change = this.defaultFunc;
  get UIElement() {
    return this._select;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'item')
        if (this._select.getItems().length == 0) // set key when first item is added
          this.selectedKey = child.mProperties.key;
      this._select.addItem(child);

      break;
    }
  }
  constructor(element) {
    this.element = element;
  }
  defaultFunc() {

  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      name: this.name,
      width: this.width,
      maxWidth: this.maxWidth,
      enabled: getBooleanFromAttributeValue(this.enabled),
      selectedKey: this.selectedKey,
      selectedItemId: this.selectedItemId,
      icon: this.icon,
      type: this.type,
      autoAdjustWidth: getBooleanFromAttributeValue(this.autoAdjustWidth),
      textAlign: this.textAlign,
      textDirection: this.textDirection,
      valueState: this.valueState,
      valueStateText: this.valueStateText,
      showSecondaryValues: getBooleanFromAttributeValue(this.showSecondaryValues),
      forceSelection: getBooleanFromAttributeValue(this.forceSelection),
      items: this.items,
      selectedItem: this.selectedItem,
      change: this.change
    };
    if (this.ui5Id)
      this._select = new sap.m.Select(this.ui5Id, params);
    else
      this._select = new sap.m.Select(params);
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._select, this.element);
    attributeManager.addAttributes({ "ui5-container": '' });
    var that = this;
    this._select.attachChange((event) => {
      that.selectedItem = event.mParameters.selectedItem;
      that.selectedKey = event.mParameters.selectedItem.mProperties.key;
    });

    this._select.addEventDelegate(this.element);
  }
  nameChanged(newValue) {
    if (this._select !== null) {
      this._select.setName(newValue);
    }
  }
  enabledChanged(newValue) {
    if (this._select !== null) {
      this._select.setEnableChanged(getBooleanFromAttributeValue(newValue));
    }
  }
  widthChanged(newValue) {
    if (this._select !== null) {
      this._select.setWidth(newValue);
    }
  }
  maxWidthChanged(newValue) {
    if (this._select !== null) {
      this._select.setMaxWidth(newValue);
    }
  }

  selectedKeyChanged(newValue) {
    if (this._select !== null) {
      this._select.setSelectedKey(newValue);
    }
  }
  selectedItemIdChanged(newValue) {
    if (this._select !== null) {
      this._select.setSelectedItemId(newValue);
    }
  }

  iconChanged(newValue) {
    if (this._select !== null) {
      this._select.setIcon(newValue);
    }
  }

  typeChanged(newValue) {
    if (this._select !== null) {
      this._select.setType(newValue);
    }
  }
  autoAdjustWidthChanged(newValue) {
    if (this._select !== null) {
      this._select.setAutoAdjustWidth(getBooleanFromAttributeValue(newValue));
    }
  }
  textAlignChanged(newValue) {
    if (this._select !== null) {
      this._select.setTextAlign(newValue);
    }
  }
  textDirectionChanged(newValue) {
    if (this._select !== null) {
      this._select.setTextDirection(newValue);
    }
  }
  valueStateChanged(newValue) {
    if (this._select !== null) {
      this._select.setValueState(newValue);
    }
  }
  valueStateTextChanged(newValue) {
    if (this._select !== null) {
      this._select.setValueStateText(newValue);
    }
  }

  showSecondaryValuesChanged(newValue) {
    if (this._select !== null) {
      this._select.setShowSecondaryValues(getBooleanFromAttributeValue(newValue));
    }
  }

  forceSelectionChanged(newValue) {
    if (this._select !== null) {
      this._select.setForceSelection(getBooleanFromAttributeValue(newValue));
    }
  }
}

@customElement('ui5-shell')
@inject(Element)
export class Ui5Shell {
  @bindable() title = '';
  @bindable() appWidthLimited = true;
  _shell = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._shell.setApp(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var shell = new sap.m.Shell({
      title: this.title,
      appWidthLimited: getBooleanFromAttributeValue(this.appWidthLimited),

    });
    this._shell = shell;

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._shell, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._shell.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._shell, this.element);
    }
    else {
      this._shell.destroy();
    }
  }
  titleChanged(newValue) {
    if (this._shell !== null) {
      this._shell.setTitle(newValue);
    }
  }
  appWidthLimitedChanged(newValue) {
    if (this._shell !== null) {
      this._shell.setAppWidthLimited(getBooleanFromAttributeValue(newValue));
    }
  }

}

@customAttribute('md-sidenav-collapse')
@inject(Element, ObserverLocator)
export class MdSidenavCollapse {
  @bindable() ref;
  constructor(element, observerLocator) {
    this.element = element;
    this.observerLocator = observerLocator;
    this.log = getLogger('md-sidenav-collapse');
  }

  attached() {
    this.ref.whenAttached.then(() => {
      // this.widthSubscription = this.observerLocator.getObserver(this.ref, 'mdWidth').subscribe(this.widthChanged.bind(this));
      // this.fixedSubscription = this.observerLocator.getObserver(this.ref, 'fixed').subscribe(this.fixedChanged.bind(this));

      const closeOnClick = this.ref.mdFixed && window.innerWidth > 992 ? false : getBooleanFromAttributeValue(this.ref.mdCloseOnClick);

      this.element.setAttribute('data-activates', this.ref.controlId);
      let sideNavConfig = {
        edge: this.ref.mdEdge || 'left',
        // closeOnClick: (this.ref.mdFixed ? false : getBooleanFromAttributeValue(this.ref.mdCloseOnClick)),
        closeOnClick,
        menuWidth: parseInt(this.ref.mdWidth, 10)
      };
      // this.log.debug('sideNavConfig:', sideNavConfig);
      $(this.element).sideNav(sideNavConfig);
    });
  }

  detached() {
    // this.widthSubscription.unsubscribe();
  }

  show() {
    $(this.element).sideNav('show');
  }

  hide() {
    $(this.element).sideNav('hide');
  }

  // fixedChanged() {
  //   this.log.debug('fixedChanged');
  //   $(this.element).sideNav({
  //     edge: this.ref.edge || 'left',
  //     closeOnClick: this.ref.closeOnClick,
  //     menuWidth: parseInt(this.ref.mdWidth, 10)
  //   });
  // }
  //
  // widthChanged() {
  //   this.log.debug('widthChanged');
  //   $(this.element).sideNav({
  //     edge: this.ref.edge || 'left',
  //     closeOnClick: this.ref.closeOnClick,
  //     menuWidth: parseInt(this.ref.mdWidth, 10)
  //   });
  // }
}

@customElement('md-sidenav')
@inject(Element)
export class MdSidenav {
  static id = 0;
  @bindable() mdCloseOnClick = false;
  @bindable() mdEdge = 'left';
  @bindable() mdFixed = false;
  @bindable() mdWidth = 300;

  attachedResolver;
  whenAttached;

  constructor(element) {
    this.element = element;
    this.controlId = `md-sidenav-${MdSidenav.id++}`;
    this.log = getLogger('md-sidenav');
    this.whenAttached = new Promise((resolve, reject) => {
      this.attachedResolver = resolve;
    });
  }

  attached() {
    this.attributeManager = new AttributeManager(this.sidenav);
    if (getBooleanFromAttributeValue(this.mdFixed)) {
      this.attributeManager.addClasses('fixed');
      if (this.mdEdge === 'right') {
        // see: https://github.com/aurelia-ui-toolkits/aurelia-materialize-bridge/issues/53
        this.attributeManager.addClasses('right-aligned');
      }
    }

    this.attachedResolver();
  }

  detached() {
    this.attributeManager.removeClasses(['fixed', 'right-aligned']);
  }

  mdFixedChanged(newValue) {
    if (this.attributeManager) {
      if (getBooleanFromAttributeValue(newValue)) {
        this.attributeManager.addClasses('fixed');
      } else {
        this.attributeManager.removeClasses('fixed');
      }
    }
  }
}

@customElement('ui5-simple-form')
@inject(Element)
export class Ui5SimpleForm {
  @bindable() ui5Id = null;
  @bindable() title = '';
  @bindable() maxContainerCols = 2;
  @bindable() minWidth = -1;
  @bindable() width = null;
  @bindable() editable = true;
  @bindable() labelMinWidth = 192;
  @bindable() layout = 'ResponsiveLayout';
  @bindable() backgroundDesign = 'Translucent';
  @bindable() labelSpanXL = -1;
  @bindable() labelSpanL = 4;
  @bindable() labelSpanM = 2;
  @bindable() labelSpanS = 12;
  @bindable() adjustLabelSpan = true;
  @bindable() emptySpanXL = -1;
  @bindable() emptySpanL = 0;
  @bindable() emptySpanM = 0;
  @bindable() emptySpanS = 0;
  @bindable() singleContainerFullSize = false;
  @bindable() breakpointXL = 1440;
  @bindable() breakpointL = 1024;
  @bindable() breakpointM = 600;

  _form = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'toolbar')
        this._form.setToolbar(child);
      if (elem.localName == 'content')
        this._form.addContent(child);
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var params = {
      title: this.title,
      editable: getBooleanFromAttributeValue(this.editable),
      maxContainerCols: parseInt(this.maxContainerCols),
      minWidth: parseInt(this.minWidth),
      width: this.width,
      labelMinWidth: parseInt(this.labelMinWidth),
      layout: this.layout,
      backgroundDesign: this.backgroundDesign,
      labelSpanXL: parseInt(this.labelSpanXL),
      labelSpanL: parseInt(this.labelSpanL),
      labelSpanM: parseInt(this.labelSpanM),
      labelSpanS: parseInt(this.labelSpanS),
      adjustLabelSpan: getBooleanFromAttributeValue(this.adjustLabelSpan),
      emptySpanXL: parseInt(this.emptySpanXL),
      emptySpanL: parseInt(this.emptySpanL),
      emptySpanM: parseInt(this.emptySpanM),
      emptySpanS: parseInt(this.emptySpanS),
      singleContainerFullSize: getBooleanFromAttributeValue(this.singleContainerFullSize),
      breakpointXL: parseInt(this.breakpointXL),
      breakpointL: parseInt(this.breakpointL),
      breakpointM: parseInt(this.breakpointM),

    };
    if (this.uiId5)
      this._form = new sap.ui.layout.form.SimpleForm(this.ui5Id, params);
    else
      this._form = new sap.ui.layout.form.SimpleForm(params);

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._form, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._form.placeAt(this.element.parentElement);
      attributeManager.addClasses("ui5-hide");
    }
  }
  titleChanged(newValue) {
    if (this._form !== null) {
      this._form.setTitle(newValue);
    }
  }
  maxContainerColsChanged(newValue) {
    if (this._form !== null) {
      this._form.setMaxContainerCols(newValue);
    }
  }
  editableChanged(newValue) {
    if (this._form !== null) {
      this._form.setEditable(getBooleanFromAttributeValue(newValue));
    }
  }
  minWidthChanged(newValue) {
    if (this._form !== null) {
      this._form.setMinWidth(newValue);
    }
  }
  widthChanged(newValue) {
    if (this._form !== null) {
      this._form.setWidth(newValue);
    }
  }
  labelMinWidthChanged(newValue) {
    if (this._form !== null) {
      this._form.setLabelMinWidth(newValue);
    }
  }
  layoutChanged(newValue) {
    if (this._form !== null) {
      this._form.setLayout(newValue);
    }
  }
  backgroundDesignChanged(newValue) {
    if (this._form !== null) {
      this._form.setBackgroundDesign(newValue);
    }
  }

}

@customElement('md-slider')
@inject(Element)
@inlineView(`
  <template class="slider">
  <require from="./slider.css"></require>
  <ul class="slides">
    <slot></slot>
  </ul>
  </template>
`)
export class MdSlider {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) mdFillContainer = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) mdHeight = 400;
  @bindable() mdIndicators = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) mdInterval = 6000;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) mdTransition = 500;

  constructor(element) {
    this.element = element;
    this.log = getLogger('md-slider');
  }

  attached() {
    if (getBooleanFromAttributeValue(this.mdFillContainer)) {
      this.element.classList.add('fullscreen');
    }
    this.refresh();
  }

  pause() {
    $(this.element).slider('pause');
  }

  start() {
    $(this.element).slider('start');
  }

  next() {
    $(this.element).slider('next');
  }

  prev() {
    $(this.element).slider('prev');
  }

  refresh() {
    let options = {
      height: parseInt(this.mdHeight, 10),
      indicators: getBooleanFromAttributeValue(this.mdIndicators),
      interval: parseInt(this.mdInterval, 10),
      transition: parseInt(this.mdTransition, 10)
    };
    this.log.debug('refreshing slider, params:', options);
    $(this.element).slider(options);
  }

  mdIndicatorsChanged() {
    this.refresh();
  }

  // commented since that leads to strange effects
  // mdIntervalChanged() {
  //   this.refresh();
  // }
  //
  // mdTransitionChanged() {
  //   this.refresh();
  // }
}

@customElement('md-switch')
@inject(Element)
export class MdSwitch {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdChecked;
  @bindable() mdDisabled;
  @bindable() mdLabelOff = 'Off';
  @bindable() mdLabelOn = 'On';

  constructor(element) {
    this.element = element;
    this.handleChange = this.handleChange.bind(this);
  }

  attached() {
    this.checkbox.checked = getBooleanFromAttributeValue(this.mdChecked);
    if (getBooleanFromAttributeValue(this.mdDisabled)) {
      this.checkbox.disabled = true;
    }
    this.checkbox.addEventListener('change', this.handleChange);
  }

  detached() {
    this.checkbox.removeEventListener('change', this.handleChange);
  }

  handleChange() {
    this.mdChecked = this.checkbox.checked;
    fireEvent(this.element, 'blur');
  }

  blur() {
    fireEvent(this.element, 'blur');
  }

  mdCheckedChanged(newValue) {
    if (this.checkbox) {
      this.checkbox.checked = !!newValue;
    }
  }

  mdDisabledChanged(newValue) {
    if (this.checkbox) {
      this.checkbox.disabled = !!newValue;
    }
  }
}

@customElement('ui5-tab-container')
@inject(Element)
export class Ui5TabContainer {
  @bindable() showAddNewButton = true;
  @bindable() selectedItem = null;
  @bindable() itemClose = this.defaultFunc;
  @bindable() itemSelect = this.defaultFunc;
  @bindable() addNewButtonPress = this.defaultFunc;
  _tab = null;
  constructor(element) {
    this.element = element;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.addItem(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.removeItem(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._tab = new sap.m.TabContainer({
      showAddNewButton: getBooleanFromAttributeValue(this.showAddNewButton),
      itemClose: this.itemClose,
      itemSelect: this.itemSelect,
      addNewButtonPress: this.addNewButtonPress
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._tab, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._tab.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._tab, this.element);
    }
    else {
      this._tab.destroy();
    }
  }
  showAddNewButtonChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setShowAddNewButton(getBooleanFromAttributeValue(newValue));
    }
  }
  /*TODO: Add change bindings for event handlers */
}

@customElement('ui5-tab-container-item')
@inject(Element)
export class Ui5TabContainerItem {
  @bindable() name = null;
  @bindable() key = null;
  @bindable() modified = false;
  @bindable() itemPropertyChanged = this.defaultFunc;
  _tab = null;
  constructor(element) {
    this.element = element;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.addContent(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._tab.removeContent(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._tab = new sap.m.TabContainerItem({
      name: this.name,
      key: this.key,
      modified: getBooleanFromAttributeValue(this.modified),
      itemPropertyChanged: this.itemPropertyChanged,
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._tab, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._tab.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._tab, this.element);
    }
    else {
      this._tab.destroy();
    }
  }
  keyChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setKey(newValue);
    }
  }
  nameChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setName(newValue);
    }
  }
  modifiedChanged(newValue) {
    if (this._tab !== null) {
      this._tab.setModified(getBooleanFromAttributeValue(newValue));
    }
  }
  /*TODO: Add change bindings for event handlers */
}

@customElement('ui5-table')
@inject(Element)
export class Ui5Table {
  @bindable() headerText = '';
  _table = null;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'header-toolbar')
      { this._table.setHeaderToolbar(child); break; }
      if (elem.localName == 'info-toolbar')
      { this._table.setInfoToolbar(child); break; }
      if (elem.localName == 'item')
      { this._table.addItem(child); break; }
      if (elem.localName == 'column')
      { this._table.addColumn(child); break; }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'item')
      { this._table.removeItem(child); break; }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    var table = new sap.m.Table({
      headerText: this.headerText,
    });
    this._table = table;

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._table, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._table.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._table, this.element);
    }
    else {
      this._table.destroy();
    }
  }
  headerTextChanged(newValue) {
    if (this._table !== null) {
      this._table.setHeaderText(newValue);
    }
  }
}

@customElement('ui5-text')
@inject(Element)

export class Ui5Text {
  _text = null;
  @bindable ui5Id = null;
  @bindable text = null;
  @bindable wrapping = true;
  @bindable textAlign = "Begin";
  @bindable maxLines = null;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._text = new sap.m.Text({
      text: this.text!=null?this.text:this.element.innerText.trim(),
      wrapping: getBooleanFromAttributeValue(this.wrapping),
      textAlign: this.textAlign,
      maxLines: this.maxLines
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._text, this.element);
  }
  textChanged(newValue) {
    if (this._text != null) {
      this._text.setText(newValue);
    }
  }
}

@customElement('ui5-tile-container')
@inject(Element)
export class Ui5TileContainer {
   _container = null;

  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'tile')
      this._container.addTile(child);
  }
  removeChild(child,elem)
  {
      var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'tile')
      this._container.removeTile(child);
  }
  attached() {
    this._container = new sap.m.TileContainer();
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._container,this.element);
  }
  detached() {
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._container,this.element);
  }
}

@customElement('ui5-tile-content')
@inject(Element)
export class Ui5TileContent {
    _content = null;
    @bindable() footer = null;
    @bindable() unit = null;
    constructor(element) {
        this.element = element;
    }
    addChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'content')
            this._content.setContent(child);
    }
    removeChild(child, elem) {
        var path = $(elem).parentsUntil(this.element);
        if (path[0].localName == 'content')
            this._content.destroyContent(child);
    }
    attached() {
        this._content = new sap.m.TileContent({
            footer: this.footer,
            unit: this.unit
        });
        $(this.element).parents("ui5-generic-tile")[0].au.controller.viewModel.addChild(this._content, this.element);
    }
    detached() {
        $(this.element).parents("ui5-generic-tile")[0].au.controller.viewModel.removeChild(this._content, this.element);
    }
    footerChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setFooter(newValue);
        }
    }
    unitChanged(newValue)
    {
        if(this._content!=null)
        {
            this._content.setUnit(newValue);
        }
    }
}

@customElement('ui5-title')
@inject(Element)

export class Ui5Title {
  _title = null;
  @bindable() text = null;
  @bindable() icon = null;
  @bindable() level = 'Auto';
  @bindable() emphasized = false;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._title = new sap.ui.core.Title({
      text: this.text,
      icon: this.icon,
      emphasized: getBooleanFromAttributeValue(this.emphasized),
      level: this.level,
    });
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._title, this.element);
  }
  textChanged(newValue) {
    if (this._title != null) {
      this._title.setText(newValue);
    }
  }
  iconChanged(newValue) {
    if (this._title != null) {
      this._title.setIcon(newValue);
    }
  }
   levelChanged(newValue) {
    if (this._title != null) {
      this._title.setLevel(newValue);
    }
  }
   emphasizedChanged(newValue) {
    if (this._title != null) {
      this._title.setEmphasized(getBooleanFromAttributeValue(newValue));
    }
  }
}

export class Ui5ToastService {
  show(message, displayLength, ) {
    return new Promise((resolve, reject) => {
      sap.m.MessageToast.show(message,{
        duration: displayLength,
        onClose: () => {
          resolve();
        }
      });
    });
  }
}

@customAttribute('md-tooltip')
@inject(Element)
export class MdTooltip {
  @bindable() position = 'bottom';
  @bindable() delay = 50;
  @bindable() html = false;
  @bindable() text = '';

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  bind() {
    this.html = getBooleanFromAttributeValue(this.html);
  }

  attached() {
    this.attributeManager.addClasses('tooltipped');
    this.attributeManager.addAttributes({ 'data-position': this.position, 'data-tooltip': this.text });
    this.initTooltip();
  }

  detached() {
    $(this.element).tooltip('remove');
    this.attributeManager.removeClasses('tooltipped');
    this.attributeManager.removeAttributes(['data-position', 'data-tooltip']);
  }

  textChanged() {
    this.attributeManager.addAttributes({ 'data-tooltip': this.text });
    this.initTooltip();
  }

  initTooltip() {
    $(this.element).tooltip('remove');
    $(this.element).tooltip({
      delay: parseInt(this.delay, 10),
      html: this.html
    });
  }
}

@customAttribute('md-fadein-image')
@inject(Element)
export class MdFadeinImage {
  @bindable() ref;

  constructor(element) {
    this.element = element;
    this.fadeInImage = this.fadeInImage.bind(this);
    this.log = getLogger('md-fadein-image');
  }

  attached() {
    this.element.addEventListener('click', this.fadeInImage);
    this.ensureOpacity();
  }

  detached() {
    this.element.removeEventListener('click', this.fadeInImage);
  }

  fadeInImage() {
    Materialize.fadeInImage($(this.ref));
  }

  ensureOpacity() {
    let opacity = window.getComputedStyle(this.ref).opacity;
    if (opacity !== 0) {
      this.ref.style.opacity = 0;
    }
  }
}

@customAttribute('md-staggered-list')
@inject(Element)
export class MdStaggeredList {
  @bindable() ref;

  constructor(element) {
    this.element = element;
    this.staggerList = this.staggerList.bind(this);
    this.log = getLogger('md-staggered-list');
  }

  attached() {
    this.element.addEventListener('click', this.staggerList);
    this.ensureOpacity();
  }

  detached() {
    this.element.removeEventListener('click', this.staggerList);
  }

  staggerList() {
    Materialize.showStaggeredList($(this.ref));
  }

  ensureOpacity() {
    let items = this.ref.querySelectorAll('li');
    [].forEach.call(items, item => {
      let opacity = window.getComputedStyle(item).opacity;
      if (opacity !== 0) {
        item.style.opacity = 0;
      }
    });
  }
}

export class MaterializeFormValidationRenderer {

  className = 'md-input-validation';
  classNameFirst = 'md-input-validation-first';

  render(instruction) {
    let allElements = new Array();
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
        if (allElements.indexOf(element) == -1) {
          allElements.push(element);
        }
      }
    }
    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
        if (allElements.indexOf(element) == -1) {
          allElements.push(element);
        }
      }
    }
    allElements.forEach(e => this.underlineInput(e));
  }

  underlineInput(element) {
    let input;
    switch (element.tagName) {
      case 'MD-INPUT': {
        input = element.querySelector('input') || element.querySelector('textarea');
        break;
      }
      case 'SELECT': {
        const selectWrapper = element.closest('.select-wrapper');
        if (selectWrapper) {
          input = selectWrapper.querySelector('input');
        }
        break;
      }
      case 'INPUT': {
        input = element;
        break;
      }
      default: break;
    }
    if (input) {
      if (element.querySelectorAll('.' + this.className).length === 0) {
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
      else {
        input.classList.remove('valid');
        input.classList.add('invalid');
      }
    }
  }

  add(element, result) {
    if (result.valid) {
      return;
    }
    switch (element.tagName) {
    case 'MD-INPUT': {
      let label = element.querySelector('label');
      let input = element.querySelector('input') || element.querySelector('textarea');
      if (label) {
        label.removeAttribute('data-error');
      }
      if (input) {
        result.target = input;
        if (input.hasAttribute('data-show-errortext')) {
          this.addMessage(element, result);
        }
      }
      break;
    }
    case 'SELECT': {
      const selectWrapper = element.closest('.select-wrapper');
      if (!selectWrapper) {
        return;
      }
      let input = selectWrapper.querySelector('input');
      if (input) {
        result.target = input;
        if (!(input.hasAttribute('data-show-errortext') &&
            input.getAttribute('data-show-errortext') === 'false')) {
          this.addMessage(selectWrapper, result);
        }
      }
      break;
    }
    case 'INPUT' : {
      if (element.hasAttribute('md-datepicker')) {
        if (!(element.hasAttribute('data-show-errortext') &&
            element.getAttribute('data-show-errortext') === 'false')) {
          this.addMessage(element.parentNode, result);
        }
      }
      break;
    }
    default: break;
    }
  }

  remove(element, result) {
    if (result.valid) {
      return;
    }
    switch (element.tagName) {
    case 'MD-INPUT': {
      this.removeMessage(element, result);
      break;
    }
    case 'SELECT': {
      const selectWrapper = element.closest('.select-wrapper');
      if (!selectWrapper) {
        return;
      }

      if ($(selectWrapper.parentElement).children().hasClass('md-input-validation') ) {
        this.removeMessage(selectWrapper.parentElement, result);
      } else {
        this.removeMessage(selectWrapper, result);
      }
      break;
    }
    case 'INPUT' : {
      if (element.hasAttribute('md-datepicker')) {
        this.removeMessage(element.parentNode, result);
      }
      break;
    }
    default: break;
    }
  }

  addMessage(element, result) {
    let message = document.createElement('div');
    message.id = `md-input-validation-${result.id}`;
    message.textContent = result.message;
    message.className = this.className;
    if (element.querySelectorAll('.' + this.className).length === 0) {
      message.className += ' ' + this.classNameFirst;
    }
    message.style.opacity = 0;
    element.appendChild(message, element.nextSibling);
    window.getComputedStyle(message).opacity;
    message.style.opacity = 1;
  }

  removeMessage(element, result) {
    let message = element.querySelector(`#md-input-validation-${result.id}`);
    if (message) {
      element.removeChild(message);
    }
  }

}

@customElement('ui5-vertical-layout')
@inject(Element)
export class Ui5VerticalLayout {
  _layout = null;
  constructor(element) {
    this.element = element;
  }
  defaultFunc(event) {

  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._layout.addContent(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'content') {
        this._layout.removeContent(child);
        break;
      }
    }
  }
  attached() {
    var attributeManager = new AttributeManager(this.element);
    this._layout = new sap.ui.layout.VerticalLayout({
    });

    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._layout, this.element);
      attributeManager.addAttributes({ "ui5-container": '' });
    }
    else {
      this._layout.placeAt(this.element.parentElement);
      attributeManager.addAttributes({ "ui5-container": '' });
      attributeManager.addClasses("ui5-hide");
    }
  }
  detached() {
    if ($(this.element).parents("[ui5-container]").length > 0) {
      $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._layout, this.element);
    }
    else {
      this._layout.destroy();
    }
  }

  /*TODO: Add change bindings for event handlers */
}

@customElement('ui5-toolbar-spacer')
@inject(Element)

export class Ui5ToolbarSpacer {
   _spacer = null;
   @bindable() width = null;
  constructor(element) {
    this.element = element;
  }

  attached() {

    this._spacer = new sap.m.ToolbarSpacer({
      widtht : this.width,
    }); 
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._spacer,this.element);  
  }
   widthChanged(newValue) {
    if (this._spacer !== null) {
      this._spacer.setWidth(newValue);
    }
  }

}

@customAttribute('md-waves')
@inject(Element)
export class MdWaves {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) block = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) circle = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) color;
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    let classes = ['waves-effect'];
    if (getBooleanFromAttributeValue(this.block)) {
      classes.push('waves-block');
    }
    if (getBooleanFromAttributeValue(this.circle)) {
      classes.push('waves-circle');
    }
    if (this.color) {
      classes.push(`waves-${this.color}`);
    }

    this.attributeManager.addClasses(classes);
    Waves.attach(this.element);
  }

  detached() {
    let classes = ['waves-effect', 'waves-block'];
    if (this.color) {
      classes.push(`waves-${this.color}`);
    }

    this.attributeManager.removeClasses(classes);
  }
}

@customElement('ui5-wizard')
@inject(Element)
export class Ui5Wizard {
   _wizard = null;

  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'wizard')
      this._wizard.addStep(child);
  }
  removeChild(child,elem)
  {
      var path = $(elem).parentsUntil(this.element);
    //FIXME: Dynamic step removal is not supported by openui5 yet, will be removed with the wizard itself
    //if (path[0].localName == 'wizard')
     // this._wizard.removeStep(child);
  }
  attached() {
    this._wizard = new sap.m.Wizard();
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._wizard,this.element);
  }
  detached() {
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._wizard,this.element);
  }
}

@customElement('ui5-wizard-step')
@inject(Element)
export class Ui5WizardStep {
  _step = null;
  @bindable nextStep = null;
  @bindable subsequentSteps = [];
  @bindable title = null;
  @bindable icon = null;
  @bindable validated = true;
  @bindable complete = this.defaultFunc;
  @bindable activate = this.defaultFunc;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'step') {
        this._step.addContent(child);
        break;
      }
    }
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    for (elem of path) {
      if (elem.localName == 'step') {
        this._step.removeContent(child);
        break;
      }
    }
  }
  defaultFunc() {

  }
  attached() {
    this._step = new sap.m.WizardStep({
      title: this.title,
      icon: this.icon,
      validated: getBooleanFromAttributeValue(this.validated),
      complete: this.complete,
      activate: this.activate
    });
    $(this.element).parents("ui5-wizard")[0].au.controller.viewModel.addChild(this._step, this.element);
  }
  detached() {
    $(this.element).parents("ui5-wizard")[0].au.controller.viewModel.removeChild(this._step, this.element);
  }
}

@customElement('ui5-slide-tile')
@inject(Element)
export class Ui5SlideTile {
  _container = null;
  @bindable() displayTime = 5000;
  @bindable() transitionTime = 500;
  constructor(element) {
    this.element = element;
  }
  addChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'tile')
      this._container.addTile(child);
  }
  removeChild(child, elem) {
    var path = $(elem).parentsUntil(this.element);
    if (path[0].localName == 'tile')
      this._container.removeTile(child);
  }
  attached() {
    this._container = new sap.m.SlideTile({
      displayTime: this.displayTime,
      transitionTime: this.transitionTime
    });
    this._container.addStyleClass('sapUiTinyMarginTop');
    this._container.addStyleClass('sapUiTinyMarginBegin');

    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.addChild(this._container, this.element);
  }
  detached() {
    $(this.element).parents("[ui5-container]")[0].au.controller.viewModel.removeChild(this._container, this.element);
  }
  displayTimeChanged(newValue) {
    if (this._container != null) {
      this._container.setDisplayTime(newValue);
    }
  }
  transitionTimeChanged(newValue) {
    if (this._container != null) {
      this._container.setTransitionTime(newValue);
    }
  }
}

@customElement('ui5-standard-tile')
@inject(Element)
export class Ui5StandardTile {
    _tile = null;
    @bindable() type = null;
    @bindable() title = null;
    @bindable() number = null;
    @bindable() info = null;
    @bindable() infoState = null;
    @bindable() numberUnit = null;
    @bindable() icon = null;
    @bindable() press = null;
    
    constructor(element) {
        this.element = element;
    }
    defaultPress() {

    }
    attached() {
        this._tile = new sap.m.StandardTile(
            {
                type: this.type,
                title: this.title,
                number: this.number,
                info: this.info,
                infoState: this.infoState,
                numberUnit: this.numberUnit,
                icon: this.icon,
                press: this.press != null ? this.press : this.defaultPress
            }
        );
        $(this.element).parents("ui5-tile-container")[0].au.controller.viewModel.addChild(this._tile, this.element);
    }
    detached() {
        $(this.element).parents("ui5-tile-container")[0].au.controller.viewModel.removeChild(this._tile, this.element);
    }
    typeChanged(newValue) {
        if (this._tile != null) {
            this._tile.setType(newValue);
        }
    }
    titleChanged(newValue) {
        if (this._tile != null) {
            this._tile.setTitle(newValue);
        }
    }
    numberChanged(newValue) {
        if (this._tile != null) {
            this._tile.setNumber(newValue);
        }
    }
    numberUnitChanged(newValue) {
        if (this._tile != null) {
            this._tile.setNumberUnit(newValue);
        }
    }
    infoChanged(newValue) {
        if (this._tile != null) {
            this._tile.setInfo(newValue);
        }
    }
    infoStateChanged(newValue) {
        if (this._tile != null) {
            this._tile.setInfoState(newValue);
        }
    }
    iconChanged(newValue) {
        if (this._tile != null) {
            this._tile.setIcon(newValue);
        }
    }
    pressChanged(newValue) {
        if (this._tile !== null) {
            this._tile.attachPress(newValue);
        }
    }
}
