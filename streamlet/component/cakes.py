import streamlit as st
import requests

# Base API URL
BASE_URL = "http://127.0.0.1:8000/api"  # Adjust if necessary

# Navigation
st.sidebar.title("Navigation")
page = st.sidebar.selectbox("Select a page", ["Home", "Cakes", "Login"])

# Home Page Content
if page == "Home":
    st.title("Welcome to SweetSpot!")
    st.write("Delivering Delight to Your Doorstep")
    st.image("https://via.placeholder.com/800x300", caption="Delicious Cakes Awaiting You", use_column_width=True)
    st.write("At SweetSpot, we offer a variety of custom cakes for every occasion.")

# Cakes Page Content
elif page == "Cakes":
    st.title("Our Cakes")

    try:
        # Fetch cakes data from the API
        response = requests.get(f"{BASE_URL}/cakes/")
        
        if response.status_code == 200:
            cakes = response.json()
            # Loop through each cake and display details
            for cake in cakes:
                st.image(cake['image'], caption=cake['name'], use_column_width=True)
                st.write(f"**Flavor**: {cake['flavour']}")
                st.write(f"**Size**: {cake['size']}")
                st.write(f"**Price**: ${cake['price']}")
                
                # Customize button
                if st.button("Customize this Cake", key=cake['id']):
                    st.write("Customization options for this cake will be here.")
                st.markdown("---")  # Divider between cakes
                
        else:
            st.error("Failed to load cakes. Please try again later.")
    
    except requests.exceptions.RequestException as e:
        st.error("An error occurred while fetching cakes: " + str(e))

# Login Page Content
elif page == "Login":
    st.title("Login Page")
    
    with st.form(key='login_form'):
        email = st.text_input("Email", placeholder="Enter your email")
        password = st.text_input("Password", type="password", placeholder="Enter your password")
        login_button = st.form_submit_button(label='Login')
        
        if login_button:
            login_data = {
                "email": email,
                "password": password
            }
            response = requests.post(f"{BASE_URL}/customers/login/", json=login_data)
            
            if response.status_code == 200:
                st.success("Login successful!")
                st.session_state.logged_in = True
                st.session_state.user_email = email
            else:
                st.error("Login failed. Please check your credentials.")
