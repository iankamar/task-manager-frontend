const { useEffect } = require("react");

const checkRequests = (Wrapped) => {
  function CheckRequests(props) {
    useEffect(() => {
      // Set up the fetch interceptor to handle request errors
      const originalFetch = window.fetch;
      window.fetch = function (...args) {
        return originalFetch
          .apply(this, args)
          .then((response) => {
            if (!response.ok) {
              // Handle different types of errors based on response status
              switch (response.status) {
                case 401:
                  localStorage.removeItem("token");
                  window.location.href = "/#/login";
                  break;
                default:
                  // Handle other status codes
                  break;
              }
            }
            return response;
          })
          .catch((error) => {
            localStorage.removeItem("token");
            // Handle network errors
            window.location.href = "/#/login";
            throw error;
          });
      };
    }, []);

    return <Wrapped {...props} />;
  }

  return CheckRequests;
};

export default checkRequests;
