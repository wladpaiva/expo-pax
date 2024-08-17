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
  private lateinit var dal: IDAL
  private lateinit var printer: IPrinter

  override fun definition() = ModuleDefinition {
    Name("ExpoPax")

    OnCreate {
      dal = NeptuneLiteUser.getInstance().getDal(appContext.reactContext as Context)
      printer = dal.getPrinter()
    }

    Function("printStr") { text: String, cutMode: Int ->
      printer.init()
      printer.setGray(3)
      printer.printStr(text, null)
      printer.start()
      printer.cutPaper(cutMode)
    }
  }
}