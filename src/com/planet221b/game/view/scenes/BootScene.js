import BaseScene from './BaseScene'

export default class BootScene extends BaseScene {
  static NAME = 'BootScene';
  static BOOT_COMPLETE_NOTIFICATION= `${
    BootScene.NAME
  }BootCompleteNotification`;
  static BOOT_COMPLETE_EVENT = `${
    BootScene.NAME
  }BootCompleteEvent`;
  constructor () {
    super(BootScene.NAME)
  }

  preload () {
    // this.load.once('complete', this.emitLoadComplete, this)
    this.load.image('mushroom', './assets/images/mushroom.png')
    this.load.image('frame', './assets/images/frame.png')
  }

  create () {
    this.i18n.initialize(
      {
        fallbackLng: 'en',
        loadPath: 'assets/i18n/{{lng}}/{{ns}}.json',
        debug: false,
      },
      () => {
        this.emitLoadComplete()
      }
    )
  }

  emitLoadComplete () {
    this.sys.events.emit(BootScene.BOOT_COMPLETE_EVENT)
  }
}
