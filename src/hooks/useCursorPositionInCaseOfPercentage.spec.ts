import { renderHook } from "@testing-library/react";
import { useCursorPositionInCaseOfPercentage } from "./useCursorPositionInCaseOfPercentage";
import waitForTimeout from "@/globals/utils/waitForTimeout.ts";
import React from "react";

describe("useCursorPositionInCaseOfPercentage", (): void => {
  const setSelectionRangeMock: jest.Mock = jest.fn();
  const mockInputElement: HTMLInputElement = {
    selectionStart: 4,
    setSelectionRange: setSelectionRangeMock,
  } as unknown as HTMLInputElement;

  const setup = (options?: {
    withPercentageSign?: boolean;
  }): {
    result: {
      current: {
        handleCursorPosition: (currentValue: string) => void;
        inputRef: React.RefObject<HTMLInputElement | null>;
      };
    };
  } => {
    const { result } = renderHook(() =>
      useCursorPositionInCaseOfPercentage(options?.withPercentageSign ?? false),
    );
    result.current.inputRef.current = mockInputElement;

    return { result };
  };

  it("initializes inputRef correctly", (): void => {
    const { result } = renderHook(() =>
      useCursorPositionInCaseOfPercentage(false),
    );

    expect(result.current.inputRef.current).toBeNull();
  });

  it("does not move cursor when withPercentageSign is false", async (): Promise<void> => {
    const { result } = setup({ withPercentageSign: false });

    result.current.handleCursorPosition("1500");
    await waitForTimeout();

    expect(setSelectionRangeMock).not.toHaveBeenCalled();
  });

  it("moves the cursor correctly when withPercentageSign is true", async (): Promise<void> => {
    const { result } = setup({ withPercentageSign: true });

    result.current.handleCursorPosition("1500%");
    await waitForTimeout();

    expect(setSelectionRangeMock).toHaveBeenCalledWith(4, 4);
  });

  it("sets cursor position to 0 if selectionStart is null", async (): Promise<void> => {
    const { result } = renderHook(() =>
      useCursorPositionInCaseOfPercentage(true),
    );
    result.current.inputRef.current = {
      ...mockInputElement,
      selectionStart: null,
    };

    result.current.handleCursorPosition("");
    await waitForTimeout();

    expect(setSelectionRangeMock).toHaveBeenCalledWith(0, 0);
  });
});
