import React, {PureComponent} from 'react'

import {ErrorHandling} from 'src/shared/decorators/errors'

interface Props {}

interface State {}

@ErrorHandling
export default class CSVTemplateBuilder extends PureComponent<Props, State> {
  public render() {
    return <div className="csv-temp-builder" />
  }
}
