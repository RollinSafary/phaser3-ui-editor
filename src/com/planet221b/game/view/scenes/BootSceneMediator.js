import GameFacade from '../../GameFacade'
import BaseSceneMediator from './BaseSceneMediator'
import BootScene from './BootScene'
import PreloadSceneMediator from './PreloadSceneMediator'

export default class BootSceneMediator extends BaseSceneMediator {
  static NAME = 'BootStateMediator';

  constructor (viewComponent) {
    super(BootSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [GameFacade.STARTUP]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case GameFacade.STARTUP:
        this.setView()
        break
      default:
        console.warn(`${notificationName} is unhandled!`)
        break
    }
  }

  setView () {
    const bootScene = new BootScene()
    this.game.scene.add(BootScene.NAME, bootScene)
    this.setViewComponent(bootScene)
    this.setListeners()
    this.events.on(
      BootScene.BOOT_COMPLETE_EVENT,
      this.onBootComplete,
      this,
    )
    this.game.scene.start(BootScene.NAME)
  }

  async onBootComplete () {
    this.facade.registerMediator(new PreloadSceneMediator())
    this.facade.sendNotification(BootScene.BOOT_COMPLETE_NOTIFICATION)
    this.game.scene.stop(BootScene.NAME)
    this.removeListeners()
  }

  onSceneDestroy () {
    super.onSceneDestroy()
    this.facade.removeMediator(BootSceneMediator.NAME)
  }
}
