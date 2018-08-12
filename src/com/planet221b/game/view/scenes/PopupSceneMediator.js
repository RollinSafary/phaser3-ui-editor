import GameFacade from '../../GameFacade'
import BaseSceneMediator from './BaseSceneMediator'
import PopupScene from './PopupScene'

export default class PopupSceneMediator extends BaseSceneMediator {
  static NAME = 'PopupSceneMediator';

  constructor (viewComponent) {
    super(PopupSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [
      DurakFacade.STARTUP,
      PreloadScene.LOAD_COMPLETE_NOTIFICATION,
      StandardPopup.SHOW_START_NOTIFICATION,
      StandardPopup.HIDE_COMPLETE_NOTIFICATION,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case GameFacade.STARTUP:
        this.setView()
        break
      case PreloadScene.LOAD_COMPLETE_NOTIFICATION:
        this.registerGamePopups()
        break
      case StandardPopup.SHOW_START_NOTIFICATION:
        this.game.scene.wake(PopupScene.NAME)
        this.viewComponent.addPopup(args[0])
        break
      case StandardPopup.HIDE_COMPLETE_NOTIFICATION:
        this.viewComponent.removePopup()
        this.game.scene.sleep(PopupScene.NAME)
        break
      default:
        console.warn(`${notificationName} is unhandled!`)
        break
    }
  }

  onRemove () {
    this.removeSettingsPopupMediator()
    this.removeExitConfiramtionPopupMediator()
    this.removeNewGamePopupMediator()
  }

  onSceneReady () {
    super.onSceneReady()
  }

  onSceneWake () {
    super.onSceneWake()
    this.game.scene.bringToTop(PopupScene.NAME)
  }

  setView () {
    const popupScene = new PopupScene()
    this.game.scene.add(PopupScene.NAME, popupScene)
    this.setViewComponent(popupScene)
    this.game.scene.start(PopupScene.NAME)
    this.game.scene.sleep(PopupScene.NAME)
  }

  registerGamePopups () {
  }
}
