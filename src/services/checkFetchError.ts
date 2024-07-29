export async function checkFetchError(response: Response) {
  try {
    const res = await response.json();

    return res;
  } catch (error) {
    throw new Error(
      'fetch вернул HTML с ошибкой' +
        ` : (text: ${response.statusText}, status: ${response.status}).`
    );
  }
}
