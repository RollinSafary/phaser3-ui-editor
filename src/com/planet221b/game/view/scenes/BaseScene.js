import Phaser from 'phaser'
import { gameConfig } from '../../constants/GameConfig'

export default class BaseScene extends Phaser.Scene {
  static NAME = 'BaseScene'
  constructor (name) {
    super(name)
    this.constructor['BOOT'] = `${this.constructor.NAME}BootNotification`
    this.constructor['PAUSE'] = `${this.constructor.NAME}PauseNotification`
    this.constructor['RESUME'] = `${this.constructor.NAME}ResumeNotification`
    this.constructor['SLEEP'] = `${this.constructor.NAME}SleepNotification`
    this.constructor['WAKE'] = `${this.constructor.NAME}WakeNotification`
    this.constructor['START'] = `${this.constructor.NAME}StartNotification`
    this.constructor['SHUTDOWN'] = `${this.constructor.NAME}ShutdownNotification`
    this.constructor['DESTROY'] = `${this.constructor.NAME}DestroyNotification`
  }

  get game () {
    return window.game
  }

  get centerX () {
    return gameConfig.width / 2
  }

  get centerY () {
    return gameConfig.height / 2
  }
}
