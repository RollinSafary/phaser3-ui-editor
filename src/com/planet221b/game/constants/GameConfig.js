import Phaser from 'phaser'
import NinePatchPlugin from '@koreez/phaser3-ninepatch'
import I18nPlugin from '@koreez/phaser3-i18n'

export const gameConfig = {
  type: Phaser.WEBGL,
  width: 540,
  height: 960,
  backgroundColor: '#000000',
  parent: 'gameContainer',
  plugins: {
    scene: [
      {
        key: 'i18nPlugin',
        plugin: I18nPlugin,
        mapping: 'i18n',
      },
    ],
    global: [{ key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true }],
  },
}
