import BaseScene from './BaseScene'

export default class GameScene extends BaseScene {
  static NAME = 'GameScene'
  static START = `${GameScene.NAME}Start`

  constructor () {
    super(GameScene.NAME)
  }

  create () {
    this.ninePatchTest()
    this.i18nextTest()
    this.mushroom = this.add.sprite(this.centerX, this.centerY, 'mushroom')
  }

  ninePatchTest () {
    this.frame = this.add.ninePatch(this.centerX, this.centerY, 540, 960, 'frame')
  }

  i18nextTest () {
    this.text = this.add.text(this.centerX, this.centerY + this.centerY / 2, 'textContent', {
      fontSize: '34px',
      fontFamily: 'Arial',
      color: '#000000',
      align: 'center',
    })
    this.text.setOrigin(0.5)
    this.text.setAlign(0.5)
  }

  update () {
    this.mushroom.angle++
  }
}
