import { renderHook } from "@testing-library/react";
import useBlurOnPointerUp from "./useBlurOnPointerUp";

describe("useBlurOnPointerUp", (): void => {
  const mockBlur: jest.Mock = jest.fn();

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  it("blurs the referenced element after pointer up", (): void => {
    const element: HTMLElement = { blur: mockBlur } as unknown as HTMLElement;
    const ref: { current: HTMLElement } = { current: element };

    const { result } = renderHook(() => useBlurOnPointerUp(ref));

    result.current();

    expect(mockBlur).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockBlur).toHaveBeenCalledTimes(1);
  });

  it("does nothing if ref.current is null", (): void => {
    const ref: { current: null } = { current: null };

    const { result } = renderHook(() => useBlurOnPointerUp(ref));

    expect((): void => {
      result.current();
      jest.runAllTimers();
    }).not.toThrow();
  });

  it("memorizes the callback based on ref", (): void => {
    const ref: { current: null } = { current: null };

    const { result, rerender } = renderHook(() => useBlurOnPointerUp(ref));

    const firstCallback = result.current;

    rerender();

    const secondCallback = result.current;

    expect(firstCallback).toBe(secondCallback);
  });
});
