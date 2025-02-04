import { render, screen, fireEvent } from "@testing-library/react";
import AddUser from "./AddUser";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { ToastContainer } from "react-toastify";

vi.mock("../../api/services", () => ({
  authService: {
    register: vi.fn().mockResolvedValue({ access_token: "test_token" }),
  },
}));

vi.mock("../../hooks/useAuthorization", () => ({
  default: () => ({ isAdmin: true }),
}));

test("renders Add User form", () => {
  render(
    <BrowserRouter>
      <AddUser />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
});

test("validates user input", async () => {
  render(
    <BrowserRouter>
      <AddUser />
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "invalid-email" },
  });

  fireEvent.click(screen.getByTestId("add-user-button"));

  const toastMessage = await screen.findByTestId("toast");
  expect(toastMessage).toHaveTextContent(/invalid user data/i);
});
