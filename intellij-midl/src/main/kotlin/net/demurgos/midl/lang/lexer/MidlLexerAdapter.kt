package net.demurgos.midl.lang.lexer

import com.intellij.lexer.FlexAdapter
import java.io.Reader

class MidlLexerAdapter : FlexAdapter(MidlLexer(null as Reader?))
