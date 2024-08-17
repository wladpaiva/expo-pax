package expo.modules.pax

import com.pax.dal.IDAL
import com.pax.dal.IPrinter
import com.pax.dal.entity.EFontTypeAscii
import com.pax.dal.entity.EFontTypeExtCode
import com.pax.neptunelite.api.NeptuneLiteUser
import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoPaxModule : Module() {
  private var dal: IDAL? = null
  private var printer: IPrinter? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoPax")

    OnCreate {
      try {
        dal = NeptuneLiteUser.getInstance().getDal(appContext.reactContext as Context)
        printer = dal?.getPrinter()
      } catch (e: Exception) {
        e.printStackTrace()
        // Log the error or handle it appropriately
      }
    }

    Function("printStr") { text: String, cutMode: Int ->
      try {
        printer?.let { p ->
          p.init()
          p.setGray(3)
          p.printStr(text, null)
          p.start()
          p.cutPaper(cutMode)
        } ?: throw Exception("Printer not initialized")
      } catch (e: Exception) {
        e.printStackTrace()
        throw e // Re-throw the exception to be handled by the JavaScript side
      }
    }
  }
}