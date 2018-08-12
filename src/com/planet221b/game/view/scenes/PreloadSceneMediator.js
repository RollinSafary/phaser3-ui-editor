import BaseSceneMediator from './BaseSceneMediator'
import BootScene from './BootScene'
import GameSceneMediator from './GameSceneMediator'
import PreloadScene from './PreloadScene'

export default class PreloadSceneMediator extends BaseSceneMediator {
  static NAME = 'PreloadSceneMediator';

  constructor (viewComponent) {
    super(PreloadSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.game.scene.add(PreloadScene.NAME, PreloadScene)
    this.setViewComponent(this.game.scene.getScene(
      PreloadScene.NAME,
    ))
    this.setListeners()
  }

  listNotificationInterests () {
    return [BootScene.BOOT_COMPLETE_NOTIFICATION]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case BootScene.BOOT_COMPLETE_NOTIFICATION:
        this.events.on(
          PreloadScene.LOAD_COMPLETE_EVENT,
          this.onLoadComplete,
          this,
        )
        this.game.scene.start(PreloadScene.NAME)
        break
      default:
        console.warn(`${notificationName} is unhandled!`)
        break
    }
  }

  onSceneDestroy () {
    this.facade.removeMediator(PreloadSceneMediator.NAME)
  }

  async onLoadComplete () {
    this.registerGameSceneMediator()
    await this.viewComponent.onProgress(1)
    this.game.scene.remove(PreloadScene.NAME)
    this.sendNotification(PreloadScene.LOAD_COMPLETE_NOTIFICATION)
  }

  registerGameSceneMediator () {
    if (this.facade.hasMediator(GameSceneMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new GameSceneMediator())
  }
}
