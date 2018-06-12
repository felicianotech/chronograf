import React, {PureComponent} from 'react'

import {ErrorHandling} from 'src/shared/decorators/errors'

interface Props {}

interface State {}

@ErrorHandling
export default class DatabasesTemplateBuilder extends PureComponent<
  Props,
  State
> {
  public render() {
    return <div className="databases-temp-builder" />
  }
}
