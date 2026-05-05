from rest_framework_simplejwt.tokens import RefreshToken as BaseRefreshToken


class RefreshToken(BaseRefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        # Claims added to refresh token are automatically copied to access token
        token['first_name'] = user.first_name or ''
        token['avatar_url'] = getattr(user, 'avatar_url', '') or ''
        return token
