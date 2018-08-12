import BaseSceneMediator from './BaseSceneMediator'
import GameScene from './GameScene'
import PreloadScene from './PreloadScene'

export default class GameSceneMediator extends BaseSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor () {
    super(GameSceneMediator.NAME, null)
  }

  listNotificationInterests () {
    return [PreloadScene.LOAD_COMPLETE_NOTIFICATION]
  }

  onRegister () {
    super.onRegister()
    this.game.scene.add(GameScene.NAME, GameScene)
    this.setViewComponent(this.game.scene.getScene(GameScene.NAME))
    this.setListeners()
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case PreloadScene.LOAD_COMPLETE_NOTIFICATION:
        this.game.scene.start(GameScene.NAME)
        break
      default:
        console.warn(`${notificationName} isn't handled`)
        break
    }
  }
}
