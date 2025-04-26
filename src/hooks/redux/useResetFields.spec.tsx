import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { resetBillValue } from "@/redux/slices/billSlice.ts";
import { resetTipValue } from "@/redux/slices/tipSlice.ts";
import { resetPeopleValue } from "@/redux/slices/peopleSlice.ts";
import { useResetFields } from "@/hooks/redux/useResetFields.ts";
import { ReactElement } from "react";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/billSlice.ts",
  (): {
    __esModule: boolean;
    resetBillValue: jest.Mock;
  } => ({
    __esModule: true,
    resetBillValue: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/tipSlice.ts",
  (): {
    __esModule: boolean;
    resetTipValue: jest.Mock;
  } => ({
    __esModule: true,
    resetTipValue: jest.fn(),
  }),
);

jest.mock(
  "@/redux/slices/peopleSlice.ts",
  (): {
    __esModule: boolean;
    resetPeopleValue: jest.Mock;
  } => ({
    __esModule: true,
    resetPeopleValue: jest.fn(),
  }),
);

describe("useResetFields Hook", (): void => {
  const dispatch: jest.Mock = jest.fn();

  const TestComponent = (): ReactElement => {
    const resetFields = useResetFields();
    resetFields();

    return <div>Reset Test</div>;
  };

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    (resetBillValue as unknown as jest.Mock).mockReturnValue(undefined);
    (resetTipValue as unknown as jest.Mock).mockReturnValue(undefined);
    (resetPeopleValue as unknown as jest.Mock).mockReturnValue(undefined);
  });

  it("dispatches the reset actions when resetFields is called", (): void => {
    render(<TestComponent />);

    expect(dispatch).toHaveBeenCalledWith(resetBillValue());
    expect(dispatch).toHaveBeenCalledWith(resetTipValue());
    expect(dispatch).toHaveBeenCalledWith(resetPeopleValue());
  });
});
