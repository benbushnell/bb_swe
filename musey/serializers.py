from rest_framework import serializers 
from django.contrib.auth import get_user_model
from musey.models import Songs, Ratings
 
class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ['song_title', 'artist_name', "avgRating"]

class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['usernameSong', 'username', "song", "rating"]

class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'first_name', 'last_name')
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
