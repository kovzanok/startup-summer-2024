export const createQueryString = (
  searchParams: URLSearchParams,
  name: string,
  value: string | number,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, String(value));

  return params.toString();
};

export const deleteValueFromSearchParams = (
  searchParams: URLSearchParams,
  name: string,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);

  return params;
};
