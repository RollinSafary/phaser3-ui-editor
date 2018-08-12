import BaseScene
  from './BaseScene'

export default class PreloadScene extends BaseScene {
  static NAME = 'PreloadScene';
  static LOAD_COMPLETE_NOTIFICATION = `${
    PreloadScene.NAME
  }LoadCompleteNotification`;
  static LOAD_COMPLETE_EVENT = `${
    PreloadScene.NAME
  }LoadCompleteEvent`;

  constructor () {
    super(PreloadScene.NAME)
  }

  preload () {
    // this.createBackground()
    // this.createProgress()
    // this.createLogo()
    // this.createProgressBar()
    // this.load.atlas(
    //   SPRITESHEET_ASSETS_KEY,
    //   'assets/atlases/spritesheet.png',
    //   'assets/atlases/spritesheet.json',
    //   undefined,
    //   undefined,
    // )
  }

  create () {
    this.addNinePatchDefaults()
    this.sys.events.emit(PreloadScene.LOAD_COMPLETE_EVENT)
  }

  onProgress (value) {
    return new Promise(
      (resolve) => {
        console.log(`loading progress value: ${value * 100}%`)
        resolve()
      },
    )
  }

  createProgress () {
    this.load.on('progress', this.onProgress, this)
  }

  createBackground () {}

  createLogo () {}

  createProgressBar () {}

  addNinePatchDefaults () {
    this.game.cache.custom.ninePatch.add(`frame`, {
      top: 76,
      left: 82,
      right: 82,
      bottom: 76,
    })
  }
}
