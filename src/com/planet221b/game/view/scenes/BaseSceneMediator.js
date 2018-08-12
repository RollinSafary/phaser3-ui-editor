import { Mediator } from '@koreez/pure-mvc'

export default class BaseSceneMediator extends Mediator {
  constructor (name, viewComponent) {
    super(name, viewComponent)
    if (!this.viewComponent) {
      return
    }
    this.setListeners()
  }
  onRemove () {
    this.removeListeners()
    super.onRemove()
  }

  setListeners () {
    this.events.on('boot', this.onSceneBoot, this)
    this.events.on('pause', this.onScenePause, this)
    this.events.on('resume', this.onSceneResume, this)
    this.events.on('sleep', this.onSceneSleep, this)
    this.events.on('wake', this.onSceneWake, this)
    this.events.on('start', this.onSceneStart, this)
    this.events.on('shutdown', this.onSceneShutdown, this)
    this.events.on('destroy', this.onSceneDestroy, this)
  }

  removeListeners () {
    this.events.off('boot', this.onSceneBoot, this)
    this.events.off('pause', this.onScenePause, this)
    this.events.off('resume', this.onSceneResume, this)
    this.events.off('sleep', this.onSceneSleep, this)
    this.events.off('wake', this.onSceneWake, this)
    this.events.off('start', this.onSceneStart, this)
    this.events.off('shutdown', this.onSceneShutdown, this)
    this.events.off('destroy', this.onSceneDestroy, this)
  }

  onSceneBoot () {
    this.sendNotification(this.viewComponent.constructor.BOOT)
  }

  onScenePause () {
    this.sendNotification(this.viewComponent.constructor.PAUSE)
  }

  onSceneResume () {
    this.sendNotification(this.viewComponent.constructor.RESUME)
  }

  onSceneSleep () {
    this.sendNotification(this.viewComponent.constructor.SLEEP)
  }

  onSceneWake () {
    this.sendNotification(this.viewComponent.constructor.WAKE)
  }

  onSceneStart () {
    this.sendNotification(this.viewComponent.constructor.START)
  }

  onSceneShutdown () {
    this.sendNotification(this.viewComponent.constructor.SHUTDOWN)
  }

  onSceneDestroy () {
    this.sendNotification(this.viewComponent.constructor.DESTROY)
  }

  get game () {
    return window.game
  }

  get events () {
    return this.viewComponent.sys.events
  }
}
