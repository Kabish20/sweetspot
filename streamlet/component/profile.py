import streamlit as st
import requests

# Base API URL
BASE_URL = "http://127.0.0.1:8000/api"  # Adjust if necessary

# Assume user is already logged in and has a token
# Replace this with actual token handling (e.g., store it upon login)
user_token = st.session_state.get("user_token")  # Placeholder for authentication token

# Function to get user profile data
def get_profile():
    headers = {"Authorization": f"Bearer {user_token}"}
    try:
        response = requests.get(f"{BASE_URL}/customers/profile/", headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            st.error("Failed to fetch profile data.")
            return None
    except requests.exceptions.RequestException as e:
        st.error("An error occurred: " + str(e))
        return None

# Function to update user profile data
def update_profile(data):
    headers = {"Authorization": f"Bearer {user_token}"}
    try:
        response = requests.put(f"{BASE_URL}/customers/profile/", headers=headers, json=data)
        if response.status_code == 200:
            st.success("Profile updated successfully!")
        else:
            st.error("Failed to update profile.")
    except requests.exceptions.RequestException as e:
        st.error("An error occurred: " + str(e))

# Profile Page Layout
st.sidebar.title("Navigation")
page = st.sidebar.selectbox("Select a page", ["Home", "Cakes", "Cart", "Profile", "Registration", "Login"])

if page == "Profile":
    st.title("User Profile")

    if user_token:
        profile_data = get_profile()
        
        if profile_data:
            # Display profile information with editable fields
            with st.form("profile_form"):
                first_name = st.text_input("First Name", value=profile_data.get("first_name", ""))
                last_name = st.text_input("Last Name", value=profile_data.get("last_name", ""))
                email = st.text_input("Email", value=profile_data.get("email", ""), disabled=True)  # Non-editable
                phone_no = st.text_input("Phone Number", value=profile_data.get("phone_no", ""))
                address = st.text_area("Address", value=profile_data.get("address", ""))
                city = st.text_input("City", value=profile_data.get("city", ""))
                state = st.text_input("State", value=profile_data.get("state", ""))
                pincode = st.text_input("Pincode", value=profile_data.get("pincode", ""))
                
                update_button = st.form_submit_button("Update Profile")
                
                if update_button:
                    updated_data = {
                        "first_name": first_name,
                        "last_name": last_name,
                        "phone_no": phone_no,
                        "address": address,
                        "city": city,
                        "state": state,
                        "pincode": pincode
                    }
                    update_profile(updated_data)
    else:
        st.warning("You need to be logged in to view this page.")

elif page == "Home":
    st.title("Welcome to SweetSpot!")
    st.write("Delivering Delight to Your Doorstep")
    st.image("https://via.placeholder.com/800x300", caption="Delicious Cakes Awaiting You", use_column_width=True)
    st.write("At SweetSpot, we offer a variety of custom cakes for every occasion.")

elif page == "Cakes":
    st.title("Our Cakes")
    # Implement the Cakes page

elif page == "Cart":
    st.title("Your Cart")
    # Implement the Cart page

elif page == "Registration":
    st.title("Registration Page")
    # Implement the Registration page

elif page == "Login":
    st.title("Login Page")
    # Implement the Login page
