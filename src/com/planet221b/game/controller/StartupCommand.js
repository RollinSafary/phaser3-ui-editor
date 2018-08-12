import { SyncMacroCommand } from '@koreez/pure-mvc'
import RegisterPlayerCommands from './RegisterPlayerCommands'

export default class StartupCommand extends SyncMacroCommand {
  initializeMacroCommand () {
    this.addSubCommand(RegisterPlayerCommands)
  }
}
