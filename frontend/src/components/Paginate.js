import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSearchParams } from 'react-router-dom';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    const [searchParam] = useSearchParams()

    
    let category = searchParam.get('category')
    if (!category){
        category = ''
    }
    if (keyword) {
      keyword = searchParam.get("keyword");;
    }
    let minPrice = searchParam.get("minPrice");
    if (!minPrice) {
      minPrice = "";
    }
    let maxPrice = searchParam.get("maxPrice");
    if (!maxPrice) {
      maxPrice = "";
    }


    

    return (pages > 1 && (
        <Pagination className="justify-content-md-center">
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                        `/?keyword=${keyword}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${x + 1}`
                        : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
