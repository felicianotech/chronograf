import React, {Component} from 'react'
import _ from 'lodash'

import classnames from 'classnames'
import uuid from 'uuid'

import Authorized, {EDITOR_ROLE} from 'src/auth/Authorized'
import TemplateControlDropdown from 'src/dashboards/components/TemplateControlDropdown'
import {Template} from 'src/types'

interface Props {
  meRole: string
  isUsingAuth: boolean
  templates: Template[]
  isOpen: boolean
  onOpenTemplateManager: () => void
  onSelectTemplate: (id: string) => void
  onSaveTemplates: (templates: Template[]) => void
}

class TemplateControlBar extends Component<Props> {
  public shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps)
  }

  public render() {
    const {
      isOpen,
      templates,
      onSelectTemplate,
      onOpenTemplateManager,
      meRole,
      isUsingAuth,
    } = this.props

    return (
      <div className={classnames('template-control-bar', {show: isOpen})}>
        <div className="template-control--container">
          <div className="template-control--controls">
            {templates && templates.length ? (
              templates.map(template => (
                <TemplateControlDropdown
                  key={uuid.v4()}
                  meRole={meRole}
                  isUsingAuth={isUsingAuth}
                  template={template}
                  onSelectTemplate={onSelectTemplate}
                  onSaveTemplate={this.handleSaveTemplate}
                  onDeleteTemplate={this.handleDeleteTemplate}
                />
              ))
            ) : (
              <div className="template-control--empty" data-test="empty-state">
                This dashboard does not have any{' '}
                <strong>Template Variables</strong>
              </div>
            )}
          </div>
          <Authorized requiredRole={EDITOR_ROLE}>
            <button
              className="btn btn-primary btn-sm template-control--manage"
              onClick={onOpenTemplateManager}
            >
              <span className="icon cog-thick" />
              Manage
            </button>
          </Authorized>
        </div>
      </div>
    )
  }

  private handleSaveTemplate = async (template: Template): Promise<any> => {
    const {templates, onSaveTemplates} = this.props
    const newTemplates = templates.reduce((acc, t) => {
      if (t.id === template.id) {
        return [...acc, template]
      }

      return [...acc, t]
    }, [])

    await onSaveTemplates(newTemplates)
  }

  private handleDeleteTemplate = async (template: Template): Promise<any> => {
    const {templates, onSaveTemplates} = this.props
    const newTemplates = templates.filter(t => t.id !== template.id)

    await onSaveTemplates(newTemplates)
  }
}

export default TemplateControlBar
