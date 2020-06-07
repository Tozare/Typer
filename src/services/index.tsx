import { PureComponent } from 'react'
import { KeyboardEventsToTypingStreamTransformer } from 'services/keyboard-events-to-typing-stream-transformer'
import { addLessonsDataToLocalStorage } from '@domain/globalStorage/globalStorage'

export class Services extends PureComponent {
    componentDidMount() {
        KeyboardEventsToTypingStreamTransformer.shared().init()
        addLessonsDataToLocalStorage()
    }

    componentWillUnmount() {
        KeyboardEventsToTypingStreamTransformer.shared().dispose()
    }

    render() {
        return null
    }
}