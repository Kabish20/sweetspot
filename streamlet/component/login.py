import streamlit as st
import requests

# Base API URL
BASE_URL = "http://127.0.0.1:8000/api"  # Adjust if necessary

# Function to test the connection to the API
def test_api_connection():
    try:
        response = requests.get(f"{BASE_URL}/customers/")
        if response.status_code == 200:
            st.success("Connection successful!")
        else:
            st.error(f"Failed to connect: {response.status_code} {response.text}")
    except requests.exceptions.ConnectionError as e:
        st.error("Connection error: " + str(e))

# Test the connection when the app starts
test_api_connection()

# Navigation
st.sidebar.title("Navigation")
page = st.sidebar.selectbox("Select a page", ["Home", "Login"])

if page == "Home":
    st.title("Welcome to SweetSpot!")
    st.write("Delivering Delight to Your Doorstep")

elif page == "Login":
    st.title("Login Page")
    
    with st.form(key='login_form'):
        email = st.text_input("Email", placeholder="Enter your email")
        password = st.text_input("Password", type="password", placeholder="Enter your password")
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
                # You can store user info in session state if needed
                st.session_state.logged_in = True
                st.session_state.user_email = email  # Example of storing user email
                # Optionally redirect to Profile or fetch user data to display
            else:
                st.error("Login failed. Please check your credentials.")
