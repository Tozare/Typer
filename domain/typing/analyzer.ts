import { Observable } from 'rxjs'
import { map, shareReplay, startWith, takeWhile } from 'rxjs/operators'
import { isSupportedCharacter, SupportedCharacter } from '@commons/characters'

export type TypingAnalyzerState = {
    pointer: number,
    data: {
        character: SupportedCharacter,
        success: boolean | undefined
    }[]
}

export class TypingAnalyzer {
    private readonly stateData: TypingAnalyzerState
    state: Observable<TypingAnalyzerState>

    constructor(charactersStream: Observable<SupportedCharacter | undefined>, text: string) {
        this.stateData = {
            pointer: 0,
            data: text.split('')
                .filter(it => isSupportedCharacter(it))
                .map((character) => ({
                    character: character as SupportedCharacter,
                    success: undefined
                }))
        }

        this.state = charactersStream.pipe(
            map((it) => {
                const { data, pointer } = this.stateData
                if (it === data[pointer].character) {
                    this.stateData.pointer +=1
                    if (data[pointer].success === undefined) {
                        data[pointer].success = true
                    }
                } else {
                    data[pointer].success = false
                }

                return this.stateData
            }),
            startWith(this.stateData),
            takeWhile(it => it.pointer < it.data.length),
            shareReplay(1)
        )
    }
}