import getAuthKey from "./getAuthKey";

export async function postRequestJSON(url: string, data: object): Promise<object | Error> {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    try {
        // Clone so we don't use up the response if it fails to parse the JSON
        const parsedResponse = await response.clone().json()
        return parsedResponse
    } catch (error) {
        throw new Error(await response.text())
    }

}

export async function getRequestJSON(url: string, authed: boolean): Promise<object | Error> {
    let headers = {
        'X-Authorization': await getAuthKey()
    }

    let requestDetails: RequestInit = {
        headers: (authed) ? headers : undefined,

    }

    const response = await fetch(url, requestDetails)

    try {
        // Clone so we don't use up the response if it fails to parse the JSON
        const parsedResponse = await response.clone().json()
        return parsedResponse
    } catch (error) {
        throw new Error(await response.text())
    }

}

export async function getRequestBinary(url: string, authed: boolean): Promise<string | Error> {
    let headers = {
        'X-Authorization': await getAuthKey()
    }

    let requestDetails: RequestInit = {
        headers: (authed) ? headers : undefined,

    }

    const response = await fetch(url, requestDetails)
    const imageObjectURL = URL.createObjectURL(await response.blob());
    return imageObjectURL

}