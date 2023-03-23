import { act, fireEvent, render, screen } from "@testing-library/react-native";
import SignInForm from "../../components/SignIn";

describe('SignInForm', () => {
    describe('SignFormFunctionality', () => {
      it('sends correct data to backend',  async () => {
        const onSubmit = jest.fn();
        render(<SignInForm onSubmit={onSubmit}/>)

       
        await act(async () => {
           await fireEvent.changeText(screen.getByPlaceholderText('username'), 'kalle');
           await fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
           await fireEvent.press(screen.getByTestId('signin'));
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });