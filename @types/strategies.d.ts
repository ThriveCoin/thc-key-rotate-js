export interface IKeyOptions<TKey> {
  keys: Array<TKey>
}

export interface ISeqKeyOptions<TKey> extends IKeyOptions<TKey> {
  start?: number
}

export interface ILazyClientOptions<TKey, TClient> extends IKeyOptions<TKey> {
  loadFunc: (key: TKey) => TClient
}

export interface ILazyClientAsyncOptions<TKey, TClient> extends IKeyOptions<TKey> {
  loadFunc: (key: TKey) => Promise<TClient>
}

export class RandKeyRotate<TKey> {
  constructor(opts: IKeyOptions<TKey>)
  val(): TKey
}

export class RandLazyClientRotate<TKey, TClient> {
  constructor(opts: ILazyClientOptions<TKey, TClient>)
  val(): TClient
}

export class RandLazyClientRotateAsync<TKey, TClient> {
  constructor(opts: ILazyClientAsyncOptions<TKey, TClient>)
  val(): Promise<TClient>
}

export class SeqKeyRotate<TKey> {
  constructor(opts: ISeqKeyOptions<TKey>)
  val(): TKey
}

export class SeqLazyClientRotate<TKey, TClient> {
  constructor(opts: ILazyClientOptions<TKey, TClient>)
  val(): TClient
}

export class SeqLazyClientRotateAsync<TKey, TClient> {
  constructor(opts: ILazyClientAsyncOptions<TKey, TClient>)
  val(): Promise<TClient>
}
