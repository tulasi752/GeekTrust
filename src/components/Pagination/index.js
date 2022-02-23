import {BiChevronsRight, BiChevronsLeft} from 'react-icons/bi'
import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    currentPage: 1,
    pageNumberLimit: 5,
    maxPageLimit: 5,
    minPageLimit: 0,
  }

  clickPageNumber = event => {
    const {handlePageData} = this.props
    handlePageData(event.target.value)
  }

  onclickNextPage = () => {
    const {
      currentPage,
      pageNumberLimit,
      maxPageLimit,
      minPageLimit,
    } = this.state
    const {handlePageData} = this.props
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }))
    if (currentPage > maxPageLimit) {
      this.setState({
        maxPageLimit: maxPageLimit + pageNumberLimit,
        minPageLimit: minPageLimit + pageNumberLimit,
      })
    }
    handlePageData()
  }

  onclickPreviousPage = () => {
    const {
      maxPageLimit,
      minPageLimit,
      pageNumberLimit,
      currentPage,
    } = this.state
    this.setState(prev => ({currentPage: prev.currentPage - 1}))
    if (currentPage < 1) {
      this.setState({
        maxPageLimit: maxPageLimit - pageNumberLimit,
        minPageLimit: minPageLimit - pageNumberLimit,
      })
    }
    handlePageData()
  }

  render() {
    const {Data} = this.props
    const {maxPageLimit, minPageLimit, currentPage} = this.state
    console.log(Data)
    const pageNumbers = []
    for (let i = 1; i < Math.ceil(Data.length / 10) + 1; i += 1) {
      pageNumbers.push(i)
    }

    return (
      <center className="footer">
        <BiChevronsLeft
          onClick={this.onclickPreviousPage}
          size={50}
          className="arrow-for-previousPage"
        />
        <ul className="pageNumbers-list">
          {pageNumbers.map(each => {
            if (each < maxPageLimit + 1 && each > minPageLimit) {
              return (
                <>
                  <li
                    className={currentPage === each ? 'active' : 'pageNumber'}
                    onClick={this.ClickPageNumber}
                    id={each}
                    value={each}
                  >
                    {each}
                  </li>
                </>
              )
            }
            return ''
          })}
        </ul>
        <BiChevronsRight
          size={50}
          className="arrow-for-nextPage"
          onClick={this.onclickNextPage}
        />
      </center>
    )
  }
}
export default Pagination
