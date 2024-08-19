package expo.modules.pax

import android.util.Log
import com.pax.dal.IDAL;
import com.pax.dal.IPrinter;
import com.pax.neptunelite.api.NeptuneLiteUser;
import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoPaxModule : Module() {
  private var dal: IDAL? = null
  private var printer: IPrinter? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoPax")

    OnCreate {
      Log.d("ExpoPax", "onCreate called")
      val reactContext = appContext.reactContext as Context

      try {
          dal = NeptuneLiteUser.getInstance().getDal(reactContext)
          printer = dal?.getPrinter()
          cashDrawer = dal?.getCashDrawer()
      } catch (e: Exception) {
          e.printStackTrace()
      }
    }

    Function("printStr") { text: String, cutMode: Int ->
      Log.d("ExpoPax", "printStr called with text: $text, cutMode: $cutMode")
      try {
        if (printer == null) {
          Log.e("ExpoPax", "Printer not initialized")
          throw Exception("Printer not initialized")
        }
        printer?.let { p ->
          p.init()
          p.setGray(3)
          p.printStr(text, null)
          p.start()
          p.cutPaper(cutMode)
          Log.d("ExpoPax", "printStr finished successfully")
        }
      } catch (e: Exception) {
        Log.e("ExpoPax", "Error in printStr", e)
        throw e
      }
    }
  }
}