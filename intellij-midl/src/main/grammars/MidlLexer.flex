package net.demurgos.midl.lang.lexer;
import com.intellij.lexer.*;
import com.intellij.psi.tree.IElementType;
import static net.demurgos.midl.lang.psi.MidlTypes.*;

%%

%public
%class MidlLexer
%implements FlexLexer
%function advance
%type IElementType
%unicode

COMMENT=#[^\n\r]*

BOOLEAN=true|false

%%
<YYINITIAL> {
  {COMMENT} { return COMMENT; }

  {BOOLEAN} { return BOOLEAN; }

  [^] { return com.intellij.psi.TokenType.BAD_CHARACTER; }
}
