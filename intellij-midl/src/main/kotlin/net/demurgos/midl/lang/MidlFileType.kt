package net.demurgos.midl.lang

import com.intellij.openapi.fileTypes.LanguageFileType
import com.intellij.openapi.vfs.VirtualFile
import net.demurgos.midl.ide.icons.MidlIcons
import javax.swing.Icon

object MidlFileType : LanguageFileType(MidlLanguage) {

  object DEFAULTS {
    val EXTENSION: String = "midl"
  }

  override fun getName(): String = "MIDL"

  override fun getIcon(): Icon = MidlIcons.MIDL_FILE

  override fun getDefaultExtension(): String = DEFAULTS.EXTENSION

  override fun getCharset(file: VirtualFile, content: ByteArray): String = "UTF-8"

  override fun getDescription(): String = "Metagen Interface Description Language (MIDL) Files"
}
