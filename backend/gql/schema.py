import graphene
from items.models import Instrument, Siteuser
from graphene_django.types import DjangoObjectType
import re

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

    instrument_list = graphene.List(InstrumentType)
    disc = graphene.List(InstrumentType)
    instrument_list_type = graphene.List(InstrumentType, inst=graphene.String())

    def resolve_users_list(self, info):
        return Siteuser.objects.all()

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
            errors.append("Please enter your username.")
        else:
            if len(username) < 3 or len(username) > 22:
                errors.append("Usename must have from 3 to 22 characters.")

            if not re.match(r"^[A-Za-z0-9_-]*$", username):
                errors.append("Username must contain only English letters, numbers, underscores and hyphens.")
        
        if len(email) == 0:
            errors.append("Please enter your email.")
        elif not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email):
                errors.append("Email is not valid.")

        if len(password) == 0:
            errors.append("Please enter your password.")
        else:
            if len(password) < 5:
                errors.append("Password at least must have 6 symbols.")
            if not password_test:
                errors.append("Password must contain English letters.")
            if re.match(r"\D*$", password):
                errors.append("Password must have at least one number.")
            if re.match(r"^[^A-Za-z]*$", password):
                errors.append("Password must have at least one English letter.")
        
        if password != password2:
            errors.append("Passwords don't match.")

        print(errors)

        user = Siteuser(username=username, email=email, password=password)
        user.save()

        return CreateUser(
            id=user.id,
            username=user.username,
            email=user.email,
            password=user.password
        )

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
# schema = graphene.Schema(query=Query, mutation=Mutation)
