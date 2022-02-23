import {Component} from 'react'
import Pagination from '../Pagination'
import ListItem from '../ListItem'

import './index.css'

class UsersList extends Component {
  state = {
    UserList: [],
    noOfItems: [],
    searchInput: '',
    checkedItemList: [],
    itemOffset: 0,
    itemsPerPage: 10,
  }

  componentDidMount() {
    this.UserListApi()
  }

  UserListApi = async () => {
    const {itemsPerPage, itemOffset} = this.state
    const endOffset = itemOffset + itemsPerPage
    const ApiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }
    const responseFromApi = await fetch(ApiUrl, options)
      .then(response => response.json())
      .then(jsonData =>
        this.setState({
          UserList: jsonData,
          noOfItems: jsonData.slice(0, 10),
        }),
      )
  }

  handlePageData = pages => {
    const {UserList} = this.state
    console.log(pages)
    this.setState({
      noOfItems: UserList.slice(pages * 10 - 10, pages * 10),
    })
  }

  onDeleteUserDetails = id => {
    const {noOfItems} = this.state
    const updatedUserList = noOfItems.filter(eachUser => id !== eachUser.id)
    this.setState({
      noOfItems: updatedUserList,
    })
  }

  onchangeSearchResult = event => {
    this.setState({
      searchInput: event.target.value,
    })
    this.renderSearchResult()
  }

  getCheckedItem = id => {
    this.setState(prev => ({
      checkedItemList: prev.checkedItemList.concat({id}),
    }))
  }

  onClickDeleteButton = () => {
    const {checkedItemList} = this.state
    const {noOfItems} = this.state
    const updatedUserList = noOfItems.filter(
      each => each.id !== checkedItemList.map(eachId => eachId),
    )
    this.setState({
      noOfItems: updatedUserList,
    })
  }

  renderSearchResult = () => {
    const {noOfItems, searchInput} = this.state
    const updatedUserList = noOfItems.filter(eachUser =>
      eachUser.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({noOfItems: updatedUserList})
  }

  render() {
    const {UserList, noOfItems, searchInput} = this.state
    return (
      <div className="background-container">
        <div className="UserList-container">
          <h1 className="heading-userList">User Details</h1>
          <input
            type="search"
            className="searchBar"
            placeholder="Sort by name,email,or role"
            onChange={this.onchangeSearchResult}
          />
          <ul className="UserList-container">
            {noOfItems.map(each => (
              <ListItem
                UserData={each}
                key={each.id}
                getSearchData={this.getSearchData}
                onDeleteUser={this.onDeleteUserDetails}
                getCheckedItem={this.getCheckedItem}
                searchInput={searchInput}
                onclickNext={this.onclickNext}
                onclickPrevious={this.onclickPrevious}
              />
            ))}
          </ul>
          <Pagination Data={UserList} handlePageData={this.handlePageData} />
          <button
            className="delete-button"
            type="button"
            onClick={this.onClickDeleteButton}
          >
            Delete Selected
          </button>
        </div>
      </div>
    )
  }
}
export default UsersList
