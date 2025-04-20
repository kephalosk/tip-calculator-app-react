import waitForTimeout from "./waitForTimeout";

describe("waitForTimeout", (): void => {
  it("should resolve after a delay", async (): Promise<void> => {
    const start: number = Date.now();

    await waitForTimeout();

    const end: number = Date.now();

    expect(end - start).toBeGreaterThan(0);
  });
});
