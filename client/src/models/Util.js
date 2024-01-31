

export const getGreeting = () => {
    const currTime = new Date().getHours();
    if(currTime < 5) {
        return "Good Evening"
      } else if(currTime < 12) {
        return "Good Morning";
      } else if(currTime < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
};