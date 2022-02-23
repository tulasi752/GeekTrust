import Modal from 'react-modal'
import {Button} from 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css'

import {Component} from 'react'

import {AiOutlineForm, AiOutlineDelete} from 'react-icons/ai'
import './index.css'

class ListItem extends Component {
  onclickDeleteIcon = () => {
    const {onDeleteUser, UserData} = this.props
    const {id} = UserData
    onDeleteUser(id)
  }

  onclickCheckbox = event => {
    const {getCheckedItem, UserData} = this.props
    const {id} = UserData
    getCheckedItem(event.target.value, id)
  }

  renderUserDetailsList = () => {
    const {UserData} = this.props
    const {name, email, role, action, id} = UserData
    Modal.setAppElement('body')
    return (
      <>
        <li className="UserList-Items-container">
          <input
            type="checkbox"
            className="checkbox-for-properties"
            onClick={this.onclickCheckbox}
            id={id}
            value={id}
          />
          <p className="User-name">{name}</p>
          <p className="User-email">{email}</p>
          <p className="User-role">{role}</p>
          <p className="list-item">{action}</p>
          <div>
            <AiOutlineForm className="action-icon" value={id} id={id} />
            <AiOutlineDelete
              className="delete-icon"
              onClick={this.onclickDeleteIcon}
              value={id}
              id={id}
            />
          </div>
        </li>
      </>
    )
  }

  render() {
    return <>{this.renderUserDetailsList()}</>
  }
}
export default ListItem
