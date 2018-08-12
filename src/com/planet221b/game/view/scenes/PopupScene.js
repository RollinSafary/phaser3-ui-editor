import BaseScene from './BaseScene'

export default class PopupScene extends BaseScene {
  static NAME = 'PopupScene';
  constructor () {
    super(PopupScene.NAME)
  }

  addPopup (popup) {
    this.currentPopup = this.add.existing(popup)
  }

  removePopup () {
    this.sys.displayList.remove(this.currentPopup)
  }
}
