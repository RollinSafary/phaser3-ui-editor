import { gameConfig } from '../../../constants/GameConfig'
import Phaser from 'phaser'
import PopupScene from '../../../view/scenes/PopupScene'
export const SHOW_TWEEN_DURATION = 200
export const HIDE_TWEEN_DURATION = SHOW_TWEEN_DURATION * 0.8

export default class StandardPopup extends Phaser.GameObjects.Container {
  static NAME = 'StandardPopup';
  static ACTION_EVENT = `${StandardPopup.NAME}ActionEvent`;
  static ACTION_CLOSE = 0;

  static SHOW_START_EVENT = `${
    StandardPopup.NAME
  }ShowStartEvent`;
  static SHOW_COMPLETE_EVENT = `${
    StandardPopup.NAME
  }ShowCompleteEvent`;
  static HIDE_START_EVENT = `${
    StandardPopup.NAME
  }HideStartEvent`;
  static HIDE_COMPLETE_EVENT = `${
    StandardPopup.NAME
  }HideCompleteEvent`;
  static SHOW_START_NOTIFICATION = `${
    StandardPopup.NAME
  }ShowStartNotification`;
  static SHOW_COMPLETE_NOTIFICATION = `${
    StandardPopup.NAME
  }ShowCompleteNotification`;
  static HIDE_START_NOTIFICATION = `${
    StandardPopup.NAME
  }HideStartNotification`;
  static HIDE_COMPLETE_NOTIFICATION = `${
    StandardPopup.NAME
  }HideCompleteNotification`;

  constructor () {
    super(
      window.game.scene.getScene(PopupScene.NAME),
      gameConfig.width / 2,
      gameConfig.height / 2,
    )
    this.events = new Phaser.Events.EventEmitter()
    this.createBody()
  }

  // public createPreview(): void {
  //   const preview = this.scene.add.image(0, 0, "preview");
  //   preview.setScale(0.5);
  //   preview.setAlpha(0.1);
  //   preview.setOrigin(0);
  //   // preview.visible = false
  // }

  show (x, y, ...args) {
    this.x = x
    this.y = y
    this.alpha = 0
    this.visible = true
    if (this.blocker) {
      this.scene.add.existing(this.blocker)
    }
    this.createShowTween(...args)
  }

  hide (actionId) {
    this.createHideTween(actionId)
  }

  preDestroy () {
    this.blocker.destroy()
    super.preDestroy()
  }

  createBody () {
    throw new Error(
      `Method 'createBody' is not implemented in ${this.constructor.name}`,
    )
  }

  createShowTween (...args) {
    this.events.emit(StandardPopup.SHOW_START_EVENT)
    if (this.blocker) {
      this.scene.tweens.killTweensOf(this.blocker)
      this.blocker.visible = true
      this.blocker.alpha = 0
      this.scene.tweens.add({
        targets: this.blocker,
        alpha: this.blockerAlpha,
        duration: SHOW_TWEEN_DURATION,
        ease: 'Circular.Out',
      })
    }
    const toY = this.y
    this.y += this.bounds.height * 0.5
    this.scene.tweens.add({
      targets: this,
      y: toY,
      alpha: 1,
      duration: SHOW_TWEEN_DURATION,
      ease: 'Circular.Out',
      onComplete: () => {
        this.onShowComplete(...args)
      },
    })
  }

  onShowComplete (...args) {
    this.events.emit(StandardPopup.SHOW_COMPLETE_EVENT)
  }

  createHideTween (actionId) {
    this.events.emit(StandardPopup.HIDE_START_EVENT)
    if (this.blocker) {
      this.scene.tweens.add({
        targets: this.blocker,
        alpha: 0,
        duration: SHOW_TWEEN_DURATION,
        ease: 'Circular.Out',
        onComplete: () => {
          this.blocker.visible = false
          this.blocker.alpha = this.blockerAlpha
          this.scene.sys.displayList.remove(this.blocker)
        },
      })
    }

    const toY = this.y + this.bounds.height * 0.5
    this.scene.tweens.add({
      targets: this,
      y: toY,
      alpha: 1,
      duration: HIDE_TWEEN_DURATION,
      ease: 'Circular.In',
      onComplete: () => {
        this.visible = false
        this.events.emit(StandardPopup.HIDE_COMPLETE_EVENT, actionId)
      },
    })
  }

  createBg (
    key, frame, width, height,
  ) {
    const config = {
      key,
      frame,
      width,
      height,
    }
    const bg = this.scene.make.ninePatch(config, false)
    bg.setInteractive()
    this.add(bg)

    this.bounds = new Phaser.Geom.Rectangle(bg.x, bg.y, bg.width, bg.height)
    return bg
  }

  createBgImage (key, frame) {
    const config = {
      key,
      frame,
    }
    const bg = this.scene.make.image(config, false)
    bg.setInteractive()
    this.add(bg)
    this.bounds = new Phaser.Geom.Rectangle(bg.x, bg.y, bg.width, bg.height)
    return bg
  }

  createBlocker (
    key,
    frame,
    alpha = 1,
  ) {
    const config = {
      x: gameConfig.width / 2,
      y: gameConfig.height / 2,
      key: key,
      frame: frame,
    }
    this.blocker = this.scene.make.image(config)
    this.blocker.setInteractive()
    this.blocker.on('pointerdown', this.blockerClick, this)
    this.blocker.alpha = alpha
    this.blockerAlpha = this.blocker.alpha
    this.blocker.visible = false
  }

  createGraphicsBlocker (alpha = 1, color) {
    this.blocker = this.scene.make.graphics({
      fillStyle: { color: color || 0x000000 },
    })
    this.blocker.fillRect(
      0,
      0,
      gameConfig.width,
      gameConfig.height,
    )
    this.blocker.alpha = alpha
    this.blockerAlpha = this.blocker.alpha
    this.blocker.visible = false
    this.blockerZone = this.scene.add.zone(
      0,
      0,
      gameConfig.width,
      gameConfig.height,
    )
    this.blockerZone.setInteractive()
    this.blockerZone.on('pointerdown', this.blockerClick, this)
  }

  createCancelButton (
    key,
    frame,
    x,
    y,
  ) {
    const config = {
      x: this.bounds.width * 0.5 - 25,
      y: -this.bounds.height * 0.5 + 25,
      key,
      frame,
    }
    const closeBtn = this.scene.make.image(config)
    closeBtn.setInteractive()
    closeBtn.on('pointerdown', this.blockerClick, this)
    this.add(closeBtn)
  }

  blockerClick () {
    this.events.emit(StandardPopup.ACTION_EVENT, StandardPopup.ACTION_CLOSE)
  }
}
