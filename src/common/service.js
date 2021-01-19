// Common function to call API
export const getCallApi = async (url, method) => {

  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: method,
      headers: header,
    });
    console.log(response);
    if (response.ok) {
      return response.json().then((responseData) => {
        return responseData;
      });
    } else {
      throw response.json();
    }
  } catch (error) {
    throw error;
  }
};