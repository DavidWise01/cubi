-- CUBI 150: abstract append-only persistence model.
structure Event where
  id : Nat
  parent : Option Nat
  deriving DecidableEq, Repr

def addEvent (history : List Event) (e : Event) : List Event :=
  history ++ [e]

def reload (history : List Event) : List Event := history

-- A prior history is retained exactly as a prefix.
theorem append_retains_history (history : List Event) (e : Event) :
    ∃ suffix : List Event, addEvent history e = history ++ suffix := by
  exact ⟨[e], rfl⟩

-- Recording one event increases the length by precisely one.
theorem append_length (history : List Event) (e : Event) :
    (addEvent history e).length = history.length + 1 := by
  simp [addEvent]

-- Reading/reloading does not change a durable history in this model.
theorem reload_preserves (history : List Event) :
    reload history = history := rfl

-- A new event's parent value is not changed by the append operation.
theorem append_parent_preserved (history : List Event) (e : Event) :
    ∃ last : Event, last = e ∧ addEvent history e = history ++ [last] := by
  exact ⟨e, rfl, rfl⟩
