import React, {PureComponent} from 'react'

import Dropdown from 'src/shared/components/Dropdown'
import SimpleOverlay from 'src/shared/components/SimpleOverlay'
import EditTemplateVariable from 'src/dashboards/components/EditTemplateVariable'
import {calculateDropdownWidth} from 'src/dashboards/constants/templateControlBar'
import {isUserAuthorized, EDITOR_ROLE} from 'src/auth/Authorized'
import {Template} from 'src/types'

interface Props {
  template: Template
  meRole: string
  isUsingAuth: boolean
  onSelectTemplate: (id: string) => void
  onSaveTemplate: (template: Template) => Promise<any>
  onDeleteTemplate: (template: Template) => Promise<any>
}

interface State {
  isEditing: boolean
}

export default class TemplateControlDropdown extends PureComponent<
  Props,
  State
> {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
    }
  }

  public render() {
    const {
      template,
      isUsingAuth,
      meRole,
      onSelectTemplate,
      onSaveTemplate,
    } = this.props
    const {isEditing} = this.state

    const dropdownItems = template.values.map(value => ({
      ...value,
      text: value.value,
    }))

    const dropdownStyle = template.values.length
      ? {minWidth: calculateDropdownWidth(template.values)}
      : null

    const selectedItem = dropdownItems.find(item => item.selected) ||
      dropdownItems[0] || {text: '(No values)'}

    return (
      <div className="template-control--dropdown" style={dropdownStyle}>
        <Dropdown
          items={dropdownItems}
          buttonSize="btn-xs"
          menuClass="dropdown-astronaut"
          useAutoComplete={true}
          selected={selectedItem.text}
          disabled={isUsingAuth && !isUserAuthorized(meRole, EDITOR_ROLE)}
          onChoose={onSelectTemplate(template.id)}
        />
        <label className="template-control--label">
          {template.tempVar}
          <span className="icon cog-thick" onClick={this.handleShowSettings} />
        </label>
        {isEditing && (
          <SimpleOverlay>
            <EditTemplateVariable
              template={template}
              onSave={onSaveTemplate}
              onCancel={this.handleHideSettings}
              onDelete={this.handleDelete}
            />
          </SimpleOverlay>
        )}
      </div>
    )
  }

  private handleShowSettings = (): void => {
    this.setState({isEditing: true})
  }

  private handleHideSettings = (): void => {
    this.setState({isEditing: false})
  }

  private handleDelete = (): Promise<any> => {
    const {onDeleteTemplate, template} = this.props

    return onDeleteTemplate(template)
  }
}
