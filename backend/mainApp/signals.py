# carts/signals.py

from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .models import Cart, CartItem

@receiver(user_logged_in)
def merge_session_cart_to_user_cart(sender, request, user, **kwargs):
    session_key = request.session.session_key
    if not session_key:
        return

    try:
        session_cart = Cart.objects.get(session_key=session_key, user=None)
    except Cart.DoesNotExist:
        return

    # Get or create the user's cart
    user_cart, _ = Cart.objects.get_or_create(user=user)

    for session_item in session_cart.items.all():
        # Check if product already in user's cart
        try:
            user_item = user_cart.items.get(product=session_item.product)
            user_item.quantity += session_item.quantity
            user_item.save()
        except CartItem.DoesNotExist:
            session_item.cart = user_cart
            session_item.save()
    print(f"Merging session cart {session_key} into user cart for {user.username}")

    # Remove session cart
    session_cart.delete()
