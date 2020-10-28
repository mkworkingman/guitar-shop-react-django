import graphene
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
    users_list = graphene.List(SiteuserType)
    logged = graphene.Field(SiteuserType, login=graphene.String(), password=graphene.String())

    instrument_list = graphene.List(InstrumentType)
    disc = graphene.List(InstrumentType)
    instrument_list_type = graphene.List(InstrumentType, inst=graphene.String())

    def resolve_users_list(self, info):
        return Siteuser.objects.all()

    def resolve_logged(self, info, login, password):
        login_type = 'email' if '@' in login else 'username'
        login = login.strip()
        password = password.strip()

        if len(login) == 0 and len(password) == 0:
            raise Exception('empty_both')
        
        if len(login) == 0:
            raise Exception('empty_login')

        if len(password) == 0:
            raise Exception('empty_password')

        if not Siteuser.objects.filter(**{login_type: login}).exists():
            raise Exception(login_type + '_not_exist')

        hashed = Siteuser.objects.filter(**{login_type: login})[0].password[2:-1]
        if not bcrypt.checkpw(password.encode('utf8'), hashed.encode('utf8')):
            raise Exception('password_not_match')
        
        return Siteuser.objects.filter(**{login_type: login})[0]

    def resolve_instrument_list(self, info):
        return Instrument.objects.all()

    def resolve_disc(self, info):
        instrument_queryset = Instrument.objects.filter(discount__isnull=False)
        return instrument_queryset

    def resolve_instrument_list_type(self, info, inst):
        instrument_queryset = Instrument.objects.filter(inst_type=inst)
        return instrument_queryset

class CreateUser(graphene.Mutation):
    id = graphene.Int()
    username = graphene.String()
    email = graphene.String()
    password = graphene.String()
    errors = graphene.List(graphene.String)

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        password2 = graphene.String()

    def mutate(self, info, username, email, password, password2):
        errors = []
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
            errors.append('username_empty')
        else:
            if Siteuser.objects.filter(username=username).exists():
                errors.append('username_exists')
            if len(username) < 3 or len(username) > 22:
                errors.append('username_length')
            if not re.match(r"^[A-Za-z0-9_-]*$", username):
                errors.append('username_characters')

        if len(email) == 0:
            errors.append('email_empty')
        else:
            if Siteuser.objects.filter(email=email).exists():
                errors.append('email_exists')
            if not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email):
                errors.append('email_not_valid')

        if len(password) == 0:
            errors.append('password_empty')
        else:
            if len(password) < 5:
                errors.append('password_length')
            if not password_test:
                errors.append('password_english_letters')
            if re.match(r"\D*$", password):
                errors.append('password_number')
            if re.match(r"^[^A-Za-z]*$", password):
                errors.append('password_letter')

        if password != password2:
            errors.append('password2_no_match')

        if not bool(errors):
            hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

            user = Siteuser(username=username, email=email, password=hashed_password)
            user.save()
            return user
        return ValidationErrors(errors)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)