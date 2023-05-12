import { Oid, OidBase } from '/lib/oidlib-dev.js'

export class FibonacciOid extends OidBase {
  constructor () {
    super()
    this.handleFirst()
  }

  handleFirst () {
    this._previous = 0
    this._next = 1
    return this._next
  }

  handleNext () {
    const next = this._previous + this._next
    this._previous = this._next
    this._next = next
    return next
  }
}

Oid.component(
{
  id: 'ex:fibonacci',
  provide: ['itf:iterate'],
  implementation: FibonacciOid
})