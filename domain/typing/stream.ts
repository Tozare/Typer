import { Subject, Observable } from 'rxjs'
import { singleton } from '@commons/singleton'
import { SupportedCharacter } from '@commons/characters'

export class TypingStream {
    static shared = singleton(() => new TypingStream())
    private streamSubject: Subject<SupportedCharacter | undefined> = new Subject()
    characters: Observable<SupportedCharacter | undefined> = this.streamSubject.asObservable()

    add(character: SupportedCharacter | undefined) {
        this.streamSubject.next(character)
    }
}