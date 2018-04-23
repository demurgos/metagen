# MIDL specification

Metagen Interface Description Language (MIDL) is a language-agnostic and format-agnostic way to
define types. It is intended for generation of code handling data validation, serialization and
deserialization.

## Description

Goals:
- Describe interfaces for plain data objects
- Support doc comments
- Support generation of TS, Rust, Java, Python and Markdown output

## Primitives

### Sint8

Signed 8-bit integer. Represents an integer in the inclusive range `[-128, 127]`.

<details><summary>Javascript</summary>
  `number` primitive
</details>

### Sint16
### Sint32
### Sint64
### Uint8
### Uint16
### Uint32
### Uint64
### Bytes
### Ucs2String
### UsvString
### Boolean

## Struct



https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md

```midl
type Chair = struct {
  name: UsvString;
  size: Uint32;
}
```

```typescript
import { DocumentType } from "kryo/types/document";
import { $UsvString } from "kryo/builtins/usv-string";
import { $Uint32 } from "kryo/builtins/uint32";

export interface Chair {
  name: string;
  size: number;
}

export const $Chair = new DocumentType<Chair>({
  properties: {
    name: {type: $UsvString},
    size: {type: $Uint32},
  }
});
```

```rust
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq)]
pub struct Chair {
  pub name: String,
  pub size: i32,
}
```

```python
from typing import NamedTuple


class Chair(NamedTuple):
    name: str
    size: int
```

Example:

```json
{
  "name": "Chairiel",
  "size": 10
}
```

## Enum

```midl
type Color = enum {
  red: "red";
  green: "green";
  blue: "blue";
}
```

```python
from enum import Enum


class Color(Enum):
    red = "red"
    green = "green"
    blue = "blue"
```

## Nested

```midl
type GenericParameter = struct {
  name: LangString;
  variance: enum {
    Invariant;
    Covariant;
    Contravariant;
  }
}
```

```typescript
enum GenericParameterVariance {
  Invariant,
  Covariant,
  Contravariant,
}

interface GenericParameter {
  name: string;
  variance: GenericParameterVariance;
}
```

## Name Scopes

```rust
fn main() {
    let foo = "foo1";
    {
        let log_foo = || {println!("{}", foo)};
        log_foo();
        let foo = "foo2";
        log_foo();
    }
}
```

Prints `foo1` twice.
