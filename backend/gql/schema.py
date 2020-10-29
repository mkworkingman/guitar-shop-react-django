import graphene
from graphene.types.generic import GenericScalar
from items.models import Instrument, Siteuser
from graphene_django.types import DjangoObjectType
import re
import bcrypt

class ValidationErrors:
    def __init__(self, errors):
        self.errors = errors

class SiteuserType(DjangoObjectType):
    class Meta:
        model = Siteuser
        convert_choices_to_enum = False

class InstrumentType(DjangoObjectType):
    class Meta:
        model = Instrument
        convert_choices_to_enum = False
    

class Query(graphene.ObjectType):
    instrument_list = graphene.List(InstrumentType)
    disc = graphene.List(InstrumentType)
    instrument_list_type = graphene.List(InstrumentType, inst=graphene.String())

    def resolve_instrument_list(self, info):
        return Instrument.objects.all()

    def resolve_disc(self, info):
        instrument_queryset = Instrument.objects.filter(discount__isnull=False)
        return instrument_queryset

    def resolve_instrument_list_type(self, info, inst):
        instrument_queryset = Instrument.objects.filter(inst_type=inst)
        return instrument_queryset

class LoginUser(graphene.Mutation):
    id = graphene.Int()
    username = graphene.String()
    email = graphene.String()
    errors = GenericScalar()

    class Arguments:
        login = graphene.String()
        password = graphene.String()

    def mutate(self, info, login, password):
        errors = {
            'login': [],
            'password': []
        }
        valid = True
        login_type = 'email' if '@' in login else 'username'
        login = login.strip()
        password = password.strip()

        if len(login) == 0:
            errors['login'].append('Please, enter your login.')
            valid = False
        elif not Siteuser.objects.filter(**{login_type: login}).exists():
            errors['login'].append(login_type.capitalize() + ' does not exist.')
            valid = False
        else:
            hashed = Siteuser.objects.filter(**{login_type: login})[0].password[2:-1]
            if len(password) > 0 and not bcrypt.checkpw(password.encode('utf8'), hashed.encode('utf8')):
                errors['password'].append('Password does not match.')
                valid = False

        if len(password) == 0:
            errors['password'].append('Please, enter your password.')
            valid = False

        if valid:
            return Siteuser.objects.filter(**{login_type: login})[0]
        return ValidationErrors(errors)


class CreateUser(graphene.Mutation):
    id = graphene.Int()
    username = graphene.String()
    email = graphene.String()
    password = graphene.String()
    errors = GenericScalar()

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        password2 = graphene.String()

    def mutate(self, info, username, email, password, password2):
        errors = {
            'username': [],
            'email': [],
            'password': [],
            'password2': []
        }
        valid = True
        username = username.strip()
        email = email.strip()
        password = password.strip()
        password2 = password2.strip()

        def isEnglish(s):
            try:
                s.encode(encoding='utf-8').decode('ascii')
            except UnicodeDecodeError:
                return False
            else:
                return True

        password_test = isEnglish(password)

        if len(username) == 0:
            errors['username'].append('username_empty')
            valid = False
        else:
            if Siteuser.objects.filter(username=username).exists():
                errors['username'].append('username_exists')
                valid = False
            if len(username) < 3 or len(username) > 22:
                errors['username'].append('username_length')
                valid = False
            if not re.match(r"^[A-Za-z0-9_-]*$", username):
                errors['username'].append('username_characters')
                valid = False

        if len(email) == 0:
            errors['email'].append('email_empty')
            valid = False
        else:
            if Siteuser.objects.filter(email=email).exists():
                errors['email'].append('email_exists')
                valid = False
            if not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email):
                errors['email'].append('email_not_valid')
                valid = False

        if len(password) == 0:
            errors['password'].append('password_empty')
            valid = False
        else:
            if len(password) < 5:
                errors['password'].append('password_length')
                valid = False
            if not password_test:
                errors['password'].append('password_english_letters')
                valid = False
            if re.match(r"\D*$", password):
                errors['password'].append('password_number')
                valid = False
            if re.match(r"^[^A-Za-z]*$", password):
                errors['password'].append('password_letter')
                valid = False

        if password != password2:
            errors['password2'].append('password2_no_match')
            valid = False

        if valid:
            hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

            user = Siteuser(username=username, email=email, password=hashed_password)
            user.save()
            return user
        return ValidationErrors(errors)

class Mutation(graphene.ObjectType):
    login_user = LoginUser.Field()
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)