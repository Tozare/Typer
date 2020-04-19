import { SingletonStorage } from '@commons/singleton/storage'

export const singleton = (createInstance: any) => {
    let storage: SingletonStorage
    return (...args: any) => {
        if (!storage) {
            storage = new SingletonStorage()
        }

        const key = JSON.stringify(args)

        let instance = storage.load(key)
        if (!instance) {
            instance = createInstance(...args)
            storage.store(key, instance)
        }

        return instance
    }
}
