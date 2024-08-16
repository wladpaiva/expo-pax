import ExpoModulesCore

public class ExpoPaxModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoPax")

    Function("getTheme") { () -> String in
      "system"
    }
  }
}
