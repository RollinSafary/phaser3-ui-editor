import { Facade } from '@koreez/pure-mvc'
import StartupCommand from './controller/StartupCommand'
import { SCENE_BOOT } from './constants/Constants'
import BootScene from './view/scenes/BootScene'
import BootSceneMediator from './view/scenes/BootSceneMediator'
import PopupSceneMediator from './view/scenes/PopupSceneMediator'

const consoleArgs = [
  ``,
  `background: ${'#c8c8ff'}`,
  `background: ${'#9696ff'}`,
  `color: ${'#ffffff'}; background: ${'#0000ff'};`,
  `background: ${'#9696ff'}`,
  `background: ${'#c8c8ff'}`,
]

export default class GameFacade extends Facade {
  static getInstance (key) {
    if (!Facade.instanceMap[key]) {
      Facade.instanceMap[key] = new GameFacade(key)
    }
    return Facade.instanceMap[key]
  }

  static NAME = 'GameFacade'
  static STARTUP = `${GameFacade.NAME}StartUp`
  static GAME_SOUND = `${GameFacade.NAME}GameSound`
  static START_GAME_SUCCESS = GameFacade.NAME + 'StartGameSuccess'

  initializeFacade () {
    setTimeout(() => {
      this._internalInitializeFacade()
    }, 100)
  }

  initializeModel () {
    super.initializeModel()
  }

  initializeController () {
    super.initializeController()
    this.registerCommand(GameFacade.STARTUP, StartupCommand)
  }

  initializeView () {
    super.initializeView()
    // Uncomment if you want to use popups in your game
    // *********************************************
    // this.registerMediator(new PopupSceneMediator());
    // *********************************************
    this.registerMediator(new BootSceneMediator())
  }

  startup () {
    this.sendNotification(GameFacade.STARTUP)
  }

  sendNotification (notificationName, ...args) {
    consoleArgs[0] = `%c %c %c ${notificationName}${
      args.length > 0 ? ' | ' + args : ''
    } %c %c `
    console.log.apply(console, consoleArgs)
    super.sendNotification(notificationName, ...args)
  }

  _internalInitializeFacade () {
    super.initializeFacade()
    this.startup()
  }
}
