import getAuthKey from './getAuthKey';

export async function postRequestJSON(url: string, data: object, authed: boolean = false): Promise<object> {
  // Default options are marked with *
  const authKey = await getAuthKey();
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': (authed) ? authKey : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  if (response.ok) {
    try {
      // Clone so we don't use up the response if it fails to parse the JSON
      const parsedResponse = await response.clone().json();
      return parsedResponse;
    } catch (error) {
      throw new Error(await response.text());
    }
  } else {
    return Promise.reject(new Error('Failed to add Post'));
  }
}

export async function deleteRequestText(url: string, data: object, authed: boolean): Promise<string> {
  // Default options are marked with *

  const authKey = await getAuthKey();

  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': (authed) ? authKey : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    // Clone so we don't use up the response if it fails to parse the text
    const parsedResponse = await response.clone().text();
    return parsedResponse;
  } catch (error) {
    throw new Error(await response.text());
  }
}

export async function postRequestText(url: string, data: object, authed: boolean): Promise<string> {
  // Default options are marked with *

  const authKey = await getAuthKey();

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': (authed) ? authKey : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  if (response.ok) {
    try {
      // Clone so we don't use up the response if it fails to parse the text
      const parsedResponse = await response.clone().text();
      return parsedResponse;
    } catch (error) {
      throw new Error(await response.text());
    }
  } else {
    throw new Error(await response.text());
  }
}

export async function patchRequestJSON(url: string, data: object, authed: boolean): Promise<object> {
  // Default options are marked with *
  const authKey = await getAuthKey();

  const response = await fetch(url, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': (authed) ? authKey : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    // Clone so we don't use up the response if it fails to parse the text
    const parsedResponse = await response.clone().json();
    return parsedResponse;
  } catch (error) {
    throw new Error(await response.text());
  }
}

export async function patchRequestText(url: string, data: object, authed: boolean): Promise<string> {
  // Default options are marked with *
  const authKey = await getAuthKey();

  const response = await fetch(url, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': (authed) ? authKey : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    // Clone so we don't use up the response if it fails to parse the text
    const parsedResponse = await response.clone().text();
    return parsedResponse;
  } catch (error) {
    throw new Error(await response.text());
  }
}

export async function getRequestJSON(url: string, authed: boolean): Promise<object> {
  const headers = {
    'X-Authorization': await getAuthKey(),
  };

  const requestDetails: RequestInit = {
    headers: (authed) ? headers : undefined,

  };

  const response = await fetch(url, requestDetails);

  try {
    // Clone so we don't use up the response if it fails to parse the JSON
    const parsedResponse = await response.clone().json();
    return parsedResponse;
  } catch (error) {
    throw new Error(await response.text());
  }
}

export async function getRequestText(url: string, authed: boolean): Promise<string> {
  const headers = {
    'X-Authorization': await getAuthKey(),
  };

  const requestDetails: RequestInit = {
    headers: (authed) ? headers : undefined,
  };

  const response = await fetch(url, requestDetails);

  try {
    // Clone so we don't use up the response if it fails get the string
    const parsedResponse = await response.clone().text();
    return parsedResponse;
  } catch (error) {
    throw new Error(await response.text());
  }
}

export async function getRequestBinary(url: string, authed: boolean): Promise<string> {
  const headers = {
    'X-Authorization': await getAuthKey(),
  };

  const requestDetails: RequestInit = {
    headers: (authed) ? headers : undefined,
  };

  const response = await fetch(url, requestDetails);
  const imageObjectURL = URL.createObjectURL(await response.blob());
  return imageObjectURL;
}

export async function postRequestBinary(url: string, authed: boolean, binary: Blob, contentType: string) {
  const headers = {
    'X-Authorization': await getAuthKey(),
    'Content-Type': contentType,
  };

  const requestDetails: RequestInit = {
    method: 'POST',
    headers: (authed) ? headers : undefined,
    body: binary,
  };

  await fetch(url, requestDetails);
}
