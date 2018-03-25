package net.demurgos.midl.lang.psi

import com.intellij.extapi.psi.PsiFileBase
import com.intellij.openapi.fileTypes.FileType
import com.intellij.psi.FileViewProvider
import com.intellij.psi.PsiElement
import net.demurgos.midl.lang.MidlFileType
import net.demurgos.midl.lang.MidlLanguage

class MidlFile(
  fileViewProvider: FileViewProvider
) : PsiFileBase(fileViewProvider, MidlLanguage) {

  override fun getFileType(): FileType = MidlFileType

  override fun toString(): String = "MIDL File"

  override fun setName(name: String): PsiElement {
    val nameWithExtension = if ('.' !in name) "$name.midl" else name
    return super.setName(nameWithExtension)
  }
}
