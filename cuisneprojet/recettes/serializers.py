from rest_framework import serializers
from .models import Recipe, RecipeIngredient, Ingredient
from django.contrib.auth.models import User

# serializers.py
from rest_framework import serializers
from .models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'description']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='ingredient.name')

    class Meta:
        model = RecipeIngredient
        fields = ['name', 'quantity']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(source='recipeingredient_set', many=True)

    class Meta:
        model = Recipe
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        if validated_data.get('password'):
            instance.set_password(validated_data.get('password'))
        if validated_data.get('username'):
            instance.username = validated_data.get('username')
        instance.save()
        return instance