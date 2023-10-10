/**
 * Responds with a successful API response.
 * 
 * @param {Response} res
 * @param {any} data 
 * @param {number} status 
 */
export const apiResponse = (
    res,
    data,
    status = 200
) => {
    res.status(status).json({
        data: data
    })
}

/**
 * Responds with an error API response.
 * 
 * @param {Response} res 
 * @param {string} error 
 * @param {number} status 
 */
export const apiError = (
    res,
    error,
    status = 500
) => {
    res.status(status).json({
        error: error
    })
}