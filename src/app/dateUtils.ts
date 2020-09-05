export const DateUtils = {
  getDateInfoFromString(date: string) {
    return new Date(date).toLocaleDateString();
  },
  getLaterDateFromString(daysLater: number) {
    return new Date(
      new Date().getTime() + daysLater * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
  },
};
