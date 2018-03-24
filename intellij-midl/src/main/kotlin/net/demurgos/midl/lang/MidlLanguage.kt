package net.demurgos.midl.lang

import com.intellij.lang.Language

object MidlLanguage : Language("MIDL", "text/midl") {
    override fun isCaseSensitive() = true
}
