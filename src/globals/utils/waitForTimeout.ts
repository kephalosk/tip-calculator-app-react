const waitForTimeout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};

export default waitForTimeout;
