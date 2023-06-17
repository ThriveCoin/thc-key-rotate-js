import {
  IKeyOptions,
  ILazyClientOptions,
  ILazyClientAsyncOptions,
  ISeqKeyOptions,
  RandKeyRotate,
  RandLazyClientRotate,
  RandLazyClientRotateAsync,
  SeqKeyRotate,
  SeqLazyClientRotate,
  SeqLazyClientRotateAsync
} from './strategies'

import { KEY_ROTATE_STRATEGIES } from './constants'

export function factory<TKey>(
  strategy: KEY_ROTATE_STRATEGIES.RAND,
  opts: IKeyOptions<TKey>
): RandKeyRotate<TKey>

export function factory<TKey, TClient>(
  strategy: KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI,
  opts: ILazyClientOptions<TKey, TClient>
): RandLazyClientRotate<TKey, TClient>

export function factory<TKey, TClient>(
  strategy: KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI_ASYNC,
  opts: ILazyClientAsyncOptions<TKey, TClient>
): RandLazyClientRotateAsync<TKey, TClient>

export function factory<TKey>(
  strategy: KEY_ROTATE_STRATEGIES.SEQ,
  opts: ISeqKeyOptions<TKey>
): SeqKeyRotate<TKey>

export function factory<TKey, TClient>(
  strategy: KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI,
  opts: ILazyClientOptions<TKey, TClient>
): SeqLazyClientRotate<TKey, TClient>

export function factory<TKey, TClient>(
  strategy: KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI_ASYNC,
  opts: ILazyClientAsyncOptions<TKey, TClient>
): SeqLazyClientRotateAsync<TKey, TClient>
