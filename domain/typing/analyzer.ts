import { Observable } from 'rxjs'
import { map, shareReplay, startWith } from 'rxjs/operators'

export type TypingAnalyzerState = {
    pointer: number,
    data: {
        character: string
        success: boolean | undefined
    }[]
}

export class TypingAnalyzer {
    private readonly state: TypingAnalyzerState
    data: Observable<TypingAnalyzerState>

    constructor(charactersStream: Observable<string>, text: string) {
        this.state = {
            pointer: 0,
            data: text.split('').map((character: string) => ({
                character,
                success: undefined
            }))
        }

        this.data = charactersStream.pipe(
            map((it) => {
                const { data, pointer } = this.state
                if (it === data[pointer].character) {
                    this.state.pointer +=1
                    if (data[pointer].success === undefined) {
                        data[pointer].success = true
                    }
                } else {
                    data[pointer].success = false
                }

                return this.state
            }),
            startWith(this.state),
            shareReplay(1)
        )
    }
}