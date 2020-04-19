import { PureComponent } from 'react'
import { KeyboardEventsToTypingStreamTransformer } from 'services/keyboard-events-to-typing-stream-transformer'

export class Services extends PureComponent {
    componentDidMount() {
        KeyboardEventsToTypingStreamTransformer.shared().init()
    }

    componentWillUnmount() {
        KeyboardEventsToTypingStreamTransformer.shared().dispose()
    }

    render() {
        return null
    }
}