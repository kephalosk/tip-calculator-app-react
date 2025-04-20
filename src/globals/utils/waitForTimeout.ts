const waitForTimeout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};

export default waitForTimeout;
