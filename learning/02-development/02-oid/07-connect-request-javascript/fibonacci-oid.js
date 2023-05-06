import { Oid, OidWeb } from '/lib/oidlib-dev.js'

export class FibonacciOid extends OidWeb {
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
  element: 'fibonacci-oid',
  provide: ['itf:iterate'],
  implementation: FibonacciOid
})