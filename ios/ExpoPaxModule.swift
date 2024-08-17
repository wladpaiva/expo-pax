import ExpoModulesCore

public class ExpoPaxModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoPax")

    OnCreate {
      // No-op implementation for iOS
    }

    Function("printStr") { (text: String, cutMode: Int) -> Void in
      // No-op implementation for iOS
      // In a real implementation, this would print the string and cut the paper
    }
  }
}
