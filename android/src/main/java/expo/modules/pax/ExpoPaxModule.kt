package expo.modules.pax

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoPaxModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoPax")

    Function("getTheme") {
      return@Function "system"
    }
  }
}
