import React, {PureComponent, ComponentClass} from 'react'
import _ from 'lodash'

import {ErrorHandling} from 'src/shared/decorators/errors'
import Dropdown from 'src/shared/components/Dropdown'
import {Template, TemplateType} from 'src/types'
import {TEMPLATE_TYPES} from 'src/dashboards/constants'
import CSVTemplateBuilder from 'src/dashboards/components/CSVTemplateBuilder'
import DatabasesTemplateBuilder from 'src/dashboards/components/DatabasesTemplateBuilder'
import ConfirmButton from 'src/shared/components/ConfirmButton'

interface Props {
  template: Template
  onCancel: () => void
  onSave: (template: Template) => Promise<any>
  onDelete: () => Promise<any>
}

interface State {
  tempVar: string
  type: TemplateType
}

const TEMPLATE_BUILDERS = {
  [TemplateType.CSV]: CSVTemplateBuilder,
  [TemplateType.Databases]: DatabasesTemplateBuilder,
}

@ErrorHandling
export default class EditTemplateVariable extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      tempVar: '',
      type: TemplateType.Databases,
    }
  }

  public render() {
    const {onCancel} = this.props
    const TemplateBuilder = this.getTemplateBuilder()

    return (
      <div className="edit-temp-var">
        <div className="edit-temp-var--header">
          <h1 className="page-header__title">Edit Template Variable</h1>
          <div className="edit-temp-var--header-controls">
            <button
              className="btn btn-default"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button className="btn btn-success" type="button">
              Save
            </button>
          </div>
        </div>
        <div className="edit-temp-var--body">
          <div className="edit-temp-var--body-row">
            <div className="form-group name">
              <label>Name</label>
              <input type="text" className="form-control input-sm" />
            </div>
            <div className="form-group template-type">
              <label>Type</label>
              <Dropdown
                items={TEMPLATE_TYPES}
                onChoose={this.handleChooseType}
                selected={this.dropDownSelection()}
              />
            </div>
          </div>
          <div className="edit-temp-var--body-row">
            <TemplateBuilder />
          </div>
          <ConfirmButton
            text="Delete"
            confirmAction={this.handleDelete}
            type="btn-danger"
            size="btn-xs"
            customClass="delete"
          />
        </div>
      </div>
    )
  }

  private handleChooseType = () => {}

  private dropDownSelection() {
    const {type} = this.state

    return _.get(TEMPLATE_TYPES.filter(t => t.type === type), '0.text', '')
  }

  private getTemplateBuilder(): ComponentClass {
    const {type} = this.state
    const component = TEMPLATE_BUILDERS[type]

    if (!component) {
      throw new Error(`Could not find template builder for ${type}`)
    }

    return component
  }

  private handleDelete = () => {}
}
