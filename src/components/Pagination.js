

function Pagination(props){
    let {articlesCount,articlesPerPage,activePageIndex} = props
    let numberOfPages = Math.ceil(articlesCount / articlesPerPage);

    let pagesArray = [];
    for(let i = 1;i<=numberOfPages;i++){
        pagesArray.push(i)
    }
    return(
        <div className='flex flex-row items-center '>
           <div onClick={() => props.updateCurrentIndex((activePageIndex - 1 < 1) ? 1 : activePageIndex - 1)} className='bg-black cursor-pointer text-white px-6 py-2 text-xl'>
               <h3>Prev</h3>
           </div>
           <div>
               {
                   pagesArray.map((page) => {
                       return  <span key={page} onClick={() => props.updateCurrentIndex(page)} className={`${activePageIndex === page ? 'bg-red-700 py-2 px-3 text-xl border cursor-pointer  text-white' : 'bg-red-400 hover:bg-red-500 py-2 px-3 text-xl border cursor-pointer  text-white'}`}>{page}</span>
                   })
               }
           </div>
           <div onClick={() => props.updateCurrentIndex((activePageIndex + 1 > numberOfPages) ? numberOfPages : activePageIndex + 1)} className='bg-black cursor-pointer text-white px-6 py-2 text-xl'>
               <h3>Next</h3>
           </div>
        </div>
    )
}

export default Pagination