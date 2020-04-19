import { Service } from '@commons/service'
import { isSupportedCharacter, SupportedCharacter } from '@commons/characters'
import { TypingStream } from '@domain/typing/stream'
import {singleton} from "@commons/singleton"

export class KeyboardEventsToTypingStreamTransformer implements Service {
    static shared = singleton(() => new KeyboardEventsToTypingStreamTransformer())
    init() {
        document.addEventListener('keypress', this.handleKeyDown)
    }

    dispose() {
        document.removeEventListener('keypress', this.handleKeyDown)
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (event.isComposing || event.keyCode === 229) {
            return
        }

        const character = String.fromCharCode(event.keyCode)
        if (isSupportedCharacter(character)) {
            TypingStream.shared().add(character as SupportedCharacter)
        } else {
            TypingStream.shared().add(undefined)
        }
    }
}