import streamlit as st
import requests

# Base API URL
BASE_URL = "http://127.0.0.1:8000/api"  # Adjust if necessary

# Navigation
st.sidebar.title("Navigation")
page = st.sidebar.selectbox("Select a page", ["Home", "Cakes", "Cart", "Registration", "Login"])

if page == "Registration":
    st.title("Registration")

    # Form to capture user registration details
    with st.form(key='registration_form'):
        first_name = st.text_input("First Name")
        last_name = st.text_input("Last Name")
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")
        phone_no = st.text_input("Phone Number")
        address = st.text_area("Address")
        city = st.text_input("City")
        state = st.text_input("State")
        pincode = st.text_input("Pincode")

        # Form submission button
        submit_button = st.form_submit_button(label='Register')

        if submit_button:
            # Prepare the data to be sent to the API
            data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
                "phone_no": phone_no,
                "address": address,
                "city": city,
                "state": state,
                "pincode": pincode
            }

            # Send a POST request to the registration endpoint
            try:
                response = requests.post(f"{BASE_URL}/customers/", json=data)

                if response.status_code == 201:
                    st.success("Registration successful! You can now log in.")
                elif response.status_code == 400:
                    st.error("Registration failed. Please check your input.")
                    st.write(response.json())  # Display detailed errors if needed
                else:
                    st.error("An unexpected error occurred during registration.")

            except requests.exceptions.RequestException as e:
                st.error("An error occurred: " + str(e))

elif page == "Home":
    st.title("Welcome to SweetSpot!")
    st.write("Delivering Delight to Your Doorstep")
    st.image("https://via.placeholder.com/800x300", caption="Delicious Cakes Awaiting You", use_column_width=True)
    st.write("At SweetSpot, we offer a variety of custom cakes for every occasion.")

elif page == "Cakes":
    st.title("Our Cakes")
    # Implement the Cakes page as discussed previously

elif page == "Cart":
    st.title("Your Cart")
    # Implement the Cart page as discussed previously

elif page == "Login":
    st.title("Login Page")
    # Implement the Login page as discussed previously
