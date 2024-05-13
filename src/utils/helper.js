export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const catchError = (error) => {
  const { response } = error;
  if (response?.data) return response.data;

  return { error: error.message || error };
};

export const renderItem = (result) => {
  return (
    <div className="flex space-x-2 rounded overflow-hidden">
      <img
        className="w-16 h-16 object-cover"
        src={result.avatar}
        alt={result.name}
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};
