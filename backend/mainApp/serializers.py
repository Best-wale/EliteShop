from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Category,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
    
)
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework import serializers
from .models import Product
import cloudinary.uploader
import requests
from django.core.files.base import ContentFile




class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email','is_staff','first_name','last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'



    

'''
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    image_url = serializers.SerializerMethodField(read_only=True)



    class Meta:
        model = Product
        fields = ['id', 'name','image_url', 'description', 'price', 'original_price', 'category', 'category_id', 'status', 'image', 'created_at', 'updated_at', 'stock']
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url  # This gives the full Cloudinary URL
        return None
        
'''


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image = serializers.ImageField(write_only=True, required=False)
    image_link = serializers.URLField(write_only=True, required=False)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'original_price',
            'category','category_id', 'stock', 'status',
            'image', 'image_link', 'image_url',
            'created_at', 'updated_at'
        ]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def create(self, validated_data):
        image = validated_data.pop('image', None)
        image_link = validated_data.pop('image_link', None)

        if image:
            validated_data['image'] = image
        elif image_link:
            response = requests.get(image_link)
            if response.status_code == 200:
                file_name = image_link.split("/")[-1]
                uploaded = cloudinary.uploader.upload(ContentFile(response.content, name=file_name))
                validated_data['image'] = uploaded['public_id']

        return super().create(validated_data)

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'items']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'total', 'created_at', 'items','username','email']




#class UserProfileDetailSerializer(serializers.ModelSerializer):




User = get_user_model()

class RegisterAPI(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}
 
    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        
        return user


