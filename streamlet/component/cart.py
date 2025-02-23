import streamlit as st
import requests

# Base API URL
BASE_URL = "http://127.0.0.1:8000/api"  # Adjust if necessary

# Session state initialization for login and customization tracking
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False
if "customizing_cake" not in st.session_state:
    st.session_state.customizing_cake = None

# Helper function to add items to cart
def add_to_cart(cake_id, quantity):
    data = {"cake_id": cake_id, "quantity": quantity}
    response = requests.post(f"{BASE_URL}/cart/add/", json=data)
    if response.status_code == 201:
        st.success("Item added to cart!")
    else:
        st.error("Failed to add item to cart.")

# Navigation
st.sidebar.title("Navigation")
page = st.sidebar.selectbox("Select a page", ["Home", "Cakes", "Cart", "Login"])

# Home Page Content
if page == "Home":
    st.title("Welcome to SweetSpot!")
    st.write("Delivering Delight to Your Doorstep")
    st.image("https://via.placeholder.com/800x300", caption="Delicious Cakes Awaiting You", use_column_width=True)
    st.write("At SweetSpot, we offer a variety of custom cakes for every occasion.")

    # Fetch and display cakes
    response = requests.get(f"{BASE_URL}/cakes/")
    if response.status_code == 200:
        cakes = response.json()
        for cake in cakes:
            st.image(cake['image'], caption=cake['name'], use_column_width=True)
            st.write(f"**Flavour**: {cake['flavour']}")
            st.write(f"**Size**: {cake['size']}")
            st.write(f"**Price**: ${cake['price']}")
            
            # Customization and Add to Cart buttons
            if st.button("Customize", key=f"customize_{cake['id']}"):
                st.session_state.customizing_cake = cake
                st.experimental_rerun()
            if st.button("Add to Cart", key=f"add_to_cart_{cake['id']}"):
                if st.session_state.logged_in:
                    add_to_cart(cake['id'], 1)
                else:
                    st.warning("Please log in to add items to your cart.")
            st.markdown("---")

# Customization Page Content
if st.session_state.customizing_cake:
    st.title("Customize Your Cake")
    cake = st.session_state.customizing_cake
    st.write(f"**Selected Cake**: {cake['name']}")
    st.write(f"**Base Price**: ${cake['price']}")
    
    # Customization options
    size = st.selectbox("Select Size", ["Small", "Medium", "Large"])
    flavor = st.selectbox("Select Flavor", ["Chocolate", "Vanilla", "Strawberry"])
    message = st.text_input("Enter a message on the cake (optional)")
    
    # Control buttons
    if st.button("Add to Cart"):
        if st.session_state.logged_in:
            custom_price = cake['price']
            if size == "Medium":
                custom_price += 5
            elif size == "Large":
                custom_price += 10
            data = {
                "cake_id": cake['id'],
                "size": size,
                "flavor": flavor,
                "message": message,
                "price": custom_price,
                "quantity": 1
            }
            response = requests.post(f"{BASE_URL}/cart/add_custom/", json=data)
            if response.status_code == 201:
                st.success("Customized cake added to cart!")
                st.session_state.customizing_cake = None
                st.experimental_rerun()
            else:
                st.error("Failed to add customized cake to cart.")
        else:
            st.warning("Please log in to add items to your cart.")
    if st.button("Cancel"):
        st.session_state.customizing_cake = None
        st.experimental_rerun()

# Cart Page Content
elif page == "Cart":
    st.title("Your Cart")
    try:
        response = requests.get(f"{BASE_URL}/cart/")
        if response.status_code == 200:
            cart_items = response.json()
            if cart_items:
                total_price = 0
                for item in cart_items:
                    st.image(item['cake']['image'], caption=item['cake']['name'], use_column_width=True)
                    st.write(f"**Flavor**: {item['cake']['flavour']}")
                    st.write(f"**Size**: {item['cake']['size']}")
                    st.write(f"**Price**: ${item['cake']['price']} each")
                    st.write(f"**Quantity**: {item['quantity']}")
                    st.write(f"**Subtotal**: ${item['cake']['price'] * item['quantity']}")
                    
                    if st.button("Remove", key=item['id']):
                        remove_response = requests.delete(f"{BASE_URL}/cart/{item['id']}/")
                        if remove_response.status_code == 204:
                            st.success("Item removed from cart!")
                            st.experimental_rerun()
                        else:
                            st.error("Failed to remove item.")
                    
                    st.markdown("---")
                    total_price += item['cake']['price'] * item['quantity']
                
                st.write(f"**Total Price**: ${total_price}")
                
                # Proceed to Checkout button
                if st.button("Proceed to Checkout"):
                    checkout_response = requests.post(f"{BASE_URL}/checkout/")
                    if checkout_response.status_code == 200:
                        st.success("Checkout successful! Your order has been placed.")
                    else:
                        st.error("Checkout failed. Please try again.")
            else:
                st.info("Your cart is empty.")
        else:
            st.error("Failed to load cart items.")
    except requests.exceptions.RequestException as e:
        st.error("An error occurred: " + str(e))

# Login Page Content
elif page == "Login":
    st.title("Login Page")
    with st.form(key='login_form'):
        email = st.text_input("Email", placeholder="Enter your email")
        password = st.text_input("Password", type="password", placeholder="Enter your password")
        login_button = st.form_submit_button(label='Login')
        
        if login_button:
            login_data = {"email": email, "password": password}
            response = requests.post(f"{BASE_URL}/customers/login/", json=login_data)
            if response.status_code == 200:
                st.success("Login successful!")
                st.session_state.logged_in = True
                st.session_state.user_email = email
            else:
                st.error("Login failed. Please check your credentials.")
