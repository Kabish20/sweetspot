import streamlit as st
import requests

# Base API URL
BASE_URL = "http://127.0.0.1:8000/api"  # Adjust if necessary

# Test the connection
try:
    response = requests.get(f"{BASE_URL}/customers/")
    if response.status_code == 200:
        st.success("Connection successful!")
        # Optionally display the JSON response for debugging
        # st.json(response.json())
    else:
        st.error(f"Failed to connect: {response.status_code} {response.text}")
except requests.exceptions.ConnectionError as e:
    st.error("Connection error: " + str(e))

# Navigation
st.sidebar.title("Navigation")
page = st.sidebar.selectbox("Select a page", ["Home", "Cakes", "Profile", "Cart", "Registration", "Login"])

if page == "Home":
    st.title("Welcome to SweetSpot!")
    st.write("Delivering Delight to Your Doorstep")

elif page == "Cakes":
    st.title("Cakes")
    response = requests.get(f"{BASE_URL}/cakes/")
    if response.status_code == 200:
        cakes = response.json()
        for cake in cakes:
            st.image(cake['image'], caption=cake['name'])
            st.write(f"**Flavour**: {cake['flavour']}")
            st.write(f"**Size**: {cake['size']}")
            st.write(f"**Price**: ${cake['price']}")
            customization_options = st.button("Customize", key=cake['id'])
            if customization_options:
                # Code for customization page
                st.write("Customization options will be here.")
    else:
        st.error("Failed to fetch cakes.")

elif page == "Profile":
    st.title("Profile Page")
    # Add functionality for user profile management

elif page == "Cart":
    st.title("Your Cart")
    # Add code to display cart items and checkout process

elif page == "Registration":
    st.title("Registration Page")
    with st.form(key='registration_form'):
        email = st.text_input("Email")
        first_name = st.text_input("First Name")
        last_name = st.text_input("Last Name")
        password = st.text_input("Password", type="password")
        phone_no = st.text_input("Phone Number")
        address = st.text_area("Address")
        city = st.text_input("City")
        state = st.text_input("State")
        pincode = st.text_input("Pincode")
        submit_button = st.form_submit_button(label='Register')
        if submit_button:
            # Send a POST request to the registration API endpoint
            data = {
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "password": password,
                "phone_no": phone_no,
                "address": address,
                "city": city,
                "state": state,
                "pincode": pincode
            }
            response = requests.post(f"{BASE_URL}/customers/", json=data)
            if response.status_code == 201:
                st.success("Registration successful!")
            else:
                st.error("Registration failed.")

elif page == "Login":
    st.title("Login Page")
    with st.form(key='login_form'):
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")
        login_button = st.form_submit_button(label='Login')
        if login_button:
            # Send a POST request to the login API endpoint
            login_data = {
                "email": email,
                "password": password
            }
            response = requests.post(f"{BASE_URL}/customers/login/", json=login_data)
            if response.status_code == 200:
                st.success("Login successful!")
                # Optionally redirect to Profile or fetch user data to display
            else:
                st.error("Login failed. Please check your credentials.")
