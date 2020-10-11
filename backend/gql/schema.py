import graphene
from items.models import Instrument, Siteuser
from graphene_django.types import DjangoObjectType

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

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        password2 = graphene.String()

    def mutate(self, info, username, email, password, password2):

        if password == password2:
            print("noice")

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
