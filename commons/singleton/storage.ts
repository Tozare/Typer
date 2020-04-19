export class SingletonStorage {
    private readonly storage: any = {}

    load(key: string) {
        return this.storage[key]
    }

    store(key: string, value: any) {
        this.storage[key] = value
    }
}