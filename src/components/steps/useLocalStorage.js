const application = window.localStorage;

const useApplication = {
  set: (key, value) => {
    application.setItem(key, value);
  },
  get: (key) => {
    application.getItem(key);
  },
};

export default useApplication;
