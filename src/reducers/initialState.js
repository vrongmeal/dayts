let today = new Date();

const initialState = {
  calendar: {
    date: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  }
};

export default initialState;
