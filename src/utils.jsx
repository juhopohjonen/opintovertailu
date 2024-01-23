// simple tool for calculating page count by hits / elements per page rounded to bigger integer IF hits/elements is not integer

const calculatePageCount = (hits, elementsPerPage=20) => {
    return Math.ceil(hits / elementsPerPage)
}

const parseNbsp = (txt) => txt.replace(/&nbsp;/g, ' ')
 
export {
    calculatePageCount,
    parseNbsp
}