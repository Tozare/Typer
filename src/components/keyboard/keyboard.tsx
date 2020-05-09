import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { TypingAnalyzerState } from '@domain/typing/analyzer'
import { useObservable } from '@commons/react-hooks/use-observable'
import {isSupportedCharacter, SupportedCharacter} from '@commons/characters'

import './keyboard.less';
import {TypingStream} from "@domain/typing/stream";


type Props = {
    typingAnalyzeState: Observable<TypingAnalyzerState>
}

export const Keyboard = (props: Props) => {
;

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)


    function handleKeyDown(event: KeyboardEvent) {
        if (event.isComposing || event.keyCode === 229) {
            return
        }
        const character = String.fromCharCode(event.keyCode)
        // @ts-ignore
        document.getElementById(character).parentElement.style.backgroundColor = "blue";
    }


    function handleKeyUp(event: KeyboardEvent) {
        if (event.isComposing || event.keyCode === 229) {
            return
        }
        const character = String.fromCharCode(event.keyCode)
        // @ts-ignore
        document.getElementById(character).parentElement.style.backgroundColor = "white"
    }


    return (

        <div className='keyboard'>
            <div className='row-container row1'>
                <div className='key'>
                    <div className='center'>~</div>
                    <div className='center'>`</div>
                </div>
                <div className="key">
                    <div className="center" id="!">!</div>
                    <div className="center" id="1">1</div>
                </div>
                <div className="key">
                    <div className="center" id="@">@</div>
                    <div className="center" id="2">2</div>
                </div>
                <div className="key">
                    <div className="center" id="#">#</div>
                    <div className="center" id="3">3</div>
                </div>
                <div className="key">
                    <div className="center">$</div>
                    <div className="center">4</div>
                </div>
                <div className="key">
                    <div className="center">%</div>
                    <div className="center">5</div>
                </div>
                <div className="key">
                    <div className="center">^</div>
                    <div className="center">6</div>
                </div>
                <div className="key">
                    <div className="center">&</div>
                    <div className="center">7</div>
                </div>
                <div className="key">
                    <div className="center">*</div>
                    <div className="center">8</div>
                </div>
                <div className="key">
                    <div className="center">(</div>
                    <div className="center">9</div>
                </div>
                <div className="key">
                    <div className="center">)</div>
                    <div className="center">0</div>
                </div>
                <div className="key">
                    <div className="center">_</div>
                    <div className="center">-</div>
                </div>
                <div className="key">
                    <div className="center">+</div>
                    <div className="center">=</div>
                </div>
                <div className="key">
                    <div className="right">delete</div>
                </div>
            </div>

            <div className="row-container row2">
                <div className="key">
                    <div className="left">tab</div>
                </div>
                <div className="key">
                    <div className="center" id="q">q</div>
                </div>
                <div className="key">
                    <div className="center" id="w">w</div>
                </div>
                <div className="key">
                    <div className="center" id="e">e</div>
                </div>
                <div className="key">
                    <div className="center ">r</div>
                </div>
                <div className="key">
                    <div className="center">t</div>
                </div>
                <div className="key">
                    <div className="center">y</div>
                </div>
                <div className="key">
                    <div className="center">u</div>
                </div>
                <div className="key">
                    <div className="center">i</div>
                </div>
                <div className="key">
                    <div className="center">o</div>
                </div>
                <div className="key">
                    <div className="center">p</div>
                </div>
                <div className="key">
                    <div className="center">{"{"}</div>
                    <div className="center">[</div>
                </div>
                <div className="key">
                    <div className="center">{"}"}</div>
                    <div className="center">]</div>
                </div>
                <div className="key">
                    <div className="center">|</div>
                    <div className="center">\</div>
                </div>
            </div>

            <div className="row-container row3">
                <div className="key">
                    <div className="left">caps lock</div>
                </div>
                <div className="key">
                    <div className="center">a</div>
                </div>
                <div className="key">
                    <div className="center">s</div>
                </div>
                <div className="key">
                    <div className="center">d</div>
                </div>
                <div className="key">
                    <div className="center">f</div>
                </div>
                <div className="key">
                    <div className="center">g</div>
                </div>
                <div className="key">
                    <div className="center">h</div>
                </div>
                <div className="key">
                    <div className="center">j</div>
                </div>
                <div className="key">
                    <div className="center">k</div>
                </div>
                <div className="key">
                    <div className="center">l</div>
                </div>

                <div className="key">
                    <div className="center">:</div>
                    <div className="center">;</div>
                </div>
                <div className="key">
                    <div className="center">"</div>
                    <div className="center">'</div>
                </div>
                <div className="key">
                    <div className="right">enter</div>
                </div>
            </div>

            <div className="row-container row4">
                <div className="key">
                    <div className="left">shift</div>
                </div>
                <div className="key">
                    <div className="center">z</div>
                </div>
                <div className="key">
                    <div className="center">x</div>
                </div>
                <div className="key">
                    <div className="center">c</div>
                </div>
                <div className="key">
                    <div className="center">v</div>
                </div>
                <div className="key">
                    <div className="center">b</div>
                </div>
                <div className="key">
                    <div className="center">n</div>
                </div>
                <div className="key">
                    <div className="center">m</div>
                </div>
                <div className="key">
                    <div className="center">{"<"}</div>
                    <div className="center">,</div>
                </div>
                <div className="key">
                    <div className="center">></div>
                    <div className="center">.</div>
                </div>
                <div className="key">
                    <div className="center">?</div>
                    <div className="center">/</div>
                </div>
                <div className="key">
                    <div className="right">shift</div>
                </div>
            </div>

            <div className="row-container row5">
                <div className="key">
                    <div className="left">ctrl</div>
                </div>
                <div className="key">
                    <div className="left">alt</div>
                </div>
                <div className="key">
                    <div className="left">cmd</div>
                </div>
                <div className="key"></div>
                <div className="key">
                    <div className="right">cmd</div>
                </div>
                <div className="key">
                    <div className="right">alt</div>
                </div>
                <div className="key">
                    <div className="right">ctrl</div>
                </div>
            </div>
        </div>
    )

}