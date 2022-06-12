
// Note: Send the pages to make the Breadcrumbs
// Input :props array example ['page1', 'page2', 'last page is not clickble page']
// Output: <li><a>page1</a></li><a>page2</a><span>page3</span></li>

 const Breadcrumbs = ((props)=>{
  let pages = props.pages;
  return (
    Object.keys(pages).map((key,i)=>{
        return (
          <li value={i.toString()}>
            {pages.length-1 == i ? <span>{pages[key]}</span> :<a href="#">{pages[key]}</a>}
          </li>
        )
    })
  )
 })
export default Breadcrumbs;
