# thc-key-rotate-js
Generic key rotating logic for instances

Supported strategies:
- `RandKeyRotate` - Returns random key from a set of keys
- `RandLazyClientRotate` - Returns a random client generated from a set of keys, client per key is generated at most once
- `RandLazyClientRotateAsync` - Returns a random client generated from a set of keys, client per key is generated at most once asynchronously
- `SeqKeyRotate` - Returns key in sequiential order from a set of keys 
- `SeqLazyClientRotate` - Returns a client generated from a set of keys in sequential order, client per key is generated at most once
- `SeqLazyClientRotateAsync` - Returns a client generated from a set of keys in sequential order, client per key is generated at most once asynchronously

## Installing
```
npm i https://github.com/ThriveCoin/thc-key-rotate-js.git
```

## Testing
```
npm test
```

## Usage

```javascript
const { constants: { KEY_ROTATE_STRATEGIES }, factory } = require('@thrivecoin/key-rotate')

const keyRotateSeq = factory(KEY_ROTATE_STRATEGIES.SEQ, { keys: ['acc1', 'acc2'] })
await http('/api/get-data', { headers: { authorization: rotSeq.val() }})
await http('/api/get-data', { headers: { authorization: rotSeq.val() }})
// ...

const keyRotateCli = factory(
  KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI,
  { keys: ['key1', 'key2'], loadFunc: (key) => new Twitter({ auth: key }) }
)
await keyRotateCli.val().getData()
await keyRotateCli.val().getData()
// ...

const keyRotateCliAsync = factory(
  KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI_ASYNC,
  {
    keys: ['key1', 'key2'],
    loadFunc: (key) => {
      const cli = new Github({ auth: key })
      await cli.start()
      return cli
    }
  }
)
await keyRotateCliAsync.val().getData()
await keyRotateCliAsync.val().getData()
// ...
```
