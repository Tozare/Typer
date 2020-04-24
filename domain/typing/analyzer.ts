import { BehaviorSubject, Observable } from 'rxjs'
import { map, shareReplay, startWith, takeWhile } from 'rxjs/operators'
import { isSupportedCharacter, SupportedCharacter } from '@commons/characters'

export type TypingAnalyzerState = {
    pointer: number
    data: {
        character: SupportedCharacter
        success: boolean | undefined
    }[]
}

type Timing = {
    start: number,
    end: number
}

export class TypingAnalyzer {
    private readonly stateData: TypingAnalyzerState
    private timing: BehaviorSubject<Timing> = new BehaviorSubject<Timing>({
        start: 0,
        end: 0
    })
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

                const timestamp = (new Date()).getTime()
                const startTimestamp =  this.timing.getValue().start
                this.timing.next({
                    start: startTimestamp === 0 ? timestamp : startTimestamp,
                    end: timestamp
                })

                // TODO: Analyze why useObservable subscriber does not
                //  handle changes in case there is same link
                return { ...this.stateData }
            }),
            startWith(this.stateData),
            takeWhile(it => it.pointer < it.data.length),
            shareReplay(1)
        )
    }

    typingSpeedInAmountOfCharactersPerMinute(): Observable<number> {
        return this.timing.pipe(
            map(({ start, end }) =>
                Math.floor((this.stateData.data.length / (end - start)) * 60 * 1000)
            )
        )
    }

    typingAccuracyInPercents(): Observable<number> {
        return this.timing.pipe(
            map(() => {
                const successCharacters = this.stateData.data.filter(it => it.success).length
                const characters = this.stateData.data.length
                return Math.floor(successCharacters/characters * 100)
            })
        )
    }
}