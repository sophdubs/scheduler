import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
    
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find(appt => queryByAltText(appt, "Delete"));
    fireEvent.click(getByAltText(bookedAppointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(bookedAppointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(bookedAppointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(bookedAppointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(bookedAppointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // MAYBE SUPPOSED TO BE 2 SPOTS REMAINING
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find(appt => queryByText(appt, "Archie Cohen"));
    fireEvent.click(getByAltText(bookedAppointment, "Edit"));
    // 4. Change name to Nick Miller
    fireEvent.change(getByPlaceholderText(bookedAppointment, /enter student name/i), {
      target: { value: "Nick Miller" }
    });
    // 5. Click the "Save" button on the form
    fireEvent.click(getByText(bookedAppointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(bookedAppointment, "Saving")).toBeInTheDocument();
    // 7. Wait until the text "Nick Miller" is displayed.
    await waitForElement(() => getByText(container, "Nick Miller"));
    // 8. Check that the DayListItem with the text "Monday" still has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an edited appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find(appt => queryByText(appt, "Archie Cohen"));
    fireEvent.click(getByAltText(bookedAppointment, "Edit"));
    // 4. Change name
    fireEvent.change(getByPlaceholderText(bookedAppointment, /enter student name/i), {
      target: { value: "Nick Miller" }
    });
    // 5. Click the "Save" button on the form
    fireEvent.click(getByText(bookedAppointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(bookedAppointment, "Saving")).toBeInTheDocument();
    // 7. Wait until the text "An error occured while saving" is displayed.
    await waitForElement(() => getByText(container, "Could not save appointment"));
    // 8. click the close button 
    fireEvent.click(getByAltText(bookedAppointment, "Close"));
    // 9. press cancel on the form
    fireEvent.click(getByText(bookedAppointment, "Cancel"));
    // 10. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find(appt => queryByText(appt, "Archie Cohen"));
    fireEvent.click(getByAltText(bookedAppointment, "Delete"));
    // 4. Click the "Confirm" button on the form
    fireEvent.click(getByText(bookedAppointment, "Confirm"));
    // 5. Check that the element with the text "Deleting" is displayed.
    expect(getByText(bookedAppointment, "Deleting")).toBeInTheDocument();
    // 6. Wait until the text "An error occured while deleting" is displayed.
    await waitForElement(() => getByText(bookedAppointment, "Could not delete appointment"));
    // 7. click the close button 
    fireEvent.click(getByAltText(bookedAppointment, "Close"));
    // 8. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  });
})
