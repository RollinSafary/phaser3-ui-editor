import { Mediator } from '@koreez/pure-mvc'
import PopupManager from '../utils/PopupManager'
import StandardPopup from './StandardPopup'

export default class StandardPopupMediator extends Mediator {
  constructor (name, viewComponent) {
    super(name, viewComponent)
    this.addViewComponentListeners()
    this.popupManager = PopupManager.instance
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      default:
        console.warn(`${notificationName} is unhandled!`)
        break
    }
  }

  showView (x, y, ...args) {
    this.popupManager.show(this.viewComponent, x, y, ...args)
  }
  hideView (actionId) {
    this.popupManager.hide(this.viewComponent, actionId)
  }

  onAction (actionId) {
    this.hideView(actionId)
  }

  onViewShow () {
    this.sendNotification(
      StandardPopup.SHOW_START_NOTIFICATION,
      this.viewComponent,
    )
  }
  onViewShowComplete () {
    this.sendNotification(StandardPopup.SHOW_COMPLETE_NOTIFICATION)
  }
  onViewHide () {
    this.sendNotification(StandardPopup.HIDE_START_NOTIFICATION)
  }
  onViewHideComplete (actionId) {
    this.popupManager.popupHideComplete()
    this.sendNotification(StandardPopup.HIDE_COMPLETE_NOTIFICATION)
  }

  addViewComponentListeners () {
    this.viewComponent.events.on(
      StandardPopup.SHOW_START_EVENT,
      this.onViewShow,
      this,
    )
    this.viewComponent.events.on(
      StandardPopup.SHOW_COMPLETE_EVENT,
      this.onViewShowComplete,
      this,
    )
    this.viewComponent.events.on(
      StandardPopup.HIDE_START_EVENT,
      this.onViewHide,
      this,
    )
    this.viewComponent.events.on(
      StandardPopup.HIDE_COMPLETE_EVENT,
      this.onViewHideComplete,
      this,
    )
    this.viewComponent.events.on(
      StandardPopup.ACTION_EVENT,
      this.onAction,
      this,
    )
  }
}
